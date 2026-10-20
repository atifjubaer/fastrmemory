---
name: fastr-session-commit
description: Use when a task or milestone is finished and tests pass, before handing control back to the user, or when you are about to run out of context. Rates the memories you used, supersedes rules your work invalidated, and saves a handoff that promotes this session's staging memories to verified.
---

# FastrMemory: Commit the Session

## When to use
- The task is done and the test suite passes.
- You are yielding to the user or another agent, or context is about to be compacted.
- You are resuming work and need to know where the last session stopped.

## Steps

1. **Supersede rules your change made obsolete** (keeps history, redirects future recall):
   ```js
   fastr_supersede({
     oldMemoryId: "mem_8f2a1c",
     newTitle: "Use Vitest for all unit tests",
     newContent: "The project migrated from Jest to Vitest for native ESM. Do not add Jest config.",
     reason: "Test runner migration",
     files: ["vitest.config.ts"]
   })
   ```

2. **Rate each memory you actually relied on** (per ID, never the whole batch):
   ```js
   fastr_feedback({ memoryId: "mem_3c9d0e", outcome: "good" })
   fastr_feedback({ memoryId: "mem_77ab12", outcome: "bad", note: "Described the old config loader" })
   ```

3. **Save the handoff and verify staging**:
   ```js
   fastr_handoff({
     action: "save",
     taskTitle: "Refresh-token rotation in auth guard",
     summary: "Added rotation and revocation list; all auth tests pass.",
     nextStep: "Wire revocation list cleanup into the nightly job.",
     activeFiles: ["src/auth/guard.ts", "src/auth/jwt.ts"],
     verifyStaging: true
   })
   ```
   Only pass `verifyStaging: true` when tests pass; it promotes every staging memory from this project to verified.

## Resuming a session
```js
fastr_handoff({ action: "latest" })
```
Read the summary and next step before planning, then follow the `fastr-memory` skill.
