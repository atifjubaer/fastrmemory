// 10k-memory recall-latency gate.
//
// Seeds an isolated in-memory database with 10,000 active memories plus a small
// file-link and graph layer, warms the search path, and measures 100 default
// recall calls. The p95 must stay below the documented 50 ms ceiling.
//
// Run with --out <file> to write raw evidence; without --out it only validates
// and prints a summary, so check:ci stays read-only.
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

const PROJECT = 'proj_recall_latency';
const MEMORY_COUNT = 10_000;
const DEFAULT_QUERIES = 100;
const DEFAULT_WARMUP = 10;
const DEFAULT_THRESHOLD_MS = 50;

interface Options {
  out: string | null;
  queries: number;
  warmup: number;
  thresholdMs: number;
  capturedAt: string;
}

function argValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function parseOptions(): Options {
  return {
    out: argValue('--out') ? path.resolve(argValue('--out') as string) : null,
    queries: Math.max(1, Number(argValue('--queries') ?? DEFAULT_QUERIES)),
    warmup: Math.max(0, Number(argValue('--warmup') ?? DEFAULT_WARMUP)),
    thresholdMs: Math.max(1, Number(argValue('--threshold') ?? DEFAULT_THRESHOLD_MS)),
    capturedAt: argValue('--at') ?? new Date().toISOString()
  };
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
    ) VALUES (?, ?, 'latency', ?, ?, ?, ?, 'verified', 0, 1.0, 0, ?, NULL, NULL, NULL, '[]', NULL, 0, ?, NULL, NULL)
  `);
  const insertLink = db.prepare('INSERT INTO file_links (memory_id, file_path, symbol_name) VALUES (?, ?, \'\')');
  const insertEdge = db.prepare(`
    INSERT INTO graph_edges (id, project_id, source_id, target_id, edge_type, weight)
    VALUES (?, ?, ?, ?, 'association', 1.0)
  `);

  db.exec('BEGIN');
  try {
    for (let i = 0; i < MEMORY_COUNT; i++) {
      insertMemory.run(
        `mem_latency_${i}`,
        PROJECT,
        `module_${i % 20}`,
        i % 11 === 0 ? 'error_trap' : 'rule',
        `Latency rule ${i}`,
        `Use strategy alpha${i % DEFAULT_QUERIES} for module ${i % 20} while keeping writes bounded.`,
        '2026-01-01T00:00:00.000Z',
        `2026-01-${String(1 + (i % 3)).padStart(2, '0')}T00:00:00.000Z`
      );
      if (i < 1_000) {
        insertLink.run(`mem_latency_${i}`, `src/module_${i % 20}/file_${i % 100}.ts`);
        insertEdge.run(
          `edge_latency_${i}`,
          PROJECT,
          `mem_latency_${i}`,
          `mem_latency_${(i + 1) % MEMORY_COUNT}`
        );
      }
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function percentile(sorted: number[], fraction: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * fraction) - 1));
  return sorted[index];
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

async function main(): Promise<void> {
  if (process.env.FASTR_PERF_GATE === '0') {
    console.log('Recall-latency gate skipped (FASTR_PERF_GATE=0; non-canonical CI runner).');
    return;
  }
  const options = parseOptions();
  const db = initDatabase(':memory:');
  try {
    seed(db);

    const queries = Array.from({ length: options.queries }, (_, i) => `strategy alpha${i % DEFAULT_QUERIES}`);
    const filesFor = (index: number): string[] => [`src/module_${index % 20}/file_${index % 100}.ts`];
    for (let i = 0; i < options.warmup; i++) {
      await searchMemories(db, {
        projectId: PROJECT,
        query: queries[i % queries.length],
        files: filesFor(i),
        budgetTokens: 2000,
        backfill: false,
        retrieval: { enableVector: false }
      });
    }

    const durations: number[] = [];
    let firstResultCount = 0;
    for (let i = 0; i < queries.length; i++) {
      const started = performance.now();
      const result = await searchMemories(db, {
        projectId: PROJECT,
        query: queries[i],
        files: filesFor(i),
        budgetTokens: 2000,
        backfill: false,
        retrieval: { enableVector: false }
      });
      durations.push(performance.now() - started);
      if (firstResultCount === 0) firstResultCount = result.memories.length;
    }

    durations.sort((a, b) => a - b);
    const p50 = percentile(durations, 0.5);
    const p95 = percentile(durations, 0.95);
    const max = durations[durations.length - 1] ?? 0;
    const mean = durations.reduce((sum, value) => sum + value, 0) / durations.length;
    const pass = p95 < options.thresholdMs && firstResultCount > 0;

    const report = {
      schemaVersion: 1,
      capturedAt: options.capturedAt,
      commit: commitSha(),
      project: PROJECT,
      seed: {
        memories: MEMORY_COUNT,
        fileLinks: 1_000,
        graphEdges: 1_000,
        embeddings: 0
      },
      retrieval: {
        mode: 'BM25 + graph RRF (vector disabled; fixture has no embeddings)',
        filesPerQuery: 1,
        budgetTokens: 2000,
        queries: options.queries,
        warmup: options.warmup
      },
      thresholdMs: options.thresholdMs,
      firstResultCount,
      latencyMs: {
        p50: round(p50),
        p95: round(p95),
        mean: round(mean),
        max: round(max)
      },
      pass
    };

    if (options.out) {
      fs.mkdirSync(path.dirname(options.out), { recursive: true });
      fs.writeFileSync(options.out, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
      console.log(`Wrote latency evidence to ${options.out}`);
    }

    console.log(
      `10k recall: p50=${report.latencyMs.p50}ms p95=${report.latencyMs.p95}ms max=${report.latencyMs.max}ms (threshold ${options.thresholdMs}ms)`
    );
    if (firstResultCount === 0) {
      console.error('ERROR: the latency fixture returned no memories; the query is not exercising recall.');
      process.exitCode = 1;
      return;
    }
    if (p95 >= options.thresholdMs) {
      console.error(`ERROR: p95 ${round(p95)}ms exceeds the ${options.thresholdMs}ms ceiling.`);
      process.exitCode = 1;
      return;
    }
    console.log(`Recall latency passed: p95 ${round(p95)}ms < ${options.thresholdMs}ms.`);
  } finally {
    db.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
