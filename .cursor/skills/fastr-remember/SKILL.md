---
name: fastr-remember
description: Autonomous memory consolidation, semantic deduplication, and slot allocation.
---

# FastrMemory Remember Protocol

## Overview
Stores durable learnings, architecture patterns, user preferences, and implementation invariants into the project's SQLite WAL store with cryptographic provenance and bi-temporal timestamps.

## When to Invoke
- After successfully establishing a new architectural pattern.
- After discovering a subtle API constraint or library nuance.
- When the user explicitly states a project preference or guideline.

## Execution Rules
1. **Check for Redundancy First**:
   Always call `fastr_recall` with the prospective title before storing.
   - If an identical memory exists: skip storage or call `fastr_feedback`.
   - If a superseded version exists: call `fastr_supersede(oldId, newContent)`.
2. **Store Structured Memory**:
   Call `fastr_remember` with:
   - `content`: Clear, actionable, imperative rule or finding.
   - `category`: `architecture` | `convention` | `preference` | `bugfix` | `workflow`.
   - `tags`: Key searchable identifiers (e.g., `["auth", "fastify", "jwt"]`).
   - `tier`: `verified` (high confidence) or `staging` (experimental).
3. **Slot Allocation**:
   For key-value settings or project metadata (e.g., `active_model`, `target_node_version`), use `fastr_slot_set(key, value)`.
