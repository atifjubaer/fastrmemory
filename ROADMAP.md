# FastrMemory Roadmap

This roadmap is evidence-gated. A phase is complete only when its gate passes on a committed artifact (test, raw JSON, CI run, or installable package), not when code exists.

- **Roadmap date:** 2026-10-21
- **Code HEAD:** `feat/0.3.0` branch (release tag `v0.2.1` = `3fa2bf9`)
- **Source:** the full 2026-10-20 mission prompt, not the earlier summary.
- **Status legend:** **Done**, **Partial**, **Missing**, **Blocked**.
- **Rule:** do not call the project complete while any gate below is Partial, Missing, or Blocked.

## Current snapshot

| Item | Current state | Evidence |
|---|---|---|
| Local test gate | **Done:** 262 tests across 48 files | `npm run check:ci` on 2026-10-21 |
| CI matrix | **Done:** 6/6 green at `3fa2bf9` | run `39495621243` |
| npm distribution | **Blocked:** `npm whoami` E401, `npm view` E404; suspension lifts 2026-10-21 22:42 UTC | `docs/npm-publishing.md` |
| Package artifact | **GitHub asset attached:** v0.2.1 asset is 591,204 bytes, SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`; v0.2.0 asset is 571,279 bytes | `npm pack` vs downloaded release asset |
| Benchmark | **Done for the synthetic gate:** 240 cases, 192/48 split; holdout 95.8% Hit@1, 100% Hit@5, 209 tokens | `bench/results/minilm.json` |
| Replay and snapshots | **Done:** exact at three timestamps; JSONL round-trip hash stable | `bench/results/replay-evidence.json` |
| Default install | **Pass (v0.2.1):** 16,493,075 bytes, 1.93 s, three runtime dependencies | `CLAIMS.md` A8 |
| Crash test | **Done:** 10/10 runs, 10,718 acknowledged writes, 0 lost, 0 duplicates, integrity `ok` | `bench/results/crash-test.json`; `CLAIMS.md` D4 |

## 0.3.0 execution plan

**Goal:** convert the remaining Partial/Missing gates into evidence-backed Done without changing the v0.2.1 artifact.

**Release isolation:**

- `v0.2.1` stays frozen at tag `v0.2.1` and code commit `3fa2bf9`.
- Publish `0.2.1` from that tag, never from the `feat/0.3.0` branch.
- Every 0.3.0 task lands on `feat/0.3.0` with its own tests and evidence row.

**Execution order:** Phase 3 → Phase 4 → Phase 2 → Phase 6 → Phase 5 → Phase 0 → Phase 1 release gate.

### Phase 3 — Integration parity (P1, 2–3 days)

| ID | Task | Acceptance gate | Status |
|---|---|---|---|
| 3.1 | Conflict-aware recall plus CLI conflict list/resolve | Recall marks both sides of an open conflict; `fastr conflict list` and `fastr conflict resolve` work; tests and docs updated | **Done** |
| 3.2 | Local memory import | `fastr import --from <format>` imports Markdown rules and JSONL with dry-run, dedupe, and round-trip test | **Done** |
| 3.3 | OpenCode hook and MCP parity | Installer writes a tested OpenCode config/plugin path and a smoke check starts the MCP server | **Done** |
| 3.4 | Gemini CLI hook and MCP parity | Installer writes a tested Gemini config path with idempotent merge | **Done** |
| 3.5 | Copilot CLI hook and MCP parity | Installer writes a tested Copilot config/instruction path with idempotent merge | **Done** |
| 3.6 | Memory envelope resource | `fastr://memory/{id}/envelope` returns metadata, provenance, links, and conflict state | **Done** |
| 3.7 | Memory branch and merge | `fastr branch create/list` and `fastr merge` produce a conflict report and preserve history | **Done** |
| 3.8 | Confidence tiers and 3-bad dormancy | Per-ID confidence tiers and automatic dormancy after three bad outcomes have tests | **Done** |
| 3.9 | Memory hygiene gate | Orphan, duplicate, and stale checks run in `check:ci` with raw counts | **Done** |

**Phase 3 gate:** hook-parity table with one tested path per client; import round-trip; conflict-aware recall; branch merge conflict report preserves history; confidence tiers and 3-consecutive-bad dormancy; hygiene raw counts asserted in `check:ci`; core profile smoke still 12/12. Current result: **Done**.

### Phase 4 — Memory CI and UI (P1, 1.5–2 days)

| ID | Task | Acceptance gate | Status |
|---|---|---|---|
| 4.1 | Dashboard timeline and diff workspace | UI route renders replay snapshots and a diff view; component test covers empty and populated states | Missing |
| 4.2 | Live PR Memory CI comment | A test PR receives one comment; re-run updates the same comment | Partial |
| 4.3 | `docs/MEMORY_CI.md` | Workflow inputs, outputs, permissions, and fork behavior documented with a sample comment | Missing |

### Phase 2 — Public benchmarks (P2, 1.5–2 days)

