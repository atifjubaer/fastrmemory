# Scorecard

**Evidence date:** 2026-10-21
**Code evidence:** `36b112b` (last full `npm run check:ci`); roadmap status at `380bba0`
**Documentation evidence:** `MIGRATION.md`, `SECURITY.md`, and this scorecard in the current docs commit
**Target:** `9.2 / 10`

This is a release-readiness score, not a marketing score. Each gate is scored `1.0` (pass), `0.5` (partial), or `0.0` (fail / not measured). The nine scored categories are the eight non-score completion gates in `ROADMAP.md` plus launch evidence; the roadmap's `Score` row is this total, not a separate category. The gates have equal weight. A partial gate is never rounded up. The numeric total is provisional because the target is defined in `ROADMAP.md`, not in an external rubric.

## Gate scores

| # | Gate | Score | Evidence | Remaining gap |
|---:|---|---:|---|---|
| 1 | Truth | 0.5 | README launch status table, release-vs-branch banner, and 0.2.1 post added; `CLAIMS.md` covers E1–E15 and A1–A10; `npm run check:docs` passes | Full claim coverage is not complete; some reference sections remain untraced |
| 2 | Tests | 1.0 | `npm run check:ci` at `36b112b`: 274 tests / 51 files; `test:isolation` passes; release commit `3fa2bf9` is 6/6 green in CI run `39495621243` | Current docs-only HEAD has no remote CI run yet |
| 3 | Package and distribution | 0.5 | v0.2.1 GitHub asset is 591,204 bytes, SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`; release-URL install verified; npm is explicitly blocked and documented | npm publication is blocked until `2026-10-21 22:42 UTC`; `npm view` returns E404 |
| 4 | Footprint | 1.0 | v0.2.1 default install: 16,493,075 bytes, 1.93 s; current `0.3.0` install gate: 16,750,752 bytes, 1,885 ms; `check:package`: 268 files, 630.9 kB packed, 2.5 MB unpacked, 3 runtime dependencies | None for the documented gate |
| 5 | Benchmark | 1.0 | 240 deterministic cases (192 train / 48 holdout); raw JSON at `bench/results/minilm.json` and `hash.json`; `npm run bench:verify` passes | None for the synthetic benchmark gate |
| 6 | Retrieval | 0.5 | Synthetic holdout meets Hit@1/5, MRR, and token targets. LongMemEval external: +10.4pp / +11.0pp Hit@5. LoCoMo external: +4.4pp / +2.3pp | LoCoMo misses the `+5pp` target; Hit@1 is 0.1pp below the MCP adapter; frozen-holdout rerun (2.3) is Partial |
| 7 | Integrity | 1.0 | Crash test: 10/10 runs, 10,718 acknowledged writes, 10,727 committed rows, 0 lost, 0 duplicates, integrity `ok`; replay/diff gates pass | Process-kill only; not power-loss; `synchronous=NORMAL` |
| 8 | Moat | 1.0 | Replay CLI/UI and same-repository Memory CI comment lifecycle verified; PR #12 comment `6304608575` was updated in place on rerun | Fork PR comment path is job-summary-only; not live-tested |
| 9 | Launch evidence | 0.5 | `MIGRATION.md`, `SECURITY.md`, and this scorecard exist; `CHANGELOG.md` covers 0.1.0–0.2.1 plus Unreleased; blog post exists | README launch rewrite and one-command-per-number launch post are incomplete |

## Provisional total

**7.0 / 9 gate points = 7.8 / 10.** The `9.2 / 10` target is **not met**.

The largest gaps are:

1. npm publication is still blocked.
2. LoCoMo misses the external `+5pp Hit@5` target.
3. The README launch rewrite is incomplete.
4. The full claim trace is incomplete.
5. Current-HEAD remote CI evidence is pending.

If the four score-bearing gaps (1–4) close without regressing the passing gates, the provisional total would reach `9.0 / 9 = 10.0 / 10`. That is a forecast, not a result. Gap 5 is an evidence gap; it does not add points because the release-commit test gate already passes.

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
