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

const PKG_NAME = 'fastrmemory';
const MCP_NAME = 'io.github.atifjubaer/fastrmemory';
const TARBALL_GATE = 5 * 1024 * 1024;
const TARBALL_WARN = 2 * 1024 * 1024;

function fail(message) {
  errors.push(message);
}

function check(condition, message) {
  if (!condition) fail(message);
}

function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
  } catch {
    fail(`cannot read valid JSON from ${rel}`);
    return null;
  }
}

// 1. Metadata, MCP registry identity, and dependency shape.
check(pkg.name === PKG_NAME, `package name must be ${PKG_NAME}`);
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
const binTarget = 'bin/fastr-guard.mjs';
check(pkg.bin?.fastr === binTarget, `bin.fastr must be ${binTarget}`);
check(pkg.bin?.fastrmemory === binTarget, `bin.fastrmemory must be ${binTarget}`);
check(pkg.main === './dist/src/index.js', 'main must be ./dist/src/index.js');
check(pkg.types === './dist/src/index.d.ts', 'types must be ./dist/src/index.d.ts');
check(pkg.exports?.['.'] === './dist/src/index.js', 'exports["."] must be ./dist/src/index.js');
check(pkg.exports?.['./mcp'] === './dist/src/mcp/server.js', 'exports["./mcp"] must be ./dist/src/mcp/server.js');

const allowedFiles = new Set(['dist', 'dist-ui', 'bin/fastr-guard.mjs', 'skills', '.claude-plugin', '.cursor', 'server.json', 'llms-install.md']);
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

// 3b. Registry and plugin manifests must agree and pin the npm package, never a GitHub branch.
const plugin = readJson('.claude-plugin/plugin.json');
if (plugin) {
  check(plugin.version === pkg.version, `plugin.json version ${plugin.version} != package version ${pkg.version}`);
  const entry = plugin.mcpServers?.fastrmemory;
  check(entry?.command === 'npx', 'plugin.json MCP command must be npx');
  check(
    JSON.stringify(entry?.args) === JSON.stringify(['-y', `fastrmemory@${pkg.version}`, 'mcp']),
    `plugin.json MCP args must pin fastrmemory@${pkg.version}`
  );
}
const marketplace = readJson('.claude-plugin/marketplace.json');
if (marketplace) {
  check(
    marketplace.plugins?.[0]?.version === pkg.version,
    `marketplace.json version ${marketplace.plugins?.[0]?.version} != package version ${pkg.version}`
  );
}
const server = readJson('server.json');
if (server) {
  check(server.name === MCP_NAME, `server.json name must be ${MCP_NAME}`);
  check(server.version === pkg.version, `server.json version ${server.version} != package version ${pkg.version}`);
  const pkgEntry = server.packages?.[0];
  check(pkgEntry?.registryType === 'npm', 'server.json package registryType must be npm');
  check(pkgEntry?.identifier === PKG_NAME, `server.json package identifier must be ${PKG_NAME}`);
  check(pkgEntry?.transport?.type === 'stdio', 'server.json transport must be stdio');
  check(pkgEntry?.packageArguments?.[0]?.value === 'mcp', 'server.json packageArguments must select mcp');

  // The official registry validates server.json against
  // https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json before it
  // accepts a publish. These are the constraints that reject a release, mirrored locally so
  // a bad manifest fails here instead of after the npm version is already immutable.
  check(/^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/.test(server.name ?? ''), 'server.json name must be namespace/server');
  check((server.description ?? '').length >= 1 && (server.description ?? '').length <= 100,
    `server.json description must be 1-100 characters (is ${(server.description ?? '').length})`);
  check((server.title ?? '').length <= 100, 'server.json title must be at most 100 characters');
  check(server.repository?.url === 'https://github.com/atifjubaer/fastrmemory', 'server.json repository.url must point at the source repo');
  check(server.repository?.source === 'github', 'server.json repository.source must be github');
  check(server.websiteUrl === server.repository?.url, 'server.json websiteUrl must match repository.url');
  check(pkgEntry?.version === pkg.version, `server.json package version ${pkgEntry?.version} != package version ${pkg.version}`);
  // The registry resolves npm ownership by requiring this field on the published package.
  check(pkg.mcpName === MCP_NAME, `package.json mcpName must be ${MCP_NAME}`);
}
check(fs.existsSync(path.join(ROOT, 'llms-install.md')), 'llms-install.md is missing');
const generatedManifests = JSON.stringify({ plugin, marketplace, server });
check(!generatedManifests.includes('github:'), 'generated manifests must not use a GitHub default-branch reference');

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
  const cliVersion = execSync('node bin/fastr-guard.mjs --version', {
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
    'server.json',
    'llms-install.md',
    'bin/fastr-guard.mjs',
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
