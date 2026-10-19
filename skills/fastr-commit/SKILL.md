---
name: fastr-commit
description: Memory-aware git commit synthesis with pre-commit trap validation and SHA-256 provenance signing.
---

# FastrMemory Memory-Aware Git Commit

## Overview
Elevates git commit generation beyond blind diff parsing into a memory-grounded cognitive workflow. Synthesizes conventional commit messages from git diff + session memory, validates staged files against active 2.0x error traps, and cryptographically signs the commit with SHA-256 memory provenance.

## Comparison with Standard `git-commit`
| Capability | Standard `git-commit` | FastrMemory `fastr-commit` |
| :--- | :--- | :--- |
| **Input Source** | Raw git diff only | Git diff + FastrMemory session context + active tasks |
| **Error Trap Check** | ❌ None (blind to pitfalls) | ✅ Blocks commit if staged files violate active 2.0x error traps |
| **Provenance Ledger** | ❌ None | ✅ Hashes session memory + author + files into SQLite ledger |
| **Reverse Traceability** | ❌ Standard git blame only | ✅ Enables `fastrmemory blame` to reveal *why* the agent wrote the code |

## Workflow
1. **Pre-Commit Verification**:
   Inspect `git diff --cached`. Call `fastr_trap_recall` on all staged files. If any unstaged failure point exists, abort and warn the developer.
2. **Context Synthesis**:
   Query active session tasks and memories (`fastr_frontier` and `fastr_recall`).
   Synthesize conventional commit message:
   `<type>(<scope>): <concise description>`
   - Detailed rationale linked to active task milestones.
   - List of resolved error traps (if applicable).
3. **Commit & Provenance Recording**:
   Execute `git commit`. Record commit hash, staged file list, and memory state via `fastrmemory commit` or `fastr_remember` category `provenance`.
