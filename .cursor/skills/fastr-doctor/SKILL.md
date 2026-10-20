---
name: fastr-doctor
description: Use when FastrMemory searches miss memories you just stored, recall is slow or erroring, the action frontier looks stuck, or the user asks to check or repair the memory database. Diagnoses first, previews repairs, then heals.
---

# FastrMemory: Diagnose and Heal

## When to use
- `fastr_recall` does not find a memory that `fastr_timeline` shows exists.
- Recall or status calls are slow, or report database errors.
- Actions stay blocked although their prerequisites are done.

## Steps
1. **Diagnose (read-only)**:
   ```js
   fastr_diagnose({})
   ```
   Checks SQLite integrity, FTS5 index consistency, orphaned file links, action DAG edges, and journal mode.

2. **Preview repairs**:
   ```js
   fastr_heal({ dryRun: true })
   ```

3. **Apply repairs** once the preview looks right:
   ```js
   fastr_heal({ dryRun: false })
   ```
   Rebuilds the FTS5 index, prunes orphaned links, unblocks stale DAG edges, and checkpoints the WAL.

4. **Confirm**:
   ```js
   fastr_status({})
   ```

## Rules
- Always diagnose before healing and report what was found.
- If issues remain that are not fixable, tell the user; do not delete `.fastr/` files by hand.
- CLI equivalents: `fastrmemory diagnose`, `fastrmemory heal`.
