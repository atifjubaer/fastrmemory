# FastrMemory Technical Specification

> **Status (2026-10-22): historical design reference, partially stale.** The schema tables below describe the v0.1.0 design. The published release is npm `@atifjubaer/fastrmemory@0.2.1`; the counts below describe the unreleased `0.3.0` branch. The `0.3.0` branch registers **41 tools, 2 prompts, and 5 resources** (3 static resources plus the `fastr://memory/{id}` and `fastr://memory/{id}/envelope` templates), exposes **12 tools** in the optional core profile, and ships **10 Agent Skills**. The current suite is **276 tests across 51 files**. Newer tables for branches, merges, conflicts, actions, slots, snapshots, entities, graph edges, predictions, and vision assets live in `src/db/schema.ts` and are covered by the tests. Verify counts with `npm run check:docs` before citing them.
>
> **Package**: `fastrmemory` on the 0.3.0 branch; the published 0.2.1 release is `@atifjubaer/fastrmemory`
> **Schema reference version**: `1.0.0` (v0.1.0 snapshot; see `src/db/schema.ts` for the live schema)
> **SDK**: `@modelcontextprotocol/server` (MCP v2) + `zod` v4
> **Database Engine**: Node.js 22.16+ built-in `node:sqlite` (`DatabaseSync`)

---

## 1. Database Schema (`src/db/schema.ts`)

Initialized with:
```sql
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;
```

### Table 1: `raw_events` (Lossless Immutable Ingestion)
```sql
CREATE TABLE IF NOT EXISTS raw_events (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  agent_id TEXT DEFAULT 'default',
  event_type TEXT NOT NULL, -- 'tool_use' | 'tool_error' | 'git_commit' | 'user_prompt' | 'compaction'
  tool_name TEXT,
  file_path TEXT,
  raw_payload TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_raw_events_session ON raw_events(project_id, session_id);
CREATE INDEX IF NOT EXISTS idx_raw_events_hash ON raw_events(content_hash);
```

### Table 2: `memories` (Bi-Temporal Structured Storage)
```sql
CREATE TABLE IF NOT EXISTS memories (
  id TEXT PRIMARY KEY, -- e.g. 'mem_8f2a1c9b'
  project_id TEXT NOT NULL,
  agent_id TEXT DEFAULT 'default',
  module TEXT NOT NULL DEFAULT 'general', -- e.g. 'auth', 'db', 'api', 'ui'
  kind TEXT NOT NULL CHECK (kind IN ('rule', 'decision', 'error_trap', 'workflow')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'staging' CHECK (status IN ('staging', 'verified', 'superseded', 'dormant')),
  pinned INTEGER NOT NULL DEFAULT 0,
  reward_score REAL NOT NULL DEFAULT 1.0,
  retrieval_count INTEGER NOT NULL DEFAULT 0,
  valid_from TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  valid_to TEXT DEFAULT NULL, -- NULL = active; ISO timestamp = superseded
  superseded_by_id TEXT DEFAULT NULL,
  source_event_ids TEXT NOT NULL DEFAULT '[]', -- JSON array of up to 32 newest raw_events.id
  embedding BLOB DEFAULT NULL, -- Float32Array (384 dims) when embedded
  embedded INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  last_recalled_at TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS idx_memories_active ON memories(project_id, module, valid_to, status);
```

### Table 2b: `memory_feedback` (Per-ID Confidence Audit)
```sql
CREATE TABLE IF NOT EXISTS memory_feedback (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  memory_id TEXT NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN ('good', 'bad')),
  note TEXT DEFAULT NULL,
  reward_before REAL NOT NULL,
  reward_after REAL NOT NULL,
  status_before TEXT NOT NULL,
  status_after TEXT NOT NULL,
  confidence_tier TEXT NOT NULL CHECK (confidence_tier IN ('high', 'medium', 'low', 'dormant', 'superseded')),
  bad_streak INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_memory_feedback_memory ON memory_feedback(memory_id, created_at DESC);
```

### Table 3: `memories_fts` (Full-Text BM25 Keyword Search)
```sql
CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
  id UNINDEXED,
  title,
  module,
  content,
  tokenize='porter unicode61'
);

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
```

### Table 4: `file_links` (Structural Knowledge Graph)
```sql
CREATE TABLE IF NOT EXISTS file_links (
  memory_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  symbol_name TEXT DEFAULT '',
  PRIMARY KEY (memory_id, file_path, symbol_name),
  FOREIGN KEY (memory_id) REFERENCES memories(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_file_links_path ON file_links(file_path);
```

### Table 5: `handoffs` (Session Handoffs & Milestones)
```sql
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
```

---

## 2. Historical Core MCP Tools (`src/mcp/server.ts`)

> **Stale section:** this table documents the original 8-tool surface. The current server registers 41 tools; run `node dist/bin/fastr.js mcp` and list tools, or read `src/mcp/server.ts`, for the live catalog.

Registered via `server.registerTool(...)` using `@modelcontextprotocol/server` v2:

