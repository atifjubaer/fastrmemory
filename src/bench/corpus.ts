/**
 * Deterministic synthetic corpus for retrieval ablations.
 *
 * This is NOT a real-world benchmark. It exists to compare retrieval configurations on a
 * fixed, auditable set of queries with a 20% held-out split. The cases are generated from
 * the topic table below; `scripts/generate-bench-corpus.ts` writes the same corpus to
 * `bench/corpus.json` so reviewers can inspect every query without running TypeScript.
 */

export type BenchCategory =
  | 'exact_keyword'
  | 'semantic_paraphrase'
  | 'file_trap'
  | 'bitemporal_superseded'
  | 'multi_hop'
  | 'long_horizon';

export type BenchSplit = 'train' | 'holdout';

export interface BenchMemory {
  id: string;
  module: string;
  kind: 'rule' | 'decision' | 'error_trap' | 'workflow';
  title: string;
  content: string;
  files: string[];
  status: 'staging' | 'verified' | 'superseded';
  rewardScore: number;
  validFrom: string;
  validTo: string | null;
  createdAt: string;
  /** Entity linked to this memory for graph seeding. */
  entity?: {
    id: string;
    name: string;
    type: 'symbol' | 'file' | 'tech' | 'service' | 'pattern';
  };
  /** Extra graph edges emitted after all memories are inserted. */
  graphEdges?: Array<{
    targetId: string;
    edgeType: 'causal' | 'entity_link' | 'temporal' | 'association' | 'supersedes';
    weight: number;
  }>;
}

export interface BenchCase {
  id: string;
  category: BenchCategory;
  query: string;
  file?: string;
  expectedMemoryId: string;
  isTrap: boolean;
  split: BenchSplit;
}

export interface BenchCorpus {
  version: number;
  seed: number;
  createdAt: string;
  kind: 'synthetic';
  splitRule: string;
  memories: BenchMemory[];
  cases: BenchCase[];
}

interface TopicSeed {
  module: string;
  topic: string;
  paraphrase: string;
}

/**
 * 60 topics across 12 modules. Topics 1-40 become error traps with a superseded legacy
 * memory; topics 41-60 become decisions used by the multi-hop and long-horizon cases.
 */
