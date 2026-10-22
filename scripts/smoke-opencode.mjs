import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installOpenCode } from '../dist/src/installer/opencode.js';
import { listMcpTools, removeTempDir } from './lib/smoke-utils.mjs';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const CLI = path.join(REPO_ROOT, 'dist', 'bin', 'fastr.js');
const EXPECTED_TOOLS = 41;

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-opencode-'));
try {
  const install = installOpenCode(tempDir, {
    command: process.execPath,
    args: [CLI, 'mcp']
  });
  const config = JSON.parse(fs.readFileSync(path.join(tempDir, 'opencode.json'), 'utf-8'));
  const server = config.mcp?.servers?.fastrmemory;
  if (!server || server.type !== 'local' || !Array.isArray(server.command)) {
    throw new Error('OpenCode config does not contain a local fastrmemory server');
  }
  if (!fs.existsSync(path.join(tempDir, '.opencode', 'plugins', 'fastrmemory', 'index.ts'))) {
    throw new Error('OpenCode plugin was not written');
  }

  const names = await listMcpTools(server.command, tempDir);
  const ok = names.length === EXPECTED_TOOLS;
  console.log(JSON.stringify({
    config: 'opencode.json',
    server: 'fastrmemory',
    command: server.command,
    plugin: '.opencode/plugins/fastrmemory/index.ts',
    pluginChanged: install.pluginChanged,
    expectedTools: EXPECTED_TOOLS,
    actualTools: names.length,
    ok
  }, null, 2));
  if (!ok) process.exitCode = 1;
} finally {
  await removeTempDir(tempDir);
}
