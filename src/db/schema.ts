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
  last_recalled_at TEXT DEFAULT NULL
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

CREATE TRIGGER IF NOT EXISTS memories_au AFTER UPDATE ON memories BEGIN
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
`;

export function initDatabase(dbPath: string): DatabaseSync {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new DatabaseSync(dbPath);
  db.exec(SCHEMA_SQL);
  return db;
}
