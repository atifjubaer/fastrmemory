import { describe, it, expect, afterAll } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as http from 'node:http';
import { startUiServer } from '../src/ui/server.js';
import { FastrConfig } from '../src/config.js';

describe('FastrMemory Web UI Server', () => {
  const testDir = path.join(process.cwd(), 'tests', 'temp_ui_test');
  let serverInstance: http.Server | undefined;

  afterAll(async () => {
    if (serverInstance) {
      if (typeof (serverInstance as any).closeAllConnections === 'function') {
        (serverInstance as any).closeAllConnections();
      }
      await new Promise<void>((resolve) => serverInstance!.close(() => resolve()));
    }
    if (fs.existsSync(testDir)) {
      try {
        fs.rmSync(testDir, { recursive: true, force: true });
      } catch {
        // Safe Windows handle cleanup
      }
    }
  });

  it('boots zero-dependency http server and serves html and json api endpoints', async () => {
    fs.mkdirSync(testDir, { recursive: true });

    const config: FastrConfig = {
      projectId: 'proj_ui_test',
      projectName: 'ui_test',
      projectRoot: testDir,
      dbPath: path.join(testDir, '.fastr', 'fastr.db'),
      pagesDir: path.join(testDir, '.fastr', 'pages'),
      spoolPath: path.join(testDir, '.fastr', 'spool', 'pending.jsonl'),
    };

    const { server, port, url } = await startUiServer(config, {
      port: 0, // dynamic port for tests
      openBrowser: false,
    });
    serverInstance = server;

    expect(port).toBeGreaterThan(0);
    expect(url).toContain(`http://localhost:${port}`);

    // 1. Test HTML Dashboard (serves compiled dist-ui or fallback)
    const htmlRes = await fetch(`${url}/`);
    expect(htmlRes.status).toBe(200);
    const htmlText = await htmlRes.text();
    expect(htmlText).toContain('FastrMemory Hub');
    expect(htmlText).toContain('root');

    // 1b. Test SSE /api/stream endpoint
    const sseRes = await fetch(`${url}/api/stream`);
    expect(sseRes.status).toBe(200);
    expect(sseRes.headers.get('content-type')).toContain('text/event-stream');
    sseRes.body?.cancel();

    // 2. Test /api/status
    const statusRes = await fetch(`${url}/api/status`);
    expect(statusRes.status).toBe(200);
    const statusJson = await statusRes.json();
    expect(statusJson.projectId).toBe('proj_ui_test');
    expect(statusJson.projectRoot).toBe(testDir);
    expect(statusJson.version).toBeTruthy();
    expect(statusJson.isHomeProject).toBe(false);
    expect(statusJson.mcp.args).toContain('--project');
    expect(statusJson.mcp.args).toContain(path.resolve(testDir));
    expect(['source', 'installed', 'registry']).toContain(statusJson.mcpSource);

    // 3. Test /api/memories
    const memRes = await fetch(`${url}/api/memories`);
    expect(memRes.status).toBe(200);
    const memJson = await memRes.json();
    expect(Array.isArray(memJson)).toBe(true);

    // 4. Test /api/graph
    const graphRes = await fetch(`${url}/api/graph`);
    expect(graphRes.status).toBe(200);
    const graphJson = await graphRes.json();
    expect(graphJson.nodes).toBeDefined();
    expect(graphJson.edges).toBeDefined();

    // 5. Test /api/timeline
    const timelineRes = await fetch(`${url}/api/timeline`);
    expect(timelineRes.status).toBe(200);
    const timelineJson = await timelineRes.json();
    expect(Array.isArray(timelineJson)).toBe(true);

    // 6. Test /api/actions
    const actionsRes = await fetch(`${url}/api/actions`);
    expect(actionsRes.status).toBe(200);
    const actionsJson = await actionsRes.json();
    expect(Array.isArray(actionsJson.actions)).toBe(true);
    expect(Array.isArray(actionsJson.edges)).toBe(true);

    // 7. Test /api/conflicts
    const conflictsRes = await fetch(`${url}/api/conflicts`);
    expect(conflictsRes.status).toBe(200);
    const conflictsJson = await conflictsRes.json();
    expect(Array.isArray(conflictsJson)).toBe(true);
  });

  it('serves rich Action DAG dependencies and conflicts over REST API', async () => {
    const config: FastrConfig = {
      projectId: 'proj_ui_test',
      projectName: 'ui_test',
      projectRoot: testDir,
      dbPath: path.join(testDir, '.fastr', 'fastr.db'),
      pagesDir: path.join(testDir, '.fastr', 'pages'),
      spoolPath: path.join(testDir, '.fastr', 'spool', 'pending.jsonl'),
    };

    // Open db connection to inject actions
    const { initDatabase } = await import('../src/db/schema.js');
    const { FastrRepository } = await import('../src/db/repository.js');
    const { SpoolManager } = await import('../src/db/spool.js');
    const db = initDatabase(config.dbPath);
    const repo = new FastrRepository(db, new SpoolManager(config.spoolPath));

    const taskA = repo.createAction({
      projectId: config.projectId,
      title: 'Prerequisite Task A',
      priority: 2,
    });
    const taskB = repo.createAction({
      projectId: config.projectId,
      title: 'Dependent Task B',
      priority: 1,
      requires: [taskA.id],
    });

    const actionsRes = await fetch(`http://localhost:${(serverInstance!.address() as any).port}/api/actions`);
    expect(actionsRes.status).toBe(200);
    const actionsJson = await actionsRes.json();
    expect(actionsJson.actions.length).toBeGreaterThanOrEqual(2);
    
    const itemA = actionsJson.actions.find((a: any) => a.id === taskA.id);
    const itemB = actionsJson.actions.find((a: any) => a.id === taskB.id);
    expect(itemA.isFrontier).toBe(true);
    expect(itemB.isFrontier).toBe(false);
    expect(itemB.requires).toContain(taskA.id);

    // Test POST /api/conflicts/resolve endpoint
    const mem1 = repo.insertMemory({
      projectId: config.projectId,
      title: 'Always use tabs',
      content: 'Always use tabs for indentation across all files.',
      module: 'formatting',
    });
    const mem2 = repo.insertMemory({
      projectId: config.projectId,
      title: 'Never use tabs, use spaces',
      content: 'Never use tabs, use spaces for indentation.',
      module: 'formatting',
    });

    const conflicts = repo.listConflicts(config.projectId, 'open');
    expect(conflicts.length).toBeGreaterThan(0);
    const targetConflict = conflicts[0];

    const resolveRes = await fetch(`http://localhost:${(serverInstance!.address() as any).port}/api/conflicts/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conflictId: targetConflict.id,
        keepMemoryId: mem1.id,
        forgetLoser: true,
      }),
    });

    expect(resolveRes.status).toBe(200);
    const resolveJson = await resolveRes.json();
    expect(resolveJson.success).toBe(true);
    expect(resolveJson.keptId).toBe(mem1.id);

    const updatedConflicts = repo.listConflicts(config.projectId, 'open');
    expect(updatedConflicts.find(c => c.id === targetConflict.id)).toBeUndefined();

    // Test POST /api/memories (Create)
    const createRes = await fetch(`http://localhost:${(serverInstance!.address() as any).port}/api/memories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Production Verification Rule',
        content: 'Ensure all tests pass before deploying.',
        module: 'deploy',
        kind: 'rule',
        files: ['deploy.sh'],
      }),
    });
    expect(createRes.status).toBe(201);
    const createdMemory = await createRes.json();
    expect(createdMemory.id).toBeDefined();
    expect(createdMemory.title).toBe('Production Verification Rule');

    // Test POST /api/memories/pin
    const pinRes = await fetch(`http://localhost:${(serverInstance!.address() as any).port}/api/memories/pin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memoryId: createdMemory.id,
        pinned: true,
      }),
    });
    expect(pinRes.status).toBe(200);
    const pinJson = await pinRes.json();
    expect(pinJson.success).toBe(true);
    expect(pinJson.pinned).toBe(true);

    // Test GET /api/search/explain
    const explainRes = await fetch(`http://localhost:${(serverInstance!.address() as any).port}/api/search/explain?q=deploy`);
    expect(explainRes.status).toBe(200);
    const explainJson = await explainRes.json();
    expect(explainJson.query).toBe('deploy');
    expect(typeof explainJson.totalTimeMs).toBe('number');
    expect(Array.isArray(explainJson.results)).toBe(true);

    // Test POST /api/memories/forget
    const forgetRes = await fetch(`http://localhost:${(serverInstance!.address() as any).port}/api/memories/forget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memoryId: createdMemory.id,
        reason: 'Superseded in test',
      }),
    });
    expect(forgetRes.status).toBe(200);
    const forgetJson = await forgetRes.json();
    expect(forgetJson.success).toBe(true);

    db.close();
  });
});
