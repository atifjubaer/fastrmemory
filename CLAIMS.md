# Claims Ledger

Every public claim must have a row here. A claim is **Supported** only when the evidence command reproduces the raw output on the recorded revision. **Qualified** means it is true only with the stated caveat. **Blocked** or **Not measured** claims must not be published as facts.

- **Ledger date:** 2026-10-21
- **Benchmark commit:** `562f461` (raw JSON in `bench/results/minilm.json` and `bench/results/hash.json`)
- **Phase 3/4 evidence commit:** `a91ad6d` (replay, JSONL, consolidation, Memory CI)
- **Packaging/CI inspection:** `de4fde3` (package, version, and CI changes in this ledger)
- **Hardware:** AMD Ryzen 7 7700, 15.1 GB RAM, Windows 10 Pro 19045, Node v24.15.0
- **Scope:** FastrMemory only. No external memory engine is measured in this repository.
- **Row provenance:** benchmark rows use commit `562f461`; Phase 3/4 rows use `a91ad6d`; package rows use `2aa4e20`; CI rows use `de4fde3`; `npm view` rows were run on 2026-10-20. The README table remains the frozen v0.2.0 release snapshot at `1495622`, preserved as `bench/results/minilm-1495622.json`.

## A. Distribution and package

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| A1 | Package is `@atifjubaer/fastrmemory` v0.2.0 | `package.json` | Supported | `node -p "require('./package.json').name + ' ' + require('./package.json').version"` | `@atifjubaer/fastrmemory 0.2.0` | Version bump accompanies the retrieval and packaging changes |
| A2 | Package is published on npm | README | **Blocked** | `npm view @atifjubaer/fastrmemory version` | `E404 Not Found` | Never advertise npm install until this passes |
| A3 | GitHub source metadata resolves | README | Supported | `npm view github:atifjubaer/fastrmemory version` | `0.2.0` | GitHub default branch was at `de4fde3` when inspected; later commits are local until pushed; the npm registry package is still E404 |
| A4 | Tarball size | README (not claimed) | Supported | `npm pack --dry-run --json --ignore-scripts` | 557.9 kB packed, 2.1 MB unpacked, 200 files | Dry-run on 2026-10-20; the actual tarball is 571,279 bytes with SHA-256 `12B7D49546D6B904A2296724490E4D6EECE313514DA6C4BFDA6950137F309ED7`; generated from the release tree (README install update included); the attached release asset is the canonical artifact; tarball hashes are sensitive to line endings; excludes the optional MiniLM model; the asset predates the Phase 2 module-scope fix |
| A5 | Apache-2.0 license | README, `package.json` | Supported | `node -p "require('./package.json').license"` | `Apache-2.0` | `LICENSE` present |
| A6 | Node >= 22.16.0 | `package.json` | Supported | `node -p "require('./package.json').engines.node"` | `>=22.16.0` | Local tests run on Node 24.15.0 |
| A7 | Three required runtime dependencies | README | Supported | `npm ls --depth=0 --omit=dev` | `@modelcontextprotocol/server`, `commander`, `zod` | MiniLM is an optional peer plus a dev dependency |
| A8 | Clean install stays under 20 MB | README (not claimed) | Supported | `npm install <0.2.0 tarball> --ignore-scripts` in an empty temp project, then measure `node_modules` | 1.81 s install; 16,397,409 bytes; `npx fastr --version` and `npx fastrmemory --version` both `0.2.0` | Local Windows run on 2026-10-20; npm cache may affect install time; optional MiniLM model is not installed |
| A9 | v0.2.0 GitHub Release asset is attached and installable | README | Supported | `gh release download v0.2.0 --pattern atifjubaer-fastrmemory-0.2.0.tgz`; `npm install <release asset URL> --ignore-scripts` | 571,279 bytes; SHA-256 `12B7D49546D6B904A2296724490E4D6EECE313514DA6C4BFDA6950137F309ED7`; release-URL install 3.71 s; CLI `0.2.0` | Asset URL `https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz`; local Windows run on 2026-10-20; line-ending hash sensitivity applies; the asset predates the Phase 2 module-scope fix |

