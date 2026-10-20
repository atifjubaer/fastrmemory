import { DatabaseSync } from 'node:sqlite';
import * as path from 'node:path';
import * as fs from 'node:fs';

export interface RawEvent {
  id: string;
  project_id: string;
  session_id: string;
  agent_id: string;
  event_type: 'tool_use' | 'tool_error' | 'git_commit' | 'user_prompt' | 'compaction';
  tool_name?: string | null;
  file_path?: string | null;
  raw_payload: string;
  content_hash: string;
  created_at?: string;
}

export interface Memory {
  id: string;
  project_id: string;
  agent_id: string;
  module: string;
  kind: 'rule' | 'decision' | 'error_trap' | 'workflow';
  title: string;
  content: string;
  status: 'staging' | 'verified' | 'superseded' | 'dormant';
  pinned: number;
  reward_score: number;
  retrieval_count: number;
  valid_from: string;
  valid_to: string | null;
  superseded_by_id: string | null;
  superseded_reason: string | null;
  source_event_ids: string; // JSON array string
  embedding: Buffer | null;
  embedded: number;
  created_at: string;
  last_recalled_at: string | null;
  provenance_hash: string | null;
}

export interface FileLink {
  memory_id: string;
  file_path: string;
  symbol_name: string;
}

export interface Handoff {
  id?: number;
  project_id: string;
  session_id: string;
  task_title: string;
  summary: string;
  next_step: string;
  active_files: string; // JSON array string
  created_at?: string;
}

export interface Entity {
  id: string;
  project_id: string;
  name: string;
  entity_type: 'symbol' | 'file' | 'tech' | 'service' | 'pattern';
  created_at?: string;
}

export interface GraphEdge {
  id: string;
  project_id: string;
  source_id: string;
  target_id: string;
  edge_type: 'causal' | 'entity_link' | 'temporal' | 'association' | 'supersedes';
  weight: number;
  created_at?: string;
}

export interface MemoryConflict {
  id?: number;
  project_id: string;
  memory_a_id: string;
  memory_b_id: string;
  reason: string;
  score: number;
  status: 'open' | 'resolved' | 'ignored';
  resolved_winner_id?: string | null;
  created_at?: string;
  resolved_at?: string | null;
}

export interface Prediction {
  id?: number;
  project_id: string;
  class_tag: string;
  claim_text: string;
  estimate_value?: number | null;
  estimate_unit?: string | null;
  actual_value?: number | null;
  closure_state: 'open' | 'closed' | 'closed-unknown';
  closed_at?: string | null;
  created_at?: string;
}

export interface Action {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'done' | 'blocked' | 'cancelled';
  priority: number;
  assigned_to?: string | null;
  crystallized_into?: string | null;
  created_at?: string;
  completed_at?: string | null;
}

export interface ActionEdge {
  source_action_id: string;
  target_action_id: string;
  edge_type: 'requires' | 'unlocks' | 'conflicts_with';
}

export interface MemorySlot {
  project_id: string;
  slot_key: string;
  content: string;
  size_limit: number;
  updated_at?: string;
}

export interface VisionAsset {
  id: string;
  project_id: string;
  file_path: string;
  description: string;
  ocr_text?: string | null;
  memory_id?: string | null;
  task_id?: string | null;
  embedding?: Buffer | null;
  created_at?: string;
}

