// 10k-write crash test: kill the writer at randomized points, reopen, and verify durability.
//
// The child writes through the real repository path. The parent kills it with SIGKILL
// (taskkill /F on Windows) after a per-run threshold plus jitter, then reopens the WAL
// database and checks that every acknowledged memory id is present exactly once.
//
// This tests process crashes. SQLite runs with synchronous=NORMAL in WAL mode, which does
// not promise durability across OS crashes or power loss.
import { execFileSync, spawn } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHILD = path.join(ROOT, 'scripts', 'crash-test-child.ts');
let activeChild = null;

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const RUNS = Number(argValue('--runs', '10'));
const THRESHOLD = Number(argValue('--threshold', '1000'));
const OUT = path.resolve(argValue('--out', path.join(ROOT, 'bench', 'results', 'crash-test.json')));
const KEEP = process.argv.includes('--keep');
const JITTER_MS = 100;

if (!Number.isInteger(RUNS) || RUNS < 1 || !Number.isInteger(THRESHOLD) || THRESHOLD < 1) {
  console.error('usage: node scripts/crash-test.mjs [--runs 10] [--threshold 1000] [--out path] [--keep]');
  process.exit(2);
}

const stamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), `fastr-crash-${stamp}-`));
const dbPath = path.join(tempRoot, '.fastr', 'fastr.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

function getCommit() {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function killTree(child) {
  if (!child.pid || child.exitCode !== null) return;
  try {
    if (process.platform === 'win32') {
      execFileSync('taskkill', ['/PID', String(child.pid), '/F'], { stdio: 'ignore' });
    } else {
      process.kill(child.pid, 'SIGKILL');
    }
  } catch {
    try {
      child.kill('SIGKILL');
    } catch {
      // The process may already be gone.
    }
  }
}

function waitForClose(child, timeoutMs = 5000) {
  if (child.exitCode !== null) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      killTree(child);
      reject(new Error('child did not exit after kill'));
    }, timeoutMs);
    timer.unref?.();
    child.once('close', () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

function integrityOf(db) {
  const row = db.prepare('PRAGMA integrity_check').get();
  return row?.integrity_check ?? Object.values(row ?? {})[0] ?? 'missing';
}

function runOne(runId) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--import', 'tsx', CHILD, dbPath, String(runId)], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
    activeChild = child;

    const acked = [];
    let ackCount = 0;
    let killScheduled = false;
    let stderr = '';
    const startedAt = Date.now();

    const lines = readline.createInterface({ input: child.stdout });
    lines.on('line', (line) => {
      if (!line.startsWith('ACK ')) return;
      const parts = line.split(' ');
      if (parts.length !== 4) return;
      acked.push({ id: parts[3], seq: Number(parts[2]) });
      ackCount += 1;
      if (!killScheduled && ackCount >= THRESHOLD) {
        killScheduled = true;
        setTimeout(() => killTree(child), Math.floor(Math.random() * (JITTER_MS + 1)));
      }
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.once('error', (err) => {
      lines.close();
      reject(err);
    });

    child.once('close', async (code, signal) => {
      lines.close();
      activeChild = null;
      const durationMs = Date.now() - startedAt;

      if (!killScheduled) {
        reject(new Error(`run ${runId} exited before threshold (code=${code}, signal=${signal}): ${stderr.slice(0, 500)}`));
        return;
      }

      try {
        const db = new DatabaseSync(dbPath);
        db.exec('PRAGMA busy_timeout = 5000;');
        const integrity = integrityOf(db);
        const rows = db.prepare('SELECT id, title FROM memories WHERE project_id = ?').all('crash-test');
        const ids = new Set(rows.map((row) => row.id));
        const runRows = rows.filter((row) => row.title.startsWith(`crash-${runId}-`));
        const missing = acked.filter((entry) => !ids.has(entry.id));
        const duplicateIds = db
          .prepare('SELECT id, COUNT(*) AS c FROM memories GROUP BY id HAVING c > 1')
          .all();
        const duplicateTitles = db
          .prepare('SELECT title, COUNT(*) AS c FROM memories WHERE project_id = ? GROUP BY title HAVING c > 1')
          .all('crash-test');
        db.close();

        resolve({
          run: runId,
          threshold: THRESHOLD,
          acknowledged: acked.length,
          committedRows: runRows.length,
          unackedCommitted: Math.max(0, runRows.length - acked.length),
          missing: missing.length,
          duplicateIds: duplicateIds.length,
          duplicateTitles: duplicateTitles.length,
          integrity,
          durationMs,
          killedBy: process.platform === 'win32' ? 'taskkill /F' : 'SIGKILL',
          ackedIds: acked.map((entry) => entry.id),
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

const perRun = [];
try {
  for (let runId = 1; runId <= RUNS; runId += 1) {
    const result = await runOne(runId);
    perRun.push(result);
    const status = result.missing === 0 && result.duplicateIds === 0 && result.duplicateTitles === 0 && result.integrity === 'ok';
    console.log(
      `run ${runId}/${RUNS}: acked=${result.acknowledged} committed=${result.committedRows} ` +
        `missing=${result.missing} duplicateIds=${result.duplicateIds} duplicateTitles=${result.duplicateTitles} ` +
        `integrity=${result.integrity} duration=${result.durationMs}ms ${status ? 'PASS' : 'FAIL'}`
    );
  }

  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA busy_timeout = 5000;');
  const finalIntegrity = integrityOf(db);
  const totalRows = db.prepare('SELECT COUNT(*) AS c FROM memories WHERE project_id = ?').get('crash-test').c;
  const duplicateIds = db.prepare('SELECT id, COUNT(*) AS c FROM memories GROUP BY id HAVING c > 1').all();
  const duplicateTitles = db
    .prepare('SELECT title, COUNT(*) AS c FROM memories WHERE project_id = ? GROUP BY title HAVING c > 1')
    .all('crash-test');
  db.close();

  const totalAcknowledged = perRun.reduce((sum, run) => sum + run.acknowledged, 0);
  const missing = perRun.reduce((sum, run) => sum + run.missing, 0);
  const duplicateCount = duplicateIds.length + duplicateTitles.length;
  const pass =
    perRun.length === RUNS &&
    totalAcknowledged >= RUNS * THRESHOLD &&
    missing === 0 &&
    duplicateCount === 0 &&
    finalIntegrity === 'ok';

  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    command: `node scripts/crash-test.mjs --runs ${RUNS} --threshold ${THRESHOLD}`,
    commit: getCommit(),
    platform: process.platform,
    node: process.version,
    storage: 'node:sqlite WAL, synchronous=NORMAL',
    runs: RUNS,
    thresholdPerRun: THRESHOLD,
    totalAcknowledged,
    totalRows,
    missing,
    duplicateIds: duplicateIds.length,
    duplicateTitles: duplicateTitles.length,
    integrity: finalIntegrity,
    pass,
    perRun: perRun.map(({ ackedIds, ...rest }) => rest),
    caveat:
      'SIGKILL/taskkill tests process crashes, not OS crashes or power loss; synchronous=NORMAL in WAL mode does not promise power-loss durability. Optional MiniLM embeddings are not installed.',
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`report=${path.relative(ROOT, OUT)}`);
  console.log(
    `result=${pass ? 'PASS' : 'FAIL'} acked=${totalAcknowledged} rows=${totalRows} missing=${missing} ` +
      `duplicates=${duplicateCount} integrity=${finalIntegrity}`
  );

  if (!pass) process.exitCode = 1;
} finally {
  if (activeChild) killTree(activeChild);
  if (!KEEP) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  } else {
    console.log(`kept=${tempRoot}`);
  }
}
