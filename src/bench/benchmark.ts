import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { searchMemories, sanitizeFtsQuery } from '../search/hybrid-rrf.js';
import { TOKEN_LEVELS, estimateTokens } from '../search/budget.js';

/**
 * NOTE ON HONESTY: the benchmark cases below are small, hand-written synthetic cases
 * (NOT SWE-bench or LongMemEval data). The competitor rows ("Hippo-style", "Memoria-style",
 * "Static dump") are simulated baselines implemented in this file — they are NOT the real
 * projects and their numbers say nothing about those projects' actual performance.
 */
export const SIMULATED_BASELINE_LABEL = 'simulated baseline (not the real project)';

/** Runs the benchmark on an isolated in-memory database (never touches a user DB). */
export async function runIsolatedBenchmarks(projectId: string = 'bench_proj'): Promise<BenchmarkReport> {
  const db = new DatabaseSync(':memory:');
  try {
    return await runBenchmarks(db, projectId);
  } finally {
    db.close();
  }
}

export interface BenchmarkCase {
  id: string;
  category: 'exact_keyword' | 'semantic_paraphrase' | 'file_trap' | 'bitemporal_superseded' | 'synthetic_issue' | 'synthetic_long_horizon';
  query: string;
  file?: string;
  expectedMemoryId: string;
  isTrap?: boolean;
}

export interface EngineScore {
  name: string;
  hitAt1: number;
  hitAt3: number;
  hitAt5: number;
  mrr: number; // Mean Reciprocal Rank
  avgLatencyMs: number;
  trapRecallRate: number;
  avgTokens: number;
}

export interface BenchmarkReport {
  timestamp: string;
  totalCases: number;
  engines: EngineScore[];
}

export const BENCHMARK_CASES: BenchmarkCase[] = [
  {
    id: 'case_01',
    category: 'file_trap',
    query: 'How should JWT expiration times be formatted in token claims?',
    file: 'src/auth/jwt.ts',
    expectedMemoryId: 'mem_jwt_trap',
    isTrap: true,
  },
  {
    id: 'case_02',
    category: 'exact_keyword',
    query: 'SQLite WAL mode DatabaseSync standard',
    file: 'src/db/sqlite.ts',
    expectedMemoryId: 'mem_sqlite_wal',
  },
  {
    id: 'case_03',
    category: 'semantic_paraphrase',
    query: 'What database engine and concurrency setup should we use for agent state?',
    file: 'src/db/connection.ts',
    expectedMemoryId: 'mem_sqlite_wal',
  },
  {
    id: 'case_04',
    category: 'file_trap',
    query: 'Fix connection pool starvation error in Postgres adapter',
    file: 'src/db/postgres.ts',
    expectedMemoryId: 'mem_pg_pool_trap',
    isTrap: true,
  },
  {
    id: 'case_05',
    category: 'bitemporal_superseded',
    query: 'What is the active authentication token signing algorithm?',
    file: 'src/auth/jwt.ts',
    expectedMemoryId: 'mem_jwt_active',
  },
  {
    id: 'case_06',
    category: 'semantic_paraphrase',
    query: 'Prevent SQL injection in raw parameter substitution',
    file: 'src/db/queries.ts',
    expectedMemoryId: 'mem_sql_params_rule',
  },
  {
    id: 'case_07',
    category: 'file_trap',
    query: 'CORS header wildcard breaks credentials in fetch API',
    file: 'src/api/cors.ts',
    expectedMemoryId: 'mem_cors_trap',
    isTrap: true,
  },
  {
    id: 'case_08',
    category: 'exact_keyword',
    query: 'Reciprocal Rank Fusion k constant parameter value',
    file: 'src/search/hybrid-rrf.ts',
    expectedMemoryId: 'mem_rrf_k60',
  },
  {
    id: 'case_09',
    category: 'synthetic_issue',
    query: 'Handle concurrent SQLite write collisions with busy_timeout backoff',
    file: 'src/db/concurrency.ts',
    expectedMemoryId: 'mem_sqlite_busy_timeout',
  },
  {
    id: 'case_10',
    category: 'synthetic_long_horizon',
    query: 'Recall architectural decision on zero background daemons established in initial design',
    file: 'src/architecture/design.ts',
    expectedMemoryId: 'mem_zero_daemon_adr',
  },
  {
    id: 'case_11',
    category: 'synthetic_issue',
    query: 'Uncaught syntax exception in JSON.parse stream when body payload is empty',
    file: 'src/api/stream.ts',
    expectedMemoryId: 'mem_empty_json_trap',
    isTrap: true,
  },
  {
    id: 'case_12',
    category: 'synthetic_long_horizon',
    query: 'What is the active official MCP protocol SDK dependency version?',
    file: 'package.json',
    expectedMemoryId: 'mem_mcp_sdk_v2',
  },
];

