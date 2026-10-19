/**
 * Proactive Contradiction & Conflict Detection Engine
 * Inspired by Hippo Memory (src/consolidate/conflicts.ts)
 * Automatically detects when two memories make mutually exclusive assertions.
 */

const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'could', 'did',
  'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into',
  'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over',
  'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until',
  'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with',
  'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

const POSITIVE_POLARITY = new Set([
  'always', 'must', 'enable', 'enabled', 'true', 'works', 'required', 'prefer', 'use', 'support', 'allow'
]);

const NEGATIVE_POLARITY = new Set([
  'never', 'cannot', 'disable', 'disabled', 'false', 'broken', 'failed', 'prohibit', 'avoid', 'reject', 'deprecated'
]);

export function extractTokens(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  return new Set(words);
}

export function calculateJaccardSimilarity(setA: Set<string>, setB: Set<string>): {
  jaccard: number;
  intersectionSize: number;
  commonTokens: string[];
} {
  let intersectionCount = 0;
  const commonTokens: string[] = [];

  for (const token of setA) {
    if (setB.has(token)) {
      intersectionCount++;
      commonTokens.push(token);
    }
  }

  const unionSize = setA.size + setB.size - intersectionCount;
  const jaccard = unionSize > 0 ? intersectionCount / unionSize : 0;

  return { jaccard, intersectionSize: intersectionCount, commonTokens };
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  score: number;
  reason: string;
}

export function detectConflict(
  titleA: string,
  contentA: string,
  titleB: string,
  contentB: string
): ConflictCheckResult {
  const fullTextA = `${titleA} ${contentA}`;
  const fullTextB = `${titleB} ${contentB}`;

  const tokensA = extractTokens(fullTextA);
  const tokensB = extractTokens(fullTextB);

  const { jaccard, intersectionSize, commonTokens } = calculateJaccardSimilarity(tokensA, tokensB);

  // Require minimum 2 overlapping rare tokens and at least 0.35 Jaccard overlap
  if (intersectionSize < 2 || jaccard < 0.35) {
    return { hasConflict: false, score: jaccard, reason: '' };
  }

  // Inspect polarity in first 50 words of each text
  const wordsA = fullTextA.toLowerCase().split(/\s+/).slice(0, 50);
  const wordsB = fullTextB.toLowerCase().split(/\s+/).slice(0, 50);

  const hasPosA = wordsA.some((w) => POSITIVE_POLARITY.has(w));
  const hasNegA = wordsA.some((w) => NEGATIVE_POLARITY.has(w));
  const hasPosB = wordsB.some((w) => POSITIVE_POLARITY.has(w));
  const hasNegB = wordsB.some((w) => NEGATIVE_POLARITY.has(w));

  // Case 1: Direct Polarity Mismatch (A prescribes POS, B prescribes NEG on same topic)
  if ((hasPosA && hasNegB) || (hasNegA && hasPosB)) {
    return {
      hasConflict: true,
      score: jaccard,
      reason: `Opposing prescriptions on topic [${commonTokens.slice(0, 4).join(', ')}]: positive vs negative assertion detected.`
    };
  }

  // Case 2: High overlap with different directives (jaccard >= 0.65)
  if (jaccard >= 0.65) {
    return {
      hasConflict: true,
      score: jaccard,
      reason: `High topic overlap (Jaccard ${jaccard.toFixed(2)}) on [${commonTokens.slice(0, 4).join(', ')}]. Potential duplicate or un-superseded instruction.`
    };
  }

  return { hasConflict: false, score: jaccard, reason: '' };
}
