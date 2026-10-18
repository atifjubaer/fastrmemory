import * as http from 'node:http';
import { exec } from 'node:child_process';
import { FastrConfig } from '../config.js';
import { initDatabase } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';

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
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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

      // UI Single-Page Dashboard
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
        db.close();
      } catch {
        // Already closed
      }
    });

    server.listen(preferredPort);
  });
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
      <button class="tab-btn" onclick="switchTab('graph')">🕸️ Knowledge Graph</button>
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
      <div class="stat-val" id="stat-graph-nodes" style="color: #38bdf8;">0</div>
      <div class="stat-lbl">Connected Graph Nodes</div>
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

    <!-- TAB 4: KNOWLEDGE GRAPH -->
    <div id="tab-graph" class="tab-content">
      <div id="graph-container">
        <div class="graph-legend">
          <div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Code File Node</div>
          <div class="legend-item"><div class="legend-dot" style="background: #fbbf24;"></div> Error Trap [TRAP] (2.0x)</div>
          <div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Verified Rule</div>
          <div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div> Architecture Decision</div>
        </div>
        <div class="graph-controls">
          <button class="graph-btn" onclick="resetGraphZoom()">Reset View</button>
          <button class="graph-btn" onclick="toggleGraphPhysics()">Pause/Play Physics</button>
        </div>
        <canvas id="graph-canvas"></canvas>
      </div>
    </div>

    <!-- TAB 5: TIMELINE -->
    <div id="tab-timeline" class="tab-content">
      <div id="timeline-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
    </div>
  </main>

  <!-- DETAIL MODAL -->
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

  <script>
    let currentTab = 'overview';
    let allMemories = [];
    let currentModule = 'all';
    let graphData = { nodes: [], edges: [] };
    let graphSimulationRunning = true;

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
      } else if (tabId === 'timeline') {
        loadTimeline();
      }
    }

    async function loadStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        document.getElementById('stat-active').textContent = data.activeCount;
        document.getElementById('stat-traps').textContent = data.trapsCount;
        document.getElementById('stat-graph-nodes').textContent = data.graphNodesCount;
        document.getElementById('stat-spool').textContent = data.spoolPending ? 'Pending' : 'Clear (0)';
        
        document.getElementById('tab-cnt-mem').textContent = data.activeCount;
        document.getElementById('tab-cnt-traps').textContent = data.trapsCount;

        // Populate module filter pills
        const pillsContainer = document.getElementById('module-pills');
        pillsContainer.innerHTML = '<button class="pill active" onclick="filterByModule(\\'all\\')">All Modules</button>' +
          data.modules.map(m => '<button class="pill" onclick="filterByModule(\\'' + m + '\\')">' + m + '</button>').join('');
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
          ? '<div class="files-list">' + m.linked_files.map(f => '<span class="file-tag">' + f + '</span>').join('') + '</div>'
          : '<span style="color: var(--text-muted);">No linked files</span>';

        return '<div class="card ' + (isTrap ? 'card-trap' : '') + '" onclick="openMemoryModal(\\'' + m.id + '\\')">' +
          '<div class="card-header">' +
            '<div>' +
              '<div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">[' + m.id + '] &bull; ' + m.module + '</div>' +
              '<div class="card-title">' + m.title + '</div>' +
            '</div>' +
            kindBadge +
          '</div>' +
          '<div class="card-content">' + m.content + '</div>' +
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
              '<div style="font-weight: 600; font-size: 14px;">' + item.title + '</div>' +
              '<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Files: ' + (item.linkedFiles.join(', ') || 'None') + '</div>' +
            '</div>' +
            '<div style="font-size: 12px; color: #60a5fa;">Score: ' + item.rewardScore + '</div>' +
          '</div>';
        }).join('');
      } catch (err) {
        console.error('Failed to load timeline', err);
      }
    }

    function openMemoryModal(id) {
      const mem = allMemories.find(m => m.id === id);
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
        ? '<b>Linked Files:</b> ' + mem.linked_files.map(f => '<code style="color: #93c5fd; margin-right: 6px;">' + f + '</code>').join('')
        : '<b>Linked Files:</b> None';

      document.getElementById('modal-overlay').classList.add('active');
    }

    function closeModal(e) {
      document.getElementById('modal-overlay').classList.remove('active');
    }

    // --- HTML5 CANVAS KNOWLEDGE GRAPH ---
    let canvas, ctx, nodes = [], edges = [], transform = { x: 0, y: 0, k: 1 };
    let isDragging = false, dragNode = null, dragStart = { x: 0, y: 0 };

    async function initGraphCanvas() {
      canvas = document.getElementById('graph-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const res = await fetch('/api/graph');
      graphData = await res.json();
      setupGraphPhysics(graphData);
      setupGraphInteraction();
      animateGraph();
    }

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function setupGraphPhysics(data) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      nodes = data.nodes.map((n, i) => {
        const angle = (i / data.nodes.length) * Math.PI * 2;
        const radius = 120 + Math.random() * 100;
        return {
          ...n,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          radius: n.type === 'file' ? 14 : n.kind === 'error_trap' ? 16 : 12,
        };
      });
      edges = data.edges;
    }

    function setupGraphInteraction() {
      canvas.onmousedown = (e) => {
        const mouseX = (e.offsetX - transform.x) / transform.k;
        const mouseY = (e.offsetY - transform.y) / transform.k;
        const hit = nodes.find(n => Math.hypot(n.x - mouseX, n.y - mouseY) < n.radius + 4);
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

      window.onmouseup = () => {
        if (dragNode && Math.hypot(dragNode.vx, dragNode.vy) < 0.1) {
          if (dragNode.type === 'memory') {
            openMemoryModal(dragNode.id);
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

    function resetGraphZoom() {
      transform = { x: 0, y: 0, k: 1 };
    }

    function toggleGraphPhysics() {
      graphSimulationRunning = !graphSimulationRunning;
    }

    function animateGraph() {
      if (currentTab !== 'graph') return;

      if (graphSimulationRunning) {
        // Simple force layout
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 200) {
              const f = (200 - dist) / dist * 0.4;
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
            s.vx += dx * 0.003;
            s.vy += dy * 0.003;
            t.vx -= dx * 0.003;
            t.vy -= dy * 0.003;
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

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      // Draw edges
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1.5;
      for (const e of edges) {
        const s = nodes.find(n => n.id === e.source);
        const t = nodes.find(n => n.id === e.target);
        if (s && t) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        
        if (n.type === 'file') {
          ctx.fillStyle = '#10b981';
        } else if (n.kind === 'error_trap') {
          ctx.fillStyle = '#fbbf24';
        } else if (n.kind === 'decision') {
          ctx.fillStyle = '#8b5cf6';
        } else {
          ctx.fillStyle = '#3b82f6';
        }
        ctx.fill();
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#d1d5db';
        ctx.font = '11px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        const label = n.label.length > 20 ? n.label.slice(0, 18) + '...' : n.label;
        ctx.fillText(label, n.x, n.y + n.radius + 14);
      }

      ctx.restore();
      requestAnimationFrame(animateGraph);
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
  </script>
</body>
</html>`;
}
