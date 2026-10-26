// End-to-end smoke test for `fastr hook install` / `fastr hook uninstall`.
//
// Runs the real CLI against a throwaway project that already contains user-owned config, and
// asserts the three properties the client support matrix claims:
//   1. install writes the client's MCP entry and hooks,
//   2. install is idempotent (second run reports `present`),
//   3. uninstall restores the project and is idempotent (second run reports `absent`).
//
// Only claude, opencode, and cursor are exercised here, because those are the three clients
// whose config formats are stable enough to assert on without a live client. gemini and copilot
// are covered by unit tests in tests/hook-lifecycle.test.ts.
//
// Exit code 1 on any failure. Prints one JSON line per client so CI logs are greppable.

import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const CLI = path.join(REPO_ROOT, 'dist', 'bin', 'fastr.js');
const CLIENTS = ['claude', 'opencode', 'cursor'];

if (!fs.existsSync(CLI)) {
  console.error(`missing ${CLI}; run \`npm run build:core\` first`);
  process.exit(1);
}

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-hooks-smoke-'));
const project = path.join(root, 'project');
fs.mkdirSync(project, { recursive: true });

// User-owned content that must survive the whole cycle.
fs.writeFileSync(path.join(project, 'AGENTS.md'), '# Project\n\nRules that must survive.\n', 'utf-8');
fs.writeFileSync(
  path.join(project, '.mcp.json'),
  `${JSON.stringify({ mcpServers: { other: { command: 'node', args: ['other.js'] } } }, null, 2)}\n`,
  'utf-8'
);
fs.writeFileSync(
  path.join(project, 'opencode.json'),
  `${JSON.stringify({ theme: 'dark' }, null, 2)}\n`,
  'utf-8'
);

function run(command) {
  const result = spawnSync(process.execPath, [CLI, 'hook', command, '--project', project, '--client', CLIENTS.join(','), '--json'], {
    cwd: project,
    encoding: 'utf-8',
    timeout: 120_000
  });
  if (result.status !== 0) {
    throw new Error(`hook ${command} exited ${result.status}\n${result.stdout}\n${result.stderr}`);
  }
  const start = result.stdout.indexOf('{');
  if (start < 0) throw new Error(`hook ${command} printed no JSON:\n${result.stdout}`);
  return JSON.parse(result.stdout.slice(start));
}

function snapshot() {
  const files = {};
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (!entry.name.endsWith('.fastr.bak')) {
        files[path.relative(project, full).replace(/\\/g, '/')] = fs.readFileSync(full, 'utf-8');
      }
    }
  };
  walk(project);
  return files;
}

const failures = [];
const rows = [];

function check(label, condition, detail) {
  if (!condition) failures.push(`${label}: ${detail}`);
  return condition;
}

try {
  const before = snapshot();

  const first = run('install');
  check('install', first.clients.every((client) => client.status === 'updated'), 'every client should report updated');

  const expectedFiles = {
    claude: ['.mcp.json', '.claude/settings.json'],
    opencode: ['opencode.json', '.opencode/plugins/fastrmemory/index.ts'],
    cursor: ['.cursor/mcp.json']
  };
  for (const client of CLIENTS) {
    const present = expectedFiles[client].every((rel) => fs.existsSync(path.join(project, rel)));
    check(`${client} install`, present, `expected ${expectedFiles[client].join(', ')}`);
    rows.push({ client, installed: present, idempotentInstall: null, removed: null, idempotentUninstall: null });
  }

  const claudeMcp = JSON.parse(fs.readFileSync(path.join(project, '.mcp.json'), 'utf-8'));
  check('claude mcp', claudeMcp.mcpServers?.other?.command === 'node', 'user server must survive install');
  check('claude mcp', claudeMcp.mcpServers?.fastrmemory?.args?.includes('mcp'), 'fastrmemory entry must point at mcp');
  const claudeHooks = JSON.parse(fs.readFileSync(path.join(project, '.claude', 'settings.json'), 'utf-8'));
  const hookCommands = Object.values(claudeHooks.hooks ?? {}).flatMap((groups) => groups.flatMap((group) => group.hooks ?? []));
  check('claude hooks', hookCommands.length === 4, `expected 4 hook commands, found ${hookCommands.length}`);
  check('claude hooks', hookCommands.every((hook) => /hook\s+run/.test(hook.command)), 'every hook must call `hook run`');

  const second = run('install');
  check('install idempotent', second.clients.every((client) => client.status === 'present'), 'second install must report present');
  for (const row of rows) row.idempotentInstall = second.clients.find((client) => client.client === row.client)?.status === 'present';

  const removed = run('uninstall');
  check('uninstall', removed.clients.every((client) => client.status === 'removed'), 'every client should report removed');
  for (const row of rows) row.removed = removed.clients.find((client) => client.client === row.client)?.status === 'removed';

  const after = snapshot();
  const afterKeys = Object.keys(after).sort();
  const beforeKeys = Object.keys(before).sort();
  check('round trip', JSON.stringify(afterKeys) === JSON.stringify(beforeKeys), `files ${JSON.stringify(afterKeys)} != ${JSON.stringify(beforeKeys)}`);
  for (const key of beforeKeys) {
    if (key === 'AGENTS.md') {
      check('round trip', after[key] === before[key], 'AGENTS.md must be restored exactly');
    } else {
      check('round trip', JSON.stringify(JSON.parse(after[key])) === JSON.stringify(JSON.parse(before[key])), `${key} must be restored`);
    }
  }
  check('round trip', !Object.values(after).join('\n').match(/fastrmemory/i), 'no fastrmemory residue may remain');

  const again = run('uninstall');
  check('uninstall idempotent', again.changed === false, 'second uninstall must change nothing');
  check('uninstall idempotent', again.clients.every((client) => client.status === 'absent'), 'second uninstall must report absent');
  for (const row of rows) row.idempotentUninstall = again.clients.find((client) => client.client === row.client)?.status === 'absent';

  for (const row of rows) console.log(JSON.stringify({ kind: 'client', ...row, ok: Object.values(row).every((value) => value !== false) }));
  console.log(JSON.stringify({
    kind: 'summary',
    platform: process.platform,
    node: process.versions.node,
    clients: CLIENTS,
    filesBefore: beforeKeys.length,
    filesAfter: afterKeys.length,
    ok: failures.length === 0
  }));
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
}
