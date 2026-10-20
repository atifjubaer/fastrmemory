# FastrMemory Architecture

> **Package:** `@atifjubaer/fastrmemory` (CLI: `fastr` / `fastrmemory`)
> **Runtime:** Node.js >= 22.16.0, ESM, built-in `node:sqlite` in WAL mode
> **Protocol:** MCP v2 via `@modelcontextprotocol/server`
> **Status:** current `main` as of 2026-10-21 (`a91ad6d`). Known gaps are listed at the end and are not hidden.

## 1. What problem it solves

AI coding agents lose context across sessions. Two common approaches have costs:

- **Decay/consolidation systems** summarize old episodes and let the originals weaken. That keeps the store small, but exact file paths, stack traces, and edge cases can be lost.
- **Always-on capture systems** keep raw transcripts, but often need a daemon and can flood the prompt with noisy tool output.

FastrMemory takes a third path: keep immutable raw events, keep a bi-temporal memory table, and retrieve a small packed context on demand. No background daemon is required for the default CLI/MCP path.

## 2. Storage model

| Table | Purpose |
|---|---|
| `raw_events` | Immutable event payloads (tool output, errors, commits, prompts) with SHA-256 content hashes |
| `memories` | Rules/decisions/traps with `valid_from`, `valid_to`, `superseded_by_id`, `status`, `reward_score`, optional embedding |
| `memories_fts` | FTS5 index over title/module/content (porter + unicode61) |
| `file_links` | Memory ↔ file/symbol links used by the graph stream |
| `handoffs` | Cross-agent session milestones |
| `entities` / `graph_edges` | Lightweight entity and relationship graph for spreading activation |
| `memory_conflicts` | Candidate contradictions detected on write |
| `memory_snapshots` | Named coarse checkpoints; exact point-in-time replay reads the bi-temporal columns directly |

Supersession sets `valid_to` and `status='superseded'` on the old row; it does not delete it. `forget` tombstones rather than hard-deletes. Markdown mirrors in `.fastr/pages/<module>.md` put active rules on top and superseded history below for Git review.

## 3. Ingestion

```text
hook/CLI/MCP
   -> secret scrubber
   -> SQLite write (WAL)
        -> on SQLITE_BUSY: append to .fastr/spool/pending.jsonl
   -> FTS triggers + file/entity links
   -> markdown mirror
```

Hooks exit after each event; there is no resident process. The optional `daemon start` command exists for cross-process HTTP/SSE use and is not required.

## 4. Retrieval

Three streams are fused with Reciprocal Rank Fusion (RRF):

1. **BM25**: weighted FTS5 `bm25(memories_fts, 0.0, 10.0, 5.0, 1.0)` over active memories, plus the attached global DB when present. Each branch is locally capped at 50 before the union.
2. **Vector**: cosine similarity over model-tagged embeddings. This stream is **optional**; the offline fallback uses deterministic hash vectors (lexical n-grams), and semantic embeddings require an explicit model install. Semantic vectors are weighted 3.0 when present; hash vectors use 1.0.
3. **Graph**: file links supplied by the caller, query entities, and 1-2 hop spreading activation over `graph_edges`. Seeding the graph from BM25/vector candidates is off by default.

```text
score  = sum(stream_weight / (20 + rank_stream))   # BM25 1.0, vector 1.0 or 3.0, graph 1.0
score *= reward_score                              # 0.1 .. 3.0
score *= 2.0 if kind == 'error_trap' AND (query has trap intent OR a linked file is supplied)
score *= 1.25 if status == 'verified'
```

Results are sorted, capped at 3 per source session, then packed into a token budget. If the top result alone exceeds the budget, the current packer truncates it rather than silently dropping it.

Known retrieval gaps (tracked in `ROADMAP.md`):

- The 240-case benchmark is synthetic; real-repository retrieval is not measured.
- No external memory engine is measured.
- The 48-case holdout leaves a wide Hit@1 interval, and semantic paraphrase is the weakest category.
- The graph stream is not exercised beyond cases that are already rank 1 on this corpus.
- A reranker for title-concept collisions is not implemented.

