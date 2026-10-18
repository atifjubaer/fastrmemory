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
      fs.rmSync(testDir, { recursive: true, force: true });
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
  });
});
