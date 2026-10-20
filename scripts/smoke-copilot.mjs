import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installCopilot } from '../dist/src/installer/copilot.js';
import { listMcpTools, removeTempDir } from './lib/smoke-utils.mjs';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const CLI = path.join(REPO_ROOT, 'dist', 'bin', 'fastr.js');
const EXPECTED_TOOLS = 41;
const EXPECTED_HOOKS = ['sessionStart', 'preToolUse', 'preCompact', 'sessionEnd'];

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-copilot-'));
try {
  const install = installCopilot(tempDir, {
    command: process.execPath,
    args: [CLI, 'mcp']
  });

  const mcp = JSON.parse(fs.readFileSync(path.join(tempDir, '.github', 'mcp.json'), 'utf-8'));
  const server = mcp.mcpServers?.fastrmemory;
  if (!server || server.type !== 'local' || typeof server.command !== 'string' || !Array.isArray(server.args)) {
    throw new Error('Copilot config does not contain a local fastrmemory server');
  }

  const hooksConfig = JSON.parse(fs.readFileSync(
    path.join(tempDir, '.github', 'hooks', 'fastrmemory.json'),
    'utf-8'
  ));
  const hookEvents = Object.keys(hooksConfig.hooks ?? {});
  for (const event of EXPECTED_HOOKS) {
    if (!hookEvents.includes(event)) throw new Error(`Copilot config is missing the ${event} hook`);
  }
  const hookCommands = hookEvents.flatMap((event) =>
    (hooksConfig.hooks[event] ?? []).map((entry) => entry.command)
  );
  if (!hookCommands.every((command) => command.includes('--format copilot'))) {
    throw new Error('Copilot hook commands must use the Copilot JSON output contract');
  }

  const names = await listMcpTools([server.command, ...server.args], tempDir);
  const ok = hooksConfig.version === 1 && names.length === EXPECTED_TOOLS;
  console.log(JSON.stringify({
    mcp: '.github/mcp.json',
    hooks: '.github/hooks/fastrmemory.json',
    server: 'fastrmemory',
    command: [server.command, ...server.args],
    hookEvents,
    hookCount: hookCommands.length,
    configChanged: install.changed,
    expectedTools: EXPECTED_TOOLS,
    actualTools: names.length,
    ok
  }, null, 2));
  if (!ok) process.exitCode = 1;
} finally {
  await removeTempDir(tempDir);
}
