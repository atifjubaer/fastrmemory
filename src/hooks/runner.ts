import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { syncAllModulePages } from '../mirror/markdown-pages.js';
import { FastrConfig } from '../config.js';
import { buildPerTurnContext } from './per-turn.js';
import { distillSessionTraps } from '../learn/passive-distillation.js';

export interface HookContext {
  db: DatabaseSync;
  repo: FastrRepository;
  spool: SpoolManager;
  config: FastrConfig;
}

/**
 * Collects target file paths from CLI payloads (`files` / `file`), Claude's `tool_input`, or
 * Copilot's `toolArgs` (camelCase `path` / `filePath`). Paths are made project-relative with
 * forward slashes, matching how `file_links` stores them.
 */
export function extractTargetFiles(payload: Record<string, any>, projectRoot: string): string[] {
  const raw: string[] = [];
  if (Array.isArray(payload.files)) raw.push(...payload.files);
  if (typeof payload.file === 'string') raw.push(payload.file);

  let toolInput = payload.tool_input ?? payload.toolArgs ?? payload.tool_args;
  if (typeof toolInput === 'string') {
    try {
      toolInput = JSON.parse(toolInput);
    } catch {
      toolInput = undefined;
    }
  }
  if (toolInput && typeof toolInput === 'object') {
    for (const key of ['file_path', 'filePath', 'notebook_path', 'notebookPath', 'path']) {
      if (typeof toolInput[key] === 'string') raw.push(toolInput[key]);
    }
    if (Array.isArray(toolInput.edits)) {
      for (const edit of toolInput.edits) {
        if (edit && typeof edit === 'object') {
          if (typeof edit.file_path === 'string') raw.push(edit.file_path);
          if (typeof edit.filePath === 'string') raw.push(edit.filePath);
          if (typeof edit.path === 'string') raw.push(edit.path);
        }
      }
    }
    if (typeof toolInput.patch === 'string') {
      for (const match of toolInput.patch.matchAll(/^\*\*\* (?:Add|Update|Delete) File: (.+)$/gm)) {
        raw.push(match[1].trim());
      }
    }
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
 * model's context; PreToolUse and UserPromptSubmit only reach the model through
 * `hookSpecificOutput.additionalContext`. Other events' stdout only lands in the debug log, so
 * they print nothing.
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
  if (normalized === 'userpromptsubmit') {
    return JSON.stringify({
      hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: result.output },
    });
  }
  return null;
}

/**
 * Formats a hook result for Gemini CLI, which requires exactly one JSON object on stdout.
 * SessionStart injects context; BeforeTool shows trap warnings to the user (Gemini has no
 * documented model-facing additionalContext for BeforeTool); compaction and session-end are
 * advisory messages.
 */
export function toGeminiHookStdout(
  event: string,
  result: { output?: string; message?: string }
): string | null {
  const normalized = event.trim().toLowerCase();
  const context = result.output?.trim();
  switch (normalized) {
    case 'sessionstart':
      return context
        ? JSON.stringify({
            hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: context },
          })
        : JSON.stringify({});
    case 'pretooluse':
      return context
        ? JSON.stringify({
            systemMessage: context,
            hookSpecificOutput: { hookEventName: 'BeforeTool', additionalContext: context },
          })
        : JSON.stringify({});
    case 'precompact':
    case 'sessionend':
      return JSON.stringify(result.message ? { systemMessage: result.message } : {});
    default:
      return null;
  }
}

/**
 * Formats a hook result for GitHub Copilot CLI. SessionStart injects `additionalContext`;
 * preToolUse has no advisory field, so an active trap asks the user before the edit (Copilot
 * treats `ask` as deny in autopilot/non-interactive mode). Other events are notification-only.
 */
export function toCopilotHookStdout(
  event: string,
  result: { output?: string; message?: string }
): string | null {
  const normalized = event.trim().toLowerCase();
  const context = result.output?.trim();
  switch (normalized) {
    case 'sessionstart':
      return JSON.stringify(context ? { additionalContext: context } : {});
    case 'pretooluse':
      return JSON.stringify(context
        ? { permissionDecision: 'ask', permissionDecisionReason: context }
        : {});
    case 'precompact':
    case 'sessionend':
      return JSON.stringify({});
    default:
      return null;
  }
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

      // Record the edit target so the per-turn block knows which files the agent is working
      // in. The write is a spool append, so it costs well under a millisecond and never
      // contends for the database lock.
      ctx.spool.append({
        project_id: ctx.config.projectId,
        session_id: String(payload.session_id ?? 'hook-session'),
        agent_id: payload.agentId || 'default',
        event_type: 'tool_edit',
        tool_name: payload.tool || payload.tool_name || null,
        file_path: files[0] ?? null,
        raw_payload: JSON.stringify({ files }),
        content_hash: files.join('|'),
      });

      if (traps.length > 0) {
        let text = `⚠️ FASTRMEMORY TRAP WARNING: ${traps.length} active error traps for target files:\n`;
        for (const t of traps) {
          text += `- [${t.id}] ${t.title}: ${t.content}\n`;
        }
        return { handled: true, message: 'Active error traps detected', output: text };
      }

      return { handled: true, message: 'Safe to proceed: no active traps.' };
    }

    case 'userpromptsubmit': {
      // Memory that only arrives on SessionStart is gone after compaction, and memory that
      // arrives only when the model calls `fastr_recall` depends on the model's discipline.
      // This injects a small block every turn, so the memory arrives regardless.
      const prompt = typeof payload.prompt === 'string'
        ? payload.prompt
        : typeof payload.user_prompt === 'string'
          ? payload.user_prompt
          : '';

      // The edit events this block depends on are still in the spool; they are only drained
      // on SessionEnd. Drain first so the block reflects the edits made this session.
      if (ctx.spool.hasPending()) {
        try {
          ctx.spool.drain(ctx.db);
        } catch {}
      }

      const block = buildPerTurnContext(ctx.db, ctx.repo, ctx.config.projectId, { prompt });
      if (!block.text) {
        return { handled: true, message: 'No per-turn context to inject.' };
      }

      return {
        handled: true,
        message: 'UserPromptSubmit hook executed',
        output: block.text,
      };
    }

    case 'posttoolusefailure': {
      const toolName = payload.tool || payload.tool_name || 'unknown_tool';
      const errorMsg = payload.error || payload.message || 'Execution error';
      const file = extractTargetFiles(payload, ctx.config.projectRoot)[0] ?? null;
      const sessionId = String(payload.session_id ?? payload.sessionId ?? 'hook-session');

      // Fast async spool entry (<1ms)
      ctx.spool.append({
        project_id: ctx.config.projectId,
        session_id: sessionId,
        agent_id: payload.agentId || 'default',
        event_type: 'tool_error',
        tool_name: toolName,
        file_path: file,
        raw_payload: JSON.stringify({ error: errorMsg, context: payload.context || {} }),
        content_hash: Buffer.from(`${toolName}:${errorMsg}`).toString('hex').slice(0, 32),
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
      const sessionId = payload.session_id ? String(payload.session_id) : undefined;
      distillSessionTraps(ctx.db, ctx.config.projectId, sessionId);
      syncAllModulePages(ctx.db, ctx.config.projectRoot, ctx.config.projectId);
      return {
        handled: true,
        message: 'Flushed spool, passively distilled error traps, and mirrored Markdown pages on session end.',
      };
    }

    default:
      return { handled: false, message: `Unknown lifecycle event: ${event}` };
  }
}
