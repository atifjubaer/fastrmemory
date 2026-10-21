// Validates documentation hygiene and claim traceability.
//
// - docs/ contains only product documentation (no prompt transcripts or build prompts).
// - README links the claims ledger and benchmark methodology.
// - Test counts in the README badge and CLAIMS.md agree.
// - No doc points at the scratch artifact bench/results/latest.json.
// - No competitor names or mojibake placeholders leak into public docs.
// - Every bench/results/*.json reference in the docs exists.
//
// Plain Node ESM, no dependencies. Exit code 1 on any error.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    fail(`missing ${rel}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

const expectedDocs = new Set([
  'docs/ARCHITECTURE.md',
  'docs/benchmark-report.md',
  'docs/blog/2026-10-20-fastrmemory-0.2.0.md',
  'docs/blog/2026-10-21-fastrmemory-0.2.1.md',
  'docs/EXTERNAL_BASELINE.md',
  'docs/mcp-registry-submission.md',
  'docs/MEMORY_CI.md',
  'docs/NPM_PUBLISHING_TROUBLESHOOTING.md',
  'docs/npm-publishing.md',
  'docs/PUBLIC_BENCHMARKS.md',
  'docs/SPECIFICATION.md',
  'docs/audit/2026-10-20-baseline.md',
  'docs/audit/2026-10-20-recall-latency.json',
  'docs/audit/2026-10-21-crash-test.md'
]);

function walk(relDir) {
  const dir = path.join(ROOT, relDir);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.posix.join(relDir, entry.name);
    if (entry.isDirectory()) walk(rel);
    else if (!expectedDocs.has(rel)) fail(`unexpected file in docs/: ${rel}`);
  }
}

if (fs.existsSync(path.join(ROOT, 'docs'))) walk('docs');

const readme = read('README.md');
const claims = read('CLAIMS.md');
const benchmarks = read('BENCHMARKS.md');

if (!readme.includes('CLAIMS.md')) fail('README.md must link CLAIMS.md');
if (!readme.includes('BENCHMARKS.md')) fail('README.md must link BENCHMARKS.md');
if (!readme.includes('bench/results/minilm.json')) {
  fail('README.md must cite bench/results/minilm.json');
}
if (!readme.includes('bench/results/hash.json')) {
  fail('README.md must cite bench/results/hash.json');
}

const badge = /Tests-(\d+)%20Passed/.exec(readme);
const ledger = /(\d+)\s+tests pass/i.exec(claims);
if (!badge) fail('README.md is missing the test-count badge');
if (!ledger) fail('CLAIMS.md is missing the test-count row');
if (badge && ledger && badge[1] !== ledger[1]) {
  fail(`README badge says ${badge[1]} tests, CLAIMS.md says ${ledger[1]}`);
}

const publicDocs = [
  'README.md',
  'CLAIMS.md',
  'BENCHMARKS.md',
  'ROADMAP.md',
  'RELEASE_v0.1.0.md',
  'docs/ARCHITECTURE.md',
  'docs/benchmark-report.md',
  'docs/blog/2026-10-20-fastrmemory-0.2.0.md',
  'docs/blog/2026-10-21-fastrmemory-0.2.1.md',
  'docs/EXTERNAL_BASELINE.md',
  'docs/mcp-registry-submission.md',
  'docs/MEMORY_CI.md',
  'docs/NPM_PUBLISHING_TROUBLESHOOTING.md',
  'docs/npm-publishing.md',
  'docs/PUBLIC_BENCHMARKS.md',
  'docs/SPECIFICATION.md',
  'docs/audit/2026-10-20-baseline.md'
];

for (const rel of publicDocs) {
  const text = read(rel);
  if (/hippo|memoria/i.test(text)) {
    fail(`${rel} mentions a forbidden external-engine name`);
  }
  if (text.includes('latest.json')) {
    fail(`${rel} references the scratch artifact latest.json`);
  }
  if (text.includes('## ??') || text.includes('\uFFFD')) {
    fail(`${rel} contains a corrupted heading or replacement character`);
  }
  for (const match of text.matchAll(/bench\/results\/[A-Za-z0-9._-]+\.json/g)) {
    if (!fs.existsSync(path.join(ROOT, match[0]))) {
      fail(`${rel} references missing artifact ${match[0]}`);
    }
  }
}

if (benchmarks.includes('k=60') || benchmarks.includes('k = 60')) {
  fail('BENCHMARKS.md still advertises the retired k=60 default');
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}
console.log('Documentation checks passed: claims, counts, and artifact links agree.');
