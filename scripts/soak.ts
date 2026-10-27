// Concurrent-agent soak test.
//
// Seeds one project database with 10,000 memories, then runs three writer processes and
// one reader process against it at the same time. Writers use the real `insertMemory()`
// path with deferred indexing; the reader uses the read-only recall path
// (`drainFts: false`), so the queued rows it cannot index are scanned, not written.
//
// The point is not throughput. It is to answer three questions with numbers:
//   1. Are any acknowledged writes missing at the end?
//   2. How often does a writer hit SQLITE_BUSY, and how long is the tail?
//   3. Does recall stay usable while three agents write?
//
// Run:
//   npx tsx scripts/soak.ts
//   npx tsx scripts/soak.ts --memories 10000 --writers 3 --seconds 30
//
// Exit code 1 when a write is lost, the database fails integrity, or recall errors.
import { spawn } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';
import { rebuildMemoriesFts } from '../src/db/doctor.js';
import { SpoolManager } from '../src/db/spool.js';

const SCRIPT = fileURLToPath(import.meta.url);
const TSX = path.resolve('node_modules', 'tsx', 'dist', 'cli.mjs');

interface Options {
  memories: number;
  writers: number;
  seconds: number;
  seed: number;
}

function argValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function options(): Options {
  const one = (name: string, fallback: number, min: number, max: number): number => {
    const raw = Number(argValue(name) ?? fallback);
    if (!Number.isFinite(raw)) return fallback;
    return Math.min(max, Math.max(min, Math.floor(raw)));
  };
  return {
    memories: one('--memories', 10_000, 100, 100_000),
    writers: one('--writers', 3, 1, 8),
    seconds: one('--seconds', 30, 5, 600),
    seed: one('--seed', 42, 1, 2 ** 31 - 1)
  };
}

/** Deterministic PRNG so two runs generate the same corpus. */
function rng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x1_0000_0000;
  };
}

const MODULES = ['auth', 'db', 'api', 'ui', 'hooks', 'search', 'release', 'git'];
const KINDS = ['rule', 'decision', 'workflow', 'error_trap'];
const FILES = [
  'src/auth/jwt.ts',
  'src/db/repository.ts',
  'src/search/hybrid-rrf.ts',
  'src/mcp/server.ts',
  'src/hooks/per-turn.ts',
  'src/config.ts',
  'ui/src/components/ReplayWorkspace.tsx',
  'scripts/release.mjs'
];
const TOPICS = [
  'Use WAL busy timeout for concurrent readers',
  'Never call Date.now for JWT expiry',
  'Drain the FTS queue before BM25',
  'Symbol anchors survive a rename',
  'Recall must not take the write lock',
  'Assertions retire spent traps',
  'Spool writes when SQLite is busy',
  'Memory rows commit before links',
  'Deduplicate before inserting a trap',
  'Keep the per-turn block under 150 tokens'
];

function contentFor(index: number, random: () => number): { title: string; content: string; module: string; kind: string; file: string } {
  const module = MODULES[Math.floor(random() * MODULES.length)];
  const kind = KINDS[Math.floor(random() * KINDS.length)];
  const file = FILES[Math.floor(random() * FILES.length)];
  const topic = TOPICS[index % TOPICS.length];
  return {
    module,
    kind,
    file,
    title: `${topic} #${index}`,
    content:
      `Soak memory ${index} in ${module}. ${topic}. ` +
      `The rule applies to ${file} and to every caller that reaches it. ` +
      `Token ${Math.floor(random() * 1e9).toString(36)} keeps the row unique for BM25.`
  };
}

// ==========================================
// Child modes
// ==========================================

interface WriterResult {
  label: string;
  acknowledged: number;
  busy: number;
  otherErrors: number;
  errorSample: string | null;
  p50Ms: number;
  p95Ms: number;
  maxMs: number;
}

function percentile(sorted: number[], value: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((value / 100) * sorted.length) - 1));
  return Number(sorted[index].toFixed(2));
}

