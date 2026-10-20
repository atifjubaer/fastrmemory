import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import {
  ReplayConflict,
  ReplayEvent,
  ReplayMemory,
  ReplaySnapshot,
  canonicalJson,
  sha256
} from './snapshot.js';
import { estimateTokens } from '../search/budget.js';

export type JsonlRecordType = 'memory' | 'event' | 'file_link' | 'conflict';

export interface JsonlRecord {
  type: JsonlRecordType;
  hash: string;
  data: Record<string, unknown>;
}

export interface JsonlHeader {
  type: 'header';
  schemaVersion: 1;
  projectId: string;
  exportedAt: string;
  recordCount: number;
  contentHash: string;
}

export interface ExportJsonlResult {
  jsonl: string;
  records: number;
  contentHash: string;
  memories: number;
  events: number;
  fileLinks: number;
  conflicts: number;
}

export interface ImportJsonlResult {
  dryRun: boolean;
  memories: number;
  events: number;
  fileLinks: number;
  conflicts: number;
  skipped: number;
  contentHash: string;
}

function memoryData(row: any): Record<string, unknown> {
  return {
    id: row.id,
    project_id: row.project_id,
    agent_id: row.agent_id,
    module: row.module,
    kind: row.kind,
    title: row.title,
    content: row.content,
    status: row.status,
    pinned: Number(row.pinned ?? 0),
    reward_score: Number(row.reward_score ?? 1),
    retrieval_count: Number(row.retrieval_count ?? 0),
    valid_from: row.valid_from,
    valid_to: row.valid_to ?? null,
    superseded_by_id: row.superseded_by_id ?? null,
    superseded_reason: row.superseded_reason ?? null,
    source_event_ids: row.source_event_ids,
    created_at: row.created_at,
    last_recalled_at: row.last_recalled_at ?? null,
    provenance_hash: row.provenance_hash ?? null
  };
}

function eventData(row: any): Record<string, unknown> {
  return {
    id: row.id,
    project_id: row.project_id,
    session_id: row.session_id,
    agent_id: row.agent_id,
    event_type: row.event_type,
    tool_name: row.tool_name ?? null,
    file_path: row.file_path ?? null,
    raw_payload: row.raw_payload,
    content_hash: row.content_hash,
    created_at: row.created_at
  };
}

function linkData(row: any): Record<string, unknown> {
  return {
    memory_id: row.memory_id,
    file_path: row.file_path,
    symbol_name: row.symbol_name ?? ''
  };
}

function conflictData(row: any): Record<string, unknown> {
  return {
    id: Number(row.id),
    project_id: row.project_id,
    memory_a_id: row.memory_a_id,
    memory_b_id: row.memory_b_id,
    reason: row.reason,
    score: Number(row.score),
    status: row.status,
    resolved_winner_id: row.resolved_winner_id ?? null,
    created_at: row.created_at,
    resolved_at: row.resolved_at ?? null
  };
}

function record(type: JsonlRecordType, data: Record<string, unknown>): JsonlRecord {
  return { type, hash: sha256(canonicalJson(data)), data };
}

