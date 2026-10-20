# Master Build Prompt: @fastrsoft/fastrmemory

> **Historical artifact (v0.1.0).** This prompt was used to build the first version. It contains stale counts (8 tools / 3 resources), the old package scope, and competitor claims that are **not** current evidence. Do not cite it as documentation. The current package is `@atifjubaer/fastrmemory`; see [`CLAIMS.md`](../CLAIMS.md) for the verified surface.

# Master Build Prompt for Claude Code: @fastrsoft/fastrmemory

Copy and paste the prompt below directly into Claude Code (or Cursor / Codex) inside an empty directory named fastrmemory to build the complete, production-ready codebase.

## Prompt to Paste into Claude

You are a Principal Systems Architect at Fastrsoft building @fastrsoft/fastrmemory (CLI command: fastr, local store directory: .fastr/), a next-generation, local-first persistent memory engine and MCP server for AI coding agents (Claude Code, Cursor, Codex, OpenCode, Gemini CLI, and any MCP client).Your goal is to build a complete, tested, zero-daemon TypeScript & Node.js package that combines the best architectural patterns from [Hippo Memory (kitfunso/hippo-memory)](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Fkitfunso%2Fhippo-memory), [AgentMemory (rohitg00/agentmemory)](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Frohitg00%2Fagentmemory), [Graphiti (getzep/graphiti)](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Fgetzep%2Fgraphiti), and [GBrain (garrytan/gbrain)](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Fgarrytan%2Fgbrain-evals), while eliminating Hippo Memory's core failure modes.

### Phase 1: Clone & Inspect Competitor Reference Repositories

First, create a references/ folder (add references/ to .gitignore) and clone the following reference repositories to inspect their patterns before writing code:Bashmkdir -p references
git clone --depth 1 https://github.com/kitfunso/hippo-memory.git references/hippo-memory
git clone --depth 1 https://github.com/rohitg00/agentmemory.git references/agentmemory
git clone --depth 1 https://github.com/modelcontextprotocol/typescript-sdk.git references/mcp-typescript-sdk
git clone --depth 1 https://github.com/lhl/agentic-memory.git references/agentic-memory
Study these specific reference files before implementing fastrmemory:Reference RepositoryFiles / Modules to InspectWhat to Learn & Adoptreferences/mcp-typescript-sdkpackages/server/, skills/mcp-typescript-sdk-upgrade-to-v2/Use the v2 SDK (@modelcontextprotocol/server, @modelcontextprotocol/server/stdio, zod/v4) with McpServer, server.registerTool(), and server.registerResource(). Never use legacy v1 @modelcontextprotocol/sdk imports.references/hippo-memorysrc/, README.mdInspect how Hippo structures .hippo/hippo.db, CLI commands, hook installation for Claude Code/Cursor/Codex, secret scrubbing, and byte-identical prompt-cache-safe UserPromptSubmit context blocks (skipUnchanged).references/agentmemorysrc/, plugin/, packages/mcp/Inspect the 12 lifecycle hooks, SHA-256 event deduplication, offline .jsonl capture spooling, Reciprocal Rank Fusion (RRF, k=60), session diversification (max 3 per session), and provenance capping (max 32 observation IDs).references/agentic-memoryANALYSIS-mempalace.mdReview the L0–L3 progressive token loading hierarchy (~150 tokens wake-up cost) and the "store verbatim, compress separately" rule.

### Phase 2: Core Architectural Rules (How fastrmemory Fixes Competitor Flaws)

Enforce these 7 non-negotiable architectural rules throughout the codebase:No Lossy Sleep Merging: Never delete or blend raw observations during consolidation. Store every tool call, file edit, git commit, and test failure verbatim in raw_events. Link summarized memories to raw_events via source_event_ids (capped at the newest 32 IDs per memory) so fastr_drill can always retrieve the exact original diff or stack trace.Bi-Temporal Validity Windows Instead of Time Decay: Do not use time-based half-life decay that forgets rarely touched architectural modules (like Auth or Billing). Every row in memories has valid_from (ISO timestamp) and valid_to (NULL when currently true, or an ISO timestamp when superseded/invalidated). Active recall queries strictly filter WHERE valid_to IS NULL AND status != 'superseded'.Staging Quarantine Until Tests Pass: Memories captured mid-session start with status = 'staging'. When tests or builds pass (via fastr watch or fastr_verify_staging), promote them to status = 'verified'. Verified memories receive a 1.25x ranking boost over unverified staging notes.Per-ID Outcome Feedback (Never Batch Penalty): Stamp every recalled memory in context output with its short ID ([mem_8f2a1c]). When fastr_feedback is called with outcome: 'good' | 'bad', update reward_score (+0.2 for good, -0.5 for bad, floor 0.1) on only that specific memory_id, never on the entire recall batch.GBrain-Style Two-Zone Markdown Mirrors: After any write or supersession in module <module>, automatically render .fastr/pages/<module>.md with two human-readable, git-diffable sections:## Compiled Truth (Active Rules & Traps) — All active (valid_to IS NULL) rules, decisions, and [TRAP] warnings for that module.## Append-Only Timeline (History & Superseded) — Chronological log of superseded rules ([EXPIRED valid_from -> valid_to]) and why they changed.Triple-Stream Hybrid Search with RRF (k=60): Combine (a) SQLite FTS5 BM25 keyword search (weighting title/file/symbol A, content B), (b) Cosine similarity over local 384-dim embeddings (@huggingface/transformers with Xenova/all-MiniLM-L6-v2, falling back gracefully if not yet embedded), and (c) Direct file-path/symbol graph matches in file_links (1–2 hops). Fuse ranks with RRF(k=60), multiply by reward_score * (kind === 'error_trap' ? 2.0 : 1.0) * (status === 'verified' ? 1.25 : 1.0), and cap results at max 3 per session_id.Prompt-Cache-Safe Context Injection & Offline Spooling: Render per-prompt hook outputs without live fluctuating numbers so identical context blocks hit LLM prompt caches (skipUnchanged for 10 turns). If SQLite returns SQLITE_BUSY during a hook, write the event to .fastr/spool/pending.jsonl in <5ms and drain it asynchronously on the next command.

