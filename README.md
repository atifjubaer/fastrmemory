# FastrMemory (`@fastrsoft/fastrmemory`)

> **High-Performance Cognitive Agent Memory Engine**  
> *Zero Daemon • Native Node 22 `node:sqlite` • Bi-Temporal Validity • Triple-Stream RRF • Official MCP v2*

---

## Overview

**FastrMemory** is built by **Fastrsoft** as the next-generation memory engine for autonomous AI coding agents (Claude Code, Cursor, Windsurf, Codex, OpenCode).

It combines the best architectural patterns of top 2026 memory systems while eliminating their failure modes:
1. **Fixes Hippo Memory**: Replaces lossy `hippo sleep` blending with lossless `raw_events`, replaces time-based decay with bi-temporal `valid_from`/`valid_to` intervals, and replaces batch penalties with per-ID outcome feedback (`[mem_xxxx]`).
2. **Fixes AgentMemory**: Replaces the multi-port Rust daemon (`iii-engine`) with zero-daemon native Node 22 `node:sqlite` (WAL mode) running 100% natively on Windows, macOS, and Linux without Docker or WSL2.
3. **Adopts GBrain**: Generates Two-Zone human-readable, git-diffable Markdown mirrors (`.fastr/pages/<module>.md`) with `## Compiled Truth` (top) and `## Append-Only Timeline` (bottom).
4. **Adopts Graphiti**: Implements structural 1–2 hop file and symbol graph links (`file_links`).
5. **Adopts MemPalace**: Enforces progressive L0–L3 context token budgeting (~150 tokens wake-up cost).

---

## Documentation Index

All conversation histories, design analyses, specifications, and build prompts are organized in `docs/`:

- [ARCHITECTURE.md](docs/ARCHITECTURE.md): Executive summary, 5 Hippo failure modes, competitor benchmarks, 4-layer architecture, 7 non-negotiable rules, scoring formula.
- [SPECIFICATION.md](docs/SPECIFICATION.md): Exact Node 22 SQLite schema (`src/db/schema.ts`), 8 MCP tools, 3 MCP resources, 3 bundled agent skills, token levels.
- [MASTER_BUILD_PROMPT.md](docs/MASTER_BUILD_PROMPT.md): The complete Master Build Prompt for Claude Code / autonomous agents to build the production package.
- [01-gemini-agent-memory-vs-hippo-deep-dive.md](docs/conversations/01-gemini-agent-memory-vs-hippo-deep-dive.md): The full 8-turn Gemini deep-dive chat that designed FastrMemory.
- [02-antigravity-066f9621-session-transcript.md](docs/conversations/02-antigravity-066f9621-session-transcript.md): The full session transcript from Antigravity session `066f9621-e68e-4685-ab1b-51c75f266942`.

---

## Planned Directory Structure

```text
fastrmemory/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SPECIFICATION.md
│   ├── MASTER_BUILD_PROMPT.md
│   └── conversations/
│       ├── 01-gemini-agent-memory-vs-hippo-deep-dive.md
│       └── 02-antigravity-066f9621-session-transcript.md
├── bin/
│   └── fastr.ts                  # CLI entrypoint
├── src/
│   ├── index.ts                  # Public library exports
│   ├── config.ts                 # Project configuration & paths
│   ├── db/
│   │   ├── schema.ts             # Node 22 node:sqlite DatabaseSync schema
│   │   ├── spool.ts              # Offline .fastr/spool/pending.jsonl spooler
│   │   └── repository.ts         # SQLite CRUD operations
│   ├── search/
│   │   ├── embeddings.ts         # Local Xenova/all-MiniLM-L6-v2 vectors
│   │   ├── hybrid-rrf.ts         # BM25 + Vector + Graph RRF (k=60)
│   │   └── budget.ts             # L0-L3 progressive token budget packer
│   ├── mirror/
│   │   └── markdown-pages.ts     # Two-Zone Markdown page renderer
│   ├── privacy/
│   │   └── scrubber.ts           # Secret & credential scrubber
│   ├── hooks/
│   │   ├── installer.ts          # Agent hook auto-configuration
│   │   └── handlers.ts           # Real-time event interceptors
│   └── mcp/
│       ├── server.ts             # MCP v2 McpServer with 8 tools & 3 resources
│       ├── stdio.ts              # Stdio server transport
│       └── http.ts               # Optional Streamable HTTP transport
├── skills/
│   ├── fastr-before-coding/SKILL.md
│   ├── fastr-trap-logger/SKILL.md
│   └── fastr-session-commit/SKILL.md
└── tests/
    ├── schema.test.ts
    ├── hybrid-search.test.ts
    ├── bi-temporal.test.ts
    └── mcp-server.test.ts
```

---

## Immediate Next Step

To start Phase 1 (cloning competitor reference repos to study implementation patterns):
```bash
mkdir -p references
git clone --depth 1 https://github.com/kitfunso/hippo-memory.git references/hippo-memory
git clone --depth 1 https://github.com/rohitg00/agentmemory.git references/agentmemory
git clone --depth 1 https://github.com/modelcontextprotocol/typescript-sdk.git references/mcp-typescript-sdk
git clone --depth 1 https://github.com/lhl/agentic-memory.git references/agentic-memory
```
