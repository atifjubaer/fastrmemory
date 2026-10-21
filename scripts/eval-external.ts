/**
 * External retrieval baseline runner.
 *
 * Two engines are supported:
 *   - minisearch: a pinned, generic in-memory full-text engine.
 *   - mcp-memory: the pinned official MCP reference memory server, driven over stdio.
 *
 * The external engine receives the same parsed memories and cases as the internal public
 * harness. No dataset-specific tuning is performed. Raw output records the engine version,
 * package integrity, adapter rules, dataset pin, command, and caveats.
 *
 * Usage:
 *   npx tsx scripts/eval-external.ts longmemeval --engine minisearch
 *   npx tsx scripts/eval-external.ts locomo --engine mcp-memory
 *
 * The MCP engine needs a local install:
 *   npm install --prefix bench/external --no-save --no-package-lock \
 *     @modelcontextprotocol/server-memory@2.0.0
 */

import { execFileSync, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import MiniSearch from 'minisearch';
import {
  parseLoCoMo,
  parseLongMemEval,
  type PublicDataset,
  type PublicMemory
} from '../src/bench/public-datasets.js';
import {
  caseResult,
  metricsFromCases,
  type PublicCaseResult,
  type PublicCategoryMetrics,
  type PublicMetrics
} from '../src/bench/public-harness.js';
import { PUBLIC_DATASET_PINS, readJson, verifyDatasetPin, type DatasetPin } from '../src/bench/public-pins.js';
import { estimateTokens } from '../src/search/budget.js';

type DatasetName = 'longmemeval' | 'locomo';
type EngineName = 'minisearch' | 'mcp-memory';

const MCP_PACKAGE = {
  name: '@modelcontextprotocol/server-memory',
  version: '2.0.0',
  integrity: 'sha512-h+oxQCpK6FOuhlPB9hAcSihAAahcnijuGTZGcXStGOL4UzFYB4ap+pvtSelxchkZlz7tnpY/e0sONaAs24Rurw=='
};

const MCP_PROTOCOL_VERSION = '2025-11-25';
const MCP_DEFAULT_SERVER = path.join(
  'bench',
  'external',
  'node_modules',
  '@modelcontextprotocol',
  'server-memory',
  'dist',
  'index.js'
);

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then', 'than', 'that', 'this', 'these', 'those',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am', 'to', 'of', 'in', 'on', 'at', 'for',
  'with', 'by', 'from', 'as', 'it', 'its', 'he', 'she', 'they', 'them', 'his', 'her', 'their',
  'we', 'you', 'i', 'me', 'my', 'our', 'your', 'what', 'when', 'where', 'who', 'whom', 'which',
  'why', 'how', 'did', 'do', 'does', 'done', 'had', 'has', 'have', 'can', 'could', 'would',
  'should', 'will', 'shall', 'may', 'might', 'must', 'not', 'no', 'yes', 'about', 'into', 'over',
  'after', 'before', 'during', 'between', 'under', 'again', 'further', 'once', 'here', 'there',
  'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own',
  'same', 'so', 'too', 'very', 'just', 'now', 'also', 'ever', 'never', 'always', 'often',
  'sometimes', 'up', 'down', 'out', 'off', 'because', 'while', 'although', 'though', 'since',
  'until', 'unless', 'upon', 'per', 'via', 'vs', 's', 't', 'd', 'll', 're', 've', 'm'
]);

interface Args {
  dataset: DatasetName;
  engine: EngineName;
  data: string;
  out: string;
  limit?: number;
  maxCases?: number;
  server: string;
  timeoutMs: number;
  allowMismatch: boolean;
  keepTemp: boolean;
}

interface EngineRun {
  name: string;
  package: string;
  version: string;
  integrity: string;
  adapter: Record<string, unknown>;
  server?: Record<string, unknown>;
}

interface ExternalOutput {
  schemaVersion: number;
  generatedAt: string;
  command: string;
  code: {
    commit: string;
    branch: string;
  };
  dataset: {
    name: string;
    source: string;
    pin: DatasetPin & { sha256: string };
    examples: number;
    skippedCases: number;
    memories: number;
    projects: number;
  };
  engine: EngineRun;
  environment: {
    node: string;
    platform: string;
    arch: string;
    cpus: number;
    totalMemoryBytes: number;
  };
  results: {
    overall: PublicMetrics;
    byCategory: PublicCategoryMetrics[];
    cases: PublicCaseResult[];
  };
}