export const SCHEMA_SQL = `
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;

-- 1. Immutable raw observations
CREATE TABLE IF NOT EXISTS raw_events (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  agent_id TEXT DEFAULT 'default',
  event_type TEXT NOT NULL,
  tool_name TEXT,
  file_path TEXT,
  raw_payload TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_raw_events_session ON raw_events(project_id, session_id);
CREATE INDEX IF NOT EXISTS idx_raw_events_hash ON raw_events(content_hash);

-- 2. Structured memories with Bi-Temporal Validity Windows & Outcome Multipliers
CREATE TABLE IF NOT EXISTS memories (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  agent_id TEXT DEFAULT 'default',
  module TEXT NOT NULL DEFAULT 'general',
  kind TEXT NOT NULL CHECK (kind IN ('rule', 'decision', 'error_trap', 'workflow')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'staging' CHECK (status IN ('staging', 'verified', 'superseded', 'dormant')),
  pinned INTEGER NOT NULL DEFAULT 0,
  reward_score REAL NOT NULL DEFAULT 1.0,
  retrieval_count INTEGER NOT NULL DEFAULT 0,
  valid_from TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  valid_to TEXT DEFAULT NULL,
  superseded_by_id TEXT DEFAULT NULL,
  superseded_reason TEXT DEFAULT NULL,
  source_event_ids TEXT NOT NULL DEFAULT '[]',
  embedding BLOB DEFAULT NULL,
  embedded INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  last_recalled_at TEXT DEFAULT NULL,
  provenance_hash TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS idx_memories_active ON memories(project_id, module, valid_to, status);

-- 3. FTS5 Virtual Table for sub-millisecond BM25 keyword search
CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
  id UNINDEXED,
  title,
  module,
  content,
  tokenize='porter unicode61'
);

-- Keep FTS5 automatically synced via triggers
CREATE TRIGGER IF NOT EXISTS memories_ai AFTER INSERT ON memories BEGIN
  INSERT INTO memories_fts(id, title, module, content) VALUES (new.id, new.title, new.module, new.content);
END;

CREATE TRIGGER IF NOT EXISTS memories_ad AFTER DELETE ON memories BEGIN
  DELETE FROM memories_fts WHERE id = old.id;
END;

-- Only re-index when searchable columns change (not on retrieval counters / scores)
CREATE TRIGGER IF NOT EXISTS memories_au AFTER UPDATE OF title, module, content ON memories BEGIN
  DELETE FROM memories_fts WHERE id = old.id;
  INSERT INTO memories_fts(id, title, module, content) VALUES (new.id, new.title, new.module, new.content);
END;

-- 4. File & Symbol Graph Links
CREATE TABLE IF NOT EXISTS file_links (
  memory_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  symbol_name TEXT DEFAULT '',
  PRIMARY KEY (memory_id, file_path, symbol_name),
  FOREIGN KEY (memory_id) REFERENCES memories(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_file_links_path ON file_links(file_path);

-- 5. Active Task Snapshot & Cross-Agent Handoffs
CREATE TABLE IF NOT EXISTS handoffs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  task_title TEXT NOT NULL,
  summary TEXT NOT NULL,
  next_step TEXT NOT NULL,
  active_files TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- 6. Memory Snapshots & Git-Style Point-in-Time Versioning
CREATE TABLE IF NOT EXISTS memory_snapshots (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  description TEXT,
  memory_count INTEGER NOT NULL,
  state_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_snapshots_project ON memory_snapshots(project_id, created_at DESC);

-- 6b. Memory Branches and Merge Audit Trail
CREATE TABLE IF NOT EXISTS memory_branches (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  name TEXT NOT NULL COLLATE NOCASE,
  base_snapshot_id TEXT NOT NULL,
  head_snapshot_id TEXT NOT NULL,
  description TEXT DEFAULT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (project_id, name),
  FOREIGN KEY (base_snapshot_id) REFERENCES memory_snapshots(id) ON DELETE RESTRICT,
  FOREIGN KEY (head_snapshot_id) REFERENCES memory_snapshots(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_memory_branches_project ON memory_branches(project_id, created_at DESC);

CREATE TABLE IF NOT EXISTS memory_branch_merges (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  source_snapshot_id TEXT NOT NULL,
  strategy TEXT NOT NULL CHECK (strategy IN ('target', 'branch')),
  applied INTEGER NOT NULL DEFAULT 0,
  added_count INTEGER NOT NULL DEFAULT 0,
  conflict_count INTEGER NOT NULL DEFAULT 0,
  report_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  FOREIGN KEY (branch_id) REFERENCES memory_branches(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_branch_merges_branch ON memory_branch_merges(branch_id, created_at DESC);

-- 7. Knowledge Graph Entities
CREATE TABLE IF NOT EXISTS entities (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  name TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('symbol', 'file', 'tech', 'service', 'pattern')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_entities_name ON entities(project_id, name);

-- 8. Multi-Edge Knowledge Graph Links
CREATE TABLE IF NOT EXISTS graph_edges (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  edge_type TEXT NOT NULL CHECK (edge_type IN ('causal', 'entity_link', 'temporal', 'association', 'supersedes')),
  weight REAL NOT NULL DEFAULT 1.0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_graph_edges_source ON graph_edges(project_id, source_id);
CREATE INDEX IF NOT EXISTS idx_graph_edges_target ON graph_edges(project_id, target_id);

-- 9. Proactive Contradiction Conflicts
CREATE TABLE IF NOT EXISTS memory_conflicts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  memory_a_id TEXT NOT NULL,
  memory_b_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  score REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'ignored')),
  resolved_winner_id TEXT DEFAULT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  resolved_at TEXT DEFAULT NULL,
  FOREIGN KEY (memory_a_id) REFERENCES memories(id) ON DELETE CASCADE,
  FOREIGN KEY (memory_b_id) REFERENCES memories(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_conflicts_status ON memory_conflicts(project_id, status);

-- 10. Planning Fallacy Predictions & Baserate
CREATE TABLE IF NOT EXISTS predictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  class_tag TEXT NOT NULL,
  claim_text TEXT NOT NULL,
  estimate_value REAL,
  estimate_unit TEXT,
  actual_value REAL DEFAULT NULL,
  closure_state TEXT NOT NULL DEFAULT 'open' CHECK (closure_state IN ('open', 'closed', 'closed-unknown')),
  closed_at TEXT DEFAULT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_predictions_class ON predictions(project_id, class_tag, closure_state);

-- 11. Multi-Agent Work Item Action DAG
CREATE TABLE IF NOT EXISTS actions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'done', 'blocked', 'cancelled')),
  priority INTEGER NOT NULL DEFAULT 5,
  assigned_to TEXT DEFAULT NULL,
  crystallized_into TEXT DEFAULT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  completed_at TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS idx_actions_status ON actions(project_id, status, priority DESC);

CREATE TABLE IF NOT EXISTS action_edges (
  source_action_id TEXT NOT NULL,
  target_action_id TEXT NOT NULL,
  edge_type TEXT NOT NULL CHECK (edge_type IN ('requires', 'unlocks', 'conflicts_with')),
  PRIMARY KEY (source_action_id, target_action_id, edge_type),
  FOREIGN KEY (source_action_id) REFERENCES actions(id) ON DELETE CASCADE,
  FOREIGN KEY (target_action_id) REFERENCES actions(id) ON DELETE CASCADE
);

-- 12. Bounded Working Memory Slots
CREATE TABLE IF NOT EXISTS memory_slots (
  project_id TEXT NOT NULL,
  slot_key TEXT NOT NULL,
  content TEXT NOT NULL,
  size_limit INTEGER NOT NULL DEFAULT 4000,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  PRIMARY KEY (project_id, slot_key)
);

-- 13. Multimodal Vision Assets & Screenshots
CREATE TABLE IF NOT EXISTS vision_assets (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  description TEXT NOT NULL,
  ocr_text TEXT DEFAULT NULL,
  memory_id TEXT DEFAULT NULL,
  task_id TEXT DEFAULT NULL,
  embedding BLOB DEFAULT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  FOREIGN KEY (memory_id) REFERENCES memories(id) ON DELETE SET NULL,
  FOREIGN KEY (task_id) REFERENCES actions(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_vision_project ON vision_assets(project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vision_memory ON vision_assets(memory_id);
`;

