# FastrMemory Roadmap

This roadmap is evidence-gated. A phase is complete only when its gate passes on a committed artifact (test, raw JSON, CI run, or installable package), not when code exists.

- **Roadmap date:** 2026-10-21
- **Code HEAD:** `f5d9c06`
- **Source:** the full 2026-10-20 mission prompt, not the earlier summary.
- **Status legend:** **Done**, **Partial**, **Missing**, **Blocked**.
- **Rule:** do not call the project complete while any gate below is Partial, Missing, or Blocked.

## Current snapshot

| Item | Current state | Evidence |
|---|---|---|
| Local test gate | **Done:** 234 tests across 42 files | `npm run check:ci` on 2026-10-21 |
| CI matrix | **Partial:** 6/6 green only at `de4fde3`; commits after it have not run in CI | run `39467306362` |
| npm distribution | **Blocked:** `npm whoami` E401, `npm view` E404; suspension lifts 2026-10-21 22:42 UTC | `docs/npm-publishing.md` |
| Package artifact | **Partial:** v0.2.0 GitHub asset is 571,279 bytes; current HEAD packs to 588,767 bytes | release asset vs `npm pack` |
| Benchmark | **Done for the synthetic gate:** 240 cases, 192/48 split; holdout 95.8% Hit@1, 100% Hit@5, 209 tokens | `bench/results/minilm.json` |
| Replay and snapshots | **Done:** exact at three timestamps; JSONL round-trip hash stable | `bench/results/replay-evidence.json` |
| Default install | **Likely pass, needs current measurement:** release clean install was 16.4 MB with three runtime dependencies | `CLAIMS.md` A8 |
| Crash test | **Missing:** no 10k random-kill report | `CLAIMS.md` D4 |

## Phase 0 — Truth reset

| Item | Status | Evidence / remaining work |
|---|---|---|
| Remove stale benchmark claims | **Partial** | `docs/benchmark-report.md` is current; `README.md` remains the frozen release snapshot and still shows 226 tests / 38 suites / 39 tools. It can be updated only when the release artifact is repacked. |
| Correct competitor and dependency claims | **Partial** | `CLAIMS.md` records removed claims; README still contains release-era wording. |
| `CLAIMS.md` with command, output, date, commit, caveat | **Done** | `CLAIMS.md` |
| Baseline audit | **Done** | `docs/audit/2026-10-20-baseline.md` |
| Align specification, release notes, npm docs | **Partial** | `docs/SPECIFICATION.md` and `RELEASE_v0.1.0.md` still need a final pass against current counts. |
| Replace inflated time estimates with evidence gates | **Done** | This roadmap |

**Gate:** every public claim maps to `CLAIMS.md`; no stale count remains in a shipped README. Current result: **Partial** because README is still release-frozen.

## Phase 1 — Credibility and distribution

| Item | Status | Evidence / remaining work |
|---|---|---|
| Hermetic tests and `FASTR_HOME` isolation | **Done** | `tests/isolation.test.ts`; `tests/setup.ts` |
| Clean the 60 legacy test rows | **Partial** | `scripts/clean-test-junk.mjs` exists; `--apply --yes` has not been run and needs explicit approval. |
| Package surface, build split, tarball gate | **Done** | `scripts/check-package.mjs`; 574.9 kB reported packed at `check:ci` |
| Publish v0.2.0 to npm | **Blocked** | npm account suspension; resume protocol documented |
| Publish a release that matches current HEAD | **Missing** | Current HEAD is 5 commits past `origin/main`; current tarball differs from the v0.2.0 GitHub asset. |
| CI matrix for the current commit | **Partial** | Last full matrix is 6/6 at `de4fde3`; `a91ad6d`, `02a6bf0`, `6c27f32`, and `f5d9c06` are unpushed and unrun. |
| Apple Silicon macOS coverage | **Missing** | Matrix uses `macos-15-intel` only. |

**Gate:** 6/6 OS × Node green on the release commit; npm published or explicitly blocked; `npx` works; tarball under 5 MB. Current result: **Partial**.

## Phase 2 — Retrieval superiority