interface McpEntity {
  name: string;
  entityType: string;
  observations: string[];
}

interface McpSearchResult {
  entities: McpEntity[];
  relations: unknown[];
}

function parseArgs(argv: string[]): Args {
  const dataset = argv[0] as DatasetName;
  if (!['longmemeval', 'locomo'].includes(dataset)) {
    throw new Error('dataset must be longmemeval or locomo');
  }
  const args: Args = {
    dataset,
    engine: 'minisearch',
    data: path.join('bench', 'data'),
    out: '',
    server: MCP_DEFAULT_SERVER,
    timeoutMs: 60000,
    allowMismatch: false,
    keepTemp: false
  };
  for (let index = 1; index < argv.length; index++) {
    const arg = argv[index];
    const next = () => {
      const value = argv[++index];
      if (value === undefined) throw new Error(`Missing value for ${arg}`);
      return value;
    };
    if (arg === '--engine') args.engine = next() as EngineName;
    else if (arg === '--data') args.data = next();
    else if (arg === '--out') args.out = next();
    else if (arg === '--limit') args.limit = Number(next());
    else if (arg === '--max-cases') args.maxCases = Number(next());
    else if (arg === '--server') args.server = next();
    else if (arg === '--timeout') args.timeoutMs = Number(next());
    else if (arg === '--allow-mismatch') args.allowMismatch = true;
    else if (arg === '--keep-temp') args.keepTemp = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!['minisearch', 'mcp-memory'].includes(args.engine)) {
    throw new Error('--engine must be minisearch or mcp-memory');
  }
  if (!args.out) {
    args.out = path.join('bench', 'results', `external-${args.engine}-${args.dataset}.json`);
  }
  return args;
}

function git(cwd: string, gitArgs: string[]): string {
  return execFileSync('git', gitArgs, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024
  });
}

function gitHead(cwd: string): string {
  try {
    return git(cwd, ['rev-parse', 'HEAD']).trim();
  } catch {
    return 'unknown';
  }
}

function gitBranch(cwd: string): string {
  try {
    return git(cwd, ['rev-parse', '--abbrev-ref', 'HEAD']).trim();
  } catch {
    return 'unknown';
  }
}

function sha256File(file: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase();
}

function groupBy<T>(values: T[], key: (value: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const value of values) {
    const groupKey = key(value);
    const group = groups.get(groupKey);
    if (group) group.push(value);
    else groups.set(groupKey, [value]);
  }
  return groups;
}

function queryTokens(query: string): string[] {
  const raw = query.toLowerCase().match(/[a-z0-9][a-z0-9'-]*/g) ?? [];
  const tokens = raw
    .map((token) => token.replace(/^[-']+|[-']+$/g, ''))
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token));
  return Array.from(new Set(tokens)).slice(0, 8);
}

function categoryMetrics(cases: PublicCaseResult[]): PublicCategoryMetrics[] {
  const groups = groupBy(cases, (item) => item.category);
  return Array.from(groups.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, items]) => ({ category, ...metricsFromCases(items) }));
}

function engineInfoForMiniSearch(): EngineRun {
  const lock = JSON.parse(fs.readFileSync(path.join('package-lock.json'), 'utf8')) as {
    packages?: Record<string, { version?: string; integrity?: string }>;
  };
  const entry = lock.packages?.['node_modules/minisearch'];
  if (!entry?.version || !entry.integrity) {
    throw new Error('minisearch is not pinned in package-lock.json; run npm install');
  }
  return {
    name: 'minisearch',
    package: 'minisearch',
    version: entry.version,
    integrity: entry.integrity,
    adapter: {
      fields: ['title', 'content'],
      titleBoost: 2,
      prefix: true,
      fuzzy: false,
      combineWith: 'OR',
      limit: 10,
      tokenization: 'engine default',
      note: 'Generic full-text engine; no memory extraction, consolidation, or graph scoring.'
    }
  };
}

