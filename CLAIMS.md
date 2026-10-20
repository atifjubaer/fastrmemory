# Claims Ledger

Every public claim must have a row here. A claim is **Supported** only when the evidence command reproduces the raw output on the recorded revision. **Qualified** means it is true only with the stated caveat. **Blocked** or **Not measured** claims must not be published as facts.

- **Ledger date:** 2026-10-21
- **Benchmark commit:** `562f461` (raw JSON in `bench/results/minilm.json` and `bench/results/hash.json`)
- **Phase 3/4 evidence commit:** `a91ad6d` (replay, JSONL, consolidation, Memory CI)
- **Packaging/CI inspection:** `3fa2bf9` (v0.2.1 release commit; package and CI rows in this ledger)
- **Hardware:** AMD Ryzen 7 7700, 15.1 GB RAM, Windows 10 Pro 19045, Node v24.15.0
- **Scope:** FastrMemory only. No external memory engine is measured in this repository.
- **Row provenance:** benchmark rows use commit `562f461`; Phase 3/4 rows use `a91ad6d`; package and CI rows use `3fa2bf9`; `npm view` rows were run on 2026-10-21. The README table is the current `562f461` run; the earlier v0.2.0 snapshot at `1495622` is preserved as `bench/results/minilm-1495622.json` for comparison.

## A. Distribution and package

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| A1 | Package is `@atifjubaer/fastrmemory` v0.2.1 | `package.json` | Supported | `node -p "require('./package.json').name + ' ' + require('./package.json').version"` | `@atifjubaer/fastrmemory 0.2.1` | v0.2.1 is attached as a GitHub release; npm publication remains blocked until the suspension lifts |
| A2 | Package is published on npm | README | **Blocked** | `npm view @atifjubaer/fastrmemory version` | `E404 Not Found` | Never advertise npm install until this passes |
| A3 | GitHub source metadata resolves | README | Supported | `npm view github:atifjubaer/fastrmemory version` | `0.2.1` | GitHub default branch was at `3fa2bf9` when inspected on 2026-10-21; the npm registry package is still E404 |
| A4 | Tarball size | README (not claimed) | Supported | `npm pack --ignore-scripts`; `scripts/check-package.mjs` | 591,204 bytes; 2,334,126 bytes unpacked; 220 files; SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B` | Local pack on 2026-10-21 for v0.2.1 after the offline-vectorizer hot-path fix; `check:package` reports 577.3 kB using 1024-byte units, which equals 591,204 bytes, so the gate and the actual tarball agree; registry tarballs can differ because archive timestamps and the publish-time pack are not byte-stable; excludes the optional MiniLM model; verify the registry hash after publish |
| A5 | Apache-2.0 license | README, `package.json` | Supported | `node -p "require('./package.json').license"` | `Apache-2.0` | `LICENSE` present |
| A6 | Node >= 22.16.0 | `package.json` | Supported | `node -p "require('./package.json').engines.node"` | `>=22.16.0` | Local tests run on Node 24.15.0 |
| A7 | Three required runtime dependencies | README | Supported | `npm ls --depth=0 --omit=dev` | `@modelcontextprotocol/server`, `commander`, `zod` | MiniLM is an optional peer plus a dev dependency |
| A8 | Clean install stays under 20 MB | README (not claimed) | Supported | `npm install <0.2.1 tarball> --ignore-scripts` in an empty temp project, then measure `node_modules` | 1.93 s install; 16,493,075 bytes; `fastr --version` and `fastrmemory --version` both `0.2.1`; `fastr mcp --help` lists `--profile` | Local Windows run on 2026-10-21; warm npm cache affects install time; optional MiniLM model is not installed |
| A9 | v0.2.0 GitHub Release asset is attached and installable | README | Supported | `gh release download v0.2.0 --pattern atifjubaer-fastrmemory-0.2.0.tgz`; `npm install <release asset URL> --ignore-scripts` | 571,279 bytes; SHA-256 `12B7D49546D6B904A2296724490E4D6EECE313514DA6C4BFDA6950137F309ED7`; release-URL install 3.71 s; CLI `0.2.0` | Asset URL `https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz`; local Windows run on 2026-10-20; line-ending hash sensitivity applies; the asset predates the Phase 2 module-scope fix |
| A10 | v0.2.1 GitHub Release asset is attached | README fallback path | Supported | `gh release view v0.2.1`; `gh release download v0.2.1`; `npm install https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz --ignore-scripts` | Asset `atifjubaer-fastrmemory-0.2.1.tgz`, 591,204 bytes; downloaded SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`; release-URL install 8.35 s, 16,493,121 bytes, `fastr --version` = `0.2.1` | Release created 2026-10-21 from `3fa2bf9`; CI 6/6 green on that commit; asset re-uploaded after the README fallback correction; npm remains E401/E404 until the suspension lifts, so the GitHub asset is the current install path |

