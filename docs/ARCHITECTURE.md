# FastrMemory Architecture

> **Package:** published `fastrmemory@0.5.0` (npm `latest` since 2026-10-23 15:20 UTC; `0.4.0`, `0.3.1`, and `0.3.0` remain published historical; historical 0.2.1 release: `@atifjubaer/fastrmemory`; npm entry removed 2026-10-23; CLI: `fastr` / `fastrmemory`)
> **Runtime:** Node.js >= 22.16.0, ESM, built-in `node:sqlite` in WAL mode
> **Protocol:** MCP v2 via `@modelcontextprotocol/server`
> **Status:** 0.3.0 architecture baseline as of 2026-10-21 (`b220067`); 0.3.1 added the runtime guard, project-root pinning, Windows launch fixes, and the automated release workflow. 0.4.0 added `fastr mcp init` and LF checkout enforcement. 0.5.0 adds `fastr mcp init --source local`, with no schema change. Known gaps are listed at the end and are not hidden.

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
| `memory_feedback` | Append-only per-ID outcome events with score before/after, status before/after, confidence tier, and consecutive-bad count |
| `memories_fts` | FTS5 index over title/module/content (porter + unicode61) |
| `memory_fts_queue` | Memories waiting for deferred full-text indexing (drained by readers and the doctor) |
| `memory_conflict_queue` | Memories waiting for deferred conflict analysis |
| `memory_ner_queue` | Memories waiting for deferred entity extraction |
| `file_links` | Memory ↔ file/symbol links used by the graph stream |
| `handoffs` | Cross-agent session milestones |
| `entities` / `graph_edges` | Lightweight entity and relationship graph for spreading activation |
| `memory_conflicts` | Candidate contradictions detected on write |
| `memory_snapshots` | Named coarse checkpoints; exact point-in-time replay reads the bi-temporal columns directly |
| `memory_branches` | Immutable named branch pointers to a base and head snapshot |
| `memory_branch_merges` | Audit log of branch merge attempts, strategy, applied state, counts, and the full report JSON |

Supersession sets `valid_to` and `status='superseded'` on the old row; it does not delete it. `forget` tombstones rather than hard-deletes. Markdown mirrors in `.fastr/pages/<module>.md` put active rules on top and superseded history below for Git review.

## 3. Ingestion

```text
hook/CLI/MCP
   -> secret scrubber
   -> SQLite write (WAL), one savepoint:
        -> memories row
        -> file/entity links
        -> queue rows (FTS index, conflict scan, entity extraction)
        -> on SQLITE_BUSY: append to .fastr/spool/pending.jsonl
   -> markdown mirror
```

The memory row is committed before `insertMemory()` returns. Indexing and analysis are deferred by default (`write.ftsMode`, `write.conflictMode`, `write.nerMode`) and drained by the next reader, the doctor, or the maintenance loop. Readers drain the FTS queue before running BM25, so a memory is searchable as soon as the insert returns. `write.*Mode: 'sync'` restores the historical inline path and is covered by tests.

Hooks exit after each event; there is no resident process. The optional `daemon start` command exists for cross-process HTTP/SSE use and is not required.

## 4. Retrieval

Three streams are fused with Reciprocal Rank Fusion (RRF):

1. **BM25**: weighted FTS5 `bm25(memories_fts, 0.0, 10.0, 5.0, 1.0)` over active memories, plus the attached global DB when present. Each branch is locally capped at 50 before the union.
2. **Vector**: cosine similarity over model-tagged embeddings. This stream is **off by default** unless a semantic provider is loaded. The deterministic feature-hash vectorizer is opt-in (`FASTR_VECTOR_MODE=hash`); it duplicates BM25 lexically and lowered LongMemEval Hit@1 from 89.2% to 81.7% on the 120-case slice. MiniLM vectors are weighted 3.0 when present; hash vectors use 1.0. The optional static tier (model id 3) never contributes a rank: it adds a bounded cosine bonus (`staticBlendWeight`, default 0.15) to BM25 candidates only, so it can settle near-ties but cannot outvote the first stage.
3. **Graph**: file links supplied by the caller, query entities, and 1-2 hop spreading activation over `graph_edges`. Seeding the graph from BM25/vector candidates is off by default.

