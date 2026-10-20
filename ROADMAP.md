# FastrMemory Roadmap

This roadmap is evidence-gated. A milestone is done only when its gate passes **on a committed artifact** (a test, a raw JSON result, or a published package), not when the code is written. Estimates assume one focused maintainer and include measurement and documentation time.

Current state (2026-10-20, code commit `1495622`): 226 tests green locally, npm unpublished (E404), CI matrix partially red, a 240-case synthetic benchmark with a 48-case holdout, and a holdout Hit@1 of 89.6% (0.4 points below the 90% target). The offline hash path is weaker than MiniLM. See [`CLAIMS.md`](CLAIMS.md) for the full ledger.

---

## Milestone 1 — Truth reset and reproducible baseline (1 week)

**Goal:** no public claim without a command that reproduces it.

- Replace the stale README benchmark table with a table generated from the committed raw JSON (`bench/results/minilm.json` and `hash.json`).
- Correct counts, competitor labels, and npm status in README, SPECIFICATION, release notes, and publishing docs.
- Add `CLAIMS.md` with one row per public claim (status, command, raw output, date, commit, caveat).
- Add `FASTR_HOME` isolation and an isolation test that fails if the suite writes to the real home store.
- Capture a baseline audit: clean install, test count, build, pack contents, install size, tarball size, cold start, recall p50/p95.

**Evidence gate:** `npm test` green; isolation test green; `docs/audit/2026-10-20-baseline.md` committed; every README number appears in `CLAIMS.md`.

---

## Milestone 2 — Package, CI, and distribution (1–2 weeks)

**Goal:** a package another team can install without cloning the repo, and a CI matrix that tells the truth.

- Split `build:core`, `build:ui`, and `build:all`; stop rebuilding the tracked UI bundle on every publish.
- Add `scripts/check-package.mjs` (bin paths, `files`, exports, tarball <5 MB, no tests/docs/DBs) and `scripts/check-dist-ui.mjs` (UI source freshness).
- Set `mcpName` to `io.github.atifjubaer/fastrmemory` and align the MCP server name with the npm package name.
- Add `fail-fast: false` and the isolation/package/docs/bench checks to the 3 OS × Node 22/24 matrix.
- Publish 0.2.0 **only if** `npm whoami` works and the account is not suspended. If blocked, produce the tarball, document the exact resume command, and stop. Do not bypass 2FA or the suspension.
- Verify `npm view @atifjubaer/fastrmemory version` and `npx @atifjubaer/fastrmemory@latest --version` in a clean temp directory.

**Evidence gate:** 6/6 CI jobs green; tarball <5 MB; package installs from npm, or publication is explicitly blocked and documented with the resume command.

---

## Milestone 3 — Retrieval correctness and a real harness (2 weeks)

**Goal:** fix known ranking bugs, then measure on a corpus large enough to mean something.

**Status: partial.** The 240-case corpus, raw JSON, and 48-case holdout are committed. No external engine is measured, and holdout Hit@1 is 89.6% against the 90% target; the gap is concentrated in semantic paraphrase.

- Use `bm25(memories_fts, 10.0, 5.0, 1.0)` (and the `global_db.memories_fts` qualifier) instead of the default `f.rank`; wrap each stream with `ORDER BY rank LIMIT 50` before `UNION ALL`.
- Make RRF configurable (`rrfK`, per-stream weights, enabled streams); choose defaults by ablation.
- Remove the graph seed from top BM25/vector candidates unless an ablation shows it wins.
- Disable hash-vector backfill by default (it duplicates BM25); enable MiniLM only via an explicit `fastr embed install`.
- Build `bench/` with **240+ cases** across lexical, paraphrase, temporal/supersede, trap/file, and multi-hop categories; hold out 20% and never tune on it.
- Add baselines: BM25, BM25+hash, BM25+MiniLM, full, no-graph, no-trap, static dump, and a pinned real competitor CLI.
- Output JSON with Hit@1/3/5, MRR, nDCG@10, tokens, p50/p95, per-category, and bootstrap 95% CIs.