## B. Architecture and footprint

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| B1 | Zero daemon, no open ports on the default CLI/MCP path | README | Supported | Code inspection: `src/mcp/stdio.ts`, `bin/fastr.ts` | In-process stdio; no listen call | The optional `daemon start` command does open a local HTTP port |
| B2 | Local embeddings are optional | README | Supported | `src/search/embeddings.ts` | No model load unless opted in | Default hash vectors are lexical, not semantic |
| B3 | Bi-temporal retention; supersession keeps history | README | Supported | `npm test -- tests/repository.test.ts tests/search.test.ts` | Supersession tests pass | `forget` is a tombstone, not a hard delete |
| B4 | Two-zone Git-diffable Markdown mirrors | README | Supported | `npm test -- tests/mirror.test.ts` | Mirror tests pass | Format is covered by snapshots, not byte-for-byte goldens |
| B5 | Engine-level recall p50 and p95 | README | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings minilm --out bench/results/minilm.json` | Train 3.30 ms p50 / 5.11 ms p95; holdout 3.41 ms p50 / 5.14 ms p95 | In-process, 240 synthetic cases, excludes Node startup and model load |
| B6 | Offline recall p50 and p95 | README | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings hash --out bench/results/hash.json` | Train 0.95 ms p50 / 1.60 ms p95; holdout 0.97 ms p50 / 2.05 ms p95 | Same caveat; hash vectors are lexical |
| B7 | Runs natively on Windows, macOS, and Linux | README | Supported | `gh run view 39495621243 --json conclusion,jobs` | 6/6 jobs succeeded: Ubuntu, Windows, and Intel macOS on Node 22.x and 24.x | Run on `3fa2bf9`; macOS jobs used `macos-15-intel`; Apple Silicon is not covered by this matrix |

## C. MCP surface

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| C1 | 41 MCP tools in the full profile | README, current HEAD | Supported | `Select-String -Path src/mcp/server.ts -Pattern '^  registerTool[(]' \| Measure-Object` | `41` | Full surface is the default; the opt-in core profile is 12 tools (H8); adds `fastr_replay` and `fastr_diff` |
| C2 | 2 MCP prompts | README | Supported | same, `registerPrompt` | `2` (`pre-edit-check`, `session-wrap-up`) | - |
| C3 | 5 MCP resources | README | Supported | same, `registerResource` | `5` (3 static + 2 templates) | Templates are `fastr://memory/{id}` and `fastr://memory/{id}/envelope` |
| C4 | 10 Agent Skills | README | Supported | `(Get-ChildItem skills -Directory).Count` | `10` | Mirrored to `.cursor/skills/` |
| C5 | Skills reference valid tools | README | Supported | `npm run check:skills` | Passes | - |

