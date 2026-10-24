import { McpServer, ResourceTemplate } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { MCP_SERVER_NAME, PACKAGE_VERSION } from '../version.js';
import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { initDatabase } from '../db/schema.js';
import { searchMemories } from '../search/hybrid-rrf.js';
import { scrubSecrets } from '../privacy/scrubber.js';
import { syncModulePage, syncAllModulePages } from '../mirror/markdown-pages.js';
import { FastrConfig, loadConfig } from '../config.js';
import { exportToObsidianVault } from '../export/obsidian.js';
import { assemblePromptContext } from './assemble.js';
import { predictFileBaseRate } from './predict.js';
import { compressFile, compressContent } from '../compress/markdown.js';
import { diagnoseDatabase, healDatabase } from '../db/doctor.js';
import { tagVisionAsset, searchVisionAssets } from '../vision/assets.js';
import { diffSnapshots, formatDiffMarkdown, replayAt } from '../replay/snapshot.js';
import {
  DEFAULT_MCP_TOOL_PROFILE,
  isMcpToolEnabled,
  McpToolProfile
} from './profiles.js';

// ==========================================
// Shared input bounds (keep tool/param names stable; skills depend on them)
// ==========================================
const ID = z.string().min(1).max(100);
const IDS = z.array(ID).max(100);
const PATH = z.string().min(1).max(1024);
const PATHS = z.array(PATH).max(200);
const MODULE = z.string().min(1).max(100);
const TAG = z.string().min(1).max(100);
const AGENT = z.string().min(1).max(200);
const TITLE = z.string().min(1).max(300);
const CONTENT = z.string().min(1).max(20_000);
const NOTE = z.string().max(2000);
const SLOT_KEY = z.string().min(1).max(100);
const LIMIT = z.number().int().min(1).max(200);
const BUDGET = z.number().int().min(50).max(16_000);
const PRIORITY = z.number().int().min(1).max(10);
const MAX_SLOT_CHARS = 8000;

type TextResult = { content: Array<{ type: 'text'; text: string }>; isError?: boolean };

function ok(text: string): TextResult {
  return { content: [{ type: 'text', text }] };
}

function fail(text: string): TextResult {
  return { isError: true, content: [{ type: 'text', text }] };
}

function errMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** Opaque pagination cursor for fastr_list: base64url("<created_at>|<id>"). */
export function encodeListCursor(createdAt: string, id: string): string {
  return Buffer.from(`${createdAt}|${id}`, 'utf8').toString('base64url');
}

export function decodeListCursor(cursor: string): { createdAt: string; id: string } | null {
  try {
    const raw = Buffer.from(cursor, 'base64url').toString('utf8');
    const sep = raw.lastIndexOf('|');
    if (sep <= 0 || sep === raw.length - 1) return null;
    return { createdAt: raw.slice(0, sep), id: raw.slice(sep + 1) };
  } catch {
    return null;
  }
}

export interface ServerContext {
  db: DatabaseSync;
  repo: FastrRepository;
  spool: SpoolManager;
  config: FastrConfig;
}

