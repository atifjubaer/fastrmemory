import * as path from 'node:path';
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

/**
 * Collects target file paths from either the CLI payload (`files` / `file`) or the JSON Claude Code
 * sends hooks on stdin (`tool_input.file_path`, always absolute). Paths are made project-relative
 * with forward slashes, matching how `file_links` stores them.
 */
export function extractTargetFiles(payload: Record<string, any>, projectRoot: string): string[] {
  const raw: string[] = [];
  if (Array.isArray(payload.files)) raw.push(...payload.files);
  if (typeof payload.file === 'string') raw.push(payload.file);
  const toolInput = payload.tool_input;
  if (toolInput && typeof toolInput === 'object') {
    if (typeof toolInput.file_path === 'string') raw.push(toolInput.file_path);
    if (typeof toolInput.notebook_path === 'string') raw.push(toolInput.notebook_path);
  }

  const root = path.resolve(projectRoot);
  const out = new Set<string>();
  for (const value of raw) {
    if (typeof value !== 'string' || !value.trim()) continue;
    let p = value.trim();
    if (path.isAbsolute(p)) {
      const rel = path.relative(root, p);
      if (rel && !rel.startsWith('..') && !path.isAbsolute(rel)) p = rel;
    }
    out.add(p.replace(/\\/g, '/'));
  }
  return [...out];
}

/**
 * Formats a hook result for Claude Code's stdout contract. SessionStart plain text is added to the
 * model's context; PreToolUse only reaches the model through `hookSpecificOutput.additionalContext`.
 * Other events' stdout only lands in the debug log, so they print nothing.
 */
export function toClaudeHookStdout(event: string, result: { output?: string }): string | null {
  if (!result.output) return null;
  const normalized = event.trim().toLowerCase();
  if (normalized === 'sessionstart') return result.output;
  if (normalized === 'pretooluse') {
    return JSON.stringify({
      hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: result.output },
    });
  }
  return null;
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
      const files = extractTargetFiles(payload, ctx.config.projectRoot);

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
      const toolName = payload.tool || payload.tool_name || 'unknown_tool';
      const errorMsg = payload.error || payload.message || 'Execution error';
      const file = extractTargetFiles(payload, ctx.config.projectRoot)[0] ?? null;

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