## D. Tests and reliability

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| D1 | Historical v0.2.0 count: 226 tests, 38 files | v0.2.0 release notes | Historical | `npm test` | `226 passed`, `38 passed` | Historical v0.2.0 result; current suite is D1b |
| D1b | 256 tests pass across 46 files | Current HEAD | Supported | `npm test` | `256 passed`, `46 passed` | Run on 2026-10-21 after the branch/merge tests; local Windows run; CI is separate |
| D2 | Test suite writes nothing to the real home store | README | Supported | `npm test` then count rows | 60 before, 60 after | The 60 pre-existing rows are documented legacy data |
| D3 | 6/6 CI matrix green | ROADMAP | Supported | `gh run view 39495621243 --json conclusion,jobs` | 6/6 jobs succeeded: Ubuntu, Windows, and Intel macOS on Node 22.x and 24.x | Run on `3fa2bf9`; `fail-fast` disabled; macOS jobs use `macos-15-intel`; Apple Silicon is not covered |
| D4 | Zero data loss in a 10k crash test | README, Roadmap | Supported | `npm run test:crash`; `npm run check:crash` | 10/10 runs; 10,718 acknowledged writes; 10,727 committed rows; 0 missing; 0 duplicate ids; 0 duplicate titles; `PRAGMA integrity_check` = `ok` | Local Windows run on 2026-10-21; kill is `taskkill /F`, not a power-loss test; `synchronous=NORMAL` in WAL mode; report at `bench/results/crash-test.json` |

