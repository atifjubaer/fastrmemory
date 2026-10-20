# Claims Ledger

Every public claim must have a row here. A claim is only **Supported** when the command in the row reproduces the raw output on the recorded commit. **Vendor-reported** means the number comes from another project's own documentation and has not been independently reproduced. **Qualified** means the claim is true only under the stated caveat. **Removed** means the claim was published before and is no longer in the docs.

- **Ledger date:** 2026-10-20
- **Benchmark measurement commit:** `d9446e1` (raw JSON in `bench/results/latest.json`)
- **Code and metadata inspection:** `960e248` (2026-10-20)
- **Hardware:** AMD Ryzen 7 7700, 15.1 GB RAM, Windows 10 Pro 19045, Node v24.15.0
- **Provenance rule:** benchmark rows are pinned to `d9446e1`; code and metadata rows quote output from the current tree at `960e248`; rows marked Historical or Vendor-reported are the only exceptions.

## A. Distribution and package

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| A1 | Package is `@atifjubaer/fastrmemory` v0.1.0 | `package.json` | Supported | `node -p "require('./package.json').name + ' ' + require('./package.json').version"` | `@atifjubaer/fastrmemory 0.1.0` | None |
| A2 | Package is published on npm | README (removed) | **Blocked** | `npm view @atifjubaer/fastrmemory version` | `E404 Not Found` | Never published; do not advertise npm install until this passes |
| A3 | Install from GitHub works | README | Supported | `npm view github:atifjubaer/fastrmemory version` | `0.1.0` | Metadata resolves from GitHub; a full global install was not run |
| A4 | Tarball is 204.4 kB | RELEASE_v0.1.0 | Historical | `npm pack --dry-run` | See `docs/audit/2026-10-20-baseline.md` | v0.1.0 snapshot; current tarball measured in the audit |
| A5 | Apache-2.0 license | README, `package.json` | Supported | `node -p "require('./package.json').license"` | `Apache-2.0` | `LICENSE` present |
| A6 | Node >= 22.16.0 | `package.json` | Supported | `node -p "require('./package.json').engines.node"` | `>=22.16.0` | Tests run on Node 24.15.0 locally |

## B. Architecture and footprint

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| B1 | Zero daemon, no open ports on the default CLI/MCP path | README | Supported | Code inspection: `src/mcp/stdio.ts`, `bin/fastr.ts` | In-process stdio; no listen call | The optional `daemon start` command does open a local HTTP port |
| B2 | 4 runtime dependencies | README | Supported | `npm ls --depth=0 --omit=dev` | 4 direct deps (transformers, MCP server, commander, zod) | Full tree is ~109 packages, ~435 MB (see audit) |
| B3 | Engine-level recall averaged 0.67 ms | README | Qualified | `npx tsx scripts/capture-bench.ts` | `avgLatencyMs: 0.67` | 12 synthetic cases, in-memory DB, excludes Node startup |
| B4 | Native on Windows, macOS, Linux | README | Qualified | Local run on Windows; CI matrix | Windows green locally; CI partially red | Not claiming 6/6 until CI passes |
| B5 | No background daemon required for hooks | README | Supported | `src/hooks/runner.ts` | Hook processes exit after each event | Hook latency not benchmarked |
| B6 | Local embeddings are optional | README | Supported | `src/search/embeddings.ts` | No model load unless opted in | Default hash vectors are lexical, not semantic |
| B7 | Bi-temporal retention; supersession keeps history | README | Supported | `npm test -- tests/repository.test.ts tests/search.test.ts` | Supersession tests pass | Deleting a row via `forget` is a tombstone, not a hard delete |
| B8 | Two-zone Git-diffable Markdown mirrors | README | Supported | `npm test -- tests/mirror.test.ts` | Mirror tests pass | Format is covered by snapshots, not byte-for-byte goldens |

## C. MCP surface

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| C1 | 39 MCP tools | README | Supported | `grep -c "server.registerTool(" src/mcp/server.ts` | `39` | Includes tools added after v0.1.0 |
| C2 | 2 MCP prompts | README | Supported | `grep -c "server.registerPrompt(" src/mcp/server.ts` | `2` (`pre-edit-check`, `session-wrap-up`) | — |
| C3 | 4 MCP resources | README | Supported | `grep -c "server.registerResource(" src/mcp/server.ts` | `4` (3 static + 1 template) | Template is `fastr://memory/{id}` |
| C4 | 10 Agent Skills | README | Supported | `(Get-ChildItem skills -Directory).Count` | `10` | Mirrored to `.cursor/skills/` |
| C5 | Skills reference valid tools | README | Supported | `npm run check:skills` | Passes | — |