| Item | Status | Evidence / remaining work |
|---|---|---|
| FTS5 `bm25` weights, configurable RRF, stream weights, conditional trap boost, graph seed off | **Done** | `src/search/hybrid-rrf.ts`; `tests/search-recall.test.ts` |
| Hash vectors off by default; MiniLM opt-in | **Done** | `src/search/hybrid-rrf.ts`, `src/search/embeddings.ts` |
| 240+ case corpus with fixed 20% holdout | **Done** | `bench/corpus.json`; 192 train / 48 holdout |
| Metrics, CIs, raw JSON, generated report | **Done** | `bench/results/minilm.json`, `bench/results/hash.json`, `BENCHMARKS.md` |
| Public LongMemEval / LoCoMo / real-repository harnesses | **Missing** | No runner or raw output in the repository. |
| Real pinned external baseline | **Missing** | Current baselines are internal and the static dump is simulated; no external CLI measurement. |
| Retrieval targets | **Partial** | Synthetic holdout meets Hit@1/5, MRR, and token targets; the external comparison gate is unmeasured. |

**Gate:** 240+ cases, raw JSON, held-out results, no simulated baseline labeled as a real project, and an external pinned baseline. Current result: **Partial** because the public and external comparisons are missing.

## Phase 3 — Integration parity and import paths

| Item | Status | Evidence / remaining work |
|---|---|---|
| Non-lossy consolidation | **Done** | `src/db/consolidate.ts`; `fastr consolidate`; `tests/consolidate.test.ts` |
| Per-ID feedback and dormancy | **Partial** | Per-ID feedback exists; explicit confidence tiers and 3-bad dormancy are not implemented. |
| Conflict detection and structured resolve | **Partial** | DB and MCP tools exist; CLI/UI resolve path and conflict-aware recall are missing. |
| Cross-tool import | **Missing** | No `fastr import` for local memory formats. |
| OpenCode, Gemini CLI, and Copilot CLI hooks | **Missing** | Installers cover Claude Code and Cursor only. |
| 12-tool core MCP profile | **Missing** | Server always exposes all 41 tools. |
| Memory envelope resource | **Missing** | Four resources exist; envelope resource is not implemented. |
| Branch / merge | **Missing** | Snapshots, replay, and diff exist; branch and merge do not. |
| Memory hygiene | **Partial** | `fastr diagnose` / `fastr heal` exist; orphan/duplicate/stale coverage needs a dedicated gate. |

**Gate:** hook-parity table with a tested path per client; import round-trip test; core profile starts and passes the MCP smoke test. Current result: **Partial**.

## Phase 4 — Memory Replay and Memory CI

| Item | Status | Evidence / remaining work |
|---|---|---|
| Replay at an ISO timestamp | **Done** | `fastr replay`; `tests/replay.test.ts` |
| Diff of two states | **Done** | `fastr diff`; replay evidence `tokenDelta=+14` |
| Hashed JSONL export/import | **Done** | `fastr snapshot export/import`; round-trip hash `a3119d...` |
| MCP replay/diff tools | **Done** | `fastr_replay`, `fastr_diff`; 41-tool catalog |
| UI timeline slider and diff view | **Missing** | Dashboard has no timeline/diff workspace. |
| Memory CI workflow | **Partial** | `.github/workflows/fastr-memory-ci.yml` exists; no live PR comment has been observed. |
| `docs/MEMORY_CI.md` | **Missing** | Not present. |
| Exact replay/CI tests | **Done** | `npm run verify:replay`; `tests/memory-ci.test.ts` |

**Gate:** replay exact at three timestamps; export/import round-trips; a test PR receives a memory diff comment. Current result: **Partial**.

## Phase 5 — Footprint, speed, and crash safety

| Item | Status | Evidence / remaining work |
|---|---|---|
| Optional local model; three runtime dependencies | **Done** | `package.json`; `scripts/check-package.mjs` |
| SQLite pragmas and query-plan review | **Partial** | Pragmas exist; top-10 query-plan evidence is not documented as a gate. |
| Clean install under 20 MB / 10 s | **Partial** | Release audit measured 16.4 MB; current HEAD needs a fresh clean-install measurement. |
| 10k crash test, 10/10 runs, 0 lost / 0 duplicates | **Missing** | `CLAIMS.md` D4 is **Not measured**. |
| Export/import/backup with provenance | **Partial** | JSONL export/import exists; a dedicated backup command and gate are missing. |
| CI size and latency gates | **Partial** | Package size gate exists; latency and install-size gates are not enforced. |