## E. Benchmark

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| E1 | Corpus has 240 cases and a 20% holdout | README, BENCHMARKS | Supported | `node -e "const j=require('./bench/results/minilm.json');console.log(j.corpus)"` | 240 cases, 192 train / 48 holdout, 120 memories | Deterministic synthetic generator |
| E2 | FastrMemory + MiniLM train Hit@1 | README (release snapshot), BENCHMARKS, report | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings minilm` | 96.4% Hit@1, 99.0% Hit@3, 100% Hit@5, MRR 0.976, nDCG 0.982 | 192 train cases at `562f461`; README shows the frozen `1495622` release run |
| E3 | FastrMemory + MiniLM holdout Hit@1 | README (release snapshot), BENCHMARKS, report | Supported | same | 95.8% Hit@1, 97.9% Hit@3, 100% Hit@5, MRR 0.969, nDCG 0.977 | 48 holdout cases; fixed before tuning; bootstrap 95% CI 89.6-100%, Wilson 95% CI 86.0-98.9% |
| E4 | Packed context text stays within the 250-token budget | README, BENCHMARKS | Supported | same | 208 train / 209 holdout average tokens, 250-token budget | Estimated tokens, not tokenizer-exact; ranked result objects retain full content |
| E5 | BM25-only is the ablation floor | README, BENCHMARKS | Supported | same | 79.7% train / 77.1% holdout Hit@1 | Same corpus and budget |
| E6 | Static dump is a simulated baseline | README, BENCHMARKS | Supported | same | 2.1% train / 0% holdout Hit@1 | Simulation implemented in this repository |
| E7 | Hit@1 >= 90% and Hit@5 >= 98% | Roadmap target | **Supported** | same | Train 96.4/100; holdout 95.8/100 | Holdout n=48; publish the Wilson interval and do not over-read the point estimate |
| E8 | 240+ benchmark cases | Roadmap target | Supported | same | 240 | Met |
| E9 | Real-world benchmark beyond synthetic data | Roadmap target | **Not measured** | - | - | Do not claim SWE-bench/LongMemEval parity |
| E10 | Semantic paraphrase gate >= 75% Hit@1 | Roadmap target | **Supported** | same | Train 85.4% Hit@1 / 95.8% Hit@3; holdout 83.3% Hit@1 / 91.7% Hit@3 | 48 train / 12 holdout paraphrase cases; holdout target fixed before tuning |

## F. Retrieval mechanics

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| F1 | Error traps receive a conditional 2.0x multiplier | README | Supported | `Select-String -Path src/search/hybrid-rrf.ts -Pattern 'trapBoostMode','const trapMultiplier'` | Conditional on trap intent or a linked file | Code inspection; behavior covered by tests |
| F2 | Verified memories receive a 1.25x multiplier | README | Supported | same | `verifiedBoost = retrieval.verifiedBoost ?? 1.25` | Code inspection |
| F3 | Feedback adds +0.2 for good and -0.5 for bad | README | Supported | `Select-String -Path src/db/repository.ts -Pattern 'reward_score \\+ 0.2','reward_score - 0.5'` | Capped at 3.0 and floored at 0.1 | Score is per memory ID |
| F4 | RRF fusion uses k=20 | README | Supported | `Select-String -Path src/search/hybrid-rrf.ts -Pattern 'rrfK'` | Default `20` | Measured ablation; k=60 was the previous default |
| F5 | Semantic vectors use a 3.0 stream weight | README | Supported | same | MiniLM present: 3.0; hash: 1.0 | Only when no explicit weight is supplied |
| F6 | Context budgets are 150/500/1500/4000 tokens | README | Supported | `Select-String -Path src/search/budget.ts -Pattern 'L0_WAKEUP','L1_FILE_RULES','L2_TASK_RECALL','L3_DEEP_AUDIT'` | `150, 500, 1500, 4000` | Benchmark uses 250 |
| F7 | Dashboard exposes 11 route workspaces | README | Supported | count `ui/src/routes/*Page.tsx` | `11` | Counts page components |
| F8 | Conflict detection uses Jaccard 0.35 and 50-word polarity | README | Supported | `Select-String -Path src/learn/conflicts.ts -Pattern 'jaccard < 0.35','slice\\(0, 50\\)'` | Matches | A second path flags Jaccard >=0.65 |
| F9 | Embeddings are 384-dimensional | README | Supported | `Select-String -Path src/search/embeddings.ts -Pattern 'dimensions: number = 384'` | Matches | Hash vectors are lexical |
| F10 | Dashboard uses React 19 | README | Supported | `node -p "require('./ui/package.json').dependencies.react"` | `^19.0.0` | Dependency declaration, not a visual test |

## G. Removed or corrected marketing claims

| ID | Claim | Status | Why |
|---|---|---|---|
| G1 | "world's first" | **Removed** | Unverifiable |
| G2 | "zero-dependency" | **Removed** | Three required runtime dependencies |
| G3 | "100% native" | **Removed** | Replaced with OS support and CI status |
| G4 | "25 agents" | **Removed** | Only Claude Code and Cursor have native installers tested here |
| G5 | "56/56 tests" / "21 tests" | **Removed** | Stale counts |
| G6 | "Enforces 100% test coverage" | **Removed** | No coverage threshold configured |
| G7 | "Sub-millisecond retrieval" | **Qualified** | Hash path p50 0.95-0.97 ms; MiniLM path is 3.30-3.41 ms |
| G8 | `npm install -g @atifjubaer/fastrmemory` | **Removed** | npm E404 |
| G9 | "12 real-world SWE-bench and LongMemEval cases" | **Removed** | Cases are synthetic |
| G10 | Named external-engine comparisons | **Removed** | Unverified and against the naming policy |
| G11 | "Spool fallback in <5ms" | **Removed** | No latency measurement |
| G12 | "5-Minute Pull Request Workflow" | **Removed** | No timing study |

## H. Replay, snapshots, and non-lossy consolidation (Phase 3/4)

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| H1 | Replay reconstructs exact active sets at three timestamps | ROADMAP, docs | Supported | `npm run verify:replay` | `2026-01-01T12:00Z` -> `mem_evidence_a`; `2026-01-02T12:00Z` -> `mem_evidence_b` (history `mem_evidence_a`); `2026-01-03T12:00Z` -> `mem_evidence_b,mem_evidence_c`; stable hashes `9fe31ae1...`, `adccf389...`, `cd9c598c...` | Deterministic in-memory fixture, not a production project replay |
| H2 | Diff reports added, superseded, still-active, changed, conflicts, and token delta | ROADMAP, docs | Supported | `npm run verify:replay`; `fastr diff --from <iso> --to <iso>` | Added `mem_evidence_b`; superseded `mem_evidence_a` with `superseded_by_id=mem_evidence_b`; `tokenDelta=+14` | Same fixture; conflict rows are empty in the fixture |
| H3 | Portable JSONL snapshot round-trips with content hashes | ROADMAP, docs | Supported | `npm run verify:replay`; `fastr snapshot export/import` | 4 hashed records (3 memories, 1 event); exported hash `a3119d7915cad0401df4dda5262d9e535cb4adf17b26d9722d5214651b5f2b14`; re-export hash equal; import skipped 0 | Embeddings are intentionally not exported; re-embed after import if semantic vectors are required |
| H4 | Consolidation is non-lossy | ROADMAP, docs | Supported | `npm run verify:replay`; `fastr consolidate --module payments --dry-run` | Active memories `2 -> 3`; raw events `2 -> 2`; 2 source memory IDs and 2 source event IDs linked; originals remain verified | Summary is a new `workflow` memory; no source row is deleted or mutated |
| H5 | Memory CI fails on a newly added active error trap | ROADMAP, docs | Supported | `npm run verify:replay`; `fastr memory-ci --base <jsonl> --head <jsonl> --fail-on-new-traps` | `newTrapIds: ["mem_ci_trap"]`; `exitCode: 1`; Markdown includes `New error traps: mem_ci_trap` | Exit is advisory unless `--fail-on-new-traps` is passed |
| H6 | PR workflow posts or updates a memory diff comment | ROADMAP | **Qualified** | inspect `.github/workflows/fastr-memory-ci.yml` | Workflow runs `fastr memory-ci`, writes a Markdown body, and posts/updates a PR comment via `actions/github-script` | Live PR comment has not been observed in this session; fork PRs are job-summary-only because their token is read-only |
| H7 | Replay and diff are available over MCP | README, docs | Supported | `fastr mcp`; `tools/list` | 41 tools, including `fastr_replay` and `fastr_diff` | Full profile is the default; README lists all 41 |
| H8 | A 12-tool core MCP profile is available | README, docs | Supported | `node scripts/smoke-mcp-profile.mjs`; `npm test -- tests/mcp-core-profile.test.ts` | Spawned CLI: core `expected: 12, actual: 12, ok: true`; full `expected: 41, actual: 41, ok: true`; in-process test `1 passed` | Spawned CLI over stdio with newline-delimited JSON-RPC on 2026-10-21; requires a current `dist` build; the flag is `--profile core` and the env fallback is `FASTR_MCP_PROFILE=core` |
| H9 | Conflict-aware recall marks both sides of an open contradiction and the CLI can resolve it | README, docs | Supported | `npm test -- tests/conflict-recall.test.ts`; `fastr conflict list`; `fastr conflict resolve 1 --keep <id> --forget`; `npm run check:ci` | `4 passed`; list `1 open`; recall text contains `OPEN CONFLICT #1` for both ids; after resolve `No open memory conflicts`; full gate `239 passed`, `44 passed` | Local Windows smoke on branch `feat/0.3.0` at `cb4a5c3`; conflict detection is lexical Jaccard/polarity, not semantic; marker is advisory and does not auto-pick a winner |
| H10 | Local Markdown rules import idempotently with dry-run and duplicate skipping | README, docs | Supported | `npm test -- tests/local-import.test.ts`; `fastr import AGENTS.md --from agents-md --module auth --verified --dry-run`; repeat without `--dry-run`; `npm run check:ci` | `6 passed`; dry run `Would import 2 of 2 sections`; first import `Imported 2 of 2`; re-import `Imported 0 of 2`, `Skipped duplicates: 2`; status `Active Memories: 2`; full gate `245 passed`, `45 passed` | Local Windows smoke on branch `feat/0.3.0` at `030a768`; dedupe is exact title-plus-content, not semantic; level 2+ headings are preferred, with bullets and paragraphs as fallbacks |
| H11 | OpenCode V2 gets a project MCP server and an auto-loaded context/compaction plugin | README, docs | Supported | `npm test -- tests/installer-safety.test.ts`; `npm run smoke:opencode`; `npm run check:ci` | `12 passed`; smoke wrote `opencode.json` plus `.opencode/plugins/fastrmemory/index.ts`, `expectedTools: 41`, `actualTools: 41`, `ok: true`; full gate `248 passed`, `45 passed` | Local Windows smoke on branch `feat/0.3.0` at `1b16df6`; the generated plugin source is asserted by tests, but its hooks were not executed inside a live OpenCode session; JSONC configs are intentionally left untouched |
| H12 | Gemini CLI gets a project MCP server and lifecycle hooks with strict JSON hook output | README, CHANGELOG | Supported | `npm test -- tests/installer-safety.test.ts`; `npm run smoke:gemini`; `npm test`; `npm run check:docs` | `14 passed`; smoke wrote `.gemini/settings.json`, 4 hook events, `expectedTools: 41`, `actualTools: 41`, `ok: true`; a second `hook install` reported `already up to date`; `SessionStart` returned `{"hookSpecificOutput":{...}}`; `PreToolUse` returned `systemMessage` plus `additionalContext`; full gate `250 passed`, `45 passed` | Local Windows smoke on branch `feat/0.3.0` at `6f892de`; config merge and hook JSON are tested, but hooks were not executed inside a live Gemini CLI session; Gemini CLI was replaced by Antigravity CLI for unpaid and Google One users on 2026-06-18, so this targets the documented `.gemini/settings.json` contract; BeforeTool warnings are user-visible `systemMessage` because Gemini does not document model-facing `additionalContext` for BeforeTool |
| H13 | Copilot CLI gets a project MCP server and lifecycle hooks, and active traps gate `preToolUse` | README, CHANGELOG | Supported | `npm test -- tests/installer-safety.test.ts`; `npm run smoke:copilot`; `npm test`; `npm run check:ci` | `16 passed`; smoke wrote `.github/mcp.json` and `.github/hooks/fastrmemory.json`, 4 hook events, `expectedTools: 41`, `actualTools: 41`, `ok: true`; a second `hook install` reported `already up to date`; `SessionStart` returned `{"additionalContext":"..."}`; `PreToolUse` returned `{"permissionDecision":"ask","permissionDecisionReason":"..."}`; full gate `252 passed`, `45 passed` | Local Windows smoke on branch `feat/0.3.0` at `6bd2b0b`; the Copilot CLI is not installed locally, so hooks were not executed inside a live Copilot session; config merge and JSON output are unit-tested; Copilot has no model-facing advisory field for `preToolUse`, so active traps return `ask` and autopilot/non-interactive mode treats `ask` as deny; repository hooks require workspace admission/folder trust |
| H14 | `fastr://memory/{id}/envelope` returns metadata, provenance, links, and conflict state | README, docs/ARCHITECTURE, CHANGELOG | Supported | `npm test -- tests/mcp-server-v2.test.ts`; `npm test`; `npm run check:ci`; manual `resources/read` | `16 passed`; full gate `253 passed`, `45 passed`; manual envelope returned `metadata.title: "Use RS256"`, `metadata.is_active: true`, `provenance.verified: true`, `signature_length: 64`, `source_event_ids: ["evt_envelope_evidence"]`, `source_event_count: 1`, `links.files: ["src/auth/jwt.ts"]`, an outgoing `association` graph edge, and `conflicts.open_count: 2` with `reason: "Conflicting signing algorithms"` | Local Windows smoke on branch `feat/0.3.0` at `7017828`; the envelope includes memory content and source-event metadata but omits raw event payloads; conflict counts include both auto-detected and explicitly inserted conflicts; missing IDs return an MCP resource error |
| H15 | Immutable memory branches merge one-way with a conflict report and preserve history | README, docs/ARCHITECTURE, CHANGELOG | Supported | `npm test -- tests/branch-merge.test.ts`; `npm run check:ci`; manual `fastr branch create/list`; `fastr merge`; `fastr merge --force --strategy branch` | `3 passed`; full gate `256 passed`, `46 passed`; branch `feature/auth` snapshot `snap_219798f9`; default conflict merge reported `Applied: no`, `Conflicts (1)` (`inactive_on_target`, branch memory superseded by `mem_13fe96ee`), `Applied writes: 0`, and `merge exit: 1`; `--force --strategy branch` reported `Applied: yes`, `Applied writes: 1`; the superseded target row remains in history; `branch list` then showed `last merge 2026-10-20T23:05:46.074Z` | Local Windows smoke on branch `feat/0.3.0` at `a8e7b92`; branches are immutable snapshot pointers with no checkout or mutable working tree; target-only memories are preserved; a merge with unresolved conflicts writes no memories but records the attempt in `memory_branch_merges`; branch snapshots exclude global/federated rows |

## How to add a claim

1. Run the command on a clean checkout of the revision you will cite.
2. Paste the raw output, not a summary.
3. Record the date and commit.
4. Never label a simulated baseline as an external measurement.
5. If the result misses the target, publish the real number and the gap.