## D. Tests and reliability

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| D1 | 221 tests pass across 37 files in ~4.2 s | README | Supported | `npm test` | `37 passed`, `221 passed`, duration 4.21 s | Local Windows run; CI is separate |
| D2 | Test suite writes nothing to the real home store | README (new) | Supported | `npm test` then count rows | 60 before, 60 after | The 60 pre-existing rows are documented legacy junk |
| D3 | 6/6 CI matrix green | README (not claimed) | **Failing** | GitHub Actions | 3/6 reported, macOS Node 24 red | Do not claim until 6/6 |
| D4 | Data loss is zero in a 10k crash test | Roadmap target | **Not measured** | — | — | Phase 5 deliverable; do not claim yet |

## E. Benchmark

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| E1 | FastrMemory scores 75% Hit@1 / 92% Hit@3 / 100% Hit@5 / MRR 0.85 | README, BENCHMARKS | Supported | `npx tsx scripts/capture-bench.ts` | `hitAt1: 75, hitAt3: 92, hitAt5: 100, mrr: 0.85` | 12 synthetic cases |
| E2 | FastrMemory packs 124 tokens on average | README, BENCHMARKS | Supported | same | `avgTokens: 124` | Estimated tokens, not tokenizer-exact |
| E3 | Simulated BM25 scores 92% Hit@1 | README, BENCHMARKS | Supported | same | `hitAt1: 92` | **Simulated baseline, not the real project** |
| E4 | Simulated Memoria-style scores 100% Hit@1 | README, BENCHMARKS | Supported | same | `hitAt1: 100` | **Simulated baseline, not the real project** |
| E5 | Static dump scores 42/58/67 | README, BENCHMARKS | Supported | same | `42/58/67` | **Simulated baseline** |
| E6 | "12 real-world SWE-bench and LongMemEval cases" | `docs/benchmark-report.md` (old) | **Removed** | `git log -p docs/benchmark-report.md` | Old text present before Phase 0 | False: cases are hand-written synthetic |
| E7 | "Hippo 0% Hit@1" | README (old) | **Removed** | Old README table | `0%` | False even as a simulation; current simulated BM25 is 92% |
| E8 | FastrMemory 63/88/88 | README (old) | **Removed** | Old README table | `63/88/88` | Stale vs the current code |
| E9 | 240+ benchmark cases with held-out split | Roadmap target | **Not measured** | — | — | Phase 2 deliverable |
| E10 | Hit@1 ≥90%, Hit@5 ≥98% | Roadmap target | **Not measured** | — | — | Current: 75/100 |

## F. Competitor statements

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| F1 | Hippo's sleep consolidation lowered Hit@5 by 3.6 points | README | **Vendor-reported** | Hippo README, PR #232 (external) | `−3.6 pp [-5.8, -1.4]` per vendor | Not independently reproduced; cite as "Hippo's own audit" |
| F2 | Hippo defaults to BM25 with optional MiniLM | README | **Vendor-reported** | Hippo README (external) | BM25 default; embeddings optional | Not reproduced here |
| F3 | AgentMemory runs a Rust daemon on 4 local ports | README | **Vendor-reported** | agentmemory README (external) | ports 3111/3112/3113/49134 | Windows setup not verified here |
| F4 | "Hippo Memory BM25 only" | RELEASE (old) | **Removed** | — | — | False: optional MiniLM exists |
| F5 | "AgentMemory fails on Windows" | RELEASE (old) | **Removed** | — | — | Unverified; replaced with "manual setup, not verified here" |
| F6 | mem0 managed platform 92.5 LoCoMo | README (old) | **Removed** | — | — | Vendor number, not reproduced; removed from table |
| F7 | "Memoria locks memories in MatrixOne" | README (old) | **Qualified** | Memoria docs (external) | MatrixOne/Docker deployment | Reworded to "typically adds external infrastructure" |
| F8 | Competitor architecture table and "where competitors win" paragraph | README | **Vendor-reported** | Each project's current documentation (linked in README) | Runtime, storage, retention, retrieval, Git, feedback, and dependency summaries | Not re-tested here; no competitor benchmark was run |

## G. Removed marketing claims

