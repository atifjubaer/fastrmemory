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
| Local test gate | **Done:** 235 tests across 43 files | `npm run check:ci` on 2026-10-21 |
| CI matrix | **Done:** 6/6 green at `3fa2bf9` | run `39495621243` |
| npm distribution | **Blocked:** `npm whoami` E401, `npm view` E404; suspension lifts 2026-10-21 22:42 UTC | `docs/npm-publishing.md` |
| Package artifact | **GitHub asset attached:** v0.2.1 asset is 591,204 bytes, SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`; v0.2.0 asset is 571,279 bytes | `npm pack` vs downloaded release asset |
| Benchmark | **Done for the synthetic gate:** 240 cases, 192/48 split; holdout 95.8% Hit@1, 100% Hit@5, 209 tokens | `bench/results/minilm.json` |
| Replay and snapshots | **Done:** exact at three timestamps; JSONL round-trip hash stable | `bench/results/replay-evidence.json` |
| Default install | **Pass (v0.2.1):** 16,493,075 bytes, 1.93 s, three runtime dependencies | `CLAIMS.md` A8 |
| Crash test | **Done:** 10/10 runs, 10,718 acknowledged writes, 0 lost, 0 duplicates, integrity `ok` | `bench/results/crash-test.json`; `CLAIMS.md` D4 |

## Phase 0 — Truth reset

| Item | Status | Evidence / remaining work |
|---|---|---|
| Remove stale benchmark claims | **Done** | `README.md` now uses the `562f461` run and states 235 tests / 43 files / 41 tools; `docs/benchmark-report.md` and `BENCHMARKS.md` match. |
| Correct competitor and dependency claims | **Partial** | `CLAIMS.md` records removed claims; the full README rewrite and launch copy remain. |
| `CLAIMS.md` with command, output, date, commit, caveat | **Done** | `CLAIMS.md` |
| Baseline audit | **Done** | `docs/audit/2026-10-20-baseline.md` |
| Align specification, release notes, npm docs | **Partial** | `docs/SPECIFICATION.md` and `RELEASE_v0.1.0.md` still need a final pass against current counts. |
| Replace inflated time estimates with evidence gates | **Done** | This roadmap |

**Gate:** every public claim maps to `CLAIMS.md`; no stale count remains in a shipped README. Current result: **Partial** because `CLAIMS.md` coverage is not yet complete across every launch document.

## Phase 1 — Credibility and distribution

| Item | Status | Evidence / remaining work |
|---|---|---|
| Hermetic tests and `FASTR_HOME` isolation | **Done** | `tests/isolation.test.ts`; `tests/setup.ts` |
| Clean the 60 legacy test rows | **Partial** | `scripts/clean-test-junk.mjs` exists; `--apply --yes` has not been run and needs explicit approval. |
| Package surface, build split, tarball gate | **Done** | `scripts/check-package.mjs`; 591,204 bytes / 220 files (577.3 KiB) at `check:ci` |
| Prepare v0.2.1 release candidate | **Done** | Version, README, `CLAIMS.md`, `CHANGELOG.md`, skills metadata; `npm run check:ci`; tarball SHA-256 recorded |
| Publish v0.2.1 to npm | **Blocked** | npm account suspension; resume protocol documented |
| Attach v0.2.1 GitHub Release asset | **Done** | Release `v0.2.1` at `https://github.com/atifjubaer/fastrmemory/releases/tag/v0.2.1`; downloaded asset is 591,204 bytes with matching SHA-256; release-URL install verified. |
| CI matrix for the current commit | **Done** | Run `39495621243`: 6/6 green at `3fa2bf9` (Ubuntu, Windows, Intel macOS; Node 22.x and 24.x). |
| Apple Silicon macOS coverage | **Missing** | Matrix uses `macos-15-intel` only. |

**Gate:** 6/6 OS × Node green on the release commit; npm published or explicitly blocked; `npx` works; tarball under 5 MB. Current result: **Pass for the GitHub path**; npm publication is explicitly blocked.

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
| 12-tool core MCP profile | **Done** | `fastrmemory mcp --profile core` or `FASTR_MCP_PROFILE=core`; `tests/mcp-core-profile.test.ts` and `scripts/smoke-mcp-profile.mjs` assert 12 core tools and the 41-tool full default. |
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
| Clean install under 20 MB / 10 s | **Pass (v0.2.1)** | 16,493,075 bytes, 1.93 s; `CLAIMS.md` A8. |
| 10k crash test, 10/10 runs, 0 lost / 0 duplicates | **Done** | 10,718 acknowledged writes, 10,727 committed rows, 0 missing, 0 duplicate ids/titles, integrity `ok`; `bench/results/crash-test.json`; `CLAIMS.md` D4. |
| Export/import/backup with provenance | **Partial** | JSONL export/import exists; a dedicated backup command and gate are missing. |
| CI size and latency gates | **Partial** | Package size gate exists; latency and install-size gates are not enforced. |

