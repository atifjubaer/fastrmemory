// Cross-checks the committed benchmark artifacts against the published docs.
//
// - Corpus counts and the 80/20 split match the committed JSON.
// - Each raw result file names the engines it actually measured.
// - Headline numbers in README, BENCHMARKS, CLAIMS, and the benchmark report
//   are present in the raw JSON for the cited engine and split.
// - No doc points at a scratch artifact such as bench/results/latest.json.
//
// Plain Node ESM, no dependencies. Exit code 1 on any error.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function check(condition, message) {
  if (!condition) fail(message);
}

function readJson(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    fail(`missing ${rel}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`invalid JSON in ${rel}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

function readText(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    fail(`missing ${rel}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function engine(result, split, name) {
  return result?.splits?.[split]?.find((entry) => entry.name === name);
}

function expectNumber(doc, label, value, rel) {
  if (value === undefined || value === null) return;
  const needle = String(value);
  if (!doc.includes(needle)) {
    fail(`${rel} is missing the measured value ${label}=${needle}`);
  }
}

const corpus = readJson('bench/corpus.json');
if (corpus) {
  check(corpus.cases?.length === 240, `corpus must have 240 cases, found ${corpus.cases?.length}`);
  check(corpus.memories?.length === 120, `corpus must have 120 memories, found ${corpus.memories?.length}`);
  const train = corpus.cases.filter((c) => c.split === 'train').length;
  const holdout = corpus.cases.filter((c) => c.split === 'holdout').length;
  check(train === 192, `corpus must have 192 train cases, found ${train}`);
  check(holdout === 48, `corpus must have 48 holdout cases, found ${holdout}`);
  check(holdout / corpus.cases.length === 0.2, 'holdout must be exactly 20% of cases');
}

const minilm = readJson('bench/results/minilm.json');
const hash = readJson('bench/results/hash.json');

for (const [rel, result] of [
  ['bench/results/minilm.json', minilm],
  ['bench/results/hash.json', hash]
]) {
  if (!result) continue;
  check(result.schemaVersion === 2, `${rel} schemaVersion must be 2`);
  check(/^[0-9a-f]{40}$/.test(result.commit ?? ''), `${rel} must record a 40-character commit`);
  check(String(result.command ?? '').includes('--out'), `${rel} command must include --out`);
  check(result.corpus?.cases === 240, `${rel} corpus count must be 240`);
  check(result.splits?.train?.length > 0, `${rel} must include a train split`);
  check(result.splits?.holdout?.length > 0, `${rel} must include a holdout split`);
  for (const split of ['train', 'holdout']) {
    for (const entry of result.splits?.[split] ?? []) {
      const expected = split === 'train' ? 192 : 48;
      check(
        entry.overall?.count === expected,
        `${rel} ${split}/${entry.name} count is ${entry.overall?.count}, expected ${expected}`
      );
    }
  }
}

if (minilm) {
  check(Boolean(engine(minilm, 'train', 'full_minilm')), 'minilm run is missing full_minilm (train)');
  check(Boolean(engine(minilm, 'holdout', 'full_minilm')), 'minilm run is missing full_minilm (holdout)');
  const missing = new Set((minilm.notMeasured ?? []).map((entry) => entry.name));
  check(missing.has('bm25_hash'), 'minilm run must list bm25_hash as not measured');
  check(!missing.has('bm25_minilm'), 'minilm run must not claim bm25_minilm was not measured');
}

if (hash) {
  check(Boolean(engine(hash, 'train', 'full_hash')), 'hash run is missing full_hash (train)');
  check(Boolean(engine(hash, 'holdout', 'full_hash')), 'hash run is missing full_hash (holdout)');
  const missing = new Set((hash.notMeasured ?? []).map((entry) => entry.name));
  check(missing.has('bm25_minilm'), 'hash run must list bm25_minilm as not measured');
}

const fullMiniTrain = engine(minilm, 'train', 'full_minilm')?.overall;
const fullMiniHoldout = engine(minilm, 'holdout', 'full_minilm')?.overall;
const bm25Train = engine(minilm, 'train', 'bm25_only')?.overall;
const bm25Holdout = engine(minilm, 'holdout', 'bm25_only')?.overall;
const fullHashTrain = engine(hash, 'train', 'full_hash')?.overall;
const fullHashHoldout = engine(hash, 'holdout', 'full_hash')?.overall;

const benchmarks = readText('BENCHMARKS.md');
const readme = readText('README.md');
const claims = readText('CLAIMS.md');
const report = readText('docs/benchmark-report.md');

// README is the release-era snapshot. It may cite an older committed run than
// the current bench/results/minilm.json; compare it against the frozen artifact
// for the commit it names instead of silently rewriting release evidence.
const readmeCommit = /benchmark commit `([0-9a-f]{7,40})`/.exec(readme)?.[1];
let readmeMinilm = minilm;
if (readmeCommit && minilm && !String(minilm.commit ?? '').startsWith(readmeCommit)) {
  const historicalRel = `bench/results/minilm-${readmeCommit.slice(0, 7)}.json`;
  const historical = readJson(historicalRel);
  if (historical) {
    check(historical.schemaVersion === 2, `${historicalRel} schemaVersion must be 2`);
    check(String(historical.commit ?? '').startsWith(readmeCommit), `${historicalRel} commit does not match README`);
    check(historical.corpus?.cases === 240, `${historicalRel} corpus count must be 240`);
    readmeMinilm = historical;
  }
}
const readmeMiniTrain = engine(readmeMinilm, 'train', 'full_minilm')?.overall;
const readmeMiniHoldout = engine(readmeMinilm, 'holdout', 'full_minilm')?.overall;
const readmeBm25Holdout = engine(readmeMinilm, 'holdout', 'bm25_only')?.overall;

for (const [rel, doc] of [
  ['BENCHMARKS.md', benchmarks],
  ['CLAIMS.md', claims],
  ['docs/benchmark-report.md', report]
]) {
  expectNumber(doc, 'full_minilm train Hit@1', fullMiniTrain?.hitAt1, rel);
  expectNumber(doc, 'full_minilm holdout Hit@1', fullMiniHoldout?.hitAt1, rel);
}
expectNumber(readme, 'full_minilm train Hit@1', readmeMiniTrain?.hitAt1, 'README.md');
expectNumber(readme, 'full_minilm holdout Hit@1', readmeMiniHoldout?.hitAt1, 'README.md');

expectNumber(benchmarks, 'full_minilm train Hit@3', fullMiniTrain?.hitAt3, 'BENCHMARKS.md');
expectNumber(benchmarks, 'full_minilm holdout Hit@3', fullMiniHoldout?.hitAt3, 'BENCHMARKS.md');
expectNumber(benchmarks, 'full_minilm holdout MRR', fullMiniHoldout?.mrr, 'BENCHMARKS.md');
expectNumber(benchmarks, 'full_minilm token cost', fullMiniHoldout?.avgTokens, 'BENCHMARKS.md');
expectNumber(benchmarks, 'bm25 train Hit@1', bm25Train?.hitAt1, 'BENCHMARKS.md');
expectNumber(benchmarks, 'bm25 holdout Hit@1', bm25Holdout?.hitAt1, 'BENCHMARKS.md');
expectNumber(benchmarks, 'full_hash train Hit@5', fullHashTrain?.hitAt5, 'BENCHMARKS.md');
expectNumber(benchmarks, 'full_hash train MRR', fullHashTrain?.mrr, 'BENCHMARKS.md');
expectNumber(benchmarks, 'full_hash holdout Hit@1', fullHashHoldout?.hitAt1, 'BENCHMARKS.md');
expectNumber(readme, 'bm25 holdout Hit@1', readmeBm25Holdout?.hitAt1, 'README.md');
expectNumber(claims, 'full_minilm holdout Hit@3', fullMiniHoldout?.hitAt3, 'CLAIMS.md');
expectNumber(claims, 'full_minilm holdout MRR', fullMiniHoldout?.mrr, 'CLAIMS.md');

for (const rel of ['README.md', 'BENCHMARKS.md', 'CLAIMS.md', 'RELEASE_v0.1.0.md', 'ROADMAP.md']) {
  const text = readText(rel);
  if (text.includes('latest.json')) {
    fail(`${rel} references the scratch artifact latest.json; cite minilm.json or hash.json`);
  }
}

const legacy = readJson('bench/results/legacy-12.json');
if (legacy) {
  check(legacy.caseCount === 12, `legacy-12.json must contain 12 cases, found ${legacy.caseCount}`);
  check(
    String(legacy.simulatedBaselineLabel ?? '').toLowerCase().includes('simulated baseline'),
    'legacy-12.json must label its simulated baselines'
  );
  for (const entry of legacy.engines ?? []) {
    check(
      !/hippo|memoria/i.test(entry.name ?? ''),
      `legacy-12.json contains a forbidden external-engine label: ${entry.name}`
    );
  }
}

// Pinned external baselines. These are deliberately exact: a version, integrity, or
// dataset-hash drift must be reviewed and documented, not silently accepted.
const externalSpecs = [
  {
    rel: 'bench/results/external-minisearch-longmemeval.json',
    engine: 'minisearch',
    packageName: 'minisearch',
    version: '7.2.0',
    integrity: 'sha512-dqT2XBYUOZOiC5t2HRnwADjhNS2cecp9u+TJRiJ1Qp/f5qjkeT5APcGPjHw+bz89Ms8Jp+cG4AlE+QZ/QnDglg==',
    dataset: 'longmemeval_s',
    revision: '2ec2a557f339b6c0369619b1ed5793734cc87533',
    datasetSha: '08d8dad4be43ee2049a22ff5674eb86725d0ce5ff434cde2627e5e8e7e117894',
    cases: 500
  },
  {
    rel: 'bench/results/external-mcp-longmemeval.json',
    engine: 'mcp-memory',
    packageName: '@modelcontextprotocol/server-memory',
    version: '2.0.0',
    integrity: 'sha512-h+oxQCpK6FOuhlPB9hAcSihAAahcnijuGTZGcXStGOL4UzFYB4ap+pvtSelxchkZlz7tnpY/e0sONaAs24Rurw==',
    dataset: 'longmemeval_s',
    revision: '2ec2a557f339b6c0369619b1ed5793734cc87533',
    datasetSha: '08d8dad4be43ee2049a22ff5674eb86725d0ce5ff434cde2627e5e8e7e117894',
    cases: 500,
    distSha256: '8A4D2E89A6058B5FFA7CAA567BD185BE2087A57D23DDF1E609884C9A25FD38FD'
  },
  {
    rel: 'bench/results/external-minisearch-locomo.json',
    engine: 'minisearch',
    packageName: 'minisearch',
    version: '7.2.0',
    integrity: 'sha512-dqT2XBYUOZOiC5t2HRnwADjhNS2cecp9u+TJRiJ1Qp/f5qjkeT5APcGPjHw+bz89Ms8Jp+cG4AlE+QZ/QnDglg==',
    dataset: 'locomo10',
    revision: '3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376',
    datasetSha: '79fa87e90f04081343b8c8debecb80a9a6842b76a7aa537dc9fdf651ea698ff4',
    cases: 1981
  },
  {
    rel: 'bench/results/external-mcp-locomo.json',
    engine: 'mcp-memory',
    packageName: '@modelcontextprotocol/server-memory',
    version: '2.0.0',
    integrity: 'sha512-h+oxQCpK6FOuhlPB9hAcSihAAahcnijuGTZGcXStGOL4UzFYB4ap+pvtSelxchkZlz7tnpY/e0sONaAs24Rurw==',
    dataset: 'locomo10',
    revision: '3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376',
    datasetSha: '79fa87e90f04081343b8c8debecb80a9a6842b76a7aa537dc9fdf651ea698ff4',
    cases: 1981,
    distSha256: '8A4D2E89A6058B5FFA7CAA567BD185BE2087A57D23DDF1E609884C9A25FD38FD'
  }
];

const externalDoc = readText('docs/EXTERNAL_BASELINE.md');
const publicDoc = readText('docs/PUBLIC_BENCHMARKS.md');
const externalClaims = readText('CLAIMS.md');

for (const spec of externalSpecs) {
  const result = readJson(spec.rel);
  if (!result) continue;
  check(result.schemaVersion === 1, `${spec.rel} schemaVersion must be 1`);
  check(/^[0-9a-f]{40}$/.test(result.code?.commit ?? ''), `${spec.rel} must record a 40-character commit`);
  check(String(result.command ?? '').includes('eval-external'), `${spec.rel} command must include eval-external`);
  check(result.dataset?.name === spec.dataset, `${spec.rel} dataset must be ${spec.dataset}`);
  check(result.dataset?.examples === spec.cases, `${spec.rel} examples must be ${spec.cases}`);
  check(result.dataset?.pin?.revision === spec.revision, `${spec.rel} dataset revision drift`);
  check(
    String(result.dataset?.pin?.sha256 ?? '').toLowerCase() === spec.datasetSha,
    `${spec.rel} dataset SHA-256 drift`
  );
  check(result.dataset?.uniqueMemories > 0, `${spec.rel} must record unique memory ids`);
  check(result.engine?.name === spec.engine, `${spec.rel} engine must be ${spec.engine}`);
  check(result.engine?.package === spec.packageName, `${spec.rel} package must be ${spec.packageName}`);
  check(result.engine?.version === spec.version, `${spec.rel} engine version must be ${spec.version}`);
  check(result.engine?.integrity === spec.integrity, `${spec.rel} package integrity drift`);
  check(Boolean(result.engine?.adapter?.duplicateIds), `${spec.rel} must document duplicate-id handling`);
  check(result.results?.overall?.count === spec.cases, `${spec.rel} overall count must be ${spec.cases}`);
  check(result.results?.cases?.length === spec.cases, `${spec.rel} must include ${spec.cases} case rows`);
  if (spec.distSha256) {
    check(result.engine?.server?.distSha256 === spec.distSha256, `${spec.rel} server dist hash drift`);
  }

  expectNumber(externalDoc, `${spec.engine} ${spec.dataset} Hit@5`, result.results.overall.hitAt5, 'docs/EXTERNAL_BASELINE.md');
  expectNumber(publicDoc, `${spec.engine} ${spec.dataset} Hit@5`, result.results.overall.hitAt5, 'docs/PUBLIC_BENCHMARKS.md');
  expectNumber(benchmarks, `${spec.engine} ${spec.dataset} Hit@5`, result.results.overall.hitAt5, 'BENCHMARKS.md');
}

check(externalClaims.includes('| E14 |'), 'CLAIMS.md is missing the external baseline row E14');
check(externalClaims.includes('| E15 |'), 'CLAIMS.md is missing the external target row E15');
check(
  /LoCoMo[^\n]*\+4\.4pp/.test(externalDoc) || /\+4\.4pp[^\n]*LoCoMo/.test(externalDoc),
  'docs/EXTERNAL_BASELINE.md must state the LoCoMo +4.4pp gap'
);

for (const warning of warnings) console.warn(`WARN: ${warning}`);
if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}
console.log('Benchmark checks passed: corpus, raw JSON, and doc headlines agree.');
