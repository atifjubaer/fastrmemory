---
name: fastr-recall
description: High-precision cognitive recall using Triple-Stream RRF (BM25 + Vector + Graph) and progressive token packing.
---

# FastrMemory: High-Precision Recall Protocol

## Trigger Conditions
Use this skill when:
- Searching for architecture patterns, conventions, or past decisions.
- Locating known error traps before executing risky refactors.
- Retrieving context for a specific file or module.

## Workflow

### 1. Hybrid Search
Call the MCP tool `fastr_recall`:

```json
{
  "query": "Descriptive search query",
  "files": ["src/path/to/file.ts"],
  "module": "auth",
  "budgetTokens": 1500
}
```

### 2. Deep Drill for Verbatim Evidence
If a recalled memory references a complex stack trace, git diff, or raw error log, do not guess. Invoke `fastr_drill` to inspect the exact untruncated original event:

```json
{
  "memoryId": "mem_xxxx"
}
```

### 3. File History Check
For focused file-level rules, call `fastr_file_history`:

```json
{
  "filePath": "src/path/to/file.ts"
}
```
