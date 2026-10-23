# Scorecard

> **0.4.0 release (2026-10-23):** `fastrmemory@0.4.0` is published and npm `latest`. Release workflow run `39918288792` passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload; the suite is **293 tests / 53 files**. `0.3.1` and `0.3.0` remain published historical.
>
> **Current main (`0.5.0`, prepared):** adds `fastr mcp init --source local` and passes **297 tests / 53 files**; remote CI run `39935705994` is 6/6 green. The scores below remain the 0.4.0 assessment until `v0.5.0` is published.
>
> **0.3.1 release (2026-10-23; historical):** `fastrmemory@0.3.1` remains published historical and passes **282 tests / 52 files**; release workflow run `39868908223` passed the full gate. The nine gate scores below remain the `0.3.1` assessment; `0.4.0` adds `mcp init` and LF enforcement, with no new benchmark or security score measured.

**Evidence date:** 2026-10-23 (0.3.1 assessment)
**Code evidence:** `0e0cb8d` (282 tests / 52 files); remote CI run `4164a9c` is 6/6 green in run `39847701573`; release tag `v0.3.1` (`3a3cac6`)
**npm release evidence:** `fastrmemory@0.3.1` published 2026-10-22 23:02 UTC; at that assessment `npm view fastrmemory version` returned `0.3.1` and fresh-cache `npx` plus clean global install returned `0.3.1`; GitHub `v0.3.1` asset attached; old scoped npm entries removed 2026-10-23; GitHub `v0.2.1` tag/release remains historical; `0.4.0` is now `latest`
**Documentation evidence:** `MIGRATION.md`, `SECURITY.md`, `CLAIMS.md`, and this scorecard in this docs commit
**Target:** `9.2 / 10`

This is a release-readiness score, not a marketing score. Each gate is scored `1.0` (pass), `0.5` (partial), or `0.0` (fail / not measured). The nine scored categories are the eight non-score completion gates in `ROADMAP.md` plus launch evidence; the roadmap's `Score` row is this total, not a separate category. The gates have equal weight. A partial gate is never rounded up. The numeric total is provisional because the target is defined in `ROADMAP.md`, not in an external rubric.

## Gate scores