export function createFastrServerContext(customRoot?: string, homeDir?: string): ServerContext {
  const config = loadConfig(customRoot, homeDir);
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

export interface FastrMcpServerOptions {
  /** Tool surface to expose. Defaults to the 12-tool core profile. */
  profile?: McpToolProfile;
}

export function createFastrMcpServer(
  context?: ServerContext,
  options: FastrMcpServerOptions = {}
): McpServer {
  const ctx = context || createFastrServerContext();
  const { db, repo, config } = ctx;
  const profile = options.profile ?? DEFAULT_MCP_TOOL_PROFILE;

  const server = new McpServer({
    name: MCP_SERVER_NAME,
    version: PACKAGE_VERSION
  });

  // Every tool is recorded in the registry even when the active profile hides it, so
  // fastr_tools/fastr_call can reach the full surface from the 12-tool core profile.
  // Register only the tools selected by the profile. Resources and prompts stay
  // available in both profiles because their schema cost is small.
  const toolRegistry = new Map<string, { config: any; handler: any }>();
  const registerTool = ((name: string, toolConfig: any, handler: any): void => {
    toolRegistry.set(name, { config: toolConfig, handler });
    if (isMcpToolEnabled(profile, name)) {
      (server.registerTool as (n: string, c: any, h: any) => void)(name, toolConfig, handler);
    }
  }) as typeof server.registerTool;

  // ==========================================
  // TOOL 1: fastr_recall
  // ==========================================
  registerTool(
    'fastr_recall',
    {
      description: 'Triple-Stream hybrid search (BM25 + Vector + Graph) with progressive token budgeting and trap weighting.',
      inputSchema: z.object({
        query: z.string().min(1).max(4000).describe('Search query or task description'),
        files: PATHS.default([]).describe('Target file paths being inspected or edited'),
        module: MODULE.optional().describe('Filter by module (e.g. auth, db, api)'),
        budgetTokens: BUDGET.default(2000).describe('Token ceiling (e.g. 500, 1500, 4000)'),
        includeHistory: z.boolean().default(false).describe('Include historical superseded rules')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_drill',
    {
      description: 'Inspects verbatim raw observations (untruncated stack traces, diffs, tool outputs) for a memory or event.',
      inputSchema: z.object({
        memoryId: ID.optional().describe('Memory ID to retrieve verbatim source events for'),
        eventId: ID.optional().describe('Raw event ID to look up directly')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ memoryId, eventId }) => {
      if (!memoryId && !eventId) {
        return fail('Either `memoryId` or `eventId` must be provided.');
      }
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
  registerTool(
    'fastr_file_history',
    {
      description: 'Returns active rules, [TRAP] warnings, and historical decisions linked to a specific file path.',
      inputSchema: z.object({
        filePath: PATH.describe('File path to inspect (e.g. src/auth/jwt.ts)')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_remember',
    {
      description: 'Records a new rule, architectural decision, error trap, or workflow. Automatically scrubs credentials.',
      inputSchema: z.object({
        module: MODULE.default('general').describe('Module name (e.g. auth, db, api, ui)'),
        kind: z.enum(['rule', 'decision', 'error_trap', 'workflow']).describe('Kind of memory'),
        title: TITLE.describe('Concise headline title'),
        content: CONTENT.describe('Detailed actionable lesson or trap warning'),
        files: PATHS.default([]).describe('Related file paths'),
        symbols: z.array(z.string().min(1).max(300)).max(200).default([]).describe('Related symbol or function names'),
        verified: z.boolean().default(false).describe('Set true if already verified by passing tests'),
        pinned: z.boolean().default(false).describe('Pin to always surface during recall'),
        scope: z.enum(['project', 'global']).default('project').describe('Storage scope: project-local or organization-wide global')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
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

      const provBadge = mem.provenance_hash
        ? `\n- **Cryptographic Provenance**: \`prov_${mem.provenance_hash.slice(0, 12)}\` (SHA-256 authentic signature)`
        : '';

      return {
        content: [{
          type: 'text',
          text: `Recorded ${scope} memory [${mem.id}] (${mem.kind}) in module "${mem.module}" with status "${mem.status}".${provBadge}`
        }]
      };
    }
  );

  // ==========================================
  // TOOL 5: fastr_supersede
  // ==========================================
  registerTool(
    'fastr_supersede',
    {
      description: 'Retires an old memory rule and replaces it with a new verified rule, recording the reason for Git diffs.',
      inputSchema: z.object({
        oldMemoryId: ID.describe('ID of memory to supersede (e.g. mem_8f2a1c)'),
        newTitle: TITLE.describe('Updated title'),
        newContent: CONTENT.describe('Updated rule/lesson content'),
        reason: NOTE.min(1).describe('Reason for replacing old rule'),
        files: PATHS.optional().describe('Updated file paths')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false }
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
  registerTool(
    'fastr_feedback',
    {
      description: 'Scores outcome on one recalled memory (+0.2 good, -0.5 bad). Three consecutive bad outcomes make it dormant. Never penalizes the whole batch.',
      inputSchema: z.object({
        memoryId: ID.describe('Memory ID (e.g. mem_8f2a1c)'),
        outcome: z.enum(['good', 'bad']).describe('Good (+0.2) or Bad (-0.5) outcome'),
        note: NOTE.optional().describe('Optional explanation of why the advice was good or bad')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
    },
    async ({ memoryId, outcome, note }) => {
      if (!repo.getMemory(memoryId)) {
        return fail(`Memory not found: ${memoryId}`);
      }
      const res = repo.updateFeedback(memoryId, outcome, note);
      const noteText = note ? ` Note: "${note}".` : '';
      const dormancyText = res.bad_streak >= 3 && res.status === 'dormant'
        ? ' Dormancy triggered after 3 consecutive bad outcomes.'
        : '';
      return ok(
        `Updated feedback for [${memoryId}] (${outcome}): new reward_score = ${res.reward_score}, confidence = "${res.confidence_tier}", status = "${res.status}", bad_streak = ${res.bad_streak}.${dormancyText}${noteText}`
      );
    }
  );

  // ==========================================
  // TOOL 7: fastr_handoff
  // ==========================================
  registerTool(
    'fastr_handoff',
    {
      description: 'Saves or retrieves cross-agent session milestones. Promotes staging memories when verifyStaging=true.',
      inputSchema: z.object({
        action: z.enum(['save', 'latest']).describe('Action: "save" new milestone or "latest" to retrieve'),
        taskTitle: TITLE.optional().describe('Current task title (required for save)'),
        summary: CONTENT.optional().describe('Summary of progress completed (required for save)'),
        nextStep: NOTE.optional().describe('Immediate next action for the next agent session'),
        activeFiles: PATHS.default([]).describe('Active files modified during session'),
        verifyStaging: z.boolean().default(false).describe('Set true to promote session staging memories to verified')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
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
  registerTool(
    'fastr_status',
    {
      description: 'Returns health, memory counts, raw event counts, pending spool count, and embedding coverage %.',
      inputSchema: z.object({
        projectId: z.string().min(1).max(200).optional().describe('Project ID override')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_graph_query',
    {
      description: 'Query the code file-dependency graph to discover linked memories, error traps, and neighboring files (up to 2-hop structural links).',
      inputSchema: z.object({
        filePath: PATH.optional().describe('Center graph on specific file path to discover 1-hop & 2-hop connected rules and files'),
        depth: z.number().int().min(1).max(3).default(2).describe('Graph traversal depth (1 or 2 hops)')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_timeline',
    {
      description: 'Returns chronological audit trail of memories, verified rules, error traps, and historical supersessions.',
      inputSchema: z.object({
        module: MODULE.optional().describe('Filter timeline by module (e.g. auth, db)'),
        limit: LIMIT.default(25).describe('Max chronological entries to return')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ module: targetModule, limit }) => {
      const timeline = repo.getTimeline(config.projectId, { module: targetModule, limit });

      let text = `### FastrMemory Chronological Timeline (${timeline.length} events)\n\n`;
      if (timeline.length === 0) {
        text += `_No memory history found._\n`;
      } else {
        for (const item of timeline) {
          const kindBadge = item.kind === 'error_trap' ? '⚠️ [TRAP]' : `[${item.kind.toUpperCase()}]`;
          const statusBadge =
            item.status === 'superseded' ? '🔴 SUPERSEDED'
              : item.status === 'verified' ? '🟢 VERIFIED'
                : item.status === 'dormant' ? '⚪ DORMANT'
                  : '🟡 STAGING';
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
  registerTool(
    'fastr_snapshot',
    {
      description: 'Create an immutable point-in-time snapshot of all active memories and file links.',
      inputSchema: z.object({
        tag: z.string().min(1).max(100).describe('Descriptive version tag (e.g. v1.0, pre-auth-refactor)'),
        description: NOTE.optional().describe('Context or rationale for this snapshot')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
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
  registerTool(
    'fastr_rollback',
    {
      description: 'Revert project memory state to a previous snapshot, superseding newer erroneous rules.',
      inputSchema: z.object({
        snapshotId: ID.describe('The snapshot ID to restore (e.g. snap_xxxx)')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false }
    },
    async ({ snapshotId }) => {
      const res = repo.rollbackToSnapshot(config.projectId, snapshotId);
      let mirrorNote = '- Two-Zone Markdown mirrors synchronized.';
      try {
        syncAllModulePages(db, config.projectRoot, config.projectId);
      } catch (err) {
        mirrorNote = `- Warning: rollback applied, but Markdown mirror sync failed (${errMessage(err)}).`;
      }
      return {
        content: [{
          type: 'text',
          text: (
            `### Rolled Back Memory State\n` +
            `- **Restored Snapshot Tag**: \`${res.snapshotTag}\`\n` +
            `- **Active Memories Restored**: ${res.restoredCount}\n` +
            `- Newer conflicting memories have been marked \`superseded\`.\n` +
            mirrorNote
          )
        }]
      };
    }
  );

  // ==========================================
  // TOOL 13: fastr_trap_log (Rapid Error Trap Logger)
  // ==========================================
  registerTool(
    'fastr_trap_log',
    {
      description: 'Immediately logs an error trap diagnosed during a build failure or test error. Receives a conditional 2.0x recall boost for trap-intent or file-scoped queries.',
      inputSchema: z.object({
        title: TITLE.describe('Clear, imperative rule title (e.g. Never Use Date.now() for JWT Exp)'),
        content: CONTENT.describe('Exact explanation of the error trap and the concrete workaround/fix'),
        files: PATHS.describe('Code files affected by this error trap'),
        module: MODULE.default('general').describe('Module name (e.g. auth, db, api)')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
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

      // The trap is already persisted; a mirror failure must not surface as a tool
      // error, or agents retry and create duplicate traps.
      let mirrorWarning = '';
      try {
        syncAllModulePages(db, config.projectRoot, config.projectId);
      } catch (err) {
        mirrorWarning = `\n\nWarning: trap saved, but Markdown mirror sync failed (${errMessage(err)}). Do not retry the log call.`;
      }
      return ok(
        `⚠️ **Logged Error Trap [${mem.id}]**: "${mem.title}" linked to ${files.length} file(s) with a conditional 2.0x recall boost for trap-intent or file-scoped queries.${mirrorWarning}`
      );
    }
  );

  // ==========================================
  // TOOL 14: fastr_trap_recall
  // ==========================================
  registerTool(
    'fastr_trap_recall',
    {
      description: 'Fetch all active [TRAP] warnings protecting specific files before beginning an edit.',
      inputSchema: z.object({
        files: PATHS.describe('Target files about to be edited or inspected')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_conflicts',
    {
      description: 'List detected contradictory memories and policy conflicts requiring resolution.',
      inputSchema: z.object({
        status: z.enum(['open', 'resolved', 'ignored']).default('open').describe('Filter conflicts by status')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ status }) => {
      // Conflicts are analysed off the write path, so a read of the open registry first
      // drains any pending checks. This keeps the answer complete without slowing inserts.
      if (status === 'open') {
        let guard = 0;
        while (guard++ < 50 && repo.drainConflicts(20).drained > 0) { /* bounded catch-up */ }
      }
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
  registerTool(
    'fastr_resolve',
    {
      description: 'Resolve a memory contradiction by picking the winning rule and superseding or weakening the loser.',
      inputSchema: z.object({
        conflictId: z.number().int().min(1).describe('Conflict ID from fastr_conflicts'),
        keepId: ID.describe('ID of the winning memory to preserve'),
        forgetLoser: z.boolean().default(false).describe('Set true to supersede the loser immediately; false weakens loser score by -0.4'),
        reason: NOTE.optional().describe('Resolution rationale')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false }
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
          isError: true, content: [{ type: 'text', text: `❌ **Failed to resolve conflict #${conflictId}**: ${err.message}` }]
        };
      }
    }
  );

  // ==========================================
  // TOOL 17: fastr_predict
  // ==========================================
  registerTool(
    'fastr_predict',
    {
      description: 'Record an effort/time/risk prediction or close an existing prediction with actual results.',
      inputSchema: z.object({
        action: z.enum(['create', 'close', 'list']).default('create').describe('Action: create a new prediction, close with actual value, or list'),
        classTag: TAG.optional().describe('Reference class category (e.g. migration, refactor, bugfix)'),
        claimText: NOTE.optional().describe('Forward-looking claim or task description'),
        estimateValue: z.number().min(0).max(1_000_000).optional().describe('Numerical estimate (e.g. 2.5)'),
        estimateUnit: z.string().max(50).optional().describe('Unit (e.g. hours, days, points)'),
        predictionId: z.number().int().min(1).optional().describe('Prediction ID to close (required when action=close)'),
        actualValue: z.number().min(0).max(1_000_000).optional().describe('Actual numerical outcome (required when action=close)')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
    },
    async ({ action, classTag, claimText, estimateValue, estimateUnit, predictionId, actualValue }) => {
      if (action === 'close') {
        if (!predictionId || actualValue === undefined) {
          return {
            isError: true, content: [{ type: 'text', text: `❌ **Error**: \`predictionId\` and \`actualValue\` are required to close a prediction.` }]
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
          return { isError: true, content: [{ type: 'text', text: `❌ **Error**: ${err.message}` }] };
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
          isError: true, content: [{ type: 'text', text: `❌ **Error**: \`classTag\` and \`claimText\` are required to record a prediction.` }]
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
  registerTool(
    'fastr_predict_baserate',
    {
      description: 'Get historical reference-class base-rate calibration statistics (Mean, Median p50 ratio, MAE) to debias agent planning.',
      inputSchema: z.object({
        classTag: TAG.describe('Reference class category (e.g. migration, refactor, bugfix)')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_action_create',
    {
      description: 'Create a new work item action in the Multi-Agent Action DAG with dependencies and conflict constraints.',
      inputSchema: z.object({
        title: TITLE.describe('Clear imperative title of the action'),
        description: CONTENT.optional().describe('Detailed action instructions or acceptance criteria'),
        priority: PRIORITY.default(5).describe('Priority from 1 (lowest) to 10 (highest)'),
        requires: IDS.optional().describe('Action IDs that must complete before this action is unblocked'),
        conflictsWith: IDS.optional().describe('Action IDs that cannot run concurrently with this action'),
        assignedTo: AGENT.optional().describe('Agent ID assigned to this action')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
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
  registerTool(
    'fastr_action_update',
    {
      description: 'Update the lifecycle status, assignment, or crystallization of an action in the Action DAG.',
      inputSchema: z.object({
        id: ID.describe('Action ID to update'),
        status: z.enum(['pending', 'active', 'done', 'blocked', 'cancelled']).optional().describe('New lifecycle status'),
        assignedTo: AGENT.optional().describe('Assign or reassign to an agent ID'),
        crystallizedInto: ID.optional().describe('Memory ID crystallized upon completion of this action'),
        priority: PRIORITY.optional().describe('Updated priority')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false }
    },
    async ({ id, status, assignedTo, crystallizedInto, priority }) => {
      const updated = repo.updateAction(id, {
        status,
        assignedTo,
        crystallizedInto,
        priority
      });

      if (!updated) {
        return { isError: true, content: [{ type: 'text', text: `❌ **Error**: Action \`${id}\` not found.` }] };
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
  registerTool(
    'fastr_frontier',
    {
      description: 'Get all unblocked, executable work item actions in the DAG whose prerequisites are satisfied and have no active conflicts.',
      inputSchema: z.object({
        status: z.enum(['pending', 'active']).optional().describe('Optional status filter')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ status }) => {
      const frontier = repo.getFrontier(config.projectId).filter((a) => !status || a.status === status);
      if (frontier.length === 0) {
        return ok(status
          ? `_Frontier has no unblocked actions with status \`${status}\`._`
          : `_Frontier is empty. No unblocked actions currently pending._`);
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
  registerTool(
    'fastr_next',
    {
      description: 'Atomically claim and return the highest-priority unblocked action ready for execution by an agent.',
      inputSchema: z.object({
        agentId: AGENT.optional().describe('Agent ID claiming this task (marks status as active)')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
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
  registerTool(
    'fastr_slot_get',
    {
      description: 'Retrieve a bounded working memory slot (e.g. current_goal, user_preferences, active_hypothesis).',
      inputSchema: z.object({
        slotKey: SLOT_KEY.describe('Key identifying the working memory slot')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_slot_set',
    {
      description: 'Store or update a bounded working memory slot. Enforces hard size bounds to avoid context bloat.',
      inputSchema: z.object({
        slotKey: SLOT_KEY.describe('Key identifying the working memory slot (e.g. current_goal)'),
        content: z.string().max(MAX_SLOT_CHARS).describe('Text content to store in the slot'),
        sizeLimit: z.number().int().min(1).max(MAX_SLOT_CHARS).default(4000).describe('Hard maximum character limit (default 4000)')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false }
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
          isError: true, content: [{ type: 'text', text: `❌ **Failed to set slot**: ${err.message}` }]
        };
      }
    }
  );

  // ==========================================
  // TOOL 25: fastr_slot_list
  // ==========================================
  registerTool(
    'fastr_slot_list',
    {
      description: 'List all active bounded working memory slots and their size usages.',
      inputSchema: z.object({
        filter: z.string().max(100).optional().describe('Optional slot key substring filter')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
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
  registerTool(
    'fastr_obsidian_export',
    {
      description: 'Export all project memories, entities, and links into an Obsidian-compatible markdown vault with YAML frontmatter, [[wikilinks]], and MOC.md.',
      inputSchema: z.object({
        exportDir: PATH.describe('Target directory to output the Obsidian markdown vault')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false }
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
          isError: true, content: [{ type: 'text', text: `❌ **Failed to export Obsidian vault**: ${err.message}` }]
        };
      }
    }
  );

  // ==========================================
  // TOOL 27: fastr_federate
  // ==========================================
  registerTool(
    'fastr_federate',
    {
      description: 'Manage cross-repository organization federation. Inspect attached global memory databases or list shared rules.',
      inputSchema: z.object({
        action: z.enum(['status', 'list_global', 'attach']).default('status').describe('Action: status, list_global, or attach custom global DB'),
        globalDbPath: PATH.optional().describe('Path to global database (required if action=attach)')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false }
    },
    async ({ action, globalDbPath }) => {
      if (action === 'attach') {
        if (!globalDbPath) {
          return { isError: true, content: [{ type: 'text', text: '❌ **Error**: `globalDbPath` is required for attach action.' }] };
        }
        const attached = repo.attachGlobalDatabase(globalDbPath);
        if (!attached) {
          return fail(`❌ **Failed to attach**: Could not open or attach database at \`${globalDbPath}\`.`);
        }
        return ok(`🌐 **Attached Global Federation DB**: Successfully attached \`${globalDbPath}\` as \`global_db\`.`);
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
  // TOOL 28: fastr_assemble
  // ==========================================
  registerTool(
    'fastr_assemble',
    {
      description: 'Dynamically assembles an optimized, token-budgeted prompt context block (<fastr_context>) combining relevant rules, active 2.0x error traps for target files, frontier tasks, and session handoffs.',
      inputSchema: z.object({
        taskDescription: z.string().min(1).max(4000).describe('The task or objective the agent is about to execute'),
        targetFiles: PATHS.default([]).describe('Target file paths being inspected, created, or modified'),
        module: MODULE.optional().describe('Filter domain or module (e.g. auth, db, api, ui)'),
        budgetTokens: BUDGET.default(2000).describe('Max token allocation for the assembled context block'),
        agentId: AGENT.default('default').describe('Identifier of calling agent (e.g. claude-code, cursor-agent)')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ taskDescription, targetFiles, module, budgetTokens, agentId }) => {
      const res = await assemblePromptContext(db, repo, config.projectId, {
        taskDescription,
        targetFiles,
        module,
        budgetTokens,
        agentId,
      });

      return {
        content: [{
          type: 'text',
          text: (
            `### ⚡ Assembled Agent Context (${res.totalTokens} tokens)\n` +
            `- Traps: ${res.trapCount} | Rules: ${res.ruleCount} | Ready Tasks: ${res.frontierCount}\n\n` +
            res.contextXml
          )
        }]
      };
    }
  );

  // ==========================================
  // TOOL 29: fastr_risk_predict
  // ==========================================
  registerTool(
    'fastr_risk_predict',
    {
      description: 'Estimates pre-edit failure risk probability (0.0 to 1.0) and planning track record based on active error traps and historical bug churn for target files.',
      inputSchema: z.object({
        targetFiles: PATHS.describe('Target files being modified or planned'),
        module: MODULE.optional().describe('Target module name')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ targetFiles, module }) => {
      const res = predictFileBaseRate(db, repo, config.projectId, {
        targetFiles,
        module,
      });

      let text = `### 🎯 Predictive Failure Base-Rate Analysis\n\n`;
      text += `**Risk Level**: \`${res.riskLevel.toUpperCase()}\` (Score: **${(res.riskScore * 100).toFixed(0)}%**)\n`;
      text += `- **Active Error Traps**: ${res.trapCount}\n`;
      text += `- **Historical Bug Churn (Superseded)**: ${res.historicalBugCount}\n`;
      text += `- **Linked Verified Rules**: ${res.linkedRuleCount}\n\n`;
      text += `**Recommendations**:\n`;
      for (const rec of res.recommendations) {
        text += `- ${rec}\n`;
      }

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // TOOL 30: fastr_verify_provenance
  // ==========================================
  registerTool(
    'fastr_verify_provenance',
    {
      description: 'Verifies the cryptographic SHA-256 provenance signature of a memory to ensure authentic agent authoring and tamper-free storage.',
      inputSchema: z.object({
        memoryId: ID.describe('Memory ID to cryptographically verify (e.g. mem_8f2a1c)')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ memoryId }) => {
      if (!repo.getMemory(memoryId)) {
        return fail(`Memory not found: ${memoryId}`);
      }
      const res = repo.verifyMemoryProvenance(memoryId);
      let text = `### 🔒 Cryptographic Provenance Verification: \`${res.id}\`\n\n`;
      text += `- **Authenticity Status**: ${res.verified ? '✅ **AUTHENTIC & VERIFIED**' : '❌ **UNVERIFIED / TAMPERED**'}\n`;
      text += `- **Authoring Agent**: \`${res.agentId}\`\n`;
      text += `- **Timestamp**: ${res.createdAt || 'N/A'}\n`;
      text += `- **SHA-256 Signature**: \`${res.signature || 'NONE'}\`\n`;
      text += `- **Audit Details**: ${res.reason}\n`;

      return {
        content: [{ type: 'text', text }]
      };
    }
  );

  // ==========================================
  // TOOL 31: fastr_compress
  // ==========================================
  registerTool(
    'fastr_compress',
    {
      description: 'Compresses markdown files or text to reduce token usage while strictly preserving headings, URLs, and code blocks. Creates .original.md backup if filePath is provided.',
      inputSchema: z.object({
        filePath: PATH.optional().describe('Path to markdown or text file to compress on disk'),
        content: z.string().min(1).max(200_000).optional().describe('Direct text or markdown content to compress in-memory'),
        dryRun: z.boolean().default(false).describe('Preview compression savings without modifying file on disk')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false }
    },
    async ({ filePath, content, dryRun }) => {
      if (!filePath && !content) {
        return {
          isError: true, content: [{ type: 'text', text: '❌ Error: Either `filePath` or `content` must be provided.' }]
        };
      }

      let res;
      if (filePath) {
        res = compressFile(filePath, { dryRun });
      } else {
        res = compressContent(content || '', { dryRun });
      }

      if (!res.success) {
        return {
          isError: true, content: [{ type: 'text', text: `❌ Compression failed: ${res.error || 'Unknown error'}` }]
        };
      }

      let out = `### 🗜️ Fastr Compression Summary\n\n`;
      out += `- **Original Size**: ${res.originalChars} characters\n`;
      out += `- **Compressed Size**: ${res.compressedChars} characters\n`;
      out += `- **Token Savings**: ${(res.savingsRatio * 100).toFixed(1)}%\n`;
      if (res.backupPath) {
        out += `- **Safety Backup**: \`${res.backupPath}\`\n`;
      }
      if (dryRun) {
        out += `- **Dry Run Mode**: No files modified on disk.\n`;
      }
      if (res.warnings && res.warnings.length > 0) {
        out += `\n⚠️ **Warnings**:\n` + res.warnings.map(w => `- ${w}`).join('\n') + '\n';
      }
      if (!filePath && res.content) {
        out += `\n**Compressed Output**:\n\`\`\`markdown\n${res.content}\n\`\`\``;
      }

      return {
        content: [{ type: 'text', text: out }]
      };
    }
  );

  // ==========================================
  // TOOL 32: fastr_diagnose
  // ==========================================
  registerTool(
    'fastr_diagnose',
    {
      description: 'Performs comprehensive health checks across SQLite B-Trees, FTS5 BM25 search index consistency, orphaned file links, and multi-agent DAG frontiers.',
      inputSchema: z.object({
        category: z.enum(['integrity', 'fts5', 'file_links', 'actions', 'storage']).optional().describe('Optional diagnostic category filter')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ category }) => {
      const fullReport = diagnoseDatabase(db, config.projectId);
      const issues = category ? fullReport.issues.filter((iss) => iss.category === category) : fullReport.issues;
      const report = {
        ...fullReport,
        issues,
        totalIssues: category ? issues.length : fullReport.totalIssues,
        fixableIssues: category ? issues.filter((iss) => iss.fixable).length : fullReport.fixableIssues,
        healthy: category ? issues.length === 0 : fullReport.healthy,
      };
      let out = `### 🩺 FastrMemory Database Health Diagnostic${category ? ` (category: ${category})` : ''}\n\n`;
      out += `- **Overall Status**: ${report.healthy ? '✅ **HEALTHY**' : '⚠️ **ISSUES DETECTED**'}\n`;
      out += `- **Total Issues**: ${report.totalIssues} (${report.fixableIssues} fixable)\n`;
      out += `- **Active Memories**: ${report.metrics.memoryCount}\n`;
      out += `- **FTS5 Index Rows**: ${report.metrics.ftsRowCount}\n`;
      out += `- **File Links**: ${report.metrics.fileLinkCount}\n`;
      out += `- **Action Items**: ${report.metrics.actionCount}\n`;
      out += `- **SQLite Journal Mode**: \`${report.metrics.walMode}\`\n\n`;

      if (report.issues.length > 0) {
        out += `#### Issues Found:\n`;
        for (const iss of report.issues) {
          const icon = iss.severity === 'error' ? '❌' : '⚠️';
          out += `- ${icon} **[${iss.category.toUpperCase()}]** ${iss.description} (Fixable: ${iss.fixable ? 'Yes' : 'No'})\n`;
        }
        out += `\n_Run \`fastr_heal\` to automatically repair all fixable issues._`;
      } else {
        out += `_All database tables, FTS5 fulltext indices, and file graph relationships are 100% consistent._`;
      }

      return {
        content: [{ type: 'text', text: out }]
      };
    }
  );

  // ==========================================
  // TOOL 33: fastr_heal
  // ==========================================
  registerTool(
    'fastr_heal',
    {
      description: 'Auto-repairs all fixable database issues found by fastr_diagnose: rebuilds FTS5 BM25 indices, prunes orphaned file links, unblocks action DAGs, and runs WAL page truncation.',
      inputSchema: z.object({
        dryRun: z.boolean().default(false).describe('Preview actions to be taken without executing any writes')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false }
    },
    async ({ dryRun }) => {
      const result = healDatabase(db, config.projectId, { dryRun });
      let out = `### 💉 FastrMemory Self-Healing Doctor\n\n`;
      out += `- **Mode**: ${result.dryRun ? '🔍 **DRY RUN (Preview Only)**' : '⚡ **EXECUTED LIVE**'}\n`;
      out += `- **Issues Fixed**: ${result.fixedCount}\n`;
      out += `- **Remaining Issues**: ${result.remainingIssues}\n\n`;

      if (result.actionsTaken.length > 0) {
        out += `#### Actions Performed:\n`;
        for (const act of result.actionsTaken) {
          out += `- ✅ ${act}\n`;
        }
      } else {
        out += `_Database was already 100% healthy. Zero repairs required._`;
      }

      return {
        content: [{ type: 'text', text: out }]
      };
    }
  );

  // ==========================================
  // TOOL 34: fastr_vision_tag
  // ==========================================
  registerTool(
    'fastr_vision_tag',
    {
      description: 'Attaches a screenshot image, architecture diagram, or wireframe to long-term memory with OCR and semantic description for multimodal coding agents.',
      inputSchema: z.object({
        filePath: PATH.describe('Absolute or relative path to image file (PNG, JPG, WebP)'),
        description: CONTENT.describe('Detailed description of visual elements, UI components, layout, or diagram flow'),
        ocrText: CONTENT.optional().describe('Any visible text, error messages, or code labels inside the image'),
        memoryId: ID.optional().describe('Optional ID of governing rule or error trap ([mem_xxxx])'),
        taskId: ID.optional().describe('Optional ID of associated action task ([act_xxxx])')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false }
    },
    async ({ filePath, description, ocrText, memoryId, taskId }) => {
      const asset = await tagVisionAsset(db, {
        projectId: config.projectId,
        filePath,
        description,
        ocrText,
        memoryId,
        taskId
      });

      let out = `### 🖼️ Multimodal Vision Asset Tagged: \`${asset.id}\`\n\n`;
      out += `- **File**: \`${asset.file_path}\`\n`;
      out += `- **Description**: ${asset.description}\n`;
      if (asset.ocr_text) {
        out += `- **OCR Text**: \`${asset.ocr_text}\`\n`;
      }
      if (asset.memory_id) {
        out += `- **Linked Memory**: \`${asset.memory_id}\`\n`;
      }
      if (asset.task_id) {
        out += `- **Linked Action**: \`${asset.task_id}\`\n`;
      }
      out += `- **Vector Indexing**: ✅ 384-dim embedding generated and indexed.\n`;

      return {
        content: [{ type: 'text', text: out }]
      };
    }
  );

  // ==========================================
  // TOOL 35: fastr_vision_search
  // ==========================================
  registerTool(
    'fastr_vision_search',
    {
      description: 'Searches stored visual assets (screenshots, diagrams, error screens) via hybrid vector + keyword matching across descriptions and OCR text.',
      inputSchema: z.object({
        query: z.string().min(1).max(4000).describe('Search query (e.g. "login modal error banner", "architecture flow", "settings sidebar")'),
        limit: z.number().int().min(1).max(100).default(10).describe('Max results to return (default 10)'),
        memoryId: ID.optional().describe('Filter results to a specific memory ID')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ query, limit, memoryId }) => {
      const results = await searchVisionAssets(db, config.projectId, query, { limit, memoryId });
      if (results.length === 0) {
        return {
          content: [{ type: 'text', text: `_No visual assets matched query "${query}"._` }]
        };
      }

      let out = `### 🖼️ Visual Search Results (${results.length} found for "${query}")\n\n`;
      for (const r of results) {
        out += `#### [${r.id}] ${r.description} (Match Score: ${r.score})\n`;
        out += `- **Path**: \`${r.filePath}\`\n`;
        if (r.ocrText) {
          out += `- **OCR Text**: \`${r.ocrText}\`\n`;
        }
        if (r.memoryId) {
          out += `- **Linked Memory**: \`${r.memoryId}\`\n`;
        }
        if (r.taskId) {
          out += `- **Linked Action**: \`${r.taskId}\`\n`;
        }
        out += '\n';
      }

      return {
        content: [{ type: 'text', text: out }]
      };
    }
  );

  // ==========================================
  // Memory detail helper (shared by fastr_get and fastr://memory/{id})
  // ==========================================
  function memoryDetail(id: string) {
    const mem = repo.getMemory(id);
    if (!mem) return null;
    return {
      id: mem.id,
      project_id: mem.project_id,
      agent_id: mem.agent_id,
      module: mem.module,
      kind: mem.kind,
      title: mem.title,
      content: mem.content,
      status: mem.status,
      pinned: Boolean(mem.pinned),
      reward_score: mem.reward_score,
      retrieval_count: mem.retrieval_count,
      valid_from: mem.valid_from,
      valid_to: mem.valid_to,
      superseded_by: mem.superseded_by_id,
      superseded_reason: mem.superseded_reason,
      created_at: mem.created_at,
      last_recalled_at: mem.last_recalled_at,
      provenance_hash: mem.provenance_hash,
      files: repo.getFilesForMemory(mem.id),
    };
  }

  function parseSourceEventIds(raw: string): string[] {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
    } catch {
      return [];
    }
  }

  /**
   * Builds the stable envelope for one memory: metadata, cryptographic provenance, file/graph
   * links, and every conflict that names the memory. Conflict state is grouped so callers can
   * check `conflicts.open_count` without scanning the full list.
   */
  function memoryEnvelope(id: string) {
    const mem = repo.getMemory(id);
    if (!mem) return null;

    const provenance = repo.verifyMemoryProvenance(mem.id);
    const sourceEventIds = parseSourceEventIds(mem.source_event_ids);
    const sourceEvents = repo.getRawEventsForMemory(mem.id).map((event) => ({
      id: event.id,
      session_id: event.session_id,
      agent_id: event.agent_id,
      event_type: event.event_type,
      tool_name: event.tool_name,
      file_path: event.file_path,
      content_hash: event.content_hash,
      created_at: event.created_at
    }));

    const graphTable = mem.project_id === 'global' && repo.hasGlobalDb()
      ? 'global_db.graph_edges'
      : 'graph_edges';
    const graphEdges = db.prepare(`
      SELECT id, source_id, target_id, edge_type, weight, created_at
      FROM ${graphTable}
      WHERE project_id = ? AND (source_id = ? OR target_id = ?)
      ORDER BY created_at ASC
    `).all(mem.project_id, mem.id, mem.id) as Array<{
      id: string;
      source_id: string;
      target_id: string;
      edge_type: string;
      weight: number;
      created_at: string;
    }>;

    const conflictRows = db.prepare(`
      SELECT *
      FROM memory_conflicts
      WHERE project_id = ? AND (memory_a_id = ? OR memory_b_id = ?)
      ORDER BY CASE status WHEN 'open' THEN 0 ELSE 1 END, id DESC
    `).all(mem.project_id, mem.id, mem.id) as any[];

    const conflicts = conflictRows.map((conflict) => {
      const otherId = conflict.memory_a_id === mem.id ? conflict.memory_b_id : conflict.memory_a_id;
      const other = repo.getMemory(otherId);
      return {
        id: conflict.id,
        status: conflict.status,
        reason: conflict.reason,
        score: conflict.score,
        memory_a_id: conflict.memory_a_id,
        memory_b_id: conflict.memory_b_id,
        other_memory_id: otherId,
        other_memory_title: other?.title ?? null,
        other_memory_status: other?.status ?? null,
        resolved_winner_id: conflict.resolved_winner_id,
        created_at: conflict.created_at,
        resolved_at: conflict.resolved_at
      };
    });
    const openConflicts = conflicts.filter((conflict) => conflict.status === 'open');

    return {
      id: mem.id,
      metadata: {
        project_id: mem.project_id,
        scope: mem.project_id === 'global' ? 'global' : 'project',
        agent_id: mem.agent_id,
        module: mem.module,
        kind: mem.kind,
        title: mem.title,
        content: mem.content,
        status: mem.status,
        pinned: Boolean(mem.pinned),
        reward_score: mem.reward_score,
        retrieval_count: mem.retrieval_count,
        valid_from: mem.valid_from,
        valid_to: mem.valid_to,
        superseded_by: mem.superseded_by_id,
        superseded_reason: mem.superseded_reason,
        created_at: mem.created_at,
        last_recalled_at: mem.last_recalled_at,
        is_active: mem.valid_to === null && (mem.status === 'staging' || mem.status === 'verified')
      },
      provenance: {
        algorithm: 'sha256',
        signature: provenance.signature,
        verified: provenance.verified,
        reason: provenance.reason,
        source_event_ids: sourceEventIds,
        source_events: sourceEvents
      },
      links: {
        files: repo.getFilesForMemory(mem.id),
        graph: graphEdges.map((edge) => ({
          ...edge,
          direction: edge.source_id === mem.id ? 'outgoing' : 'incoming'
        }))
      },
      conflicts: {
        open_count: openConflicts.length,
        open: openConflicts,
        resolved: conflicts.filter((conflict) => conflict.status === 'resolved'),
        ignored: conflicts.filter((conflict) => conflict.status === 'ignored')
      }
    };
  }

  // ==========================================
  // TOOL 36: fastr_get
  // ==========================================
  registerTool(
    'fastr_get',
    {
      description: 'Fetch one memory by ID with full content, linked files, status, bi-temporal validity (valid_from/valid_to), and superseded_by.',
      inputSchema: z.object({
        id: ID.describe('Memory ID (e.g. mem_8f2a1c)')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ id }) => {
      const detail = memoryDetail(id);
      if (!detail) return fail(`Memory not found: ${id}`);
      return {
        content: [{ type: 'text', text: JSON.stringify(detail, null, 2) }],
        structuredContent: detail
      };
    }
  );

  // ==========================================
  // TOOL 37: fastr_list
  // ==========================================
  registerTool(
    'fastr_list',
    {
      description: 'Page through memories (newest first) filtered by module, kind, and status. Returns {items, nextCursor}; pass nextCursor back as `cursor` for the next page.',
      inputSchema: z.object({
        module: MODULE.optional().describe('Filter by module (e.g. auth, db, api)'),
        kind: z.enum(['rule', 'decision', 'error_trap', 'workflow']).optional().describe('Filter by memory kind'),
        status: z.enum(['active', 'staging', 'verified', 'superseded', 'all']).default('active')
          .describe('Status filter: active = staging+verified and currently valid (default); all = no filter'),
        limit: LIMIT.default(50).describe('Page size (1-200, default 50)'),
        cursor: z.string().max(512).optional().describe('Opaque cursor from a previous fastr_list call')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ module: mod, kind, status, limit, cursor }) => {
      const where: string[] = [`(project_id = ? OR project_id = 'global')`];
      const params: Array<string | number> = [config.projectId];

      if (mod) {
        where.push('module = ?');
        params.push(mod.trim().toLowerCase());
      }
      if (kind) {
        where.push('kind = ?');
        params.push(kind);
      }
      if (status === 'active') {
        where.push(`valid_to IS NULL AND status IN ('staging', 'verified')`);
      } else if (status !== 'all') {
        where.push('status = ?');
        params.push(status);
      }
      if (cursor) {
        const c = decodeListCursor(cursor);
        if (!c) return fail(`Invalid cursor: ${cursor}`);
        where.push('(created_at < ? OR (created_at = ? AND id < ?))');
        params.push(c.createdAt, c.createdAt, c.id);
      }

      const rows = db.prepare(`
        SELECT id, title, kind, module, status, reward_score, created_at
        FROM memories
        WHERE ${where.join(' AND ')}
        ORDER BY created_at DESC, id DESC
        LIMIT ?
      `).all(...params, limit + 1) as Array<{
        id: string; title: string; kind: string; module: string; status: string; reward_score: number; created_at: string;
      }>;

      const page = rows.slice(0, limit);
      const last = page[page.length - 1];
      const nextCursor = rows.length > limit && last ? encodeListCursor(last.created_at, last.id) : null;
      const items = page.map(({ id, title, kind: k, module: m, status: s, reward_score }) => ({
        id, title, kind: k, module: m, status: s, reward_score
      }));
      const payload = { items, nextCursor };

      return {
        content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload
      };
    }
  );

  // ==========================================
  // TOOL 38: fastr_forget
  // ==========================================
  registerTool(
    'fastr_forget',
    {
      description: 'Retire a memory without a replacement (marks it superseded with valid_to = now and records the reason). Use fastr_supersede instead when a corrected rule exists.',
      inputSchema: z.object({
        id: ID.describe('Memory ID to forget (e.g. mem_8f2a1c)'),
        reason: NOTE.min(1).optional().describe('Why this memory is being retired')
      }),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false }
    },
    async ({ id, reason }) => {
      const mem = repo.getMemory(id);
      if (!mem) return fail(`Memory not found: ${id}`);

      repo.forgetMemory(id, reason ? scrubSecrets(reason) : 'Forgotten via fastr_forget');

      let mirrorWarning = '';
      if (mem.project_id !== 'global') {
        try {
          syncModulePage(db, config.projectRoot, config.projectId, mem.module);
        } catch (err) {
          mirrorWarning = ` Warning: Markdown mirror sync failed (${errMessage(err)}).`;
        }
      }
      return ok(`Forgot memory [${id}] "${mem.title}" (status now "superseded").${mirrorWarning}`);
    }
  );

  // ==========================================
  // TOOL 39: fastr_pin
  // ==========================================
  registerTool(
    'fastr_pin',
    {
      description: 'Pin or unpin a memory. Pinned memories always surface first during recall.',
      inputSchema: z.object({
        id: ID.describe('Memory ID (e.g. mem_8f2a1c)'),
        pinned: z.boolean().describe('true to pin, false to unpin')
      }),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false }
    },
    async ({ id, pinned }) => {
      const mem = repo.getMemory(id);
      if (!mem) return fail(`Memory not found: ${id}`);
      repo.pinMemory(id, pinned);
      return ok(`${pinned ? 'Pinned' : 'Unpinned'} memory [${id}] "${mem.title}".`);
    }
  );

  // ==========================================
  // TOOL 40: fastr_replay
  // ==========================================
  registerTool(
    'fastr_replay',
    {
      description: 'Reconstruct the active memory set at a past ISO timestamp from bi-temporal valid_from/valid_to windows.',
      inputSchema: z.object({
        at: z.string().min(10).max(40).optional().describe('ISO timestamp (default: now)')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ at }) => {
      try {
        const snapshot = replayAt(db, config.projectId, at || new Date().toISOString());
        const lines = snapshot.memories.map(
          (memory) => `- [${memory.id}] ${memory.title} (${memory.module}, ${memory.kind}, ${memory.status})`
        );
        return ok(
          `### Replay at ${snapshot.at}\n` +
          `- **Content hash**: \`${snapshot.contentHash}\`\n` +
          `- **Active**: ${snapshot.memories.length} | **History**: ${snapshot.history.length} | **Raw events**: ${snapshot.events.length} | **Tokens**: ~${snapshot.tokenCount}\n\n` +
          (lines.length > 0 ? lines.join('\n') : '_No active memories at this timestamp._')
        );
      } catch (err) {
        return fail(`Replay failed: ${errMessage(err)}`);
      }
    }
  );

  // ==========================================
  // TOOL 41: fastr_diff
  // ==========================================
  registerTool(
    'fastr_diff',
    {
      description: 'Compare two memory states and report added, superseded, changed, still-active, and conflicted memories with a token delta.',
      inputSchema: z.object({
        fromAt: z.string().min(10).max(40).describe('Base ISO timestamp'),
        toAt: z.string().min(10).max(40).describe('Head ISO timestamp')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ fromAt, toAt }) => {
      try {
        const from = replayAt(db, config.projectId, fromAt);
        const to = replayAt(db, config.projectId, toAt);
        return ok(formatDiffMarkdown(diffSnapshots(from, to)));
      } catch (err) {
        return fail(`Diff failed: ${errMessage(err)}`);
      }
    }
  );

  // ==========================================
  // TOOL 42: fastr_tools
  // ==========================================
  const META_TOOL_NAMES: ReadonlySet<string> = new Set(['fastr_tools', 'fastr_call']);

  registerTool(
    'fastr_tools',
    {
      description: 'Lists the memory tools this server can run, with their input schemas. Use fastr_call to execute any listed tool.',
      inputSchema: z.object({
        query: z.string().max(200).optional().describe('Filter by tool name or description'),
        limit: z.number().int().min(1).max(50).default(20).describe('Maximum tools to return')
      }),
      annotations: { readOnlyHint: true, openWorldHint: false }
    },
    async ({ query, limit }) => {
      const needle = (query ?? '').trim().toLowerCase();
      const entries = [...toolRegistry.entries()]
        .filter(([name]) => !META_TOOL_NAMES.has(name))
        .filter(([name, entry]) => {
          if (!needle) return true;
          return (
            name.toLowerCase().includes(needle) ||
            String(entry.config?.description ?? '').toLowerCase().includes(needle)
          );
        })
        .map(([name, entry]) => {
          let inputSchema: unknown;
          try {
            inputSchema = z.toJSONSchema(entry.config.inputSchema);
          } catch {
            inputSchema = undefined;
          }
          return { name, description: entry.config?.description ?? '', inputSchema };
        });

      const tools = entries.slice(0, limit);
      return ok(
        JSON.stringify({ total: entries.length, returned: tools.length, tools }, null, 2)
      );
    }
  );

  // ==========================================
  // TOOL 43: fastr_call
  // ==========================================
  registerTool(
    'fastr_call',
    {
      description: 'Runs any tool from fastr_tools by name. Arguments are validated against that tool\'s input schema before dispatch.',
      inputSchema: z.object({
        tool: z.string().min(1).max(80).describe('Tool name from fastr_tools, e.g. fastr_list or fastr_export'),
        args: z.record(z.string(), z.unknown()).default({}).describe('Arguments object for the target tool')
      }),
      annotations: { openWorldHint: true }
    },
    async ({ tool, args }) => {
      if (META_TOOL_NAMES.has(tool)) {
        return fail(`fastr_call cannot invoke ${tool}.`);
      }
      const entry = toolRegistry.get(tool);
      if (!entry) {
        return fail(`Unknown tool "${tool}". Use fastr_tools to list available tools.`);
      }

      const schema = entry.config?.inputSchema;
      const parsed = schema && typeof schema.safeParse === 'function'
        ? schema.safeParse(args ?? {})
        : { success: true as const, data: args ?? {} };
      if (!parsed.success) {
        return fail(`Invalid arguments for ${tool}: ${parsed.error.message}`);
      }

      try {
        return await entry.handler(parsed.data);
      } catch (err) {
        return fail(`${tool} failed: ${errMessage(err)}`);
      }
    }
  );

  // ==========================================
  // PROMPT 1: pre-edit-check
  // ==========================================
  server.registerPrompt(
    'pre-edit-check',
    {
      title: 'Pre-Edit Memory Check',
      description: 'Check active error traps and relevant rules for files before editing them.',
      argsSchema: z.object({
        files: z.string().min(1).max(8000).describe('Comma-separated file paths about to be edited')
      })
    },
    ({ files }) => {
      const list = files.split(',').map((f) => f.trim()).filter(Boolean);
      const json = JSON.stringify(list);
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: (
              `Before editing these files, check FastrMemory:\n` +
              list.map((f) => `- ${f}`).join('\n') + '\n\n' +
              `1. Call \`fastr_trap_recall\` with \`{ "files": ${json} }\` and treat every [TRAP] returned as a hard constraint.\n` +
              `2. Call \`fastr_recall\` with \`{ "query": "<one-line description of the planned change>", "files": ${json} }\` to load the active rules and decisions for these files.\n` +
              `3. Summarize the traps and rules that apply, then plan the edit so it does not violate any of them. ` +
              `If a recalled rule looks wrong for this task, say so instead of silently ignoring it.`
            )
          }
        }]
      };
    }
  );

  // ==========================================
  // PROMPT 2: session-wrap-up
  // ==========================================
  server.registerPrompt(
    'session-wrap-up',
    {
      title: 'Session Wrap-Up',
      description: 'End-of-session checklist: log traps, supersede outdated rules, score recalled memories, save a handoff.'
    },
    () => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: (
            `Wrap up this session in FastrMemory. Do each step that applies:\n\n` +
            `1. **Traps**: for every build error, test failure, or runtime bug you diagnosed and fixed this session, ` +
            `call \`fastr_trap_log\` once (title, content with the cause and fix, files, module). Do not log duplicates.\n` +
            `2. **Supersede**: if a recalled rule or decision turned out to be wrong or outdated, call \`fastr_supersede\` ` +
            `with \`oldMemoryId\`, the corrected \`newTitle\`/\`newContent\`, and a \`reason\`.\n` +
            `3. **Feedback**: for each memory ID you actually relied on, call \`fastr_feedback\` with \`outcome: "good"\` ` +
            `if it helped or \`"bad"\` if it misled you (add a short \`note\`). Score individual IDs, never the whole batch.\n` +
            `4. **Handoff**: call \`fastr_handoff\` with \`action: "save"\`, \`taskTitle\`, \`summary\`, \`nextStep\`, \`activeFiles\`, ` +
            `and \`verifyStaging: true\` only if the automated tests pass, so staging memories graduate to verified.`
          )
        }
      }]
    })
  );

  // ==========================================
  // RESOURCE TEMPLATE: fastr://memory/{id}/envelope
  // ==========================================
  server.registerResource(
    'memory-envelope',
    new ResourceTemplate('fastr://memory/{id}/envelope', { list: undefined }),
    { description: 'A memory envelope: metadata, provenance, links, and conflict state (JSON)', mimeType: 'application/json' },
    async (uri, variables) => {
      const raw = variables.id;
      const id = decodeURIComponent(Array.isArray(raw) ? raw[0] ?? '' : String(raw ?? ''));
      const envelope = memoryEnvelope(id);
      if (!envelope) {
        throw new Error(`Memory not found: ${id}`);
      }
      return {
        contents: [{ uri: uri.href, text: JSON.stringify(envelope, null, 2), mimeType: 'application/json' }]
      };
    }
  );

  // ==========================================
  // RESOURCE TEMPLATE: fastr://memory/{id}
  // ==========================================
  server.registerResource(
    'memory',
    new ResourceTemplate('fastr://memory/{id}', { list: undefined }),
    { description: 'A single memory by ID (JSON, including linked files and validity window)', mimeType: 'application/json' },
    async (uri, variables) => {
      const raw = variables.id;
      const id = decodeURIComponent(Array.isArray(raw) ? raw[0] ?? '' : String(raw ?? ''));
      const detail = memoryDetail(id);
      if (!detail) {
        throw new Error(`Memory not found: ${id}`);
      }
      return {
        contents: [{ uri: uri.href, text: JSON.stringify(detail, null, 2), mimeType: 'application/json' }]
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
      const trapCount = repo.listTraps(config.projectId).length;
      const text = (
        `# Project Memory: ${config.projectName}\n` +
        `Active rules: ${status.activeCount} | Traps: ${trapCount} | Events: ${status.rawEventCount}\n` +
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
