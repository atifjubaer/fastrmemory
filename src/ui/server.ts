import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { FastrConfig } from '../config.js';
import { initDatabase } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { globalBroadcaster } from './sse.js';

export interface UiServerOptions {
  port?: number;
  openBrowser?: boolean;
}

export function startUiServer(config: FastrConfig, options: UiServerOptions = {}): Promise<{ server: http.Server; port: number; url: string }> {
  const preferredPort = options.port !== undefined ? options.port : 4242;
  const shouldOpen = options.openBrowser ?? true;

  const db = initDatabase(config.dbPath);
  const spool = new SpoolManager(config.spoolPath);
  const repo = new FastrRepository(db, spool);

  return new Promise((resolve, reject) => {
    let resolved = false;

    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

      // Enable CORS for local dev
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Connection', 'close');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      // API: Status & Metadata
      if (url.pathname === '/api/status') {
        const status = repo.getStatus(config.projectId);
        const traps = repo.listTraps(config.projectId);
        const memories = repo.listActiveMemories(config.projectId);
        const modules = Array.from(new Set(memories.map((m) => m.module))).sort();
        const graph = repo.queryGraph(config.projectId);
        const actions = repo.listActions(config.projectId);
        const frontier = repo.getFrontier(config.projectId);
        const conflicts = repo.listConflicts(config.projectId, 'open');
        const entities = repo.getEntities(config.projectId);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          projectId: config.projectId,
          projectName: config.projectName,
          dbPath: config.dbPath,
          status,
          trapsCount: traps.length,
          activeCount: memories.length,
          modulesCount: modules.length,
          modules,
          graphNodesCount: graph.nodes.length,
          graphEdgesCount: graph.edges.length,
          actionsCount: actions.length,
          frontierCount: frontier.length,
          conflictsCount: conflicts.length,
          entitiesCount: entities.length,
          spoolPending: spool.hasPending(),
        }));
        return;
      }

      // API: Memories List / Search with Kind & Module Filters
      if (url.pathname === '/api/memories') {
        const targetModule = url.searchParams.get('module') || undefined;
        const targetKind = url.searchParams.get('kind') || undefined;
        const query = url.searchParams.get('q') || '';
        let memories = repo.listActiveMemories(config.projectId, targetModule);

        if (targetKind) {
          memories = memories.filter((m) => m.kind === targetKind);
        }

        if (query) {
          const qLower = query.toLowerCase();
          memories = memories.filter((m) =>
            m.title.toLowerCase().includes(qLower) ||
            m.content.toLowerCase().includes(qLower) ||
            m.module.toLowerCase().includes(qLower) ||
            m.id.toLowerCase().includes(qLower)
          );
        }

        const enhanced = memories.map((m) => {
          const fileLinks = db.prepare('SELECT file_path FROM file_links WHERE memory_id = ?').all(m.id) as { file_path: string }[];
          return {
            ...m,
            linked_files: fileLinks.map((f) => f.file_path),
          };
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(enhanced));
        return;
      }

      // API: Graph (Nodes & Edges with Traversal)
      if (url.pathname === '/api/graph') {
        const startFile = url.searchParams.get('file') || undefined;
        const depth = parseInt(url.searchParams.get('depth') || '2', 10);
        const graph = repo.queryGraph(config.projectId, { startFilePath: startFile, depth });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(graph));
        return;
      }

      // API: Timeline Audit Trail
      if (url.pathname === '/api/timeline') {
        const targetModule = url.searchParams.get('module') || undefined;
        const limit = parseInt(url.searchParams.get('limit') || '50', 10);
        const timeline = repo.getTimeline(config.projectId, { module: targetModule, limit });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(timeline));
        return;
      }

      // API: Action DAG Nodes & Dependencies
      if (url.pathname === '/api/actions') {
        const actions = repo.listActions(config.projectId);
        const frontier = repo.getFrontier(config.projectId);
        const frontierIds = new Set(frontier.map((a) => a.id));
        const enriched = actions.map((a) => {
          const detail = repo.getAction(a.id);
          return {
            ...a,
            isFrontier: frontierIds.has(a.id),
            requires: detail?.requires ?? [],
            unlocks: detail?.unlocks ?? [],
            conflictsWith: detail?.conflictsWith ?? [],
          };
        });
        const edges = db.prepare('SELECT source_action_id, target_action_id, edge_type FROM action_edges').all() as Array<{ source_action_id: string; target_action_id: string; edge_type: string }>;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          actions: enriched,
          edges,
          frontierCount: frontier.length,
          totalCount: actions.length,
        }));
        return;
      }

      // API: Entities & Knowledge Relations
      if (url.pathname === '/api/entities') {
        const entities = repo.getEntities(config.projectId);
        const edges = db.prepare(`
          SELECT source_id, target_id, edge_type FROM graph_edges WHERE project_id = ? AND edge_type = 'entity_link'
        `).all(config.projectId) as any[];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ entities, edges, count: entities.length }));
        return;
      }

      // API: Memory Conflicts
      if (url.pathname === '/api/conflicts') {
        const conflicts = repo.listConflicts(config.projectId, 'open');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(conflicts));
        return;
      }

      // API: Resolve Memory Conflict
      if (req.method === 'POST' && url.pathname === '/api/conflicts/resolve') {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const conflictId = Number(data.conflictId);
            const keepMemoryId = String(data.keepMemoryId);
            const forgetLoser = Boolean(data.forgetLoser);
            const reason = data.reason ? String(data.reason) : undefined;

            const result = repo.resolveConflict(conflictId, keepMemoryId, forgetLoser, reason);
            globalBroadcaster.broadcast('conflict_resolved', result);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'Failed to resolve conflict' }));
          }
        });
        return;
      }

      // API: Server-Sent Events (SSE) Stream
      if (url.pathname === '/api/stream') {
        globalBroadcaster.addClient(res);
        return;
      }

      // Static File Serving (from precompiled dist-ui if present)
      const distDir = getDistUiDir();
      if (distDir && fs.existsSync(path.join(distDir, 'index.html'))) {
        const reqPath = url.pathname === '/' ? '/index.html' : url.pathname;
        const filePath = path.join(distDir, reqPath);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        // SPA fallback for non-API routes
        if (!url.pathname.startsWith('/api')) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
          return;
        }
      }

      // Fallback UI Single-Page Dashboard (inline template)
      if (url.pathname === '/' || url.pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderDashboardHtml(config.projectId, config.projectName));
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    });

    server.on('listening', () => {
      if (!resolved) {
        resolved = true;
        const actualPort = (server.address() as any).port;
        const appUrl = `http://localhost:${actualPort}`;
        if (shouldOpen) {
          const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
          exec(`${startCmd} ${appUrl}`);
        }
        resolve({ server, port: actualPort, url: appUrl });
      }
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        server.listen(0);
      } else {
        reject(err);
      }
    });

    server.on('close', () => {
      try {
        globalBroadcaster.close();
      } catch {}
      try {
        db.close();
      } catch {
        // Already closed
      }
    });

    server.listen(preferredPort);
  });
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

