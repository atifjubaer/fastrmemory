# Claims Ledger

Every public claim must have a row here. A claim is **Supported** only when the evidence command reproduces the raw output on the recorded revision. **Qualified** means it is true only with the stated caveat. **Blocked** or **Not measured** claims must not be published as facts.

- **Ledger date:** 2026-10-20
- **Benchmark commit:** `1495622` (raw JSON in `bench/results/minilm.json` and `bench/results/hash.json`)
- **Code inspection:** `1495622` (retrieval and packaging changes in this ledger)
- **Hardware:** AMD Ryzen 7 7700, 15.1 GB RAM, Windows 10 Pro 19045, Node v24.15.0
- **Scope:** FastrMemory only. No external memory engine is measured in this repository.
- **Row provenance:** every row is dated 2026-10-20. Benchmark rows use commit `1495622`; code-inspection rows use `1495622`; `npm view` rows were run on 2026-10-20.

## A. Distribution and package

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| A1 | Package is `@atifjubaer/fastrmemory` v0.2.0 | `package.json` | Supported | `node -p "require('./package.json').name + ' ' + require('./package.json').version"` | `@atifjubaer/fastrmemory 0.2.0` | Version bump accompanies the retrieval and packaging changes |
| A2 | Package is published on npm | README | **Blocked** | `npm view @atifjubaer/fastrmemory version` | `E404 Not Found` | Never advertise npm install until this passes |
| A3 | GitHub source metadata resolves | README | Supported | `npm view github:atifjubaer/fastrmemory version` | `0.1.0` | The GitHub default branch still reports 0.1.0; a full install is not re-run here, and the local tree is 0.2.0 |
| A4 | Tarball size | README (not claimed) | Supported | `npm pack --dry-run --json --ignore-scripts` | 551.5 kB packed, 2.1 MB unpacked, 195 files | Measured on 2026-10-20; excludes the optional MiniLM model download |
| A5 | Apache-2.0 license | README, `package.json` | Supported | `node -p "require('./package.json').license"` | `Apache-2.0` | `LICENSE` present |
| A6 | Node >= 22.16.0 | `package.json` | Supported | `node -p "require('./package.json').engines.node"` | `>=22.16.0` | Local tests run on Node 24.15.0 |
| A7 | Three required runtime dependencies | README | Supported | `npm ls --depth=0 --omit=dev` | `@modelcontextprotocol/server`, `commander`, `zod` | MiniLM is an optional peer plus a dev dependency |
| A8 | Clean install stays under 20 MB | README (not claimed) | **Not measured** | `npm ci` in a clean directory | Run after moving MiniLM out of required deps | The optional model download is separate and not counted |

## B. Architecture and footprint

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| B1 | Zero daemon, no open ports on the default CLI/MCP path | README | Supported | Code inspection: `src/mcp/stdio.ts`, `bin/fastr.ts` | In-process stdio; no listen call | The optional `daemon start` command does open a local HTTP port |
| B2 | Local embeddings are optional | README | Supported | `src/search/embeddings.ts` | No model load unless opted in | Default hash vectors are lexical, not semantic |
| B3 | Bi-temporal retention; supersession keeps history | README | Supported | `npm test -- tests/repository.test.ts tests/search.test.ts` | Supersession tests pass | `forget` is a tombstone, not a hard delete |
| B4 | Two-zone Git-diffable Markdown mirrors | README | Supported | `npm test -- tests/mirror.test.ts` | Mirror tests pass | Format is covered by snapshots, not byte-for-byte goldens |
| B5 | Engine-level recall p50 and p95 | README | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings minilm --out bench/results/minilm.json` | Train 4.04 ms p50 / 5.99 ms p95; holdout 3.65 ms p50 / 5.80 ms p95 | In-process, 240 synthetic cases, excludes Node startup and model load |
| B6 | Offline recall p50 and p95 | README | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings hash --out bench/results/hash.json` | Train 0.99 ms p50 / 1.80 ms p95; holdout 1.06 ms p50 / 1.99 ms p95 | Same caveat; hash vectors are lexical |
| B7 | Runs natively on Windows, macOS, and Linux | README | **Qualified** | Local Windows run; GitHub Actions matrix | Windows local green; CI partially red | macOS Node 24 is red and Windows Node 24 was cancelled; do not claim 6/6 |