| Tool Name | Input Schema (zod v4) | Exact Behavior |
| :--- | :--- | :--- |
| `fastr_recall` | `query: z.string()`, `files: z.array(z.string()).default([])`, `module: z.string().optional()`, `budgetTokens: z.number().default(2000)`, `includeHistory: z.boolean().default(false)` | Executes 3-way RRF search (BM25 + Vector + file_links). Filters `valid_to IS NULL` unless `includeHistory=true`. Formats each memory with `[mem_id] [kind] [status]` packed within token budget. |
| `fastr_drill` | `memoryId: z.string().optional()`, `eventId: z.string().optional()` | Retrieves verbatim untruncated tool output, git diff, or error stack trace from `raw_events` using linked `source_event_ids`. |
| `fastr_file_history` | `filePath: z.string()` | Returns all active rules and `[TRAP]` warnings linked to `filePath`, followed by superseded rules ordered chronologically. |
| `fastr_remember` | `module: z.string()`, `kind: z.enum(['rule', 'decision', 'error_trap', 'workflow'])`, `title: z.string()`, `content: z.string()`, `files: z.array(z.string()).default([])`, `symbols: z.array(z.string()).default([])`, `verified: z.boolean().default(false)`, `pinned: z.boolean().default(false)` | Scrubs secrets, validates near-duplicates, inserts into `memories` and `file_links`, queues background embedding, and re-renders `.fastr/pages/<module>.md`. |
| `fastr_supersede` | `oldMemoryId: z.string()`, `newTitle: z.string()`, `newContent: z.string()`, `reason: z.string()`, `files: z.array(z.string()).optional()` | Sets `valid_to = NOW()`, `status = 'superseded'`, `superseded_by_id = newId` on old record, creates new memory with `status = 'verified'`, and updates Markdown mirror. |
| `fastr_feedback` | `memoryId: z.string()`, `outcome: z.enum(['good', 'bad'])`, `note: z.string().optional()` | Updates `reward_score` (+0.2 good, −0.5 bad, floor 0.1) on **only** `memoryId` and returns a confidence tier (`high` >= 1.5, `medium` >= 0.8, `low`, `dormant`, or `superseded`). Three consecutive bad outcomes set `status = 'dormant'`; a good outcome resets the streak. Every event is appended to `memory_feedback`. |
| `fastr_handoff` | `action: z.enum(['save', 'latest'])`, `taskTitle: z.string().optional()`, `summary: z.string().optional()`, `nextStep: z.string().optional()`, `activeFiles: z.array(z.string()).default([])`, `verifyStaging: z.boolean().default(false)` | Saves or retrieves latest cross-agent session handoff. Promotes current session's `staging` memories to `verified` if `verifyStaging=true`. |
| `fastr_status` | `projectId: z.string().optional()` | Returns active/staging/superseded memory counts, raw event count, pending spool count, embedding coverage %, and list of module mirror pages. |

---

## 3. MCP Resources (current: 5; 3 static + 2 templates)

Registered via `server.registerResource(...)`:

1. `fastr://project/overview`  
   L0 project summary with active counts and the local storage location.
2. `fastr://project/traps`  
   All active `kind = 'error_trap'` memories.
3. `fastr://session/handoff`  
   Latest cross-agent session handoff snapshot.
4. `fastr://memory/{id}` (resource template)
   Full JSON for one memory, including linked files and its validity window.
5. `fastr://memory/{id}/envelope` (resource template)
   Metadata, cryptographic provenance, file/graph links, and open/resolved/ignored conflict state for one memory.

The server also registers **2 prompts**: `pre-edit-check` and `session-wrap-up`.

---

## 4. Bundled Agent Skills (`skills/*/SKILL.md`)

The current repository ships **10 skills**:

1. `fastr-memory` — recall traps and rules at task start and before edits.
2. `fastr-trap-log` — record a diagnosed failure immediately.
3. `fastr-session-commit` — supersede stale rules, score memories, save a handoff after tests pass.
4. `fastr-curate` — deduplicate, merge, and resolve contradictions.
5. `fastr-setup` — wire FastrMemory into Claude Code and verify with `status`.
6. `fastr-plan-estimate` — base-rate estimates, file risk, and closing predictions.
7. `fastr-dag` — dependent work and shared multi-agent backlogs.
8. `fastr-doctor` — diagnose and heal a degraded database.
9. `fastr-compress` — compress docs/context under a token budget.
10. `fastr-vision` — tag and search screenshots and diagrams.

Validate every tool call in the skills against the server with `npm run check:skills`.

---

## 5. Token Budgets & Progressive Disclosure

- **L0 (Wake-up Summary)**: ~150 tokens (Project overview, active modules, active session task).
- **L1 (Targeted Rule Context)**: ~500 tokens (Active rules and critical traps for current file).
- **L2 (Multi-turn Task Context)**: ~1,500 tokens (Comprehensive rules, workflows, and recent decisions).
- **L3 (Deep History Audit)**: ~4,000 tokens (Full historical supersession chain and verbatim raw events).
