---
name: fastr-trap
description: 2.0x recall boost failure logging, pre-edit trap checks, and zero-regression guarantees.
---

# FastrMemory Error Trap Defense

## Overview
Automated error trap quarantine and protection system. Assigns an immediate 2.0x recall multiplier to recorded pitfalls, guaranteeing that future agents never repeat identical mistakes.

## Workflow

### 1. Pre-Edit Trap Check (MANDATORY)
Before opening or modifying any file:
```ts
fastr_trap_recall({
  files: ["src/auth/jwt.ts", "package.json"]
})
```
- If traps are returned, review the `error_signature`, `cause`, and `mitigation`.
- Ensure your proposed edits respect the mitigation constraints.

### 2. Immediate Trap Logging
The instant a failure occurs:
```ts
fastr_trap_log({
  file: "src/server.ts",
  error: "TypeError: Cannot read properties of undefined (reading 'listen')",
  cause: "Imported fastify default instead of named export in ESM mode",
  fix: "Use import Fastify from 'fastify' or import { fastify } from 'fastify'",
  tags: ["esm", "fastify", "imports"]
})
```

### 3. Verification & Resolution
- Once verified safe across test suites, the trap remains active as a permanent guardrail.
- If a trap is obsoleted by a complete library migration, mark it resolved or supersede it.
