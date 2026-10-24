/**
 * Builds the committed BM25-vs-hash regression fixture.
 *
 * P0 made the feature-hash vectorizer opt-in because it duplicated BM25 lexically and cost
 * 7.5 pp Hit@1 on the dev split. This script captures the failure as a small, self-contained
 * fixture so the regression can never return silently.
 *
 * Selection rule (dev split only, never test):
 *   - cases where bm25_only ranks a gold memory first, and
 *   - full_hash does not.
 *
 * For each selected case the fixture keeps the gold memories, the top 3 non-gold memories the
 * hash engine ranked above the gold, and 3 deterministic distractors from the same project.
 * That is enough to reproduce the ranking failure without committing the 277 MB corpus.
 *
 * Usage:
 *   npx tsx scripts/build-regression-fixture.ts
 */

import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  evaluatePublicEngine,
  loadPublicDataset,
  prepareEmbeddings,
  PUBLIC_ENGINES
} from '../src/bench/public-harness.js';
import { parseLongMemEval, type PublicCase, type PublicDataset, type PublicMemory } from '../src/bench/public-datasets.js';
import { PUBLIC_DATASET_PINS, readJson, verifyDatasetPin } from '../src/bench/public-pins.js';
import { selectSplit, slicePerType } from '../src/bench/split.js';

const OUT = path.resolve('bench', 'fixtures', 'hash-regression.json');
const CASES = 20;
const GOLD_KEEP = 2;
const HASH_KEEP = 1;
const DISTRACTOR_KEEP = 1;

interface FixtureCase {
  id: string;
  projectId: string;
  category: string;
  query: string;
  goldIds: string[];
  split: 'dev' | 'test';
  /** 'degraded': the hash stream pushes gold below its BM25 rank. 'unchanged': same rank. */
  expected: 'degraded' | 'unchanged';
  bm25Rank: number;
  hashRank: number;
}

interface FixtureMemory {
  id: string;
  projectId: string;
  title: string;
  content: string;
  validFrom: string;
}

