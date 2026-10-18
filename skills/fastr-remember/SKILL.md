---
name: fastr-remember
description: Curated memory ingestion with automatic secret scrubbing, module tagging, and Two-Zone Git mirroring.
---

# FastrMemory: Curated Memory Ingestion Protocol

## Ingestion Guidelines
FastrMemory emphasizes high signal-to-noise ratio. Record durable lessons, architectural invariants, and preventative error traps. Avoid transient noise.

## Memory Kinds
- `rule`: Hard architectural invariant (e.g. "Always use integer seconds for JWT exp").
- `error_trap`: Bug fix or subtle trap to prevent future regression (receives 2.0x boost).
- `decision`: Architecture Decision Record (ADR) explaining why a technology or pattern was chosen.
- `workflow`: Step-by-step procedure (e.g. migration, release process).

## Usage
Invoke `fastr_remember`:

```json
{
  "module": "api",
  "kind": "rule",
  "title": "Strict DTO Validation on Incoming Requests",
  "content": "All REST endpoints must validate input through Zod v4 schemas before processing.",
  "files": ["src/api/routes.ts"],
  "verified": true,
  "pinned": false
}
```
All credentials, API keys, and Bearer tokens are automatically scrubbed before persistence.