## B. Architecture and footprint

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| B1 | Zero daemon, no open ports on the default CLI/MCP path | README | Supported | Code inspection: `src/mcp/stdio.ts`, `bin/fastr.ts` | In-process stdio; no listen call | The optional `daemon start` command does open a local HTTP port |
| B2 | Local embeddings are optional | README | Supported | `src/search/embeddings.ts` | No model load unless opted in | Default hash vectors are lexical, not semantic |
| B3 | Bi-temporal retention; supersession keeps history | README | Supported | `npm test -- tests/repository.test.ts tests/search.test.ts` | Supersession tests pass | `forget` is a tombstone, not a hard delete |
| B4 | Two-zone Git-diffable Markdown mirrors | README | Supported | `npm test -- tests/mirror.test.ts` | Mirror tests pass | Format is covered by snapshots, not byte-for-byte goldens |
| B5 | Engine-level recall p50 and p95 | README | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings minilm --out bench/results/minilm.json` | Train 3.30 ms p50 / 5.11 ms p95; holdout 3.41 ms p50 / 5.14 ms p95 | In-process, 240 synthetic cases, excludes Node startup and model load |
| B6 | Offline recall p50 and p95 | README | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings hash --out bench/results/hash.json` | Train 0.95 ms p50 / 1.60 ms p95; holdout 0.97 ms p50 / 2.05 ms p95 | Same caveat; hash vectors are lexical |
| B7 | Runs natively on Windows, macOS, and Linux | README | Supported | `gh run view 39467306362 --json conclusion,jobs` | 6/6 jobs succeeded: Ubuntu, Windows, and Intel macOS on Node 22.x and 24.x | macOS jobs used `macos-15-intel`; Apple Silicon is not covered by this matrix |

## C. MCP surface

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| C1 | 41 MCP tools | README (39 at v0.2.0), current HEAD | Supported | `Select-String -Path src/mcp/server.ts -Pattern 'server.registerTool\\(' \| Measure-Object` | `41` | Adds `fastr_replay` and `fastr_diff` after the v0.2.0 release; README badge remains release-era |
| C2 | 2 MCP prompts | README | Supported | same, `registerPrompt` | `2` (`pre-edit-check`, `session-wrap-up`) | - |
| C3 | 4 MCP resources | README | Supported | same, `registerResource` | `4` (3 static + 1 template) | Template is `fastr://memory/{id}` |
| C4 | 10 Agent Skills | README | Supported | `(Get-ChildItem skills -Directory).Count` | `10` | Mirrored to `.cursor/skills/` |
| C5 | Skills reference valid tools | README | Supported | `npm run check:skills` | Passes | - |

## D. Tests and reliability

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| D1 | 226 tests pass across 38 files | README (v0.2.0 release) | Supported | `npm test` | `226 passed`, `38 passed` | Frozen release-era badge; current suite is D1b. Local Windows run; CI is separate |
| D1b | 234 tests pass across 42 files | Current HEAD | Supported | `npm test` | `234 passed`, `42 passed` | Run on 2026-10-21 at `a91ad6d`; local Windows run; CI is separate |
| D2 | Test suite writes nothing to the real home store | README | Supported | `npm test` then count rows | 60 before, 60 after | The 60 pre-existing rows are documented legacy data |
| D3 | 6/6 CI matrix green | ROADMAP | Supported | `gh run view 39467306362 --json conclusion,jobs` | 6/6 jobs succeeded: Ubuntu, Windows, and Intel macOS on Node 22.x and 24.x | Run on `de4fde3`; `fail-fast` disabled; macOS jobs use `macos-15-intel`; Apple Silicon is not covered |
| D4 | Zero data loss in a 10k crash test | Roadmap target | **Not measured** | - | - | Do not claim yet |

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
| H7 | Replay and diff are available over MCP | README, docs | Supported | `fastr mcp`; `tools/list` | 41 tools, including `fastr_replay` and `fastr_diff` | Adds two tools after the v0.2.0 release; README still says 39 |

## How to add a claim

1. Run the command on a clean checkout of the revision you will cite.
2. Paste the raw output, not a summary.
3. Record the date and commit.
4. Never label a simulated baseline as an external measurement.
5. If the result misses the target, publish the real number and the gap.
