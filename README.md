<div align="center">

# ⚡ FastrMemory

### High-Performance Cognitive Agent Memory Engine
**Zero Daemon • Native Node 22+ `node:sqlite` • Bi-Temporal Git Sync • Triple-Stream RRF • Official MCP v2**

[![CI](https://github.com/atifjubaer/fastrmemory/actions/workflows/ci.yml/badge.svg)](https://github.com/atifjubaer/fastrmemory/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.16.0-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Protocol](https://img.shields.io/badge/Protocol-MCP%20v2-7C3AED?style=flat-square)](https://modelcontextprotocol.io)
[![Tests](https://img.shields.io/badge/Tests-21%20Passed-brightgreen?style=flat-square)](tests/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Architecture](https://img.shields.io/badge/Architecture-Zero--Daemon%20WAL-orange?style=flat-square)](#-key-architectural-pillars)

<p align="center">
  <a href="#-overview">Overview</a> &bull;
  <a href="#-why-fastrmemory-vs-competitors">vs Competitors</a> &bull;
  <a href="#-works-with-25-agents">Supported Agents</a> &bull;
  <a href="#-30-second-quick-start">Quick Start</a> &bull;
  <a href="#-mcp-server-tools--resources">MCP Tools</a> &bull;
  <a href="#-two-zone-git-diffable-mirror">Git Sync</a> &bull;
  <a href="#-bundled-agent-skills">Agent Skills</a> &bull;
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

| Capability | FastrMemory (`@fastrsoft`) | agentmemory | Memoria (MatrixOrigin) | mem0 (63K ⭐) | Letta / MemGPT | Hippo Memory | Built-in (`CLAUDE.md`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Daemon Overhead** | **Zero daemon** (Native `node:sqlite`) | Heavy Rust daemon (4 ports) | MatrixOne DB or Cloud API | Cloud / Vector DB | Full runtime daemon | Zero daemon | Static file |
| **Windows Support** | **100% Native Windows, Mac, Linux** | Fails without WSL2/Docker | Requires Docker/Cloud | Python setup | Complex setup | Native Node.js | Native OS |
| **Data Retention** | **Verbatim `raw_events` + Bi-Temporal** | Raw transcript bloat | Git-like DB snapshots | Passive extraction | Agent-managed | Lossy sleep merges | Manual editing |
| **Retrieval Power** | **Triple-Stream RRF ($k=60$) + File Graph** | BM25 + Vector + Graph RRF | Vector + Fulltext | Vector + Graph | Vector (archival) | BM25 only | Linear grep |
| **Git & PR Review** | **Two-Zone Git-diffable Markdown** | Web dashboard only | Web / CLI | Cloud dashboard | Web dashboard | Raw markdown dumps | Static text |
| **Feedback Multiplier**| **Per-ID attribution (`[mem_xxxx]`)** | Passive telemetry only | Edge re-weighting | Manual edit | None | Batch penalty | None |
| **External Dependencies**| **Zero** (Standard Node.js) | Compiled Rust binary | MatrixOne / Docker | Qdrant / pgvector | PostgreSQL | None | None |
| **Token Budgeting** | **Progressive L0–L3 (~150 to 4000t)** | ~1,900t / session | Uncapped | Varies | Core context | Varies | 22k+ tokens |

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

### 1. Install & Link Globally

```bash
# In your fastrmemory repository:
npm install
npm run build
npm link
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

### 8 Core MCP Tools

1. `fastr_recall`: Triple-stream hybrid search (BM25 + Vector + Graph) with progressive token budgeting.
2. `fastr_drill`: Resolves `source_event_ids` to retrieve untruncated verbatim stack traces, diffs, and tool outputs from `raw_events`.
3. `fastr_file_history`: Returns active rules, `[TRAP]` warnings, and past supersessions for a specific file path.
4. `fastr_remember`: Records new rules, decisions, or traps. Automatically scrubs secrets and re-renders Two-Zone Markdown mirrors.
5. `fastr_supersede`: Retires an outdated rule (`valid_to = now`), records the rationale, and inserts a replacement verified rule.
6. `fastr_feedback`: Updates `reward_score` on a specific memory ID (+0.2 good, -0.5 bad). Never penalizes innocent memories.
7. `fastr_handoff`: Saves or retrieves cross-agent session milestones and promotes staging memories to verified.
8. `fastr_status`: Returns active/staging counts, spool health, and embedding coverage %.

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

## 🧠 Bundled Agent Skills

FastrMemory packages 7 auto-pilot skill instructions that train agents when to use memory tools:

- [skills/fastr-before-coding/SKILL.md](skills/fastr-before-coding/SKILL.md): Enforces calling `fastr_recall` and reviewing `[TRAP]` warnings before editing any file.
- [skills/fastr-trap-logger/SKILL.md](skills/fastr-trap-logger/SKILL.md): Immediately logs error traps the exact moment a build error or test failure is diagnosed.
- [skills/fastr-session-commit/SKILL.md](skills/fastr-session-commit/SKILL.md): Supersedes outdated rules, records per-ID outcome feedback, and verifies staging memories after tests pass.
- [skills/fastr-recall/SKILL.md](skills/fastr-recall/SKILL.md): High-precision hybrid search, progressive token budgeting, and `fastr_drill` for verbatim evidence.
- [skills/fastr-remember/SKILL.md](skills/fastr-remember/SKILL.md): Curated ingestion protocol with automatic secret scrubbing and module tagging.
- [skills/fastr-discipline/SKILL.md](skills/fastr-discipline/SKILL.md): Anti-hallucination guardrails and ground-truth validation rules.
- [skills/fastr-handoff/SKILL.md](skills/fastr-handoff/SKILL.md): Multi-agent session milestone handoffs and cross-IDE state preservation.

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
        MCPServer --> Tools["8 Tools & 3 Resources"]
        Tools --> Agent
    end
```

---

## 🧪 Testing & Verification

Run the comprehensive unit test suite:

```bash
npm test
```

All 21 tests pass in $<500\text{ms}$ across 6 test suites covering database schema, WAL locking, offline spooling, bi-temporal supersession, secret scrubbing, two-zone rendering, and MCP tool execution.

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
