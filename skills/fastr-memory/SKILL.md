---
name: fastr-memory
description: Use at the start of any coding task and before reading-to-edit, creating, or modifying project files. Checks FastrMemory for [TRAP] warnings on the target files, then recalls relevant rules and decisions so you do not repeat known mistakes or contradict project conventions.
---

# FastrMemory: Recall Before You Code

## When to use
- A new task or sub-task begins (feature, bug fix, refactor, review).
- You are about to edit or create a file you have not checked this session.
- You hit unfamiliar architecture or a convention you are unsure about.

## Steps

1. **Check traps on the files you will touch** (always, before the first edit):
   ```js
   fastr_trap_recall({ files: ["src/auth/jwt.ts", "src/auth/guard.ts"] })
   ```
   For each `[TRAP]` returned, state in your plan how the change avoids it.

2. **Recall rules and decisions for the task**:
   ```js
   fastr_recall({
     query: "JWT expiry handling in auth guard",
     files: ["src/auth/jwt.ts"],
     module: "auth",
     budgetTokens: 1500
   })
   ```
   Set `includeHistory: true` only when you need superseded rules (for example, to learn why something changed).

   Or get one token-budgeted context block (rules + traps + ready tasks + last handoff):
   ```js
   fastr_assemble({
     taskDescription: "Add refresh-token rotation to the auth guard",
     targetFiles: ["src/auth/guard.ts"],
     module: "auth",
     budgetTokens: 2000
   })
   ```

3. **Drill down only when needed**:
   - Everything linked to one file: `fastr_file_history({ filePath: "src/auth/jwt.ts" })`
   - Neighbouring files and memories: `fastr_graph_query({ filePath: "src/auth/jwt.ts", depth: 2 })`
   - Verbatim stack trace or diff behind a memory: `fastr_drill({ memoryId: "mem_8f2a1c" })`
   - Where the last session stopped: `fastr_handoff({ action: "latest" })`

## Ground rules
- If recall returns nothing, say so. Do not invent project conventions.
- Note the IDs of memories you relied on; rate them at the end with the `fastr-session-commit` skill.
- When a failure is diagnosed mid-task, switch to the `fastr-trap-log` skill immediately.
