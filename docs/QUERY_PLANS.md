# Query Plans

Phase 5.1 records `EXPLAIN QUERY PLAN` output for the ten query shapes that drive recall, replay, feedback, and branch lookup. The gate is intentionally narrow: it fails on a full table scan of a large table and requires every shape to use an index or an FTS virtual table. It does not claim that every plan is optimal.

## Reproduction

```bash
npx tsx scripts/check-query-plans.ts \
  --out bench/results/query-plans.json \
  --at 2026-10-21T01:37:58.428Z
```

- Captured: `2026-10-21T01:37:58.428Z`
- Code commit: `2afded2`
- Raw evidence: `bench/results/query-plans.json`
- Fixture: in-memory SQLite, 10,000 memories, 1,000 embedded memories, 1,000 raw events, 1,000 file links, 1,000 graph edges, 100 conflicts, 100 feedback rows, one snapshot, one branch.
- Gate: no `SCAN` on `memories`, `raw_events`, `file_links`, `graph_edges`, `memory_conflicts`, `memory_feedback`, or `memory_branches`; every shape must use an index or an FTS virtual table.

## Results

| Shape | Plan |
|---|---|
| `active-memories` | `SEARCH memories USING INDEX idx_memories_active (project_id=? AND module=? AND valid_to=?)`; `USE TEMP B-TREE FOR ORDER BY` |
| `fts-recall` | `SCAN f VIRTUAL TABLE INDEX 0:M4`; `SEARCH m USING INDEX sqlite_autoindex_memories_1 (id=?)`; `USE TEMP B-TREE FOR ORDER BY`; `SCAN (subquery-1)` |
| `vector-candidates` | `SEARCH memories USING INDEX idx_memories_embedded (project_id=? AND embedded=?)` |
| `file-links` | `SEARCH m USING INDEX idx_memories_embedded (project_id=?)`; `SEARCH fl USING COVERING INDEX sqlite_autoindex_file_links_1 (memory_id=? AND file_path=?)`; `USE TEMP B-TREE FOR DISTINCT` |
| `graph-edges` | `SEARCH ge USING INDEX idx_graph_edges_target (project_id=?)` |
| `replay-memories` | `SEARCH memories USING INDEX idx_memories_embedded (project_id=?)`; `USE TEMP B-TREE FOR ORDER BY` |
| `replay-events` | `SEARCH raw_events USING INDEX idx_raw_events_project_created (project_id=? AND created_at<?)`; `USE TEMP B-TREE FOR LAST TERM OF ORDER BY` |
| `replay-conflicts` | `SEARCH memory_conflicts USING INDEX idx_conflicts_status (project_id=?)`; `USE TEMP B-TREE FOR ORDER BY` |
| `feedback-history` | `SEARCH memory_feedback USING INDEX idx_memory_feedback_memory (memory_id=?)` |
| `branch-lookup` | `SEARCH memory_branches USING INDEX sqlite_autoindex_memory_branches_2 (project_id=? AND name=?)` |

All ten shapes pass. The full raw output, including the SQL and bound-parameter shape, is in `bench/results/query-plans.json`.

## Caveats

- The SQL is a representative copy of the production statement, not generated from an ORM; the bound parameter values are recorded in the raw JSON.
- CI runs this gate on the canonical Ubuntu/Node 24 job. Other matrix jobs set `FASTR_PERF_GATE=0` so runner-specific timing does not turn functional coverage into a flaky performance test.
- `SCAN f VIRTUAL TABLE INDEX` is FTS5 reading its own index. It is not a full table scan of `memories`.
- `SCAN (subquery-1)` is the outer co-routine over the already-limited FTS candidate set.
- `graph-edges` uses the `(project_id, target_id)` index with only the project prefix, then filters the `OR` predicate. It avoids a full table scan, but it is not a two-index `OR` plan. The 10k fixture is small enough that this remains fast; a future optimization can split the `OR` into two indexed branches.
- `file-links` is driven by the project filter on `memories`; the covering primary-key index on `file_links` supplies the join. The standalone `file_path` index is not chosen for this join order.
- The fixture is synthetic and in-memory. It validates plan shape, not production data distribution or cache behavior.
- Latency is measured separately by `scripts/check-recall-latency.ts`; query-plan shape and latency are different gates.
