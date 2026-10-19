---
name: fastr-before-coding
description: Automatically triggers before reading, planning, or editing codebase files. Recalls active rules, traps, and decisions via FastrMemory.
---

# FastrMemory: Pre-Task Recall Protocol

## Trigger Conditions
Execute this workflow immediately when:
1. You begin a new user task or sub-task.
2. You are about to view or modify files in any project module (`auth`, `db`, `api`, `ui`, etc.).
3. You encounter unfamiliar architecture patterns in this codebase.

## Mandatory Steps

### 1. Recall Module Rules and Traps
Before writing any code, invoke the MCP tool `fastr_recall` passing the target files and task description:

```json
{
  "query": "Task summary or keyword (e.g. JWT token expiration or SQLite concurrency)",
  "files": ["src/path/to/target-file.ts"],
  "budgetTokens": 1500
}
```

Or for a specific file, invoke `fastr_file_history`:

```json
{
  "filePath": "src/path/to/target-file.ts"
}
```

### 2. Review Injected [TRAP] Warnings
- Carefully check any recalled item tagged with `[TRAP]`.
- Explicitly state how your code changes avoid the trap in your reasoning plan.
- Never repeat a documented bug or mistake.
