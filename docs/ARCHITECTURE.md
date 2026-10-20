# FastrMemory Architecture

> **Package:** `@atifjubaer/fastrmemory` (CLI: `fastr` / `fastrmemory`)
> **Runtime:** Node.js >= 22.16.0, ESM, built-in `node:sqlite` in WAL mode
> **Protocol:** MCP v2 via `@modelcontextprotocol/server`
> **Status:** current `main` as of 2026-10-20. Known gaps are listed at the end and are not hidden.

## 1. What problem it solves

AI coding agents lose context across sessions. Two common approaches have costs:

- **Decay/consolidation systems** summarize old episodes and let the originals weaken. That keeps the store small, but exact file paths, stack traces, and edge cases can be lost. Hippo's own audit reports a 3.6-point Hit@5 drop after sleep consolidation (vendor-reported, not reproduced here).
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
| `memory_snapshots` | Named point-in-time snapshots (coarse; not per-event replay yet) |

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

Three streams are fused with Reciprocal Rank Fusion:

1. **BM25**: FTS5 `MATCH` over active memories (and the attached global DB when present).
2. **Vector**: cosine similarity over model-tagged embeddings. This stream is **optional**; the default backfill uses deterministic hash vectors (lexical n-grams), and semantic embeddings require an explicit model install.
3. **Graph**: file links supplied by the caller, query entities, and 1–2 hop spreading activation over `graph_edges`.

```text
candidates = union(BM25 top 50, vector top 50, graph-activated)
score      = sum(1 / (k + rank_stream))            # k = 60
score     *= reward_score                          # 0.1 .. 3.0
score     *= 2.0 if kind == 'error_trap'
score     *= 1.25 if status == 'verified'
```

Results are sorted, capped at 3 per source session, then packed into a token budget. If the top result alone exceeds the budget, the current packer truncates it rather than silently dropping it.

Known retrieval gaps (tracked in `ROADMAP.md`):

- BM25 uses the default `f.rank`; the intended `bm25(memories_fts, 10, 5, 1)` weighting is not wired yet.
- The global UNION uses `memories_fts MATCH ?` without the `global_db.` qualifier.
- `k=60` is hardcoded; there are no per-stream weights.
- The graph is seeded from the top 5 BM25/vector candidates, which can propagate noise.
- Hash vectors duplicate BM25; they should be opt-in.

## 5. Token budgets

| Level | Budget | Use |
|---|---:|---|
| L0 | ~150 t | wake-up summary |
| L1 | ~500 t | file/task rules and traps |
| L2 | ~1,500 t | multi-turn task context (default) |
| L3 | ~4,000 t | deep history / drill-down |

## 6. MCP surface

- **39 tools** (memory CRUD, recall/drill, traps, conflicts, DAG actions, planning, slots, federation, snapshot/rollback, compression, doctor, vision).
- **2 prompts**: `pre-edit-check`, `session-wrap-up`.
- **4 resources**: `fastr://project/overview`, `fastr://project/traps`, `fastr://session/handoff`, and the `fastr://memory/{id}` template.

The default server currently exposes all 39 tools; a 12-tool core profile is planned to reduce schema overhead.

## 7. Design rules

1. **Never delete facts.** Supersede and tombstone; raw events stay immutable.
2. **Bi-temporal validity, not time decay.** Active queries require `valid_to IS NULL` and exclude superseded/dormant rows.
3. **Staging until verified.** Captured memories start as `staging`; tests passing/handoff promotes them.
4. **Per-ID feedback.** `fastr_feedback` changes one memory's score (+0.2 / −0.5). It becomes `dormant` when the score reaches 0.2 or below — not after a fixed strike count.
5. **Two-zone Markdown.** Compiled Truth on top, append-only timeline below, both Git-diffable.
6. **Local-first.** No network call is required for the default path; embeddings are opt-in.

## 8. Not implemented yet

- Prompt-cache `skipUnchanged` behavior (no byte-identical block suppression in the current hook runner).
- Exact per-event replay (`fastr replay`) and memory-state diff (`fastr diff`).
- Portable JSONL snapshot export/import with hash verification.
- A 20% held-out 240+ case benchmark and real pinned competitor baselines.
- A core MCP profile and non-lossy consolidation.
- Crash-test evidence for 10k writes.

These are roadmap items, not claims.