### Phase 3: Target Directory & File Structure

Generate the project with this clean TypeScript structure (Node.js >= 22.16.0, ESM, strict TypeScript):Plaintextfastrmemory/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── README.md
├── bin/
│   └── fastr.ts                  # CLI entrypoint (init, remember, recall, context, supersede, feedback, watch, sleep, status, mcp, serve)
├── src/
│   ├── index.ts                  # Public programmatic exports
│   ├── config.ts                 # Project identity (git remote / .fastr-project.json), paths, token budgets
│   ├── db/
│   │   ├── schema.ts             # Node 22 node:sqlite DatabaseSync init, WAL pragma, 5 tables + FTS5 triggers
│   │   ├── spool.ts              # Offline .fastr/spool/pending.jsonl writer & background drainer for SQLITE_BUSY
│   │   └── repository.ts         # CRUD for raw_events, memories, file_links, handoffs, token_ledger
│   ├── search/
│   │   ├── embeddings.ts         # Optional local Xenova/all-MiniLM-L6-v2 embedder + async batch backfill queue
│   │   ├── hybrid-rrf.ts         # BM25 (FTS5) + Vector Cosine + File Graph BFS + RRF(k=60) + Session Diversification
│   │   └── budget.ts             # Progressive L0-L3 token budget packer (150 / 500 / 1500 / 4000 tokens)
│   ├── mirror/
│   │   └── markdown-pages.ts     # Renders .fastr/pages/<module>.md (Compiled Truth + Append-Only Timeline)
│   ├── privacy/
│   │   └── scrubber.ts           # Redacts API keys, Bearer tokens, PEM blocks, URL passwords, <private> tags
│   ├── hooks/
│   │   ├── installer.ts          # Auto-wires Claude Code (~/.claude/settings.json), Cursor, Codex, OpenCode
│   │   └── handlers.ts           # Hook handlers: session-start, prompt-submit, post-tool, post-error, pre-compact, session-end
│   └── mcp/
│       ├── server.ts             # Official @modelcontextprotocol/server v2 McpServer with 8 tools & 3 resources
│       ├── stdio.ts              # StdioServerTransport runner
│       └── http.ts               # Optional Streamable HTTP server (@modelcontextprotocol/node) with X-Fastr-Project scoping
├── skills/
│   ├── fastr-before-coding/
│   │   └── SKILL.md              # Skill 1: Pre-task module truth & trap check
│   ├── fastr-trap-logger/
│   │   └── SKILL.md              # Skill 2: Immediate root-cause error trap recording
│   └── fastr-session-commit/
│       └── SKILL.md              # Skill 3: Post-test verification, supersession, and per-ID outcome rating
└── tests/
    ├── schema.test.ts            # Real SQLite database tests (zero mocks)
    ├── hybrid-search.test.ts     # Tests BM25 + Vector + File-Link RRF fusion & session diversification
    ├── lifecycle.test.ts         # Tests staging -> verified, supersession valid_to, and per-ID feedback
    └── mcp-server.test.ts        # End-to-end MCP tool invocation tests


### Phase 4: Exact SQLite Schema ( src/db/schema.ts )

Use Node.js 22's built-in import { DatabaseSync } from 'node:sqlite' with PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;. Create these exact tables:SQL-- 1. Immutable raw observations (never deleted by consolidation)
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

-- 2. Structured memories with Bi-Temporal Validity Windows & Outcome Multipliers
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
  valid_to TEXT DEFAULT NULL, -- NULL = currently true; ISO timestamp = superseded/expired
  superseded_by_id TEXT DEFAULT NULL,
  source_event_ids TEXT NOT NULL DEFAULT '[]', -- JSON array of up to 32 newest raw_events.id
  embedding BLOB DEFAULT NULL, -- Float32Array (384 dims) when embedded
  embedded INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  last_recalled_at TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS idx_memories_active ON memories(project_id, module, valid_to, status);