## C. MCP surface

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| C1 | 39 MCP tools | README | Supported | `Select-String -Path src/mcp/server.ts -Pattern 'server.registerTool\\(' \| Measure-Object` | `39` | Includes tools added after v0.1.0 |
| C2 | 2 MCP prompts | README | Supported | same, `registerPrompt` | `2` (`pre-edit-check`, `session-wrap-up`) | - |
| C3 | 4 MCP resources | README | Supported | same, `registerResource` | `4` (3 static + 1 template) | Template is `fastr://memory/{id}` |
| C4 | 10 Agent Skills | README | Supported | `(Get-ChildItem skills -Directory).Count` | `10` | Mirrored to `.cursor/skills/` |
| C5 | Skills reference valid tools | README | Supported | `npm run check:skills` | Passes | - |

## D. Tests and reliability

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| D1 | 226 tests pass across 38 files | README | Supported | `npm test` | `226 passed`, `38 passed` | Local Windows run; CI is separate |
| D2 | Test suite writes nothing to the real home store | README | Supported | `npm test` then count rows | 60 before, 60 after | The 60 pre-existing rows are documented legacy data |
| D3 | 6/6 CI matrix green | README (not claimed) | **Not verified** | GitHub Actions | Matrix updated in this change; rerun required | Do not claim until 6/6 |
| D4 | Zero data loss in a 10k crash test | Roadmap target | **Not measured** | - | - | Do not claim yet |

## E. Benchmark

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| E1 | Corpus has 240 cases and a 20% holdout | README, BENCHMARKS | Supported | `node -e "const j=require('./bench/results/minilm.json');console.log(j.corpus)"` | 240 cases, 192 train / 48 holdout, 120 memories | Deterministic synthetic generator |
| E2 | FastrMemory + MiniLM train Hit@1 | README, BENCHMARKS | Supported | `npx tsx scripts/eval-bench.ts --split all --embeddings minilm` | 94.8% Hit@1, 99.0% Hit@3, 100% Hit@5, MRR 0.968 | 192 train cases |
| E3 | FastrMemory + MiniLM holdout Hit@1 | README, BENCHMARKS | Supported | same | 89.6% Hit@1, 95.8% Hit@3, 100% Hit@5, MRR 0.932 | 48 holdout cases; fixed before tuning |
| E4 | Packed context text stays within the 250-token budget | README, BENCHMARKS | Supported | same | 206 average tokens, 250-token budget | Estimated tokens, not tokenizer-exact; ranked result objects retain full content |
| E5 | BM25-only is the ablation floor | README, BENCHMARKS | Supported | same | 79.7% train / 77.1% holdout Hit@1 | Same corpus and budget |
| E6 | Static dump is a simulated baseline | README, BENCHMARKS | Supported | same | 2.1% train / 0% holdout Hit@1 | Simulation implemented in this repository |
| E7 | Hit@1 >= 90% and Hit@5 >= 98% | Roadmap target | **Qualified** | same | Train 94.8/100; holdout 89.6/100 | Holdout Hit@1 is 0.4 points below target; publish both |
| E8 | 240+ benchmark cases | Roadmap target | Supported | same | 240 | Met |
| E9 | Real-world benchmark beyond synthetic data | Roadmap target | **Not measured** | - | - | Do not claim SWE-bench/LongMemEval parity |

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
| G7 | "Sub-millisecond retrieval" | **Qualified** | Hash path p50 0.99 ms; MiniLM path is ~3.7-4.0 ms |
| G8 | `npm install -g @atifjubaer/fastrmemory` | **Removed** | npm E404 |
| G9 | "12 real-world SWE-bench and LongMemEval cases" | **Removed** | Cases are synthetic |
| G10 | Named external-engine comparisons | **Removed** | Unverified and against the naming policy |
| G11 | "Spool fallback in <5ms" | **Removed** | No latency measurement |
| G12 | "5-Minute Pull Request Workflow" | **Removed** | No timing study |

## How to add a claim

1. Run the command on a clean checkout of the revision you will cite.
2. Paste the raw output, not a summary.
3. Record the date and commit.
4. Never label a simulated baseline as an external measurement.
5. If the result misses the target, publish the real number and the gap.