**Gate:** clean install under 20 MB and 10 s; crash report committed; export/import round-trip; recall p95 under 50 ms at 10k. Current result: **Partial**.

## Phase 6 — Evidence and launch

| Item | Status | Evidence / remaining work |
|---|---|---|
| README rewritten around measured claims | **Missing** | README is frozen at the v0.2.0 release snapshot. |
| `BENCHMARKS.md` and `CLAIMS.md` | **Done** | Both present and checked. |
| `MIGRATION.md` | **Missing** | Not present. |
| `SECURITY.md` | **Missing** | Not present. |
| `SCORECARD.md` | **Missing** | Not present. |
| `CHANGELOG.md` | **Missing** | Not present. |
| Launch post with one command per number | **Partial** | Blog post exists; README/npm launch path is not complete. |

**Gate:** 100% of README claims traced; docs checks green; every launch number reproducible. Current result: **Partial**.

## Completion gates

| Gate | Pass condition | Current |
|---|---|---|
| Truth | No false/stale claims; `CLAIMS.md` covers every public claim | **Partial** — README frozen with stale counts |
| Tests | 6/6 OS × Node green on the release commit; isolation green | **Partial** — local 234 green; current commit unrun |
| Package | npm published or explicitly blocked and documented; `npx` works | **Blocked** |
| Footprint | Default install under 20 MB; install under 10 s | **Partial** — needs current measurement |
| Benchmark | 240+ cases; held-out; raw JSON committed | **Done** |
| Retrieval | Hit@1 ≥90%; Hit@5 ≥98%; external baseline +5pp Hit@5; tokens ≤0.5× | **Partial** — synthetic targets pass; external gate missing |
| Integrity | 0 lost/0 duplicates in 10k crash test; replay exact | **Partial** — replay done; crash test missing |
| Moat | Replay + Memory CI demo works end to end | **Partial** — core done; UI and live PR missing |
| Score | ≥9.2 / 10 | **Not computed** |

## Immediate release path (npm)

1. Choose the release identity: recommended `0.2.1` from current HEAD, because current HEAD includes the corrected MCP server name and the 41-tool surface.
2. Update version, README, `CLAIMS.md`, and release notes together; rebuild and pack the release tarball.
3. Run `npm run check:ci`, then verify the exact tarball and SHA-256.
4. After the npm suspension lifts, run `npm login`, `npm whoami`, and `npm publish --access public`.
5. Verify `npm view` and `npx` from a clean temp directory; then update the claims ledger from Blocked to Supported.

Do not publish current HEAD as `0.2.0`: the current tarball is 588,767 bytes, while the existing GitHub v0.2.0 asset is 571,279 bytes, and the README inside still describes an unpublished npm package.

## Work order

1. **P0:** prepare and verify the npm release candidate.
2. **P0:** run the 10k crash test and commit the report.
3. **P1:** add the 12-tool core profile and its smoke test.
4. **P1:** add OpenCode/Gemini/Copilot hook parity, local import, and conflict-aware recall.
5. **P1:** add the dashboard timeline/diff view and observe a live Memory CI PR comment.
6. **P2:** add public benchmark harnesses and a pinned external baseline.
7. **P2:** finish README, migration, security, scorecard, changelog, and launch evidence.

Estimated remaining effort: **7–12 focused days**, not one session. The npm release candidate can be ready before the suspension lifts; the full prompt cannot be completed and evidenced before 2026-10-22 without skipping gates.

## Reporting contract

After each work unit, report:

1. Summary: three bullets.
2. Files changed: exact paths.
3. Commands run: exact.
4. Raw metrics: before/after and units.
5. Failures: what failed and why.
6. Claim audit: supported, changed, removed.
7. Next step: one action.

If a gate fails, stop and report it. Do not hide a failure behind a completion claim.
