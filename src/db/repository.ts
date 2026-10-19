import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { RawEvent, Memory, FileLink, Handoff, Entity, GraphEdge, MemoryConflict, Prediction, Action, ActionEdge, MemorySlot, applySchema } from './schema.js';
import { SpoolManager } from './spool.js';
import { extractEntities } from '../learn/ner.js';
import { detectConflict } from '../learn/conflicts.js';
import { calculateBaserate, PredictionBaserate } from '../learn/planning-fallacy.js';

export interface CreateMemoryParams {
  projectId: string;
  scope?: 'project' | 'global';
  agentId?: string;
  module?: string;
  kind: 'rule' | 'decision' | 'error_trap' | 'workflow';
  title: string;
  content: string;
  files?: string[];
  symbols?: string[];
  verified?: boolean;
  pinned?: boolean;
  sourceEventIds?: string[];
}

export interface ProjectStatus {
  projectId: string;
  activeCount: number;
  stagingCount: number;
  supersededCount: number;
  dormantCount: number;
  rawEventCount: number;
  pendingSpoolCount: number;
  embeddingCoveragePercent: number;
}

export class FastrRepository {
  private db: DatabaseSync;
  private spool?: SpoolManager;

  constructor(db: DatabaseSync, spool?: SpoolManager) {
    this.db = db;
    this.spool = spool;
  }

  hasGlobalDb(): boolean {
    try {
      const list = this.db.prepare('PRAGMA database_list').all() as any[];
      return list.some((d) => d.name === 'global_db');
    } catch {
      return false;
    }
  }

