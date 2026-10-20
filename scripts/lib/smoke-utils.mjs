import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import * as fs from 'node:fs';

/** Runs one MCP stdio server, initializes it, and returns its sorted tool names. */
export function listMcpTools(command, cwd, options = {}) {
  const timeoutMs = options.timeoutMs ?? 15000;
  return new Promise((resolve, reject) => {
    const child = spawn(command[0], command.slice(1), {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true
    });
    const lines = createInterface({ input: child.stdout });
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

    const timer = setTimeout(() => finish(new Error('MCP smoke timed out')), timeoutMs);
    const send = (message) => child.stdin.write(JSON.stringify(message) + '\n');

    lines.on('line', (line) => {
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        return;
      }
      if (message.id === 1 && message.result) {
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
    child.on('exit', (code) => finish(new Error(`MCP server exited before tools/list (${code})`)));

    send({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'fastr-install-smoke', version: '1.0.0' }
      }
    });
  });
}

/** Windows may briefly hold SQLite handles after a child exits, so retry cleanup. */
export async function removeTempDir(dir) {
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
