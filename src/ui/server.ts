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

      // API: Status
      if (url.pathname === '/api/status') {
        const status = repo.getStatus(config.projectId);
        const traps = repo.listTraps(config.projectId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          projectId: config.projectId,
          dbPath: config.dbPath,
          status,
          trapsCount: traps.length,
          spoolPending: spool.hasPending(),
        }));
        return;
      }

      // API: Memories List / Search
      if (url.pathname === '/api/memories') {
        const targetModule = url.searchParams.get('module') || undefined;
        const query = url.searchParams.get('q') || '';
        let memories = repo.listActiveMemories(config.projectId, targetModule);

        if (query) {
          const qLower = query.toLowerCase();
          memories = memories.filter((m) =>
            m.title.toLowerCase().includes(qLower) ||
            m.content.toLowerCase().includes(qLower) ||
            m.module.toLowerCase().includes(qLower) ||
            m.id.toLowerCase().includes(qLower)
          );
        }

        // Fetch linked files for each memory
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

      // API: Graph (Nodes & Edges)
      if (url.pathname === '/api/graph') {
        const memories = repo.listActiveMemories(config.projectId);
        const fileLinks = db.prepare(`
          SELECT fl.memory_id, fl.file_path, m.title, m.kind
          FROM file_links fl
          JOIN memories m ON m.id = fl.memory_id
          WHERE m.project_id = ? AND m.valid_to IS NULL
        `).all(config.projectId) as unknown as { memory_id: string; file_path: string; title: string; kind: string }[];

        const nodesMap = new Map<string, { id: string; label: string; type: 'memory' | 'file'; kind?: string }>();
        const edges: { source: string; target: string }[] = [];

        for (const m of memories) {
          nodesMap.set(m.id, { id: m.id, label: m.title, type: 'memory', kind: m.kind });
        }

        for (const fl of fileLinks) {
          if (!nodesMap.has(fl.file_path)) {
            nodesMap.set(fl.file_path, { id: fl.file_path, label: fl.file_path, type: 'file' });
          }
          edges.push({ source: fl.memory_id, target: fl.file_path });
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          nodes: Array.from(nodesMap.values()),
          edges,
        }));
        return;
      }

      // UI Single-Page Dashboard
      if (url.pathname === '/' || url.pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderDashboardHtml(config.projectId));
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

function renderDashboardHtml(projectId: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FastrMemory Hub &bull; ${projectId}</title>
  <style>
    :root {
      --bg-base: #0b0f17;
      --bg-surface: #111827;
      --bg-card: #1f2937;
      --border: #374151;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --primary: #3b82f6;
      --emerald: #10b981;
      --amber: #f59e0b;
      --purple: #8b5cf6;
      --rose: #f43f5e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-base);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border);
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .brand span { color: var(--primary); }
    .badge {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-rule { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .badge-trap { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-decision { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
    .badge-file { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .stats-bar {
      display: flex;
      gap: 16px;
      padding: 20px 24px;
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border);
    }
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      padding: 14px 20px;
      border-radius: 8px;
      flex: 1;
    }
    .stat-val { font-size: 26px; font-weight: 700; color: #fff; }
    .stat-lbl { font-size: 12px; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; }
    main {
      padding: 24px;
      flex: 1;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }
    .search-row {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    .search-input {
      flex: 1;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 16px;
      color: var(--text);
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus { border-color: var(--primary); }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.15s, border-color 0.15s;
    }
    .card:hover { transform: translateY(-2px); border-color: #4b5563; }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
    }
    .card-title { font-size: 16px; font-weight: 600; color: #fff; line-height: 1.4; }
    .card-content {
      font-size: 14px;
      line-height: 1.6;
      color: #d1d5db;
      background: var(--bg-card);
      padding: 12px;
      border-radius: 6px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: var(--text-muted);
      margin-top: auto;
    }
    .files-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .file-tag {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <span>⚡ FastrMemory</span> Hub
    </div>
    <div style="font-size: 13px; color: var(--text-muted);">
      Project: <code style="color: #60a5fa;">${projectId}</code> &bull; Native Node 24 WAL
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
      <div class="stat-val" id="stat-spool" style="color: #34d399;">Clear</div>
      <div class="stat-lbl">Offline Spool Queue</div>
    </div>
  </section>

  <main>
    <div class="search-row">
      <input type="text" id="search-input" class="search-input" placeholder="Instant search by keyword, file path, error trap, or [mem_id]..." autofocus />
    </div>

    <div class="grid" id="memories-grid">
      <div style="color: var(--text-muted); padding: 40px; text-align: center; grid-column: 1 / -1;">
        Loading active memories...
      </div>
    </div>
  </main>

  <script>
    async function loadStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        document.getElementById('stat-active').textContent = data.status.activeMemoryCount;
        document.getElementById('stat-traps').textContent = data.trapsCount;
        document.getElementById('stat-spool').textContent = data.spoolPending ? 'Pending' : 'Clear (0)';
      } catch (err) {
        console.error('Failed to load status', err);
      }
    }

    async function loadMemories(query = '') {
      try {
        const res = await fetch('/api/memories?q=' + encodeURIComponent(query));
        const memories = await res.json();
        const grid = document.getElementById('memories-grid');

        if (memories.length === 0) {
          grid.innerHTML = '<div style="color: var(--text-muted); padding: 40px; text-align: center; grid-column: 1 / -1;">No memories match your query.</div>';
          return;
        }

        grid.innerHTML = memories.map(m => {
          const kindBadge = m.kind === 'error_trap'
            ? '<span class="badge badge-trap">[TRAP]</span>'
            : m.kind === 'decision'
            ? '<span class="badge badge-decision">[DECISION]</span>'
            : '<span class="badge badge-rule">[RULE]</span>';

          const filesHtml = (m.linked_files && m.linked_files.length > 0)
            ? '<div class="files-list">' + m.linked_files.map(f => '<span class="file-tag">' + f + '</span>').join('') + '</div>'
            : '<span style="color: var(--text-muted);">No linked files</span>';

          return '<div class="card">' +
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
      } catch (err) {
        console.error('Failed to load memories', err);
      }
    }

    let debounceTimer;
    document.getElementById('search-input').addEventListener('input', (e) => {
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