  attachGlobalDatabase(globalDbPath: string): boolean {
    try {
      if (globalDbPath !== ':memory:') {
        const dir = path.dirname(globalDbPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const gDb = new DatabaseSync(globalDbPath);
        applySchema(gDb);
        gDb.close();
      }

      if (this.hasGlobalDb()) return true;

      const normalized = globalDbPath.replace(/\\/g, '/');
      this.db.exec(`ATTACH DATABASE '${normalized}' AS global_db`);
      return true;
    } catch {
      return false;
    }
  }

  // --- RAW EVENTS ---

  insertRawEvent(event: Omit<RawEvent, 'content_hash'> & { content_hash?: string }): RawEvent {
    const hash =
      event.content_hash ||
      crypto.createHash('sha256').update(event.raw_payload).digest('hex');

    const fullEvent: RawEvent = {
      ...event,
      content_hash: hash,
      agent_id: event.agent_id || 'default'
    };

    try {
      this.db.prepare(`
        INSERT OR IGNORE INTO raw_events (
          id, project_id, session_id, agent_id, event_type, tool_name, file_path, raw_payload, content_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        fullEvent.id,
        fullEvent.project_id,
        fullEvent.session_id,
        fullEvent.agent_id,
        fullEvent.event_type,
        fullEvent.tool_name || null,
        fullEvent.file_path || null,
        fullEvent.raw_payload,
        fullEvent.content_hash
      );
    } catch (err: any) {
      if (err.message && err.message.includes('SQLITE_BUSY') && this.spool) {
        this.spool.append(fullEvent);
        return fullEvent;
      }
      throw err;
    }

    return fullEvent;
  }

  getRawEvent(id: string): RawEvent | null {
    const row = this.db.prepare('SELECT * FROM raw_events WHERE id = ?').get(id) as RawEvent | undefined;
    return row || null;
  }

  getRawEventsForMemory(memoryId: string): RawEvent[] {
    const mem = this.getMemory(memoryId);
    if (!mem) return [];

    let eventIds: string[] = [];
    try {
      eventIds = JSON.parse(mem.source_event_ids);
    } catch {
      return [];
    }

    if (!Array.isArray(eventIds) || eventIds.length === 0) return [];

    const placeholders = eventIds.map(() => '?').join(',');
    const rows = this.db.prepare(`
      SELECT * FROM raw_events WHERE id IN (${placeholders}) ORDER BY created_at ASC
    `).all(...eventIds) as unknown as RawEvent[];

    return rows;
  }

  // --- MEMORIES ---

  insertMemory(params: CreateMemoryParams): Memory {
    const id = `mem_${crypto.randomBytes(4).toString('hex')}`;
    const module = params.module?.trim().toLowerCase() || 'general';
    const status = params.verified ? 'verified' : 'staging';
    const pinned = params.pinned ? 1 : 0;
    const sourceIds = JSON.stringify(params.sourceEventIds?.slice(-32) || []);
    const isGlobal = params.scope === 'global';
    const targetProject = isGlobal ? 'global' : params.projectId;
    const targetTable = (isGlobal && this.hasGlobalDb()) ? 'global_db.memories' : 'memories';

    this.db.prepare(`
      INSERT INTO ${targetTable} (
        id, project_id, agent_id, module, kind, title, content, status, pinned, source_event_ids
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      targetProject,
      params.agentId || 'default',
      module,
      params.kind,
      params.title,
      params.content,
      status,
      pinned,
      sourceIds
    );

    if (isGlobal && this.hasGlobalDb()) {
      try {
        this.db.prepare(`
          INSERT OR REPLACE INTO global_db.memories_fts (id, title, module, content)
          VALUES (?, ?, ?, ?)
        `).run(id, params.title, module, params.content);
      } catch {}
    }

    // Explicit file links
    if (params.files && params.files.length > 0) {
      this.linkFiles(id, params.files, params.symbols, isGlobal && this.hasGlobalDb());
    }

    // 1. Zero-LLM Fast-Path Named Entity Extraction (NER)
    try {
      const extracted = extractEntities(`${params.title} ${params.content}`);
      const autoFiles: string[] = [];

      for (const ent of extracted) {
        const entId = `ent_${crypto.createHash('sha256').update(`${params.projectId}:${ent.name.toLowerCase()}`).digest('hex').slice(0, 12)}`;
        
        // Upsert entity
        this.db.prepare(`
          INSERT INTO entities (id, project_id, name, entity_type)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(id) DO NOTHING
        `).run(entId, params.projectId, ent.name, ent.type);

        // Link memory to entity in knowledge graph
        const edgeId = `edge_${crypto.randomBytes(6).toString('hex')}`;
        this.db.prepare(`
          INSERT INTO graph_edges (id, project_id, source_id, target_id, edge_type, weight)
          VALUES (?, ?, ?, ?, 'entity_link', 1.0)
          ON CONFLICT(id) DO NOTHING
        `).run(edgeId, params.projectId, id, entId);

        if (ent.type === 'file' && (!params.files || params.files.length === 0)) {
          autoFiles.push(ent.name);
        }
      }

      if (autoFiles.length > 0 && (!params.files || params.files.length === 0)) {
        this.linkFiles(id, autoFiles.slice(0, 5));
      }
    } catch {
      // Non-blocking NER failure protection
    }

    // 2. Proactive Contradiction & Conflict Detection
    try {
      const candidates = this.db.prepare(`
        SELECT id, title, content FROM memories
        WHERE project_id = ? AND valid_to IS NULL AND id != ?
        ORDER BY id DESC LIMIT 50
      `).all(params.projectId, id) as unknown as Array<{ id: string; title: string; content: string }>;

      for (const c of candidates) {
        const check = detectConflict(params.title, params.content, c.title, c.content);
        if (check.hasConflict) {
          this.db.prepare(`
            INSERT INTO memory_conflicts (project_id, memory_a_id, memory_b_id, reason, score)
            VALUES (?, ?, ?, ?, ?)
          `).run(params.projectId, id, c.id, check.reason, check.score);
        }
      }
    } catch {
      // Non-blocking conflict check protection
    }

    return this.getMemory(id)!;
  }

  getMemory(id: string): Memory | null {
    let row = this.db.prepare('SELECT * FROM memories WHERE id = ?').get(id) as unknown as Memory | undefined;
    if (!row && this.hasGlobalDb()) {
      row = this.db.prepare('SELECT * FROM global_db.memories WHERE id = ?').get(id) as unknown as Memory | undefined;
    }
    return row || null;
  }

  listActiveMemories(projectId: string, module?: string): Memory[] {
    let query = `
      SELECT * FROM memories
      WHERE (project_id = ? OR project_id = 'global')
        AND valid_to IS NULL
        AND status != 'superseded'
        AND status != 'dormant'
    `;
    const params: any[] = [projectId];

    if (module) {
      query += ' AND module = ?';
      params.push(module.trim().toLowerCase());
    }

    if (this.hasGlobalDb()) {
      let gQuery = `
        UNION ALL
        SELECT * FROM global_db.memories
        WHERE valid_to IS NULL
          AND status != 'superseded'
          AND status != 'dormant'
      `;
      if (module) {
        gQuery += ' AND module = ?';
        params.push(module.trim().toLowerCase());
      }
      query += gQuery;
    }

    query += ' ORDER BY pinned DESC, reward_score DESC, created_at DESC';

    return this.db.prepare(query).all(...params) as unknown as Memory[];
  }

  listTraps(projectId: string): Memory[] {
    let query = `
      SELECT * FROM memories
      WHERE (project_id = ? OR project_id = 'global')
        AND kind = 'error_trap'
        AND valid_to IS NULL
        AND status != 'superseded'
        AND status != 'dormant'
    `;
    if (this.hasGlobalDb()) {
      query += `
        UNION ALL
        SELECT * FROM global_db.memories
        WHERE kind = 'error_trap'
          AND valid_to IS NULL
          AND status != 'superseded'
          AND status != 'dormant'
      `;
    }
    query += ' ORDER BY reward_score DESC, created_at DESC';
    return this.db.prepare(query).all(projectId) as unknown as Memory[];
  }

  supersedeMemory(
    oldMemoryId: string,
    newTitle: string,
    newContent: string,
    reason: string,
    files?: string[]
  ): { oldMemory: Memory; newMemory: Memory } {
    const oldMem = this.getMemory(oldMemoryId);
    if (!oldMem) {
      throw new Error(`Memory not found: ${oldMemoryId}`);
    }

    const newId = `mem_${crypto.randomBytes(4).toString('hex')}`;
    const nowIso = new Date().toISOString();

    this.db.exec('BEGIN TRANSACTION');
    try {
      // 1. Mark old memory as superseded
      this.db.prepare(`
        UPDATE memories
        SET valid_to = ?,
            status = 'superseded',
            superseded_by_id = ?,
            superseded_reason = ?
        WHERE id = ?
      `).run(nowIso, newId, reason, oldMemoryId);

      // 2. Insert new memory with verified status
      this.db.prepare(`
        INSERT INTO memories (
          id, project_id, agent_id, module, kind, title, content, status, pinned, reward_score, source_event_ids
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'verified', ?, ?, ?)
      `).run(
        newId,
        oldMem.project_id,
        oldMem.agent_id,
        oldMem.module,
        oldMem.kind,
        newTitle,
        newContent,
        oldMem.pinned,
        oldMem.reward_score,
        oldMem.source_event_ids
      );

      // 3. Link files
      const targetFiles = files && files.length > 0 ? files : this.getFilesForMemory(oldMemoryId);
      if (targetFiles.length > 0) {
        this.linkFiles(newId, targetFiles);
      }

      this.db.exec('COMMIT');

      return {
        oldMemory: this.getMemory(oldMemoryId)!,
        newMemory: this.getMemory(newId)!
      };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  updateFeedback(memoryId: string, outcome: 'good' | 'bad', note?: string): { reward_score: number; status: string } {
    const mem = this.getMemory(memoryId);
    if (!mem) {
      throw new Error(`Memory not found: ${memoryId}`);
    }

    let newScore = mem.reward_score;
    let newStatus = mem.status;

    if (outcome === 'good') {
      newScore = Math.min(3.0, Number((mem.reward_score + 0.2).toFixed(2)));
    } else {
      newScore = Math.max(0.1, Number((mem.reward_score - 0.5).toFixed(2)));
      // If reward drops to floor and was already low, quarantine as dormant
      if (newScore <= 0.2) {
        newStatus = 'dormant';
      }
    }

    this.db.prepare(`
      UPDATE memories
      SET reward_score = ?, status = ?
      WHERE id = ?
    `).run(newScore, newStatus, memoryId);

    return { reward_score: newScore, status: newStatus };
  }

  verifyStaging(projectId: string): number {
    const res = this.db.prepare(`
      UPDATE memories
      SET status = 'verified'
      WHERE project_id = ? AND status = 'staging'
    `).run(projectId);

    return Number(res.changes);
  }

  incrementRetrieval(memoryIds: string[]): void {
    if (memoryIds.length === 0) return;
    const nowIso = new Date().toISOString();
    const placeholders = memoryIds.map(() => '?').join(',');
    this.db.prepare(`
      UPDATE memories
      SET retrieval_count = retrieval_count + 1,
          last_recalled_at = ?
      WHERE id IN (${placeholders})
    `).run(nowIso, ...memoryIds);
  }

  updateEmbedding(memoryId: string, embedding: Float32Array): void {
    const buffer = Buffer.from(embedding.buffer, embedding.byteOffset, embedding.byteLength);
    this.db.prepare(`
      UPDATE memories
      SET embedding = ?, embedded = 1
      WHERE id = ?
    `).run(buffer, memoryId);
  }

  // --- FILE LINKS ---

  linkFiles(memoryId: string, files: string[], symbols?: string[], inGlobal: boolean = false): void {
    const table = inGlobal && this.hasGlobalDb() ? 'global_db.file_links' : 'file_links';
    const stmt = this.db.prepare(`
      INSERT OR IGNORE INTO ${table} (memory_id, file_path, symbol_name)
      VALUES (?, ?, ?)
    `);

    const symbolList = symbols && symbols.length > 0 ? symbols : [''];
    for (const f of files) {
      for (const s of symbolList) {
        stmt.run(memoryId, f, s);
      }
    }
  }

  getFilesForMemory(memoryId: string): string[] {
    let rows = this.db.prepare(`
      SELECT DISTINCT file_path FROM file_links WHERE memory_id = ?
    `).all(memoryId) as { file_path: string }[];
    if (rows.length === 0 && this.hasGlobalDb()) {
      rows = this.db.prepare(`
        SELECT DISTINCT file_path FROM global_db.file_links WHERE memory_id = ?
      `).all(memoryId) as { file_path: string }[];
    }
    return rows.map((r) => r.file_path);
  }

  getMemoriesForFile(projectId: string, filePath: string): Memory[] {
    let innerQuery = `
      SELECT m.*
      FROM memories m
      JOIN file_links fl ON fl.memory_id = m.id
      WHERE (m.project_id = ? OR m.project_id = 'global')
        AND fl.file_path = ?
        AND m.valid_to IS NULL
        AND m.status != 'superseded'
        AND m.status != 'dormant'
    `;
    const params: any[] = [projectId, filePath];

    if (this.hasGlobalDb()) {
      innerQuery += `
        UNION ALL
        SELECT gm.*
        FROM global_db.memories gm
        JOIN global_db.file_links gfl ON gfl.memory_id = gm.id
        WHERE gfl.file_path = ?
          AND gm.valid_to IS NULL
          AND gm.status != 'superseded'
          AND gm.status != 'dormant'
      `;
      params.push(filePath);
    }

    const query = `SELECT * FROM (${innerQuery}) ORDER BY kind = 'error_trap' DESC, reward_score DESC`;
    const rows = this.db.prepare(query).all(...params) as unknown as Memory[];

    return rows;
  }

  listGlobalMemories(): Memory[] {
    if (this.hasGlobalDb()) {
      return this.db.prepare(`
        SELECT * FROM global_db.memories
        WHERE valid_to IS NULL AND status != 'superseded'
        ORDER BY reward_score DESC, created_at DESC
      `).all() as unknown as Memory[];
    }
    return this.db.prepare(`
      SELECT * FROM memories
      WHERE project_id = 'global' AND valid_to IS NULL AND status != 'superseded'
      ORDER BY reward_score DESC, created_at DESC
    `).all() as unknown as Memory[];
  }

  getTimeline(projectId: string, options: { module?: string; limit?: number } = {}): Array<{
    id: string;
    kind: string;
    title: string;
    module: string;
    status: string;
    rewardScore: number;
    createdAt: string;
    validTo: string | null;
    supersededById: string | null;
    supersededReason: string | null;
    linkedFiles: string[];
  }> {
    const limit = options.limit || 50;
    let query = `
      SELECT id, kind, title, module, status, reward_score, created_at, valid_to, superseded_by_id, superseded_reason
      FROM memories
      WHERE project_id = ?
    `;
    const params: any[] = [projectId];

    if (options.module) {
      query += ` AND module = ?`;
      params.push(options.module.trim().toLowerCase());
    }

    query += ` ORDER BY created_at DESC LIMIT ?`;
    params.push(limit);

    const rows = this.db.prepare(query).all(...params) as any[];

    return rows.map((r) => ({
      id: r.id,
      kind: r.kind,
      title: r.title,
      module: r.module,
      status: r.status,
      rewardScore: r.reward_score,
      createdAt: r.created_at,
      validTo: r.valid_to,
      supersededById: r.superseded_by_id,
      supersededReason: r.superseded_reason,
      linkedFiles: this.getFilesForMemory(r.id),
    }));
  }

  queryGraph(projectId: string, options: { startFilePath?: string; depth?: number } = {}): {
    nodes: Array<{ id: string; label: string; type: 'file' | 'memory' | 'entity'; kind?: string; module?: string; score?: number }>;
    edges: Array<{ source: string; target: string; relation: string }>;
  } {
    const { startFilePath, depth = 2 } = options;

    if (startFilePath) {
      // 1-hop: memories directly linked to this file
      const initialMemories = this.getMemoriesForFile(projectId, startFilePath);
      const memoryIds = new Set(initialMemories.map((m) => m.id));
      const filePaths = new Set<string>([startFilePath]);

      // 2-hop: other files linked to these memories
      if (depth >= 2) {
        for (const mId of memoryIds) {
          const files = this.getFilesForMemory(mId);
          for (const f of files) {
            filePaths.add(f);
          }
        }
        // and memories linked to those discovered files
        for (const f of filePaths) {
          const mems = this.getMemoriesForFile(projectId, f);
          for (const m of mems) {
            memoryIds.add(m.id);
          }
        }
      }

      const nodes: Array<{ id: string; label: string; type: 'file' | 'memory'; kind?: string; module?: string; score?: number }> = [];
      const edges: Array<{ source: string; target: string; relation: string }> = [];

      for (const f of filePaths) {
        nodes.push({ id: f, label: f, type: 'file' });
      }

      for (const mId of memoryIds) {
        const mem = this.getMemory(mId);
        if (mem) {
          nodes.push({ id: mem.id, label: mem.title, type: 'memory', kind: mem.kind, module: mem.module, score: mem.reward_score });
          const linkedFiles = this.getFilesForMemory(mem.id);
          for (const lf of linkedFiles) {
            if (filePaths.has(lf)) {
              edges.push({ source: mem.id, target: lf, relation: 'links' });
            }
          }
        }
      }

      return { nodes, edges };
    }

    // Complete graph
    const memories = this.listActiveMemories(projectId);
    const fileLinks = this.db.prepare(`
      SELECT fl.memory_id, fl.file_path, m.title, m.kind, m.module, m.reward_score
      FROM file_links fl
      JOIN memories m ON m.id = fl.memory_id
      WHERE m.project_id = ? AND m.valid_to IS NULL
    `).all(projectId) as any[];

    const nodesMap = new Map<string, { id: string; label: string; type: 'file' | 'memory' | 'entity'; kind?: string; module?: string; score?: number }>();
    const edges: Array<{ source: string; target: string; relation: string }> = [];

    for (const m of memories) {
      nodesMap.set(m.id, { id: m.id, label: m.title, type: 'memory', kind: m.kind, module: m.module, score: m.reward_score });
    }

    for (const fl of fileLinks) {
      if (!nodesMap.has(fl.file_path)) {
        nodesMap.set(fl.file_path, { id: fl.file_path, label: fl.file_path, type: 'file' });
      }
      edges.push({ source: fl.memory_id, target: fl.file_path, relation: 'links' });
    }

    const entities = this.getEntities(projectId);
    for (const ent of entities) {
      if (!nodesMap.has(ent.id)) {
        nodesMap.set(ent.id, { id: ent.id, label: ent.name, type: 'entity', kind: ent.entity_type });
      }
    }

    const graphEdges = this.db.prepare(`
      SELECT source_id, target_id, edge_type FROM graph_edges WHERE project_id = ?
    `).all(projectId) as Array<{ source_id: string; target_id: string; edge_type: string }>;
    for (const ge of graphEdges) {
      edges.push({ source: ge.source_id, target: ge.target_id, relation: ge.edge_type });
    }

    return {
      nodes: Array.from(nodesMap.values()),
      edges,
    };
  }

  // --- HANDOFFS ---

  saveHandoff(handoff: Handoff): Handoff {
    const activeFilesJson = typeof handoff.active_files === 'string'
      ? handoff.active_files
      : JSON.stringify(handoff.active_files || []);

    const res = this.db.prepare(`
      INSERT INTO handoffs (project_id, session_id, task_title, summary, next_step, active_files)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      handoff.project_id,
      handoff.session_id,
      handoff.task_title,
      handoff.summary,
      handoff.next_step,
      activeFilesJson
    );

    return {
      ...handoff,
      id: Number(res.lastInsertRowid),
      created_at: new Date().toISOString()
    };
  }

  getLatestHandoff(projectId: string): Handoff | null {
    const row = this.db.prepare(`
      SELECT * FROM handoffs WHERE project_id = ? ORDER BY id DESC LIMIT 1
    `).get(projectId) as unknown as Handoff | undefined;

    return row || null;
  }

  // --- STATUS ---

  getStatus(projectId: string): ProjectStatus {
    const counts = this.db.prepare(`
      SELECT
        COUNT(CASE WHEN valid_to IS NULL AND status = 'verified' THEN 1 END) as activeCount,
        COUNT(CASE WHEN valid_to IS NULL AND status = 'staging' THEN 1 END) as stagingCount,
        COUNT(CASE WHEN status = 'superseded' THEN 1 END) as supersededCount,
        COUNT(CASE WHEN status = 'dormant' THEN 1 END) as dormantCount,
        COUNT(CASE WHEN embedded = 1 THEN 1 END) as embeddedCount,
        COUNT(*) as totalMemories
      FROM memories
      WHERE project_id = ?
    `).get(projectId) as any;

    const rawEvents = this.db.prepare(`
      SELECT COUNT(*) as count FROM raw_events WHERE project_id = ?
    `).get(projectId) as any;

    const total = counts.totalMemories || 0;
    const embedded = counts.embeddedCount || 0;
    const coverage = total > 0 ? Math.round((embedded / total) * 100) : 100;

    let pendingSpool = 0;
    if (this.spool && this.spool.hasPending()) {
      pendingSpool = 1;
    }

    return {
      projectId,
      activeCount: counts.activeCount || 0,
      stagingCount: counts.stagingCount || 0,
      supersededCount: counts.supersededCount || 0,
      dormantCount: counts.dormantCount || 0,
      rawEventCount: rawEvents.count || 0,
      pendingSpoolCount: pendingSpool,
      embeddingCoveragePercent: coverage
    };
  }

  // --- SNAPSHOTS & TIME TRAVEL (Memoria parity) ---

  createSnapshot(projectId: string, tag: string, description?: string): { id: string; tag: string; memoryCount: number; createdAt: string } {
    const id = `snap_${crypto.randomBytes(4).toString('hex')}`;
    const memories = this.listActiveMemories(projectId);
    const fileLinks = this.db.prepare(`
      SELECT fl.* FROM file_links fl
      JOIN memories m ON m.id = fl.memory_id
      WHERE m.project_id = ? AND m.valid_to IS NULL
    `).all(projectId);

    const state = {
      memories,
      fileLinks,
      timestamp: new Date().toISOString()
    };

    const stateJson = JSON.stringify(state);
    const createdAt = new Date().toISOString();

    this.db.prepare(`
      INSERT INTO memory_snapshots (id, project_id, tag, description, memory_count, state_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, projectId, tag, description || null, memories.length, stateJson, createdAt);

    return { id, tag, memoryCount: memories.length, createdAt };
  }

  listSnapshots(projectId: string): Array<{ id: string; tag: string; description: string | null; memoryCount: number; createdAt: string }> {
    const rows = this.db.prepare(`
      SELECT id, tag, description, memory_count as memoryCount, created_at as createdAt
      FROM memory_snapshots
      WHERE project_id = ?
      ORDER BY created_at DESC
    `).all(projectId) as any[];

    return rows;
  }

  getSnapshot(snapshotId: string): any | null {
    const row = this.db.prepare(`
      SELECT * FROM memory_snapshots WHERE id = ?
    `).get(snapshotId) as any | undefined;

    return row || null;
  }

  rollbackToSnapshot(projectId: string, snapshotId: string): { restoredCount: number; snapshotTag: string } {
    const snap = this.getSnapshot(snapshotId);
    if (!snap) {
      throw new Error(`Snapshot not found: ${snapshotId}`);
    }

    const state = JSON.parse(snap.state_json);
    const targetMemories: Memory[] = state.memories || [];
    const targetLinks: any[] = state.fileLinks || [];

    this.db.exec('BEGIN TRANSACTION');
    try {
      // 1. Mark all current active memories valid_to = now (superseded by rollback)
      const nowIso = new Date().toISOString();
      this.db.prepare(`
        UPDATE memories
        SET valid_to = ?, status = 'superseded', superseded_reason = ?
        WHERE project_id = ? AND valid_to IS NULL
      `).run(nowIso, `Rollback to snapshot ${snap.tag} (${snap.id})`, projectId);

      // 2. Re-insert or restore the snapshot memories
      for (const m of targetMemories) {
        this.db.prepare(`
          INSERT INTO memories (
            id, project_id, agent_id, module, kind, title, content, status, pinned, reward_score,
            source_event_ids, valid_from, valid_to, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?)
          ON CONFLICT(id) DO UPDATE SET
            valid_to = NULL,
            status = excluded.status,
            reward_score = excluded.reward_score
        `).run(
          m.id,
          m.project_id,
          m.agent_id,
          m.module,
          m.kind,
          m.title,
          m.content,
          m.status,
          m.pinned,
          m.reward_score,
          m.source_event_ids,
          nowIso,
          m.created_at
        );
      }

      // 3. Restore file links
      for (const fl of targetLinks) {
        this.db.prepare(`
          INSERT OR IGNORE INTO file_links (memory_id, file_path, symbol_name)
          VALUES (?, ?, ?)
        `).run(fl.memory_id, fl.file_path, fl.symbol_name || '');
      }

      this.db.exec('COMMIT');
      return { restoredCount: targetMemories.length, snapshotTag: snap.tag };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  // --- CONFLICTS & NER ---

  listConflicts(projectId: string, status: 'open' | 'resolved' | 'ignored' = 'open'): MemoryConflict[] {
    const rows = this.db.prepare(`
      SELECT * FROM memory_conflicts
      WHERE project_id = ? AND status = ?
      ORDER BY id DESC
    `).all(projectId, status) as unknown as MemoryConflict[];
    return rows;
  }

  resolveConflict(
    conflictId: number,
    keepMemoryId: string,
    forgetLoser: boolean = false,
    reason?: string
  ): { success: boolean; keptId: string; loserId: string } {
    const conflict = this.db.prepare('SELECT * FROM memory_conflicts WHERE id = ?').get(conflictId) as unknown as MemoryConflict | undefined;
    if (!conflict) {
      throw new Error(`Conflict ${conflictId} not found`);
    }

    const loserId = conflict.memory_a_id === keepMemoryId ? conflict.memory_b_id : conflict.memory_a_id;
    const nowIso = new Date().toISOString();
    const resolutionReason = reason || `Resolved conflict #${conflictId} in favor of ${keepMemoryId}`;

    this.db.exec('BEGIN TRANSACTION');
    try {
      // 1. Mark conflict as resolved
      this.db.prepare(`
        UPDATE memory_conflicts
        SET status = 'resolved', resolved_winner_id = ?, resolved_at = ?
        WHERE id = ?
      `).run(keepMemoryId, nowIso, conflictId);

      // 2. Handle loser memory
      if (forgetLoser) {
        // Soft-delete / supersede loser
        this.db.prepare(`
          UPDATE memories
          SET valid_to = ?, status = 'superseded', superseded_by_id = ?, superseded_reason = ?
          WHERE id = ?
        `).run(nowIso, keepMemoryId, resolutionReason, loserId);
      } else {
        // Weaken loser reward score by -0.4
        this.db.prepare(`
          UPDATE memories
          SET reward_score = MAX(-1.0, reward_score - 0.4)
          WHERE id = ?
        `).run(loserId);
      }

      this.db.exec('COMMIT');
      return { success: true, keptId: keepMemoryId, loserId };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  getEntities(projectId: string): Entity[] {
    const rows = this.db.prepare(`
      SELECT * FROM entities WHERE project_id = ? ORDER BY name ASC
    `).all(projectId) as unknown as Entity[];
    return rows;
  }

  // --- PREDICTIONS & PLANNING FALLACY ---

  createPrediction(params: {
    projectId: string;
    classTag: string;
    claimText: string;
    estimateValue?: number | null;
    estimateUnit?: string | null;
  }): Prediction {
    const res = this.db.prepare(`
      INSERT INTO predictions (project_id, class_tag, claim_text, estimate_value, estimate_unit)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      params.projectId,
      params.classTag.trim().toLowerCase(),
      params.claimText,
      params.estimateValue ?? null,
      params.estimateUnit ?? null
    );

    const row = this.db.prepare('SELECT * FROM predictions WHERE id = ?').get(res.lastInsertRowid) as unknown as Prediction;
    return row;
  }

  closePrediction(id: number, actualValue: number): Prediction {
    const nowIso = new Date().toISOString();
    this.db.prepare(`
      UPDATE predictions
      SET actual_value = ?, closure_state = 'closed', closed_at = ?
      WHERE id = ?
    `).run(actualValue, nowIso, id);

    const row = this.db.prepare('SELECT * FROM predictions WHERE id = ?').get(id) as unknown as Prediction | undefined;
    if (!row) throw new Error(`Prediction #${id} not found`);
    return row;
  }

  listPredictions(projectId: string, options?: { classTag?: string; state?: 'open' | 'closed' | 'closed-unknown' }): Prediction[] {
    let sql = 'SELECT * FROM predictions WHERE project_id = ?';
    const params: any[] = [projectId];

    if (options?.classTag) {
      sql += ' AND class_tag = ?';
      params.push(options.classTag.trim().toLowerCase());
    }
    if (options?.state) {
      sql += ' AND closure_state = ?';
      params.push(options.state);
    }

    sql += ' ORDER BY id DESC';
    return this.db.prepare(sql).all(...params) as unknown as Prediction[];
  }

  getPredictionBaserate(projectId: string, classTag: string): PredictionBaserate | null {
    const normalizedTag = classTag.trim().toLowerCase();
    const rows = this.db.prepare(`
      SELECT estimate_value, actual_value
      FROM predictions
      WHERE project_id = ? AND class_tag = ? AND closure_state = 'closed'
    `).all(projectId, normalizedTag) as Array<{ estimate_value: number | null; actual_value: number | null }>;

    return calculateBaserate(normalizedTag, rows);
  }

  // --- MULTI-AGENT ACTION DAG ---

  createAction(params: {
    id?: string;
    projectId: string;
    title: string;
    description?: string;
    priority?: number;
    assignedTo?: string | null;
    requires?: string[];
    conflictsWith?: string[];
  }): Action {
    const actionId = params.id || `act_${crypto.randomUUID().slice(0, 12)}`;
    const priority = params.priority ?? 5;
    const description = params.description ?? '';
    const assignedTo = params.assignedTo ?? null;

    this.db.exec('BEGIN TRANSACTION');
    try {
      this.db.prepare(`
        INSERT INTO actions (id, project_id, title, description, status, priority, assigned_to)
        VALUES (?, ?, ?, ?, 'pending', ?, ?)
      `).run(actionId, params.projectId, params.title, description, priority, assignedTo);

      if (params.requires && params.requires.length > 0) {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO action_edges (source_action_id, target_action_id, edge_type)
          VALUES (?, ?, 'requires')
        `);
        for (const req of params.requires) {
          stmt.run(actionId, req);
        }
      }

      if (params.conflictsWith && params.conflictsWith.length > 0) {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO action_edges (source_action_id, target_action_id, edge_type)
          VALUES (?, ?, 'conflicts_with')
        `);
        for (const conf of params.conflictsWith) {
          stmt.run(actionId, conf);
        }
      }

      this.db.exec('COMMIT');
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }

    return this.getAction(actionId)!;
  }

  getAction(id: string): (Action & { requires: string[]; unlocks: string[]; conflictsWith: string[] }) | null {
    const action = this.db.prepare('SELECT * FROM actions WHERE id = ?').get(id) as Action | undefined;
    if (!action) return null;

    const requiresRows = this.db.prepare(`
      SELECT target_action_id FROM action_edges WHERE source_action_id = ? AND edge_type = 'requires'
    `).all(id) as Array<{ target_action_id: string }>;

    const unlocksRows = this.db.prepare(`
      SELECT source_action_id FROM action_edges WHERE target_action_id = ? AND edge_type = 'requires'
    `).all(id) as Array<{ source_action_id: string }>;

    const conflictsRows = this.db.prepare(`
      SELECT target_action_id FROM action_edges WHERE source_action_id = ? AND edge_type = 'conflicts_with'
      UNION
      SELECT source_action_id FROM action_edges WHERE target_action_id = ? AND edge_type = 'conflicts_with'
    `).all(id, id) as Array<{ target_action_id: string }>;

    return {
      ...action,
      requires: requiresRows.map((r) => r.target_action_id),
      unlocks: unlocksRows.map((r) => r.source_action_id),
      conflictsWith: conflictsRows.map((r) => (r as any).target_action_id),
    };
  }

  updateAction(id: string, opts: {
    status?: 'pending' | 'active' | 'done' | 'blocked' | 'cancelled';
    assignedTo?: string | null;
    crystallizedInto?: string | null;
    priority?: number;
    description?: string;
  }): Action | null {
    const existing = this.db.prepare('SELECT * FROM actions WHERE id = ?').get(id) as Action | undefined;
    if (!existing) return null;

    const sets: string[] = [];
    const params: any[] = [];

    if (opts.status !== undefined) {
      sets.push('status = ?');
      params.push(opts.status);
      if (opts.status === 'done') {
        sets.push('completed_at = ?');
        params.push(new Date().toISOString());
      }
    }
    if (opts.assignedTo !== undefined) {
      sets.push('assigned_to = ?');
      params.push(opts.assignedTo);
    }
    if (opts.crystallizedInto !== undefined) {
      sets.push('crystallized_into = ?');
      params.push(opts.crystallizedInto);
    }
    if (opts.priority !== undefined) {
      sets.push('priority = ?');
      params.push(opts.priority);
    }
    if (opts.description !== undefined) {
      sets.push('description = ?');
      params.push(opts.description);
    }

    if (sets.length > 0) {
      params.push(id);
      this.db.prepare(`UPDATE actions SET ${sets.join(', ')} WHERE id = ?`).run(...params);
    }

    return this.getAction(id);
  }

  listActions(projectId: string, filter?: { status?: 'pending' | 'active' | 'done' | 'blocked' | 'cancelled'; assignedTo?: string }): Action[] {
    let sql = 'SELECT * FROM actions WHERE project_id = ?';
    const params: any[] = [projectId];

    if (filter?.status) {
      sql += ' AND status = ?';
      params.push(filter.status);
    }
    if (filter?.assignedTo) {
      sql += ' AND assigned_to = ?';
      params.push(filter.assignedTo);
    }

    sql += ' ORDER BY priority DESC, created_at ASC';
    return this.db.prepare(sql).all(...params) as unknown as Action[];
  }

  getFrontier(projectId: string): Action[] {
    const query = `
      SELECT a.*
      FROM actions a
      WHERE a.project_id = ?
        AND a.status IN ('pending', 'active')
        AND NOT EXISTS (
          SELECT 1
          FROM action_edges e
          JOIN actions prereq ON prereq.id = e.target_action_id
          WHERE e.source_action_id = a.id
            AND e.edge_type = 'requires'
            AND prereq.status != 'done'
        )
        AND NOT EXISTS (
          SELECT 1
          FROM action_edges e
          JOIN actions conf ON (
            (e.source_action_id = a.id AND conf.id = e.target_action_id)
            OR
            (e.target_action_id = a.id AND conf.id = e.source_action_id)
          )
          WHERE e.edge_type = 'conflicts_with'
            AND conf.status = 'active'
            AND conf.id != a.id
        )
      ORDER BY a.priority DESC, a.created_at ASC
    `;
    return this.db.prepare(query).all(projectId) as unknown as Action[];
  }

  getNextAction(projectId: string, agentId?: string): Action | null {
    const frontier = this.getFrontier(projectId);
    if (frontier.length === 0) return null;

    const next = frontier[0];
    if (agentId && next.status === 'pending') {
      this.updateAction(next.id, { status: 'active', assignedTo: agentId });
      return this.getAction(next.id);
    }
    return next;
  }

  // --- BOUNDED WORKING MEMORY SLOTS ---

  setSlot(projectId: string, slotKey: string, content: string, sizeLimit: number = 4000): MemorySlot {
    const normalizedKey = slotKey.trim().toLowerCase();
    if (content.length > sizeLimit) {
      throw new Error(`Content length (${content.length}) exceeds slot size limit (${sizeLimit} chars). Summarize before storing.`);
    }

    const nowIso = new Date().toISOString();
    this.db.prepare(`
      INSERT INTO memory_slots (project_id, slot_key, content, size_limit, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(project_id, slot_key) DO UPDATE SET
        content = excluded.content,
        size_limit = excluded.size_limit,
        updated_at = excluded.updated_at
    `).run(projectId, normalizedKey, content, sizeLimit, nowIso);

    return this.getSlot(projectId, normalizedKey)!;
  }

  getSlot(projectId: string, slotKey: string): MemorySlot | null {
    const normalizedKey = slotKey.trim().toLowerCase();
    const row = this.db.prepare(`
      SELECT * FROM memory_slots WHERE project_id = ? AND slot_key = ?
    `).get(projectId, normalizedKey) as unknown as MemorySlot | undefined;
    return row ?? null;
  }

  listSlots(projectId: string): MemorySlot[] {
    return this.db.prepare(`
      SELECT * FROM memory_slots WHERE project_id = ? ORDER BY slot_key ASC
    `).all(projectId) as unknown as MemorySlot[];
  }

  deleteSlot(projectId: string, slotKey: string): boolean {
    const normalizedKey = slotKey.trim().toLowerCase();
    const res = this.db.prepare(`
      DELETE FROM memory_slots WHERE project_id = ? AND slot_key = ?
    `).run(projectId, normalizedKey);
    return res.changes > 0;
  }
}