| ID | Task | Acceptance gate | Status |
|---|---|---|---|
| 2.1 | Public benchmark harnesses | LongMemEval, LoCoMo, and a real-repository runner produce raw JSON with pinned dataset revisions | Missing |
| 2.2 | Pinned external baseline | One external memory engine runs from a pinned version; raw output and caveats recorded | Missing |
| 2.3 | Frozen-holdout rerun | Rerun is reproducibility-only; no tuning on the 48 holdout cases; claims updated | Partial |

### Phase 6 — Evidence and launch (P1/P2, 1–1.5 days)

| ID | Task | Acceptance gate | Status |
|---|---|---|---|
| 6.1 | `MIGRATION.md` | Upgrade paths from 0.1.x and 0.2.x with rollback steps | Missing |
| 6.2 | `SECURITY.md` | Threat model, secret handling, local data boundaries, and reporting path | Missing |
| 6.3 | `SCORECARD.md` | Every completion gate scored from evidence, including gaps | Missing |
| 6.4 | README and launch rewrite | Every public number traces to `CLAIMS.md`; no stale counts | Partial |
| 6.5 | Specification and release-note alignment | `docs/SPECIFICATION.md` and release notes match current counts and profiles | Partial |

### Phase 5 — Hygiene and CI (P2, 0.5–1 day)

| ID | Task | Acceptance gate | Status |
|---|---|---|---|
| 5.1 | Query-plan evidence | Top-10 query plans recorded with `EXPLAIN QUERY PLAN` | Partial |
| 5.2 | Backup command and gate | `fastr backup` writes a restorable snapshot with provenance | Missing |
| 5.3 | Latency and install-size CI gates | CI fails above the documented install-size and recall-latency ceilings | Partial |
| 5.4 | Apple Silicon CI | Matrix adds an Apple Silicon runner and passes | Missing |
| 5.5 | Legacy row cleanup | 60 pre-existing rows removed with explicit approval and before/after counts | Partial |

### Phase 0 and release gate

| ID | Task | Acceptance gate | Status |
|---|---|---|---|
| 0.1 | Finish CLAIMS coverage | Every README and launch claim has a row with command, output, date, commit, caveat | Partial |
| 0.2 | Remove stale specification text | No stale counts in `docs/SPECIFICATION.md` or `RELEASE_v0.1.0.md` | Partial |
| 1.1 | Publish 0.3.0 | CI 6/6 green, package gate green, npm publish, clean `npx` install | Not started |

**Estimated remaining effort:** 7–12 focused days. Phase 3 is the next executable phase; the npm publish gate is time-blocked independently.

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
| Per-ID feedback and dormancy | **Done** | `fastr_feedback` / `fastr feedback` update one memory, report `high`, `medium`, `low`, `dormant`, or `superseded`, and dormancy after three consecutive bad outcomes; audit rows are stored in `memory_feedback`; covered by `tests/confidence.test.ts`. |
| Conflict detection and structured resolve | **Done** | Conflict-aware recall plus `fastr conflict list` / `fastr conflict resolve`; covered by `tests/ner-and-conflicts.test.ts`. |
| Cross-tool import | **Done** | `fastr import --from <format>` for JSONL, Markdown, AGENTS.md, Cursor rules, and Claude rules, with dry-run and dedupe; covered by `tests/local-import.test.ts`. |
| OpenCode, Gemini CLI, and Copilot CLI hooks | **Done** | OpenCode V2 MCP config/plugin, Gemini CLI MCP/hooks, and Copilot CLI MCP/hooks are installed and tested. |
| 12-tool core MCP profile | **Done** | `fastrmemory mcp --profile core` or `FASTR_MCP_PROFILE=core`; `tests/mcp-core-profile.test.ts` and `scripts/smoke-mcp-profile.mjs` assert 12 core tools and the 41-tool full default. |
| Memory envelope resource | **Done** | `fastr://memory/{id}/envelope` returns metadata, cryptographic provenance, file/graph links, and open/resolved/ignored conflict state; covered by `tests/mcp-server-v2.test.ts`. |
| Branch / merge | **Done** | `fastr branch create/list` and `fastr merge` with conflict reports, target-only preservation, history-preserving supersession, and a merge audit log; covered by `tests/branch-merge.test.ts`. |
| Memory hygiene | **Done** | `fastr hygiene` reports orphaned file links/conflicts/feedback, duplicate active rows, and stale unpinned rows; `npm run check:hygiene` asserts raw fixture counts inside `check:ci`; covered by `tests/hygiene.test.ts`. |

**Gate:** hook-parity table with a tested path per client; import round-trip test; branch merge conflict report preserves history; confidence tiers and 3-bad dormancy; hygiene counts; core profile starts and passes the MCP smoke test. Current result: **Done**.

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
4. **P1:** add OpenCode/Gemini/Copilot hook parity, local import, and conflict-aware recall. **Done.**
5. **P1:** add the dashboard timeline/diff view and observe a live Memory CI PR comment. **Next.**
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
