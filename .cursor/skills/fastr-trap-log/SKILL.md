---
name: fastr-trap-log
description: Use the moment you diagnose the root cause of a build error, failing test, runtime exception, or platform/library gotcha. Records it as an error trap so future agents are warned before editing the same files. Do not wait until the end of the session.
---

# FastrMemory: Log Error Traps Immediately

## When to use
- A test, type check, or build failed and you now know why.
- A runtime crash or wrong behaviour was traced to a specific cause.
- You hit a subtle environment trap (Windows paths, SQLite locking, ESM/CJS interop, timezone, rounding).

Skip it for typos or one-off mistakes that teach nothing reusable.

## Steps

1. **Check it is not already recorded**:
   ```js
   fastr_trap_recall({ files: ["src/db/schema.ts"] })
   ```
   If the same trap exists, do not duplicate it; rate it instead with
   `fastr_feedback({ memoryId: "mem_xxxx", outcome: "good", note: "Trap matched this failure" })`.

2. **Log the trap** (stored as a verified `error_trap` with a 2.0x recall boost):
   ```js
   fastr_trap_log({
     title: "Never open two write connections to the SQLite DB",
     content: "Symptom: SQLITE_BUSY in tests. Cause: a second DatabaseSync writer outside the shared repo. Fix: reuse the server context's db handle.",
     files: ["src/db/schema.ts", "src/mcp/server.ts"],
     module: "db"
   })
   ```

## Writing a good trap
- `title`: imperative rule, not a description of the bug ("Always X" / "Never Y").
- `content`: symptom, root cause, and the concrete fix or workaround, in a few sentences.
- `files`: every file where the trap applies; this is what pre-edit checks match on.
- Never paste secrets, tokens, or private URLs. Content is scrubbed, but do not rely on it.
- If the fix changes an existing rule, also follow the `fastr-curate` skill to supersede it.
