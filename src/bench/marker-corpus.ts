/**
 * Deterministic marker corpus for the cross-engine comparison.
 *
 * LongMemEval cannot be used for the cross-engine run: its haystack is 29.8 MB for 60
 * cases (p50 document 10,445 characters, max 42,929), so ingesting it through the MCP
 * stdio surface costs roughly 2,900 round trips per engine, and truncating the sessions
 * to make that affordable would destroy answerability. This corpus keeps the property
 * that matters for a retrieval comparison - one identifiable memory among many - while
 * staying small enough to run through the same surface an agent actually uses.
 *
 * Every document starts with a unique marker. Scoring asks one question: did the marker
 * for the gold document appear in the context the engine returned? That works across
 * three engines whose output formats have nothing in common, and putting the marker at
 * position 0 means an engine that truncates content still returns it.
 *
 * Three query tiers, reported separately and never collapsed into one headline:
 *
 *   exact      - the system name and the problem word, both present in the gold document.
 *   multi      - the system name, a symptom shared by ~22 documents, and an event shared
 *                by ~171 documents. Only the gold document has all three.
 *   paraphrase - the system name and a synonym that appears in no document at all, so a
 *                lexical engine has no signal for the discriminating term.
 */

import { createHash } from 'node:crypto';

export type MarkerTier = 'exact' | 'multi' | 'paraphrase';

export const MARKER_TIERS: MarkerTier[] = ['exact', 'multi', 'paraphrase'];

export interface MarkerDoc {
  id: string;
  marker: string;
  system: string;
  problem: string;
  symptom: string;
  event: string;
  content: string;
}

export interface MarkerQuery {
  id: string;
  tier: MarkerTier;
  query: string;
  goldDocId: string;
  goldMarker: string;
}

export interface MarkerCorpus {
  seed: number;
  docs: MarkerDoc[];
  queries: MarkerQuery[];
  systems: string[];
  problems: string[];
  synonyms: Record<string, string>;
  symptoms: string[];
  events: string[];
}

/** 30 systems. Every system name is unique and appears in exactly 40 documents. */
export const MARKER_SYSTEMS: string[] = [
  'auth-service',
  'billing-worker',
  'checkout-api',
  'search-indexer',
  'notification-hub',
  'user-profile',
  'admin-console',
  'payment-gateway',
  'inventory-sync',
  'order-pipeline',
  'analytics-collector',
  'report-builder',
  'file-uploader',
  'image-resizer',
  'email-dispatcher',
  'sms-gateway',
  'webhook-relay',
  'session-store',
  'cache-proxy',
  'rate-limiter',
  'audit-logger',
  'feature-flags',
  'cron-scheduler',
  'job-queue',
  'metrics-agent',
  'trace-collector',
  'config-loader',
  'secret-rotator',
  'backup-runner',
  'migration-tool'
];

/** 40 problem words. The synonym is used only in paraphrase queries and in no document. */
export const MARKER_PROBLEMS: Array<{ term: string; synonym: string }> = [
  { term: 'timeout', synonym: 'standstill' },
  { term: 'crash', synonym: 'implosion' },
  { term: 'leak', synonym: 'seepage' },
  { term: 'race', synonym: 'contretemps' },
  { term: 'deadlock', synonym: 'gridlock' },
  { term: 'corruption', synonym: 'mangling' },
  { term: 'overflow', synonym: 'spillover' },
  { term: 'regression', synonym: 'backslide' },
  { term: 'latency', synonym: 'sluggishness' },
  { term: 'backlog', synonym: 'pileup' },
  { term: 'throttling', synonym: 'strangling' },
  { term: 'retry', synonym: 'reattempt' },
  { term: 'duplication', synonym: 'cloning' },
  { term: 'truncation', synonym: 'clipping' },
  { term: 'encoding', synonym: 'transliteration' },
  { term: 'ordering', synonym: 'sequencing' },
  { term: 'staleness', synonym: 'decrepitude' },
  { term: 'exhaustion', synonym: 'depletion' },
  { term: 'mismatch', synonym: 'divergence' },
  { term: 'rollback', synonym: 'reversion' },
  { term: 'migration', synonym: 'transplant' },
  { term: 'partition', synonym: 'segmentation' },
  { term: 'replication', synonym: 'mirroring' },
  { term: 'serialization', synonym: 'marshalling' },
  { term: 'authentication', synonym: 'credentialing' },
  { term: 'authorization', synonym: 'entitlement' },
  { term: 'validation', synonym: 'vetting' },
  { term: 'sanitization', synonym: 'scrubbing' },
  { term: 'pagination', synonym: 'leafing' },
  { term: 'caching', synonym: 'hoarding' },
  { term: 'batching', synonym: 'bundling' },
  { term: 'compression', synonym: 'squeezing' },
  { term: 'encryption', synonym: 'ciphering' },
  { term: 'indexing', synonym: 'cataloguing' },
  { term: 'scheduling', synonym: 'timetabling' },
  { term: 'routing', synonym: 'wayfinding' },
  { term: 'sharding', synonym: 'fragmenting' },
  { term: 'checkpointing', synonym: 'bookmarking' },
  { term: 'reconciliation', synonym: 'rebalancing' },
  { term: 'observability', synonym: 'instrumentation' }
];

