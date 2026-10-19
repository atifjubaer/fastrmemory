---
name: fastr-recall
description: High-precision triple-stream reciprocal rank fusion (RRF) memory retrieval.
---

# FastrMemory Recall Protocol

## Overview
Executes triple-stream memory retrieval across full-text BM25, trigram vector embeddings, and knowledge graph associative walks, fused using Reciprocal Rank Fusion (k=60) with sub-millisecond in-process latency.

## When to Invoke
- At the start of any new coding task, before planning implementation steps.
- When querying project architecture, past decisions, API conventions, or database schemas.
- When investigating why a specific error occurred or how similar issues were resolved previously.

## Workflow
1. **Execute Search**:
   Call `fastr_recall` with a targeted query (e.g., `"sqlite wal mode busy timeout"`, `"jwt authentication guard"`).
   Optional parameters:
   - `limit`: Number of memories to return (default: 5, max: 20).
   - `minScore`: Filter low-confidence matches (default: 0.1).
   - `tags`: Restrict search to specific scopes (e.g. `["security", "database"]`).
2. **Interpret Triple-Stream Signals**:
   - `[TRAP]` items: Past failures with 2.0x recall boost. Must be addressed.
   - `[VERIFIED]` items: Production-tested rules graduated via session verification.
   - `[STAGING]` items: Current session hypotheses pending graduation.
3. **Deep Associative Exploration**:
   If a returned memory contains graph neighbors or unresolved references, call `fastr_drill` on the `memory_id` to expand related entities up to depth 2.
