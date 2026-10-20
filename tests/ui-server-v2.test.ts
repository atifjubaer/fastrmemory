import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as http from 'node:http';
import { startUiServer } from '../src/ui/server.js';
import { FastrConfig } from '../src/config.js';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';

describe('FastrMemory Web UI Server v2 endpoints', () => {
  const testDir = path.join(process.cwd(), 'tests', 'temp_ui_v2_test');
  const config: FastrConfig = {
    projectId: 'proj_ui_v2',
    projectName: 'ui_v2',
    projectRoot: testDir,
    dbPath: path.join(testDir, '.fastr', 'fastr.db'),
    pagesDir: path.join(testDir, '.fastr', 'pages'),
    spoolPath: path.join(testDir, '.fastr', 'spool', 'pending.jsonl'),
  };
  let server: http.Server;
  let base: string;
  let oldId: string;
  let newId: string;
  let trapId: string;

  beforeAll(async () => {
    fs.rmSync(testDir, { recursive: true, force: true });
    fs.mkdirSync(testDir, { recursive: true });

    // Seed through a separate connection, exactly like the MCP server process would.
    const seedDb = initDatabase(config.dbPath);
    const repo = new FastrRepository(seedDb);
    const v1 = repo.insertMemory({
      projectId: config.projectId,
      module: 'auth',
      kind: 'rule',
      title: 'JWT expiry is fifteen minutes',
      content: 'Access tokens expire after 15 minutes and refresh tokens after 7 days.',
      files: ['src/auth/jwt.ts'],
      verified: true,
    });
    const { newMemory } = repo.supersedeMemory(
      v1.id,
      'JWT expiry is thirty minutes',
      'Access tokens expire after 30 minutes and refresh tokens after 7 days.',
      'Product asked for longer sessions'
    );
    oldId = v1.id;
    newId = newMemory.id;
    trapId = repo.insertMemory({
      projectId: config.projectId,
      module: 'db',
      kind: 'error_trap',
      title: 'Never run VACUUM inside a transaction',
      content: 'SQLite raises "cannot VACUUM from within a transaction".',
      files: ['src/db/schema.ts'],
      verified: true,
    }).id;
    seedDb.close();

    const started = await startUiServer(config, { port: 0, openBrowser: false });
    server = started.server;
    base = `http://127.0.0.1:${started.port}`;
  });

  afterAll(async () => {
    if (typeof (server as any).closeAllConnections === 'function') {
      (server as any).closeAllConnections();
    }
    await new Promise<void>((resolve) => server.close(() => resolve()));
    try {
      fs.rmSync(testDir, { recursive: true, force: true });
    } catch {
      // Windows may still hold the SQLite handle briefly
    }
  });

  it('never leaks binary embeddings and attaches linked files', async () => {
    const memories = await (await fetch(`${base}/api/memories`)).json();
    expect(memories.length).toBeGreaterThan(0);
    for (const m of memories) {
      expect(m.embedding).toBeUndefined();
      expect(Array.isArray(m.linked_files)).toBe(true);
    }
  });

  it('lists with facets when q is empty and searches with RRF otherwise', async () => {
    const list = await (await fetch(`${base}/api/search?kind=error_trap`)).json();
    expect(list.mode).toBe('list');
    expect(list.results.map((m: any) => m.id)).toEqual([trapId]);

    const superseded = await (await fetch(`${base}/api/search?status=superseded`)).json();
    expect(superseded.results.map((m: any) => m.id)).toContain(oldId);

    const search = await (await fetch(`${base}/api/search?q=VACUUM%20transaction`)).json();
    expect(search.mode).toBe('search');
    expect(search.results[0].id).toBe(trapId);
    expect(typeof search.results[0].score).toBe('number');

    const bad = await fetch(`${base}/api/search?kind=nope`);
    expect(bad.status).toBe(400);
  });

  it('does not present the engine fallback as search hits', async () => {
    const res = await (await fetch(`${base}/api/search?q=zzqxv%20wwyyk`)).json();
    expect(res.total).toBe(0);
  });

  it('returns a single memory with provenance and 404s for unknown ids', async () => {
    const one = await fetch(`${base}/api/memories/${newId}`);
    expect(one.status).toBe(200);
    const body = await one.json();
    expect(body.id).toBe(newId);
    expect(body.provenance).toBeDefined();
    expect(body.embedding).toBeUndefined();

    const missing = await fetch(`${base}/api/memories/mem_does_not_exist`);
    expect(missing.status).toBe(404);
  });

  it('walks the supersession chain in both directions', async () => {
    for (const id of [oldId, newId]) {
      const history = await (await fetch(`${base}/api/memories/${id}/history`)).json();
      expect(history.chain.map((m: any) => m.id)).toEqual([oldId, newId]);
      expect(history.currentIndex).toBe(id === oldId ? 0 : 1);
    }
  });

  it('replays two snapshots and returns a memory diff', async () => {
    const res = await fetch(
      `${base}/api/replay?from=2000-01-01T00%3A00%3A00.000Z&to=2100-01-01T00%3A00%3A00.000Z`
    );
    expect(res.status).toBe(200);
    const body = await res.json();

    expect(body.from.at).toBe('2000-01-01T00:00:00.000Z');
    expect(body.to.at).toBe('2100-01-01T00:00:00.000Z');
    expect(body.from.active).toHaveLength(0);
    expect(body.to.active.length).toBeGreaterThanOrEqual(2);
    expect(body.to.historyCount).toBeGreaterThanOrEqual(1);
    expect(body.diff.added.map((entry: any) => entry.id)).toEqual(expect.arrayContaining([newId, trapId]));
    expect(body.diff.superseded).toHaveLength(0);
    expect(body.diff.tokenDelta).toBeGreaterThan(0);
    expect(body.markdown).toContain('## FastrMemory diff');

    const invalid = await fetch(`${base}/api/replay?from=not-a-date`);
    expect(invalid.status).toBe(400);
    expect((await invalid.json()).error).toContain('Invalid "from" timestamp');

    const backwards = await fetch(
      `${base}/api/replay?from=2026-01-02T00%3A00%3A00.000Z&to=2026-01-01T00%3A00%3A00.000Z`
    );
    expect(backwards.status).toBe(400);
  });

  it('scopes traps to files', async () => {
    const all = await (await fetch(`${base}/api/traps`)).json();
    expect(all.traps.map((t: any) => t.id)).toContain(trapId);

    const scoped = await (await fetch(`${base}/api/traps?files=src/db/schema.ts,src/other.ts`)).json();
    expect(scoped.traps).toHaveLength(1);
    expect(scoped.traps[0].matched_files).toEqual(['src/db/schema.ts']);

    const none = await (await fetch(`${base}/api/traps?files=src/unrelated.ts`)).json();
    expect(none.traps).toHaveLength(0);
  });

  it('reports health and heals through a JSON-only POST', async () => {
    const health = await (await fetch(`${base}/api/health`)).json();
    expect(health.report).toBeDefined();
    expect(typeof health.report.healthy).toBe('boolean');
    expect(health.status.projectId).toBe(config.projectId);

    const dry = await fetch(`${base}/api/health/heal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dryRun: true }),
    });
    expect(dry.status).toBe(200);
    expect((await dry.json()).dryRun).toBe(true);

    const plain = await fetch(`${base}/api/health/heal`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: '{}',
    });
    expect(plain.status).toBe(415);
  });

  it('changes /api/version when another process writes to the database', async () => {
    const before = await (await fetch(`${base}/api/version`)).json();
    expect(typeof before.version).toBe('string');

    const otherDb = initDatabase(config.dbPath);
    new FastrRepository(otherDb).insertMemory({
      projectId: config.projectId,
      kind: 'rule',
      title: 'Written by another process',
      content: 'The MCP server writes through its own SQLite connection.',
      verified: true,
    });
    otherDb.close();

    const after = await (await fetch(`${base}/api/version`)).json();
    expect(after.version).not.toBe(before.version);
    expect(after.dataVersion).not.toBe(before.dataVersion);
  });

  it('enriches conflicts with both memories', async () => {
    const conflicts = await (await fetch(`${base}/api/conflicts`)).json();
    expect(Array.isArray(conflicts)).toBe(true);
    for (const c of conflicts) {
      expect('memory_a' in c && 'memory_b' in c).toBe(true);
    }
  });

  it('rejects cross-origin and DNS-rebinding requests on every new endpoint', async () => {
    const reads = [
      '/api/search?q=jwt',
      `/api/memories/${newId}`,
      `/api/memories/${newId}/history`,
      '/api/traps?files=src/db/schema.ts',
      '/api/replay?from=2026-01-01T00%3A00%3A00.000Z&to=2026-01-02T00%3A00%3A00.000Z',
      '/api/health',
      '/api/version',
    ];
    for (const route of reads) {
      const res = await fetch(`${base}${route}`, { headers: { Origin: 'https://evil.example' } });
      expect(res.status, route).toBe(403);
    }

    const heal = await fetch(`${base}/api/health/heal`, {
      method: 'POST',
      headers: { Origin: 'https://evil.example', 'Content-Type': 'application/json' },
      body: '{}',
    });
    expect(heal.status).toBe(403);

    const rebinding = await new Promise<number>((resolve, reject) => {
      const req = http.request(`${base}/api/version`, { headers: { Host: 'attacker.example' } }, (res) => {
        res.resume();
        resolve(res.statusCode ?? 0);
      });
      req.on('error', reject);
      req.end();
    });
    expect(rebinding).toBe(403);
  });
});