function getDistUiDir(): string | null {
  try {
    const base = path.dirname(fileURLToPath(import.meta.url));
    const candidates = [
      path.resolve(base, '..', '..', 'dist-ui'),
      path.resolve(base, '..', 'dist-ui'),
      path.resolve(process.cwd(), 'dist-ui'),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        return c;
      }
    }
  } catch {}
  return null;
}

function renderDashboardHtml(projectId: string, projectName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⚡ FastrMemory Hub &bull; ${projectName}</title>
  <style>
    :root {
      --bg: #090d16;
      --surface: #111827;
      --card: #1f2937;
      --border: #374151;
      --text: #f9fafb;
      --text-muted: #9ca3af;
      --primary: #3b82f6;
      --emerald: #10b981;
      --amber: #f59e0b;
      --purple: #8b5cf6;
      --rose: #f43f5e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.4px;
    }
    .brand span { color: var(--primary); }
    .live-dot {
      width: 8px;
      height: 8px;
      background: var(--emerald);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--emerald);
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    
    .nav-tabs {
      display: flex;
      gap: 4px;
      background: var(--bg);
      padding: 4px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .tab-btn:hover { color: var(--text); background: rgba(255, 255, 255, 0.05); }
    .tab-btn.active { color: #fff; background: var(--card); border: 1px solid var(--border); }
    .badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-rule { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .badge-trap { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-decision { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
    .badge-file { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }

    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
      padding: 18px 24px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
    }
    .stat-card {
      background: var(--card);
      border: 1px solid var(--border);
      padding: 12px 18px;
      border-radius: 8px;
    }
    .stat-val { font-size: 24px; font-weight: 700; color: #fff; }
    .stat-lbl { font-size: 11px; color: var(--text-muted); text-transform: uppercase; margin-top: 3px; font-weight: 600; }

    main {
      padding: 24px;
      flex: 1;
      max-width: 1440px;
      margin: 0 auto;
      width: 100%;
    }
    .tab-content { display: none; }
    .tab-content.active { display: block; }

    .search-row {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .search-input {
      flex: 1;
      min-width: 280px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 11px 16px;
      color: var(--text);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus { border-color: var(--primary); }

    .filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .pill {
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.15s;
    }
    .pill:hover { color: #fff; }
    .pill.active { background: var(--primary); color: #fff; border-color: var(--primary); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
    }
    .card:hover { transform: translateY(-2px); border-color: #6b7280; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); }
    .card-trap { border-left: 4px solid var(--amber); }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .card-title { font-size: 15px; font-weight: 600; color: #fff; line-height: 1.4; }
    .card-content {
      font-size: 13px;
      line-height: 1.5;
      color: #d1d5db;
      background: var(--card);
      padding: 10px 12px;
      border-radius: 6px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      max-height: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: var(--text-muted);
      margin-top: auto;
    }
    .files-list { display: flex; flex-wrap: wrap; gap: 4px; }
    .file-tag {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      color: #93c5fd;
    }

    /* Interactive Graph Canvas View */
    #graph-container {
      position: relative;
      width: 100%;
      height: 650px;
      background: #06090e;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    #graph-canvas {
      width: 100%;
      height: 100%;
      cursor: grab;
    }
    #graph-canvas:active { cursor: grabbing; }
    .graph-controls {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: flex;
      gap: 8px;
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(8px);
      padding: 6px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .graph-btn {
      background: var(--card);
      border: 1px solid var(--border);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
    }
    .graph-btn:hover { background: #374151; }
    .graph-legend {
      position: absolute;
      top: 16px;
      left: 16px;
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(8px);
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-size: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .legend-item { display: flex; align-items: center; gap: 8px; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; }

    /* Modal Drawer */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }
    .modal-overlay.active { display: flex; }
    .modal-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      width: 90%;
      max-width: 700px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-body {
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .modal-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 20px;
      cursor: pointer;
    }
    .modal-close:hover { color: #fff; }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <div class="live-dot"></div>
      <span>⚡ FastrMemory</span> Hub
    </div>
    
    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchTab('overview')">📊 Overview</button>
      <button class="tab-btn" onclick="switchTab('memories')">🧠 Memories (<span id="tab-cnt-mem">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('traps')">⚠️ Traps (<span id="tab-cnt-traps">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('graph')">🕸️ Visual Graph & DAG</button>
      <button class="tab-btn" onclick="switchTab('actions')">🔀 Actions & Frontier (<span id="tab-cnt-actions">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('conflicts')">⚔️ Conflicts (<span id="tab-cnt-conflicts">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('timeline')">⏱️ Timeline</button>
    </div>

    <div style="font-size: 12px; color: var(--text-muted);">
      Node 24 WAL &bull; <code style="color: #60a5fa;">${projectId}</code>
    </div>
  </header>

  <section class="stats-bar">
    <div class="stat-card">
      <div class="stat-val" id="stat-active">0</div>
      <div class="stat-lbl">Active Rules</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-traps" style="color: #fbbf24;">0</div>
      <div class="stat-lbl">Error Traps (2.0x Boost)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-frontier" style="color: #f59e0b;">0</div>
      <div class="stat-lbl">Unblocked Frontier Tasks</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-graph-nodes" style="color: #38bdf8;">0</div>
      <div class="stat-lbl">Knowledge Nodes</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-conflicts" style="color: #f43f5e;">0</div>
      <div class="stat-lbl">Open Contradictions</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" id="stat-spool" style="color: #34d399;">Clear</div>
      <div class="stat-lbl">Offline Spool Queue</div>
    </div>
  </section>

  <main>
    <!-- TAB 1: OVERVIEW -->
    <div id="tab-overview" class="tab-content active">
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px;">
          <h2 style="font-size: 18px; margin-bottom: 12px;">Cognitive Memory Architecture</h2>
          <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            FastrMemory runs natively inside Node 24 with <b>zero background daemons</b>. Rules, error traps, and decisions are indexed via SQLite WAL mode, mirrored to <code>.fastr/pages/*.md</code> for Git diffs, and fused using Triple-Stream RRF ($k=60$) across full-text, local vectors, and code file graphs.
          </p>
          <div style="display: flex; gap: 10px;">
            <button class="pill active" onclick="switchTab('traps')">Inspect 2.0x Error Traps &rarr;</button>
            <button class="pill" onclick="switchTab('graph')">Open Knowledge Graph &rarr;</button>
          </div>
        </div>

        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px;">
          <h3 style="font-size: 15px; margin-bottom: 12px;">Quick CLI Shortcuts</h3>
          <ul style="color: var(--text-muted); font-size: 13px; line-height: 2; list-style: none;">
            <li><code>fastrmemory status</code> &bull; Health overview</li>
            <li><code>fastrmemory bench</code> &bull; Run Hit@5 benchmarks</li>
            <li><code>fastrmemory recall &lt;q&gt;</code> &bull; Triple-stream search</li>
            <li><code>fastrmemory remember &lt;t&gt;</code> &bull; Save verified rule</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- TAB 2: ALL MEMORIES -->
    <div id="tab-memories" class="tab-content">
      <div class="search-row">
        <input type="text" id="search-input" class="search-input" placeholder="Instant search by keyword, file path, concept, or [mem_id]..." />
      </div>
      <div class="filter-pills" id="module-pills">
        <button class="pill active" onclick="filterByModule('all')">All Modules</button>
      </div>
      <div class="grid" id="memories-grid"></div>
    </div>

    <!-- TAB 3: ERROR TRAPS -->
    <div id="tab-traps" class="tab-content">
      <div style="margin-bottom: 16px; color: var(--text-muted); font-size: 13px;">
        Error traps automatically receive a <b>2.0x boost</b> during recall to prevent AI agents from repeating known bugs.
      </div>
      <div class="grid" id="traps-grid"></div>
    </div>

    <!-- TAB 4: VISUAL GRAPH & ACTION DAG -->
    <div id="tab-graph" class="tab-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; gap: 8px;">
          <button id="btn-mode-knowledge" class="pill active" onclick="switchGraphMode('knowledge')">🕸️ Knowledge Graph</button>
          <button id="btn-mode-actions" class="pill" onclick="switchGraphMode('actions')">🔀 Action DAG & Frontier</button>
        </div>
        <div id="graph-mode-desc" style="color: var(--text-muted); font-size: 13px;">
          Visualizing semantic memory nodes, error traps (2.0x boost), code files, and extracted entities.
        </div>
      </div>
      <div id="graph-container">
        <div class="graph-legend" id="graph-legend">
          <div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Code File Node</div>
          <div class="legend-item"><div class="legend-dot" style="background: #fbbf24;"></div> Error Trap [TRAP] (2.0x)</div>
          <div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Verified Rule</div>
          <div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div> Architecture Decision</div>
          <div class="legend-item"><div class="legend-dot" style="background: #ec4899;"></div> Entity Link</div>
        </div>
        <div class="graph-controls">
          <button class="graph-btn" onclick="zoomGraph(1.2)">Zoom +</button>
          <button class="graph-btn" onclick="zoomGraph(0.8)">Zoom -</button>
          <button class="graph-btn" onclick="resetGraphZoom()">Reset View</button>
          <button class="graph-btn" onclick="toggleGraphPhysics()">Pause/Play Physics</button>
        </div>
        <canvas id="graph-canvas"></canvas>
      </div>
    </div>

    <!-- TAB 5: ACTIONS & FRONTIER -->
    <div id="tab-actions" class="tab-content">
      <div style="margin-bottom: 16px; color: var(--text-muted); font-size: 13px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span>Multi-Agent Action DAG ensures zero task duplicate collisions and enforces topological execution order.</span>
        <button class="pill active" onclick="switchTab('graph'); switchGraphMode('actions');">Inspect in Visual DAG &rarr;</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #f59e0b; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>⚡ Ready Frontier</span>
            <span id="col-cnt-frontier" class="badge badge-trap">0</span>
          </h3>
          <div id="list-frontier" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #3b82f6; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>🔨 Active / In Progress</span>
            <span id="col-cnt-active" class="badge badge-rule">0</span>
          </h3>
          <div id="list-active" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>⏳ Blocked (Prereqs)</span>
            <span id="col-cnt-blocked" class="badge" style="background: rgba(156, 163, 175, 0.2); color: #9ca3af;">0</span>
          </h3>
          <div id="list-blocked" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #10b981; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <span>✅ Completed</span>
            <span id="col-cnt-done" class="badge badge-file">0</span>
          </h3>
          <div id="list-done" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
      </div>
    </div>

    <!-- TAB 6: CONFLICTS -->
    <div id="tab-conflicts" class="tab-content">
      <div style="margin-bottom: 16px; color: var(--text-muted); font-size: 13px;">
        FastrMemory proactively detects contradictions between newly proposed facts and existing rules before they confuse autonomous coding agents.
      </div>
      <div id="conflicts-list" style="display: flex; flex-direction: column; gap: 14px;"></div>
    </div>

    <!-- TAB 7: TIMELINE -->
    <div id="tab-timeline" class="tab-content">
      <div id="timeline-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
    </div>
  </main>

  <!-- DETAIL MODAL: MEMORY -->
  <div class="modal-overlay" id="modal-overlay" onclick="closeModal(event)">
    <div class="modal-card" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div id="modal-title" style="font-weight: 700; font-size: 16px;"></div>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 8px;" id="modal-badges"></div>
        <div style="font-size: 13px; color: var(--text-muted);">
          <b>ID:</b> <code id="modal-id" style="color: #60a5fa;"></code> &bull; 
          <b>Module:</b> <span id="modal-module"></span> &bull; 
          <b>Score:</b> <span id="modal-score"></span>
        </div>
        <div style="font-size: 13px; color: var(--text-muted);" id="modal-files-row"></div>
        <pre id="modal-content" style="background: var(--card); padding: 14px; border-radius: 8px; font-family: monospace; font-size: 13px; white-space: pre-wrap; line-height: 1.6;"></pre>
      </div>
    </div>
  </div>

  <!-- DETAIL MODAL: ACTION -->
  <div class="modal-overlay" id="action-modal-overlay" onclick="closeActionModal(event)">
    <div class="modal-card" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div id="act-modal-title" style="font-weight: 700; font-size: 16px;"></div>
        <button class="modal-close" onclick="closeActionModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 8px;" id="act-modal-badges"></div>
        <div style="font-size: 13px; color: var(--text-muted);">
          <b>Action ID:</b> <code id="act-modal-id" style="color: #60a5fa;"></code> &bull; 
          <b>Priority:</b> <span id="act-modal-priority"></span> &bull; 
          <b>Assigned To:</b> <span id="act-modal-agent"></span>
        </div>
        <div style="font-size: 13px; color: var(--text-muted);" id="act-modal-reqs"></div>
        <div style="font-size: 13px; color: var(--text-muted);" id="act-modal-unlocks"></div>
        <div style="font-size: 13px; color: var(--text-muted);" id="act-modal-conflicts"></div>
        <div style="font-size: 13px; color: var(--text-muted);"><b>Description:</b></div>
        <pre id="act-modal-desc" style="background: var(--card); padding: 14px; border-radius: 8px; font-family: monospace; font-size: 13px; white-space: pre-wrap; line-height: 1.6;"></pre>
      </div>
    </div>
  </div>

  <script>
    let currentTab = 'overview';
    let allMemories = [];
    let currentModule = 'all';
    let graphMode = 'knowledge'; // 'knowledge' | 'actions'
    let graphData = { nodes: [], edges: [] };
    let allActionsData = { actions: [], edges: [], frontierCount: 0 };
    let graphSimulationRunning = true;

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function switchTab(tabId) {
      currentTab = tabId;
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      
      const targetBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick')?.includes(tabId));
      if (targetBtn) targetBtn.classList.add('active');
      
      const targetContent = document.getElementById('tab-' + tabId);
      if (targetContent) targetContent.classList.add('active');

      if (tabId === 'graph') {
        initGraphCanvas();
      } else if (tabId === 'actions') {
        loadActionsBoard();
      } else if (tabId === 'conflicts') {
        loadConflictsList();
      } else if (tabId === 'timeline') {
        loadTimeline();
      }
    }

    async function loadStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        document.getElementById('stat-active').textContent = data.activeCount ?? 0;
        document.getElementById('stat-traps').textContent = data.trapsCount ?? 0;
        document.getElementById('stat-frontier').textContent = data.frontierCount ?? 0;
        document.getElementById('stat-graph-nodes').textContent = data.graphNodesCount ?? 0;
        document.getElementById('stat-conflicts').textContent = data.conflictsCount ?? 0;
        document.getElementById('stat-spool').textContent = data.spoolPending ? 'Pending' : 'Clear (0)';
        
        document.getElementById('tab-cnt-mem').textContent = data.activeCount ?? 0;
        document.getElementById('tab-cnt-traps').textContent = data.trapsCount ?? 0;
        document.getElementById('tab-cnt-actions').textContent = data.actionsCount ?? 0;
        document.getElementById('tab-cnt-conflicts').textContent = data.conflictsCount ?? 0;

        // Populate module filter pills
        const pillsContainer = document.getElementById('module-pills');
        if (pillsContainer) {
          pillsContainer.innerHTML = '<button class="pill active" onclick="filterByModule(\'all\')">All Modules</button>' +
            (data.modules || []).map(m => '<button class="pill" onclick="filterByModule(\'' + m + '\')">' + m + '</button>').join('');
        }
      } catch (err) {
        console.error('Failed to load status', err);
      }
    }

    async function loadMemories(query = '') {
      try {
        let url = '/api/memories?q=' + encodeURIComponent(query);
        if (currentModule !== 'all') {
          url += '&module=' + encodeURIComponent(currentModule);
        }
        const res = await fetch(url);
        allMemories = await res.json();

        renderMemoriesGrid(allMemories, 'memories-grid');
        
        // Also populate traps tab
        const traps = allMemories.filter(m => m.kind === 'error_trap');
        renderMemoriesGrid(traps, 'traps-grid');
      } catch (err) {
        console.error('Failed to load memories', err);
      }
    }

    function filterByModule(mod) {
      currentModule = mod;
      document.querySelectorAll('#module-pills .pill').forEach(p => p.classList.remove('active'));
      const activePill = Array.from(document.querySelectorAll('#module-pills .pill')).find(p => p.textContent === mod || (mod === 'all' && p.textContent === 'All Modules'));
      if (activePill) activePill.classList.add('active');
      loadMemories(document.getElementById('search-input')?.value || '');
    }

    function renderMemoriesGrid(memories, containerId) {
      const grid = document.getElementById(containerId);
      if (!grid) return;

      if (memories.length === 0) {
        grid.innerHTML = '<div style="color: var(--text-muted); padding: 40px; text-align: center; grid-column: 1 / -1;">No memories match your query.</div>';
        return;
      }

      grid.innerHTML = memories.map(m => {
        const isTrap = m.kind === 'error_trap';
        const kindBadge = isTrap
          ? '<span class="badge badge-trap">[TRAP]</span>'
          : m.kind === 'decision'
          ? '<span class="badge badge-decision">[DECISION]</span>'
          : '<span class="badge badge-rule">[RULE]</span>';

        const filesHtml = (m.linked_files && m.linked_files.length > 0)
          ? '<div class="files-list">' + m.linked_files.map(f => '<span class="file-tag">' + escapeHtml(f) + '</span>').join('') + '</div>'
          : '<span style="color: var(--text-muted);">No linked files</span>';

        return '<div class="card ' + (isTrap ? 'card-trap' : '') + '" onclick="openMemoryModal(\'' + m.id + '\')">' +
          '<div class="card-header">' +
            '<div>' +
              '<div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">[' + m.id + '] &bull; ' + escapeHtml(m.module) + '</div>' +
              '<div class="card-title">' + escapeHtml(m.title) + '</div>' +
            '</div>' +
            kindBadge +
          '</div>' +
          '<div class="card-content">' + escapeHtml(m.content) + '</div>' +
          '<div class="card-footer">' +
            filesHtml +
            '<span>Score: ' + m.reward_score + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    async function loadTimeline() {
      try {
        const res = await fetch('/api/timeline?limit=50');
        const items = await res.json();
        const list = document.getElementById('timeline-list');
        if (!list) return;
        
        list.innerHTML = items.map(item => {
          const isSuperseded = item.status === 'superseded';
          const badgeClass = item.kind === 'error_trap' ? 'badge-trap' : 'badge-rule';
          return '<div style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">' +
            '<div>' +
              '<div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">' +
                '<span class="badge ' + badgeClass + '">[' + item.kind.toUpperCase() + ']</span>' +
                '<span style="font-size: 11px; color: var(--text-muted);">' + item.createdAt + '</span>' +
                (isSuperseded ? '<span style="font-size: 10px; color: #f87171; border: 1px solid rgba(248,113,113,0.3); padding: 1px 5px; border-radius: 4px;">SUPERSEDED</span>' : '') +
              '</div>' +
              '<div style="font-weight: 600; font-size: 14px;">' + escapeHtml(item.title) + '</div>' +
              '<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Files: ' + (item.linkedFiles.map(escapeHtml).join(', ') || 'None') + '</div>' +
            '</div>' +
            '<div style="font-size: 12px; color: #60a5fa;">Score: ' + item.rewardScore + '</div>' +
          '</div>';
        }).join('');
      } catch (err) {
        console.error('Failed to load timeline', err);
      }
    }

    async function loadActionsBoard() {
      try {
        const res = await fetch('/api/actions');
        allActionsData = await res.json();
        
        const frontier = allActionsData.actions.filter(a => a.isFrontier);
        const active = allActionsData.actions.filter(a => a.status === 'active');
        const blocked = allActionsData.actions.filter(a => a.status === 'blocked' || (a.status === 'pending' && !a.isFrontier));
        const done = allActionsData.actions.filter(a => a.status === 'done');

        document.getElementById('col-cnt-frontier').textContent = frontier.length;
        document.getElementById('col-cnt-active').textContent = active.length;
        document.getElementById('col-cnt-blocked').textContent = blocked.length;
        document.getElementById('col-cnt-done').textContent = done.length;

        renderActionList(frontier, 'list-frontier', 'frontier');
        renderActionList(active, 'list-active', 'active');
        renderActionList(blocked, 'list-blocked', 'blocked');
        renderActionList(done, 'list-done', 'done');
      } catch (err) {
        console.error('Failed to load actions board', err);
      }
    }

    function renderActionList(items, containerId, category) {
      const container = document.getElementById(containerId);
      if (!container) return;
      if (items.length === 0) {
        container.innerHTML = '<div style="color: var(--text-muted); font-size: 12px; padding: 16px; border: 1px dashed var(--border); border-radius: 8px; text-align: center;">Empty</div>';
        return;
      }
      container.innerHTML = items.map(function(a) {
        var borderCol = category === 'frontier' ? '#f59e0b' : category === 'active' ? '#3b82f6' : category === 'done' ? '#10b981' : '#6b7280';
        var assignHtml = a.assigned_to ? '<span>&bull; ' + escapeHtml(a.assigned_to) + '</span>' : '<span style="color: #34d399;">&bull; Unassigned</span>';
        var reqHtml = (a.requires && a.requires.length > 0) ? '<span style="color: #94a3b8;">&bull; Req: ' + a.requires.length + '</span>' : '';
        return '<div class="card" onclick="openActionModal(\'' + a.id + '\')" style="padding: 12px; border-left: 3px solid ' + borderCol + ';">' +
          '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">' +
            '<div style="font-size: 13px; font-weight: 600; color: #fff;">' + escapeHtml(a.title) + '</div>' +
            '<span class="badge" style="background: rgba(255,255,255,0.08); color: #cbd5e1;">P' + a.priority + '</span>' +
          '</div>' +
          '<div style="font-size: 11px; color: var(--text-muted); display: flex; gap: 8px; align-items: center; margin-top: 4px;">' +
            '<code>' + a.id + '</code>' +
            assignHtml +
            reqHtml +
          '</div>' +
        '</div>';
      }).join('');
    }

    async function resolveConflictAction(conflictId, keepMemoryId, forgetLoser) {
      try {
        const res = await fetch('/api/conflicts/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conflictId, keepMemoryId, forgetLoser, reason: 'Resolved via FastrMemory Hub' })
        });
        if (!res.ok) {
          const err = await res.json();
          alert('Failed to resolve: ' + (err.error || 'Unknown error'));
          return;
        }
        await loadConflictsList();
        await loadStatus();
      } catch (err) {
        alert('Resolution request failed: ' + err.message);
      }
    }

    async function loadConflictsList() {
      try {
        const res = await fetch('/api/conflicts');
        const conflicts = await res.json();
        const container = document.getElementById('conflicts-list');
        if (!container) return;
        if (conflicts.length === 0) {
          container.innerHTML = '<div style="color: #34d399; padding: 40px; text-align: center; background: var(--surface); border: 1px solid var(--border); border-radius: 10px;">✨ Zero open contradictions detected. All knowledge rules are consistent!</div>';
          return;
        }
        container.innerHTML = conflicts.map(function(c) {
          var scorePct = (c.score * 100).toFixed(0);
          return '<div class="card" style="border-left: 4px solid var(--rose); padding: 18px;">' +
            '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">' +
              '<span class="badge" style="background: rgba(244, 63, 94, 0.2); color: #fb7185;">Contradiction (' + scorePct + '% Conflict Score)</span>' +
              '<span style="font-size: 11px; color: var(--text-muted);">' + c.created_at + '</span>' +
            '</div>' +
            '<div style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">' + escapeHtml(c.reason) + '</div>' +
            '<div style="font-size: 12px; color: var(--text-muted); font-family: monospace; margin-bottom: 12px;">' +
              'Memory A: <code style="color: #60a5fa;">' + c.memory_a_id + '</code> vs Memory B: <code style="color: #f43f5e;">' + c.memory_b_id + '</code>' +
            '</div>' +
            '<div style="display: flex; gap: 8px; flex-wrap: wrap;">' +
              '<button class="pill" style="background: rgba(59, 130, 246, 0.15); border-color: #3b82f6; color: #93c5fd; font-size: 11px; padding: 4px 10px;" onclick="resolveConflictAction(' + c.id + ', \'' + c.memory_a_id + '\', true)">Keep ' + c.memory_a_id + ' (Deprecate B)</button>' +
              '<button class="pill" style="background: rgba(244, 63, 94, 0.15); border-color: #f43f5e; color: #fca5a5; font-size: 11px; padding: 4px 10px;" onclick="resolveConflictAction(' + c.id + ', \'' + c.memory_b_id + '\', true)">Keep ' + c.memory_b_id + ' (Deprecate A)</button>' +
              '<button class="pill" style="background: rgba(255, 255, 255, 0.05); color: #cbd5e1; font-size: 11px; padding: 4px 10px;" onclick="resolveConflictAction(' + c.id + ', \'' + c.memory_a_id + '\', false)">Keep Both (Weaken B)</button>' +
            '</div>' +
          '</div>';
        }).join('');
      } catch (err) {
        console.error('Failed to load conflicts', err);
      }
    }

    async function openMemoryModal(id) {
      let mem = allMemories.find(m => m.id === id);
      if (!mem) {
        try {
          const res = await fetch('/api/memories?q=' + encodeURIComponent(id));
          const results = await res.json();
          mem = results.find(m => m.id === id);
        } catch (e) {}
      }
      if (!mem) return;

      document.getElementById('modal-title').textContent = mem.title;
      document.getElementById('modal-id').textContent = mem.id;
      document.getElementById('modal-module').textContent = mem.module;
      document.getElementById('modal-score').textContent = mem.reward_score;
      document.getElementById('modal-content').textContent = mem.content;
      
      const badgeContainer = document.getElementById('modal-badges');
      badgeContainer.innerHTML = '<span class="badge ' + (mem.kind === 'error_trap' ? 'badge-trap' : 'badge-rule') + '">[' + mem.kind.toUpperCase() + ']</span>' +
        '<span class="badge badge-file">' + mem.status.toUpperCase() + '</span>';

      const filesRow = document.getElementById('modal-files-row');
      filesRow.innerHTML = (mem.linked_files && mem.linked_files.length > 0)
        ? '<b>Linked Files:</b> ' + mem.linked_files.map(f => '<code style="color: #93c5fd; margin-right: 6px;">' + escapeHtml(f) + '</code>').join('')
        : '<b>Linked Files:</b> None';

      document.getElementById('modal-overlay').classList.add('active');
    }

    function closeModal(e) {
      document.getElementById('modal-overlay').classList.remove('active');
    }

    async function openActionModal(id) {
      if (!allActionsData || !allActionsData.actions) {
        try {
          const res = await fetch('/api/actions');
          allActionsData = await res.json();
        } catch (e) {}
      }
      const act = (allActionsData?.actions || []).find(a => a.id === id);
      if (!act) return;

      document.getElementById('act-modal-title').textContent = act.title;
      document.getElementById('act-modal-id').textContent = act.id;
      document.getElementById('act-modal-priority').textContent = 'P' + act.priority;
      document.getElementById('act-modal-agent').textContent = act.assigned_to || 'Unassigned (Open for Claim)';
      document.getElementById('act-modal-desc').textContent = act.description || 'No detailed description.';

      const badgeContainer = document.getElementById('act-modal-badges');
      const isFrontier = act.isFrontier;
      badgeContainer.innerHTML = (isFrontier ? '<span class="badge badge-trap">⚡ FRONTIER READY</span> ' : '') +
        '<span class="badge" style="background: rgba(255,255,255,0.1); color: #fff;">' + act.status.toUpperCase() + '</span>';

      const reqsEl = document.getElementById('act-modal-reqs');
      reqsEl.innerHTML = (act.requires && act.requires.length > 0)
        ? '<b>Prerequisites (Requires):</b> ' + act.requires.map(r => '<code style="color: #93c5fd; margin-right: 6px;">' + escapeHtml(r) + '</code>').join('')
        : '<b>Prerequisites:</b> None (Unblocked)';

      const unlocksEl = document.getElementById('act-modal-unlocks');
      unlocksEl.innerHTML = (act.unlocks && act.unlocks.length > 0)
        ? '<b>Unlocks Downstream:</b> ' + act.unlocks.map(u => '<code style="color: #34d399; margin-right: 6px;">' + escapeHtml(u) + '</code>').join('')
        : '<b>Unlocks Downstream:</b> None';

      const conflictsEl = document.getElementById('act-modal-conflicts');
      conflictsEl.innerHTML = (act.conflictsWith && act.conflictsWith.length > 0)
        ? '<b style="color: #fb7185;">Mutex Conflicts With:</b> ' + act.conflictsWith.map(c => '<code style="color: #fb7185; margin-right: 6px;">' + escapeHtml(c) + '</code>').join('')
        : '<b>Mutex Conflicts:</b> None';

      document.getElementById('action-modal-overlay').classList.add('active');
    }

    function closeActionModal() {
      document.getElementById('action-modal-overlay').classList.remove('active');
    }

    // --- HTML5 CANVAS VISUALIZER (KNOWLEDGE GRAPH & ACTION DAG) ---
    let canvas, ctx, nodes = [], edges = [], transform = { x: 0, y: 0, k: 1 };
    let isDragging = false, dragNode = null, dragStart = { x: 0, y: 0 }, dragStartMouse = { x: 0, y: 0 };
    let resizeListenerAdded = false, animationFrameId = null;

    async function initGraphCanvas() {
      canvas = document.getElementById('graph-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      resizeCanvas();
      if (!resizeListenerAdded) {
        window.addEventListener('resize', resizeCanvas);
        resizeListenerAdded = true;
      }

      if (graphMode === 'knowledge') {
        await loadKnowledgeGraph();
      } else {
        await loadActionsGraph();
      }
      setupGraphInteraction();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      animateGraph();
    }

    function resizeCanvas() {
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function switchGraphMode(mode) {
      graphMode = mode;
      document.getElementById('btn-mode-knowledge')?.classList.toggle('active', mode === 'knowledge');
      document.getElementById('btn-mode-actions')?.classList.toggle('active', mode === 'actions');
      
      const descEl = document.getElementById('graph-mode-desc');
      const legendEl = document.getElementById('graph-legend');
      
      if (mode === 'knowledge') {
        if (descEl) descEl.textContent = 'Visualizing semantic memory nodes, error traps (2.0x boost), code files, and extracted entities.';
        if (legendEl) {
          legendEl.innerHTML = '<div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Code File Node</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #fbbf24;"></div> Error Trap [TRAP] (2.0x)</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Verified Rule</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div> Architecture Decision</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #ec4899;"></div> Entity Link</div>';
        }
        loadKnowledgeGraph();
      } else {
        if (descEl) descEl.textContent = 'Multi-Agent Action DAG: Topological task dependencies, animated glowing Frontier nodes, and mutex locks.';
        if (legendEl) {
          legendEl.innerHTML = '<div class="legend-item"><div class="legend-dot" style="background: #f59e0b; box-shadow: 0 0 8px #f59e0b;"></div> Ready Frontier (Unblocked)</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Active (In Progress)</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #6b7280;"></div> Blocked on Prereqs</div>' +
            '<div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Completed Task</div>' +
            '<div class="legend-item"><span style="color: #38bdf8; font-weight: bold; font-size: 14px;">&rarr;</span> Dependency Flow</div>' +
            '<div class="legend-item"><span style="color: #ef4444; font-weight: bold; font-size: 14px;">- - -</span> Mutex Conflict</div>';
        }
        loadActionsGraph();
      }
    }

    async function loadKnowledgeGraph() {
      const res = await fetch('/api/graph');
      graphData = await res.json();
      setupKnowledgePhysics(graphData);
    }

    function setupKnowledgePhysics(data) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      nodes = (data.nodes || []).map((n, i) => {
        const angle = (i / Math.max(1, data.nodes.length)) * Math.PI * 2;
        const radius = 120 + Math.random() * 100;
        return {
          ...n,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          radius: n.type === 'file' ? 14 : n.type === 'entity' ? 13 : n.kind === 'error_trap' ? 16 : 12,
        };
      });
      edges = (data.edges || []).map(e => ({
        source: e.source,
        target: e.target,
        type: 'link'
      }));
    }

    async function loadActionsGraph() {
      const res = await fetch('/api/actions');
      allActionsData = await res.json();
      setupActionsPhysics(allActionsData);
    }

    function setupActionsPhysics(data) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const statusColors = {
        done: '#10b981',
        active: '#3b82f6',
        frontier: '#f59e0b',
        blocked: '#6b7280',
        cancelled: '#ef4444',
        pending: '#8b5cf6'
      };

      nodes = (data.actions || []).map((a, i) => {
        const isFrontier = a.isFrontier;
        const statusKey = isFrontier ? 'frontier' : a.status;
        const angle = (i / Math.max(1, data.actions.length)) * Math.PI * 2;
        const radius = 110 + (i % 3) * 60;
        return {
          id: a.id,
          label: a.title,
          type: 'action',
          status: a.status,
          isFrontier,
          priority: a.priority,
          assigned_to: a.assigned_to,
          color: statusColors[statusKey] || '#6b7280',
          radius: isFrontier ? 18 : 14,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: 0,
          vy: 0
        };
      });

      edges = (data.edges || []).map(e => ({
        source: e.source_action_id,
        target: e.target_action_id,
        type: e.edge_type // 'requires' or 'conflicts_with'
      }));
    }

    function setupGraphInteraction() {
      canvas.onmousedown = (e) => {
        dragStartMouse = { x: e.clientX, y: e.clientY };
        const mouseX = (e.offsetX - transform.x) / transform.k;
        const mouseY = (e.offsetY - transform.y) / transform.k;
        const hit = nodes.find(n => Math.hypot(n.x - mouseX, n.y - mouseY) < n.radius + 6);
        if (hit) {
          dragNode = hit;
        } else {
          isDragging = true;
          dragStart = { x: e.offsetX - transform.x, y: e.offsetY - transform.y };
        }
      };

      canvas.onmousemove = (e) => {
        if (dragNode) {
          dragNode.x = (e.offsetX - transform.x) / transform.k;
          dragNode.y = (e.offsetY - transform.y) / transform.k;
          dragNode.vx = 0;
          dragNode.vy = 0;
        } else if (isDragging) {
          transform.x = e.offsetX - dragStart.x;
          transform.y = e.offsetY - dragStart.y;
        }
      };

      window.onmouseup = (e) => {
        const mouseDist = Math.hypot(e.clientX - dragStartMouse.x, e.clientY - dragStartMouse.y);
        if (dragNode && mouseDist < 6) {
          if (dragNode.type === 'memory') {
            openMemoryModal(dragNode.id);
          } else if (dragNode.type === 'action') {
            openActionModal(dragNode.id);
          } else if (dragNode.type === 'file') {
            switchTab('memories');
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
              searchInput.value = dragNode.label;
              loadMemories(dragNode.label);
            }
          }
        }
        dragNode = null;
        isDragging = false;
      };

      canvas.onwheel = (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        transform.k = Math.max(0.3, Math.min(3, transform.k * factor));
      };
    }

    function zoomGraph(factor) {
      transform.k = Math.max(0.3, Math.min(3, transform.k * factor));
    }

    function resetGraphZoom() {
      transform = { x: 0, y: 0, k: 1 };
    }

    function toggleGraphPhysics() {
      graphSimulationRunning = !graphSimulationRunning;
    }

    function animateGraph() {
      if (currentTab !== 'graph') {
        animationFrameId = null;
        return;
      }

      if (graphSimulationRunning) {
        // Node repulsion
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 220) {
              const f = (220 - dist) / dist * 0.45;
              nodes[i].vx -= dx * f * 0.05;
              nodes[i].vy -= dy * f * 0.05;
              nodes[j].vx += dx * f * 0.05;
              nodes[j].vy += dy * f * 0.05;
            }
          }
        }

        // Edge attraction
        for (const e of edges) {
          const s = nodes.find(n => n.id === e.source);
          const t = nodes.find(n => n.id === e.target);
          if (s && t) {
            const dx = t.x - s.x;
            const dy = t.y - s.y;
            const spring = e.type === 'conflicts_with' ? 0.001 : 0.0035;
            s.vx += dx * spring;
            s.vy += dy * spring;
            t.vx -= dx * spring;
            t.vy -= dy * spring;
          }
        }

        // Apply friction
        for (const n of nodes) {
          if (n !== dragNode) {
            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.85;
            n.vy *= 0.85;
          }
        }
      }

      // Draw frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      // Draw edges
      for (const e of edges) {
        const s = nodes.find(n => n.id === e.source);
        const t = nodes.find(n => n.id === e.target);
        if (s && t) {
          ctx.beginPath();
          if (e.type === 'conflicts_with') {
            ctx.setLineDash([6, 4]);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
            ctx.setLineDash([]);
          } else if (e.type === 'requires') {
            ctx.setLineDash([]);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.8;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();

            // Directed arrow from prerequisite (target) to dependent (source)
            const angle = Math.atan2(s.y - t.y, s.x - t.x);
            const arrowDist = s.radius + 3;
            const arrowX = s.x - Math.cos(angle) * arrowDist;
            const arrowY = s.y - Math.sin(angle) * arrowDist;
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - 9 * Math.cos(angle - Math.PI / 6), arrowY - 9 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(arrowX - 9 * Math.cos(angle + Math.PI / 6), arrowY - 9 * Math.sin(angle + Math.PI / 6));
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
          } else {
            ctx.setLineDash([]);
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 1.5;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        // Frontier glowing aura animation
        if (n.isFrontier) {
          const pulse = (Math.sin(Date.now() / 220) + 1) * 3.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + pulse + 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        
        if (n.type === 'action') {
          ctx.fillStyle = n.color;
        } else if (n.type === 'file') {
          ctx.fillStyle = '#10b981';
        } else if (n.type === 'entity') {
          ctx.fillStyle = '#ec4899';
        } else if (n.kind === 'error_trap') {
          ctx.fillStyle = '#fbbf24';
        } else if (n.kind === 'decision') {
          ctx.fillStyle = '#8b5cf6';
        } else {
          ctx.fillStyle = '#3b82f6';
        }
        ctx.fill();
        ctx.strokeStyle = '#111827';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        const labelText = n.type === 'action' ? ('[P' + n.priority + '] ' + n.label) : n.label;
        const truncated = labelText.length > 22 ? labelText.slice(0, 20) + '...' : labelText;
        ctx.fillText(truncated, n.x, n.y + n.radius + 14);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animateGraph);
    }

    // Debounce search
    let debounceTimer;
    document.getElementById('search-input')?.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        loadMemories(e.target.value);
      }, 200);
    });

    loadStatus();
    loadMemories();
    loadActionsBoard();
    loadConflictsList();
  </script>
</body>
</html>`;
}