export function setupBenchmarkDatabase(db: DatabaseSync, projectId: string = 'bench_proj'): FastrRepository {
  applySchema(db);
  const repo = new FastrRepository(db);

  const insertHelper = (
    id: string,
    module: string,
    kind: 'rule' | 'error_trap' | 'pattern' | 'decision' | 'glossary',
    title: string,
    content: string,
    files: string[],
    status: 'verified' | 'staging' | 'superseded',
    rewardScore: number,
    validTo: string | null = null
  ) => {
    db.prepare(`
      INSERT OR REPLACE INTO memories (id, project_id, module, kind, title, content, status, reward_score, valid_to)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, projectId, module, kind, title, content, status, rewardScore, validTo);

    db.prepare('DELETE FROM file_links WHERE memory_id = ?').run(id);
    repo.linkFiles(id, files);
  };

  // 1. JWT Error Trap
  insertHelper(
    'mem_jwt_trap',
    'auth',
    'error_trap',
    'Never Use Date.now() Milliseconds for JWT Expiration',
    'JWT exp claims expect integer seconds. Always use Math.floor(Date.now() / 1000).',
    ['src/auth/jwt.ts'],
    'verified',
    1.0
  );

  // 2. SQLite WAL Rule
  insertHelper(
    'mem_sqlite_wal',
    'db',
    'rule',
    'Native Node 24 SQLite Standard',
    'Always use import { DatabaseSync } from "node:sqlite" with WAL mode for FastrMemory.',
    ['src/db/sqlite.ts', 'src/db/connection.ts'],
    'verified',
    1.0
  );

  // 3. Postgres Pool Trap
  insertHelper(
    'mem_pg_pool_trap',
    'db',
    'error_trap',
    'Postgres Client Must Always Call client.release() in Finally Block',
    'Failing to release pool clients causes pool exhaustion within 10 concurrent requests.',
    ['src/db/postgres.ts'],
    'verified',
    1.0
  );

  // 4. Superseded Auth Rule (Old RS256 -> Active Ed25519)
  insertHelper(
    'mem_jwt_old',
    'auth',
    'rule',
    'Token Signing RS256 Algorithm',
    'Use RS256 with 2048-bit RSA keys for JWT token signing.',
    ['src/auth/jwt.ts'],
    'superseded',
    0.2,
    '2026-10-18T20:00:00Z'
  );

  insertHelper(
    'mem_jwt_active',
    'auth',
    'rule',
    'Token Signing Ed25519 Standard',
    'Standardize on Ed25519 asymmetric signatures for ultra-low latency token verification.',
    ['src/auth/jwt.ts'],
    'verified',
    1.0
  );

  // 5. SQL Injection Rule
  insertHelper(
    'mem_sql_params_rule',
    'db',
    'rule',
    'Mandatory Parameterized Queries in SQL',
    'Never concatenate user input directly into SQL strings. Always pass parameters via bind variables.',
    ['src/db/queries.ts'],
    'verified',
    1.0
  );

  // 6. CORS Trap
  insertHelper(
    'mem_cors_trap',
    'api',
    'error_trap',
    'Access-Control-Allow-Origin Wildcard Rejects Credentials',
    'When credentials are required, Access-Control-Allow-Origin must specify exact client origin, not *.',
    ['src/api/cors.ts'],
    'verified',
    1.0
  );

  // 7. RRF Rule
  insertHelper(
    'mem_rrf_k60',
    'search',
    'rule',
    'RRF Smoothing Constant K Equals 60',
    'Reciprocal Rank Fusion must use smoothing constant k=60 to balance BM25 full-text and vector ranking.',
    ['src/search/hybrid-rrf.ts'],
    'verified',
    1.0
  );

  // 8. Concurrency Rule (synthetic)
  insertHelper(
    'mem_sqlite_busy_timeout',
    'db',
    'rule',
    'Configure SQLite busy_timeout = 5000ms for High Concurrency',
    'Set PRAGMA busy_timeout = 5000 and handle SQLITE_BUSY with exponential backoff retry loops.',
    ['src/db/concurrency.ts'],
    'verified',
    1.0
  );

  // 9. Architectural Decision (synthetic)
  insertHelper(
    'mem_zero_daemon_adr',
    'architecture',
    'decision',
    'Zero-Daemon Embedded In-Process Node.js Architecture',
    'Avoid long-running background daemon dependencies. All operations execute via in-process SQLite WAL mode.',
    ['src/architecture/design.ts'],
    'verified',
    1.0
  );

  // 10. Empty JSON Stream Trap (synthetic)
  insertHelper(
    'mem_empty_json_trap',
    'api',
    'error_trap',
    'Always Guard JSON.parse Against Empty String Payloads',
    'Empty request bodies throw SyntaxError in JSON.parse. Always fallback to JSON.parse(body || "{}").',
    ['src/api/stream.ts'],
    'verified',
    1.0
  );

  // 11. MCP SDK Rule (synthetic)
  insertHelper(
    'mem_mcp_sdk_v2',
    'mcp',
    'rule',
    'Standardize on Official v2 @modelcontextprotocol/server SDK',
    'Always import McpServer from "@modelcontextprotocol/server". Do not use legacy deprecated SDKs.',
    ['package.json'],
    'verified',
    1.0
  );

  return repo;
}

export async function runBenchmarks(db: DatabaseSync, projectId: string = 'bench_proj'): Promise<BenchmarkReport> {
  setupBenchmarkDatabase(db, projectId);

  const cases = BENCHMARK_CASES;

  // Trackers for FastrMemory (Triple-Stream RRF + 2.0x Trap Boost)
  let fastrHits1 = 0, fastrHits3 = 0, fastrHits5 = 0, fastrReciprocalSum = 0;
  let fastrTrapHits = 0, fastrTotalTraps = 0;
  let fastrLatencySum = 0, fastrTokensSum = 0;

  // Trackers for Hippo-style simulated baseline (pure BM25, no vector, no trap multiplier)
  let hippoHits1 = 0, hippoHits3 = 0, hippoHits5 = 0, hippoReciprocalSum = 0;
  let hippoTrapHits = 0;
  let hippoLatencySum = 0, hippoTokensSum = 0;

  // Trackers for Memoria-style simulated baseline (no trap multiplier)
  let memoriaHits1 = 0, memoriaHits3 = 0, memoriaHits5 = 0, memoriaReciprocalSum = 0;
  let memoriaTrapHits = 0;
  let memoriaLatencySum = 0, memoriaTokensSum = 0;

  // Trackers for Static Flat Dump Baseline (CLAUDE.md / .cursorrules full context dump)
  let staticHits1 = 0, staticHits3 = 0, staticHits5 = 0, staticReciprocalSum = 0;
  let staticTrapHits = 0;
  let staticLatencySum = 0, staticTokensSum = 0;

  for (const c of cases) {
    if (c.isTrap) fastrTotalTraps++;

    // 1. Evaluate FastrMemory (Triple Stream RRF + Trap Boost)
    const t0 = performance.now();
    const fastrRes = await searchMemories(db, {
      projectId,
      query: c.query,
      files: c.file ? [c.file] : [],
      budgetTokens: TOKEN_LEVELS.L2_TASK_RECALL,
    });
    const t1 = performance.now();
    fastrLatencySum += (t1 - t0);
    fastrTokensSum += fastrRes.totalTokens;

    const fastrIds = fastrRes.memories.map((m) => m.memory.id);
    const fastrRank = fastrIds.indexOf(c.expectedMemoryId) + 1;
    if (fastrRank === 1) fastrHits1++;
    if (fastrRank > 0 && fastrRank <= 3) fastrHits3++;
    if (fastrRank > 0 && fastrRank <= 5) {
      fastrHits5++;
      if (c.isTrap) fastrTrapHits++;
    }
    if (fastrRank > 0) fastrReciprocalSum += 1 / fastrRank;

    // 2. Evaluate Hippo-style simulated baseline (pure BM25 FTS5 MATCH, no vector, no trap boost)
    const t2 = performance.now();
    const hippoFts = sanitizeFtsQuery(c.query);
    const ftsRows = hippoFts
      ? db.prepare(`
          SELECT m.id, m.title, m.content, f.rank
          FROM memories_fts f
          JOIN memories m ON m.id = f.id
          WHERE m.project_id = ? AND m.valid_to IS NULL
            AND memories_fts MATCH ?
          ORDER BY f.rank ASC
          LIMIT 5
        `).all(projectId, hippoFts) as unknown as { id: string; title: string; content: string; rank: number }[]
      : [];
    const t3 = performance.now();
    hippoLatencySum += (t3 - t2);
    hippoTokensSum += ftsRows.reduce((sum, r) => sum + estimateTokens(`${r.title}\n${r.content}\n`), 0);

    const hippoIds = ftsRows.map((r) => r.id);
    const hippoRank = hippoIds.indexOf(c.expectedMemoryId) + 1;
    if (hippoRank === 1) hippoHits1++;
    if (hippoRank > 0 && hippoRank <= 3) hippoHits3++;
    if (hippoRank > 0 && hippoRank <= 5) {
      hippoHits5++;
      if (c.isTrap) hippoTrapHits++;
    }
    if (hippoRank > 0) hippoReciprocalSum += 1 / hippoRank;

    // 3. Evaluate Memoria-style simulated baseline (keyword overlap, no trap multiplier)
    const t4 = performance.now();
    const memRows = db.prepare(`
      SELECT id, title, content, kind FROM memories WHERE project_id = ? AND valid_to IS NULL
    `).all(projectId) as unknown as { id: string; title: string; content: string; kind: string }[];
    // Simulated keyword-overlap scoring standing in for an episodic graph engine (not the real Memoria)
    const queryTokens = c.query.toLowerCase().split(/\s+/);
    const scoredMemoria = memRows.map((r) => {
      let score = 0;
      queryTokens.forEach((tk) => {
        if (r.title.toLowerCase().includes(tk)) score += 1.5;
        if (r.content.toLowerCase().includes(tk)) score += 0.8;
      });
      // No trap boost (and no artificial trap penalty) in this simulated baseline
      return { id: r.id, score, tokens: estimateTokens(`${r.title}\n${r.content}\n`) };
    }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
    const t5 = performance.now();
    memoriaLatencySum += (t5 - t4); // measured only; no synthetic latency penalty
    memoriaTokensSum += scoredMemoria.reduce((sum, r) => sum + r.tokens, 0);

    const memoriaIds = scoredMemoria.map((r) => r.id);
    const memoriaRank = memoriaIds.indexOf(c.expectedMemoryId) + 1;
    if (memoriaRank === 1) memoriaHits1++;
    if (memoriaRank > 0 && memoriaRank <= 3) memoriaHits3++;
    if (memoriaRank > 0 && memoriaRank <= 5) {
      memoriaHits5++;
      if (c.isTrap) memoriaTrapHits++;
    }
    if (memoriaRank > 0) memoriaReciprocalSum += 1 / memoriaRank;

    // 4. Evaluate Static Flat Dump Baseline (CLAUDE.md / .cursorrules full dump)
    const t6 = performance.now();
    const allRows = db.prepare(`SELECT id, content FROM memories WHERE project_id = ?`).all(projectId) as unknown as { id: string; content: string }[];
    const queryTerms = c.query.toLowerCase().split(/\s+/).slice(0, 3);
    const matched = allRows.filter((r) => queryTerms.some((term) => r.content.toLowerCase().includes(term)));
    const t7 = performance.now();
    staticLatencySum += (t7 - t6);
    // A flat dump injects every memory into context: count the real size of that dump
    staticTokensSum += allRows.reduce((sum, r) => sum + estimateTokens(r.content), 0);

    const staticIds = matched.map((r) => r.id);
    const staticRank = staticIds.indexOf(c.expectedMemoryId) + 1;
    if (staticRank === 1) staticHits1++;
    if (staticRank > 0 && staticRank <= 3) staticHits3++;
    if (staticRank > 0 && staticRank <= 5) {
      staticHits5++;
      if (c.isTrap) staticTrapHits++;
    }
    if (staticRank > 0) staticReciprocalSum += 1 / staticRank;
  }

  const n = cases.length;

  const engines: EngineScore[] = [
    {
      name: 'FastrMemory (Triple-Stream RRF)',
      hitAt1: Math.round((fastrHits1 / n) * 100),
      hitAt3: Math.round((fastrHits3 / n) * 100),
      hitAt5: Math.round((fastrHits5 / n) * 100),
      mrr: Number((fastrReciprocalSum / n).toFixed(3)),
      avgLatencyMs: Number((fastrLatencySum / n).toFixed(2)),
      trapRecallRate: Math.round((fastrTrapHits / fastrTotalTraps) * 100),
      avgTokens: Math.round(fastrTokensSum / n),
    },
    {
      name: `Hippo-style BM25 (${SIMULATED_BASELINE_LABEL})`,
      hitAt1: Math.round((hippoHits1 / n) * 100),
      hitAt3: Math.round((hippoHits3 / n) * 100),
      hitAt5: Math.round((hippoHits5 / n) * 100),
      mrr: Number((hippoReciprocalSum / n).toFixed(3)),
      avgLatencyMs: Number((hippoLatencySum / n).toFixed(2)),
      trapRecallRate: Math.round((hippoTrapHits / fastrTotalTraps) * 100),
      avgTokens: Math.round(hippoTokensSum / n),
    },
    {
      name: `Memoria-style episodic (${SIMULATED_BASELINE_LABEL})`,
      hitAt1: Math.round((memoriaHits1 / n) * 100),
      hitAt3: Math.round((memoriaHits3 / n) * 100),
      hitAt5: Math.round((memoriaHits5 / n) * 100),
      mrr: Number((memoriaReciprocalSum / n).toFixed(3)),
      avgLatencyMs: Number((memoriaLatencySum / n).toFixed(2)),
      trapRecallRate: Math.round((memoriaTrapHits / fastrTotalTraps) * 100),
      avgTokens: Math.round(memoriaTokensSum / n),
    },
    {
      name: `Static flat dump (${SIMULATED_BASELINE_LABEL})`,
      hitAt1: Math.round((staticHits1 / n) * 100),
      hitAt3: Math.round((staticHits3 / n) * 100),
      hitAt5: Math.round((staticHits5 / n) * 100),
      mrr: Number((staticReciprocalSum / n).toFixed(3)),
      avgLatencyMs: Number((staticLatencySum / n).toFixed(2)),
      trapRecallRate: Math.round((staticTrapHits / fastrTotalTraps) * 100),
      avgTokens: Math.round(staticTokensSum / n),
    },
  ];

  return {
    timestamp: new Date().toISOString(),
    totalCases: n,
    engines,
  };
}

export function formatBenchmarkMarkdown(report: BenchmarkReport): string {
  let md = `### 📊 FastrMemory Cognitive Retrieval Benchmark Suite\n\n`;
  md += `| Engine Architecture | Hit@1 | Hit@3 | Hit@5 | MRR | Latency | Trap Recall | Avg Tokens |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  // Bold the row with the best MRR (ties: higher Hit@1), whichever engine that is.
  const best = [...report.engines].sort((a, b) => b.mrr - a.mrr || b.hitAt1 - a.hitAt1)[0];
  for (const e of report.engines) {
    const isWinner = e === best;
    const bold = (val: string | number) => (isWinner ? `**${val}**` : `${val}`);
    md += `| ${bold(e.name)} | ${bold(`${e.hitAt1}%`)} | ${bold(`${e.hitAt3}%`)} | ${bold(`${e.hitAt5}%`)} | ${bold(e.mrr)} | ${bold(`${e.avgLatencyMs}ms`)} | ${bold(`${e.trapRecallRate}%`)} | ${bold(`${e.avgTokens}t`)} |\n`;
  }

  md += `\n*Evaluated across ${report.totalCases} hand-written synthetic cases (error traps, keyword, paraphrase, bi-temporal supersession). These are NOT SWE-bench or LongMemEval data. Rows marked "simulated baseline" are approximations implemented inside FastrMemory, not the real projects.*\n\n`;

  // Visual ASCII Accuracy Bars
  md += `#### ⚡ Error Trap Recall Comparison (Zero-Regression Safeguard):\n\`\`\`text\n`;
  for (const e of report.engines) {
    const filled = Math.round(e.trapRecallRate / 5);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    const paddedName = e.name.padEnd(64, ' ');
    md += `${paddedName} ${bar} ${e.trapRecallRate}%\n`;
  }
  md += `\`\`\`\n\n`;

  // Visual Token Context Economy
  md += `#### 📉 Context Token Economy (Lower is Better):\n\`\`\`text\n`;
  for (const e of report.engines) {
    const filled = Math.min(20, Math.round(e.avgTokens / 120));
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    const paddedName = e.name.padEnd(64, ' ');
    md += `${paddedName} ${bar} ${e.avgTokens} tokens\n`;
  }
  md += `\`\`\`\n`;

  return md;
}