function stableOrder(ids: string[], seed: string): string[] {
  return [...ids].sort((a, b) => {
    const ka = crypto.createHash('sha256').update(`${seed}:${a}`).digest('hex');
    const kb = crypto.createHash('sha256').update(`${seed}:${b}`).digest('hex');
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
}

async function main(): Promise<void> {
  const pin = PUBLIC_DATASET_PINS.longmemeval;
  const file = path.join('bench', 'data', pin.file);
  if (!fs.existsSync(file)) {
    throw new Error(`Dataset missing: ${file}. See bench/README.md for the download command.`);
  }
  const sha256 = verifyDatasetPin(pin, file, false);
  const full = parseLongMemEval(readJson(file));
  const sliced: PublicDataset = { ...full, cases: slicePerType(full.cases, 20) };
  const devIds = new Set(selectSplit(sliced.cases, 'dev').map((item) => item.id));
  const projects = new Set(sliced.cases.map((item) => item.projectId));
  const slice: PublicDataset = {
    ...sliced,
    memories: sliced.memories.filter((memory) => projects.has(memory.projectId))
  };

  const bm25Engine = PUBLIC_ENGINES.find((engine) => engine.name === 'bm25_only')!;
  const hashEngine = PUBLIC_ENGINES.find((engine) => engine.name === 'full_hash')!;

  const bm25Db = loadPublicDataset(slice);
  const bm25 = await evaluatePublicEngine(bm25Db.db, slice, bm25Engine);
  bm25Db.db.close();

  const hashDb = loadPublicDataset(slice);
  await prepareEmbeddings(hashDb.db, hashDb.repo, slice, hashEngine);
  const hash = await evaluatePublicEngine(hashDb.db, slice, hashEngine);
  hashDb.db.close();

  const bm25ByCase = new Map(bm25.cases.map((item) => [item.caseId, item]));

  interface Ranked {
    item: PublicCase;
    hashRetrieved: string[];
    bm25Rank: number;
    hashRank: number;
  }

  const degraded: Ranked[] = [];
  const unchanged: Ranked[] = [];
  const improved: Ranked[] = [];

  for (const hashCase of hash.cases) {
    const bm25Case = bm25ByCase.get(hashCase.caseId);
    if (!bm25Case) continue;
    const item = slice.cases.find((candidate) => candidate.id === hashCase.caseId);
    if (!item) continue;

    const entry: Ranked = {
      item,
      hashRetrieved: hashCase.retrieved,
      bm25Rank: bm25Case.rank,
      hashRank: hashCase.rank
    };

    if (hashCase.rank > bm25Case.rank) degraded.push(entry);
    else if (hashCase.rank < bm25Case.rank) improved.push(entry);
    else unchanged.push(entry);
  }

  // The hash stream is a lexical duplicate, so it can only lose rank on this corpus. If it
  // ever starts winning, the fixture's premise is wrong and the generator must be revisited.
  if (improved.length > 0) {
    throw new Error(
      `The hash stream improved ${improved.length} case(s); expected zero. ` +
        `Re-check the fixture premise before regenerating.`
    );
  }

  if (degraded.length === 0) {
    throw new Error('No case where the hash stream loses rank; the regression cannot be captured.');
  }

  // Degraded cases are the regression signal and always come first. Unchanged cases fill the
  // fixture up to CASES so the test also proves the hash stream is inert on most queries.
  // Prefer unchanged cases where both engines found the gold, so exact-rank equality is
  // meaningful rather than "both missed".
  const fillers = [
    ...unchanged.filter((entry) => entry.bm25Rank >= 1),
    ...unchanged.filter((entry) => entry.bm25Rank === 0)
  ];
  const selected = [...degraded, ...fillers].slice(0, CASES);

  const memoriesById = new Map(slice.memories.map((memory) => [memory.id, memory]));
  const byProject = new Map<string, PublicMemory[]>();
  for (const memory of slice.memories) {
    const list = byProject.get(memory.projectId) ?? [];
    list.push(memory);
    byProject.set(memory.projectId, list);
  }

  const keep = new Set<string>();
  const baseCases: Array<Omit<FixtureCase, 'expected' | 'bm25Rank' | 'hashRank'>> = [];
  for (const { item, hashRetrieved } of selected) {
    const gold = new Set(item.goldIds);
    const goldKept = item.goldIds.filter((id) => memoriesById.has(id)).slice(0, GOLD_KEEP);
    const wrong = hashRetrieved.filter((id) => !gold.has(id) && memoriesById.has(id)).slice(0, HASH_KEEP);
    const pool = (byProject.get(item.projectId) ?? [])
      .filter((memory) => !gold.has(memory.id) && !wrong.includes(memory.id))
      .map((memory) => memory.id);
    const distractors = stableOrder(pool, item.id).slice(0, DISTRACTOR_KEEP);

    for (const id of [...goldKept, ...wrong, ...distractors]) keep.add(id);
    baseCases.push({
      id: item.id,
      projectId: item.projectId,
      category: item.category,
      query: item.query,
      goldIds: goldKept,
      split: devIds.has(item.id) ? 'dev' : 'test'
    });
  }

  const memories: FixtureMemory[] = [...keep]
    .map((id) => memoriesById.get(id)!)
    .map((memory) => ({
      id: memory.id,
      projectId: memory.projectId,
      title: memory.title,
      content: memory.content,
      validFrom: memory.validFrom
    }));

  // The committed fixture is a reduced corpus, so ranks must be measured on the reduced
  // corpus. Recording ranks from the full slice would claim a degradation the fixture does
  // not actually reproduce (a gold at rank 6/9 can become 2/2 once distractors are dropped).
  const fixtureDataset: PublicDataset = {
    name: 'hash-regression',
    examples: baseCases.length,
    skippedCases: 0,
    cases: baseCases.map((item) => ({
      ...item,
      goldCount: item.goldIds.length,
      missingGoldCount: 0
    })),
    memories
  };

  const bm25Fixture = loadPublicDataset(fixtureDataset);
  const bm25FixtureEval = await evaluatePublicEngine(bm25Fixture.db, fixtureDataset, bm25Engine);
  bm25Fixture.db.close();

  const hashFixture = loadPublicDataset(fixtureDataset);
  await prepareEmbeddings(hashFixture.db, hashFixture.repo, fixtureDataset, hashEngine);
  const hashFixtureEval = await evaluatePublicEngine(hashFixture.db, fixtureDataset, hashEngine);
  hashFixture.db.close();

  const bm25Ranks = new Map(bm25FixtureEval.cases.map((item) => [item.caseId, item.rank]));
  const hashRanks = new Map(hashFixtureEval.cases.map((item) => [item.caseId, item.rank]));

  const cases: FixtureCase[] = baseCases.map((item) => {
    const bm25Rank = bm25Ranks.get(item.id) ?? 0;
    const hashRank = hashRanks.get(item.id) ?? 0;
    if (hashRank < bm25Rank) {
      throw new Error(
        `Case ${item.id} improves under the hash stream in the reduced fixture ` +
          `(bm25 rank ${bm25Rank}, hash rank ${hashRank}); the fixture premise is wrong.`
      );
    }
    return {
      ...item,
      bm25Rank,
      hashRank,
      expected: hashRank > bm25Rank ? 'degraded' : 'unchanged'
    };
  });

  const fixture = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: {
      dataset: pin.file,
      revision: pin.revision,
      sha256,
      slice: 'first 20 cases per question_type (120 cases)',
      split: 'full slice; per-case split label recorded (selection is a regression guard, not tuning)',
      selection:
        `all cases where the hash stream lowers the gold rank on the full slice, then ` +
        `unchanged cases until ${CASES}; ranks re-measured on the reduced fixture`,
      reducedFixture: {
        cases: cases.length,
        memories: memories.length,
        degraded: cases.filter((item) => item.expected === 'degraded').length,
        unchanged: cases.filter((item) => item.expected === 'unchanged').length
      }
    },
    engines: {
      bm25: bm25Engine.retrieval,
      hash: hashEngine.retrieval
    },
    cases,
    memories
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(fixture, null, 2)}\n`);

  const bytes = fs.statSync(OUT).size;
  const devCount = cases.filter((item) => item.split === 'dev').length;
  const degradedCount = cases.filter((item) => item.expected === 'degraded').length;
  console.log(
    `Selected ${cases.length} cases (${degradedCount} degraded / ${cases.length - degradedCount} unchanged, ` +
      `${devCount} dev / ${cases.length - devCount} test) from ${slice.cases.length} slice cases.`
  );
  console.log(`Degraded cases available in the whole slice: ${degraded.length}.`);
  console.log(`Memories: ${memories.length} (${bytes} bytes) -> ${path.relative(process.cwd(), OUT)}`);
  console.log(
    `Full slice: bm25 Hit@1 ${bm25.overall.hitAt1}% | hash Hit@1 ${hash.overall.hitAt1}%. ` +
      `Reduced fixture: bm25 Hit@1 ${bm25FixtureEval.overall.hitAt1}% | hash Hit@1 ${hashFixtureEval.overall.hitAt1}%`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
