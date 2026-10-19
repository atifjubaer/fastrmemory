---
name: fastr-conflicts
description: Bi-temporal contradiction detection and structured rule collision resolution.
---

# FastrMemory Contradiction & Conflict Resolution

## Overview
Detects dialectical conflicts, mutually exclusive guidelines, and outdated architectural patterns stored across the project's memory store. Provides structured bi-temporal supersession to prevent conflicting agent behaviors.

## When to Invoke
- When two recalled memories give opposing instructions (e.g. "Use Jest" vs "Use Vitest").
- When a major refactoring fundamentally alters project architecture.
- When `fastr_conflicts` alerts to semantic collisions in the memory graph.

## Workflow
1. **Detect Potential Collisions**:
   ```ts
   fastr_conflicts({ query: "testing framework" })
   ```
2. **Review Bi-temporal Lineage**:
   Inspect the conflicting memories, their recorded timestamps, and verification tiers.
3. **Resolve via Supersession**:
   Never silently delete historical memories. Call:
   ```ts
   fastr_supersede({
     oldId: "mem_jest_config",
     newContent: "Migrated to Vitest for ESM native testing. Do not invoke Jest.",
     reason: "ESM native compatibility upgrade"
   })
   ```
   This retains historical audit trails while redirecting all future retrievals to the active convention.
