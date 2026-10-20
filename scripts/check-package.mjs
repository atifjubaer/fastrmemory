// Validates the publishable package surface without contacting a registry.
//
// - Metadata, MCP registry name, bin paths, exports, and files allowlist agree.
// - Required runtime and UI files are present in the tarball.
// - Source, tests, docs, benchmark data, references, and local state are excluded.
// - Runtime dependencies stay small; the optional semantic model is a peer.
// - Tarball size stays inside the 5 MB roadmap gate.
//
// Plain Node ESM, no dependencies. Exit code 1 on any error.
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const errors = [];
const warnings = [];

const MCP_NAME = 'io.github.atifjubaer/fastrmemory';
const TARBALL_GATE = 5 * 1024 * 1024;
const TARBALL_WARN = 2 * 1024 * 1024;

function fail(message) {
  errors.push(message);
}

function check(condition, message) {
  if (!condition) fail(message);
}

// 1. Metadata, MCP registry identity, and dependency shape.
check(pkg.name === '@atifjubaer/fastrmemory', 'unexpected package name');
check(pkg.mcpName === MCP_NAME, `mcpName must be ${MCP_NAME}`);
check(/^\d+\.\d+\.\d+$/.test(pkg.version), 'version must be semver');
check(pkg.license === 'Apache-2.0', 'license must be Apache-2.0');
check(pkg.engines?.node === '>=22.16.0', 'engines.node must be >=22.16.0');
check(!pkg.dependencies?.['@huggingface/transformers'], 'semantic model must not be a required dependency');
check(pkg.peerDependencies?.['@huggingface/transformers'], 'semantic model must be declared as a peer');
check(pkg.peerDependenciesMeta?.['@huggingface/transformers']?.optional === true, 'semantic peer must be optional');
const runtimeDeps = Object.keys(pkg.dependencies ?? {});
check(runtimeDeps.length === 3, `expected 3 runtime dependencies, found ${runtimeDeps.length}: ${runtimeDeps.join(', ')}`);

// 2. Package entrypoints and the files allowlist.
const binTarget = 'dist/bin/fastr.js';
check(pkg.bin?.fastr === binTarget, `bin.fastr must be ${binTarget}`);
check(pkg.bin?.fastrmemory === binTarget, `bin.fastrmemory must be ${binTarget}`);
check(pkg.main === './dist/src/index.js', 'main must be ./dist/src/index.js');
check(pkg.types === './dist/src/index.d.ts', 'types must be ./dist/src/index.d.ts');
check(pkg.exports?.['.'] === './dist/src/index.js', 'exports["."] must be ./dist/src/index.js');
check(pkg.exports?.['./mcp'] === './dist/src/mcp/server.js', 'exports["./mcp"] must be ./dist/src/mcp/server.js');

const allowedFiles = new Set(['dist', 'dist-ui', 'skills', '.claude-plugin', '.cursor']);
for (const entry of pkg.files ?? []) {
  check(allowedFiles.has(entry), `files must not include ${entry}`);
}
for (const required of allowedFiles) {
  check((pkg.files ?? []).includes(required), `files must include ${required}`);
}

// 3. Skills metadata must match the package version.
const skillsFile = path.join(ROOT, 'skills', 'skills.json');
if (!fs.existsSync(skillsFile)) {
  fail('skills/skills.json is missing');
} else {
  const skills = JSON.parse(fs.readFileSync(skillsFile, 'utf8'));
  if (typeof skills.version === 'string') {
    check(skills.version === pkg.version, `skills.json version ${skills.version} != package version ${pkg.version}`);
  } else {
    warnings.push('skills/skills.json has no version field; skipping version sync check');
  }
}

// 4. Build output required by the bin, main, types, and exports map.
const buildOutputs = [
  'dist/bin/fastr.js',
  'dist/src/index.js',
  'dist/src/index.d.ts',
  'dist/src/mcp/server.js',
  'dist-ui/index.html',
  'dist-ui/build-manifest.json'
];
for (const rel of buildOutputs) {
  check(fs.existsSync(path.join(ROOT, rel)), `missing build output: ${rel} (run npm run build:core or npm run build:ui)`);
}
check(fs.existsSync(path.join(ROOT, 'dist-ui', 'assets')), 'dist-ui/assets is missing (run npm run build:ui)');

// The compiled CLI must report the package version, not a stale literal.
try {
  const cliVersion = execSync('node dist/bin/fastr.js --version', {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 30_000
  }).trim();
  check(cliVersion === pkg.version, `CLI --version reports ${cliVersion}, expected ${pkg.version}`);
} catch (err) {
  fail(`CLI --version failed: ${err instanceof Error ? err.message : String(err)}`);
}

// 5. Inspect the exact npm tarball file list.
let pack;
try {
  // Static command string keeps Windows npm.cmd resolution working (spawnSync EINVAL otherwise).
  const raw = execSync('npm pack --dry-run --json --ignore-scripts', {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 120_000
  });
  const parsed = JSON.parse(raw);
  pack = Array.isArray(parsed) ? parsed[0] : parsed;
} catch (err) {
  fail(`npm pack --dry-run failed: ${err instanceof Error ? err.message : String(err)}`);
}

if (pack) {
  const files = new Set((pack.files ?? []).map((f) => f.path.replaceAll('\\', '/')));
  const required = [
    'package.json',
    'README.md',
    'LICENSE',
    ...buildOutputs,
    'skills/skills.json'
  ];
  for (const rel of required) {
    check(files.has(rel), `tarball is missing ${rel}`);
  }

  const forbiddenPrefixes = [
    'src/',
    'tests/',
    'scripts/',
    'bench/',
    'references/',
    'docs/',
    'ui/',
    'extensions/',
    'coverage/',
    'node_modules/',
    '.git/',
    '.github/',
    '.fastr/'
  ];
  for (const rel of files) {
    if (forbiddenPrefixes.some((prefix) => rel.startsWith(prefix))) {
      fail(`tarball must not include ${rel}`);
    }
    if (/(^|\/)\.env($|\.)/.test(rel) || rel.endsWith('.key') || rel.endsWith('.pem')) {
      fail(`tarball may contain a secret: ${rel}`);
    }
    if (/(^|\/)[^/]+\.(db|sqlite|sqlite3|db-wal|db-shm)$/i.test(rel)) {
      fail(`tarball must not include database state: ${rel}`);
    }
  }

  const size = Number(pack.size ?? 0);
  const unpacked = Number(pack.unpackedSize ?? 0);
  check(size > 0, 'tarball size was not reported');
  check(size < TARBALL_GATE, `tarball is ${(size / 1024).toFixed(1)} kB; roadmap gate is 5 MB`);
  if (size >= TARBALL_WARN) {
    warnings.push(`tarball is ${(size / 1024).toFixed(1)} kB; the internal target is under 2 MB`);
  }
  console.log(`Tarball: ${files.size} files, ${(size / 1024).toFixed(1)} kB packed, ${(unpacked / 1024 / 1024).toFixed(1)} MB unpacked`);
}

for (const warning of warnings) console.warn(`WARN: ${warning}`);
if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}
console.log(`Package checks passed (v${pkg.version}, ${runtimeDeps.length} runtime dependencies).`);
