import * as fs from 'node:fs';
import * as path from 'node:path';
import * as http from 'node:http';
import { spawn, execSync } from 'node:child_process';
import { findProjectRoot, loadConfig } from '../config.js';

export interface DaemonInfo {
  pid: number;
  port: number;
  url: string;
  startedAt: string;
}

export interface DaemonStatusResult {
  running: boolean;
  pid?: number;
  port?: number;
  url?: string;
  startedAt?: string;
  uptimeSeconds?: number;
  health?: any;
}

export function getDaemonPidFile(projectRoot?: string): string {
  const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
  return path.join(root, '.fastr', 'daemon.json');
}

export function isPidAlive(pid: number): boolean {
  if (process.platform === 'win32') {
    try {
      const output = execSync(`tasklist /FI "PID eq ${pid}" /NH`, {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
        windowsHide: true
      });
      return output.includes(String(pid));
    } catch {
      return false;
    }
  }

  try {
    process.kill(pid, 0);
    return true;
  } catch (err: any) {
    return err.code === 'EPERM';
  }
}

export function pingPort(port: number, timeoutMs = 800): Promise<any | null> {
  return new Promise((resolve) => {
    const req = http.get(
      `http://127.0.0.1:${port}/api/status`,
      { timeout: timeoutMs },
      (res) => {
        if (res.statusCode !== 200) {
          resolve(null);
          return;
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve({ ok: true });
          }
        });
      }
    );
    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
  });
}

export async function getDaemonStatus(projectRoot?: string): Promise<DaemonStatusResult> {
  const pidFile = getDaemonPidFile(projectRoot);
  if (!fs.existsSync(pidFile)) {
    return { running: false };
  }

  let info: DaemonInfo;
  try {
    info = JSON.parse(fs.readFileSync(pidFile, 'utf-8'));
  } catch {
    return { running: false };
  }

  // Ping HTTP server first
  const health = await pingPort(info.port);
  const alive = health !== null || isPidAlive(info.pid);

  if (!alive) {
    // Process died, clean up stale pidfile
    try {
      fs.unlinkSync(pidFile);
    } catch {}
    return { running: false };
  }

  const startTime = new Date(info.startedAt).getTime();
  const uptimeSeconds = Math.max(0, Math.floor((Date.now() - startTime) / 1000));

  return {
    running: true,
    pid: info.pid,
    port: info.port,
    url: info.url,
    startedAt: info.startedAt,
    uptimeSeconds,
    health: health || { status: 'responsive' }
  };
}

function resolveDaemonBin(): { executable: string; args: string[] } {
  const projectRoot = findProjectRoot();
  const distBin = path.join(projectRoot, 'dist', 'bin', 'fastr.js');
  if (fs.existsSync(distBin)) {
    return { executable: process.execPath, args: [distBin] };
  }

  // If in TypeScript source environment
  const tsBin = path.join(projectRoot, 'bin', 'fastr.ts');
  if (fs.existsSync(tsBin)) {
    return { executable: 'npx', args: ['tsx', tsBin] };
  }

  return { executable: 'fastrmemory', args: [] };
}

export async function startDaemon(options: {
  port?: number;
  projectRoot?: string;
  openBrowser?: boolean;
} = {}): Promise<{ pid: number; port: number; url: string; newlyStarted: boolean }> {
  const root = options.projectRoot ? path.resolve(options.projectRoot) : findProjectRoot();
  const port = options.port || 4242;
  const status = await getDaemonStatus(root);

  if (status.running && status.pid && status.port) {
    return {
      pid: status.pid,
      port: status.port,
      url: status.url || `http://localhost:${status.port}`,
      newlyStarted: false
    };
  }

  const fastrDir = path.join(root, '.fastr');
  if (!fs.existsSync(fastrDir)) {
    fs.mkdirSync(fastrDir, { recursive: true });
  }

  const outLog = path.join(fastrDir, 'daemon.log');

  const { executable, args } = resolveDaemonBin();
  const spawnArgs = [...args, 'daemon', 'run', '--port', String(port)];

  const child = spawn(executable, spawnArgs, {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
    cwd: root,
    env: { ...process.env, FASTR_DAEMON_SPAWNED: '1' }
  });

  child.unref();

  // Wait for server to become responsive
  const url = `http://localhost:${port}`;
  let ready = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 250));
    const health = await pingPort(port, 400);
    if (health) {
      ready = true;
      break;
    }
  }

  if (!ready) {
    throw new Error(`Failed to start FastrMemory background daemon on port ${port}. Check log at: ${outLog}`);
  }

  const pidFile = getDaemonPidFile(root);
  let info: DaemonInfo;
  try {
    info = JSON.parse(fs.readFileSync(pidFile, 'utf-8'));
  } catch {
    info = {
      pid: child.pid!,
      port,
      url,
      startedAt: new Date().toISOString()
    };
    fs.writeFileSync(pidFile, JSON.stringify(info, null, 2), 'utf-8');
  }

  return {
    pid: info.pid,
    port: info.port,
    url: info.url,
    newlyStarted: true
  };
}

export async function stopDaemon(projectRoot?: string): Promise<{
  stopped: boolean;
  pid?: number;
  message: string;
}> {
  const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
  const pidFile = getDaemonPidFile(root);

  if (!fs.existsSync(pidFile)) {
    return { stopped: false, message: 'FastrMemory daemon is not currently running.' };
  }

  let info: DaemonInfo;
  try {
    info = JSON.parse(fs.readFileSync(pidFile, 'utf-8'));
  } catch {
    try {
      fs.unlinkSync(pidFile);
    } catch {}
    return { stopped: false, message: 'Corrupted daemon.json removed.' };
  }

  if (isPidAlive(info.pid)) {
    try {
      if (process.platform === 'win32') {
        execSync(`taskkill /F /PID ${info.pid}`, { stdio: 'ignore' });
      } else {
        process.kill(info.pid, 'SIGTERM');
      }
    } catch {
      try {
        process.kill(info.pid, 'SIGKILL');
      } catch {}
    }
  }

  try {
    fs.unlinkSync(pidFile);
  } catch {}

  return {
    stopped: true,
    pid: info.pid,
    message: `FastrMemory daemon (PID ${info.pid}) on port ${info.port} stopped successfully.`
  };
}
