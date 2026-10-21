// Deterministic query-plan evidence for the hot SQLite paths.
//
// The check seeds an in-memory database with 10k memories and representative
// event, link, graph, conflict, feedback, snapshot, and branch rows, then runs
// EXPLAIN QUERY PLAN against the ten query shapes used by recall, replay,
// feedback, and branch lookup. Any full table scan on a large table fails.
//
// Run with --out <file> to write the raw plans; without --out it only validates
// the plans and prints a compact summary, so check:ci stays read-only.
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';

const PROJECT = 'proj_query_plans';
const AT = '2026-01-04T00:00:00.000Z';

interface QueryCase {
  id: string;
  description: string;
  sql: string;
  params: unknown[];
}

interface PlanRow {
  id: number;
  parent: number;
  notused: number;
  detail: string;
}

interface PlanResult {
  id: string;
  description: string;
  sql: string;
  plans: string[];
  scanTables: string[];
  usesIndex: boolean;
}

function commitSha(): string {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function seed(db: DatabaseSync): void {
  const insertMemory = db.prepare(`
    INSERT INTO memories (
      id, project_id, agent_id, module, kind, title, content, status, pinned,
      reward_score, retrieval_count, valid_from, valid_to, superseded_by_id,
      superseded_reason, source_event_ids, embedding, embedded, created_at,
      last_recalled_at, provenance_hash
    ) VALUES (?, ?, 'query-plan', ?, ?, ?, ?, ?, ?, ?, 0, ?, NULL, NULL, NULL, '[]', ?, ?, ?, NULL, NULL)
  `);
  const insertEvent = db.prepare(`
    INSERT INTO raw_events (
      id, project_id, session_id, agent_id, event_type, tool_name, file_path,
      raw_payload, content_hash, created_at
    ) VALUES (?, ?, 'query-plan', 'query-plan', 'tool_error', 'shell', ?, ?, ?, ?)
  `);
  const insertLink = db.prepare(`
    INSERT INTO file_links (memory_id, file_path, symbol_name) VALUES (?, ?, '')
  `);
  const insertEdge = db.prepare(`
    INSERT INTO graph_edges (id, project_id, source_id, target_id, edge_type, weight)
    VALUES (?, ?, ?, ?, 'association', 1.0)
  `);
  const insertConflict = db.prepare(`
    INSERT INTO memory_conflicts (
      id, project_id, memory_a_id, memory_b_id, reason, score, status,
      resolved_winner_id, created_at, resolved_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertFeedback = db.prepare(`
    INSERT INTO memory_feedback (
      id, project_id, memory_id, outcome, note, reward_before, reward_after,
      status_before, status_after, confidence_tier, bad_streak, created_at
    ) VALUES (?, ?, ?, ?, NULL, 1.0, ?, 'verified', 'verified', ?, 0, ?)
  `);

  db.exec('BEGIN');
  try {
    for (let i = 0; i < 10_000; i++) {
      const embedded = i % 10 === 0 ? 1 : 0;
      insertMemory.run(
        `mem_plan_${i}`,
        PROJECT,
        `module_${i % 20}`,
        i % 7 === 0 ? 'error_trap' : 'rule',
        `Plan rule ${i}`,
        `Use strategy alpha${i % 100} for module ${i % 20} and keep writes bounded.`,
        i % 13 === 0 ? 'staging' : 'verified',
        i % 97 === 0 ? 1 : 0,
        1 + (i % 5) * 0.1,
        '2026-01-01T00:00:00.000Z',
        embedded ? Buffer.alloc(8) : null,
        embedded,
        `2026-01-${String(1 + (i % 3)).padStart(2, '0')}T00:00:00.000Z`
      );
    }

    for (let i = 0; i < 1_000; i++) {
      insertEvent.run(
        `evt_plan_${i}`,
        PROJECT,
        `src/module_${i % 20}/file_${i % 100}.ts`,
        `Observation ${i}`,
        `hash_plan_${i}`,
        `2026-01-${String(1 + (i % 3)).padStart(2, '0')}T01:00:00.000Z`
      );
      insertLink.run(`mem_plan_${i}`, `src/module_${i % 20}/file_${i % 100}.ts`);
      insertEdge.run(`edge_plan_${i}`, PROJECT, `mem_plan_${i}`, `mem_plan_${(i + 1) % 10_000}`);
    }

    for (let i = 0; i < 100; i++) {
      const open = i % 2 === 0;
      insertConflict.run(
        i + 1,
        PROJECT,
        `mem_plan_${i}`,
        `mem_plan_${i + 100}`,
        `plan conflict ${i}`,
        0.5,
        open ? 'open' : 'resolved',
        open ? null : `mem_plan_${i}`,
        `2026-01-0${1 + (i % 3)}T02:00:00.000Z`,
        open ? null : '2026-01-04T02:00:00.000Z'
      );
      insertFeedback.run(
        `fb_plan_${i}`,
        PROJECT,
        `mem_plan_${i}`,
        i % 2 === 0 ? 'good' : 'bad',
        i % 2 === 0 ? 1.1 : 0.9,
        i % 2 === 0 ? 'high' : 'medium',
        `2026-01-0${1 + (i % 3)}T03:00:00.000Z`
      );
    }

    db.prepare(`
      INSERT INTO memory_snapshots (id, project_id, tag, description, memory_count, state_json, created_at)
      VALUES ('snap_plan', ?, 'query-plan', 'query plan fixture', 10000, '{}', ?)
    `).run(PROJECT, AT);
    db.prepare(`
      INSERT INTO memory_branches (
        id, project_id, name, base_snapshot_id, head_snapshot_id, description, created_at, updated_at
      ) VALUES ('branch_plan', ?, 'query-plan', 'snap_plan', 'snap_plan', 'fixture', ?, ?)
    `).run(PROJECT, AT, AT);
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function buildQueries(): QueryCase[] {
  return [
    {
      id: 'active-memories',
      description: 'Active project memories for a module, ordered for prompt assembly.',
      sql: `
        SELECT * FROM memories
        WHERE project_id = ?
          AND valid_to IS NULL
          AND status != 'superseded'
          AND status != 'dormant'
          AND module = ?
        ORDER BY pinned DESC, reward_score DESC, created_at DESC
      `,
      params: [PROJECT, 'module_3']
    },
    {
      id: 'fts-recall',
      description: 'FTS5 BM25 candidate stream used by recall.',
      sql: `
        SELECT * FROM (
          SELECT m.*, bm25(memories_fts, 0.0, 10.0, 5.0, 1.0) AS rank
          FROM memories_fts f
          JOIN memories m ON m.id = f.id
          WHERE (m.project_id = ? OR m.project_id = 'global')
            AND memories_fts MATCH ?
          ORDER BY rank ASC
          LIMIT 50
        ) ORDER BY rank ASC LIMIT 50
      `,
      params: [PROJECT, '"alpha1"']
    },
    {
      id: 'vector-candidates',
      description: 'Embedded-memory candidate scan used by the vector stream.',
      sql: `
        SELECT * FROM memories
        WHERE (project_id = ? OR project_id = 'global')
          AND embedded = 1
          AND embedding IS NOT NULL
      `,
      params: [PROJECT]
    },
    {
      id: 'file-links',
      description: 'File-scoped graph seeds for recall.',
      sql: `
        SELECT DISTINCT m.id
        FROM file_links fl
        JOIN memories m ON m.id = fl.memory_id
        WHERE m.project_id = ?
          AND fl.file_path IN (?, ?, ?)
      `,
      params: [PROJECT, 'src/module_1/file_1.ts', 'src/module_2/file_2.ts', 'src/module_3/file_3.ts']
    },
    {
      id: 'graph-edges',
      description: 'Two-hop spreading-activation edge lookup.',
      sql: `
        SELECT ge.source_id, ge.target_id, ge.edge_type, ge.weight
        FROM graph_edges ge
        WHERE ge.project_id = ?
          AND (ge.source_id IN (?, ?) OR ge.target_id IN (?, ?))
      `,
      params: [PROJECT, 'mem_plan_1', 'mem_plan_2', 'mem_plan_1', 'mem_plan_2']
    },
    {
      id: 'replay-memories',
      description: 'Bi-temporal replay memory rows up to a timestamp.',
      sql: `
        SELECT * FROM memories
        WHERE project_id = ? AND valid_from <= ?
        ORDER BY created_at ASC, id ASC
      `,
      params: [PROJECT, AT]
    },
    {
      id: 'replay-events',
      description: 'Raw-event rows up to a replay timestamp.',
      sql: `
        SELECT * FROM raw_events
        WHERE project_id = ? AND created_at <= ?
        ORDER BY created_at ASC, id ASC
      `,
      params: [PROJECT, AT]
    },
    {
      id: 'replay-conflicts',
      description: 'Open or newly resolved conflicts at a replay timestamp.',
      sql: `
        SELECT * FROM memory_conflicts
        WHERE project_id = ?
          AND created_at <= ?
          AND (status = 'open' OR (resolved_at IS NOT NULL AND resolved_at > ?))
        ORDER BY created_at ASC, id ASC
      `,
      params: [PROJECT, AT, AT]
    },
    {
      id: 'feedback-history',
      description: 'Latest feedback rows for one memory.',
      sql: `
        SELECT * FROM memory_feedback
        WHERE memory_id = ?
        ORDER BY created_at DESC
        LIMIT 3
      `,
      params: ['mem_plan_1']
    },
    {
      id: 'branch-lookup',
      description: 'Case-insensitive branch lookup by project and name.',
      sql: `
        SELECT id, project_id, name, base_snapshot_id, head_snapshot_id
        FROM memory_branches
        WHERE project_id = ? AND name = ? COLLATE NOCASE
      `,
      params: [PROJECT, 'query-plan']
    }
  ];
}

function isLargeTableScan(detail: string): boolean {
  return /^SCAN (memories|raw_events|memory_conflicts|file_links|graph_edges|memory_feedback|memory_branches)\b/.test(detail);
}

function main(): void {
  if (process.env.FASTR_PERF_GATE === '0') {
    console.log('Query-plan gate skipped (FASTR_PERF_GATE=0; non-canonical CI runner).');
    return;
  }
  const outIndex = process.argv.indexOf('--out');
  const out = outIndex >= 0 ? path.resolve(process.argv[outIndex + 1] ?? '') : null;
  const atIndex = process.argv.indexOf('--at');
  const capturedAt = atIndex >= 0 ? process.argv[atIndex + 1] : new Date().toISOString();

  const db = initDatabase(':memory:');
  try {
    seed(db);
    const results: PlanResult[] = [];
    for (const query of buildQueries()) {
      const rows = db.prepare(`EXPLAIN QUERY PLAN ${query.sql}`).all(...(query.params as any[])) as unknown as PlanRow[];
      const plans = rows.map((row) => row.detail);
      const scanTables = plans.filter(isLargeTableScan);
      const usesIndex = plans.some((detail) => /USING (COVERING )?INDEX|VIRTUAL TABLE INDEX/.test(detail));
      results.push({
        id: query.id,
        description: query.description,
        sql: query.sql.trim().replace(/\s+/g, ' '),
        plans,
        scanTables,
        usesIndex
      });
    }

    const failures = results.filter((result) => result.scanTables.length > 0 || !result.usesIndex);
    const report = {
      schemaVersion: 1,
      capturedAt,
      commit: commitSha(),
      project: PROJECT,
      seed: {
        memories: 10_000,
        embeddedMemories: 1_000,
        rawEvents: 1_000,
        fileLinks: 1_000,
        graphEdges: 1_000,
        conflicts: 100,
        feedbackRows: 100
      },
      threshold: 'no full table scan on a large table; every plan uses an index',
      pass: failures.length === 0,
      results
    };

    if (out) {
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
      console.log(`Wrote query plans to ${out}`);
    }

    for (const result of results) {
      const status = result.scanTables.length === 0 && result.usesIndex ? 'PASS' : 'FAIL';
      console.log(`${status} ${result.id}: ${result.plans.join(' | ')}`);
    }

    if (failures.length > 0) {
      for (const failure of failures) {
        console.error(
          `ERROR: ${failure.id} ${failure.scanTables.length > 0 ? `scans ${failure.scanTables.join(', ')}` : 'does not use an index'}`
        );
      }
      process.exitCode = 1;
      return;
    }
    console.log(`Query plans passed: ${results.length} query shapes, no large-table scans.`);
  } finally {
    db.close();
  }
}

main();
