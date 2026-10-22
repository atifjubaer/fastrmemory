import { Memory } from './schema.js';

export type ConfidenceTier = 'high' | 'medium' | 'low' | 'dormant' | 'superseded';

export const CONFIDENCE_THRESHOLDS = {
  high: 1.5,
  medium: 0.8
} as const;

/**
 * Maps a memory's outcome score and lifecycle status to a stable confidence tier.
 * Tiers are score-based for active rows; dormant and superseded rows always report
 * their lifecycle state so callers do not present inactive memories as confident.
 */
export function confidenceTier(memory: Pick<Memory, 'status' | 'reward_score'>): ConfidenceTier {
  if (memory.status === 'dormant') return 'dormant';
  if (memory.status === 'superseded') return 'superseded';
  const score = Number(memory.reward_score ?? 0);
  if (score >= CONFIDENCE_THRESHOLDS.high) return 'high';
  if (score >= CONFIDENCE_THRESHOLDS.medium) return 'medium';
  return 'low';
}

export function confidenceLabel(tier: ConfidenceTier): string {
  switch (tier) {
    case 'high':
      return 'High confidence';
    case 'medium':
      return 'Medium confidence';
    case 'low':
      return 'Low confidence';
    case 'dormant':
      return 'Dormant after repeated bad outcomes';
    case 'superseded':
      return 'Superseded history';
  }
}