const TOPIC_SEEDS: TopicSeed[] = [
  { module: 'db', topic: 'connection pooling', paraphrase: 'database connection reuse' },
  { module: 'db', topic: 'index maintenance', paraphrase: 'keeping database indexes healthy' },
  { module: 'db', topic: 'migration ordering', paraphrase: 'schema change sequence' },
  { module: 'db', topic: 'backup rotation', paraphrase: 'snapshot cycling' },
  { module: 'db', topic: 'query plan review', paraphrase: 'SQL execution plan inspection' },

  { module: 'auth', topic: 'token signing', paraphrase: 'credential signature generation' },
  { module: 'auth', topic: 'session rotation', paraphrase: 'login state renewal' },
  { module: 'auth', topic: 'password hashing', paraphrase: 'credential digest storage' },
  { module: 'auth', topic: 'scope validation', paraphrase: 'permission boundary checks' },
  { module: 'auth', topic: 'key rotation', paraphrase: 'secret rollover' },

  { module: 'api', topic: 'rate limiting', paraphrase: 'request throttling' },
  { module: 'api', topic: 'error envelopes', paraphrase: 'failure response shape' },
  { module: 'api', topic: 'request validation', paraphrase: 'input checking' },
  { module: 'api', topic: 'pagination defaults', paraphrase: 'paging default values' },
  { module: 'api', topic: 'idempotency keys', paraphrase: 'retry-safe identifiers' },

  { module: 'search', topic: 'BM25 weighting', paraphrase: 'lexical scoring boosts' },
  { module: 'search', topic: 'vector fallback', paraphrase: 'embedding backup path' },
  { module: 'search', topic: 'graph activation', paraphrase: 'link spreading' },
  { module: 'search', topic: 'result diversification', paraphrase: 'output variety' },
  { module: 'search', topic: 'token budgeting', paraphrase: 'context allocation' },

  { module: 'ui', topic: 'optimistic updates', paraphrase: 'instant interface changes' },
  { module: 'ui', topic: 'error boundaries', paraphrase: 'failure guards' },
  { module: 'ui', topic: 'keyboard navigation', paraphrase: 'hotkey movement' },
  { module: 'ui', topic: 'chart rendering', paraphrase: 'graph drawing' },
  { module: 'ui', topic: 'bundle splitting', paraphrase: 'package division' },

  { module: 'ci', topic: 'matrix fail-fast', paraphrase: 'grid stop-early behavior' },
  { module: 'ci', topic: 'cache invalidation', paraphrase: 'cache clearing' },
  { module: 'ci', topic: 'artifact retention', paraphrase: 'build output storage' },
  { module: 'ci', topic: 'secret scanning', paraphrase: 'credential detection' },
  { module: 'ci', topic: 'flaky test quarantine', paraphrase: 'unstable check isolation' },

  { module: 'git', topic: 'commit signing', paraphrase: 'change signature' },
  { module: 'git', topic: 'branch protection', paraphrase: 'line guard' },
  { module: 'git', topic: 'merge queue', paraphrase: 'integration line' },
  { module: 'git', topic: 'blame attribution', paraphrase: 'author attribution' },
  { module: 'git', topic: 'release tagging', paraphrase: 'version labeling' },

  { module: 'mcp', topic: 'tool schemas', paraphrase: 'function definitions' },
  { module: 'mcp', topic: 'resource discovery', paraphrase: 'asset finding' },
  { module: 'mcp', topic: 'prompt routing', paraphrase: 'instruction dispatch' },
  { module: 'mcp', topic: 'transport timeouts', paraphrase: 'channel limits' },
  { module: 'mcp', topic: 'capability negotiation', paraphrase: 'feature agreement' },

  { module: 'docs', topic: 'claims ledger', paraphrase: 'assertion record' },
  { module: 'docs', topic: 'benchmark provenance', paraphrase: 'measurement origin' },
  { module: 'docs', topic: 'changelog discipline', paraphrase: 'release notes process' },
  { module: 'docs', topic: 'link checking', paraphrase: 'URL validation' },
  { module: 'docs', topic: 'example freshness', paraphrase: 'sample currency' },

  { module: 'perf', topic: 'cold start budget', paraphrase: 'startup limit' },
  { module: 'perf', topic: 'recall latency', paraphrase: 'retrieval delay' },
  { module: 'perf', topic: 'memory footprint', paraphrase: 'RAM usage' },
  { module: 'perf', topic: 'SQLite pragmas', paraphrase: 'database settings' },
  { module: 'perf', topic: 'batch insertion', paraphrase: 'bulk writes' },

  { module: 'security', topic: 'secret scrubbing', paraphrase: 'credential removal' },
  { module: 'security', topic: 'input sanitization', paraphrase: 'user data cleaning' },
  { module: 'security', topic: 'dependency audits', paraphrase: 'package checks' },
  { module: 'security', topic: 'path traversal', paraphrase: 'route escape' },
  { module: 'security', topic: 'token storage', paraphrase: 'credential persistence' },

  { module: 'testing', topic: 'isolation fixtures', paraphrase: 'separated test data' },
  { module: 'testing', topic: 'snapshot updates', paraphrase: 'baseline changes' },
  { module: 'testing', topic: 'property tests', paraphrase: 'invariant checks' },
  { module: 'testing', topic: 'coverage thresholds', paraphrase: 'range limits' },
  { module: 'testing', topic: 'flaky retries', paraphrase: 'unstable repeats' },
];

