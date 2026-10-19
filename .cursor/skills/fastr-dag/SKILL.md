---
name: fastr-dag
description: Multi-agent task frontier orchestration, dependency propagation, and DAG state management.
---

# FastrMemory Multi-Agent Action DAG

## Overview
Coordinates multi-agent task execution through a Directed Acyclic Graph (DAG) stored natively in SQLite. Computes the real-time "unblocked frontier", distributes parallel work packages, and halts downstream tasks if an upstream milestone fails.

## Workflow

### 1. Task Definition & Graph Construction
Create structured tasks with clear dependencies:
```ts
fastr_action_create({
  actionId: "task_auth_guard",
  title: "Implement JWT Authentication Guard",
  dependencies: ["task_db_schema_v2"],
  tier: "frontier",
  metadata: { file: "src/auth/guard.ts" }
})
```

### 2. Computing the Unblocked Frontier
To determine what work can be executed in parallel right now:
```ts
const frontier = await fastr_frontier();
// Returns tasks whose dependencies are 100% resolved
```

### 3. Claiming & Executing Next Action
```ts
const next = await fastr_next();
// Atomically locks the highest-priority frontier task for this agent
```

### 4. Updating Task Status
- When work completes: `fastr_action_update({ actionId: "...", status: "completed" })`. This automatically unblocks dependent child nodes.
- When an error occurs: `fastr_action_update({ actionId: "...", status: "failed" })`. Downstream dependencies enter quarantined pause state.
