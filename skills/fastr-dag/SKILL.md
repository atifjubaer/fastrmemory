---
name: fastr-dag
description: Use when work splits into several dependent steps, when multiple agents share one task list, or when you need to know what to work on next. Builds a task DAG with dependencies and conflicts, claims the next unblocked action, and marks progress.
---

# FastrMemory: Multi-Agent Action DAG

## When to use
- A plan has steps that depend on each other.
- Several agents or sessions work the same backlog and must not collide.
- You finished an action and need the next one.

## 1. Create actions with dependencies
```js
fastr_action_create({
  title: "Add v2 schema migration",
  description: "Migration plus rollback; tests in tests/schema.test.ts",
  priority: 8
})
fastr_action_create({
  title: "Implement JWT auth guard",
  description: "Guard in src/auth/guard.ts using the v2 users table",
  priority: 6,
  requires: ["act_schema"],
  conflictsWith: ["act_auth_refactor"],
  assignedTo: "claude-code"
})
```
`priority` runs 1 (lowest) to 10 (highest). Use the IDs returned by earlier calls in `requires` / `conflictsWith`.

## 2. See what is unblocked
```js
fastr_frontier({})
```

## 3. Claim the next action atomically
```js
fastr_next({ agentId: "claude-code" })
```
This marks the highest-priority unblocked action `active` for that agent.

## 4. Update status as you go
```js
fastr_action_update({ id: "act_xxxx", status: "done", crystallizedInto: "mem_8f2a1c" })
fastr_action_update({ id: "act_yyyy", status: "blocked" })
```
Statuses: `pending`, `active`, `done`, `blocked`, `cancelled`. Marking `done` unblocks dependents; set `crystallizedInto` to the memory that captured the lesson, if any.