function engineInfoForMcp(serverEntry: string): EngineRun {
  if (!fs.existsSync(serverEntry)) {
    throw new Error(
      `Missing ${serverEntry}. Install the pinned server with:\n` +
        `  npm install --prefix bench/external --no-save --no-package-lock ${MCP_PACKAGE.name}@${MCP_PACKAGE.version}`
    );
  }
  const packageFile = path.join(path.dirname(serverEntry), '..', 'package.json');
  const metadata = JSON.parse(fs.readFileSync(packageFile, 'utf8')) as { version?: string };
  if (metadata.version !== MCP_PACKAGE.version) {
    throw new Error(
      `MCP server version mismatch: expected ${MCP_PACKAGE.version}, found ${metadata.version ?? 'unknown'}`
    );
  }
  return {
    name: 'mcp-memory',
    package: MCP_PACKAGE.name,
    version: MCP_PACKAGE.version,
    integrity: MCP_PACKAGE.integrity,
    adapter: {
      entityGranularity: 'one entity per memory unit',
      observations: ['title', 'content', 'validFrom'],
      query: 'unique content tokens, max 8, stopwords removed',
      ranking: 'distinct-token coverage, then first-seen order',
      limit: 10,
      note: 'The server search is substring-based and has no relevance score; the adapter only aggregates its matches.'
    },
    server: {
      protocolVersion: MCP_PROTOCOL_VERSION,
      entry: serverEntry.replaceAll('\\', '/'),
      distSha256: sha256File(serverEntry)
    }
  };
}

class McpClient {
  private child: ChildProcessWithoutNullStreams;
  private buffer = '';
  private nextId = 1;
  private pending = new Map<
    number,
    { resolve: (value: unknown) => void; reject: (error: Error) => void; timer: NodeJS.Timeout }
  >();
  private stderr = '';
  private closed = false;

  constructor(
    private readonly serverEntry: string,
    private readonly memoryFile: string,
    private readonly timeoutMs: number
  ) {
    this.child = spawn(process.execPath, [serverEntry], {
      env: { ...process.env, MEMORY_FILE_PATH: memoryFile },
      stdio: ['pipe', 'pipe', 'pipe']
    });
    this.child.stdout.setEncoding('utf8');
    this.child.stderr.setEncoding('utf8');
    this.child.stdout.on('data', (chunk: string) => this.onData(chunk));
    this.child.stderr.on('data', (chunk: string) => {
      this.stderr = `${this.stderr}${chunk}`.slice(-4096);
    });
    this.child.on('error', (error) => this.failAll(error));
    this.child.on('exit', (code, signal) => {
      if (!this.closed) {
        this.failAll(new Error(`MCP server exited early (code=${code}, signal=${signal}): ${this.stderr}`));
      }
    });
  }

