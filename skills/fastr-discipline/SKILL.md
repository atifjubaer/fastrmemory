---
name: fastr-discipline
description: Anti-hallucination and memory hygiene rules for autonomous coding agents.
---

# FastrMemory: Memory Discipline & Anti-Hallucination

## Ground Truth Rules
1. **Never Hallucinate Past Rules**: If `fastr_recall` returns no matches, state clearly that no prior rules exist. Do not invent project conventions.
2. **Never Ignore `[TRAP]` Warnings**: Recalled items tagged with `[TRAP]` are verified past failure points. You must explicitly address how your plan avoids them.
3. **No Redundant Duplication**: Before recording a new rule, verify if a similar rule already exists in that module. If an existing rule is being updated, use `fastr_supersede` instead of creating duplicates.
4. **Rate Honestly**: Call `fastr_feedback` (+0.2 / -0.5) with honest outcome assessments. If a recalled rule led you down a dead-end, penalize it so the team's engine learns.
