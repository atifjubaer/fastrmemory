import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installGemini } from '../dist/src/installer/gemini.js';
import { listMcpTools, removeTempDir } from './lib/smoke-utils.mjs';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const CLI = path.join(REPO_ROOT, 'dist', 'bin', 'fastr.js');
const EXPECTED_TOOLS = 41;
const EXPECTED_HOOKS = ['SessionStart', 'BeforeTool', 'PreCompress', 'SessionEnd'];

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-gemini-'));
try {
  const install = installGemini(tempDir, {
    command: process.execPath,
    args: [CLI, 'mcp']
  });
  const configPath = path.join(tempDir, '.gemini', 'settings.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const server = config.mcpServers?.fastrmemory;
  if (!server || typeof server.command !== 'string' || !Array.isArray(server.args)) {
    throw new Error('Gemini config does not contain a stdio fastrmemory server');
  }

  const hookEvents = Object.keys(config.hooks ?? {});
  for (const event of EXPECTED_HOOKS) {
    if (!hookEvents.includes(event)) throw new Error(`Gemini config is missing the ${event} hook`);
  }
  const hookCommands = hookEvents.flatMap((event) =>
    (config.hooks[event] ?? []).flatMap((group) => (group.hooks ?? []).map((hook) => hook.command))
  );
  if (!hookCommands.every((command) => command.includes('--format gemini'))) {
    throw new Error('Gemini hook commands must use the Gemini JSON output contract');
  }

  const names = await listMcpTools([server.command, ...server.args], tempDir);
  const ok = names.length === EXPECTED_TOOLS;
  console.log(JSON.stringify({
    config: '.gemini/settings.json',
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