  async start(): Promise<void> {
    const initialized = (await this.request('initialize', {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: 'fastr-external-benchmark', version: '0.2.1' }
    })) as { protocolVersion?: string };
    if (!initialized.protocolVersion) {
      throw new Error('MCP initialize response did not include a protocol version');
    }
    this.notify('notifications/initialized', {});
  }

  async createEntities(entities: McpEntity[]): Promise<void> {
    for (let index = 0; index < entities.length; index += 200) {
      const chunk = entities.slice(index, index + 200);
      await this.callTool('create_entities', { entities: chunk });
    }
  }

  async searchNodes(query: string): Promise<McpEntity[]> {
    const result = (await this.callTool('search_nodes', { query })) as McpSearchResult;
    return Array.isArray(result.entities) ? result.entities : [];
  }

  async close(): Promise<void> {
    this.closed = true;
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(new Error('MCP client closed'));
    }
    this.pending.clear();
    if (this.child.exitCode !== null) return;
    try {
      this.child.stdin.end();
    } catch {
      // The pipe may already be closed by a crashed server.
    }
    await new Promise<void>((resolve) => {
      if (this.child.exitCode !== null) {
        resolve();
        return;
      }
      const timer = setTimeout(() => {
        this.child.kill();
        resolve();
      }, 1000);
      this.child.once('exit', () => {
        clearTimeout(timer);
        resolve();
      });
    });
  }

  private onData(chunk: string): void {
    this.buffer += chunk;
    let newline: number;
    while ((newline = this.buffer.indexOf('\n')) >= 0) {
      const line = this.buffer.slice(0, newline).replace(/\r$/, '').trim();
      this.buffer = this.buffer.slice(newline + 1);
      if (!line) continue;
      let message: { id?: number; result?: unknown; error?: { code?: number; message?: string } };
      try {
        message = JSON.parse(line) as typeof message;
      } catch {
        continue;
      }
      if (typeof message.id !== 'number') continue;
      const pending = this.pending.get(message.id);
      if (!pending) continue;
      clearTimeout(pending.timer);
      this.pending.delete(message.id);
      if (message.error) {
        pending.reject(new Error(`MCP error ${message.error.code ?? ''}: ${message.error.message ?? 'unknown'}`));
      } else {
        pending.resolve(message.result);
      }
    }
  }

  private failAll(error: Error): void {
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.pending.clear();
  }

  private request(method: string, params: unknown): Promise<unknown> {
    const id = this.nextId++;
    return new Promise<unknown>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`MCP request timed out after ${this.timeoutMs}ms: ${method}`));
      }, this.timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
    });
  }

  private notify(method: string, params: unknown): void {
    this.child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`);
  }

  private async callTool(name: string, toolArgs: Record<string, unknown>): Promise<unknown> {
    const result = (await this.request('tools/call', { name, arguments: toolArgs })) as {
      structuredContent?: unknown;
      content?: Array<{ type?: string; text?: string }>;
    };
    if (result.structuredContent !== undefined) return result.structuredContent;
    const text = result.content?.find((entry) => entry.type === 'text')?.text;
    if (typeof text === 'string') return JSON.parse(text) as unknown;
    return result;
  }
}

function loadDataset(args: Args): { dataset: PublicDataset; pin: DatasetPin; sha256: string } {
  const expected = PUBLIC_DATASET_PINS[args.dataset];
  const file = path.join(args.data, expected.file);
  const sha256 = verifyDatasetPin(expected, file, args.allowMismatch);
  const raw = readJson(file);
  const dataset = args.dataset === 'longmemeval'
    ? parseLongMemEval(raw, { limit: args.limit })
    : parseLoCoMo(raw, { limit: args.limit });
  if (args.maxCases !== undefined) {
    dataset.cases = dataset.cases.slice(0, args.maxCases);
    dataset.examples = dataset.cases.length;
  }
  return { dataset, pin: expected, sha256 };
}

async function evaluateMiniSearch(
  dataset: PublicDataset,
  limit: number
): Promise<PublicCaseResult[]> {
  const memoriesByProject = groupBy(dataset.memories, (memory) => memory.projectId);
  const casesByProject = groupBy(dataset.cases, (item) => item.projectId);
  const results: PublicCaseResult[] = [];

  for (const [projectId, cases] of casesByProject) {
    const memories = memoriesByProject.get(projectId) ?? [];
    const contentById = new Map(memories.map((memory) => [memory.id, memory.content]));
    const index = new MiniSearch<{ id: string; title: string; content: string }>({
      fields: ['title', 'content'],
      storeFields: ['id', 'content'],
      searchOptions: {
        boost: { title: 2 },
        prefix: true,
        combineWith: 'OR'
      }
    });
    index.addAll(
      memories.map((memory) => ({
        id: memory.id,
        title: memory.title,
        content: memory.content
      }))
    );

    for (const item of cases) {
      const started = performance.now();
      // MiniSearch 7 returns every match; take the ranked top-k explicitly.
      const hits = index.search(item.query).slice(0, limit);
      const retrieved = hits.map((hit) => String(hit.id));
      const latencyMs = performance.now() - started;
      const tokens = retrieved.reduce(
        (sum, id) => sum + estimateTokens(contentById.get(id) ?? ''),
        0
      );
      results.push(caseResult(item, retrieved, tokens, latencyMs));
    }
  }
  return results;
}

async function evaluateMcp(
  dataset: PublicDataset,
  serverEntry: string,
  timeoutMs: number,
  keepTemp: boolean
): Promise<PublicCaseResult[]> {
  const memoriesByProject = groupBy(dataset.memories, (memory) => memory.projectId);
  const casesByProject = groupBy(dataset.cases, (item) => item.projectId);
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-mcp-'));
  const results: PublicCaseResult[] = [];
  let projectIndex = 0;

  try {
    for (const [projectId, cases] of casesByProject) {
      const memories = memoriesByProject.get(projectId) ?? [];
      const contentById = new Map(memories.map((memory) => [memory.id, memory.content]));
      const memoryFile = path.join(tempDir, `${projectId.replace(/[^a-zA-Z0-9._-]/g, '_')}.jsonl`);
      const client = new McpClient(serverEntry, memoryFile, timeoutMs);
      try {
        await client.start();
        await client.createEntities(
          memories.map((memory) => ({
            name: memory.id,
            entityType: projectId,
            observations: [memory.title, memory.content, `validFrom: ${memory.validFrom}`]
          }))
        );

        for (const item of cases) {
          const tokens = queryTokens(item.query);
          const searchTokens = tokens.length > 0 ? tokens : [item.query];
          const scores = new Map<string, { score: number; firstSeen: number }>();
          let firstSeen = 0;
          const started = performance.now();
          for (const token of searchTokens) {
            const entities = await client.searchNodes(token);
            for (const entity of entities) {
              if (!contentById.has(entity.name)) continue;
              const existing = scores.get(entity.name);
              if (existing) existing.score += 1;
              else scores.set(entity.name, { score: 1, firstSeen: firstSeen++ });
            }
          }
          const retrieved = Array.from(scores.entries())
            .sort((left, right) => right[1].score - left[1].score || left[1].firstSeen - right[1].firstSeen)
            .slice(0, 10)
            .map(([id]) => id);
          const latencyMs = performance.now() - started;
          const tokenCount = retrieved.reduce(
            (sum, id) => sum + estimateTokens(contentById.get(id) ?? ''),
            0
          );
          results.push(caseResult(item, retrieved, tokenCount, latencyMs));
        }
      } finally {
        await client.close();
      }
      projectIndex++;
      if (projectIndex % 25 === 0 || projectIndex === casesByProject.size) {
        process.stdout.write(`  indexed ${projectIndex}/${casesByProject.size} projects\n`);
      }
    }
  } finally {
    if (!keepTemp) fs.rmSync(tempDir, { recursive: true, force: true });
  }
  return results;
}

function printSummary(name: string, dataset: string, metrics: PublicMetrics): void {
  console.log(
    `${dataset} / ${name}: cases=${metrics.count} hit@1=${metrics.hitAt1}% ` +
      `hit@5=${metrics.hitAt5}% hit@10=${metrics.hitAt10}% mrr=${metrics.mrr} ` +
      `evidenceRecall@5=${metrics.evidenceRecallAt5} tokens=${metrics.avgTokens} ` +
      `p50=${metrics.p50LatencyMs}ms p95=${metrics.p95LatencyMs}ms`
  );
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const { dataset, pin, sha256 } = loadDataset(args);
  const engine = args.engine === 'minisearch'
    ? engineInfoForMiniSearch()
    : engineInfoForMcp(args.server);

  console.log(
    `${dataset.name}: ${dataset.cases.length} cases, ${dataset.memories.length} memories, ` +
      `${new Set(dataset.cases.map((item) => item.projectId)).size} projects`
  );
  console.log(`Engine: ${engine.name} ${engine.version}`);

  const cases = args.engine === 'minisearch'
    ? await evaluateMiniSearch(dataset, 10)
    : await evaluateMcp(dataset, args.server, args.timeoutMs, args.keepTemp);
  const overall = metricsFromCases(cases);
  const byCategory = categoryMetrics(cases);

  const output: ExternalOutput = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    command: `npx tsx scripts/eval-external.ts ${process.argv.slice(2).join(' ')}`,
    code: {
      commit: gitHead(process.cwd()),
      branch: gitBranch(process.cwd())
    },
    dataset: {
      name: dataset.name,
      source: pin.source,
      pin: { ...pin, sha256 },
      examples: dataset.examples,
      skippedCases: dataset.skippedCases,
      memories: dataset.memories.length,
      projects: new Set(dataset.cases.map((item) => item.projectId)).size
    },
    engine,
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      cpus: os.cpus().length,
      totalMemoryBytes: os.totalmem()
    },
    results: {
      overall,
      byCategory,
      cases
    }
  };

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  printSummary(engine.name, dataset.name, overall);
  console.log(`Wrote ${args.out}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