Two query-shaping passes run before those streams:

- **Aggregate coverage** (default on, `retrieval.aggregateCoverage`). A counting or enumeration query ("how many projects have I led?", "list all the books I read") is detected by `detectAggregateIntent`. Its scaffolding words — `how`, `many`, `times`, `past`, `two`, `weeks`, the pronouns, the prepositions — are removed by `aggregateContentTerms`, and a second BM25 pass runs over the remaining content terms. The two rank lists are fused with the same reciprocal-rank rule used between streams, so a document found by both passes outranks one found by only one. That preserves the original query's rank-1 precision while admitting the deeper sessions the stripped query reaches. The result set widens to `retrieval.aggregateLimit` rows (default 20) only for aggregate questions.
- **Temporal windows** (opt-in, `retrieval.temporalFilter`). `detectTemporalWindow` parses relative ranges ("past two weeks", "past few months", "last month", "since the start of the year") against the question date, and absolute ranges ("in 2022", "in March 2023") without one. `withinWindow` then filters candidates on `valid_from` after fusion and before diversification, so the window never reorders the rows it keeps. The first-stage caps widen (BM25 200, vector 100) because a window makes most candidates irrelevant. If a window excludes every candidate, retrieval falls back to the unfiltered ranking and sets `temporalFallback: true` rather than returning nothing.

```text
score  = sum(stream_weight / (20 + rank_stream))   # BM25 1.0, vector 1.0 or 3.0, graph 1.0
score += 0.15 * max(0, cos) / 21                   # static tier only, BM25 candidates only
score *= reward_score                              # 0.1 .. 3.0
score *= 2.0 if kind == 'error_trap' AND (query has trap intent OR a linked file is supplied)
score *= 1.25 if status == 'verified'
```

Query vectors pass through a 256-entry LRU keyed by model id and query text, so a repeated agent query does not re-embed. The static model is loaded once from `~/.fastr/models/potion-base-8M` at server start when present; recall never downloads it.

Results are sorted, capped at 3 per source session, then packed into a token budget. Aggregate questions raise the returned-row cap to `aggregateLimit` (20) so a caller can count or enumerate. If the top result alone exceeds the budget, the current packer truncates it rather than silently dropping it. `SearchResult` annotates `temporalWindow` / `temporalFallback` when a window ran, and `ScoredMemory.temporalMatch` marks the rows inside it.

Known retrieval gaps (tracked in `ROADMAP.md`):

- The 240-case benchmark is synthetic; it is separate from the public LongMemEval, LoCoMo, and self-repository retrieval-only harnesses.
- External baselines are limited to two pinned retrieval engines: MiniSearch `7.2.0` and the MCP reference memory server `2.0.0`. No unverified competitor or QA-leaderboard comparison is claimed.
- The 48-case holdout leaves a wide Hit@1 interval, and semantic paraphrase is the weakest category.
- Aggregate coverage fixes 4 cases and breaks 0 across the 120-case LongMemEval slice, which is inside its paired-bootstrap interval; 4-gold strict@5 stays at 25.0% because the aggregate pass changes the candidate set, not the ranking.
- Temporal filtering is structurally inert on LongMemEval-s: every haystack spans about ten days, so every relative window covers the whole corpus. It is unit-tested and opt-in, not a measured accuracy gain.
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
- `createBranch()` stores an immutable branch pointer to a base and head snapshot. `mergeBranch()` is one-way into the current active set: branch-only memories are added, target-only memories are preserved, and same-identity changes become conflicts. Conflicts block writes by default; `--force` applies additions, and `--force --strategy branch` supersedes the target while keeping the old rows in history. Every non-dry-run attempt is recorded in `memory_branch_merges`.
- `inspectMemoryHygiene()` reports orphaned `file_links`, conflict, and feedback rows; duplicate active rows by `module + kind + normalized title` or exact content; and stale unpinned active rows whose last recall (or creation time) is older than the threshold. `fastr hygiene` prints the report and can exit nonzero with `--fail-on-issues`; `npm run check:hygiene` exercises the same inspector against a deterministic fixture in `check:ci` and asserts raw counts. The gate does not mutate a project database.

