import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { initDatabase } from '../db/schema.js';
import { searchMemories } from '../search/hybrid-rrf.js';
import { scrubSecrets } from '../privacy/scrubber.js';
import { syncModulePage, syncAllModulePages } from '../mirror/markdown-pages.js';
import { FastrConfig, loadConfig } from '../config.js';

export interface ServerContext {
  db: DatabaseSync;
  repo: FastrRepository;
  spool: SpoolManager;
  config: FastrConfig;
}

export function createFastrServerContext(customRoot?: string): ServerContext {
  const config = loadConfig(customRoot);
  const db = initDatabase(config.dbPath);
  const spool = new SpoolManager(config.spoolPath);
  const repo = new FastrRepository(db, spool);

  // Auto-drain any pending spool events on startup
  if (spool.hasPending()) {
    try {
      spool.drain(db);
    } catch {
      // Ignored if busy; will retry on next command
    }
  }

  return { db, repo, spool, config };
}

export function createFastrMcpServer(context?: ServerContext): McpServer {
  const ctx = context || createFastrServerContext();
  const { db, repo, config } = ctx;

  const server = new McpServer({
    name: '@fastrsoft/fastrmemory',
    version: '0.1.0'
  });

  // ==========================================
  // TOOL 1: fastr_recall
  // ==========================================
  server.registerTool(
    'fastr_recall',
    {
      description: 'Triple-Stream hybrid search (BM25 + Vector + Graph) with progressive token budgeting and trap weighting.',
      inputSchema: {
        query: z.string().describe('Search query or task description'),
        files: z.array(z.string()).default([]).describe('Target file paths being inspected or edited'),
        module: z.string().optional().describe('Filter by module (e.g. auth, db, api)'),
        budgetTokens: z.number().default(2000).describe('Token ceiling (e.g. 500, 1500, 4000)'),
        includeHistory: z.boolean().default(false).describe('Include historical superseded rules')
      }
    },
    async ({ query, files, module, budgetTokens, includeHistory }) => {
      const results = await searchMemories(db, {
        projectId: config.projectId,
        query,
        files,
        module,
        budgetTokens,
        includeHistory
      });

      // Increment retrieval counter for recalled memories
      const memoryIds = results.memories.map((m) => m.memory.id);
      repo.incrementRetrieval(memoryIds);

      const outputText = results.text.length > 0
        ? results.text
        : '_No matching memories found for this query._';

      return {
        content: [{ type: 'text', text: outputText }]
      };
    }
  );

  // ==========================================
  // TOOL 2: fastr_drill
  // ==========================================
  server.registerTool(
    'fastr_drill',
    {
      description: 'Inspects verbatim raw observations (untruncated stack traces, diffs, tool outputs) for a memory or event.',
      inputSchema: {
        memoryId: z.string().optional().describe('Memory ID to retrieve verbatim source events for'),
        eventId: z.string().optional().describe('Raw event ID to look up directly')
      }
    },
    async ({ memoryId, eventId }) => {
      let events: any[] = [];
      if (eventId) {
        const ev = repo.getRawEvent(eventId);
        if (ev) events.push(ev);
      } else if (memoryId) {
        events = repo.getRawEventsForMemory(memoryId);
      }

      if (events.length === 0) {
        return {
          content: [{ type: 'text', text: '_No raw observation events found._' }]
        };
      }

      const formatted = events.map((ev) => (
        `### Raw Event [${ev.id}] (${ev.event_type} at ${ev.created_at})\n` +
        `- Tool: \`${ev.tool_name || 'N/A'}\`\n` +
        `- File: \`${ev.file_path || 'N/A'}\`\n\n` +
        '```\n' + ev.raw_payload + '\n```'
      )).join('\n\n---\n\n');

      return {
        content: [{ type: 'text', text: formatted }]
      };
    }
  );

  // ==========================================
  // TOOL 3: fastr_file_history
  // ==========================================
  server.registerTool(
    'fastr_file_history',
    {
      description: 'Returns active rules, [TRAP] warnings, and historical decisions linked to a specific file path.',
      inputSchema: {
        filePath: z.string().describe('File path to inspect (e.g. src/auth/jwt.ts)')
      }
    },
    async ({ filePath }) => {
      const memories = repo.getMemoriesForFile(config.projectId, filePath);
      if (memories.length === 0) {
        return {
          content: [{ type: 'text', text: `_No active rules or traps recorded for file: ${filePath}_` }]
        };
      }

      const formatted = memories.map((m) => {
        const kindBadge = m.kind === 'error_trap' ? 'TRAP' : m.kind.toUpperCase();
        return (
          `### [${m.id}] [${kindBadge}] ${m.title}\n` +
          `- Kind: \`${m.kind}\` | Status: \`${m.status}\` | Score: ${m.reward_score}\n\n` +
          m.content
        );
      }).join('\n\n---\n\n');

      return {
        content: [{ type: 'text', text: formatted }]
      };
    }
  );

  // ==========================================
  // TOOL 4: fastr_remember
  // ==========================================
  server.registerTool(
    'fastr_remember',
    {
      description: 'Records a new rule, architectural decision, error trap, or workflow. Automatically scrubs credentials.',
      inputSchema: {
        module: z.string().default('general').describe('Module name (e.g. auth, db, api, ui)'),
        kind: z.enum(['rule', 'decision', 'error_trap', 'workflow']).describe('Kind of memory'),
        title: z.string().describe('Concise headline title'),
        content: z.string().describe('Detailed actionable lesson or trap warning'),
        files: z.array(z.string()).default([]).describe('Related file paths'),
        symbols: z.array(z.string()).default([]).describe('Related symbol or function names'),
        verified: z.boolean().default(false).describe('Set true if already verified by passing tests'),
        pinned: z.boolean().default(false).describe('Pin to always surface during recall')
      }
    },
    async ({ module, kind, title, content, files, symbols, verified, pinned }) => {
      // 1. Scrub secrets
      const scrubbedTitle = scrubSecrets(title);
      const scrubbedContent = scrubSecrets(content);

      // 2. Insert into database
      const mem = repo.insertMemory({
        projectId: config.projectId,
        module,
        kind,
        title: scrubbedTitle,
        content: scrubbedContent,
        files,
        symbols,
        verified,
        pinned
      });

      // 3. Re-render Two-Zone Markdown page
      try {
        syncModulePage(db, config.projectRoot, config.projectId, module);
      } catch {}

      return {
        content: [{
          type: 'text',
          text: `Recorded memory [${mem.id}] (${mem.kind}) in module "${mem.module}" with status "${mem.status}".`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 5: fastr_supersede
  // ==========================================
  server.registerTool(
    'fastr_supersede',
    {
      description: 'Retires an old memory rule and replaces it with a new verified rule, recording the reason for Git diffs.',
      inputSchema: {
        oldMemoryId: z.string().describe('ID of memory to supersede (e.g. mem_8f2a1c)'),
        newTitle: z.string().describe('Updated title'),
        newContent: z.string().describe('Updated rule/lesson content'),
        reason: z.string().describe('Reason for replacing old rule'),
        files: z.array(z.string()).optional().describe('Updated file paths')
      }
    },
    async ({ oldMemoryId, newTitle, newContent, reason, files }) => {
      const scrubbedTitle = scrubSecrets(newTitle);
      const scrubbedContent = scrubSecrets(newContent);

      const { oldMemory, newMemory } = repo.supersedeMemory(
        oldMemoryId,
        scrubbedTitle,
        scrubbedContent,
        reason,
        files
      );

      // Re-render Two-Zone Markdown page
      try {
        syncModulePage(db, config.projectRoot, config.projectId, newMemory.module);
      } catch {}

      return {
        content: [{
          type: 'text',
          text: `Superseded [${oldMemory.id}] with new verified memory [${newMemory.id}]. Reason: "${reason}".`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 6: fastr_feedback
  // ==========================================
  server.registerTool(
    'fastr_feedback',
    {
      description: 'Scores outcome on a specific recalled memory (+0.2 good, -0.5 bad). Never penalizes the whole batch.',
      inputSchema: {
        memoryId: z.string().describe('Memory ID (e.g. mem_8f2a1c)'),
        outcome: z.enum(['good', 'bad']).describe('Good (+0.2) or Bad (-0.5) outcome'),
        note: z.string().optional().describe('Optional explanation of why the advice was good or bad')
      }
    },
    async ({ memoryId, outcome, note }) => {
      const res = repo.updateFeedback(memoryId, outcome, note);
      return {
        content: [{
          type: 'text',
          text: `Updated feedback for [${memoryId}]: new reward_score = ${res.reward_score}, status = "${res.status}".`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 7: fastr_handoff
  // ==========================================
  server.registerTool(
    'fastr_handoff',
    {
      description: 'Saves or retrieves cross-agent session milestones. Promotes staging memories when verifyStaging=true.',
      inputSchema: {
        action: z.enum(['save', 'latest']).describe('Action: "save" new milestone or "latest" to retrieve'),
        taskTitle: z.string().optional().describe('Current task title (required for save)'),
        summary: z.string().optional().describe('Summary of progress completed (required for save)'),
        nextStep: z.string().optional().describe('Immediate next action for the next agent session'),
        activeFiles: z.array(z.string()).default([]).describe('Active files modified during session'),
        verifyStaging: z.boolean().default(false).describe('Set true to promote session staging memories to verified')
      }
    },
    async ({ action, taskTitle, summary, nextStep, activeFiles, verifyStaging }) => {
      if (action === 'save') {
        if (!taskTitle || !summary) {
          return {
            isError: true,
            content: [{ type: 'text', text: 'taskTitle and summary are required when action="save".' }]
          };
        }

        const handoff = repo.saveHandoff({
          project_id: config.projectId,
          session_id: `sess_${Date.now()}`,
          task_title: taskTitle,
          summary,
          next_step: nextStep || 'Continue planned tasks.',
          active_files: JSON.stringify(activeFiles)
        });

        let promotedCount = 0;
        if (verifyStaging) {
          promotedCount = repo.verifyStaging(config.projectId);
        }

        return {
          content: [{
            type: 'text',
            text: `Saved session handoff #${handoff.id}: "${taskTitle}". Promoted ${promotedCount} staging memories to verified.`
          }]
        };
      }

      // action === 'latest'
      const latest = repo.getLatestHandoff(config.projectId);
      if (!latest) {
        return {
          content: [{ type: 'text', text: '_No prior session handoffs recorded for this project._' }]
        };
      }

      return {
        content: [{
          type: 'text',
          text: (
            `### Latest Session Handoff: ${latest.task_title}\n` +
            `- **Recorded At**: ${latest.created_at}\n` +
            `- **Summary**: ${latest.summary}\n` +
            `- **Next Step**: ${latest.next_step}\n` +
            `- **Active Files**: \`${latest.active_files}\``
          )
        }]
      };
    }
  );

  // ==========================================
  // TOOL 8: fastr_status
  // ==========================================
  server.registerTool(
    'fastr_status',
    {
      description: 'Returns health, memory counts, raw event counts, pending spool count, and embedding coverage %.',
      inputSchema: {
        projectId: z.string().optional().describe('Project ID override')
      }
    },
    async ({ projectId }) => {
      const pid = projectId || config.projectId;
      const status = repo.getStatus(pid);
      return {
        content: [{
          type: 'text',
          text: (
            `### FastrMemory Status (Project: ${status.projectId})\n` +
            `- **Active Memories**: ${status.activeCount}\n` +
            `- **Staging Memories**: ${status.stagingCount}\n` +
            `- **Superseded History**: ${status.supersededCount}\n` +
            `- **Dormant Memories**: ${status.dormantCount}\n` +
            `- **Raw Ingested Events**: ${status.rawEventCount}\n` +
            `- **Pending Spool**: ${status.pendingSpoolCount === 0 ? 'Clear (0)' : 'Pending Drain'}\n` +
            `- **Embedding Coverage**: ${status.embeddingCoveragePercent}%\n` +
            `- **Database**: \`${config.dbPath}\``
          )
        }]
      };
    }
  );

  // ==========================================
  // TOOL 9: fastr_graph_query
  // ==========================================
  server.registerTool(
    'fastr_graph_query',
    {
      description: 'Query the code file-dependency graph to discover linked memories, error traps, and neighboring files (up to 2-hop structural links).',
      inputSchema: {
        filePath: z.string().optional().describe('Center graph on specific file path to discover 1-hop & 2-hop connected rules and files'),
        depth: z.number().default(2).describe('Graph traversal depth (1 or 2 hops)')
      }
    },
    async ({ filePath, depth }) => {
      const graph = repo.queryGraph(config.projectId, { startFilePath: filePath, depth });
      const memoryNodes = graph.nodes.filter((n) => n.type === 'memory');
      const fileNodes = graph.nodes.filter((n) => n.type === 'file');

      let text = `### FastrMemory Graph Query Results\n`;
      text += `- **Connected Files**: ${fileNodes.length}\n`;
      text += `- **Connected Memories & Traps**: ${memoryNodes.length}\n`;
      text += `- **Relationship Edges**: ${graph.edges.length}\n\n`;

      if (memoryNodes.length > 0) {
        text += `#### Connected Memories:\n`;
        for (const m of memoryNodes) {
          const kindBadge = m.kind === 'error_trap' ? '[TRAP]' : m.kind ? `[${m.kind.toUpperCase()}]` : '[RULE]';
          text += `- **[${m.id}]** ${kindBadge} ${m.label} (Score: ${m.score ?? 1.0})\n`;
        }
      }

      if (fileNodes.length > 0) {
        text += `\n#### Associated Code Files:\n`;
        for (const f of fileNodes) {
          text += `- \`${f.id}\`\n`;
        }
      }

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // TOOL 10: fastr_timeline
  // ==========================================
  server.registerTool(
    'fastr_timeline',
    {
      description: 'Returns chronological audit trail of memories, verified rules, error traps, and historical supersessions.',
      inputSchema: {
        module: z.string().optional().describe('Filter timeline by module (e.g. auth, db)'),
        limit: z.number().default(25).describe('Max chronological entries to return')
      }
    },
    async ({ module: targetModule, limit }) => {
      const timeline = repo.getTimeline(config.projectId, { module: targetModule, limit });

      let text = `### FastrMemory Chronological Timeline (${timeline.length} events)\n\n`;
      if (timeline.length === 0) {
        text += `_No memory history found._\n`;
      } else {
        for (const item of timeline) {
          const kindBadge = item.kind === 'error_trap' ? '⚠️ [TRAP]' : `[${item.kind.toUpperCase()}]`;
          const statusBadge = item.status === 'superseded' ? '🔴 SUPERSEDED' : item.status === 'verified' ? '🟢 VERIFIED' : '🟡 STAGING';
          text += `#### ${item.createdAt} — ${kindBadge} ${item.title} (${statusBadge})\n`;
          text += `- **ID**: \`${item.id}\` | **Module**: \`${item.module}\` | **Score**: ${item.rewardScore}\n`;
          if (item.linkedFiles.length > 0) {
            text += `- **Files**: ${item.linkedFiles.map((f) => `\`${f}\``).join(', ')}\n`;
          }
          if (item.validTo) {
            text += `- **Expired / Superseded At**: ${item.validTo}\n`;
            if (item.supersededById) text += `- **Superseded By**: \`${item.supersededById}\`\n`;
            if (item.supersededReason) text += `- **Reason**: ${item.supersededReason}\n`;
          }
          text += `\n---\n\n`;
        }
      }

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // TOOL 11: fastr_snapshot (Git-for-Memory)
  // ==========================================
  server.registerTool(
    'fastr_snapshot',
    {
      description: 'Create an immutable point-in-time snapshot of all active memories and file links.',
      inputSchema: {
        tag: z.string().describe('Descriptive version tag (e.g. v1.0, pre-auth-refactor)'),
        description: z.string().optional().describe('Context or rationale for this snapshot')
      }
    },
    async ({ tag, description }) => {
      const snap = repo.createSnapshot(config.projectId, tag, description);
      return {
        content: [{
          type: 'text',
          text: (
            `### Created Memory Snapshot\n` +
            `- **Snapshot ID**: \`${snap.id}\`\n` +
            `- **Tag**: \`${snap.tag}\`\n` +
            `- **Archived Active Memories**: ${snap.memoryCount}\n` +
            `- **Timestamp**: ${snap.createdAt}`
          )
        }]
      };
    }
  );

  // ==========================================
  // TOOL 12: fastr_rollback (Time Travel)
  // ==========================================
  server.registerTool(
    'fastr_rollback',
    {
      description: 'Revert project memory state to a previous snapshot, superseding newer erroneous rules.',
      inputSchema: {
        snapshotId: z.string().describe('The snapshot ID to restore (e.g. snap_xxxx)')
      }
    },
    async ({ snapshotId }) => {
      const res = repo.rollbackToSnapshot(config.projectId, snapshotId);
      syncAllModulePages(db, config.projectRoot, config.projectId);
      return {
        content: [{
          type: 'text',
          text: (
            `### Rolled Back Memory State\n` +
            `- **Restored Snapshot Tag**: \`${res.snapshotTag}\`\n` +
            `- **Active Memories Restored**: ${res.restoredCount}\n` +
            `- Newer conflicting memories have been marked \`superseded\`.\n` +
            `- Two-Zone Markdown mirrors synchronized.`
          )
        }]
      };
    }
  );

  // ==========================================
  // TOOL 13: fastr_trap_log (Rapid Error Trap Logger)
  // ==========================================
  server.registerTool(
    'fastr_trap_log',
    {
      description: 'Immediately logs an error trap diagnosed during a build failure or test error. Receives a 2.0x recall boost.',
      inputSchema: {
        title: z.string().describe('Clear, imperative rule title (e.g. Never Use Date.now() for JWT Exp)'),
        content: z.string().describe('Exact explanation of the error trap and the concrete workaround/fix'),
        files: z.array(z.string()).describe('Code files affected by this error trap'),
        module: z.string().default('general').describe('Module name (e.g. auth, db, api)')
      }
    },
    async ({ title, content, files, module: trapModule }) => {
      const scrubbedTitle = scrubSecrets(title);
      const scrubbedContent = scrubSecrets(content);

      const mem = repo.insertMemory({
        projectId: config.projectId,
        module: trapModule,
        kind: 'error_trap',
        title: scrubbedTitle,
        content: scrubbedContent,
        files,
        verified: true
      });

      syncAllModulePages(db, config.projectRoot, config.projectId);
      return {
        content: [{
          type: 'text',
          text: `⚠️ **Logged Error Trap [${mem.id}]**: "${mem.title}" linked to ${files.length} file(s) with 2.0x recall boost.`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 14: fastr_trap_recall
  // ==========================================
  server.registerTool(
    'fastr_trap_recall',
    {
      description: 'Fetch all active [TRAP] warnings protecting specific files before beginning an edit.',
      inputSchema: {
        files: z.array(z.string()).describe('Target files about to be edited or inspected')
      }
    },
    async ({ files }) => {
      const traps: any[] = [];
      for (const f of files) {
        const mems = repo.getMemoriesForFile(config.projectId, f);
        for (const m of mems) {
          if (m.kind === 'error_trap' && !traps.some((t) => t.id === m.id)) {
            traps.push(m);
          }
        }
      }

      if (traps.length === 0) {
        return {
          content: [{ type: 'text', text: `_No active error traps protecting specified file(s). Safe to proceed._` }]
        };
      }

      let text = `### ⚠️ Active Error Traps for Specified Files (${traps.length} found):\n\n`;
      for (const t of traps) {
        text += `#### [${t.id}] ${t.title} (${t.module})\n`;
        text += `${t.content}\n\n---\n\n`;
      }

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // RESOURCE 1: fastr://project/overview
  // ==========================================
  server.registerResource(
    'overview',
    'fastr://project/overview',
    { description: 'L0 Project Overview (~150 tokens)', mimeType: 'text/markdown' },
    async (uri) => {
      const status = repo.getStatus(config.projectId);
      const text = (
        `# Project Memory: ${config.projectName}\n` +
        `Active rules: ${status.activeCount} | Traps: ${status.activeCount} | Events: ${status.rawEventCount}\n` +
        `Memory is maintained locally in WAL SQLite and mirrored into \`.fastr/pages/*.md\` for Git diffs.`
      );
      return {
        contents: [{ uri: uri.href, text, mimeType: 'text/markdown' }]
      };
    }
  );

  // ==========================================
  // RESOURCE 2: fastr://project/traps
  // ==========================================
  server.registerResource(
    'traps',
    'fastr://project/traps',
    { description: 'All active [TRAP] warnings for this project', mimeType: 'text/markdown' },
    async (uri) => {
      const rows = db.prepare(`
        SELECT id, module, title, content
        FROM memories
        WHERE project_id = ?
          AND kind = 'error_trap'
          AND valid_to IS NULL
          AND status != 'superseded'
          AND status != 'dormant'
        ORDER BY reward_score DESC, created_at DESC
      `).all(config.projectId) as any[];

      const text = rows.length > 0
        ? rows.map((r) => `### [${r.id}] [TRAP] ${r.title} (${r.module})\n${r.content}`).join('\n\n---\n\n')
        : '_No active error traps currently recorded._';

      return {
        contents: [{ uri: uri.href, text, mimeType: 'text/markdown' }]
      };
    }
  );

  // ==========================================
  // RESOURCE 3: fastr://session/handoff
  // ==========================================
  server.registerResource(
    'handoff',
    'fastr://session/handoff',
    { description: 'Latest cross-agent session handoff snapshot', mimeType: 'text/markdown' },
    async (uri) => {
      const latest = repo.getLatestHandoff(config.projectId);
      const text = latest
        ? `### Handoff: ${latest.task_title}\n- Summary: ${latest.summary}\n- Next: ${latest.next_step}`
        : '_No prior handoffs recorded._';

      return {
        contents: [{ uri: uri.href, text, mimeType: 'text/markdown' }]
      };
    }
  );

  return server;
}