async function writerMode(dbPath: string, projectRoot: string, pattern: string, label: string, seconds: number): Promise<void> {
  const db = initDatabase(dbPath);
  const repo = new FastrRepository(db, new SpoolManager(path.join(projectRoot, '.fastr', 'spool', 'pending.jsonl')), {
    projectRoot,
    ftsMode: 'deferred',
    conflictMode: 'deferred',
    nerMode: 'deferred'
  });
  const random = rng(Number(label.replace(/\D/g, '')) * 7919 + 13);
  const latencies: number[] = [];
  const result: WriterResult = {
    label,
    acknowledged: 0,
    busy: 0,
    otherErrors: 0,
    errorSample: null,
    p50Ms: 0,
    p95Ms: 0,
    maxMs: 0
  };

  const deadline = Date.now() + seconds * 1000;
  let index = 0;
  while (Date.now() < deadline) {
    const generated = contentFor(index, random);
    const started = process.hrtime.bigint();
    try {
      repo.insertMemory({
        projectId: pattern,
        module: generated.module,
        kind: generated.kind,
        title: `${generated.title} [${label}]`,
        content: generated.content,
        files: [generated.file],
        verified: index % 5 === 0,
        agentId: label
      });
      result.acknowledged++;
      latencies.push(Number(process.hrtime.bigint() - started) / 1e6);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (/SQLITE_BUSY|database is locked/i.test(message)) result.busy++;
      else {
        result.otherErrors++;
        result.errorSample = result.errorSample ?? message.slice(0, 200);
      }
    }
    index++;
  }

  latencies.sort((a, b) => a - b);
  result.p50Ms = percentile(latencies, 50);
  result.p95Ms = percentile(latencies, 95);
  result.maxMs = latencies.length > 0 ? Number(latencies[latencies.length - 1].toFixed(2)) : 0;
  db.close();
  process.stdout.write(`SOAK_RESULT ${JSON.stringify({ mode: 'writer', ...result })}\n`);
}

async function readerMode(dbPath: string, projectRoot: string, pattern: string, seconds: number): Promise<void> {
  const db = initDatabase(dbPath);
  const random = rng(99_991);
  const latencies: number[] = [];
  const result = { label: 'reader', queries: 0, empty: 0, errors: 0, errorSample: null as string | null, p50Ms: 0, p95Ms: 0, p99Ms: 0 };

  const deadline = Date.now() + seconds * 1000;
  while (Date.now() < deadline) {
    const topic = TOPICS[Math.floor(random() * TOPICS.length)];
    const file = FILES[Math.floor(random() * FILES.length)];
    const started = process.hrtime.bigint();
    try {
      const found = await searchMemories(db, {
        projectId: pattern,
        query: topic,
        files: [file],
        projectRoot,
        drainFts: false,
        backfill: false,
        limit: 10
      });
      result.queries++;
      if (found.memories.length === 0) result.empty++;
      latencies.push(Number(process.hrtime.bigint() - started) / 1e6);
    } catch (error) {
      result.errors++;
      result.errorSample = result.errorSample ?? (error instanceof Error ? error.message : String(error)).slice(0, 200);
    }
  }

  latencies.sort((a, b) => a - b);
  result.p50Ms = percentile(latencies, 50);
  result.p95Ms = percentile(latencies, 95);
  result.p99Ms = percentile(latencies, 99);
  db.close();
  process.stdout.write(`SOAK_RESULT ${JSON.stringify({ mode: 'reader', ...result })}\n`);
}

// ==========================================
// Parent
// ==========================================

const PATTERN = 'proj_soak';
const SEED_AGENT = 'soak_seed';