/** Portable JSONL export: one hashed record per line plus a hashed header. */
export function exportSnapshotJsonl(db: DatabaseSync, projectId: string, exportedAt = new Date().toISOString()): ExportJsonlResult {
  const at = new Date(exportedAt);
  if (Number.isNaN(at.getTime())) throw new Error(`Invalid export timestamp: ${exportedAt}`);

  const memoryRows = db.prepare(`
    SELECT * FROM memories WHERE project_id = ? ORDER BY id ASC
  `).all(projectId) as any[];
  const eventRows = db.prepare(`
    SELECT * FROM raw_events WHERE project_id = ? ORDER BY id ASC
  `).all(projectId) as any[];
  const linkRows = db.prepare(`
    SELECT fl.* FROM file_links fl
    JOIN memories m ON m.id = fl.memory_id
    WHERE m.project_id = ?
    ORDER BY fl.memory_id ASC, fl.file_path ASC, fl.symbol_name ASC
  `).all(projectId) as any[];
  const conflictRows = db.prepare(`
    SELECT * FROM memory_conflicts WHERE project_id = ? ORDER BY id ASC
  `).all(projectId) as any[];

  const records: JsonlRecord[] = [
    ...memoryRows.map((row) => record('memory', memoryData(row))),
    ...eventRows.map((row) => record('event', eventData(row))),
    ...linkRows.map((row) => record('file_link', linkData(row))),
    ...conflictRows.map((row) => record('conflict', conflictData(row)))
  ];

  const contentHash = sha256(records.map((entry) => entry.hash).join('\n'));
  const header: JsonlHeader = {
    type: 'header',
    schemaVersion: 1,
    projectId,
    exportedAt: at.toISOString(),
    recordCount: records.length,
    contentHash
  };

  const lines = [JSON.stringify(header), ...records.map((entry) => JSON.stringify(entry))];
  return {
    jsonl: `${lines.join('\n')}\n`,
    records: records.length,
    contentHash,
    memories: memoryRows.length,
    events: eventRows.length,
    fileLinks: linkRows.length,
    conflicts: conflictRows.length
  };
}

export function writeSnapshotJsonl(filePath: string, db: DatabaseSync, projectId: string, exportedAt?: string): ExportJsonlResult {
  const result = exportSnapshotJsonl(db, projectId, exportedAt);
  fs.writeFileSync(filePath, result.jsonl, 'utf8');
  return result;
}

export function parseSnapshotJsonl(jsonl: string): { header: JsonlHeader; records: JsonlRecord[] } {
  const lines = jsonl.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) throw new Error('Snapshot JSONL is empty');

  let header: JsonlHeader;
  try {
    header = JSON.parse(lines[0]);
  } catch {
    throw new Error('Snapshot JSONL header is not valid JSON');
  }
  if (header.type !== 'header' || header.schemaVersion !== 1) {
    throw new Error('Snapshot JSONL header is missing or unsupported');
  }

  const records: JsonlRecord[] = [];
  for (let i = 1; i < lines.length; i++) {
    let entry: JsonlRecord;
    try {
      entry = JSON.parse(lines[i]);
    } catch {
      throw new Error(`Snapshot JSONL record ${i} is not valid JSON`);
    }
    if (!entry.type || !entry.data || !entry.hash) {
      throw new Error(`Snapshot JSONL record ${i} is missing type, data, or hash`);
    }
    const expected = sha256(canonicalJson(entry.data));
    if (expected !== entry.hash) {
      throw new Error(`Snapshot JSONL record ${i} hash mismatch`);
    }
    records.push(entry);
  }

  if (header.recordCount !== records.length) {
    throw new Error(`Snapshot JSONL record count mismatch: header ${header.recordCount}, actual ${records.length}`);
  }
  const contentHash = sha256(records.map((entry) => entry.hash).join('\n'));
  if (contentHash !== header.contentHash) {
    throw new Error('Snapshot JSONL content hash mismatch');
  }

  return { header, records };
}

export function readSnapshotJsonl(filePath: string): { header: JsonlHeader; records: JsonlRecord[] } {
  return parseSnapshotJsonl(fs.readFileSync(filePath, 'utf8'));
}

