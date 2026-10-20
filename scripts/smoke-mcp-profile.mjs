import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const CLI = path.join(REPO_ROOT, 'dist', 'bin', 'fastr.js');
const PROFILES = [
  { name: 'core', expectedTools: 12 },
  { name: 'full', expectedTools: 41 }
];

function listTools(profileName) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CLI, 'mcp', '--profile', profileName], {
      cwd: REPO_ROOT,
      stdio: ['pipe', 'pipe', 'pipe']
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

    const timer = setTimeout(() => finish(new Error(`${profileName}: timed out`)), 15000);

    const send = (message) => {
      child.stdin.write(JSON.stringify(message) + '\n');
    };

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
      if (!initialized) finish(new Error(`${profileName}: exited before initialize (${code})`));
    });

    send({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'fastr-mcp-smoke', version: '1.0.0' }
      }
    });
  });
}

let failed = false;

for (const profile of PROFILES) {
  try {
    const names = await listTools(profile.name);
    const ok = names.length === profile.expectedTools;
    console.log(JSON.stringify({
      profile: profile.name,
      expected: profile.expectedTools,
      actual: names.length,
      ok,
      names
    }, null, 2));
    if (!ok) failed = true;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    failed = true;
  }
}

if (failed) process.exit(1);