/**
 * 54 symptom phrases, assigned so each one lands in about 22 documents. None of these
 * words appears in a paraphrase synonym.
 */
export const MARKER_SYMPTOMS: string[] = [
  'intermittent 502 responses from the edge',
  'a slow rise in resident memory',
  'spiky garbage collection pauses',
  'connection pool saturation',
  'a queue that never drains',
  'repeated leader elections',
  'stale reads from the replica',
  'duplicate downstream deliveries',
  'a widening lag on the consumer group',
  'bursts of socket resets',
  'a growing number of parked threads',
  'lock waits above two seconds',
  'a hot partition on the primary key',
  'checksum failures on the archive',
  'a silent drop in throughput',
  'unexpected restarts at low load',
  'a backlog that doubles overnight',
  'elevated disk wait on the writer',
  'a scatter of half-written rows',
  'a sudden jump in p99 response time',
  'missing spans in the trace',
  'an abrupt change in row counts',
  'a retry storm from one caller',
  'a cold cache after every deploy',
  'a handshake that never completes',
  'an orphaned background process',
  'a mismatched schema version',
  'a partially applied batch',
  'a flood of timeout errors',
  'a quiet failure in the sidecar',
  'a slow leak of file handles',
  'a periodic freeze in the scheduler',
  'a flood of duplicate jobs',
  'a persistent skew between regions',
  'a degraded read path',
  'a slow handoff between nodes',
  'a burst of 429 responses',
  'an index that stops advancing',
  'a long tail of abandoned requests',
  'a growing set of unacked messages',
  'a routing table that flaps',
  'a cron entry that fires twice',
  'a credential that expires early',
  'a write that lands out of order',
  'a snapshot that never finishes',
  'a spike in rejected connections',
  'a slow drain during shutdown',
  'a stuck transaction on the writer',
  'a broken health check',
  'a backlog of undelivered webhooks',
  'a mismatch between shard counts',
  'a burst of disk pressure',
  'a stalled compaction run',
  'a partial rollout that never completes'
];

/**
 * 7 event phrases, so each one is shared by about 171 documents.
 *
 * The count is 7, not 8, on purpose: with 30 systems, 54 symptoms, and 7 events the
 * least common multiple is 1890, so no two documents in a 1200-document corpus can share
 * the same (system, symptom, event) triple. With 8 events the lcm drops to 1080 and every
 * gold document below index 120 would have a twin that ties on the multi-tier query.
 */
export const MARKER_EVENTS: string[] = [
  'the quarterly release window',
  'the Monday morning traffic spike',
  'the overnight batch run',
  'the regional failover drill',
  'the black Friday load test',
  'the database version upgrade',
  'the certificate rotation'
];

/** mulberry32: 32-bit seeded PRNG, so the corpus is identical on every machine. */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function markerFor(seed: number, system: string, problem: string): string {
  const digest = createHash('sha256').update(`${seed}:${system}:${problem}`, 'utf8').digest('hex');
  return `MKR-${digest.slice(0, 10).toUpperCase()}`;
}

