# Antigravity Session Transcript: Agent Memory vs Hippo Memory

- **Session ID**: `066f9621-e68e-4685-ab1b-51c75f266942`
- **Project**: fastrmemory
- **Date**: October 18, 2026

---

## User Request (Step 0)

```text
https://github.com/rohitg00/agentmemory

This is the agent memory. I've been using Hippo memory for a long time but I saw this recently. What is the main difference and how can I improve my productivity agent memory? 

https://github.com/kitfunso/hippo-memory
```

## Assistant Response (Step 25)

```bash
# Check your current Hippo store health in 10 seconds:
hippo status
```

### The Core Difference

**Hippo** is a **biologically inspired cognitive layer** (SQLite + Git-friendly Markdown mirrors, decay, reinforcement from outcomes, and sleep consolidation). It requires zero persistent daemons.

**AgentMemory** is an **event-streaming telemetry daemon** (Rust `iii-engine`, background services on 4 ports, real-time web UI). It focuses on passive auto-capturing every tool call and query with 3-way hybrid search (BM25 + Vector + Graph).

---

### Comparison Matrix

| Feature | Hippo Memory (`kitfunso/hippo-memory`) | AgentMemory (`rohitg00/agentmemory`) |
| :--- | :--- | :--- |
| **Architecture** | Lightweight CLI + stdio MCP; pure SQLite + Markdown mirrors | Heavyweight daemon; pinned `iii-engine` (ports 3111, 3112, 3113, 49134) |
| **Capture Mode** | Curated & semi-automatic (`hippo remember`, `hippo decide`, Git scan) | Passive automatic (12 hooks intercept every prompt, tool call, and output) |
| **Search Engine** | BM25 out-of-the-box + optional local Transformers.js / Jev reranker | 3-way hybrid: BM25 + Dense Vector + Knowledge Graph (RRF fusion) |
| **Inspection** | CLI (`hippo inspect`, `hippo recall --why`) & raw Markdown files | Real-time web UI dashboard (port 3113) with session timeline replay |
| **Windows Support** | Native Node.js/SQLite | Requires WSL2, Docker, or manual `iii.exe` binary extraction |

---

### Key Trade-Offs

1. **Noise vs. Signal**: AgentMemory captures raw session transcripts automatically (higher token volume, needs aggressive compression). Hippo records curated lessons, errors, and ADRs (cleaner context, higher signal-to-noise ratio).
2. **Operational Overhead**: Hippo runs on demand as a stdio MCP or CLI without background processes. AgentMemory must keep an `iii-engine` daemon alive on multiple ports.
3. **Outcome Learning**: Hippo learns from results (`hippo outcome --good/--bad` boosts or demotes memories; `--error` doubles retention half-life). AgentMemory relies primarily on retrieval rank fusion.

---

### 4 Steps to Improve Your Agent Memory Productivity

Estimated time: 10 minutes.

1. **Enable local semantic embeddings in Hippo**:
   Run `npm install @huggingface/transformers` in your global npm root so Hippo switches from pure BM25 to hybrid semantic search with `all-MiniLM-L6-v2`.
2. **Automate error stickiness**:
   Always record debugging fixes with `--error` or `--tag error` so critical gotchas receive double the half-life and resist decay:
   ```bash
   hippo remember "Issue: Hook precedence conflict in WP REST API. Fix: Set priority 20" --error
   ```
3. **Use Working Memory for active multi-turn tasks**:
   Prevent polluting long-term memory with short-term task state:
   ```bash
   hippo wm push --scope repo --content "Step 2/4: Migrating database schema"
   ```
4. **Enforce session handoffs before quitting**:
   Capture current progress so the next session resumes immediately without re-explaining:
   ```bash
   hippo handoff create --summary "Refactored auth middleware" --next "Add rate limiting"
   ```

---

### Next Action (< 2 minutes)

Run this command to inspect your recent lessons and verify if semantic embeddings are currently active:

```bash
hippo doctor
```

---

## User Request (Step 26)

```text
I'm still confused. What should I do? I don't have any idea. I was thinking, for the last few months, I've been using Hippo memory. This Hippo does everything but what if I switch to Agent memory? Will I get better service? I want better service.
```

## Assistant Response (Step 27)

**Recommendation:** **Stay with Hippo Memory.** Switching to AgentMemory on Windows will give you more maintenance overhead, not better service.

```bash
# Verify your active Hippo setup right now:
hippo status
```

---

### Why AgentMemory Will NOT Give You Better Service