const DETAILS = [
  'Prefer deterministic defaults',
  'Fail closed on invalid input',
  'Measure before changing the hot path',
  'Keep the rollback path tested',
  'Record the decision and its owner',
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitFor(index: number): BenchSplit {
  return index % 5 === 4 ? 'holdout' : 'train';
}

export function buildBenchmarkCorpus(seed: number = 20261020): BenchCorpus {
  const memories: BenchMemory[] = [];
  const cases: BenchCase[] = [];

  for (let i = 0; i < TOPIC_SEEDS.length; i++) {
    const { module, topic, paraphrase } = TOPIC_SEEDS[i];
    const number = i + 1;
    const rare = `zephyr${String(number).padStart(2, '0')}`;
    const file = `src/${module}/${slugify(topic)}.ts`;
    const isTrap = i < 40;
    const kind: BenchMemory['kind'] = isTrap ? 'error_trap' : 'decision';
    const title = isTrap ? `Avoid ${topic} trap in ${module}` : `${topic} decision for ${module}`;
    const detail = DETAILS[i % DETAILS.length];
    const entityName = i >= 40 ? `AuroraGateway${String(number).padStart(2, '0')}` : null;
    const entityId = i >= 40 ? `ent_aurora_${String(number).padStart(2, '0')}` : null;
    const content = isTrap
      ? `Trap: ${detail} when handling ${topic}. Never repeat the old ${topic} mistake. Reference token: ${rare}. Applies to ${file}.`
      : `${detail} when handling ${topic}. This decision was made during the initial ${module} design and is registered to ${entityName}. Reference token: ${rare}.`;

    memories.push({
      id: `mem_bench_${String(number).padStart(2, '0')}`,
      module,
      kind,
      title,
      content,
      files: isTrap ? [file] : [],
      status: 'verified',
      rewardScore: 1.0,
      validFrom: '2026-06-01T00:00:00Z',
      validTo: null,
      createdAt: isTrap ? '2026-06-01T00:00:00Z' : '2025-01-15T00:00:00Z',
      entity: entityName && entityId ? { id: entityId, name: entityName, type: 'service' } : undefined,
    });

    if (isTrap) {
      memories.push({
        id: `mem_legacy_${String(number).padStart(2, '0')}`,
        module,
        kind,
        title: `Legacy ${topic} rule for ${module}`,
        content: `Old guidance: use the legacy ${topic} approach. Superseded by the active ${topic} standard. Reference token: legacy${String(number).padStart(2, '0')}. Applies to ${file}.`,
        files: [file],
        status: 'superseded',
        rewardScore: 0.2,
        validFrom: '2025-01-01T00:00:00Z',
        validTo: '2026-01-01T00:00:00Z',
        createdAt: '2025-01-01T00:00:00Z',
      });
    }

    // Multi-hop topics 41-60 use a bridge memory: the file link points at the bridge, the
    // entity link points at the decision, and one association edge joins them. The bridge
    // intentionally has no lexical overlap with the query so the graph stream must supply it.
    if (i >= 40) {
      const bridgeId = `mem_bridge_${String(number).padStart(2, '0')}`;
      const targetId = `mem_bench_${String(number).padStart(2, '0')}`;

      memories.push({
        id: bridgeId,
        module,
        kind: 'rule',
        title: `Connector memory ${String(number).padStart(2, '0')}`,
        content: `Graph connector. Reference token: relay${String(number).padStart(2, '0')}.`,
        files: [file],
        status: 'verified',
        rewardScore: 1.0,
        validFrom: '2026-06-01T00:00:00Z',
        validTo: null,
        createdAt: '2026-06-01T00:00:00Z',
        graphEdges: [{ targetId, edgeType: 'association', weight: 1.0 }],
      });
    }

    const split = splitFor(i);
    const expectedId = `mem_bench_${String(number).padStart(2, '0')}`;

    cases.push({
      id: `case_exact_${String(number).padStart(2, '0')}`,
      category: 'exact_keyword',
      query: `${rare} ${topic} ${module} standard`,
      expectedMemoryId: expectedId,
      isTrap,
      split,
    });

    cases.push({
      id: `case_paraphrase_${String(number).padStart(2, '0')}`,
      category: 'semantic_paraphrase',
      query: `${paraphrase} in the ${module} module`,
      expectedMemoryId: expectedId,
      isTrap,
      split,
    });

    if (i < 40) {
      cases.push({
        id: `case_file_trap_${String(number).padStart(2, '0')}`,
        category: 'file_trap',
        query: `Before editing ${file}, which ${topic} trap should I check?`,
        file,
        expectedMemoryId: expectedId,
        isTrap: true,
        split,
      });

      cases.push({
        id: `case_bitemporal_${String(number).padStart(2, '0')}`,
        category: 'bitemporal_superseded',
        query: `What is the current ${topic} standard for ${module}?`,
        expectedMemoryId: expectedId,
        isTrap: true,
        split,
      });
    } else {
      cases.push({
        id: `case_multi_hop_${String(number).padStart(2, '0')}`,
        category: 'multi_hop',
        query: `Which ${module} decision about ${topic} connects ${file} to ${entityName}?`,
        file,
        expectedMemoryId: expectedId,
        isTrap: false,
        split,
      });

      cases.push({
        id: `case_long_horizon_${String(number).padStart(2, '0')}`,
        category: 'long_horizon',
        query: `What did we decide about ${topic} during the initial ${module} design?`,
        expectedMemoryId: expectedId,
        isTrap: false,
        split,
      });
    }
  }

  return {
    version: 1,
    seed,
    createdAt: '2026-10-20T00:00:00Z',
    kind: 'synthetic',
    splitRule: 'Every fifth case per category is held out (index % 5 === 4); tuning must use train only.',
    memories,
    cases,
  };
}

export function summarizeCorpus(corpus: BenchCorpus): {
  memories: number;
  cases: number;
  train: number;
  holdout: number;
  byCategory: Record<string, { train: number; holdout: number; total: number }>;
} {
  const byCategory: Record<string, { train: number; holdout: number; total: number }> = {};
  let train = 0;
  let holdout = 0;
  for (const c of corpus.cases) {
    if (!byCategory[c.category]) byCategory[c.category] = { train: 0, holdout: 0, total: 0 };
    byCategory[c.category].total++;
    if (c.split === 'holdout') {
      byCategory[c.category].holdout++;
      holdout++;
    } else {
      byCategory[c.category].train++;
      train++;
    }
  }
  return { memories: corpus.memories.length, cases: corpus.cases.length, train, holdout, byCategory };
}