-- 3. FTS5 Virtual Table for sub-millisecond BM25 keyword search (title weighted 10.0, module 5.0, content 1.0)
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

-- 4. File & Symbol Graph Links (1-2 hop structural retrieval)
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


### Phase 5: Exact 8 MCP Tools & 3 MCP Resources ( src/mcp/server.ts )

Implement the MCP server using @modelcontextprotocol/server v2 and zod/v4:MCP Tool / ResourceInput Schema (zod/v4)Exact Behaviorfastr_recallquery: z.string(), files: z.array(z.string()).default([]), module: z.string().optional(), budgetTokens: z.number().default(2000), includeHistory: z.boolean().default(false)Runs Triple-Stream RRF search (BM25 + Vector + file_links). Filters valid_to IS NULL unless includeHistory=true. Formats each memory with [mem_id] [kind] [status] and packs within budgetTokens. Increments retrieval_count.fastr_drillmemoryId: z.string().optional(), eventId: z.string().optional()Looks up source_event_ids for memoryId (or fetches eventId directly) from raw_events and returns the untruncated verbatim tool output, diff, or stack trace.fastr_file_historyfilePath: z.string()Returns all active rules and [TRAP] warnings linked to filePath in file_links, followed by superseded historical rules for that file ordered chronologically.fastr_remembermodule: z.string(), kind: z.enum(['rule', 'decision', 'error_trap', 'workflow']), title: z.string(), content: z.string(), files: z.array(z.string()).default([]), symbols: z.array(z.string()).default([]), verified: z.boolean().default(false), pinned: z.boolean().default(false)Scrubs secrets, checks for near-duplicates (returning a similarTo hint if cosine > 0.88 or high BM25 overlap), inserts into memories and file_links, queues embedding, and re-renders .fastr/pages/<module>.md.fastr_supersedeoldMemoryId: z.string(), newTitle: z.string(), newContent: z.string(), reason: z.string(), files: z.array(z.string()).optional()Sets valid_to = CURRENT_TIMESTAMP, status = 'superseded', superseded_by_id = newId on oldMemoryId, inserts the new replacement memory with status = 'verified', copies or updates file_links, and re-renders the module's Markdown mirror page.fastr_feedbackmemoryId: z.string(), outcome: z.enum(['good', 'bad']), note: z.string().optional()Updates reward_score on only memoryId (+0.2 for 'good', -0.5 for 'bad', minimum 0.1). If a memory receives 3 'bad' ratings with 0 'good' ratings, sets status = 'dormant' so it leaves active recall.fastr_handoffaction: z.enum(['save', 'latest']), taskTitle: z.string().optional(), summary: z.string().optional(), nextStep: z.string().optional(), activeFiles: z.array(z.string()).default([]), verifyStaging: z.boolean().default(false)Saves or retrieves the latest cross-agent session handoff. If verifyStaging=true, promotes all status = 'staging' memories from the current session to status = 'verified'.fastr_statusprojectId: z.string().optional()Returns active/staging/superseded memory counts, raw event count, pending spool count, embedding coverage %, and list of module pages.Resources (x3)fastr://project/overview
fastr://project/traps
fastr://session/handoffExposes L0 project summary (~150 tokens), all active error_trap memories, and the latest task handoff as standard MCP resources.

### Phase 6: Bundled Agent Skills ( skills/*/SKILL.md )

Create the 3 SKILL.md files with YAML frontmatter (name, description) and clear instructions:skills/fastr-before-coding/SKILL.md: Instructs the agent to call fastr_recall (passing the target files[] and task query) or fastr_file_history before modifying any file, and to explicitly list any [TRAP] warnings in its reasoning plan.skills/fastr-trap-logger/SKILL.md: Instructs the agent to call fastr_remember with kind: 'error_trap' the exact moment a build, test, or runtime error is diagnosed and fixed—never waiting until the end of the session.skills/fastr-session-commit/SKILL.md: Instructs the agent at task completion (once tests pass) to:Call fastr_supersede if any existing rule ([mem_xxxx]) was changed or invalidated by today's work.Call fastr_feedback (good or bad) on the specific [mem_xxxx] IDs that were injected or recalled during the session.Call fastr_handoff with action: 'save' and verifyStaging: true to promote staging memories and leave a clean handoff for the next session.

### Phase 7: Verification & Execution Checklist

After writing all files:Run npm install and npm run build (tsc --noEmit) and fix any TypeScript errors.Run npx vitest run against a real temporary SQLite database (no mocked DB stores) verifying:Raw event capture, SHA-256 deduplication, secret scrubbing, and .jsonl spool draining.FTS5 keyword search + local embedding vector search + file_links RRF fusion.Bi-temporal supersession (valid_to immediately hides old rules from active recall while keeping them in includeHistory: true and .fastr/pages/<module>.md).Per-ID fastr_feedback updating only the targeted memory_id.Full MCP tool calls through McpServer.

##### You said