| ID | Claim | Where | Status | Why removed |
|---|---|---|---|---|
| G1 | "world's first" | `RELEASE_v0.1.0.md` | **Removed** | Unverifiable |
| G2 | "zero-dependency" | README | **Removed** | 4 runtime dependencies; ~109 packages installed |
| G3 | "100% native" | README | **Removed** | Replaced with OS support + CI status |
| G4 | "25 agents" | README | **Removed** | Only Claude Code and Cursor have native installers tested here |
| G5 | "56/56 tests" | RELEASE, npm docs | **Removed** | Historical snapshot; current suite is 221 |
| G6 | "21 tests" | NPM troubleshooting | **Removed** | Stale; current suite is 221 |
| G7 | "Enforces 100% test coverage" | npm-publishing | **Removed** | No coverage threshold is configured |
| G8 | "Sub-millisecond retrieval" | README | **Qualified** | Engine-level 0.67 ms; CLI cold start is separate |
| G9 | `npm install -g @atifjubaer/fastrmemory` | README | **Removed** | npm E404 |
| G10 | "Jaccard >= 0.5 and 40-word polarity" | README | **Corrected** | Code uses `jaccard < 0.35` and `.slice(0, 50)`; README now states 0.35 / 50 words |
| G11 | "10 Focused Route Workspaces" | README | **Corrected** | Router exposes 11 routes; README now lists `/graph` and says 11 |
| G12 | "60 FPS lerp camera" | README | **Removed** | No FPS measurement exists; replaced with "smooth lerp camera" |
| G13 | "Hippo ~4.5 MB install" | README | **Removed** | Competitor size was not independently measured; replaced with non-numeric vendor context |
| G14 | "Spool fallback in <5ms" | README | **Removed** | No latency measurement exists; diagram now says "async fallback" |
| G15 | "5-Minute Pull Request Workflow" | README | **Removed** | No timing study exists; heading now says "Pull Request Workflow" |

## H. Retrieval and dashboard mechanics

| ID | Claim | Where | Status | Evidence command | Raw output | Caveat |
|---|---|---|---|---|---|---|
| H1 | Error traps receive a 2.0x ranking multiplier | README | Supported | `Select-String -Path src/search/hybrid-rrf.ts -Pattern 'const trapMultiplier','const verifiedMultiplier'` | `const trapMultiplier = memory.kind === 'error_trap' ? 2.0 : 1.0;` | Code inspection; not an end-to-end retrieval benchmark |
| H2 | Verified memories receive a 1.25x ranking multiplier | README | Supported | same command | `const verifiedMultiplier = memory.status === 'verified' ? 1.25 : 1.0;` | Code inspection |
| H3 | Feedback adds +0.2 for good and -0.5 for bad | README | Supported | `Select-String -Path src/db/repository.ts -Pattern 'reward_score \+ 0.2','reward_score - 0.5'` | `newScore = Math.min(3.0, Number((mem.reward_score + 0.2).toFixed(2)));`<br>`newScore = Math.max(0.1, Number((mem.reward_score - 0.5).toFixed(2)));` | Score is capped at 3.0 and floored at 0.1 |
| H4 | RRF fusion uses k=60 | README | Supported | `Select-String -Path src/search/hybrid-rrf.ts -SimpleMatch -Pattern '60 + rank'` | `if (rankA !== undefined) rrf += 1 / (60 + rankA);`<br>`if (rankB !== undefined) rrf += 1 / (60 + rankB);`<br>`if (rankC !== undefined) rrf += 1 / (60 + rankC);` | Constant is inline in all three streams |
| H5 | Context budgets are 150/500/1500/4000 tokens | README | Supported | `Select-String -Path src/search/budget.ts -Pattern 'L0_WAKEUP','L1_FILE_RULES','L2_TASK_RECALL','L3_DEEP_AUDIT'` | `L0_WAKEUP: 150,`<br>`L1_FILE_RULES: 500,`<br>`L2_TASK_RECALL: 1500,`<br>`L3_DEEP_AUDIT: 4000` | Estimated at ~4 chars per token, not tokenizer-exact |
| H6 | Dashboard exposes 11 route workspaces | README | Supported | `node -e "const fs=require('fs');console.log(fs.readdirSync('ui/src/routes').filter(f=>f.endsWith('Page.tsx')).length)"` | `11` | Counts page components; `ROUTE_NAMES` also lists 11 |
| H7 | Conflict detection uses Jaccard >=0.35 and 50-word polarity | README | Supported | `Select-String -Path src/learn/conflicts.ts -SimpleMatch -Pattern 'jaccard < 0.35','slice(0, 50)'` | `if (intersectionSize < 2 \|\| jaccard < 0.35) {`<br>`const wordsA = fullTextA.toLowerCase().split(/\s+/).slice(0, 50);`<br>`const wordsB = fullTextB.toLowerCase().split(/\s+/).slice(0, 50);` | A second path flags Jaccard >=0.65 as high overlap |
| H8 | Embeddings are 384-dimensional | README | Supported | `Select-String -Path src/search/embeddings.ts -Pattern 'dimensions: number = 384'` | `export function computeFeatureHashVector(text: string, dimensions: number = 384): Float32Array {` | Default hash vectors are lexical, not semantic |

## How to add a claim

1. Run the command on a clean checkout of the commit you will cite.
2. Paste the raw output (not a summary) into the row.
3. Record the date and commit.
4. If the claim is about another project, mark it **Vendor-reported** and link the source; never call it a measurement.
5. If the command fails or the number is worse than the target, publish the real number and the gap.
