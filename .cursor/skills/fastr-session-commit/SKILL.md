---
name: fastr-session-commit
description: Automatically triggers at task completion once automated tests pass, to verify staging memories, supersede changed rules, and record per-ID feedback.
---

# FastrMemory: Post-Task Commit Protocol

## Trigger Conditions
Execute this workflow when:
1. You have completed the user's task and all test suites pass.
2. An existing rule was modified or replaced by new architecture decisions.
3. You are preparing to yield control back to the user or another agent.

## Mandatory Steps

### 1. Supersede Changed Rules (If Applicable)
If your work invalidated an existing rule `[mem_xxxx]`, call `fastr_supersede`:

```json
{
  "oldMemoryId": "mem_xxxx",
  "newTitle": "Updated rule title",
  "newContent": "Updated standard or implementation rule",
  "reason": "Explain why the old rule was replaced"
}
```

### 2. Rate Recalled Memories
For every memory `[mem_yyyy]` that was injected or recalled during this session:
- If the advice was correct and helpful, call `fastr_feedback({ memoryId: "mem_yyyy", outcome: "good" })`.
- If the advice was outdated or misled the agent, call `fastr_feedback({ memoryId: "mem_yyyy", outcome: "bad", note: "Outdated pattern" })`.

### 3. Save Milestone Handoff & Verify Staging
Call `fastr_handoff` with `action: 'save'` and `verifyStaging: true`:

```json
{
  "action": "save",
  "taskTitle": "Feature name or bug fix summary",
  "summary": "Completed X, Y, Z. All tests passing.",
  "nextStep": "Immediate next action for the next turn/agent.",
  "activeFiles": ["src/module.ts"],
  "verifyStaging": true
}
```
This automatically promotes all staging memories from this task to `verified` status.