/** JSONL snapshot represented as a replay state, used by `fastr diff` and Memory CI. */
export function snapshotFromJsonl(jsonl: string): ReplaySnapshot {
  const { header, records } = parseSnapshotJsonl(jsonl);
  const memories: ReplayMemory[] = [];
  const events: ReplayEvent[] = [];
  const conflicts: ReplayConflict[] = [];
  const filesByMemory = new Map<string, string[]>();

  for (const entry of records) {
    if (entry.type === 'memory') {
      const row = entry.data as any;
      let sourceIds: string[] = [];
      try {
        const parsed = JSON.parse(String(row.source_event_ids ?? '[]'));
        if (Array.isArray(parsed)) sourceIds = parsed.filter((id): id is string => typeof id === 'string');
      } catch {}
      memories.push({
        id: String(row.id),
        project_id: String(row.project_id),
        agent_id: String(row.agent_id ?? 'default'),
        module: String(row.module),
        kind: String(row.kind),
        title: String(row.title),
        content: String(row.content),
        status: String(row.status),
        pinned: Number(row.pinned ?? 0),
        reward_score: Number(row.reward_score ?? 1),
        valid_from: String(row.valid_from),
        valid_to: row.valid_to == null ? null : String(row.valid_to),
        superseded_by_id: row.superseded_by_id == null ? null : String(row.superseded_by_id),
        superseded_reason: row.superseded_reason == null ? null : String(row.superseded_reason),
        source_event_ids: sourceIds,
        created_at: String(row.created_at),
        provenance_hash: row.provenance_hash == null ? null : String(row.provenance_hash),
        files: []
      });
    } else if (entry.type === 'file_link') {
      const row = entry.data as any;
      const list = filesByMemory.get(String(row.memory_id)) ?? [];
      list.push(String(row.file_path));
      filesByMemory.set(String(row.memory_id), list);
    } else if (entry.type === 'event') {
      const row = entry.data as any;
      events.push({
        id: String(row.id),
        project_id: String(row.project_id),
        session_id: String(row.session_id),
        agent_id: String(row.agent_id ?? 'default'),
        event_type: String(row.event_type),
        tool_name: row.tool_name == null ? null : String(row.tool_name),
        file_path: row.file_path == null ? null : String(row.file_path),
        raw_payload: String(row.raw_payload),
        content_hash: String(row.content_hash),
        created_at: String(row.created_at)
      });
    } else if (entry.type === 'conflict') {
      const row = entry.data as any;
      conflicts.push({
        id: Number(row.id),
        project_id: String(row.project_id),
        memory_a_id: String(row.memory_a_id),
        memory_b_id: String(row.memory_b_id),
        reason: String(row.reason),
        score: Number(row.score),
        status: String(row.status),
        resolved_winner_id: row.resolved_winner_id == null ? null : String(row.resolved_winner_id),
        created_at: String(row.created_at),
        resolved_at: row.resolved_at == null ? null : String(row.resolved_at)
      });
    }
  }

  for (const memory of memories) {
    memory.files = filesByMemory.get(memory.id) ?? [];
  }

  const started = memories.filter((memory) => memory.valid_from <= header.exportedAt);
  const active = started.filter(
    (memory) => memory.status !== 'dormant' && (memory.valid_to === null || memory.valid_to > header.exportedAt)
  );
  const history = started.filter((memory) => !active.includes(memory));
  const tokenCount = active.reduce(
    (sum, memory) => sum + estimateTokens(`${memory.title}\n${memory.content}\n`),
    0
  );

  return {
    schemaVersion: 1,
    projectId: header.projectId,
    at: header.exportedAt,
    memories: active,
    history,
    events,
    conflicts,
    tokenCount,
    contentHash: header.contentHash
  };
}

function insertMemory(db: DatabaseSync, data: any): boolean {
  const result = db.prepare(`
    INSERT OR IGNORE INTO memories (
      id, project_id, agent_id, module, kind, title, content, status, pinned,
      reward_score, retrieval_count, valid_from, valid_to, superseded_by_id,
      superseded_reason, source_event_ids, embedding, embedded, created_at,
      last_recalled_at, provenance_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, 0, ?, ?, ?)
  `).run(
    data.id,
    data.project_id,
    data.agent_id ?? 'default',
    data.module ?? 'general',
    data.kind,
    data.title,
    data.content,
    data.status ?? 'staging',
    Number(data.pinned ?? 0),
    Number(data.reward_score ?? 1),
    Number(data.retrieval_count ?? 0),
    data.valid_from,
    data.valid_to ?? null,
    data.superseded_by_id ?? null,
    data.superseded_reason ?? null,
    data.source_event_ids ?? '[]',
    data.created_at,
    data.last_recalled_at ?? null,
    data.provenance_hash ?? null
  );
  return Number(result.changes) > 0;
}

