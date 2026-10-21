# Scorecard

**Evidence date:** 2026-10-21
**Code evidence:** `fe87e22` (local `npm run check:ci` and remote CI run `39529344409`); roadmap status in this docs commit
**Documentation evidence:** `MIGRATION.md`, `SECURITY.md`, `CLAIMS.md`, and this scorecard in this docs commit
**Target:** `9.2 / 10`

This is a release-readiness score, not a marketing score. Each gate is scored `1.0` (pass), `0.5` (partial), or `0.0` (fail / not measured). The nine scored categories are the eight non-score completion gates in `ROADMAP.md` plus launch evidence; the roadmap's `Score` row is this total, not a separate category. The gates have equal weight. A partial gate is never rounded up. The numeric total is provisional because the target is defined in `ROADMAP.md`, not in an external rubric.

## Gate scores

| # | Gate | Score | Evidence | Remaining gap |
|---:|---|---:|---|---|
| 1 | Truth | 1.0 | README launch status table, release-vs-branch banner, and 0.2.1 post added; `CLAIMS.md` now has A1-A11, C1-C8, E1-E16, F11-F15, H20, and J1-J2 plus a section-by-section README trace; `npm run check:docs` enforces the trace, the 41-tool catalog, and the prompt/resource counts; `docs/SPECIFICATION.md`, `RELEASE_v0.1.0.md`, and `docs/npm-publishing.md` carry current-count and historical qualifiers | The trace is section-level; it does not semantically test every sentence |
| 2 | Tests | 1.0 | `npm run check:ci` at `fe87e22`: 274 tests / 51 files; remote CI run `39529344409` is 6/6 green; release commit `3fa2bf9` is 6/6 green in CI run `39495621243` | None for the six-job matrix; Apple Silicon remains uncovered under Phase 5.4 |
| 3 | Package and distribution | 0.5 | v0.2.1 GitHub asset is 591,204 bytes, SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`; release-URL install verified; npm is explicitly blocked and documented | npm publication is blocked until `2026-10-21 22:42 UTC`; `npm view` returns E404 |
| 4 | Footprint | 1.0 | v0.2.1 default install: 16,493,075 bytes, 1.93 s; current `0.3.0` local gate: 16,750,800-16,751,385 bytes, 1,842-1,874 ms; canonical CI run `39529344409`: 645,846 bytes packed / 2,588,454 unpacked, 1,409 ms; `check:package`: 268 files, 631.1 kB packed, 2.5 MB unpacked, 3 runtime dependencies | None for the documented gate |
| 5 | Benchmark | 1.0 | 240 deterministic cases (192 train / 48 holdout); raw JSON at `bench/results/minilm.json` and `hash.json`; `npm run bench:verify` passes | None for the synthetic benchmark gate |
| 6 | Retrieval | 0.5 | Synthetic holdout meets Hit@1/5, MRR, and token targets. LongMemEval external: +10.4pp / +11.0pp Hit@5. LoCoMo external: +4.4pp / +2.3pp | LoCoMo misses the `+5pp` target; Hit@1 is 0.1pp below the MCP adapter; frozen-holdout rerun (2.3) is Partial |
| 7 | Integrity | 1.0 | Crash test: 10/10 runs, 10,718 acknowledged writes, 10,727 committed rows, 0 lost, 0 duplicates, integrity `ok`; replay/diff gates pass | Process-kill only; not power-loss; `synchronous=NORMAL` |
| 8 | Moat | 1.0 | Replay CLI/UI and same-repository Memory CI comment lifecycle verified; PR #12 comment `6304608575` was updated in place on rerun | Fork PR comment path is job-summary-only; not live-tested |
| 9 | Launch evidence | 0.5 | `MIGRATION.md`, `SECURITY.md`, and this scorecard exist; `CHANGELOG.md` covers 0.1.0-0.2.1 plus Unreleased; README launch table and blog post exist; GitHub release `v0.2.1` is live | npm publication is blocked, so the npm install command in the launch post is not live; the post uses the GitHub asset fallback |

## Provisional total

**7.5 / 9 gate points = 8.3 / 10.** The `9.2 / 10` target is **not met**.

The largest gaps are:

1. npm publication is still blocked.
2. LoCoMo misses the external `+5pp Hit@5` target.
3. Launch evidence still depends on npm publication.

Remote CI evidence is green at `fe87e22` in run `39529344409`. The Phase 6/0 documentation commit passed the full local `check:ci` and is re-verified by remote CI after push. Phase 5 operational gaps remain (Apple Silicon coverage and the pending legacy-cleanup approval), but they do not change the current gate scores.

If the three remaining 0.5-point gates close without regressing the passing gates, the provisional total would reach `9.0 / 9 = 10.0 / 10`. That is a forecast, not a result.

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
- It does not claim npm availability. The registry remains blocked.