CLI: `fastr replay`, `fastr diff`, `fastr snapshot export|import`, `fastr branch create|list`, `fastr merge`, `fastr feedback`, `fastr hygiene`, `fastr consolidate`, and `fastr memory-ci`. MCP: `fastr_replay`, `fastr_diff`, and `fastr_feedback`.

The dashboard `/replay` route calls `GET /api/replay?from=<iso>&to=<iso>`, which replays both timestamps and returns compact snapshot views plus the same `diffSnapshots` result used by the CLI. The route is read-only: it does not insert memories, events, or conflicts. Memory CI workflow details are in [`docs/MEMORY_CI.md`](MEMORY_CI.md).

## 7. MCP surface

- **Server name:** `fastrmemory` (registry ID: `io.github.atifjubaer/fastrmemory`).
- **43 tools** in the full profile (memory CRUD, recall/drill, traps, conflicts, DAG actions, planning, slots, federation, snapshot/rollback, replay/diff, compression, doctor, vision, plus `fastr_tools` and `fastr_call`).
- **12 tools** in the default core profile: `fastr_recall`, `fastr_remember`, `fastr_handoff`, `fastr_trap_recall`, `fastr_trap_log`, `fastr_status`, `fastr_get`, `fastr_replay`, `fastr_compress`, `fastr_diagnose`, `fastr_tools`, and `fastr_call`.
- **2 prompts**: `pre-edit-check`, `session-wrap-up`.
- **5 resources**: `fastr://project/overview`, `fastr://project/traps`, `fastr://session/handoff`, the `fastr://memory/{id}` template, and the `fastr://memory/{id}/envelope` template (metadata, provenance, file/graph links, and conflict state).

The core profile is the default: 12 tools and an 8,715-byte `tools/list` payload (~2,179 tokens) instead of 29,829 bytes (~7,457 tokens) for the full 43-tool surface. `fastr_tools` lists any hidden tool with its JSON schema and `fastr_call` runs it after validating arguments, so nothing is lost. Start the full profile with `fastrmemory mcp --profile full` or `FASTR_MCP_PROFILE=full`; resources and prompts are identical in both profiles. Verify both surfaces against a built CLI with `node scripts/smoke-mcp-profile.mjs`.

## 8. Design rules

1. **Never delete facts.** Supersede and tombstone; raw events stay immutable.
2. **Bi-temporal validity, not time decay.** Active queries require `valid_to IS NULL` and exclude superseded/dormant rows.
3. **Staging until verified.** Captured memories start as `staging`; tests passing/handoff promotes them.
4. **Per-ID feedback and confidence tiers.** `fastr_feedback` changes one memory's score (+0.2 / −0.5) and reports `high` (score >= 1.5), `medium` (>= 0.8), or `low`; inactive rows report `dormant` or `superseded`. Three consecutive bad outcomes set `dormant`, and a good outcome resets the streak. Each event is appended to `memory_feedback`; a low score alone does not set dormancy.
5. **Two-zone Markdown.** Compiled Truth on top, append-only timeline below, both Git-diffable.
6. **Local-first.** No network call is required for the default path; embeddings are opt-in.
7. **Additive consolidation.** A summary is a new linked memory; originals remain queryable and replayable.
8. **Hygiene is observable, not destructive.** Orphan, duplicate, and stale checks report raw counts; `check:ci` validates the detector on a fixture, and no automatic cleanup runs against a project database.

## 9. Not implemented yet

- Prompt-cache `skipUnchanged` behavior (no byte-identical block suppression in the current hook runner).
- An end-to-end external agent-memory workflow comparison. The pinned external baselines are retrieval-only and do not exercise extraction, consolidation, or agent workflows; see [`docs/EXTERNAL_BASELINE.md`](EXTERNAL_BASELINE.md).
- Branch checkout or a mutable branch working tree; branches are immutable snapshot pointers merged one-way into the current active set.
- A live fork PR run of the Memory CI comment path (same-repository PRs are verified; fork PRs are job-summary-only by design).

These are roadmap items, not claims.