function insertEvent(db: DatabaseSync, data: any): boolean {
  const result = db.prepare(`
    INSERT OR IGNORE INTO raw_events (
      id, project_id, session_id, agent_id, event_type, tool_name, file_path,
      raw_payload, content_hash, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.id,
    data.project_id,
    data.session_id,
    data.agent_id ?? 'default',
    data.event_type,
    data.tool_name ?? null,
    data.file_path ?? null,
    data.raw_payload,
    data.content_hash,
    data.created_at
  );
  return Number(result.changes) > 0;
}

function insertLink(db: DatabaseSync, data: any): boolean {
  const result = db.prepare(`
    INSERT OR IGNORE INTO file_links (memory_id, file_path, symbol_name) VALUES (?, ?, ?)
  `).run(data.memory_id, data.file_path, data.symbol_name ?? '');
  return Number(result.changes) > 0;
}

function insertConflict(db: DatabaseSync, data: any): boolean {
  const result = db.prepare(`
    INSERT OR IGNORE INTO memory_conflicts (
      id, project_id, memory_a_id, memory_b_id, reason, score, status,
      resolved_winner_id, created_at, resolved_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    Number(data.id),
    data.project_id,
    data.memory_a_id,
    data.memory_b_id,
    data.reason,
    Number(data.score),
    data.status ?? 'open',
    data.resolved_winner_id ?? null,
    data.created_at,
    data.resolved_at ?? null
  );
  return Number(result.changes) > 0;
}

/** Imports a hash-verified JSONL snapshot into an empty or existing database. */
export function importSnapshotJsonl(
  db: DatabaseSync,
  jsonl: string,
  options: { dryRun?: boolean } = {}
): ImportJsonlResult {
  const { header, records } = parseSnapshotJsonl(jsonl);
  const dryRun = options.dryRun === true;
  const counts = { memories: 0, events: 0, fileLinks: 0, conflicts: 0, skipped: 0 };

  if (!dryRun) db.exec('BEGIN IMMEDIATE');
  try {
    for (const entry of records) {
      if (dryRun) {
        if (entry.type === 'memory') counts.memories++;
        else if (entry.type === 'event') counts.events++;
        else if (entry.type === 'file_link') counts.fileLinks++;
        else if (entry.type === 'conflict') counts.conflicts++;
        continue;
      }

      let inserted = false;
      if (entry.type === 'memory') inserted = insertMemory(db, entry.data);
      else if (entry.type === 'event') inserted = insertEvent(db, entry.data);
      else if (entry.type === 'file_link') inserted = insertLink(db, entry.data);
      else if (entry.type === 'conflict') inserted = insertConflict(db, entry.data);

      if (!inserted) {
        counts.skipped++;
        continue;
      }
      if (entry.type === 'memory') counts.memories++;
      else if (entry.type === 'event') counts.events++;
      else if (entry.type === 'file_link') counts.fileLinks++;
      else if (entry.type === 'conflict') counts.conflicts++;
    }
    if (!dryRun) db.exec('COMMIT');
  } catch (error) {
    if (!dryRun) db.exec('ROLLBACK');
    throw error;
  }

  return { dryRun, ...counts, contentHash: header.contentHash };
}

export function importSnapshotFile(
  db: DatabaseSync,
  filePath: string,
  options: { dryRun?: boolean } = {}
): ImportJsonlResult {
  return importSnapshotJsonl(db, fs.readFileSync(filePath, 'utf8'), options);
}

/** Utility for tests and CI: hash an arbitrary text payload. */
export function contentHash(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}