function seedDatabase(dbPath: string, projectRoot: string, count: number, seed: number): void {
  const db = initDatabase(dbPath);
  const random = rng(seed);
  const insert = db.prepare(`
    INSERT INTO memories (
      id, project_id, agent_id, module, kind, title, content, status, pinned,
      reward_score, retrieval_count, valid_from, valid_to, superseded_by_id,
      superseded_reason, source_event_ids, embedding, embedded, created_at,
      last_recalled_at, assertion, provenance_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 1, 0, ?, NULL, NULL, NULL, '[]', NULL, 0, ?, NULL, NULL, NULL)
  `);
  const link = db.prepare(`
    INSERT OR IGNORE INTO file_links (memory_id, file_path, symbol_name) VALUES (?, ?, '')
  `);

  const now = Date.now();
  db.exec('BEGIN IMMEDIATE');
  try {
    for (let i = 0; i < count; i++) {
      const generated = contentFor(i, random);
      const id = `mem_soakseed_${i.toString(36).padStart(6, '0')}`;
      const createdAt = new Date(now - (count - i) * 1000).toISOString();
      insert.run(
        id,
        PATTERN,
        SEED_AGENT,
        generated.module,
        generated.kind,
        generated.title,
        generated.content,
        generated.kind === 'error_trap' ? 'verified' : 'staging',
        createdAt,
        createdAt
      );
      link.run(id, generated.file);
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
  rebuildMemoriesFts(db);
  db.close();
}

function dbBytes(dbPath: string): { db: number; wal: number } {
  const size = (file: string): number => {
    try {
      return fs.statSync(file).size;
    } catch {
      return 0;
    }
  };
  return { db: size(dbPath), wal: size(`${dbPath}-wal`) };
}

function runChild(args: string[]): Promise<{ code: number | null; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [TSX, SCRIPT, ...args], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => (stdout += String(chunk)));
    child.stderr.on('data', (chunk) => (stderr += String(chunk)));
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

function parseResult(stdout: string): any {
  const line = stdout.split(/\r?\n/).find((entry) => entry.startsWith('SOAK_RESULT '));
  if (!line) return null;
  try {
    return JSON.parse(line.slice('SOAK_RESULT '.length));
  } catch {
    return null;
  }
}

async function main(): Promise<void> {
  const opts = options();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-soak-'));
  const dbPath = path.join(root, '.fastr', 'fastr.db');
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  console.log(`Soak: ${opts.memories} seed memories, ${opts.writers} writers + 1 reader, ${opts.seconds}s`);
  console.log(`Root: ${root}`);

  const startedSeed = Date.now();
  seedDatabase(dbPath, root, opts.memories, opts.seed);
  const seedMs = Date.now() - startedSeed;
  console.log(`Seeded in ${seedMs} ms`);

  const writerArgs = Array.from({ length: opts.writers }, (_, i) => [
    '--writer',
    `w${i + 1}`,
    '--db',
    dbPath,
    '--root',
    root,
    '--seconds',
    String(opts.seconds)
  ]);
  const readerArgs = ['--reader', '--db', dbPath, '--root', root, '--seconds', String(opts.seconds)];

  const reader = runChild(readerArgs);
  const writers = writerArgs.map(runChild);
  const results = await Promise.all([...writers, reader]);
  const parsed = results.map((result) => parseResult(result.stdout));
  const writerResults: WriterResult[] = parsed.filter((entry) => entry?.mode === 'writer');
  const readerResult = parsed.find((entry) => entry?.mode === 'reader');

  const db = initDatabase(dbPath);
  const committed = (db.prepare('SELECT COUNT(*) AS c FROM memories WHERE project_id = ?').get(PATTERN) as any).c as number;
  const ftsRows = (db.prepare('SELECT COUNT(*) AS c FROM memories_fts').get() as any).c as number;
  const pendingFts = (db.prepare('SELECT COUNT(*) AS c FROM memory_fts_queue').get() as any).c as number;
  const integrity = Object.values(db.prepare('PRAGMA integrity_check').get() as any)[0];
  db.close();

  const acknowledged = writerResults.reduce((sum, entry) => sum + entry.acknowledged, 0);
  const expected = opts.memories + acknowledged;
  const lost = expected - committed;
  const sizes = dbBytes(dbPath);
  const mb = (bytes: number): string => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  console.log('\n== Writers');
  for (const entry of writerResults) {
    console.log(
      `  ${entry.label}: ${entry.acknowledged} committed, busy=${entry.busy}, errors=${entry.otherErrors}, ` +
        `p50=${entry.p50Ms}ms p95=${entry.p95Ms}ms max=${entry.maxMs}ms` +
        (entry.errorSample ? ` (${entry.errorSample})` : '')
    );
  }
  console.log('\n== Reader');
  if (readerResult) {
    console.log(
      `  ${readerResult.queries} recalls, empty=${readerResult.empty}, errors=${readerResult.errors}, ` +
        `p50=${readerResult.p50Ms}ms p95=${readerResult.p95Ms}ms p99=${readerResult.p99Ms}ms`
    );
    if (readerResult.errorSample) console.log(`  sample: ${readerResult.errorSample}`);
  } else {
    console.log('  reader produced no result');
  }

  console.log('\n== Database');
  console.log(`  expected rows ${expected} (seed ${opts.memories} + acknowledged ${acknowledged}), committed ${committed}`);
  console.log(`  lost writes ${lost}, FTS rows ${ftsRows}, pending FTS ${pendingFts}, integrity ${integrity}`);
  console.log(`  file ${mb(sizes.db)}, WAL ${mb(sizes.wal)}`);
  console.log(`  tmp ${stamp}: ${root}`);

  const failed =
    lost > 0 ||
    integrity !== 'ok' ||
    writerResults.some((entry) => entry.otherErrors > 0) ||
    (readerResult ? readerResult.errors > 0 : true);
  if (failed) {
    console.log('\nRESULT: FAIL');
    process.exitCode = 1;
  } else {
    console.log('\nRESULT: PASS');
  }
}

// ==========================================
// Entry
// ==========================================

const args = process.argv.slice(2);
const dbArg = argValue('--db');
const rootArg = argValue('--root');
const secondsArg = Number(argValue('--seconds') ?? 30);

if (args.includes('--writer')) {
  const label = argValue('--writer') as string;
  if (!dbArg || !rootArg) throw new Error('--writer requires --db and --root');
  await writerMode(path.resolve(dbArg), path.resolve(rootArg), PATTERN, label, secondsArg);
} else if (args.includes('--reader')) {
  if (!dbArg || !rootArg) throw new Error('--reader requires --db and --root');
  await readerMode(path.resolve(dbArg), path.resolve(rootArg), PATTERN, secondsArg);
} else if (args.includes('--drain')) {
  if (!dbArg) throw new Error('--drain requires --db');
  const db = initDatabase(path.resolve(dbArg));
  const indexed = rebuildMemoriesFts(db);
  const pending = (db.prepare('SELECT COUNT(*) AS c FROM memory_fts_queue').get() as any).c;
  db.close();
  console.log(`Drained ${indexed} rows into memories_fts; pending ${pending}`);
} else {
  await main();
}
