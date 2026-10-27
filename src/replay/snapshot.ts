import * as crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { estimateTokens } from '../search/budget.js';

/** Stable JSON serialization: object keys are sorted recursively so hashes are reproducible. */
export function canonicalJson(value: unknown): string {
  if (value === undefined) return 'null';
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(',')}]`;
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(',')}}`;
}

export function sha256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export function normalizeTimestamp(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid ISO timestamp: ${value}`);
  }
  return parsed.toISOString();
}

export interface ReplayMemory {
  id: string;
  project_id: string;
  agent_id: string;
  module: string;
  kind: string;
  title: string;
  content: string;
  status: string;
  pinned: number;
  reward_score: number;
  valid_from: string;
  valid_to: string | null;
  superseded_by_id: string | null;
  superseded_reason: string | null;
  source_event_ids: string[];
  created_at: string;
  assertion: string | null;
  provenance_hash: string | null;
  files: string[];
}

export interface ReplayEvent {
  id: string;
  project_id: string;
  session_id: string;
  agent_id: string;
  event_type: string;
  tool_name: string | null;
  file_path: string | null;
  raw_payload: string;
  content_hash: string;
  created_at: string;
}

export interface ReplayConflict {
  id: number;
  project_id: string;
  memory_a_id: string;
  memory_b_id: string;
  reason: string;
  score: number;
  status: string;
  resolved_winner_id: string | null;
  created_at: string;
  resolved_at: string | null;
}

export interface ReplaySnapshot {
  schemaVersion: 1;
  projectId: string;
  at: string;
  /** Active set at `at`. */
  memories: ReplayMemory[];
  /** Rows that existed by `at` but were already inactive, kept for supersession links. */
  history: ReplayMemory[];
  events: ReplayEvent[];
  conflicts: ReplayConflict[];
  tokenCount: number;
  contentHash: string;
}

function parseEventIds(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
  } catch {
    return [];
  }
}

function memoryFromRow(row: any, files: string[]): ReplayMemory {
  return {
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
    source_event_ids: parseEventIds(String(row.source_event_ids ?? '[]')),
    created_at: String(row.created_at),
    assertion: row.assertion == null ? null : String(row.assertion),
    provenance_hash: row.provenance_hash == null ? null : String(row.provenance_hash),
    files
  };
}

function eventFromRow(row: any): ReplayEvent {
  return {
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
  };
}

function conflictFromRow(row: any): ReplayConflict {
  return {
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
  };
}

export function snapshotContentHash(
  snapshot: Pick<ReplaySnapshot, 'schemaVersion' | 'projectId' | 'at' | 'memories' | 'history' | 'events' | 'conflicts'>
): string {
  return sha256(canonicalJson({
    schemaVersion: snapshot.schemaVersion,
    projectId: snapshot.projectId,
    at: snapshot.at,
    memories: snapshot.memories,
    history: snapshot.history,
    events: snapshot.events,
    conflicts: snapshot.conflicts
  }));
}

/**
 * Reconstructs the active set at a timestamp using only the bi-temporal validity
 * window. A memory is active when `valid_from <= at` and it has no `valid_to`
 * or `valid_to > at`. Supersession is represented by the old row's `valid_to`
 * and the new row's `valid_from`; dormant rows are excluded.
 */
export function replayAt(db: DatabaseSync, projectId: string, atInput: string): ReplaySnapshot {
  const at = normalizeTimestamp(atInput);

  const memoryRows = db.prepare(`
    SELECT * FROM memories
    WHERE project_id = ? AND valid_from <= ?
    ORDER BY created_at ASC, id ASC
  `).all(projectId, at) as any[];

  const fileRows = db.prepare(`
    SELECT fl.memory_id, fl.file_path
    FROM file_links fl
    JOIN memories m ON m.id = fl.memory_id
    WHERE m.project_id = ?
    ORDER BY fl.memory_id ASC, fl.file_path ASC
  `).all(projectId) as any[];

  const filesByMemory = new Map<string, string[]>();
  for (const row of fileRows) {
    const list = filesByMemory.get(String(row.memory_id)) ?? [];
    list.push(String(row.file_path));
    filesByMemory.set(String(row.memory_id), list);
  }

  const mapped = memoryRows.map((row) => memoryFromRow(row, filesByMemory.get(String(row.id)) ?? []));
  const isActive = (memory: ReplayMemory) =>
    memory.status !== 'dormant' &&
    (memory.valid_to === null || memory.valid_to > at);
  const memories = mapped.filter(isActive);
  const history = mapped.filter((memory) => !isActive(memory));

  const eventRows = db.prepare(`
    SELECT * FROM raw_events
    WHERE project_id = ? AND created_at <= ?
    ORDER BY created_at ASC, id ASC
  `).all(projectId, at) as any[];

  const conflictRows = db.prepare(`
    SELECT * FROM memory_conflicts
    WHERE project_id = ?
      AND created_at <= ?
      AND (status = 'open' OR (resolved_at IS NOT NULL AND resolved_at > ?))
    ORDER BY created_at ASC, id ASC
  `).all(projectId, at, at) as any[];

  const events = eventRows.map(eventFromRow);
  const conflicts = conflictRows.map(conflictFromRow);
  const tokenCount = memories.reduce(
    (sum, memory) => sum + estimateTokens(`${memory.title}\n${memory.content}\n`),
    0
  );

  const draft = {
    schemaVersion: 1 as const,
    projectId,
    at,
    memories,
    history,
    events,
    conflicts
  };

  return {
    ...draft,
    tokenCount,
    contentHash: snapshotContentHash(draft)
  };
}

export interface DiffEntry {
  id: string;
  title: string;
  module: string;
  kind: string;
  status: string;
  valid_from: string;
  valid_to: string | null;
  superseded_by_id: string | null;
}

export interface SnapshotDiff {
  fromAt: string;
  toAt: string;
  added: DiffEntry[];
  superseded: DiffEntry[];
  stillActive: DiffEntry[];
  changed: DiffEntry[];
  conflicts: ReplayConflict[];
  tokenDelta: number;
  newTrapIds: string[];
}

function diffEntry(memory: ReplayMemory): DiffEntry {
  return {
    id: memory.id,
    title: memory.title,
    module: memory.module,
    kind: memory.kind,
    status: memory.status,
    valid_from: memory.valid_from,
    valid_to: memory.valid_to,
    superseded_by_id: memory.superseded_by_id
  };
}

function sameMemory(a: ReplayMemory, b: ReplayMemory): boolean {
  return (
    a.title === b.title &&
    a.content === b.content &&
    a.module === b.module &&
    a.kind === b.kind &&
    a.status === b.status &&
    a.reward_score === b.reward_score &&
    a.valid_to === b.valid_to &&
    a.superseded_by_id === b.superseded_by_id
  );
}

export function diffSnapshots(from: ReplaySnapshot, to: ReplaySnapshot): SnapshotDiff {
  const fromById = new Map(from.memories.map((memory) => [memory.id, memory]));
  const toById = new Map(to.memories.map((memory) => [memory.id, memory]));

  const added = to.memories.filter((memory) => !fromById.has(memory.id)).map(diffEntry);
  const toHistoryById = new Map(to.history.map((memory) => [memory.id, memory]));
  const superseded = from.memories
    .filter((memory) => !toById.has(memory.id))
    .map((memory) => {
      const current = toHistoryById.get(memory.id);
      const replacement = current?.superseded_by_id
        ? toById.get(current.superseded_by_id) ?? toHistoryById.get(current.superseded_by_id)
        : undefined;
      return diffEntry({
        ...memory,
        status: 'superseded',
        superseded_by_id: current?.superseded_by_id ?? replacement?.id ?? memory.superseded_by_id
      });
    });
  const stillActive = to.memories.filter((memory) => fromById.has(memory.id)).map(diffEntry);
  const changed = to.memories
    .filter((memory) => {
      const previous = fromById.get(memory.id);
      return previous ? !sameMemory(previous, memory) : false;
    })
    .map(diffEntry);

  const activeIds = new Set(to.memories.map((memory) => memory.id));
  const conflicts = to.conflicts.filter(
    (conflict) => conflict.status === 'open' && activeIds.has(conflict.memory_a_id) && activeIds.has(conflict.memory_b_id)
  );

  return {
    fromAt: from.at,
    toAt: to.at,
    added,
    superseded,
    stillActive,
    changed,
    conflicts,
    tokenDelta: to.tokenCount - from.tokenCount,
    newTrapIds: added.filter((entry) => entry.kind === 'error_trap').map((entry) => entry.id)
  };
}

function listOrNone(entries: DiffEntry[]): string {
  if (entries.length === 0) return '_None._';
  return entries.map((entry) => `- [${entry.id}] ${entry.title} (${entry.module}, ${entry.kind})`).join('\n');
}

export function formatDiffMarkdown(diff: SnapshotDiff): string {
  const lines = [
    '## FastrMemory diff',
    '',
    `**From:** ${diff.fromAt}`,
    `**To:** ${diff.toAt}`,
    `**Token delta:** ${diff.tokenDelta >= 0 ? '+' : ''}${diff.tokenDelta}`,
    '',
    `### Added (${diff.added.length})`,
    listOrNone(diff.added),
    '',
    `### Superseded (${diff.superseded.length})`,
    listOrNone(diff.superseded),
    '',
    `### Still active (${diff.stillActive.length})`,
    listOrNone(diff.stillActive),
    '',
    `### Changed (${diff.changed.length})`,
    listOrNone(diff.changed),
    '',
    `### Open conflicts (${diff.conflicts.length})`,
    diff.conflicts.length === 0
      ? '_None._'
      : diff.conflicts
          .map((conflict) => `- [${conflict.memory_a_id}] vs [${conflict.memory_b_id}]: ${conflict.reason} (score ${conflict.score})`)
          .join('\n'),
    '',
    `**New error traps:** ${diff.newTrapIds.length === 0 ? 'none' : diff.newTrapIds.join(', ')}`
  ];
  return lines.join('\n');
}
