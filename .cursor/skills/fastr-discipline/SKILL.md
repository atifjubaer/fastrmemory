---
name: fastr-discipline
description: Anti-hallucination and cognitive hygiene discipline for autonomous coding agents.
---

# FastrMemory Cognitive Agent Discipline

## Overview
Cognitive discipline protocol enforcing deterministic recall, zero-hallucination guarantees, error trap avoidance, and honest outcome calibration across all autonomous AI agent sessions.

## The 3 Invariant Cognitive Rules
1. **Pre-Edit Error Check**:
   Before modifying, creating, or refactoring any project file, you MUST call `fastr_trap_recall` with target file paths. If active `[TRAP]` records exist, you must formulate your implementation plan to strictly avoid those failure modes.
2. **Immediate Trap Logging**:
   The exact instant a test fails, a syntax error is discovered, or an unexpected library incompatibility occurs, you MUST call `fastr_trap_log`. This tags the failure with an immediate 2.0x recall boost to protect future agent turns.
3. **Session Verification & Staging Graduation**:
   At the end of every task or milestone, you MUST call `fastr_handoff` with `verifyStaging: true`. This graduates verified staging hypotheses into permanent project memory while archiving discarded dead-ends.

## Ground Truth Principles
- **No Inventions**: If `fastr_recall` returns zero results, acknowledge that no prior rules exist. Never invent project conventions or assume unspoken architectural patterns.
- **De-duplication**: Never create identical or overlapping rules. Call `fastr_conflicts` if proposing changes to existing conventions, and use `fastr_supersede` to preserve bi-temporal lineage.
- **Honest Feedback**: Call `fastr_feedback` (+0.2 on verified success, -0.5 on misleading guidance) so the project's memory weights continuously converge toward ground truth.
