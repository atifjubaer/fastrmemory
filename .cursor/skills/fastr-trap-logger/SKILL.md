---
name: fastr-trap-logger
description: Automatically triggers the exact moment a build error, test failure, or runtime exception is diagnosed and resolved.
---

# FastrMemory: Error Trap Logger Protocol

## Trigger Conditions
Execute this workflow immediately when:
1. A test suite fails and you identify the root cause.
2. A TypeScript compiler or runtime crash occurs and is resolved.
3. A subtle platform-specific trap (e.g. Windows paths, SQLite concurrency, token rounding) is encountered.

## Mandatory Steps

### 1. Record the Trap Immediately
Do NOT wait until the end of the session. Call `fastr_remember` with `kind: 'error_trap'`:

```json
{
  "module": "db",
  "kind": "error_trap",
  "title": "Concise headline (e.g. SQLite Busy Lock on Concurrent Writes)",
  "content": "Root cause explanation and the exact preventative rule.",
  "files": ["src/db/schema.ts"],
  "verified": true,
  "pinned": false
}
```

### 2. Verify Scrubbing
FastrMemory automatically redacts API keys, Bearer tokens, and passwords. Do NOT intentionally include raw secrets or private tokens in the trap content.
