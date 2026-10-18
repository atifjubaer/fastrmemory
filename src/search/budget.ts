import { Memory } from '../db/schema.js';

export interface ScoredMemory {
  memory: Memory;
  score: number;
  bm25Rank?: number;
  vectorRank?: number;
  graphRank?: number;
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
  return `${header}\n${memory.content}\n`;
}

export function packMemoriesIntoBudget(
  candidates: ScoredMemory[],
  budgetTokens: number = TOKEN_LEVELS.L2_TASK_RECALL
): { text: string; packed: ScoredMemory[]; totalTokens: number } {
  // Sort candidates by final score descending
  const sorted = [...candidates].sort((a, b) => b.score - a.score);

  const packed: ScoredMemory[] = [];
  const blocks: string[] = [];
  let currentTokens = 0;

  for (const candidate of sorted) {
    const formatted = formatMemoryForContext(candidate);
    const itemTokens = estimateTokens(formatted);

    if (currentTokens + itemTokens > budgetTokens && packed.length > 0) {
      // Budget reached
      break;
    }

    packed.push(candidate);
    blocks.push(formatted);
    currentTokens += itemTokens;
  }

  return {
    text: blocks.join('\n---\n\n'),
    packed,
    totalTokens: currentTokens
  };
}
