import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installOpenCode } from '../dist/src/installer/opencode.js';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const CLI = path.join(REPO_ROOT, 'dist', 'bin', 'fastr.js');
const EXPECTED_TOOLS = 41;

function listTools(command, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command[0], command.slice(1), {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true
    });
    const lines = createInterface({ input: child.stdout });
    let initialized = false;
    let settled = false;

    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try { child.stdin.end(); } catch {}
      try { child.kill(); } catch {}
      if (error) reject(error);
      else resolve(value);
    };

    const timer = setTimeout(() => finish(new Error('OpenCode MCP smoke timed out')), 15000);
    const send = (message) => child.stdin.write(JSON.stringify(message) + '\n');

    lines.on('line', (line) => {
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        return;
      }
      if (message.id === 1 && message.result) {
        initialized = true;
        send({ jsonrpc: '2.0', method: 'notifications/initialized' });
        send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
        return;
      }
      if (message.id === 2 && message.result) {
        finish(null, message.result.tools.map((tool) => tool.name).sort());
      }
    });

    child.stderr.on('data', (chunk) => process.stderr.write(chunk));
    child.on('error', (error) => finish(error));
    child.on('exit', (code) => {
      if (!initialized) finish(new Error(`OpenCode MCP server exited before initialize (${code})`));
    });

    send({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'fastr-opencode-smoke', version: '1.0.0' }
      }
    });
  });
}

async function removeTempDir(dir) {
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      return;
    } catch (error) {
      if (error?.code !== 'EPERM' && error?.code !== 'EBUSY') throw error;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  fs.rmSync(dir, { recursive: true, force: true });
}

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

  const names = await listTools(server.command, tempDir);
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