1. **Windows Breakage**: AgentMemory cannot auto-install its core engine (`iii-engine`) on native Windows. It requires running inside WSL2, Docker, or manually downloading and pinning `iii.exe`.
2. **Daemon Fragility**: AgentMemory requires a background daemon running on 4 open ports (`3111`, `3112`, `3113`, `49134`). If the daemon stops, memory fails silently. Hippo runs directly off SQLite files with zero background daemons.
3. **Context Noise vs. Signal**: AgentMemory captures raw session transcripts (every bash output and tool log), bloating agent context. Hippo records curated decisions, verified rules, and sticky bug fixes.
4. **Already Integrated**: You already have Hippo's MCP server and workflow active in your environment. Switching means discarding your accumulated SQLite memories and learning patterns.
5. **No Outcome Feedback**: AgentMemory stores what happened, but doesn't track whether an action succeeded or failed. Hippo's `outcome` and `--error` multipliers actively prevent agents from repeating bad patterns.

---

### When AgentMemory Is Actually Better

Switch to AgentMemory **only** if:
- You work inside WSL2 or macOS.
- You want a web-based visual dashboard (port 3113) with a timeline scrub bar to watch replays of your agent's past keystrokes.
- You refuse to run memory commands and demand 100% passive recording of every raw prompt.

---

### 3 Steps to Get "Better Service" from Hippo Immediately

Total time: 4 minutes.

1. **Turn on automatic session capture**:
   Ensure Hippo hooks into your agent sessions so you don't have to record manually:
   ```bash
   hippo init
   ```
2. **Check for conflicting or stale rules**:
   Inspect if old, contradictory memories are confusing your agent:
   ```bash
   hippo conflicts
   ```
3. **Clean up and consolidate memory store**:
   Prune decayed trivia and merge related experiences into permanent patterns:
   ```bash
   hippo sleep
   ```

---

### Next Action (< 2 minutes)

Run sleep to consolidate your memory store and see what is currently active:

```bash
hippo sleep
```

---

## User Request (Step 28)

```text
https://share.gemini.google/w0VmLi8d2qeM

read all the previus conversation you will find the contex
```

## Assistant Response (Step 69)

```bash
# 1. Stop Hippo from destroying granular details during sleep:
# Set sleep consolidation to keep original episodes instead of blending them
hippo config set consolidation.pruneOriginals false
```

---

### The Big Picture (From Your Previous Chat)

You are 20 years old with basic coding knowledge. You noticed Hippo making mistakes because of **5 flaws in its code**:
1. **The Blender (`hippo sleep`)**: Merges 3 episodic memories into 1 vague summary and deletes the original detail (costing 3.6% in accuracy).
2. **Disappearing Ink (Decay)**: Architectural rules fade away if not queried every few weeks.
3. **Exact-Word Matching (BM25 only)**: If your prompt uses different words than your saved note, Hippo finds 0 results.
4. **Late Capture (SessionEnd regex)**: Only reads the last 20 messages at exit; misses everything from the middle of long sessions.
5. **Classroom Punishment (`hippo outcome --bad`)**: Penalizes all 5 recalled memories at once, even if only 1 was wrong.

---

### Why Switching to AgentMemory is the Wrong Move

1. **Windows Friction**: AgentMemory requires a Rust daemon (`iii.exe`) that cannot auto-install on Windows without Docker or WSL2.
2. **Daemon Overhead**: Keeps 4 background ports open (`3111`, `3112`, `3113`, `49134`); if the process dies, all memory stops.
3. **Context Pollution**: It logs every raw tool click and bash log, bloating your agent's token context with noise.
4. **Best Architecture**: Keep Hippo's zero-dependency SQLite + Markdown engine, but upgrade its settings and tools with patterns stolen from GBrain, Graphiti, and AgentMemory.

---

### 4 Steps to Transform Your Hippo into "Super-Hippo"

Total time: 10 minutes.

1. **Enable Local Semantic Embeddings** (Fixes exact-word matching):
   Installs local `all-MiniLM-L6-v2` so paraphrased queries match instantly:
   ```bash
   npm install -g @huggingface/transformers
   ```
2. **Disable Aggressive Decay** (Fixes disappearing ink):
   Keeps setup rules and architecture decisions active permanently:
   ```bash
   hippo config set defaultHalfLifeDays 3650
   ```
3. **Turn Off Destructive Merging**:
   Tells `hippo sleep` to never delete the original raw notes when creating patterns:
   ```bash
   hippo config set consolidation.mergeEpisodes false
   ```
4. **Rate Notes Individually, Never in Batches**:
   When an agent gives bad advice, punish only the specific memory ID:
   ```bash
   # Do this:
   hippo outcome --bad --id mem_abc123
   # Never do: hippo outcome --bad (which punishes the whole batch)
   ```

---

### Next Action (< 2 minutes)

Run this command to check your current Hippo configuration and verify your active parameters:

```bash
hippo config list
```

---