## 5. Token budgets

| Level | Budget | Use |
|---|---:|---|
| L0 | ~150 t | wake-up summary |
| L1 | ~500 t | file/task rules and traps |
| L2 | ~1,500 t | multi-turn task context (default) |
| L3 | ~4,000 t | deep history / drill-down |

## 6. Replay, snapshots, and consolidation

Replay is derived from the existing bi-temporal columns, not from a second log:

- `replayAt(db, projectId, at)` selects rows whose `valid_from <= at` and whose `valid_to` is null or after `at`. Rows that started before `at` but are inactive are returned in `history`, so supersession links stay visible.
- `diffSnapshots(from, to)` reports added, superseded, still-active, changed, and open-conflict rows plus a token delta. New active `error_trap` rows are listed separately for CI gating.
- `exportSnapshotJsonl()` writes one hashed JSONL header plus hashed memory, raw-event, file-link, and conflict records. It never writes a SQLite file. Import verifies every hash, is idempotent, and re-embeds imported memories lazily.
- `consolidateMemories()` writes a new `workflow` summary that links every source memory and raw event. It does not delete, merge, or mutate the originals; project-wide before/after counts make the non-loss property visible.
- `runMemoryCi()` compares base and head JSONL snapshots, emits Markdown, and optionally exits `1` when the head adds an active trap.

CLI: `fastr replay`, `fastr diff`, `fastr snapshot export|import`, `fastr consolidate`, and `fastr memory-ci`. MCP: `fastr_replay` and `fastr_diff`.

## 7. MCP surface

- **Server name:** `fastrmemory` (registry ID: `io.github.atifjubaer/fastrmemory`).
- **41 tools** in the full profile (memory CRUD, recall/drill, traps, conflicts, DAG actions, planning, slots, federation, snapshot/rollback, replay/diff, compression, doctor, vision).
- **12 tools** in the optional core profile: `fastr_recall`, `fastr_remember`, `fastr_handoff`, `fastr_trap_recall`, `fastr_trap_log`, `fastr_status`, `fastr_get`, `fastr_timeline`, `fastr_diff`, `fastr_replay`, `fastr_compress`, and `fastr_diagnose`.
- **2 prompts**: `pre-edit-check`, `session-wrap-up`.
- **4 resources**: `fastr://project/overview`, `fastr://project/traps`, `fastr://session/handoff`, and the `fastr://memory/{id}` template.

The full 41-tool surface is the default. Start the core profile with `fastrmemory mcp --profile core` or `FASTR_MCP_PROFILE=core`; resources and prompts are identical in both profiles. Verify both surfaces against a built CLI with `node scripts/smoke-mcp-profile.mjs`.

## 8. Design rules

1. **Never delete facts.** Supersede and tombstone; raw events stay immutable.
2. **Bi-temporal validity, not time decay.** Active queries require `valid_to IS NULL` and exclude superseded/dormant rows.
3. **Staging until verified.** Captured memories start as `staging`; tests passing/handoff promotes them.
4. **Per-ID feedback.** `fastr_feedback` changes one memory's score (+0.2 / −0.5). It becomes `dormant` when the score reaches 0.2 or below — not after a fixed strike count.
5. **Two-zone Markdown.** Compiled Truth on top, append-only timeline below, both Git-diffable.
6. **Local-first.** No network call is required for the default path; embeddings are opt-in.
7. **Additive consolidation.** A summary is a new linked memory; originals remain queryable and replayable.

## 9. Not implemented yet

- Prompt-cache `skipUnchanged` behavior (no byte-identical block suppression in the current hook runner).
- A real-repository benchmark and a pinned external baseline (the 240-case synthetic held-out benchmark exists; see [`BENCHMARKS.md`](../BENCHMARKS.md)).
- Dashboard timeline slider and diff view.
- A live PR run of the Memory CI comment path (the workflow is committed; fork PRs are job-summary-only).

These are roadmap items, not claims.
