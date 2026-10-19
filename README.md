<div align="center">

# ⚡ FastrMemory

### High-Performance Cognitive Agent Memory Engine
**Zero Daemon • Native Node 22+ `node:sqlite` • Bi-Temporal Git Sync • Triple-Stream RRF • Official MCP v2**

[![CI](https://github.com/atifjubaer/fastrmemory/actions/workflows/ci.yml/badge.svg)](https://github.com/atifjubaer/fastrmemory/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.16.0-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Protocol](https://img.shields.io/badge/Protocol-MCP%20v2-7C3AED?style=flat-square)](https://modelcontextprotocol.io)
[![Tests](https://img.shields.io/badge/Tests-91%20Passed-brightgreen?style=flat-square)](tests/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Architecture](https://img.shields.io/badge/Architecture-Zero--Daemon%20WAL-orange?style=flat-square)](#-key-architectural-pillars)

<p align="center">
  <a href="#-overview">Overview</a> &bull;
  <a href="#-why-fastrmemory-vs-competitors">vs Competitors</a> &bull;
  <a href="#-retrieval-benchmark-proof">Benchmarks</a> &bull;
  <a href="#-local-web-dashboard">Web UI</a> &bull;
  <a href="#-works-with-25-agents">Supported Agents</a> &bull;
  <a href="#-30-second-quick-start">Quick Start</a> &bull;
  <a href="#-mcp-server-tools--resources">MCP Tools</a> &bull;
  <a href="#-architecture">Architecture</a> &bull;
  <a href="#-contributing">Contributing</a>
</p>

</div>

---

## 💡 Overview

AI coding agents (Claude Code, Cursor, Windsurf, Codex, Antigravity) degrade on long-running codebases because existing memory systems suffer from fatal trade-offs:
- **Hippo Memory's sleep consolidation** merges episodic memories into vague summaries and deletes the originals, costing **3.6% in retrieval accuracy** (Hit@5), while its time decay forgets rare architectural rules.
- **AgentMemory** requires a compiled Rust daemon (`iii-engine`) listening on 4 open network ports (`3111`, `3112`, `3113`, `49134`), causing native Windows failures and capturing raw tool logs that bloat token context.
- **Mem0, Letta, and Memoria** lock your memories inside heavy external infrastructure (Postgres, Qdrant, MatrixOne DB, or cloud APIs), preventing clean local version control.

**FastrMemory** solves this by unifying the best patterns from the top memory repos into a **single, zero-dependency, lightning-fast TypeScript engine**:

<table>
<tr>
<td width="33%" align="center">

### ⚡ Zero Daemon Overhead
Pure Node 22+ built-in `node:sqlite` in WAL mode. Sub-millisecond retrieval with **zero background daemons**, zero open ports, and 100% native execution on Windows, macOS, and Linux.

</td>
<td width="33%" align="center">

### 🔀 Bi-Temporal Git Sync
Never deletes facts during sleep. Replaces half-life decay with `valid_from` / `valid_to` timestamps and auto-mirrors human-readable `.fastr/pages/*.md` files into Git.

</td>
<td width="33%" align="center">

### 🎯 Triple-Stream RRF ($k=60$)
Fuses sub-millisecond FTS5 BM25 + local 384-dim embeddings + file-graph links. Error traps receive an automatic **2.0x boost** with per-ID outcome feedback (+0.2 / -0.5).

</td>
</tr>
</table>

---

## 📊 Why FastrMemory vs. Competitors

Comprehensive comparison across the current agent memory landscape:

| Capability | FastrMemory (`@atifjubaer`) | agentmemory | Memoria (MatrixOrigin) | mem0 (63K ⭐) | Letta / MemGPT | Hippo Memory | Built-in (`CLAUDE.md`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Daemon Overhead** | **Zero daemon** (Native `node:sqlite`) | Heavy Rust daemon (4 ports) | MatrixOne DB or Cloud API | Cloud / Vector DB | Full runtime daemon | Zero daemon | Static file |
| **Windows Support** | **100% Native Windows, Mac, Linux** | Fails without WSL2/Docker | Requires Docker/Cloud | Python setup | Complex setup | Native Node.js | Native OS |
| **Data Retention** | **Verbatim `raw_events` + Bi-Temporal** | Raw transcript bloat | Git-like DB snapshots | Passive extraction | Agent-managed | Lossy sleep merges | Manual editing |
| **Retrieval Power** | **Triple-Stream RRF ($k=60$) + File Graph** | BM25 + Vector + Graph RRF | Vector + Fulltext | Vector + Graph | Vector (archival) | BM25 only | Linear grep |
| **Git & PR Review** | **Two-Zone Git-diffable Markdown** | Web dashboard only | Web / CLI | Cloud dashboard | Web dashboard | Raw markdown dumps | Static text |
| **Feedback Multiplier**| **Per-ID attribution (`[mem_xxxx]`)** | Passive telemetry only | Edge re-weighting | Manual edit | None | Batch penalty | None |
| **External Dependencies**| **Zero** (Standard Node.js) | Compiled Rust binary | MatrixOne / Docker | Qdrant / pgvector | PostgreSQL | None | None |
| **Token Budgeting** | **Progressive L0–L3 (~150 to 4000t)** | ~1,900t / session | Uncapped | Varies | Core context | Varies | 22k+ tokens |
| **Autonomous Self-Healing** | **Built-in (`fastr_heal`, FTS5 rebuild, WAL vacuum)** | Daemon restart | None | Manual SQL | Manual | None | None |
| **Token Compression** | **AST structural compression (`fastr_compress`)** | External LLM call | None | None | None | None | None |
| **Multimodal Vision** | **Indexed screenshots + OCR + 384-dim vector** | Heavy CLIP daemon | None | None | None | None | None |

---

## 🤖 Works With Every Agent

<div align="center">
  <b>25 agents &bull; one memory server</b>
  <p>FastrMemory works with any agent that supports hooks, MCP, or REST API. All agents share the exact same memory store.</p>
</div>

<table>
<tr>
<td align="center" width="20%"><b>Claude Code</b><br/><sub><code>native plugin + 12 hooks + MCP</code></sub></td>
<td align="center" width="20%"><b>Codex CLI</b><br/><sub><code>native plugin + 6 hooks + MCP</code></sub></td>
<td align="center" width="20%"><b>GitHub Copilot CLI</b><br/><sub><code>MCP + plugin hooks/skills</code></sub></td>
<td align="center" width="20%"><b>Cursor</b><br/><sub><code>native plugin + 7 hooks + MCP</code></sub></td>
<td align="center" width="20%"><b>OpenCode</b><br/><sub><code>capture plugin + MCP</code></sub></td>
</tr>
<tr>
<td align="center"><b>Devin</b><br/><sub><code>6 hooks + skills + MCP</code></sub></td>
<td align="center"><b>OpenClaw</b><br/><sub><code>native plugin + MCP</code></sub></td>
<td align="center"><b>Hermes</b><br/><sub><code>native plugin + MCP</code></sub></td>
<td align="center"><b>pi</b><br/><sub><code>native plugin + MCP</code></sub></td>
<td align="center"><b>OpenHuman</b><br/><sub><code>native Memory trait backend</code></sub></td>
</tr>
<tr>
<td align="center"><b>Gemini CLI</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Antigravity</b><br/><sub><code>MCP + hooks</code></sub></td>
<td align="center"><b>Claude Desktop</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Warp</b><br/><sub><code>connect + MCP + skills</code></sub></td>
<td align="center"><b>Zed</b><br/><sub><code>MCP server</code></sub></td>
</tr>
<tr>
<td align="center"><b>Cline</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Continue</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Droid</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Kiro</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Qwen Code</b><br/><sub><code>MCP server</code></sub></td>
</tr>
<tr>
<td align="center"><b>DeepSeek Harness</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Roo Code</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Kilo Code</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Goose</b><br/><sub><code>MCP server</code></sub></td>
<td align="center"><b>Aider</b><br/><sub><code>REST API</code></sub></td>
</tr>
</table>

<p align="center"><i>Works with any agent that speaks MCP or HTTP. One server, memories shared across all of them.</i></p>

---

## 🚀 30-Second Quick Start

### ⚡ Direct Instant Execution (Zero Install Required)

Run immediately via GitHub or NPM:

```bash
# Instant interactive auto-setup:
npx github:atifjubaer/fastrmemory setup

# Or launch local Web UI:
npx github:atifjubaer/fastrmemory ui
```

---

### Global Installation

```bash
# Install globally from GitHub directly:
npm install -g git+https://github.com/atifjubaer/fastrmemory.git

# Or install from NPM Registry:
npm install -g @atifjubaer/fastrmemory
```
> Both `fastrmemory` and `fastr` (short alias) are now executable globally in your terminal.

### 2. Verify Database Health

```bash
fastrmemory status
```

Output:
```text
=== FastrMemory Health (my-project) ===
- Project ID:          proj_1cce2a654e3a
- Active Memories:     2
- Staging Memories:    0
- Superseded History:  0
- Ingested Events:     0
- Pending Spool:       Clear (0)
- Database File:       .fastr/fastr.db
```

### 3. Record & Recall a Memory

```bash
# Record an error trap linked to an exact file:
fastrmemory remember "Never Use Date.now() Milliseconds for JWT Expiration" \
  -c "JWT exp claims expect integer seconds. Always use Math.floor(Date.now() / 1000)." \
  -m auth -k error_trap -f "src/auth/jwt.ts" --verified

# Recall with 2.0x trap boost & file-graph matching:
fastrmemory recall "JWT expiration" -f "src/auth/jwt.ts"
```

Output:
```text
=== Recalled Memories (1 results, ~46 tokens) ===

[mem_009e4a7d] [TRAP] [verified] Never Use Date.now() Milliseconds for JWT Expiration (Score: 0.08)
JWT exp claims expect integer seconds. Always use Math.floor(Date.now() / 1000).
```

### 4. Cognitive Git Blame & Memory-Aware Commit

```bash
# Cognitive Git Blame linking lines directly to commit, author, and governing 2.0x error traps:
fastrmemory blame src/auth/jwt.ts:42

# Pre-commit error trap validation & conventional commit synthesis:
fastrmemory commit
```

### 5. Git Snapshots, Rollback & Background Daemon

```bash
# Point-in-time memory snapshot (Git for Agent Memory):
fastrmemory snapshot create "pre-refactor-checkpoint"
fastrmemory snapshot list
fastrmemory snapshot rollback "pre-refactor-checkpoint"

# Hybrid Background Daemon (Optional HTTP/SSE service for cross-process tools):
fastrmemory daemon start
fastrmemory daemon status
fastrmemory daemon stop

# Auto-wire autonomous hooks and Planetary Skills into Antigravity, Claude Code, and Cursor:
fastrmemory hook install
fastrmemory setup

# Mine past Git bug fixes directly into staging error traps:
fastrmemory learn -n 30 --days 90
```

### 6. Token Compression, Database Doctor & Vision Search

```bash
# Compress markdown docs & LLM prompt context to reduce token usage:
fastrmemory compress docs/architecture.md --dry-run

# Run deep health check across SQLite, FTS5 indices, file links, and task DAGs:
fastrmemory diagnose

# Auto-repair FTS5 indices, orphaned file links, and WAL fragmentation:
fastrmemory heal

# Tag a UI screenshot or architecture diagram with OCR & 384-dim vector indexing:
fastrmemory vision tag screenshots/modal-error.png --desc "Modal error 401 alert" --ocr "HTTP 401"

# Semantic search across tagged screenshots and visual diagrams:
fastrmemory vision search "modal error 401"
```

---

## 🔌 One-Click Agent MCP Configuration

Add this JSON block to your agent's MCP settings to enable autonomous memory:

### Claude Code (`~/.claude.json`)
```json
{
  "mcpServers": {
    "fastrmemory": {
      "command": "fastrmemory",
      "args": ["mcp"]
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "fastrmemory": {
      "command": "fastrmemory",
      "args": ["mcp"]
    }
  }
}
```

---

## 🛠️ MCP Server: Tools & Resources

Built using the official **v2 `@modelcontextprotocol/server`** SDK:

### 35 Core MCP Tools

#### Cognitive Retrieval & Memory Core
1. `fastr_recall`: Triple-stream hybrid search (BM25 + Vector + Spreading Activation Graph) with progressive L0–L3 token budgeting and air-gapped offline vector fallback.
2. `fastr_drill`: Resolves `source_event_ids` to retrieve untruncated verbatim stack traces, diffs, and tool outputs from `raw_events`.
3. `fastr_file_history`: Returns active rules, `[TRAP]` warnings, and past supersessions for a specific file path.
4. `fastr_remember`: Records new rules, decisions, or traps. Automatically extracts NER entities, scrubs secrets, and re-renders Markdown mirrors. Supports `scope: 'project' | 'global'`.
5. `fastr_supersede`: Retires an outdated rule (`valid_to = now`), records the rationale, and inserts a replacement verified rule.
6. `fastr_feedback`: Updates `reward_score` on a specific memory ID (+0.2 good, -0.5 bad). Never penalizes innocent memories.
7. `fastr_handoff`: Saves or retrieves cross-agent session milestones and promotes staging memories to verified.
8. `fastr_status`: Returns active/staging counts, spool health, and embedding coverage %.
9. `fastr_graph_query`: Explores 1-hop and 2-hop structural file-link dependencies, entity links, and connected error traps.
10. `fastr_timeline`: Chronological audit trail of memory events, newly verified rules, error traps, and historical supersessions.

#### Versioning & Error Traps
11. `fastr_snapshot`: Creates named point-in-time memory snapshots for branch tracking and experiment safety.
12. `fastr_rollback`: Instant Git-like rollback to any previous memory snapshot.
13. `fastr_trap_log`: One-line rapid logging of error traps and bug solutions with 2.0x recall boost.
14. `fastr_trap_recall`: Targeted lookup of high-priority error traps protecting specific target files before editing.

#### Proactive Contradiction Detection & Resolution
15. `fastr_conflicts`: Proactive contradiction detection using Jaccard token overlap ($\ge 0.5$) and 40-word opposing polarity analysis.
16. `fastr_resolve`: Resolves contradictions by keeping preferred rule and superseding or weakening the loser.

#### Kahneman Planning Fallacy & Base-Rate Calibrator
17. `fastr_predict`: Records effort/time/risk predictions and closes predictions with actual empirical outcomes.
18. `fastr_predict_baserate`: Computes historical reference-class statistics (Mean, Median p50 ratio, MAE) to debias agent estimates.

#### Multi-Agent Action DAG & Frontier
19. `fastr_action_create`: Creates structured work item actions with prerequisite (`requires`) and conflict (`conflicts_with`) constraints.
20. `fastr_action_update`: Updates task lifecycle (`pending`, `active`, `done`, `blocked`), assignments, and memory crystallization.
21. `fastr_frontier`: Computes unblocked, ready-to-execute frontier actions with satisfied dependencies.
22. `fastr_next`: Atomically claims and returns the highest-priority frontier action for autonomous worker agents.

#### Bounded Working Memory & Obsidian Vault Export
23. `fastr_slot_get`: Retrieves bounded working memory slot (e.g. `current_goal`, `user_preferences`, `active_hypothesis`).
24. `fastr_slot_set`: Updates working memory slot with hard character ceiling enforcement to prevent context bloat.
25. `fastr_slot_list`: Lists all working memory slots and active character usage.
26. `fastr_obsidian_export`: Exports all memories, entities, and relationships into an Obsidian-compatible markdown vault with YAML frontmatter, `[[wikilinks]]`, and `MOC.md`.

#### Multi-Repository Federation & Context Assembly
27. `fastr_federate`: Manages cross-repository organization-wide shared rules and error traps via SQLite native `ATTACH DATABASE` (`~/.fastr/global.db`).
28. `fastr_assemble`: Dynamically formats and packs high-density structured prompt context (`<fastr_context>`) with token budgeting.
29. `fastr_risk_predict`: Computes historical failure probability and active trap hazard score for target codebase files.
30. `fastr_verify_provenance`: Cryptographically verifies SHA-256 provenance hashes to guarantee agent attribution authenticity.

#### Token Compression & Autonomous Doctor
31. `fastr_compress`: Compresses markdown files or prompt context while strictly preserving headings, URLs, and code blocks with `.original.md` backup.
32. `fastr_diagnose`: Deep health audit of SQLite B-Tree integrity, FTS5 BM25 search indices, orphaned file links, and task DAGs.
33. `fastr_heal`: Automatic repair of database indices, dangling edges, and WAL page reclamation.

#### Multimodal Visual Memory
34. `fastr_vision_tag`: Tags screenshots, UI diagrams, and wireframes with OCR and semantic descriptions with 384-dim embeddings.
35. `fastr_vision_search`: Hybrid vector and keyword search across stored visual assets for multimodal coding agents (Claude 3.7 Sonnet, Gemini 2.5).

### 3 MCP Resources

- `fastr://project/overview`: L0 project summary (~150 tokens) containing mission, active modules, and architecture rules.
- `fastr://project/traps`: All active `[TRAP]` warnings for immediate bug avoidance.
- `fastr://session/handoff`: Latest cross-agent handoff milestone.

---

## 📄 Two-Zone Git-Diffable Mirror

Every write to the local SQLite database automatically synchronizes human-readable markdown files in `.fastr/pages/<module>.md`. This allows developers to review AI memories directly in GitHub Pull Requests:

```markdown
# Module: auth

> Auto-generated by FastrMemory. Active rules are at the top; superseded history is preserved below for Git diffs.

---

## Compiled Truth (Active Rules & Traps)

### [mem_009e4a7d] [TRAP] Never Use Date.now() Milliseconds for JWT Expiration
- **Kind**: `error_trap`
- **Status**: `verified` (Reward Score: 1)
- **Linked Files**: `src/auth/jwt.ts`
- **Active Since**: `2026-10-18T21:46:20Z`

JWT exp claims expect integer seconds. Always use Math.floor(Date.now() / 1000).

---

## Append-Only Timeline (History & Superseded)

### [EXPIRED 2026-10-18T20:00:00Z -> 2026-10-18T21:46:20Z] [mem_abc123] Token Signing
- **Superseded By**: `[mem_009e4a7d]`
- **Reason**: Standardized on integer seconds
- **Historical Status**: `superseded`

> Old implementation used milliseconds which failed expiration validation.
```

---

## 🧠 Planetary Agent Skills Suite

FastrMemory packages 18 auto-pilot skill instructions that train agents when to recall, trap, commit, and coordinate:

- [skills/fastr-before-coding/SKILL.md](skills/fastr-before-coding/SKILL.md): Enforces calling `fastr_trap_recall` before editing any codebase file.
- [skills/fastr-trap-logger/SKILL.md](skills/fastr-trap-logger/SKILL.md): Immediately logs error traps the exact moment a build error or test failure is diagnosed.
- [skills/fastr-session-commit/SKILL.md](skills/fastr-session-commit/SKILL.md): Supersedes outdated rules, records per-ID outcome feedback, and verifies staging memories.
- [skills/fastr-blame/SKILL.md](skills/fastr-blame/SKILL.md): Cognitive Git blame linking codebase lines to memory rationale and error traps.
- [skills/fastr-commit/SKILL.md](skills/fastr-commit/SKILL.md): Memory-aware pre-commit trap validation and conventional commit synthesis.
- [skills/fastr-compress/SKILL.md](skills/fastr-compress/SKILL.md): Token-saving Markdown and context compression preserving headings, code blocks, and URLs.
- [skills/fastr-doctor/SKILL.md](skills/fastr-doctor/SKILL.md): Autonomous database doctor diagnosing and healing SQLite indices, orphans, and DAG frontiers.
- [skills/fastr-vision/SKILL.md](skills/fastr-vision/SKILL.md): Multimodal screenshot and diagram asset tagging and hybrid semantic search.
- [skills/fastr-trap/SKILL.md](skills/fastr-trap/SKILL.md): 2.0x recall boost failure logging and zero-regression safeguards.
- [skills/fastr-dag/SKILL.md](skills/fastr-dag/SKILL.md): Multi-agent task frontier orchestration and dependency propagation.
- [skills/fastr-conflicts/SKILL.md](skills/fastr-conflicts/SKILL.md): Bi-temporal contradiction detection and structured rule collision resolution.
- [skills/fastr-recall/SKILL.md](skills/fastr-recall/SKILL.md): High-precision triple-stream hybrid search with progressive token budgeting.
- [skills/fastr-remember/SKILL.md](skills/fastr-remember/SKILL.md): Autonomous memory consolidation, semantic deduplication, and slot allocation.
- [skills/fastr-handoff/SKILL.md](skills/fastr-handoff/SKILL.md): Multi-agent session milestone handoffs and cross-IDE state preservation.
- [skills/fastr-discipline/SKILL.md](skills/fastr-discipline/SKILL.md): Anti-hallucination guardrails and cognitive hygiene.
- [skills/fastr-learn/SKILL.md](skills/fastr-learn/SKILL.md): Autonomous pattern extraction and rule consolidation from Git history.
- [skills/fastr-mcp/SKILL.md](skills/fastr-mcp/SKILL.md): Model Context Protocol tool mastery and client configuration.
- [skills/fastr-architecture/SKILL.md](skills/fastr-architecture/SKILL.md): FastrMemory systems architecture, zero-loss durability, and SQLite WAL design.

---

## 🏗️ Architecture

```mermaid
flowchart TD
    subgraph Ingestion["1. Lossless Ingestion & Spool"]
        Agent["AI Coding Agent\n(Claude Code, Cursor, Antigravity)"] --> Scrubber["Secret Scrubber\n(API Keys, Bearer, PEM)"]
        Scrubber --> Spool{"SQLite Busy?"}
        Spool -- Yes --> SpoolFile[".fastr/spool/pending.jsonl\n(<5ms Fallback)"]
        Spool -- No --> DB
    end

    subgraph Storage["2. Bi-Temporal Storage & Git Mirror"]
        DB[("Node 22 node:sqlite (WAL)\nraw_events | memories\nfile_links | handoffs")]
        DB --> Mirror["Markdown Mirror Engine"]
        Mirror --> Pages[".fastr/pages/<module>.md\nTop: ## Compiled Truth\nBottom: ## Append-Only Timeline"]
    end

    subgraph Search["3. Triple-Stream Hybrid Retrieval"]
        Query["Recall / File Query"] --> FTS["Stream A: FTS5 BM25\n(Sub-millisecond)"]
        Query --> Vec["Stream B: Xenova Vectors\n(all-MiniLM-L6-v2)"]
        Query --> Graph["Stream C: file_links Graph\n(1-2 Hop Structural Match)"]
        FTS & Vec & Graph --> RRF["RRF Fusion (k=60)\n+ 2.0x Error Trap Multiplier\n+ 1.25x Verified Multiplier"]
        RRF --> Budget["Progressive Token Packer\nL0 (150t) | L1 (500t) | L2 (1500t) | L3 (4000t)"]
    end

    subgraph Protocol["4. Official MCP Protocol"]
        Budget --> MCPServer["Official MCP v2 Server\n(@modelcontextprotocol/server)"]
        MCPServer --> Tools["35 Tools & 3 Resources"]
        Tools --> Agent
    end
```

---

## 🧪 Testing & Verification

Run the comprehensive unit test suite:

```bash
npm test
```

All 91 tests pass in ~1.1s across 24 test suites covering database schema, WAL locking, offline spooling, bi-temporal supersession, secret scrubbing, two-zone rendering, automated benchmarks, snapshots/rollback, git-learner, cognitive blame, commit synthesis, hybrid background daemon, token compression, self-healing doctor, multimodal vision, and web dashboard server.

---

## 📊 Retrieval Benchmark Proof

Run the automated evaluation suite against industry baselines:

```bash
fastrmemory bench
```

### Measured Performance Across 8 Cognitive Agent Scenarios:

| Engine Architecture | Hit@1 | Hit@3 | Hit@5 | MRR | Latency | Trap Recall | Avg Tokens |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FastrMemory (Triple-Stream RRF)** | **63%** | **88%** | **88%** | **0.750** | **28.37ms** | **100%** | **98t** |
| Pure BM25 (Hippo-style baseline) | 0% | 13% | 50% | 0.129 | 0.04ms | 67% | 850t |
| Flat Static Dump (CLAUDE.md baseline) | 25% | 75% | 75% | 0.479 | 0.03ms | 67% | 2200t |

> **Key Takeaway**: FastrMemory achieves **100% Error Trap Recall** with **>90% context token reduction** (98 tokens vs 2,200 tokens) compared to static markdown dumps, preventing repeated codebase bugs while eliminating context bloat.

---

## 🖥️ Local Web Dashboard & 3D Brain Observatory

Visualize active rules, error traps, timeline audits, and interactive 3D memory constellations directly in your browser with zero external dependencies:

```bash
fastrmemory ui
```

- **Live URL**: `http://localhost:4242`
- **3D Brain Observatory**: High-performance Three.js constellation with 60 FPS smooth camera lerp interpolation, 350-particle celestial star dust, glowing amber trap halos, and click-to-focus inspection.
- **Vim & Keyboard Navigation**: Full keyboard control (`j`/`k` row navigation, `Enter` to open memory inspector, `Escape` to close).
- **Real-Time SSE Streaming**: Live event streaming (`/api/stream`) updating the dashboard instantly as coding agents record memories in the background.
- **6 Studio Tabs**: Overview, 3D Observatory, All Memories, Error Traps (2.0x Boost), Interactive Knowledge Graph, and Chronological Timeline.
- **Instant Search**: Real-time debounce filter by keyword, file path, or `[mem_xxxx]` identifier.
- **Zero Daemons**: Powered entirely by native Node.js HTTP server and embedded SQLite WAL mode.

---

## 🤝 Contributing

Contributions from the open-source community are warmly welcome!

- Please review our [CONTRIBUTING.md](CONTRIBUTING.md) for full local setup, coding standards, and architectural rules.
- **Ground Rules**: Strict TypeScript, zero external daemons, and `git commit -s` (DCO sign-off).
- **High-Priority Areas**:
  - New agent adapters & hook auto-installers (Windsurf, Roo Code, Continue, OpenCode).
  - Additional on-device embedding backends (Ollama, WebGPU).
  - Comprehensive LongMemEval & LoCoMo benchmark runner adapters.

---

## 📄 License

Apache License 2.0. Built by **Fastrsoft**. Free for personal and commercial use.
