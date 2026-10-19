import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { syncAllModulePages } from '../mirror/markdown-pages.js';
import { FastrConfig } from '../config.js';

export interface HookContext {
  db: DatabaseSync;
  repo: FastrRepository;
  spool: SpoolManager;
  config: FastrConfig;
}

export function runLifecycleHook(
  ctx: HookContext,
  event: string,
  payload: Record<string, any> = {}
): { handled: boolean; message: string; output?: string } {
  const normalizedEvent = event.trim().toLowerCase();

  switch (normalizedEvent) {
    case 'sessionstart': {
      const handoff = ctx.repo.getLatestHandoff(ctx.config.projectId);
      const frontier = ctx.repo.getFrontier(ctx.config.projectId);
      const status = ctx.repo.getStatus(ctx.config.projectId);

      let text = `⚡ FastrMemory Active [${ctx.config.projectName}]: ${status.activeCount} rules/traps indexed.\n`;
      if (handoff) {
        text += `- **Prior Handoff**: "${handoff.task_title}" -> Next: ${handoff.next_step}\n`;
      }
      if (frontier.length > 0) {
        text += `- **Unblocked DAG Tasks (${frontier.length})**: Next is [${frontier[0].id}] "${frontier[0].title}"\n`;
      }

      return {
        handled: true,
        message: 'SessionStart hook executed',
        output: text,
      };
    }

    case 'pretooluse': {
      const files: string[] = Array.isArray(payload.files)
        ? payload.files
        : (payload.file ? [payload.file] : []);

      if (files.length === 0) {
        return { handled: true, message: 'No target files specified in tool invocation.' };
      }

      const traps: any[] = [];
      for (const f of files) {
        const mems = ctx.repo.getMemoriesForFile(ctx.config.projectId, f);
        for (const m of mems) {
          if (m.kind === 'error_trap' && !traps.some((t) => t.id === m.id)) {
            traps.push(m);
          }
        }
      }

      if (traps.length > 0) {
        let text = `⚠️ FASTRMEMORY TRAP WARNING: ${traps.length} active error traps for target files:\n`;
        for (const t of traps) {
          text += `- [${t.id}] ${t.title}: ${t.content}\n`;
        }
        return { handled: true, message: 'Active error traps detected', output: text };
      }

      return { handled: true, message: 'Safe to proceed: no active traps.' };
    }

    case 'posttoolusefailure': {
      const toolName = payload.tool || 'unknown_tool';
      const errorMsg = payload.error || payload.message || 'Execution error';
      const file = payload.file || null;

      // Fast async spool entry (<1ms)
      ctx.spool.append({
        project_id: ctx.config.projectId,
        session_id: 'hook-session',
        agent_id: payload.agentId || 'default',
        event_type: 'tool_error',
        tool_name: toolName,
        file_path: file,
        raw_payload: JSON.stringify({ error: errorMsg, context: payload.context || {} }),
        content_hash: Buffer.from(`${toolName}:${errorMsg}:${Date.now()}`).toString('hex').slice(0, 32),
      });

      return {
        handled: true,
        message: `Spooled failure observation for ${toolName}`,
      };
    }

    case 'precompact': {
      const tag = `auto-precompact-${new Date().toISOString().replace(/[:.]/g, '-')}`;
      const snap = ctx.repo.createSnapshot(
        ctx.config.projectId,
        tag,
        'Automatic checkpoint captured before context compaction'
      );
      return {
        handled: true,
        message: `Captured pre-compact snapshot [${snap.id}] tagged "${snap.tag}".`,
      };
    }

    case 'sessionend': {
      if (ctx.spool.hasPending()) {
        try {
          ctx.spool.drain(ctx.db);
        } catch {}
      }
      syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
      return {
        handled: true,
        message: 'Flushed spool and mirrored Markdown pages on session end.',
      };
    }

    default:
      return { handled: false, message: `Unknown lifecycle event: ${event}` };
  }
}
