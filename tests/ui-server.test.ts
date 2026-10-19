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

    // 1. Test HTML Dashboard
    const htmlRes = await fetch(`${url}/`);
    expect(htmlRes.status).toBe(200);
    const htmlText = await htmlRes.text();
    expect(htmlText).toContain('FastrMemory Hub');
    expect(htmlText).toContain('proj_ui_test');

    // 2. Test /api/status
    const statusRes = await fetch(`${url}/api/status`);
    expect(statusRes.status).toBe(200);
    const statusJson = await statusRes.json();
    expect(statusJson.projectId).toBe('proj_ui_test');

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
    expect(typeof actionsJson.frontierCount).toBe('number');

    // 7. Test /api/entities
    const entitiesRes = await fetch(`${url}/api/entities`);
    expect(entitiesRes.status).toBe(200);
    const entitiesJson = await entitiesRes.json();
    expect(Array.isArray(entitiesJson.entities)).toBe(true);
    expect(Array.isArray(entitiesJson.edges)).toBe(true);

    // 8. Test /api/conflicts
    const conflictsRes = await fetch(`${url}/api/conflicts`);
    expect(conflictsRes.status).toBe(200);
    const conflictsJson = await conflictsRes.json();
    expect(Array.isArray(conflictsJson)).toBe(true);

    // 9. Test HTML contains Visual Graph & Action DAG modal
    expect(htmlText).toContain('Visual Graph & DAG');
    expect(htmlText).toContain('action-modal-overlay');
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

    db.close();
  });
});