**Gate:** clean install under 20 MB and 10 s; crash report committed; export/import round-trip; recall p95 under 50 ms at 10k. Current result: **Partial**.

## Phase 6 — Evidence and launch

| Item | Status | Evidence / remaining work |
|---|---|---|
| README rewritten around measured claims | **Partial** | Truth reset is done: counts, benchmark table, and registry status now match current evidence. Full launch rewrite remains. |
| `BENCHMARKS.md` and `CLAIMS.md` | **Done** | Both present and checked. |
| `MIGRATION.md` | **Missing** | Not present. |
| `SECURITY.md` | **Missing** | Not present. |
| `SCORECARD.md` | **Missing** | Not present. |
| `CHANGELOG.md` | **Done** | `CHANGELOG.md` covers 0.1.0 through v0.2.1. |
| Launch post with one command per number | **Partial** | Blog post exists; README/npm launch path is not complete. |

**Gate:** 100% of README claims traced; docs checks green; every launch number reproducible. Current result: **Partial**.

## Completion gates

| Gate | Pass condition | Current |
|---|---|---|
| Truth | No false/stale claims; `CLAIMS.md` covers every public claim | **Partial** — README counts are current; full CLAIMS coverage is not |
| Tests | 6/6 OS × Node green on the release commit; isolation green | **Pass** — local 235 green; 6/6 at `3fa2bf9` |
| Package | npm published or explicitly blocked and documented; `npx` works | **Partial** — v0.2.1 GitHub asset attached and release-URL install verified; npm still blocked |
| Footprint | Default install under 20 MB; install under 10 s | **Pass (v0.2.1)** — 16,493,075 bytes, 1.93 s |
| Benchmark | 240+ cases; held-out; raw JSON committed | **Done** |
| Retrieval | Hit@1 ≥90%; Hit@5 ≥98%; external baseline +5pp Hit@5; tokens ≤0.5× | **Partial** — synthetic targets pass; external gate missing |
| Integrity | 0 lost/0 duplicates in 10k crash test; replay exact | **Done (process crash)** — 10/10 runs, 0 lost, 0 duplicates; replay exact; power loss not tested |
| Moat | Replay + Memory CI demo works end to end | **Partial** — core done; UI and live PR missing |
| Score | ≥9.2 / 10 | **Not computed** |

## Immediate release path (npm)

1. **Done:** choose `0.2.1` from current HEAD, because current HEAD includes the corrected MCP server name and the 41-tool surface.
2. **Done locally:** version, README, `CLAIMS.md`, `CHANGELOG.md`, and skills metadata updated; core rebuilt and tarball packed.
3. **Done:** `npm run check:ci` green; tarball is 591,204 bytes with SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`.
4. **Done:** pushed `3fa2bf9`; CI run `39495621243` is 6/6 green; GitHub release `v0.2.1` and its asset are attached.
5. **Pending:** after the npm suspension lifts, run `npm login`, `npm whoami`, and `npm publish --access public`.
6. **Pending:** verify `npm view` and `npx` from a clean temp directory; update the claims ledger from Blocked to Supported.

Do not publish current HEAD as `0.2.0`: current HEAD is now `0.2.1`, its tarball is 591,204 bytes, and the existing GitHub v0.2.0 asset is 571,279 bytes.

## Work order

1. **P0:** prepare and verify the npm release candidate. **Done** for `0.2.1`; publish remains blocked.
2. **P0:** run the 10k crash test and commit the report. **Done.**
3. **P1:** add the 12-tool core profile and its smoke test. **Done.**
4. **P1:** add OpenCode/Gemini/Copilot hook parity, local import, and conflict-aware recall. **Next.**
5. **P1:** add the dashboard timeline/diff view and observe a live Memory CI PR comment.
6. **P2:** add public benchmark harnesses and a pinned external baseline.
7. **P2:** finish README, migration, security, scorecard, changelog, and launch evidence.

Estimated remaining effort: **7–12 focused days**, not one session. The `0.2.1` GitHub release is attached and verified; npm publication remains blocked. The full prompt cannot be completed and evidenced before 2026-10-22 without skipping gates.

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