| # | Gate | Score | Evidence | Remaining gap |
|---:|---|---:|---|---|
| 1 | Truth | 1.0 | README launch status table, release status banner, and 0.2.1 post added; `CLAIMS.md` now has A1-A11, A2a, C1-C8, E1-E16, F11-F15, H20, and J1-J2 plus a section-by-section README trace; `npm run check:docs` enforces the trace, the 41-tool catalog, and the prompt/resource counts; `docs/SPECIFICATION.md`, `RELEASE_v0.1.0.md`, and `docs/npm-publishing.md` carry current-count and historical qualifiers | The trace is section-level; it does not semantically test every sentence |
| 2 | Tests | 1.0 | `npm test` at `0e0cb8d`: 282 tests / 52 files; remote CI run `4164a9c` is 6/6 green in run `39847701573`; release workflow run `39868908223` passed the full gate at tag `v0.3.1`; historical v0.2.1 release `3fa2bf9` is 6/6 green in CI run `39495621243` | None for the six-job matrix; Apple Silicon remains uncovered under Phase 5.4 |
| 3 | Package and distribution | 1.0 | Canonical npm `fastrmemory@0.3.1` published 2026-10-22 23:02 UTC; registry shasum `dfe5f0a2a61edad89dfc8529548488762a08ca8e`; 271 files / 2,599,277 bytes unpacked; `npm install -g fastrmemory@0.3.1` and fresh-cache `npx` return `0.3.1`; GitHub `v0.3.1` asset attached with SHA-256 `747f61791dcb7c5694f3cf5cc8705152892a5b16cb33bec51a356fc22112a7b8`; old scoped npm entries removed 2026-10-23; GitHub `v0.2.1` asset remains historical | None for npm/GitHub release distribution; Apple Silicon remains uncovered |
| 4 | Footprint | 1.0 | v0.2.1 default install: 16,493,075 bytes, 1.93 s; 0.3.0 local gate baseline: 16,756,937 bytes, 1,806 ms; published 0.3.1 tarball: 649,317 bytes packed / 2,599,277 unpacked / 271 files; clean global install: 5 packages in 2 s; `check:package`: 3 runtime dependencies | The 0.3.1 `node_modules` directory was not re-measured; package and install times remain under the gate |
| 5 | Benchmark | 1.0 | 240 deterministic cases (192 train / 48 holdout); raw JSON at `bench/results/minilm.json` and `hash.json`; `npm run bench:verify` passes | None for the synthetic benchmark gate |
| 6 | Retrieval | 0.5 | Synthetic holdout meets Hit@1/5, MRR, and token targets. LongMemEval external: +10.4pp / +11.0pp Hit@5. LoCoMo external: +4.4pp / +2.3pp | LoCoMo misses the `+5pp` target; Hit@1 is 0.1pp below the MCP adapter; frozen-holdout rerun (2.3) is Partial |
| 7 | Integrity | 1.0 | Crash test: 10/10 runs, 10,718 acknowledged writes, 10,727 committed rows, 0 lost, 0 duplicates, integrity `ok`; replay/diff gates pass | Process-kill only; not power-loss; `synchronous=NORMAL` |
| 8 | Moat | 1.0 | Replay CLI/UI and same-repository Memory CI comment lifecycle verified; PR #12 comment `6304608575` was updated in place on rerun | Fork PR comment path is job-summary-only; not live-tested |
| 9 | Launch evidence | 1.0 | `MIGRATION.md`, `SECURITY.md`, and this scorecard exist; `CHANGELOG.md` covers 0.1.0-0.3.1; README launch table records the live canonical npm path; npm `fastrmemory@0.3.1` is `latest`; the GitHub `v0.3.1` release asset is attached; the `v0.2.1` release remains historical and the old npm entries are removed | The launch evidence is release-specific; npm and the GitHub Release are both verified |

## Provisional total

**8.5 / 9 gate points = 9.4 / 10.** The `9.2 / 10` target is **met**.

The remaining retrieval gap is:

1. LoCoMo misses the external `+5pp Hit@5` target (`+4.4pp` vs MiniSearch and `+2.3pp` vs MCP memory); Hit@1 is `0.1pp` below the MCP adapter.

Remote CI evidence is green at `4164a9c` in run `39847701573` (6/6 jobs). The release workflow ran the full gate at tag `v0.3.1` (282 tests / 52 files), published with GitHub Actions OIDC, and `fastrmemory@0.3.1` was live as `latest` at that assessment; `0.4.0` is now `latest`. Phase 5's legacy-row cleanup is complete; Apple Silicon coverage remains, but it does not change the gate scores.

If Retrieval closes without regressing the passing gates, the provisional total would reach `9.0 / 9 = 10.0 / 10`. That is a forecast, not a result; the `9.2` target is already met at `9.4`.

## Reproduce the evidence

```bash
npm run check:ci
npm run check:docs
npm run bench:verify
npx tsx scripts/eval-external.ts longmemeval --engine minisearch
npx tsx scripts/eval-external.ts longmemeval --engine mcp-memory
npx tsx scripts/eval-external.ts locomo --engine minisearch
npx tsx scripts/eval-external.ts locomo --engine mcp-memory
```

Raw JSON is committed under `bench/results/`. Public benchmark caveats are in `BENCHMARKS.md`, `docs/PUBLIC_BENCHMARKS.md`, and `docs/EXTERNAL_BASELINE.md`. The claims ledger is `CLAIMS.md`.

## What this score does not mean

- It does not compare FastrMemory to a QA leaderboard.
- It does not claim uniform retrieval superiority; LoCoMo is a measured miss.
- It does not claim power-loss durability or multi-user security.
- It does not claim any old scoped npm package is still installable; `fastrmemory@0.4.0` is `latest`, and `0.3.1`/`0.3.0` remain published historical.
