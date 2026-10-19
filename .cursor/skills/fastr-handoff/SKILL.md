---
name: fastr-handoff
description: Structured agent session handoff, staging memory graduation, and context compaction.
---

# FastrMemory Session Handoff & Staging Graduation

## Overview
Generates zero-loss session compaction summaries, computes memory deltas, graduates staging hypotheses into permanent verified rules, and writes a handoff transcript for incoming agents.

## When to Invoke
- At the end of every significant work session or task completion.
- Prior to context window compaction (`/compact`) or agent handoff.
- When passing project state from one subagent to another.

## Workflow
1. **Pre-Handoff Verification**:
   Verify that all unit tests pass and active error traps were obeyed.
2. **Execute Handoff Tool**:
   ```ts
   fastr_handoff({
     verifyStaging: true, // Promotes staging hypotheses to verified tier
     summary: "Completed Phase 1 Planetary Skills and multi-IDE auto-installer.",
     nextAction: "Implement src/daemon/service.ts for background REST/SSE execution."
   })
   ```
3. **Inspect Handoff Artifact**:
   - `graduated_memories`: List of promoted rules.
   - `purged_deadends`: Staging hypotheses that failed verification.
   - `handoff_token`: Cryptographic hash binding the session lineage.
