import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { FastrConfig } from '../config.js';
import { PACKAGE_VERSION } from '../version.js';
import { resolveMcpCommand, withProjectRoot } from '../installer/setup.js';
import { initDatabase } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { searchMemories } from '../search/hybrid-rrf.js';
import { diagnoseDatabase, healDatabase } from '../db/doctor.js';
import type { Memory } from '../db/schema.js';
import {
  diffSnapshots,
  formatDiffMarkdown,
  replayAt,
  type DiffEntry,
  type ReplayConflict,
  type ReplayMemory,
  type ReplaySnapshot
} from '../replay/snapshot.js';
import { globalBroadcaster } from './sse.js';

export interface UiServerOptions {
  port?: number;
  openBrowser?: boolean;
  /** Interface to bind. Defaults to loopback so the dashboard is never exposed to the LAN. */
  host?: string;
}

const MAX_BODY_BYTES = 1024 * 1024;
const LOOPBACK_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function hostnameOf(value: string): string | null {
  try {
    return new URL(value.includes('://') ? value : `http://${value}`).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Rejects cross-site and DNS-rebinding requests. The dashboard API exposes every memory and can
 * create verified rules, so only pages served from a loopback origin may call it.
 */
export function isTrustedRequest(headers: http.IncomingHttpHeaders): boolean {
  const host = headers.host ? hostnameOf(headers.host) : null;
  if (!host || !LOOPBACK_HOSTNAMES.has(host)) return false;
  const origin = headers.origin;
  if (origin === undefined) return true; // same-origin GETs and non-browser clients (curl, tests)
  const originHost = hostnameOf(origin);
  return originHost !== null && LOOPBACK_HOSTNAMES.has(originHost) && /^https?:\/\//.test(origin);
}

function readJsonBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    const contentType = String(req.headers['content-type'] || '');
    if (!contentType.toLowerCase().startsWith('application/json')) {
      // Requiring JSON forces a CORS preflight for any cross-origin caller, which we never approve.
      req.resume();
      reject(new HttpError(415, 'Content-Type must be application/json'));
      return;
    }
    let size = 0;
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new HttpError(413, 'Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        resolve(text ? JSON.parse(text) : {});
      } catch {
        reject(new HttpError(400, 'Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: http.ServerResponse, status: number, payload: unknown): void {
  if (res.headersSent) return;
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function handleJsonPost(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  fallbackError: string,
  handler: (data: any) => { status?: number; body: unknown }
): void {
  readJsonBody(req)
    .then((data) => {
      const { status = 200, body } = handler(data);
      sendJson(res, status, body);
    })
    .catch((err: any) => {
      sendJson(res, err instanceof HttpError ? err.status : 400, { error: err?.message || fallbackError });
    });
}

function escapeHtmlServer(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const MEMORY_STATUSES = new Set(['staging', 'verified', 'superseded', 'dormant']);
const MEMORY_KINDS = new Set(['rule', 'decision', 'error_trap', 'workflow']);

function clampInt(value: string | null, fallback: number, min: number, max: number): number {
  const n = parseInt(value || '', 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function replayMemoryView(memory: ReplayMemory) {
  return {
    id: memory.id,
    title: memory.title,
    module: memory.module,
    kind: memory.kind,
    status: memory.status,
    rewardScore: memory.reward_score,
    validFrom: memory.valid_from,
    validTo: memory.valid_to,
    supersededById: memory.superseded_by_id,
    files: memory.files
  };
}

function replaySnapshotView(snapshot: ReplaySnapshot) {
  return {
    at: snapshot.at,
    tokenCount: snapshot.tokenCount,
    contentHash: snapshot.contentHash,
    active: snapshot.memories.map(replayMemoryView),
    historyCount: snapshot.history.length,
    eventCount: snapshot.events.length,
    conflictCount: snapshot.conflicts.length
  };
}

function replayDiffEntryView(entry: DiffEntry) {
  return {
    id: entry.id,
    title: entry.title,
    module: entry.module,
    kind: entry.kind,
    status: entry.status,
    validFrom: entry.valid_from,
    validTo: entry.valid_to,
    supersededById: entry.superseded_by_id
  };
}

function replayConflictView(conflict: ReplayConflict) {
  return {
    id: conflict.id,
    memoryAId: conflict.memory_a_id,
    memoryBId: conflict.memory_b_id,
    reason: conflict.reason,
    score: conflict.score,
    status: conflict.status
  };
}

/** Lexical guard used to tell real search hits apart from the search engine's "latest memories" fallback. */
function lexicallyMatches(m: Pick<Memory, 'id' | 'title' | 'content' | 'module'>, query: string): boolean {
  const tokens = query.toLowerCase().split(/[^\w-]+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return false;
  const haystack = `${m.id} ${m.title} ${m.content} ${m.module}`.toLowerCase();
  return tokens.some((t) => haystack.includes(t));
}

export function startUiServer(config: FastrConfig, options: UiServerOptions = {}): Promise<{ server: http.Server; port: number; url: string }> {
  const preferredPort = options.port !== undefined ? options.port : 4242;
  const shouldOpen = options.openBrowser ?? true;
  const host = options.host ?? '127.0.0.1';

  const db = initDatabase(config.dbPath);
  const spool = new SpoolManager(config.spoolPath);
  const repo = new FastrRepository(db, spool);

  /** Strips the binary embedding (huge as JSON) and attaches linked files with batched queries. */
  const serializeMemories = (rows: Memory[]): Array<Omit<Memory, 'embedding'> & { linked_files: string[] }> => {
    if (rows.length === 0) return [];
    const links = new Map<string, string[]>();
    const ids = rows.map((r) => r.id);
    for (let i = 0; i < ids.length; i += 500) {
      const chunk = ids.slice(i, i + 500);
      const linkRows = db
        .prepare(`SELECT DISTINCT memory_id, file_path FROM file_links WHERE memory_id IN (${chunk.map(() => '?').join(',')})`)
        .all(...chunk) as Array<{ memory_id: string; file_path: string }>;
      for (const l of linkRows) {
        const list = links.get(l.memory_id) ?? [];
        list.push(l.file_path);
        links.set(l.memory_id, list);
      }
    }
    return rows.map(({ embedding: _embedding, ...rest }) => ({ ...rest, linked_files: links.get(rest.id) ?? [] }));
  };

  /** Memories in a non-active status (superseded / dormant) are not returned by listActiveMemories. */
  const listMemoriesByStatus = (status: string, module?: string): Memory[] => {
    let sql = `SELECT * FROM memories WHERE (project_id = ? OR project_id = 'global') AND status = ?`;
    const params: any[] = [config.projectId, status];
    if (module) {
      sql += ' AND module = ?';
      params.push(module.trim().toLowerCase());
    }
    sql += ' ORDER BY created_at DESC LIMIT 5000';
    return db.prepare(sql).all(...params) as unknown as Memory[];
  };

  return new Promise((resolve, reject) => {
    let resolved = false;

    const server = http.createServer((req, res) => {
      try {
        handleRequest(req, res);
      } catch (err: any) {
        sendJson(res, 500, { error: err?.message || 'Internal server error' });
      }
    });

    const handleRequest = (req: http.IncomingMessage, res: http.ServerResponse): void => {
      res.setHeader('Connection', 'close');
      res.setHeader('X-Content-Type-Options', 'nosniff');

      // No CORS headers are ever sent: cross-origin pages must not read or mutate memories.
      if (!isTrustedRequest(req.headers)) {
        sendJson(res, 403, { error: 'Forbidden: dashboard only accepts requests from localhost' });
        return;
      }

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      const url = new URL(req.url || '/', 'http://localhost');

      // API: Status & Metadata
      if (url.pathname === '/api/status') {
        const status = repo.getStatus(config.projectId);
        const traps = repo.listTraps(config.projectId);
        const memories = repo.listActiveMemories(config.projectId);
        const modules = Array.from(new Set(memories.map((m) => m.module))).sort();
        const graph = repo.queryGraph(config.projectId);
        const actions = repo.listActions(config.projectId);
        const frontier = repo.getFrontier(config.projectId);
        const conflicts = repo.listConflicts(config.projectId, 'open');
        const entities = repo.getEntities(config.projectId);
        const mcpEntry = withProjectRoot(resolveMcpCommand(), config.projectRoot);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          projectId: config.projectId,
          projectName: config.projectName,
          projectRoot: config.projectRoot,
          dbPath: config.dbPath,
          version: PACKAGE_VERSION,
          platform: process.platform,
          isHomeProject: path.resolve(config.projectRoot) === path.resolve(os.homedir()),
          mcp: mcpEntry,
          mcpSource: mcpEntry.command === 'node' ? 'local' : 'registry',
          status,
          trapsCount: traps.length,
          activeCount: memories.length,
          modulesCount: modules.length,
          modules,
          graphNodesCount: graph.nodes.length,
          graphEdgesCount: graph.edges.length,
          actionsCount: actions.length,
          frontierCount: frontier.length,
          conflictsCount: conflicts.length,
          entitiesCount: entities.length,
          spoolPending: spool.hasPending(),
        }));
        return;
      }

      // API: Memories List / Search with Kind & Module Filters
      if (req.method === 'GET' && url.pathname === '/api/memories') {
        const targetModule = url.searchParams.get('module') || undefined;
        const targetKind = url.searchParams.get('kind') || undefined;
        const query = url.searchParams.get('q') || '';
        let memories = repo.listActiveMemories(config.projectId, targetModule);

        if (targetKind) {
          memories = memories.filter((m) => m.kind === targetKind);
        }

        if (query) {
          const qLower = query.toLowerCase();
          memories = memories.filter((m) =>
            m.title.toLowerCase().includes(qLower) ||
            m.content.toLowerCase().includes(qLower) ||
            m.module.toLowerCase().includes(qLower) ||
            m.id.toLowerCase().includes(qLower)
          );
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(serializeMemories(memories)));
        return;
      }

      // API: Server-side memory search with facets (hybrid RRF for a non-empty q, filtered list otherwise)
      if (req.method === 'GET' && url.pathname === '/api/search') {
        const q = (url.searchParams.get('q') || '').trim();
        const targetModule = url.searchParams.get('module') || undefined;
        const kind = url.searchParams.get('kind') || '';
        const status = url.searchParams.get('status') || '';
        const pinned = url.searchParams.get('pinned');
        const limit = clampInt(url.searchParams.get('limit'), 500, 1, 5000);

        if (kind && !MEMORY_KINDS.has(kind)) {
          sendJson(res, 400, { error: `Unknown kind "${kind}"` });
          return;
        }
        if (status && !MEMORY_STATUSES.has(status)) {
          sendJson(res, 400, { error: `Unknown status "${status}"` });
          return;
        }

        const applyFacets = (rows: Memory[]): Memory[] =>
          rows.filter((m) =>
            (!kind || m.kind === kind) &&
            (!status || m.status === status) &&
            (pinned === null || pinned === '' || Boolean(m.pinned) === (pinned === '1' || pinned === 'true'))
          );

        const t0 = performance.now();
        if (!q) {
          const base = status === 'superseded' || status === 'dormant'
            ? listMemoriesByStatus(status, targetModule)
            : repo.listActiveMemories(config.projectId, targetModule);
          const filtered = applyFacets(base);
          sendJson(res, 200, {
            mode: 'list',
            query: '',
            total: filtered.length,
            fallback: false,
            tookMs: Number((performance.now() - t0).toFixed(2)),
            results: serializeMemories(filtered.slice(0, limit)).map((m) => ({ ...m, score: null, ranks: null })),
          });
          return;
        }

        searchMemories(db, {
          projectId: config.projectId,
          query: q,
          module: targetModule,
          includeHistory: status === 'superseded' || status === 'dormant',
          budgetTokens: 1_000_000,
          maxPerSession: 100_000,
        })
          .then((found) => {
            let hits = found.memories;
            // The engine falls back to "latest memories" when no stream matched; never present that as a hit.
            const anyStreamHit = hits.some(
              (h) => h.vectorRank !== undefined || h.graphRank !== undefined || lexicallyMatches(h.memory, q)
            );
            const fallback = hits.length > 0 && !anyStreamHit;
            if (fallback) hits = [];
            const scoreById = new Map(hits.map((h) => [h.memory.id, h]));
            const filtered = applyFacets(hits.map((h) => h.memory));
            sendJson(res, 200, {
              mode: 'search',
              query: q,
              total: filtered.length,
              fallback,
              tookMs: Number((performance.now() - t0).toFixed(2)),
              results: serializeMemories(filtered.slice(0, limit)).map((m) => {
                const h = scoreById.get(m.id)!;
                return {
                  ...m,
                  score: Number(h.score.toFixed(4)),
                  ranks: { bm25: h.bm25Rank ?? null, vector: h.vectorRank ?? null, graph: h.graphRank ?? null },
                };
              }),
            });
          })
          .catch((err) => sendJson(res, 500, { error: err?.message || 'Search failed' }));
        return;
      }

      // API: Single memory (deep links) and its supersession history chain
      const memoryRoute = req.method === 'GET' ? url.pathname.match(/^\/api\/memories\/([^/]+)(\/history)?$/) : null;
      if (memoryRoute) {
        const memoryId = decodeURIComponentSafe(memoryRoute[1]);
        const memory = repo.getMemory(memoryId);
        if (!memory) {
          sendJson(res, 404, { error: `Memory ${memoryId} not found` });
          return;
        }

        if (!memoryRoute[2]) {
          const [serialized] = serializeMemories([memory]);
          sendJson(res, 200, { ...serialized, provenance: repo.verifyMemoryProvenance(memory.id) });
          return;
        }

        // Walk superseded_by_id in both directions (an older version points at its replacement).
        const seen = new Set<string>([memory.id]);
        const older: Memory[] = [];
        let cursor = memory.id;
        while (older.length < 100) {
          const prev = db
            .prepare('SELECT * FROM memories WHERE superseded_by_id = ? ORDER BY created_at DESC LIMIT 1')
            .get(cursor) as unknown as Memory | undefined;
          if (!prev || seen.has(prev.id)) break;
          seen.add(prev.id);
          older.unshift(prev);
          cursor = prev.id;
        }
        const newer: Memory[] = [];
        let nextId = memory.superseded_by_id;
        while (nextId && !seen.has(nextId) && newer.length < 100) {
          const next = repo.getMemory(nextId);
          if (!next) break;
          seen.add(next.id);
          newer.push(next);
          nextId = next.superseded_by_id;
        }
        sendJson(res, 200, {
          id: memory.id,
          currentIndex: older.length,
          chain: serializeMemories([...older, memory, ...newer]),
        });
        return;
      }

      // API: Error traps, optionally scoped to the files an agent is about to edit
      if (req.method === 'GET' && url.pathname === '/api/traps') {
        const files = (url.searchParams.get('files') || '')
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean)
          .slice(0, 200);
        if (files.length === 0) {
          sendJson(res, 200, { files: [], traps: serializeMemories(repo.listTraps(config.projectId)).map((m) => ({ ...m, matched_files: [] })) });
          return;
        }
        const byId = new Map<string, { memory: Memory; matchedFiles: string[] }>();
        for (const file of files) {
          for (const m of repo.getMemoriesForFile(config.projectId, file)) {
            if (m.kind !== 'error_trap') continue;
            const entry = byId.get(m.id) ?? { memory: m, matchedFiles: [] };
            entry.matchedFiles.push(file);
            byId.set(m.id, entry);
          }
        }
        const entries = Array.from(byId.values());
        const serialized = serializeMemories(entries.map((e) => e.memory));
        sendJson(res, 200, {
          files,
          traps: serialized.map((m, i) => ({ ...m, matched_files: entries[i].matchedFiles })),
        });
        return;
      }

      // API: Database health (doctor diagnostics) and self-heal
      if (req.method === 'GET' && url.pathname === '/api/health') {
        const report = diagnoseDatabase(db, config.projectId);
        sendJson(res, 200, {
          report,
          status: repo.getStatus(config.projectId),
          spool: { pending: spool.hasPending(), path: config.spoolPath },
          dbPath: config.dbPath,
        });
        return;
      }

      if (req.method === 'POST' && url.pathname === '/api/health/heal') {
        handleJsonPost(req, res, 'Failed to heal database', (data) => {
          const result = healDatabase(db, config.projectId, { dryRun: Boolean(data?.dryRun) });
          if (!result.dryRun) globalBroadcaster.broadcast('sync_complete', { healed: result.fixedCount });
          return { body: result };
        });
        return;
      }

      // API: Cheap change detector so the dashboard also sees writes made by other processes (MCP server, CLI)
      if (req.method === 'GET' && url.pathname === '/api/version') {
        const dataVersionRow = db.prepare('PRAGMA data_version').get() as Record<string, number> | undefined;
        const dataVersion = Number(Object.values(dataVersionRow ?? {})[0] ?? 0);
        const totalChanges = Number((db.prepare('SELECT total_changes() AS c').get() as { c: number }).c ?? 0);
        const counts = db.prepare(`
          SELECT
            (SELECT COUNT(*) FROM memories) AS memories,
            (SELECT COUNT(*) FROM memories WHERE valid_to IS NULL) AS active,
            (SELECT COALESCE(SUM(pinned), 0) FROM memories) AS pinned,
            (SELECT COALESCE(MAX(created_at), '') FROM memories) AS lastCreated,
            (SELECT COUNT(*) FROM actions) AS actions,
            (SELECT COUNT(*) FROM actions WHERE status = 'done') AS actionsDone,
            (SELECT COUNT(*) FROM memory_conflicts WHERE status = 'open') AS openConflicts
        `).get() as Record<string, number | string>;
        const spoolPending = spool.hasPending();
        sendJson(res, 200, {
          version: `${dataVersion}.${totalChanges}.${Object.values(counts).join('|')}.${spoolPending ? 1 : 0}`,
          dataVersion,
          totalChanges,
          counts,
          spoolPending,
          serverTime: new Date().toISOString(),
        });
        return;
      }

      // API: Create Memory / Error Trap from UI
      if (req.method === 'POST' && url.pathname === '/api/memories') {
        handleJsonPost(req, res, 'Failed to create memory', (data) => {
          const memory = repo.insertMemory({
            projectId: config.projectId,
            title: String(data.title || '').trim(),
            content: String(data.content || '').trim(),
            module: data.module ? String(data.module).trim() : 'general',
            kind: data.kind || 'rule',
            files: Array.isArray(data.files) ? data.files.map(String) : [],
            verified: true,
          });
          globalBroadcaster.broadcast('memory_created', memory);
          return { status: 201, body: memory };
        });
        return;
      }

      // API: Pin / Unpin Memory
      if (req.method === 'POST' && url.pathname === '/api/memories/pin') {
        handleJsonPost(req, res, 'Failed to update pin', (data) => {
          const result = repo.pinMemory(String(data.memoryId), Boolean(data.pinned));
          globalBroadcaster.broadcast('memory_updated', { id: data.memoryId, pinned: data.pinned });
          return { body: result };
        });
        return;
      }

      // API: Forget / Soft-Delete Memory
      if (req.method === 'POST' && url.pathname === '/api/memories/forget') {
        handleJsonPost(req, res, 'Failed to forget memory', (data) => {
          const result = repo.forgetMemory(String(data.memoryId), data.reason);
          globalBroadcaster.broadcast('memory_updated', { id: data.memoryId, status: 'superseded' });
          return { body: result };
        });
        return;
      }

      // API: RRF Search Diagnostics & Explain
      if (url.pathname === '/api/search/explain') {
        const query = url.searchParams.get('q') || '';
        const t0 = performance.now();
        searchMemories(db, { projectId: config.projectId, query })
          .then((searchRes) => {
            const totalTimeMs = Number((performance.now() - t0).toFixed(2));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              query,
              totalTimeMs,
              totalTokens: searchRes.totalTokens,
              results: searchRes.memories.map((m) => ({
                id: m.memory.id,
                title: m.memory.title,
                kind: m.memory.kind,
                module: m.memory.module,
                score: Number(m.score.toFixed(4)),
                rankA: m.bm25Rank ?? 0,
                rankB: m.vectorRank ?? 0,
                rankC: m.graphRank ?? 0,
              })),
            }));
          })
          .catch((err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });
        return;
      }

      // API: Graph (Nodes & Edges with Traversal)
      if (url.pathname === '/api/graph') {
        const startFile = url.searchParams.get('file') || undefined;
        const depth = parseInt(url.searchParams.get('depth') || '2', 10);
        const graph = repo.queryGraph(config.projectId, { startFilePath: startFile, depth });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(graph));
        return;
      }

      // API: Timeline Audit Trail
      if (url.pathname === '/api/timeline') {
        const targetModule = url.searchParams.get('module') || undefined;
        const limit = parseInt(url.searchParams.get('limit') || '50', 10);
        const timeline = repo.getTimeline(config.projectId, { module: targetModule, limit });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(timeline));
        return;
      }

      // API: Replay two snapshots and return the memory diff
      if (req.method === 'GET' && url.pathname === '/api/replay') {
        try {
          const toParam = url.searchParams.get('to');
          const to = toParam ? new Date(toParam) : new Date();
          if (Number.isNaN(to.getTime())) {
            throw new HttpError(400, `Invalid "to" timestamp: ${toParam}`);
          }

          const fromParam = url.searchParams.get('from');
          const from = fromParam ? new Date(fromParam) : new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (Number.isNaN(from.getTime())) {
            throw new HttpError(400, `Invalid "from" timestamp: ${fromParam}`);
          }
          if (from.getTime() > to.getTime()) {
            throw new HttpError(400, '"from" must be before or equal to "to"');
          }

          const fromSnapshot = replayAt(db, config.projectId, from.toISOString());
          const toSnapshot = replayAt(db, config.projectId, to.toISOString());
          const diff = diffSnapshots(fromSnapshot, toSnapshot);

          sendJson(res, 200, {
            from: replaySnapshotView(fromSnapshot),
            to: replaySnapshotView(toSnapshot),
            diff: {
              ...diff,
              added: diff.added.map(replayDiffEntryView),
              superseded: diff.superseded.map(replayDiffEntryView),
              stillActive: diff.stillActive.map(replayDiffEntryView),
              changed: diff.changed.map(replayDiffEntryView),
              conflicts: diff.conflicts.map(replayConflictView)
            },
            markdown: formatDiffMarkdown(diff)
          });
        } catch (err) {
          const status = err instanceof HttpError ? err.status : 500;
          sendJson(res, status, { error: err instanceof Error ? err.message : 'Replay failed' });
        }
        return;
      }

      // API: Action DAG Nodes & Dependencies
      if (url.pathname === '/api/actions') {
        const actions = repo.listActions(config.projectId);
        const frontier = repo.getFrontier(config.projectId);
        const frontierIds = new Set(frontier.map((a) => a.id));
        const enriched = actions.map((a) => {
          const detail = repo.getAction(a.id);
          return {
            ...a,
            isFrontier: frontierIds.has(a.id),
            requires: detail?.requires ?? [],
            unlocks: detail?.unlocks ?? [],
            conflictsWith: detail?.conflictsWith ?? [],
          };
        });
        const edges = db.prepare('SELECT source_action_id, target_action_id, edge_type FROM action_edges').all() as Array<{ source_action_id: string; target_action_id: string; edge_type: string }>;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          actions: enriched,
          edges,
          frontierCount: frontier.length,
          totalCount: actions.length,
        }));
        return;
      }

      // API: Seed Example Action DAG Tasks
      if (req.method === 'POST' && url.pathname === '/api/actions/seed') {
        // Idempotent: a second click must not hit the UNIQUE constraint on the fixed demo ids.
        if (repo.getAction('task_sqlite_wal_bench')) {
          sendJson(res, 200, { seeded: [], alreadySeeded: true });
          return;
        }
        const a1 = repo.createAction({
          id: 'task_sqlite_wal_bench',
          projectId: config.projectId,
          title: 'Tune SQLite WAL & Concurrency Timeout',
          description: 'Set PRAGMA busy_timeout = 5000 and benchmark multi-client read/write',
          priority: 1,
        });
        const a2 = repo.createAction({
          id: 'task_crypto_provenance',
          projectId: config.projectId,
          title: 'Verify SHA-256 Provenance Signatures',
          description: 'Authenticate all incoming memories against tamper-evident cryptographic hashes',
          priority: 2,
          requires: ['task_sqlite_wal_bench'],
        });
        const a3 = repo.createAction({
          id: 'task_observatory_3d',
          projectId: config.projectId,
          title: '3D Brain Observatory Galaxy Telemetry',
          description: 'Render Three.js orbital constellation galaxy for agent memory clusters',
          priority: 3,
          requires: ['task_crypto_provenance'],
        });
        globalBroadcaster.broadcast('action_claimed', { actionId: 'task_sqlite_wal_bench', claimedBy: 'lead-agent' });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ seeded: [a1, a2, a3] }));
        return;
      }

      // API: Entities & Knowledge Relations
      if (url.pathname === '/api/entities') {
        const entities = repo.getEntities(config.projectId);
        const edges = db.prepare(`
          SELECT source_id, target_id, edge_type FROM graph_edges WHERE project_id = ? AND edge_type = 'entity_link'
        `).all(config.projectId) as any[];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ entities, edges, count: entities.length }));
        return;
      }

      // API: Memory Conflicts
      if (url.pathname === '/api/conflicts') {
        const conflicts = repo.listConflicts(config.projectId, 'open');
        // Embed both sides so the client can diff them even when one is no longer in the active list.
        const enriched = conflicts.map((c) => {
          const [a] = serializeMemories([repo.getMemory(c.memory_a_id)].filter(Boolean) as Memory[]);
          const [b] = serializeMemories([repo.getMemory(c.memory_b_id)].filter(Boolean) as Memory[]);
          return { ...c, memory_a: a ?? null, memory_b: b ?? null };
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(enriched));
        return;
      }

      // API: Resolve Memory Conflict
      if (req.method === 'POST' && url.pathname === '/api/conflicts/resolve') {
        handleJsonPost(req, res, 'Failed to resolve conflict', (data) => {
          const conflictId = Number(data.conflictId);
          const keepMemoryId = String(data.keepMemoryId);
          const forgetLoser = Boolean(data.forgetLoser);
          const reason = data.reason ? String(data.reason) : undefined;

          const result = repo.resolveConflict(conflictId, keepMemoryId, forgetLoser, reason);
          globalBroadcaster.broadcast('conflict_resolved', result);
          return { body: result };
        });
        return;
      }

      // API: Server-Sent Events (SSE) Stream
      if (url.pathname === '/api/stream') {
        globalBroadcaster.addClient(res);
        return;
      }

      // Static File Serving (from precompiled dist-ui if present)
      const distDir = getDistUiDir();
      if (distDir && fs.existsSync(path.join(distDir, 'index.html'))) {
        const reqPath = url.pathname === '/' ? '/index.html' : decodeURIComponentSafe(url.pathname);
        const filePath = path.resolve(distDir, '.' + reqPath);
        const insideDist = filePath === distDir || filePath.startsWith(distDir + path.sep);
        if (insideDist && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        // SPA fallback for page routes only. A missing build asset (e.g. a chunk from a previous build
        // requested by a tab left open across an upgrade) must 404, not return HTML with status 200.
        if (!url.pathname.startsWith('/api') && !url.pathname.startsWith('/assets/') && !path.extname(url.pathname)) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
          return;
        }
      }

      // Fallback UI Single-Page Dashboard (inline template)
      if (url.pathname === '/' || url.pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderDashboardHtml(config.projectId, config.projectName));
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    };

    let currentPort = preferredPort;
    let attempts = 0;
    const maxAttempts = 10;

    server.on('listening', () => {
      if (!resolved) {
        resolved = true;
        const actualPort = (server.address() as any).port;
        const appUrl = `http://localhost:${actualPort}`;
        if (shouldOpen) {
          const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
          exec(`${startCmd} ${appUrl}`);
        }
        resolve({ server, port: actualPort, url: appUrl });
      }
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE' && attempts < maxAttempts) {
        attempts++;
        currentPort++;
        server.listen(currentPort, host);
      } else if (err.code === 'EADDRINUSE') {
        server.listen(0, host);
      } else {
        reject(err);
      }
    });

    const cleanup = () => {
      try {
        if (typeof (server as any).closeAllConnections === 'function') {
          (server as any).closeAllConnections();
        }
        server.close();
      } catch {}
    };
    process.once('SIGINT', cleanup);
    process.once('SIGTERM', cleanup);

    server.on('close', () => {
      process.removeListener('SIGINT', cleanup);
      process.removeListener('SIGTERM', cleanup);
      try {
        globalBroadcaster.close();
      } catch {}
      try {
        db.close();
      } catch {
        // Already closed
      }
    });

    server.listen(currentPort, host);
  });
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

function decodeURIComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getDistUiDir(): string | null {
  try {
    const base = path.dirname(fileURLToPath(import.meta.url));
    const candidates = [
      // Compiled: dist/src/ui/server.js -> <package root>/dist-ui (the layout npm/npx installs ship)
      path.resolve(base, '..', '..', '..', 'dist-ui'),
      // Source (tsx/vitest): src/ui/server.ts -> <repo root>/dist-ui
      path.resolve(base, '..', '..', 'dist-ui'),
      path.resolve(base, '..', 'dist-ui'),
      path.resolve(process.cwd(), 'dist-ui'),
    ];
    for (const c of candidates) {
      if (fs.existsSync(path.join(c, 'index.html'))) {
        return c;
      }
    }
  } catch {}
  return null;
}

function renderDashboardHtml(projectId: string, projectName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⚡ FastrMemory Hub &bull; ${escapeHtmlServer(projectName)}</title>
  <style>
    :root {
      --bg: #090d16;
      --surface: #111827;
      --card: #1f2937;
      --border: #374151;
      --text: #f9fafb;
      --text-muted: #9ca3af;
      --primary: #3b82f6;
      --emerald: #10b981;
      --amber: #f59e0b;
      --purple: #8b5cf6;
      --rose: #f43f5e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.4px;
    }
    .brand span { color: var(--primary); }
    .live-dot {
      width: 8px;
      height: 8px;
      background: var(--emerald);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--emerald);
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    
    .nav-tabs {
      display: flex;
      gap: 4px;
      background: var(--bg);
      padding: 4px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .tab-btn:hover { color: var(--text); background: rgba(255, 255, 255, 0.05); }
    .tab-btn.active { color: #fff; background: var(--card); border: 1px solid var(--border); }
    .badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-rule { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .badge-trap { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-decision { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
    .badge-file { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }

    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
      padding: 18px 24px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
    }
    .stat-card {
      background: var(--card);
      border: 1px solid var(--border);
      padding: 12px 18px;
      border-radius: 8px;
    }
    .stat-val { font-size: 24px; font-weight: 700; color: #fff; }
    .stat-lbl { font-size: 11px; color: var(--text-muted); text-transform: uppercase; margin-top: 3px; font-weight: 600; }

    main {
      padding: 24px;
      flex: 1;
      max-width: 1440px;
      margin: 0 auto;
      width: 100%;
    }
    .tab-content { display: none; }
    .tab-content.active { display: block; }

    .search-row {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .search-input {
      flex: 1;
      min-width: 280px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 11px 16px;
      color: var(--text);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus { border-color: var(--primary); }

    .filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .pill {
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.15s;
    }
    .pill:hover { color: #fff; }
    .pill.active { background: var(--primary); color: #fff; border-color: var(--primary); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
    }
    .card:hover { transform: translateY(-2px); border-color: #6b7280; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); }
    .card-trap { border-left: 4px solid var(--amber); }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .card-title { font-size: 15px; font-weight: 600; color: #fff; line-height: 1.4; }
    .card-content {
      font-size: 13px;
      line-height: 1.5;
      color: #d1d5db;
      background: var(--card);
      padding: 10px 12px;
      border-radius: 6px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      max-height: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: var(--text-muted);
      margin-top: auto;
    }
    .files-list { display: flex; flex-wrap: wrap; gap: 4px; }
    .file-tag {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      color: #93c5fd;
    }

    /* Interactive Graph Canvas View */
    #graph-container {
      position: relative;
      width: 100%;
      height: 650px;
      background: #06090e;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    #graph-canvas {
      width: 100%;
      height: 100%;
      cursor: grab;
    }
    #graph-canvas:active { cursor: grabbing; }
    .graph-controls {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: flex;
      gap: 8px;
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(8px);
      padding: 6px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .graph-btn {
      background: var(--card);
      border: 1px solid var(--border);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
    }
    .graph-btn:hover { background: #374151; }
    .graph-legend {
      position: absolute;
      top: 16px;
      left: 16px;
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(8px);
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-size: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .legend-item { display: flex; align-items: center; gap: 8px; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; }

    /* Modal Drawer */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }
    .modal-overlay.active { display: flex; }
    .modal-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      width: 90%;
      max-width: 700px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-body {
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .modal-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 20px;
      cursor: pointer;
    }
    .modal-close:hover { color: #fff; }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <div class="live-dot"></div>
      <span>⚡ FastrMemory</span> Hub
    </div>
    
    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchTab('overview')">📊 Overview</button>
      <button class="tab-btn" onclick="switchTab('memories')">🧠 Memories (<span id="tab-cnt-mem">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('traps')">⚠️ Traps (<span id="tab-cnt-traps">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('graph')">🕸️ Visual Graph & DAG</button>
      <button class="tab-btn" onclick="switchTab('actions')">🔀 Actions & Frontier (<span id="tab-cnt-actions">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('conflicts')">⚔️ Conflicts (<span id="tab-cnt-conflicts">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('timeline')">⏱️ Timeline</button>
    </div>

    <div style="font-size: 12px; color: var(--text-muted);">
      Node 24 WAL &bull; <code style="color: #60a5fa;">${escapeHtmlServer(projectId)}</code>
    </div>
  </header>

  <section class="stats-bar">
    <div class="stat-card">
      <div class="stat-val" id="stat-active">0</div>
      <div class="stat-lbl">Active Rules</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-traps" style="color: #fbbf24;">0</div>
      <div class="stat-lbl">Error Traps (Conditional Boost)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-frontier" style="color: #f59e0b;">0</div>
      <div class="stat-lbl">Unblocked Frontier Tasks</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-graph-nodes" style="color: #38bdf8;">0</div>
      <div class="stat-lbl">Knowledge Nodes</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-conflicts" style="color: #f43f5e;">0</div>
      <div class="stat-lbl">Open Contradictions</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-spool" style="color: #34d399;">Clear</div>
      <div class="stat-lbl">Offline Spool Queue</div>
    </div>
  </section>

  <main>
    <!-- TAB 1: OVERVIEW -->
    <div id="tab-overview" class="tab-content active">
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px;">
          <h2 style="font-size: 18px; margin-bottom: 12px;">Cognitive Memory Architecture</h2>
          <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            FastrMemory runs natively inside Node 24 with <b>zero background daemons</b>. Rules, error traps, and decisions are indexed via SQLite WAL mode, mirrored to <code>.fastr/pages/*.md</code> for Git diffs, and fused using Triple-Stream RRF ($k=20$) across full-text, local vectors, and code file graphs.
          </p>
          <div style="display: flex; gap: 10px;">
            <button class="pill active" onclick="switchTab('traps')">Inspect Error Traps &rarr;</button>
            <button class="pill" onclick="switchTab('graph')">Open Knowledge Graph &rarr;</button>
          </div>
        </div>

        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px;">
          <h3 style="font-size: 15px; margin-bottom: 12px;">Quick CLI Shortcuts</h3>
          <ul style="color: var(--text-muted); font-size: 13px; line-height: 2; list-style: none;">
            <li><code>fastrmemory status</code> &bull; Health overview</li>
            <li><code>fastrmemory bench</code> &bull; Run Hit@5 benchmarks</li>
            <li><code>fastrmemory recall &lt;q&gt;</code> &bull; Triple-stream search</li>
            <li><code>fastrmemory remember &lt;t&gt;</code> &bull; Save verified rule</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- TAB 2: ALL MEMORIES -->
    <div id="tab-memories" class="tab-content">
      <div class="search-row">
        <input type="text" id="search-input" class="search-input" placeholder="Instant search by keyword, file path, concept, or [mem_id]..." />
      </div>
      <div class="filter-pills" id="module-pills">
        <button class="pill active" onclick="filterByModule('all')">All Modules</button>
      </div>
      <div class="grid" id="memories-grid"></div>
    </div>

    <!-- TAB 3: ERROR TRAPS -->
    <div id="tab-traps" class="tab-content">
      <div style="margin-bottom: 16px; color: var(--text-muted); font-size: 13px;">
        Error traps receive a <b>conditional 2.0x boost</b> during recall when the query has trap intent or targets a linked file, so agents do not repeat known bugs.
      </div>
      <div class="grid" id="traps-grid"></div>
    </div>

    <!-- TAB 4: VISUAL GRAPH & ACTION DAG -->
    <div id="tab-graph" class="tab-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; gap: 8px;">
          <button id="btn-mode-knowledge" class="pill active" onclick="switchGraphMode('knowledge')">🕸️ Knowledge Graph</button>
          <button id="btn-mode-actions" class="pill" onclick="switchGraphMode('actions')">🔀 Action DAG & Frontier</button>
        </div>
        <div id="graph-mode-desc" style="color: var(--text-muted); font-size: 13px;">
          Visualizing semantic memory nodes, error traps (conditional boost), code files, and extracted entities.
        </div>
      </div>
      <div id="graph-container">
        <div class="graph-legend" id="graph-legend">
          <div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Code File Node</div>
          <div class="legend-item"><div class="legend-dot" style="background: #fbbf24;"></div> Error Trap [TRAP] (conditional boost)</div>
          <div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Verified Rule</div>
          <div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div> Architecture Decision</div>
          <div class="legend-item"><div class="legend-dot" style="background: #ec4899;"></div> Entity Link</div>
        </div>
        <div class="graph-controls">
          <button class="graph-btn" onclick="zoomGraph(1.2)">Zoom +</button>
          <button class="graph-btn" onclick="zoomGraph(0.8)">Zoom -</button>
          <button class="graph-btn" onclick="resetGraphZoom()">Reset View</button>
          <button class="graph-btn" onclick="toggleGraphPhysics()">Pause/Play Physics</button>
        </div>
        <canvas id="graph-canvas"></canvas>
      </div>
    </div>

    <!-- TAB 5: ACTIONS & FRONTIER -->
    <div id="tab-actions" class="tab-content">
      <div style="margin-bottom: 16px; color: var(--text-muted); font-size: 13px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span>Multi-Agent Action DAG ensures zero task duplicate collisions and enforces topological execution order.</span>
        <button class="pill active" onclick="switchTab('graph'); switchGraphMode('actions');">Inspect in Visual DAG &rarr;</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #f59e0b; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>⚡ Ready Frontier</span>
            <span id="col-cnt-frontier" class="badge badge-trap">0</span>
          </h3>
          <div id="list-frontier" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #3b82f6; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>🔨 Active / In Progress</span>
            <span id="col-cnt-active" class="badge badge-rule">0</span>
          </h3>
          <div id="list-active" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>⏳ Blocked (Prereqs)</span>
            <span id="col-cnt-blocked" class="badge" style="background: rgba(156, 163, 175, 0.2); color: #9ca3af;">0</span>
          </h3>
          <div id="list-blocked" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #10b981; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>✅ Completed</span>
            <span id="col-cnt-done" class="badge badge-file">0</span>
          </h3>
          <div id="list-done" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
      </div>
    </div>

    <!-- TAB 6: CONFLICTS -->
    <div id="tab-conflicts" class="tab-content">
      <div style="margin-bottom: 16px; color: var(--text-muted); font-size: 13px;">
        FastrMemory proactively detects contradictions between newly proposed facts and existing rules before they confuse autonomous coding agents.
      </div>
      <div id="conflicts-list" style="display: flex; flex-direction: column; gap: 14px;"></div>
    </div>

    <!-- TAB 7: TIMELINE -->
    <div id="tab-timeline" class="tab-content">
      <div id="timeline-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
    </div>
  </main>

  <!-- DETAIL MODAL: MEMORY -->
  <div class="modal-overlay" id="modal-overlay" onclick="closeModal(event)">
    <div class="modal-card" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div id="modal-title" style="font-weight: 700; font-size: 16px;"></div>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 8px;" id="modal-badges"></div>
        <div style="font-size: 13px; color: var(--text-muted);">
          <b>ID:</b> <code id="modal-id" style="color: #60a5fa;"></code> &bull; 
          <b>Module:</b> <span id="modal-module"></span> &bull; 
          <b>Score:</b> <span id="modal-score"></span>
        </div>
        <div style="font-size: 13px; color: var(--text-muted);" id="modal-files-row"></div>
        <pre id="modal-content" style="background: var(--card); padding: 14px; border-radius: 8px; font-family: monospace; font-size: 13px; white-space: pre-wrap; line-height: 1.6;"></pre>
      </div>
    </div>
  </div>

  <!-- DETAIL MODAL: ACTION -->
  <div class="modal-overlay" id="action-modal-overlay" onclick="closeActionModal(event)">
    <div class="modal-card" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div id="act-modal-title" style="font-weight: 700; font-size: 16px;"></div>
        <button class="modal-close" onclick="closeActionModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 8px;" id="act-modal-badges"></div>
        <div style="font-size: 13px; color: var(--text-muted);">
          <b>Action ID:</b> <code id="act-modal-id" style="color: #60a5fa;"></code> &bull; 
          <b>Priority:</b> <span id="act-modal-priority"></span> &bull; 
          <b>Assigned To:</b> <span id="act-modal-agent"></span>
        </div>
        <div style="font-size: 13px; color: var(--text-muted);" id="act-modal-reqs"></div>
        <div style="font-size: 13px; color: var(--text-muted);" id="act-modal-unlocks"></div>
        <div style="font-size: 13px; color: var(--text-muted);" id="act-modal-conflicts"></div>
        <div style="font-size: 13px; color: var(--text-muted);"><b>Description:</b></div>
        <pre id="act-modal-desc" style="background: var(--card); padding: 14px; border-radius: 8px; font-family: monospace; font-size: 13px; white-space: pre-wrap; line-height: 1.6;"></pre>
      </div>
    </div>
  </div>

  <script>
    let currentTab = 'overview';
    let allMemories = [];
    let currentModule = 'all';
    let graphMode = 'knowledge'; // 'knowledge' | 'actions'
    let graphData = { nodes: [], edges: [] };
    let allActionsData = { actions: [], edges: [], frontierCount: 0 };
    let graphSimulationRunning = true;

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function switchTab(tabId) {
      currentTab = tabId;
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      
      const targetBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick')?.includes(tabId));
      if (targetBtn) targetBtn.classList.add('active');
      
      const targetContent = document.getElementById('tab-' + tabId);
      if (targetContent) targetContent.classList.add('active');

      if (tabId === 'graph') {
        initGraphCanvas();
      } else if (tabId === 'actions') {
        loadActionsBoard();
      } else if (tabId === 'conflicts') {
        loadConflictsList();
      } else if (tabId === 'timeline') {
        loadTimeline();
      }
    }

    async function loadStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        document.getElementById('stat-active').textContent = data.activeCount ?? 0;
        document.getElementById('stat-traps').textContent = data.trapsCount ?? 0;
        document.getElementById('stat-frontier').textContent = data.frontierCount ?? 0;
        document.getElementById('stat-graph-nodes').textContent = data.graphNodesCount ?? 0;
        document.getElementById('stat-conflicts').textContent = data.conflictsCount ?? 0;
        document.getElementById('stat-spool').textContent = data.spoolPending ? 'Pending' : 'Clear (0)';
        
        document.getElementById('tab-cnt-mem').textContent = data.activeCount ?? 0;
        document.getElementById('tab-cnt-traps').textContent = data.trapsCount ?? 0;
        document.getElementById('tab-cnt-actions').textContent = data.actionsCount ?? 0;
        document.getElementById('tab-cnt-conflicts').textContent = data.conflictsCount ?? 0;

        // Populate module filter pills
        const pillsContainer = document.getElementById('module-pills');
        if (pillsContainer) {
          pillsContainer.innerHTML = '<button class="pill active" onclick="filterByModule(\\'all\\')">All Modules</button>' +
            (data.modules || []).map(m => '<button class="pill" onclick="filterByModule(' + escapeHtml(JSON.stringify(m)) + ')">' + escapeHtml(m) + '</button>').join('');
        }
      } catch (err) {
        console.error('Failed to load status', err);
      }
    }

    async function loadMemories(query = '') {
      try {
        let url = '/api/memories?q=' + encodeURIComponent(query);
        if (currentModule !== 'all') {
          url += '&module=' + encodeURIComponent(currentModule);
        }
        const res = await fetch(url);
        allMemories = await res.json();

        renderMemoriesGrid(allMemories, 'memories-grid');
        
        // Also populate traps tab
        const traps = allMemories.filter(m => m.kind === 'error_trap');
        renderMemoriesGrid(traps, 'traps-grid');
      } catch (err) {
        console.error('Failed to load memories', err);
      }
    }

    function filterByModule(mod) {
      currentModule = mod;
      document.querySelectorAll('#module-pills .pill').forEach(p => p.classList.remove('active'));
      const activePill = Array.from(document.querySelectorAll('#module-pills .pill')).find(p => p.textContent === mod || (mod === 'all' && p.textContent === 'All Modules'));
      if (activePill) activePill.classList.add('active');
      loadMemories(document.getElementById('search-input')?.value || '');
    }

    function renderMemoriesGrid(memories, containerId) {
      const grid = document.getElementById(containerId);
      if (!grid) return;

      if (memories.length === 0) {
        grid.innerHTML = '<div style="color: var(--text-muted); padding: 40px; text-align: center; grid-column: 1 / -1;">No memories match your query.</div>';
        return;
      }

      grid.innerHTML = memories.map(m => {
        const isTrap = m.kind === 'error_trap';
        const kindBadge = isTrap
          ? '<span class="badge badge-trap">[TRAP]</span>'
          : m.kind === 'decision'
          ? '<span class="badge badge-decision">[DECISION]</span>'
          : '<span class="badge badge-rule">[RULE]</span>';

        const filesHtml = (m.linked_files && m.linked_files.length > 0)
          ? '<div class="files-list">' + m.linked_files.map(f => '<span class="file-tag">' + escapeHtml(f) + '</span>').join('') + '</div>'
          : '<span style="color: var(--text-muted);">No linked files</span>';

        return '<div class="card ' + (isTrap ? 'card-trap' : '') + '" onclick="openMemoryModal(\\'' + m.id + '\\')">' +
          '<div class="card-header">' +
            '<div>' +
              '<div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">[' + m.id + '] &bull; ' + escapeHtml(m.module) + '</div>' +
              '<div class="card-title">' + escapeHtml(m.title) + '</div>' +
            '</div>' +
            kindBadge +
          '</div>' +
          '<div class="card-content">' + escapeHtml(m.content) + '</div>' +
          '<div class="card-footer">' +
            filesHtml +
            '<span>Score: ' + m.reward_score + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    async function loadTimeline() {
      try {
        const res = await fetch('/api/timeline?limit=50');
        const items = await res.json();
        const list = document.getElementById('timeline-list');
        if (!list) return;
        
        list.innerHTML = items.map(item => {
          const isSuperseded = item.status === 'superseded';
          const badgeClass = item.kind === 'error_trap' ? 'badge-trap' : 'badge-rule';
          return '<div style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">' +
            '<div>' +
              '<div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">' +
                '<span class="badge ' + badgeClass + '">[' + item.kind.toUpperCase() + ']</span>' +
                '<span style="font-size: 11px; color: var(--text-muted);">' + item.createdAt + '</span>' +
                (isSuperseded ? '<span style="font-size: 10px; color: #f87171; border: 1px solid rgba(248,113,113,0.3); padding: 1px 5px; border-radius: 4px;">SUPERSEDED</span>' : '') +
              '</div>' +
              '<div style="font-weight: 600; font-size: 14px;">' + escapeHtml(item.title) + '</div>' +
              '<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Files: ' + (item.linkedFiles.map(escapeHtml).join(', ') || 'None') + '</div>' +
            '</div>' +
            '<div style="font-size: 12px; color: #60a5fa;">Score: ' + item.rewardScore + '</div>' +
          '</div>';
        }).join('');
      } catch (err) {
        console.error('Failed to load timeline', err);
      }
    }

    async function loadActionsBoard() {
      try {
        const res = await fetch('/api/actions');
        allActionsData = await res.json();
        
        const frontier = allActionsData.actions.filter(a => a.isFrontier);
        const active = allActionsData.actions.filter(a => a.status === 'active');
        const blocked = allActionsData.actions.filter(a => a.status === 'blocked' || (a.status === 'pending' && !a.isFrontier));
        const done = allActionsData.actions.filter(a => a.status === 'done');

        document.getElementById('col-cnt-frontier').textContent = frontier.length;
        document.getElementById('col-cnt-active').textContent = active.length;
        document.getElementById('col-cnt-blocked').textContent = blocked.length;
        document.getElementById('col-cnt-done').textContent = done.length;

        renderActionList(frontier, 'list-frontier', 'frontier');
        renderActionList(active, 'list-active', 'active');
        renderActionList(blocked, 'list-blocked', 'blocked');
        renderActionList(done, 'list-done', 'done');
      } catch (err) {
        console.error('Failed to load actions board', err);
      }
    }

    function renderActionList(items, containerId, category) {
      const container = document.getElementById(containerId);
      if (!container) return;
      if (items.length === 0) {
        container.innerHTML = '<div style="color: var(--text-muted); font-size: 12px; padding: 16px; border: 1px dashed var(--border); border-radius: 8px; text-align: center;">Empty</div>';
        return;
      }
      container.innerHTML = items.map(function(a) {
        var borderCol = category === 'frontier' ? '#f59e0b' : category === 'active' ? '#3b82f6' : category === 'done' ? '#10b981' : '#6b7280';
        var assignHtml = a.assigned_to ? '<span>&bull; ' + escapeHtml(a.assigned_to) + '</span>' : '<span style="color: #34d399;">&bull; Unassigned</span>';
        var reqHtml = (a.requires && a.requires.length > 0) ? '<span style="color: #94a3b8;">&bull; Req: ' + a.requires.length + '</span>' : '';
        return '<div class="card" onclick="openActionModal(\\'' + a.id + '\\')" style="padding: 12px; border-left: 3px solid ' + borderCol + ';">' +
          '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">' +
            '<div style="font-size: 13px; font-weight: 600; color: #fff;">' + escapeHtml(a.title) + '</div>' +
            '<span class="badge" style="background: rgba(255,255,255,0.08); color: #cbd5e1;">P' + a.priority + '</span>' +
          '</div>' +
          '<div style="font-size: 11px; color: var(--text-muted); display: flex; gap: 8px; align-items: center; margin-top: 4px;">' +
            '<code>' + a.id + '</code>' +
            assignHtml +
            reqHtml +
          '</div>' +
        '</div>';
      }).join('');
    }

    async function resolveConflictAction(conflictId, keepMemoryId, forgetLoser) {
      try {
        const res = await fetch('/api/conflicts/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conflictId, keepMemoryId, forgetLoser, reason: 'Resolved via FastrMemory Hub' })
        });
        if (!res.ok) {
          const err = await res.json();
          alert('Failed to resolve: ' + (err.error || 'Unknown error'));
          return;
        }
        await loadConflictsList();
        await loadStatus();
      } catch (err) {
        alert('Resolution request failed: ' + err.message);
      }
    }

    async function loadConflictsList() {
      try {
        const res = await fetch('/api/conflicts');
        const conflicts = await res.json();
        const container = document.getElementById('conflicts-list');
        if (!container) return;
        if (conflicts.length === 0) {
          container.innerHTML = '<div style="color: #34d399; padding: 40px; text-align: center; background: var(--surface); border: 1px solid var(--border); border-radius: 10px;">✨ Zero open contradictions detected. All knowledge rules are consistent!</div>';
          return;
        }
        container.innerHTML = conflicts.map(function(c) {
          var scorePct = (c.score * 100).toFixed(0);
          return '<div class="card" style="border-left: 4px solid var(--rose); padding: 18px;">' +
            '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">' +
              '<span class="badge" style="background: rgba(244, 63, 94, 0.2); color: #fb7185;">Contradiction (' + scorePct + '% Conflict Score)</span>' +
              '<span style="font-size: 11px; color: var(--text-muted);">' + c.created_at + '</span>' +
            '</div>' +
            '<div style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">' + escapeHtml(c.reason) + '</div>' +
            '<div style="font-size: 12px; color: var(--text-muted); font-family: monospace; margin-bottom: 12px;">' +
              'Memory A: <code style="color: #60a5fa;">' + c.memory_a_id + '</code> vs Memory B: <code style="color: #f43f5e;">' + c.memory_b_id + '</code>' +
            '</div>' +
            '<div style="display: flex; gap: 8px; flex-wrap: wrap;">' +
              '<button class="pill" style="background: rgba(59, 130, 246, 0.15); border-color: #3b82f6; color: #93c5fd; font-size: 11px; padding: 4px 10px;" onclick="resolveConflictAction(' + c.id + ', \\'' + c.memory_a_id + '\\', true)">Keep ' + c.memory_a_id + ' (Deprecate B)</button>' +
              '<button class="pill" style="background: rgba(244, 63, 94, 0.15); border-color: #f43f5e; color: #fca5a5; font-size: 11px; padding: 4px 10px;" onclick="resolveConflictAction(' + c.id + ', \\'' + c.memory_b_id + '\\', true)">Keep ' + c.memory_b_id + ' (Deprecate A)</button>' +
              '<button class="pill" style="background: rgba(255, 255, 255, 0.05); color: #cbd5e1; font-size: 11px; padding: 4px 10px;" onclick="resolveConflictAction(' + c.id + ', \\'' + c.memory_a_id + '\\', false)">Keep Both (Weaken B)</button>' +
            '</div>' +
          '</div>';
        }).join('');
      } catch (err) {
        console.error('Failed to load conflicts', err);
      }
    }

    async function openMemoryModal(id) {
      let mem = allMemories.find(m => m.id === id);
      if (!mem) {
        try {
          const res = await fetch('/api/memories?q=' + encodeURIComponent(id));
          const results = await res.json();
          mem = results.find(m => m.id === id);
        } catch (e) {}
      }
      if (!mem) return;

      document.getElementById('modal-title').textContent = mem.title;
      document.getElementById('modal-id').textContent = mem.id;
      document.getElementById('modal-module').textContent = mem.module;
      document.getElementById('modal-score').textContent = mem.reward_score;
      document.getElementById('modal-content').textContent = mem.content;
      
      const badgeContainer = document.getElementById('modal-badges');
      badgeContainer.innerHTML = '<span class="badge ' + (mem.kind === 'error_trap' ? 'badge-trap' : 'badge-rule') + '">[' + mem.kind.toUpperCase() + ']</span>' +
        '<span class="badge badge-file">' + mem.status.toUpperCase() + '</span>';

      const filesRow = document.getElementById('modal-files-row');
      filesRow.innerHTML = (mem.linked_files && mem.linked_files.length > 0)
        ? '<b>Linked Files:</b> ' + mem.linked_files.map(f => '<code style="color: #93c5fd; margin-right: 6px;">' + escapeHtml(f) + '</code>').join('')
        : '<b>Linked Files:</b> None';

      document.getElementById('modal-overlay').classList.add('active');
    }

    function closeModal(e) {
      document.getElementById('modal-overlay').classList.remove('active');
    }

    async function openActionModal(id) {
      if (!allActionsData || !allActionsData.actions) {
        try {
          const res = await fetch('/api/actions');
          allActionsData = await res.json();
        } catch (e) {}
      }
      const act = (allActionsData?.actions || []).find(a => a.id === id);
      if (!act) return;

      document.getElementById('act-modal-title').textContent = act.title;
      document.getElementById('act-modal-id').textContent = act.id;
      document.getElementById('act-modal-priority').textContent = 'P' + act.priority;
      document.getElementById('act-modal-agent').textContent = act.assigned_to || 'Unassigned (Open for Claim)';
      document.getElementById('act-modal-desc').textContent = act.description || 'No detailed description.';

      const badgeContainer = document.getElementById('act-modal-badges');
      const isFrontier = act.isFrontier;
      badgeContainer.innerHTML = (isFrontier ? '<span class="badge badge-trap">⚡ FRONTIER READY</span> ' : '') +
        '<span class="badge" style="background: rgba(255,255,255,0.1); color: #fff;">' + act.status.toUpperCase() + '</span>';

      const reqsEl = document.getElementById('act-modal-reqs');
      reqsEl.innerHTML = (act.requires && act.requires.length > 0)
        ? '<b>Prerequisites (Requires):</b> ' + act.requires.map(r => '<code style="color: #93c5fd; margin-right: 6px;">' + escapeHtml(r) + '</code>').join('')
        : '<b>Prerequisites:</b> None (Unblocked)';

      const unlocksEl = document.getElementById('act-modal-unlocks');
      unlocksEl.innerHTML = (act.unlocks && act.unlocks.length > 0)
        ? '<b>Unlocks Downstream:</b> ' + act.unlocks.map(u => '<code style="color: #34d399; margin-right: 6px;">' + escapeHtml(u) + '</code>').join('')
        : '<b>Unlocks Downstream:</b> None';

      const conflictsEl = document.getElementById('act-modal-conflicts');
      conflictsEl.innerHTML = (act.conflictsWith && act.conflictsWith.length > 0)
        ? '<b style="color: #fb7185;">Mutex Conflicts With:</b> ' + act.conflictsWith.map(c => '<code style="color: #fb7185; margin-right: 6px;">' + escapeHtml(c) + '</code>').join('')
        : '<b>Mutex Conflicts:</b> None';

      document.getElementById('action-modal-overlay').classList.add('active');
    }

    function closeActionModal() {
      document.getElementById('action-modal-overlay').classList.remove('active');
    }

    // --- HTML5 CANVAS VISUALIZER (KNOWLEDGE GRAPH & ACTION DAG) ---
    let canvas, ctx, nodes = [], edges = [], transform = { x: 0, y: 0, k: 1 };
    let isDragging = false, dragNode = null, dragStart = { x: 0, y: 0 }, dragStartMouse = { x: 0, y: 0 };
    let resizeListenerAdded = false, animationFrameId = null;

    async function initGraphCanvas() {
      canvas = document.getElementById('graph-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      resizeCanvas();
      if (!resizeListenerAdded) {
        window.addEventListener('resize', resizeCanvas);
        resizeListenerAdded = true;
      }

      if (graphMode === 'knowledge') {
        await loadKnowledgeGraph();
      } else {
        await loadActionsGraph();
      }
      setupGraphInteraction();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      animateGraph();
    }

    function resizeCanvas() {
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function switchGraphMode(mode) {
      graphMode = mode;
      document.getElementById('btn-mode-knowledge')?.classList.toggle('active', mode === 'knowledge');
      document.getElementById('btn-mode-actions')?.classList.toggle('active', mode === 'actions');
      
      const descEl = document.getElementById('graph-mode-desc');
      const legendEl = document.getElementById('graph-legend');
      
      if (mode === 'knowledge') {
        if (descEl) descEl.textContent = 'Visualizing semantic memory nodes, error traps (conditional boost), code files, and extracted entities.';
        if (legendEl) {
          legendEl.innerHTML = '<div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Code File Node</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #fbbf24;"></div> Error Trap [TRAP] (conditional boost)</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Verified Rule</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div> Architecture Decision</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #ec4899;"></div> Entity Link</div>';
        }
        loadKnowledgeGraph();
      } else {
        if (descEl) descEl.textContent = 'Multi-Agent Action DAG: Topological task dependencies, animated glowing Frontier nodes, and mutex locks.';
        if (legendEl) {
          legendEl.innerHTML = '<div class="legend-item"><div class="legend-dot" style="background: #f59e0b; box-shadow: 0 0 8px #f59e0b;"></div> Ready Frontier (Unblocked)</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Active (In Progress)</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #6b7280;"></div> Blocked on Prereqs</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Completed Task</div>' +
            '<div class="legend-item"><span style="color: #38bdf8; font-weight: bold; font-size: 14px;">&rarr;</span> Dependency Flow</div>' +
            '<div class="legend-item"><span style="color: #ef4444; font-weight: bold; font-size: 14px;">- - -</span> Mutex Conflict</div>';
        }
        loadActionsGraph();
      }
    }

    async function loadKnowledgeGraph() {
      const res = await fetch('/api/graph');
      graphData = await res.json();
      setupKnowledgePhysics(graphData);
    }

    function setupKnowledgePhysics(data) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      nodes = (data.nodes || []).map((n, i) => {
        const angle = (i / Math.max(1, data.nodes.length)) * Math.PI * 2;
        const radius = 120 + Math.random() * 100;
        return {
          ...n,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          radius: n.type === 'file' ? 14 : n.type === 'entity' ? 13 : n.kind === 'error_trap' ? 16 : 12,
        };
      });
      edges = (data.edges || []).map(e => ({
        source: e.source,
        target: e.target,
        type: 'link'
      }));
    }

    async function loadActionsGraph() {
      const res = await fetch('/api/actions');
      allActionsData = await res.json();
      setupActionsPhysics(allActionsData);
    }

    function setupActionsPhysics(data) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const statusColors = {
        done: '#10b981',
        active: '#3b82f6',
        frontier: '#f59e0b',
        blocked: '#6b7280',
        cancelled: '#ef4444',
        pending: '#8b5cf6'
      };

      nodes = (data.actions || []).map((a, i) => {
        const isFrontier = a.isFrontier;
        const statusKey = isFrontier ? 'frontier' : a.status;
        const angle = (i / Math.max(1, data.actions.length)) * Math.PI * 2;
        const radius = 110 + (i % 3) * 60;
        return {
          id: a.id,
          label: a.title,
          type: 'action',
          status: a.status,
          isFrontier,
          priority: a.priority,
          assigned_to: a.assigned_to,
          color: statusColors[statusKey] || '#6b7280',
          radius: isFrontier ? 18 : 14,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: 0,
          vy: 0
        };
      });

      edges = (data.edges || []).map(e => ({
        source: e.source_action_id,
        target: e.target_action_id,
        type: e.edge_type // 'requires' or 'conflicts_with'
      }));
    }

    function setupGraphInteraction() {
      canvas.onmousedown = (e) => {
        dragStartMouse = { x: e.clientX, y: e.clientY };
        const mouseX = (e.offsetX - transform.x) / transform.k;
        const mouseY = (e.offsetY - transform.y) / transform.k;
        const hit = nodes.find(n => Math.hypot(n.x - mouseX, n.y - mouseY) < n.radius + 6);
        if (hit) {
          dragNode = hit;
        } else {
          isDragging = true;
          dragStart = { x: e.offsetX - transform.x, y: e.offsetY - transform.y };
        }
      };

      canvas.onmousemove = (e) => {
        if (dragNode) {
          dragNode.x = (e.offsetX - transform.x) / transform.k;
          dragNode.y = (e.offsetY - transform.y) / transform.k;
          dragNode.vx = 0;
          dragNode.vy = 0;
        } else if (isDragging) {
          transform.x = e.offsetX - dragStart.x;
          transform.y = e.offsetY - dragStart.y;
        }
      };

      window.onmouseup = (e) => {
        const mouseDist = Math.hypot(e.clientX - dragStartMouse.x, e.clientY - dragStartMouse.y);
        if (dragNode && mouseDist < 6) {
          if (dragNode.type === 'memory') {
            openMemoryModal(dragNode.id);
          } else if (dragNode.type === 'action') {
            openActionModal(dragNode.id);
          } else if (dragNode.type === 'file') {
            switchTab('memories');
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
              searchInput.value = dragNode.label;
              loadMemories(dragNode.label);
            }
          }
        }
        dragNode = null;
        isDragging = false;
      };

      canvas.onwheel = (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        transform.k = Math.max(0.3, Math.min(3, transform.k * factor));
      };
    }

    function zoomGraph(factor) {
      transform.k = Math.max(0.3, Math.min(3, transform.k * factor));
    }

    function resetGraphZoom() {
      transform = { x: 0, y: 0, k: 1 };
    }

    function toggleGraphPhysics() {
      graphSimulationRunning = !graphSimulationRunning;
    }

    function animateGraph() {
      if (currentTab !== 'graph') {
        animationFrameId = null;
        return;
      }

      if (graphSimulationRunning) {
        // Node repulsion
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 220) {
              const f = (220 - dist) / dist * 0.45;
              nodes[i].vx -= dx * f * 0.05;
              nodes[i].vy -= dy * f * 0.05;
              nodes[j].vx += dx * f * 0.05;
              nodes[j].vy += dy * f * 0.05;
            }
          }
        }

        // Edge attraction
        for (const e of edges) {
          const s = nodes.find(n => n.id === e.source);
          const t = nodes.find(n => n.id === e.target);
          if (s && t) {
            const dx = t.x - s.x;
            const dy = t.y - s.y;
            const spring = e.type === 'conflicts_with' ? 0.001 : 0.0035;
            s.vx += dx * spring;
            s.vy += dy * spring;
            t.vx -= dx * spring;
            t.vy -= dy * spring;
          }
        }

        // Apply friction
        for (const n of nodes) {
          if (n !== dragNode) {
            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.85;
            n.vy *= 0.85;
          }
        }
      }

      // Draw frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      // Draw edges
      for (const e of edges) {
        const s = nodes.find(n => n.id === e.source);
        const t = nodes.find(n => n.id === e.target);
        if (s && t) {
          ctx.beginPath();
          if (e.type === 'conflicts_with') {
            ctx.setLineDash([6, 4]);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
            ctx.setLineDash([]);
          } else if (e.type === 'requires') {
            ctx.setLineDash([]);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.8;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();

            // Directed arrow from prerequisite (target) to dependent (source)
            const angle = Math.atan2(s.y - t.y, s.x - t.x);
            const arrowDist = s.radius + 3;
            const arrowX = s.x - Math.cos(angle) * arrowDist;
            const arrowY = s.y - Math.sin(angle) * arrowDist;
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - 9 * Math.cos(angle - Math.PI / 6), arrowY - 9 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(arrowX - 9 * Math.cos(angle + Math.PI / 6), arrowY - 9 * Math.sin(angle + Math.PI / 6));
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
          } else {
            ctx.setLineDash([]);
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 1.5;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        // Frontier glowing aura animation
        if (n.isFrontier) {
          const pulse = (Math.sin(Date.now() / 220) + 1) * 3.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + pulse + 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        
        if (n.type === 'action') {
          ctx.fillStyle = n.color;
        } else if (n.type === 'file') {
          ctx.fillStyle = '#10b981';
        } else if (n.type === 'entity') {
          ctx.fillStyle = '#ec4899';
        } else if (n.kind === 'error_trap') {
          ctx.fillStyle = '#fbbf24';
        } else if (n.kind === 'decision') {
          ctx.fillStyle = '#8b5cf6';
        } else {
          ctx.fillStyle = '#3b82f6';
        }
        ctx.fill();
        ctx.strokeStyle = '#111827';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        const labelText = n.type === 'action' ? ('[P' + n.priority + '] ' + n.label) : n.label;
        const truncated = labelText.length > 22 ? labelText.slice(0, 20) + '...' : labelText;
        ctx.fillText(truncated, n.x, n.y + n.radius + 14);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animateGraph);
    }

    // Debounce search
    let debounceTimer;
    document.getElementById('search-input')?.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        loadMemories(e.target.value);
      }, 200);
    });

    loadStatus();
    loadMemories();
    loadActionsBoard();
    loadConflictsList();
  </script>
</body>
</html>`;
}
