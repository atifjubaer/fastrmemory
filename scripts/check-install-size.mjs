// Clean-install footprint and time gate.
//
// Packs the current tree, installs the tarball into an empty temporary project
// with scripts disabled, and checks the installed node_modules size and wall
// clock. The npm cache is warm by design: this gate measures package footprint
// and install overhead, not registry network latency.
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SIZE_LIMIT = 20 * 1024 * 1024;
const TIME_LIMIT_MS = 10_000;
function npmCliPath() {
  if (process.env.npm_execpath && fs.existsSync(process.env.npm_execpath)) {
    return process.env.npm_execpath;
  }
  const candidates = [
    path.resolve(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    path.resolve(path.dirname(process.execPath), '..', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js')
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

const npmCli = npmCliPath();

function runNpm(args, options) {
  if (npmCli) {
    return execFileSync(process.execPath, [npmCli, ...args], options);
  }
  // Last-resort fallback for unusual Node installations without npm-cli.js.
  return execFileSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
    ...options,
    shell: process.platform === 'win32'
  });
}

function dirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) total += dirSize(target);
    else if (entry.isFile()) total += fs.lstatSync(target).size;
  }
  return total;
}

function formatBytes(bytes) {
  return `${bytes.toLocaleString('en-US')} bytes (${(bytes / 1024 / 1024).toFixed(2)} MiB)`;
}

if (process.env.FASTR_PERF_GATE === '0') {
  console.log('Install gate skipped (FASTR_PERF_GATE=0; non-canonical CI runner).');
  process.exit(0);
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-install-gate-'));
const packDir = path.join(work, 'pack');
const installDir = path.join(work, 'install');
fs.mkdirSync(packDir, { recursive: true });
fs.mkdirSync(installDir, { recursive: true });

try {
  const packOutput = runNpm(
    ['pack', '--json', '--ignore-scripts', '--pack-destination', packDir],
    { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  );
  const pack = JSON.parse(packOutput)[0];
  const tarball = path.join(packDir, pack.filename);
  if (!fs.existsSync(tarball)) {
    throw new Error(`npm pack did not produce ${tarball}`);
  }

  fs.writeFileSync(
    path.join(installDir, 'package.json'),
    `${JSON.stringify({ name: 'fastr-install-gate', version: '1.0.0', private: true }, null, 2)}\n`,
    'utf8'
  );

  const started = performance.now();
  runNpm(
    [
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--no-package-lock',
      '--no-save',
      '--omit=dev',
      '--prefer-offline',
      '--loglevel=error',
      '--prefix',
      installDir,
      tarball
    ],
    { cwd: installDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  );
  const elapsedMs = performance.now() - started;
  const nodeModules = path.join(installDir, 'node_modules');
  if (!fs.existsSync(nodeModules)) {
    throw new Error('npm install produced no node_modules directory');
  }
  const bytes = dirSize(nodeModules);
  const failures = [];
  if (bytes > SIZE_LIMIT) failures.push(`installed size ${formatBytes(bytes)} exceeds ${formatBytes(SIZE_LIMIT)}`);
  if (elapsedMs > TIME_LIMIT_MS) failures.push(`install time ${elapsedMs.toFixed(0)} ms exceeds ${TIME_LIMIT_MS} ms`);

  console.log(`Tarball: ${pack.filename} (${formatBytes(pack.size)} packed, ${formatBytes(pack.unpackedSize)} unpacked)`);
  console.log(`Installed node_modules: ${formatBytes(bytes)}`);
  console.log(`Install time: ${elapsedMs.toFixed(0)} ms (warm npm cache; network excluded)`);
  if (failures.length > 0) {
    for (const failure of failures) console.error(`ERROR: ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`Install gate passed: < ${formatBytes(SIZE_LIMIT)} and < ${TIME_LIMIT_MS} ms.`);
  }
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}
