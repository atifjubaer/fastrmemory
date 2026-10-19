---
name: fastr-blame
description: Cognitive git blame linking codebase lines to memory rationale, agent decisions, and task objectives.
---

# FastrMemory Cognitive Blame

## Overview
Replaces standard git blame (which only shows who touched a line and when) with **Cognitive Blame** (showing *why* the line was written, which task triggered it, which agent authored it, and what memory rules governed the decision).

## When to Invoke
- When reading mysterious legacy or generated code.
- When questioning why a specific parameter, guard clause, or workaround was added.
- Before refactoring a complex function to ensure intentional constraints are not accidentally undone.

## Workflow
1. **Target Identification**:
   Identify the file path and line number under investigation (e.g., `src/db/sqlite.ts:42`).
2. **Execute Cognitive Blame**:
   Run CLI: `fastrmemory blame src/db/sqlite.ts:42` or call MCP `fastr_file_history`.
3. **Inspect Lineage Report**:
   The output returns:
   - **Git Metadata**: Commit SHA, author, timestamp, commit message.
   - **Agent Memory Context**: Active task objective when committed.
   - **Governing Rules**: Any 2.0x error trap or verified rule active at commit time that necessitated this specific line.
