// Clean-machine smoke test for the published npm package.
//
// Runs `npx --yes fastrmemory@<version>` from a directory that has no checkout, no global
// install, and no node_modules, then checks two things:
//
//   1. `--version` prints exactly the version in package.json.
//   2. `status` boots the real server context, which opens a `node:sqlite` database. A package
//      that ships without a working native SQLite path fails here, not in a user's editor.
//
// The registry may lag a tag push by a minute or two, so a 404 is retried before failing.
// Prints one JSON summary line. Exit code 1 on any failure.

import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf-8'));
const VERSION = pkg.version;
const PACKAGE = `fastrmemory@${VERSION}`;

const MAX_ATTEMPTS = 40;
const RETRY_DELAY_MS = 15_000;

function npx(args, cwd) {
  // npm ships npx as a .cmd shim on Windows, and only a shell resolves that shim. Build one
  // command string with every argument quoted, so nothing here can be split or re-parsed.
  const quoted = args.map((arg) => (/^[A-Za-z0-9@._:/=-]+$/.test(arg) ? arg : `"${arg.replace(/"/g, '\\"')}"`));
  return spawnSync(['npx', ...quoted].join(' '), {
    cwd,
    encoding: 'utf-8',
    shell: true,
    timeout: 300_000,
    env: { ...process.env, npm_config_yes: 'true' }
  });
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-npx-'));
const project = path.join(root, 'project');
fs.mkdirSync(project, { recursive: true });

const result = {
  kind: 'npx-smoke',
  package: PACKAGE,
  platform: process.platform,
  arch: process.arch,
  node: process.versions.node,
  version: null,
  statusBooted: false,
  attempts: 0,
  ok: false
};

try {
  let versionRun;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    result.attempts = attempt;
    versionRun = npx(['--yes', PACKAGE, '--version'], project);
    const out = `${versionRun.stdout ?? ''}${versionRun.stderr ?? ''}`;
    // A 404 means the tag is published before the registry caught up.
    if (versionRun.status === 0 || !/E404|404 Not Found|notarget/i.test(out)) break;
    if (attempt < MAX_ATTEMPTS) sleep(RETRY_DELAY_MS);
  }

  result.version = (versionRun.stdout ?? '').trim();
  if (versionRun.status !== 0) {
    throw new Error(`npx --version exited ${versionRun.status}: ${(versionRun.stderr ?? '').trim().slice(0, 500)}`);
  }
  if (result.version !== VERSION) {
    throw new Error(`npx --version printed ${JSON.stringify(result.version)}, expected ${VERSION}`);
  }

  const statusRun = npx(['--yes', PACKAGE, 'status'], project);
  const statusOut = `${statusRun.stdout ?? ''}`;
  if (statusRun.status !== 0) {
    throw new Error(`npx status exited ${statusRun.status}: ${(statusRun.stderr ?? '').trim().slice(0, 500)}`);
  }
  if (!statusOut.includes('FastrMemory Health')) {
    throw new Error(`npx status did not print a health report: ${statusOut.slice(0, 300)}`);
  }
  result.statusBooted = true;
  result.ok = true;
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error);
} finally {
  fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

console.log(JSON.stringify(result));
if (!result.ok) process.exitCode = 1;