function renderDoc(doc: Omit<MarkerDoc, 'content'>): string {
  const { marker, system, problem, symptom, event } = doc;
  return [
    `${marker} incident record for ${system} / ${problem}`,
    '',
    `System: ${system}`,
    `Problem: ${problem}`,
    `Symptom: ${symptom}`,
    `Event: ${event}`,
    '',
    `The ${system} team opened an incident after ${problem} appeared during ${event}. On-call correlated it with ${symptom} and captured a trace before the process restarted. Replaying the ${event} window against a snapshot of ${system} reproduced the ${problem} within minutes, which ruled out the upstream vendor.`,
    '',
    `Notes: ${symptom} only showed up when ${system} was under sustained load; single-request runs looked healthy. The working theory is that ${problem} compounds once the queue depth passes the soft limit, so the fix targets backpressure rather than the ${problem} site itself.`,
    '',
    `Owner: platform-oncall. Status: mitigated, follow-up test added to ${system}.`
  ].join('\n');
}

export interface MarkerCorpusOptions {
  /** Number of documents. Must be at most systems x problems. Default 1200. */
  docs?: number;
  /** Number of gold documents, one query per tier each. Default 40. */
  golds?: number;
  seed?: number;
}

/**
 * Builds the corpus. Document order, marker assignment, gold selection, and query wording
 * depend only on the seed and the counts, so two machines produce byte-identical text.
 */
export function buildMarkerCorpus(options: MarkerCorpusOptions = {}): MarkerCorpus {
  const seed = options.seed ?? 20261026;
  const total = MARKER_SYSTEMS.length * MARKER_PROBLEMS.length;
  const docCount = Math.min(options.docs ?? total, total);
  const goldCount = Math.min(options.golds ?? 40, docCount);

  const docs: MarkerDoc[] = [];
  for (let i = 0; i < docCount; i++) {
    const system = MARKER_SYSTEMS[i % MARKER_SYSTEMS.length];
    const problem = MARKER_PROBLEMS[Math.floor(i / MARKER_SYSTEMS.length) % MARKER_PROBLEMS.length].term;
    const symptom = MARKER_SYMPTOMS[i % MARKER_SYMPTOMS.length];
    const event = MARKER_EVENTS[i % MARKER_EVENTS.length];
    const marker = markerFor(seed, system, problem);
    const base = {
      id: `doc-${String(i).padStart(4, '0')}`,
      marker,
      system,
      problem,
      symptom,
      event
    };
    docs.push({ ...base, content: renderDoc(base) });
  }

  // Seeded shuffle, then take the first `golds`, so the gold set is not biased toward the
  // first systems in the list.
  const random = mulberry32(seed);
  const order = docs.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const swap = order[i];
    order[i] = order[j];
    order[j] = swap;
  }
  const golds = order.slice(0, goldCount).map((index) => docs[index]);

  const synonyms: Record<string, string> = {};
  for (const entry of MARKER_PROBLEMS) synonyms[entry.term] = entry.synonym;

  const queries: MarkerQuery[] = [];
  for (const doc of golds) {
    const slug = doc.id.replace(/^doc-/, '');
    queries.push({
      id: `q-exact-${slug}`,
      tier: 'exact',
      query: `${doc.system} ${doc.problem}`,
      goldDocId: doc.id,
      goldMarker: doc.marker
    });
    queries.push({
      id: `q-multi-${slug}`,
      tier: 'multi',
      query: `${doc.system} ${doc.symptom} ${doc.event}`,
      goldDocId: doc.id,
      goldMarker: doc.marker
    });
    queries.push({
      id: `q-paraphrase-${slug}`,
      tier: 'paraphrase',
      query: `${doc.system} ${synonyms[doc.problem]}`,
      goldDocId: doc.id,
      goldMarker: doc.marker
    });
  }

  return {
    seed,
    docs,
    queries,
    systems: [...MARKER_SYSTEMS],
    problems: MARKER_PROBLEMS.map((entry) => entry.term),
    synonyms,
    symptoms: [...MARKER_SYMPTOMS],
    events: [...MARKER_EVENTS]
  };
}

/**
 * Case-level scoring: where did the gold document land?
 *
 * Every document begins with a unique marker, so the order in which markers first appear
 * in the returned text is the engine's rank order. That works across JSON, Markdown, and
 * plain text without parsing any of them, and it does not reward an engine for padding the
 * budget with extra documents: the gold still has to come first.
 *
 * Returns 1 for the top document, null when the marker is absent.
 */
export function markerRank(context: string, goldMarker: string): number | null {
  const index = context.indexOf(goldMarker);
  if (index < 0) return null;
  const seen = new Set<string>();
  for (const match of context.slice(0, index).matchAll(/MKR-[0-9A-F]{10}/g)) seen.add(match[0]);
  return seen.size + 1;
}
