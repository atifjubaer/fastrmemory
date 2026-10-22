import { Memory } from '../db/schema.js';

export interface ConflictLink {
  conflictId: number;
  withMemoryId: string;
  withTitle: string;
  reason: string;
  score: number;
}

export interface ScoredMemory {
  memory: Memory;
  score: number;
  bm25Rank?: number;
  vectorRank?: number;
  graphRank?: number;
  /** Open contradiction attached to this memory, when one exists. */
  conflict?: ConflictLink;
}

export const TOKEN_LEVELS = {
  L0_WAKEUP: 150,
  L1_FILE_RULES: 500,
  L2_TASK_RECALL: 1500,
  L3_DEEP_AUDIT: 4000
} as const;

export function estimateTokens(text: string): number {
  if (!text) return 0;
  // Standard approximation: ~4 characters per token for English & code
  return Math.ceil(text.length / 4);
}

export function formatMemoryForContext(scored: ScoredMemory): string {
  const { memory, score } = scored;
  const kindBadge = memory.kind === 'error_trap' ? 'TRAP' : memory.kind.toUpperCase();
  const statusBadge = memory.status;

  const header = `[${memory.id}] [${kindBadge}] [${statusBadge}] ${memory.title} (Score: ${score.toFixed(2)})`;
  const conflictLine = scored.conflict
    ? `⚠️ OPEN CONFLICT #${scored.conflict.conflictId}: contradicts [${scored.conflict.withMemoryId}] "${scored.conflict.withTitle}". Resolve before relying on this rule: fastr conflict resolve ${scored.conflict.conflictId} --keep ${memory.id}\n`
    : '';
  return `${header}\n${conflictLine}${memory.content}\n`;
}

export const MEMORY_SEPARATOR = '\n---\n\n';

/**
 * Greedy budget packing: walk candidates by score (desc) and include every item that
 * still fits. Oversized items are skipped (not a hard stop), so smaller lower-ranked
 * items can still be packed. Separator tokens are counted and the reported total is
 * the estimate of the final joined text, which never exceeds `budgetTokens`.
 */
export function packMemoriesIntoBudget(
  candidates: ScoredMemory[],
  budgetTokens: number = TOKEN_LEVELS.L2_TASK_RECALL,
  maxItems: number = Number.POSITIVE_INFINITY
): { text: string; packed: ScoredMemory[]; totalTokens: number } {
  // Sort candidates by final score descending
  const sorted = [...candidates].sort((a, b) => b.score - a.score);

  const packed: ScoredMemory[] = [];
  const blocks: string[] = [];
  let currentText = '';

  for (const candidate of sorted) {
    if (packed.length >= maxItems) break;
    const formatted = formatMemoryForContext(candidate);
    const nextText = blocks.length === 0 ? formatted : currentText + MEMORY_SEPARATOR + formatted;

    if (estimateTokens(nextText) > budgetTokens) {
      // Does not fit: skip it, a smaller later item may still fit
      continue;
    }

    packed.push(candidate);
    blocks.push(formatted);
    currentText = nextText;
  }

  return {
    text: currentText,
    packed,
    totalTokens: estimateTokens(currentText)
  };
}
