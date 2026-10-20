---
name: fastr-curate
description: Use when you learn something durable worth keeping (a new convention, an architectural decision, a user preference), when recalled memories contradict each other, or when memory needs cleanup. Dedupes before storing, records or supersedes rules, resolves conflicts, and snapshots memory before risky bulk changes.
---

# FastrMemory: Curate Project Memory

## When to use
- The user states a preference or guideline, or you settle an architectural decision.
- Two recalled memories give opposing instructions.
- A refactor or migration invalidates existing rules.
- You are about to make many memory changes and want a restore point.

## 1. Dedupe, then remember
Always search first:
```js
fastr_recall({ query: "test runner convention", budgetTokens: 800 })
```
- Same rule exists and is right: rate it, do not store again.
- Exists but outdated: supersede it (step 2).
- Nothing relevant: store it.
```js
fastr_remember({
  kind: "decision",
  module: "api",
  title: "Validate request bodies with zod at the route boundary",
  content: "Every route parses input with a zod schema before calling services. Services assume valid input.",
  files: ["src/api/routes.ts"],
  symbols: ["registerRoutes"],
  verified: false
})
```
`kind` is one of `rule`, `decision`, `error_trap`, `workflow`. Leave `verified: false` (staging) until tests confirm it; use `scope: "global"` only for organisation-wide rules; `pinned: true` sparingly.

## 2. Supersede instead of duplicating
```js
fastr_supersede({
  oldMemoryId: "mem_jest01",
  newTitle: "Use Vitest, not Jest",
  newContent: "Vitest runs ESM natively; Jest config was removed.",
  reason: "ESM migration"
})
```

## 3. Resolve contradictions
```js
fastr_conflicts({ status: "open" })
fastr_resolve({ conflictId: 4, keepId: "mem_vitest2", forgetLoser: true, reason: "Jest removed in v0.1" })
```
`forgetLoser: false` only weakens the loser's score; use it when both may still apply.

## 4. Score usefulness
```js
fastr_feedback({ memoryId: "mem_vitest2", outcome: "good", note: "Prevented adding Jest config" })
```

## 5. Snapshot before bulk changes, roll back if needed
```js
fastr_snapshot({ tag: "pre-auth-cleanup", description: "Before consolidating auth rules" })
fastr_rollback({ snapshotId: "snap_xxxx" })
```
Audit what changed with `fastr_timeline({ module: "auth", limit: 25 })`.
