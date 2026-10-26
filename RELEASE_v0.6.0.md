FastrMemory 0.6.0 is a write-path, retrieval, and distribution release. Everything below is measured in this repository; the raw artifacts are linked.

```bash
npx -y fastrmemory@0.6.0 mcp
```

## What changed

- **Writes are deferred.** `insertMemory()` commits the memory row, its file links, and three queue rows in one savepoint, then returns. Conflict analysis, entity extraction, and FTS tokenization run afterwards. Readers drain the FTS queue before BM25, so a memory is searchable the moment the write returns.
- **The MCP surface defaults to 12 tools.** `tools/list` drops from 29,829 bytes (~7,457 tokens) to 8,715 bytes (~2,179 tokens). `fastr_tools` and `fastr_call` reach the remaining 31 tools; `fastr mcp --profile full` exposes all 43.
- **Optional static semantic reranker.** `fastr model install` fetches `minishlab/potion-base-8M` (256-dim, 30.2 MB, SHA-256 pinned), never implicitly and never inside the npm package. Pure TypeScript, no native binary. It is a bounded reranker over BM25 candidates, capped at 15% of a rank-1 hit.
- **Aggregate and temporal retrieval.** Counting questions get a second lexical pass fused with the first (on by default). Relative date ranges ("past two weeks", "this year") parse into absolute windows and filter before ranking (opt-in via `retrieval.temporalFilter`).
- **Cross-engine benchmark.** `npm run bench:vs` drives FastrMemory, `@agentmemory/mcp@0.9.30`, and `hippo-memory@2.1.0` over MCP stdio on a deterministic 1,200-document corpus and reports paired bootstrap and McNemar statistics.
- **`fastr hook uninstall`.** Reversible and idempotent for Claude Code, Cursor, OpenCode, Gemini CLI, and Copilot CLI. It removes exactly what `fastr hook install` wrote and leaves user entries alone. Matrix: [docs/CLIENT_SUPPORT.md](https://github.com/atifjubaer/fastrmemory/blob/v0.6.0/docs/CLIENT_SUPPORT.md).
- **Clean-machine smoke.** `npm run smoke:npx` installs the published package with `npx` in an empty directory and boots `status`, which opens a real `node:sqlite` database.

## Upgrade notes

Three defaults changed. None of them rewrites a memory row, and the old behaviour is still reachable:

| Default | 0.5.0 | 0.6.0 | Restore 0.5.0 |
|---|---|---|---|
| Write analysis | inline | deferred | `write.conflictMode`, `write.nerMode`, `write.ftsMode` = `sync` |
| MCP tools | 43 | 12 core + `fastr_tools`/`fastr_call` | `fastr mcp --profile full` |
| Hash vectors | on | opt-in | `FASTR_VECTOR_MODE=hash` |

Schema setup is additive: `memory_conflict_queue`, `memory_ner_queue`, and `memory_fts_queue` are created with `CREATE TABLE IF NOT EXISTS` the first time a 0.6.0 command opens the database. There is no downgrade path, so take a backup first. See [MIGRATION.md](https://github.com/atifjubaer/fastrmemory/blob/v0.6.0/MIGRATION.md).

## Evidence

- **Tests:** 388 passing across 61 files. CI run [40260815504](https://github.com/atifjubaer/fastrmemory/actions/runs/40260815504) at `92b4177` passed 6/6 jobs (Ubuntu, Windows, Intel macOS × Node 22.x/24.x), including the hook install/uninstall smoke.
- **Clean-machine install:** run [40261934471](https://github.com/atifjubaer/fastrmemory/actions/runs/40261934471) at `b9645ef` passed 6/6 jobs; every job did a cold `npx` install and reported `"statusBooted":true` and `"ok":true`.
- **Cross-engine marker benchmark** (`bench/results/vs-engines.json`, 1,200 docs, 120 queries): Hit@1 **80/120 (66.7%, 95% CI 57.8-74.5)** overall — exact **40/40**, multi-fact **40/40**, paraphrase **0/40**. Ingest **1.094 ms/doc**, recall p50 **1.86 ms**. `@agentmemory/mcp` scored 78/120 on the same corpus, and `hippo-memory` 39/120 on the better of its two runs (its ranking mutates per query, so its numbers are not reproducible).
- **Negative results, published:** paraphrase queries score **0/40 for all three engines** because every engine needs a shared term, so the tier measures nothing about semantics. The static reranker moved dev Hit@1 91.7% → 93.3% and test 85.0% → 85.0% (exact McNemar p = 1.00), so it is reported as non-regressive, **not** as an accuracy win.
- **Packaging:** 319 files, 725,938 bytes packed, 2,929,061 bytes unpacked, 3 runtime dependencies, no native binaries. `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations.
- **Asset:** `fastrmemory-0.6.0.tgz`, SHA-256 `17fc8071e5b2f715d5a79b0da542268606bf32dc37b034f5e8fa94c58f8e7a10`.

Full surface: [CHANGELOG.md](https://github.com/atifjubaer/fastrmemory/blob/v0.6.0/CHANGELOG.md). Every claim with its evidence command: [CLAIMS.md](https://github.com/atifjubaer/fastrmemory/blob/v0.6.0/CLAIMS.md).
