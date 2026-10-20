import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { applySchema, configurePragmas } from '../src/db/schema.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';
import { TOKEN_LEVELS } from '../src/search/budget.js';

const MODULES = ['auth', 'db', 'api', 'ui', 'search', 'cache', 'billing', 'deploy'];
const TOPICS = [
  'JWT expiration uses integer seconds',
  'SQLite WAL mode for concurrent writes',
  'CORS wildcard rejects credentialed requests',
  'Parameterized queries prevent SQL injection',
  'Connection pool clients must be released',
  'Empty JSON bodies throw a syntax error',
  'Reciprocal rank fusion uses k equals 60',
  'Vector backfill must not run on the hot path',
  'Trap recall runs before editing a file',
  'Handoff requires passing tests first'
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[idx];
}

function buildDatabase(size: number, dir: string): { db: DatabaseSync; queries: Array<{ text: string; file?: string }> } {
  const dbPath = path.join(dir, `latency-${size}.db`);
  fs.rmSync(dbPath, { force: true });
  const db = new DatabaseSync(dbPath);
  configurePragmas(db);
  applySchema(db);

  const rand = mulberry32(12345 + size);
  const projectId = 'proj_latency';
  const insertMemory = db.prepare(`
    INSERT INTO memories (id, project_id, module, kind, title, content, status, reward_score)
    VALUES (?, ?, ?, ?, ?, ?, 'verified', 1.0)
  `);
  const insertLink = db.prepare('INSERT OR IGNORE INTO file_links (memory_id, file_path) VALUES (?, ?)');

  db.exec('BEGIN IMMEDIATE');
  try {
    for (let i = 0; i < size; i++) {
      const module = MODULES[i % MODULES.length];
      const topic = TOPICS[i % TOPICS.length];
      const id = `mem_${i.toString(16).padStart(8, '0')}`;
      const title = `${module} rule ${i}: ${topic}`;
      const content = `${topic}. Module ${module}. Applies to file src/${module}/file_${i % 97}.ts. ` +
        `This synthetic record exists only to measure recall latency at scale.`;
      insertMemory.run(id, projectId, module, i % 7 === 0 ? 'error_trap' : 'rule', title, content);
      if (i % 10 === 0) insertLink.run(id, `src/${module}/file_${i % 97}.ts`);
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  const queries: Array<{ text: string; file?: string }> = [];
  const count = Math.min(200, size);
  for (let n = 0; n < count; n++) {
    const i = Math.floor(rand() * size);
    const module = MODULES[i % MODULES.length];
    const topic = TOPICS[i % TOPICS.length];
    queries.push({
      text: `${topic} in ${module} module`,
      file: n % 2 === 0 ? `src/${module}/file_${i % 97}.ts` : undefined
    });
  }

  return { db, queries };
}

async function measure(size: number, queryCount: number): Promise<{ size: number; queries: number; p50: number; p95: number; mean: number }> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `fastr-latency-${size}-`));
  const { db, queries } = buildDatabase(size, dir);
  try {
    const samples: number[] = [];
    // Warm up caches and the FTS index before recording.
    for (const q of queries.slice(0, 10)) {
      await searchMemories(db, { projectId: 'proj_latency', query: q.text, files: q.file ? [q.file] : [], budgetTokens: TOKEN_LEVELS.L2_TASK_RECALL, backfill: false });
    }
    for (let rep = 0; rep < 3; rep++) {
      for (const q of queries.slice(0, queryCount)) {
        const t0 = performance.now();
        await searchMemories(db, { projectId: 'proj_latency', query: q.text, files: q.file ? [q.file] : [], budgetTokens: TOKEN_LEVELS.L2_TASK_RECALL, backfill: false });
        samples.push(performance.now() - t0);
      }
    }
    samples.sort((a, b) => a - b);
    return {
      size,
      queries: samples.length,
      p50: Number(percentile(samples, 50).toFixed(2)),
      p95: Number(percentile(samples, 95).toFixed(2)),
      mean: Number((samples.reduce((a, b) => a + b, 0) / samples.length).toFixed(2))
    };
  } finally {
    db.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

async function main() {
  const sizes = [1000, 10000];
  const queryCount = 50;
  const results = [];
  for (const size of sizes) {
    const result = await measure(size, queryCount);
    results.push(result);
    console.log(`size=${result.size} queries=${result.queries} p50=${result.p50}ms p95=${result.p95}ms mean=${result.mean}ms`);
  }
  const outDir = path.resolve('docs', 'audit');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, '2026-10-20-recall-latency.json'),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), node: process.version, platform: `${process.platform} ${process.arch}`, results }, null, 2)}\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
