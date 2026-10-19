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
import { exportToObsidianVault } from '../export/obsidian.js';

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

  // Auto-attach global database for cross-repository federation
  if (config.globalDbPath) {
    try {
      repo.attachGlobalDatabase(config.globalDbPath);
    } catch {}
  }

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
        pinned: z.boolean().default(false).describe('Pin to always surface during recall'),
        scope: z.enum(['project', 'global']).default('project').describe('Storage scope: project-local or organization-wide global')
      }
    },
    async ({ module, kind, title, content, files, symbols, verified, pinned, scope }) => {
      // 1. Scrub secrets
      const scrubbedTitle = scrubSecrets(title);
      const scrubbedContent = scrubSecrets(content);

      // 2. Insert into database
      const mem = repo.insertMemory({
        projectId: config.projectId,
        scope,
        module,
        kind,
        title: scrubbedTitle,
        content: scrubbedContent,
        files,
        symbols,
        verified,
        pinned
      });

      // 3. Re-render Two-Zone Markdown page (only for project scope)
      if (scope !== 'global') {
        try {
          syncModulePage(db, config.projectRoot, config.projectId, module);
        } catch {}
      }

      return {
        content: [{
          type: 'text',
          text: `Recorded ${scope} memory [${mem.id}] (${mem.kind}) in module "${mem.module}" with status "${mem.status}".`
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
  // TOOL 15: fastr_conflicts
  // ==========================================
  server.registerTool(
    'fastr_conflicts',
    {
      description: 'List detected contradictory memories and policy conflicts requiring resolution.',
      inputSchema: {
        status: z.enum(['open', 'resolved', 'ignored']).default('open').describe('Filter conflicts by status')
      }
    },
    async ({ status }) => {
      const conflicts = repo.listConflicts(config.projectId, status);
      if (conflicts.length === 0) {
        return {
          content: [{ type: 'text', text: `_No ${status} memory conflicts detected in project._` }]
        };
      }

      let text = `### FastrMemory Contradiction & Conflict Registry (${conflicts.length} ${status}):\n\n`;
      for (const c of conflicts) {
        const memA = repo.getMemory(c.memory_a_id);
        const memB = repo.getMemory(c.memory_b_id);

        text += `#### Conflict #${c.id} (Overlap Score: ${(c.score * 100).toFixed(0)}%)\n`;
        text += `- **Reason**: ${c.reason}\n`;
        text += `- **Memory A [${c.memory_a_id}]**: "${memA?.title || 'Unknown'}" (${memA?.module || 'general'})\n`;
        text += `- **Memory B [${c.memory_b_id}]**: "${memB?.title || 'Unknown'}" (${memB?.module || 'general'})\n`;
        if (c.status === 'resolved') {
          text += `- **Status**: RESOLVED (Winner: \`${c.resolved_winner_id}\` at ${c.resolved_at})\n`;
        } else {
          text += `- **Action Required**: Call \`fastr_resolve\` with \`conflictId: ${c.id}\` and \`keepId\` set to the preferred rule.\n`;
        }
        text += `\n---\n\n`;
      }

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // TOOL 16: fastr_resolve
  // ==========================================
  server.registerTool(
    'fastr_resolve',
    {
      description: 'Resolve a memory contradiction by picking the winning rule and superseding or weakening the loser.',
      inputSchema: {
        conflictId: z.number().describe('Conflict ID from fastr_conflicts'),
        keepId: z.string().describe('ID of the winning memory to preserve'),
        forgetLoser: z.boolean().default(false).describe('Set true to supersede the loser immediately; false weakens loser score by -0.4'),
        reason: z.string().optional().describe('Resolution rationale')
      }
    },
    async ({ conflictId, keepId, forgetLoser, reason }) => {
      try {
        const res = repo.resolveConflict(conflictId, keepId, forgetLoser, reason);
        const actionTaken = forgetLoser ? 'superseded' : 'penalized (-0.4)';
        return {
          content: [{
            type: 'text',
            text: `✅ **Resolved Conflict #${conflictId}**: Kept \`[${res.keptId}]\` as verified truth. Loser \`[${res.loserId}]\` was ${actionTaken}.`
          }]
        };
      } catch (err: any) {
        return {
          content: [{ type: 'text', text: `❌ **Failed to resolve conflict #${conflictId}**: ${err.message}` }]
        };
      }
    }
  );

  // ==========================================
  // TOOL 17: fastr_predict
  // ==========================================
  server.registerTool(
    'fastr_predict',
    {
      description: 'Record an effort/time/risk prediction or close an existing prediction with actual results.',
      inputSchema: {
        action: z.enum(['create', 'close', 'list']).default('create').describe('Action: create a new prediction, close with actual value, or list'),
        classTag: z.string().optional().describe('Reference class category (e.g. migration, refactor, bugfix)'),
        claimText: z.string().optional().describe('Forward-looking claim or task description'),
        estimateValue: z.number().optional().describe('Numerical estimate (e.g. 2.5)'),
        estimateUnit: z.string().optional().describe('Unit (e.g. hours, days, points)'),
        predictionId: z.number().optional().describe('Prediction ID to close (required when action=close)'),
        actualValue: z.number().optional().describe('Actual numerical outcome (required when action=close)')
      }
    },
    async ({ action, classTag, claimText, estimateValue, estimateUnit, predictionId, actualValue }) => {
      if (action === 'close') {
        if (!predictionId || actualValue === undefined) {
          return {
            content: [{ type: 'text', text: `❌ **Error**: \`predictionId\` and \`actualValue\` are required to close a prediction.` }]
          };
        }
        try {
          const closed = repo.closePrediction(predictionId, actualValue);
          const ratio = (closed.estimate_value && closed.estimate_value > 0)
            ? (actualValue / closed.estimate_value).toFixed(2)
            : 'N/A';
          return {
            content: [{
              type: 'text',
              text: `🎯 **Closed Prediction #${closed.id}** [${closed.class_tag}]: Estimated ${closed.estimate_value} ${closed.estimate_unit || ''} vs Actual ${closed.actual_value} (Ratio: ${ratio}x).`
            }]
          };
        } catch (err: any) {
          return { content: [{ type: 'text', text: `❌ **Error**: ${err.message}` }] };
        }
      }

      if (action === 'list') {
        const list = repo.listPredictions(config.projectId, { classTag });
        if (list.length === 0) {
          return { content: [{ type: 'text', text: `_No predictions found for project._` }] };
        }
        let text = `### Tracked Predictions (${list.length}):\n\n`;
        for (const p of list) {
          const statusIcon = p.closure_state === 'closed' ? '✅ CLOSED' : '⏳ OPEN';
          text += `- **#${p.id}** [${p.class_tag}] (${statusIcon}): "${p.claim_text}" — Est: ${p.estimate_value ?? '?'} ${p.estimate_unit || ''}`;
          if (p.actual_value !== null) text += ` | Act: ${p.actual_value}`;
          text += `\n`;
        }
        return { content: [{ type: 'text', text }] };
      }

      // Default: create
      if (!classTag || !claimText) {
        return {
          content: [{ type: 'text', text: `❌ **Error**: \`classTag\` and \`claimText\` are required to record a prediction.` }]
        };
      }

      const pred = repo.createPrediction({
        projectId: config.projectId,
        classTag,
        claimText,
        estimateValue,
        estimateUnit
      });

      // Also check if historical baserate exists to inform agent
      const baserate = repo.getPredictionBaserate(config.projectId, classTag);
      let text = `🎯 **Recorded Prediction #${pred.id}** [${pred.class_tag}]: "${pred.claim_text}" (Est: ${pred.estimate_value ?? '?'} ${pred.estimate_unit || ''})\n`;
      if (baserate) {
        text += `\n⚠️ **Planning Fallacy Calibration**: ${baserate.summary}\n`;
      }

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // TOOL 18: fastr_predict_baserate
  // ==========================================
  server.registerTool(
    'fastr_predict_baserate',
    {
      description: 'Get historical reference-class base-rate calibration statistics (Mean, Median p50 ratio, MAE) to debias agent planning.',
      inputSchema: {
        classTag: z.string().describe('Reference class category (e.g. migration, refactor, bugfix)')
      }
    },
    async ({ classTag }) => {
      const baserate = repo.getPredictionBaserate(config.projectId, classTag);
      if (!baserate) {
        return {
          content: [{
            type: 'text',
            text: `_No closed prediction history found for class [${classTag}]. Record estimates and outcomes with \`fastr_predict\` to build calibration data._`
          }]
        };
      }

      let text = `### 📊 Reference Class Calibration: [${baserate.classTag}]\n\n`;
      text += `- **Closed Samples**: ${baserate.count}\n`;
      text += `- **Mean Ratio (Actual / Est)**: ${baserate.meanRatio.toFixed(2)}x\n`;
      text += `- **Median Ratio (p50)**: ${baserate.medianRatio.toFixed(2)}x\n`;
      text += `- **Mean Absolute Error (MAE)**: ${baserate.mae.toFixed(2)}\n`;
      text += `- **Average Estimated**: ${baserate.meanEstimate.toFixed(1)}\n`;
      text += `- **Average Actual**: ${baserate.meanActual.toFixed(1)}\n\n`;
      text += `> **Debiasing Advice**: If estimating a task in this class, multiply your initial inside-view estimate by **${baserate.medianRatio.toFixed(2)}x** to avoid the Planning Fallacy.`;

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // TOOL 19: fastr_action_create
  // ==========================================
  server.registerTool(
    'fastr_action_create',
    {
      description: 'Create a new work item action in the Multi-Agent Action DAG with dependencies and conflict constraints.',
      inputSchema: {
        title: z.string().describe('Clear imperative title of the action'),
        description: z.string().optional().describe('Detailed action instructions or acceptance criteria'),
        priority: z.number().default(5).describe('Priority from 1 (lowest) to 10 (highest)'),
        requires: z.array(z.string()).optional().describe('Action IDs that must complete before this action is unblocked'),
        conflictsWith: z.array(z.string()).optional().describe('Action IDs that cannot run concurrently with this action'),
        assignedTo: z.string().optional().describe('Agent ID assigned to this action')
      }
    },
    async ({ title, description, priority, requires, conflictsWith, assignedTo }) => {
      const action = repo.createAction({
        projectId: config.projectId,
        title: scrubSecrets(title),
        description: description ? scrubSecrets(description) : '',
        priority,
        requires,
        conflictsWith,
        assignedTo
      });

      return {
        content: [{
          type: 'text',
          text: `📋 **Created Action [${action.id}]**: "${action.title}" (Priority: ${action.priority}, Status: ${action.status})`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 20: fastr_action_update
  // ==========================================
  server.registerTool(
    'fastr_action_update',
    {
      description: 'Update the lifecycle status, assignment, or crystallization of an action in the Action DAG.',
      inputSchema: {
        id: z.string().describe('Action ID to update'),
        status: z.enum(['pending', 'active', 'done', 'blocked', 'cancelled']).optional().describe('New lifecycle status'),
        assignedTo: z.string().optional().describe('Assign or reassign to an agent ID'),
        crystallizedInto: z.string().optional().describe('Memory ID crystallized upon completion of this action'),
        priority: z.number().optional().describe('Updated priority')
      }
    },
    async ({ id, status, assignedTo, crystallizedInto, priority }) => {
      const updated = repo.updateAction(id, {
        status,
        assignedTo,
        crystallizedInto,
        priority
      });

      if (!updated) {
        return { content: [{ type: 'text', text: `❌ **Error**: Action \`${id}\` not found.` }] };
      }

      return {
        content: [{
          type: 'text',
          text: `✅ **Updated Action [${updated.id}]**: Status changed to \`${updated.status}\`${updated.assigned_to ? ` (Assigned to: ${updated.assigned_to})` : ''}.`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 21: fastr_frontier
  // ==========================================
  server.registerTool(
    'fastr_frontier',
    {
      description: 'Get all unblocked, executable work item actions in the DAG whose prerequisites are satisfied and have no active conflicts.',
      inputSchema: {
        status: z.enum(['pending', 'active']).optional().describe('Optional status filter')
      }
    },
    async ({ status }) => {
      const frontier = repo.getFrontier(config.projectId);
      if (frontier.length === 0) {
        return {
          content: [{ type: 'text', text: `_Frontier is empty. No unblocked actions currently pending._` }]
        };
      }

      let text = `### 🚀 Action DAG Frontier (${frontier.length} unblocked actions):\n\n`;
      for (const a of frontier) {
        text += `- **[${a.id}]** [P${a.priority}] "${a.title}" — Status: \`${a.status}\`${a.assigned_to ? ` (Agent: \`${a.assigned_to}\`)` : ''}\n`;
        if (a.description) text += `  > ${a.description.slice(0, 100)}\n`;
      }

      return { content: [{ type: 'text', text }] };
    }
  );

  // ==========================================
  // TOOL 22: fastr_next
  // ==========================================
  server.registerTool(
    'fastr_next',
    {
      description: 'Atomically claim and return the highest-priority unblocked action ready for execution by an agent.',
      inputSchema: {
        agentId: z.string().optional().describe('Agent ID claiming this task (marks status as active)')
      }
    },
    async ({ agentId }) => {
      const next = repo.getNextAction(config.projectId, agentId);
      if (!next) {
        return {
          content: [{ type: 'text', text: `_No executable tasks available in frontier._` }]
        };
      }

      let text = `### 🎯 Next Claimed Action: [${next.id}]\n`;
      text += `- **Title**: ${next.title}\n`;
      text += `- **Priority**: ${next.priority}/10\n`;
      text += `- **Status**: \`${next.status}\`\n`;
      if (next.assigned_to) text += `- **Assigned To**: \`${next.assigned_to}\`\n`;
      if (next.description) text += `\n**Instructions**:\n${next.description}\n`;

      return { content: [{ type: 'text', text }] };
    }
  );

  // ==========================================
  // TOOL 23: fastr_slot_get
  // ==========================================
  server.registerTool(
    'fastr_slot_get',
    {
      description: 'Retrieve a bounded working memory slot (e.g. current_goal, user_preferences, active_hypothesis).',
      inputSchema: {
        slotKey: z.string().describe('Key identifying the working memory slot')
      }
    },
    async ({ slotKey }) => {
      const slot = repo.getSlot(config.projectId, slotKey);
      if (!slot) {
        return {
          content: [{ type: 'text', text: `_Working memory slot [${slotKey}] is empty._` }]
        };
      }

      return {
        content: [{
          type: 'text',
          text: `### 📌 Slot: [${slot.slot_key}]\n*(Updated: ${slot.updated_at} | Size: ${slot.content.length}/${slot.size_limit} chars)*\n\n${slot.content}`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 24: fastr_slot_set
  // ==========================================
  server.registerTool(
    'fastr_slot_set',
    {
      description: 'Store or update a bounded working memory slot. Enforces hard size bounds to avoid context bloat.',
      inputSchema: {
        slotKey: z.string().describe('Key identifying the working memory slot (e.g. current_goal)'),
        content: z.string().describe('Text content to store in the slot'),
        sizeLimit: z.number().default(4000).describe('Hard maximum character limit (default 4000)')
      }
    },
    async ({ slotKey, content, sizeLimit }) => {
      try {
        const scrubbed = scrubSecrets(content);
        const slot = repo.setSlot(config.projectId, slotKey, scrubbed, sizeLimit);
        return {
          content: [{
            type: 'text',
            text: `✅ **Updated Slot [${slot.slot_key}]**: ${slot.content.length}/${slot.size_limit} characters stored.`
          }]
        };
      } catch (err: any) {
        return {
          content: [{ type: 'text', text: `❌ **Failed to set slot**: ${err.message}` }]
        };
      }
    }
  );

  // ==========================================
  // TOOL 25: fastr_slot_list
  // ==========================================
  server.registerTool(
    'fastr_slot_list',
    {
      description: 'List all active bounded working memory slots and their size usages.',
      inputSchema: {
        filter: z.string().optional().describe('Optional slot key substring filter')
      }
    },
    async ({ filter }) => {
      let slots = repo.listSlots(config.projectId);
      if (filter) {
        slots = slots.filter((s) => s.slot_key.includes(filter.toLowerCase()));
      }
      if (slots.length === 0) {
        return {
          content: [{ type: 'text', text: `_No active working memory slots found._` }]
        };
      }

      let text = `### 📌 Active Working Memory Slots (${slots.length}):\n\n`;
      for (const s of slots) {
        text += `- **[${s.slot_key}]**: ${s.content.length}/${s.size_limit} chars (updated: ${s.updated_at})\n`;
      }
      return { content: [{ type: 'text', text }] };
    }
  );

  // ==========================================
  // TOOL 26: fastr_obsidian_export
  // ==========================================
  server.registerTool(
    'fastr_obsidian_export',
    {
      description: 'Export all project memories, entities, and links into an Obsidian-compatible markdown vault with YAML frontmatter, [[wikilinks]], and MOC.md.',
      inputSchema: {
        exportDir: z.string().describe('Target directory to output the Obsidian markdown vault')
      }
    },
    async ({ exportDir }) => {
      try {
        const res = exportToObsidianVault(db, config.projectId, exportDir);
        return {
          content: [{
            type: 'text',
            text: `💎 **Exported Obsidian Vault**: ${res.exportedCount} memories and ${res.entitiesCount} entities exported to \`${res.targetDir}\` with YAML frontmatter, wikilinks, and \`MOC.md\` index.`
          }]
        };
      } catch (err: any) {
        return {
          content: [{ type: 'text', text: `❌ **Failed to export Obsidian vault**: ${err.message}` }]
        };
      }
    }
  );

  // ==========================================
  // TOOL 27: fastr_federate
  // ==========================================
  server.registerTool(
    'fastr_federate',
    {
      description: 'Manage cross-repository organization federation. Inspect attached global memory databases or list shared rules.',
      inputSchema: {
        action: z.enum(['status', 'list_global', 'attach']).default('status').describe('Action: status, list_global, or attach custom global DB'),
        globalDbPath: z.string().optional().describe('Path to global database (required if action=attach)')
      }
    },
    async ({ action, globalDbPath }) => {
      if (action === 'attach') {
        if (!globalDbPath) {
          return { content: [{ type: 'text', text: '❌ **Error**: `globalDbPath` is required for attach action.' }] };
        }
        const ok = repo.attachGlobalDatabase(globalDbPath);
        return {
          content: [{
            type: 'text',
            text: ok
              ? `🌐 **Attached Global Federation DB**: Successfully attached \`${globalDbPath}\` as \`global_db\`.`
              : `❌ **Failed to attach**: Could not open or attach database at \`${globalDbPath}\`.`
          }]
        };
      }

      if (action === 'list_global') {
        const globals = repo.listGlobalMemories();
        if (globals.length === 0) {
          return { content: [{ type: 'text', text: '_No global organization memories currently recorded._' }] };
        }
        let text = `### 🌐 Global Organization Memories (${globals.length}):\n\n`;
        for (const g of globals) {
          text += `- **[${g.id}]** (${g.kind.toUpperCase()}) "${g.title}" [${g.module}] — Score: ${g.reward_score}\n`;
        }
        return { content: [{ type: 'text', text }] };
      }

      // Default: status
      const isAttached = repo.hasGlobalDb();
      const count = repo.listGlobalMemories().length;
      return {
        content: [{
          type: 'text',
          text: (
            `### 🌐 FastrMemory Cross-Repository Federation Status\n` +
            `- **Federation Active**: ${isAttached ? '✅ YES (`global_db` attached)' : '⚠️ NO (Standalone project mode)'}\n` +
            `- **Global Database Path**: \`${config.globalDbPath}\`\n` +
            `- **Global Shared Memories**: ${count}\n` +
            `Global rules and security error traps automatically protect every local repository on this machine without running daemons.`
          )
        }]
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
