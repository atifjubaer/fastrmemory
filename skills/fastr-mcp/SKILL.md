---
name: fastr-mcp
description: Model Context Protocol (MCP) tool mastery, client configuration, and stream transport.
---

# FastrMemory Model Context Protocol (MCP) Mastery

## Overview
Comprehensive reference for FastrMemory's 27 native MCP tools, stdio transport, and real-time Server-Sent Events (SSE) telemetry.

## Core Tool Categories & Signatures

### 1. Retrieval & Exploration
- `fastr_recall(query, limit?, minScore?, tags?)`: Triple-stream RRF search across BM25, Trigram vector, and Graph walk.
- `fastr_drill(memoryId, depth?)`: Associative expansion of related entities and citations.
- `fastr_file_history(filePath, limit?)`: Complete memory lineage of edits and decisions for a specific file.
- `fastr_timeline(limit?, category?)`: Chronological feed of memories and system events.

### 2. Error Defense & Safety
- `fastr_trap_recall(files)`: Instant pre-edit check returning active 2.0x error traps for target files.
- `fastr_trap_log(file, error, cause, fix, tags?)`: Quarantine and record failure points with 2.0x recall boost.
- `fastr_risk_predict(files, proposedChanges?)`: Baseline failure risk probability before modifying sensitive files.

### 3. Action DAG & Multi-Agent Coordination
- `fastr_action_create(actionId, title, dependencies?, tier?, metadata?)`: Register a milestone or task in the DAG.
- `fastr_action_update(actionId, status, output?)`: Update task status (`pending` | `running` | `completed` | `failed`).
- `fastr_frontier()`: Retrieve all currently unblocked, ready-to-execute tasks.
- `fastr_next()`: Atomically lock the next highest-priority task.

### 4. Memory Lifecycle & Synchronization
- `fastr_remember(content, category, tags?, tier?)`: Store durable learning.
- `fastr_supersede(oldId, newContent, reason)`: Replace outdated memory while preserving bi-temporal lineage.
- `fastr_feedback(memoryId, delta)`: Increment/decrement rule weight (+0.2 or -0.5).
- `fastr_handoff(verifyStaging?, summary?, nextAction?)`: Graduate session memories and export compact handoff artifact.
- `fastr_slot_get(key)` / `fastr_slot_set(key, value)` / `fastr_slot_list()`: Key-value workspace configuration.
- `fastr_federate(remoteUrl, direction)`: Peer-to-peer memory sync with remote team instances.
- `fastr_obsidian_export(outputDir)`: Export entire memory vault as Obsidian-compatible bidirectional markdown wikilinks.
