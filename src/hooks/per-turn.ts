import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { estimateTokens } from '../search/budget.js';

/**
 * The per-turn budget. The block goes into every prompt, so its cost is paid on every turn
 * of a long session; 150 tokens against a 200k window is cheap enough to keep on and small
 * enough that the model still reads it.
 */
export const PER_TURN_TOKEN_BUDGET = 150;

/** How many recent edits count as "the files I am working in". */
const RECENT_EDIT_LIMIT = 2;

export interface PerTurnOptions {
  /** The user's prompt text, used to name the task in one short line. */
  prompt?: string;
  /** Token ceiling for the whole block. */
  budgetTokens?: number;
  /** How many traps to include. */
  maxTraps?: number;
}

export interface PerTurnContext {
  text: string;
  tokens: number;
  trapCount: number;
  conflictCount: number;
  /** Files whose traps were considered. */
  recentFiles: string[];
}

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, Math.max(0, maxChars - 1)).trimEnd() + '…';
}

/**
 * Files edited in the most recent tool calls.
 *
 * The PreToolUse hook records the target of every edit it sees into `file_edits`, so this
 * reads back what the agent has been touching. Only the last two edits count: the trap list
 * should describe the work in front of the agent, not its whole history.
 */
export function getRecentEditedFiles(
  db: DatabaseSync,
  projectId: string,
  limit: number = RECENT_EDIT_LIMIT
): string[] {
  try {
    // id is insertion order, which is what "most recent" means here. created_at only has
    // second resolution, so several edits in the same second would tie.
    const rows = db.prepare(`
      SELECT file_path FROM file_edits
      WHERE project_id = ?
      ORDER BY id DESC LIMIT ?
    `).all(projectId, limit) as { file_path: string }[];

    const files: string[] = [];
    const seen = new Set<string>();
    for (const row of rows) {
      if (seen.has(row.file_path)) continue;
      seen.add(row.file_path);
      files.push(row.file_path);
    }
    return files;
  } catch {
    return [];
  }
}

/**
 * Builds the block injected on every user prompt.
 *
 * Three things, and nothing else: what the agent was told to do next, the traps for the
 * files it is currently touching, and whether anything is in conflict. Every extra line is
 * paid for on every turn, so the block stays deliberately small.
 */
export function buildPerTurnContext(
  db: DatabaseSync,
  repo: FastrRepository,
  projectId: string,
  options: PerTurnOptions = {}
): PerTurnContext {
  const budget = options.budgetTokens ?? PER_TURN_TOKEN_BUDGET;
  const maxTraps = options.maxTraps ?? 3;
  const prompt = (options.prompt ?? '').trim();

  const handoff = repo.getLatestHandoff(projectId);
  const recentFiles = getRecentEditedFiles(db, projectId);
  const conflicts = repo.listConflicts(projectId, 'open');

  const traps: Array<{ id: string; title: string; content: string }> = [];
  const seen = new Set<string>();
  for (const file of recentFiles) {
    for (const memory of repo.getMemoriesForFile(projectId, file)) {
      if (memory.kind !== 'error_trap') continue;
      if (seen.has(memory.id)) continue;
      seen.add(memory.id);
      traps.push({ id: memory.id, title: memory.title, content: memory.content });
      if (traps.length >= maxTraps) break;
    }
    if (traps.length >= maxTraps) break;
  }

  const lines: string[] = [];
  lines.push('<fastr_memory>');

  if (handoff) {
    lines.push(`  <next_step>${escapeXml(truncate(handoff.next_step, 200))}</next_step>`);
  }

  if (traps.length > 0) {
    lines.push(`  <traps count="${traps.length}">`);
    for (const trap of traps) {
      lines.push(`    <trap title="${escapeXml(truncate(trap.title, 120))}">${escapeXml(truncate(trap.content, 300))}</trap>`);
    }
    lines.push('  </traps>');
  }

  if (conflicts.length > 0) {
    lines.push(`  <conflicts open="${conflicts.length}" />`);
  }

  if (prompt) {
    lines.push(`  <prompt>${escapeXml(truncate(prompt, 200))}</prompt>`);
  }

  lines.push('</fastr_memory>');

  const text = fitToBudget(lines.join('\n'), budget);
  return {
    text,
    tokens: estimateTokens(text),
    trapCount: traps.length,
    conflictCount: conflicts.length,
    recentFiles,
  };
}

/**
 * Trims the block until it fits the budget.
 *
 * The block is dropped in this order: the prompt echo, then whole traps, then the next
 * step. The order matters — a trap the agent does not see is worse than a missing task
 * line, but both are worse than a block that exceeds its budget and trains the model to
 * ignore the whole thing.
 */
export function fitToBudget(text: string, budgetTokens: number): string {
  if (estimateTokens(text) <= budgetTokens) return text;

  const lines = text.split('\n');
  const opening = lines[0] ?? '<fastr_memory>';
  const closing = lines[lines.length - 1] ?? '</fastr_memory>';

  // The body is everything between the wrapper tags. Keeping the tags out of the body
  // matters: the hard trim below rebuilds the wrapper around whatever is left.
  let body = lines.slice(1, -1);

  const measure = () => estimateTokens([opening, ...body, closing].join('\n'));

  // 1. Drop the prompt echo.
  body = body.filter((line) => !line.includes('<prompt>'));

  // 2. Drop traps, last one first.
  while (measure() > budgetTokens) {
    const trapIndex = findLastIndex(body, (line) => line.trimStart().startsWith('<trap '));
    if (trapIndex < 0) break;
    body.splice(trapIndex, 1);
  }

  // 3. Drop the next step.
  if (measure() > budgetTokens) {
    body = body.filter((line) => !line.includes('<next_step>'));
  }

  // 4. Drop the conflict count.
  if (measure() > budgetTokens) {
    body = body.filter((line) => !line.includes('<conflicts '));
  }

  // 5. Remove a traps wrapper that no longer holds anything.
  body = removeEmptyTrapsWrapper(body);

  let result = [opening, ...body, closing].join('\n');

  // 6. Hard-trim whatever is left, then rebuild a valid wrapper around it.
  if (estimateTokens(result) > budgetTokens) {
    const maxChars = Math.max(0, budgetTokens * 4 - opening.length - closing.length - 2);
    const trimmed = body.join('\n').slice(0, maxChars);
    result = [opening, trimmed, closing].filter(Boolean).join('\n');
  }

  return result;
}

/** Drops a `<traps>` wrapper once its last `<trap>` child has been removed. */
function removeEmptyTrapsWrapper(body: string[]): string[] {
  const openIndex = body.findIndex((line) => line.includes('<traps '));
  if (openIndex < 0) return body;

  const closeIndex = body.findIndex((line, index) => index > openIndex && line.includes('</traps>'));
  if (closeIndex < 0) return body;

  const hasTrap = body
    .slice(openIndex + 1, closeIndex)
    .some((line) => line.trimStart().startsWith('<trap '));
  if (hasTrap) return body;

  return [...body.slice(0, openIndex), ...body.slice(closeIndex + 1)];
}

function findLastIndex<T>(items: T[], predicate: (item: T) => boolean): number {
  for (let index = items.length - 1; index >= 0; index--) {
    if (predicate(items[index])) return index;
  }
  return -1;
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