**Evidence gate:** 240+ cases committed; raw JSON committed; held-out results reported; no simulated baseline labeled as a real project. Retrieval targets: Hit@1 ≥90%, Hit@5 ≥98%, MRR ≥0.93, tokens ≤250/query.

---

## Milestone 4 — Integration parity and import paths (1–2 weeks)

**Goal:** meet agents where they already work, without adding a daemon.

- Add hooks for OpenCode, Gemini CLI, and Copilot CLI; publish a hook-parity table.
- Add `fastr import` for the common local formats (read-only, idempotent, dry-run by default).
- Add conflict-aware recall and a CLI/UI resolve path; add per-ID confidence tiers and 3-bad dormancy.
- Add a non-lossy consolidation command that writes a summary memory and **keeps** the raw events.
- Default the MCP server to a **core profile of 12 tools**; keep the full 39 behind an opt-in flag.

**Evidence gate:** hook-parity table with at least one tested path per client; import round-trip test; core profile starts and passes the MCP smoke test.

---

## Milestone 5 — Memory Replay and Memory CI (2 weeks)

**Goal:** the differentiator no competitor offers: exact state reconstruction and PR-level memory review.

- `fastr replay --at <ISO>` reconstructs the active set from `valid_from`, `valid_to`, `superseded_by_id`, `source_event_ids`, and `raw_events`.
- `fastr diff --from … --to …` reports added, superseded, still-active, conflicted, and token delta.
- Portable JSONL snapshot export/import with content hashes (no SQLite file in Git).
- MCP tools `fastr_replay` and `fastr_diff`; dashboard timeline slider and diff view.
- `fastr memory-ci --base --head` plus a GitHub Action that comments on a PR and optionally fails on new trap violations.

**Evidence gate:** replay is exact at three timestamps; export/import round-trips; a test PR receives a memory diff comment.

---

## Milestone 6 — Footprint, speed, and crash safety (1–2 weeks)

**Goal:** a small default install and provable durability.

- Move `@huggingface/transformers` behind an optional install; default to no vector provider.
- Drop redundant dependencies where the platform or MCP SDK already provides them.
- Tune SQLite (`mmap_size`, `cache_size`, `temp_store=MEMORY`, FTS5 `optimize`) and check the top 10 queries with `EXPLAIN QUERY PLAN`.
- Crash test: 10k writes with random kills, 10/10 runs, **0 lost / 0 duplicates**; `PRAGMA integrity_check` clean.
- Add `fastr export --jsonl`, `import`, and `backup`; verify provenance hashes on import.

**Evidence gate:** clean install <20 MB and <10 s; crash test report committed; export/import round-trip green; recall p95 <50 ms at 10k memories.

---

## Milestone 7 — Public evidence and launch (1 week)

**Goal:** publish the evidence, not adjectives.

- Rewrite README around measured claims: lossless retention, replay, tokens, latency, install size.
- Generate `BENCHMARKS.md` and the README table from raw JSON; document hardware, date, commit, and caveats.
- Publish `SCORECARD.md` with current/target/actual and `CHANGELOG.md` for 0.1.0 → 0.2.0.
- Add `SECURITY.md` (threat model, secret scrubbing, no network by default) and `MIGRATION.md`.
- Launch post: one command per number; lead with "zero facts lost" and "replay any point in time."

**Evidence gate:** 100% of README claims traced in `CLAIMS.md`; docs/bench checks green in CI; every launch number reproducible from a committed command.

---

## Explicitly out of scope

Daemons, Docker/Postgres/MatrixOne requirements, cloud sync, a managed multi-tenant service, lossy nightly consolidation, Slack ingestion, and benchmark cherry-picking. FastrMemory stays local-first, single-process, and lossless.
