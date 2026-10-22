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
  'docs/QUERY_PLANS.md',
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

// The README tool catalog must match the server registrations, not just the count.
const toolSectionStart = readme.indexOf('### 41 MCP Tools');
const toolSectionEnd = readme.indexOf('### 2 MCP Prompt Templates');
if (toolSectionStart < 0 || toolSectionEnd < 0 || toolSectionEnd < toolSectionStart) {
  fail('README.md is missing the MCP tool or prompt sections');
} else {
  const section = readme.slice(toolSectionStart, toolSectionEnd);
  const readmeTools = [...section.matchAll(/^\d+\. `(fastr_[a-z_]+)`/gm)].map((match) => match[1]);
  const serverSource = read('src/mcp/server.ts');
  const serverTools = [...serverSource.matchAll(/registerTool\(\s*['"](fastr_[a-z_]+)['"]/g)].map((match) => match[1]);
  const readmeToolSet = new Set(readmeTools);
  const serverToolSet = new Set(serverTools);

  if (readmeToolSet.size !== 41) fail(`README.md lists ${readmeToolSet.size} tools, expected 41`);
  if (serverToolSet.size !== 41) fail(`src/mcp/server.ts registers ${serverToolSet.size} tools, expected 41`);
  for (const name of readmeToolSet) {
    if (!serverToolSet.has(name)) fail(`README.md lists ${name}, but the server does not register it`);
  }
  for (const name of serverToolSet) {
    if (!readmeToolSet.has(name)) fail(`src/mcp/server.ts registers ${name}, but README.md does not list it`);
  }

  const promptCount = (serverSource.match(/registerPrompt\(/g) || []).length;
  const resourceCount = (serverSource.match(/registerResource\(/g) || []).length;
  if (promptCount !== 2) fail(`src/mcp/server.ts registers ${promptCount} prompts, expected 2`);
  if (resourceCount !== 5) fail(`src/mcp/server.ts registers ${resourceCount} resources, expected 5`);
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
  'docs/QUERY_PLANS.md',
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

// Every README H2 section must have a row in the CLAIMS.md trace block, and every
// referenced claim ID must exist. Headings inside fenced code blocks are ignored.
const traceStartMarker = '<!-- README_TRACE_START -->';
const traceEndMarker = '<!-- README_TRACE_END -->';
const traceStart = claims.indexOf(traceStartMarker);
const traceEnd = claims.indexOf(traceEndMarker);
if (traceStart < 0 || traceEnd < 0 || traceEnd < traceStart) {
  fail('CLAIMS.md is missing the README claim trace block');
} else {
  const normalizeHeading = (value) => value.replace(/^[^\p{L}\p{N}]+/u, '').trim();
  const traceBlock = claims.slice(traceStart + traceStartMarker.length, traceEnd);
  const traceRows = traceBlock.split(/\r?\n/).filter((line) => line.trim().startsWith('|'));
  const trace = new Map();
  for (const row of traceRows.slice(2)) {
    const cells = row.split('|').map((cell) => cell.trim());
    if (cells.length < 3) continue;
    const heading = normalizeHeading(cells[1].replace(/`/g, ''));
    const ids = cells[2].match(/[A-J]\d+[a-z]?/g) || [];
    if (heading) trace.set(heading, ids);
  }

  const headings = [];
  let inFence = false;
  for (const line of readme.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && line.startsWith('## ')) headings.push(normalizeHeading(line.slice(3)));
  }

  for (const heading of headings) {
    if (!trace.has(heading)) fail(`README heading is not traced in CLAIMS.md: ${heading}`);
    else if (trace.get(heading).length === 0) fail(`README heading has no claim IDs in CLAIMS.md: ${heading}`);
  }
  for (const heading of trace.keys()) {
    if (!headings.includes(heading)) fail(`CLAIMS.md trace row does not match a README heading: ${heading}`);
  }

  const claimIds = new Set([...claims.matchAll(/^\| ([A-J]\d+[a-z]?) \|/gm)].map((match) => match[1]));
  for (const [heading, ids] of trace) {
    for (const id of ids) {
      if (!claimIds.has(id)) fail(`CLAIMS.md trace for "${heading}" references missing claim ${id}`);
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