export function configurePragmas(db: DatabaseSync): void {
  try { db.exec('PRAGMA journal_mode = WAL;'); } catch {}
  try { db.exec('PRAGMA synchronous = NORMAL;'); } catch {}
  try { db.exec('PRAGMA foreign_keys = ON;'); } catch {}
  try { db.exec('PRAGMA busy_timeout = 5000;'); } catch {}
}

export function applySchema(db: DatabaseSync): void {
  configurePragmas(db);
  db.exec(SCHEMA_SQL);

  // Auto-migrate: add provenance_hash if missing from older DB versions
  try {
    db.exec('ALTER TABLE memories ADD COLUMN provenance_hash TEXT DEFAULT NULL;');
  } catch {}

  migrateMemoriesUpdateTrigger(db);
}

const MEMORIES_AU_TRIGGER_SQL = `
CREATE TRIGGER memories_au AFTER UPDATE OF title, module, content ON memories BEGIN
  DELETE FROM memories_fts WHERE id = old.id;
  INSERT INTO memories_fts(id, title, module, content) VALUES (new.id, new.title, new.module, new.content);
END;
`;

/**
 * Older databases carry an unconditional AFTER UPDATE trigger that re-indexes FTS on every
 * counter bump. CREATE TRIGGER IF NOT EXISTS never replaces it, so swap it explicitly.
 */
function migrateMemoriesUpdateTrigger(db: DatabaseSync): void {
  const row = db.prepare(
    "SELECT sql FROM sqlite_master WHERE type = 'trigger' AND name = 'memories_au'"
  ).get() as { sql?: string } | undefined;
  if (row?.sql && /UPDATE\s+OF\s+title/i.test(row.sql)) return;

  db.exec('BEGIN IMMEDIATE');
  try {
    db.exec('DROP TRIGGER IF EXISTS memories_au;');
    db.exec(MEMORIES_AU_TRIGGER_SQL);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

export function initDatabase(dbPath: string): DatabaseSync {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new DatabaseSync(dbPath);
  configurePragmas(db);
  applySchema(db);
  return db;
}
