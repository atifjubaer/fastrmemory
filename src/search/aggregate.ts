/**
 * Aggregate-intent detection and query preparation.
 *
 * "How many projects have I led?" is answered by collecting every session that mentions
 * the activity. BM25 cannot do that with the question as written, because FTS5 ORs every
 * term and the scaffolding words ("how", "many", "times", "past", "two", "weeks") are
 * frequent across the whole corpus, so they outvote the one content word that identifies
 * the activity. Removing the scaffolding before the first stage is what turns an aggregate
 * question back into a topical query.
 *
 * Detection is deliberately narrow: only explicit counting and enumeration phrasings
 * qualify, so ordinary questions keep their exact wording.
 */

export interface AggregateIntent {
  /** True when the query asks for a count, a total, or a full enumeration. */
  detected: boolean;
  /** Content terms left after scaffolding removal, in query order. */
  terms: string[];
}

const AGGREGATE_PATTERNS: RegExp[] = [
  /\bhow\s+(?:many|much|often)\b/i,
  /\b(?:in\s+)?total\b/i,
  /\b(?:list|name|show|give\s+me)\s+(?:all|every|each)\b/i,
  /\bacross\s+(?:all|every)\b/i,
  /\ball\s+(?:the|my|of\s+the|of\s+my)\b/i,
  /\bevery\s+(?:time|single|one)\b/i,
  /\bnumber\s+of\s+(?:times|days|weeks|months|years)\b/i
];

/**
 * Question scaffolding. These words describe *how* the question is asked, not *what* is
 * being asked about. Time units are included because a temporal window is parsed
 * separately; leaving them in the lexical query only matches other date talk.
 */
const SCAFFOLDING = new Set([
  'how', 'many', 'much', 'often', 'times', 'time', 'total', 'altogether', 'combined',
  'all', 'every', 'each', 'across', 'list', 'name', 'show', 'give', 'number',
  'what', 'which', 'who', 'when', 'where', 'did', 'do', 'does', 'done',
  'have', 'has', 'had', 'was', 'were', 'is', 'are', 'am', 'been', 'being',
  'i', 'me', 'my', 'mine', 'we', 'our', 'us', 'you', 'your',
  'in', 'on', 'at', 'for', 'to', 'of', 'with', 'and', 'or', 'the', 'a', 'an',
  'past', 'last', 'few', 'couple', 'recent', 'recently',
  'week', 'weeks', 'month', 'months', 'year', 'years', 'day', 'days',
  'since', 'start', 'beginning', 'currently', 'now', 'today',
  'something', 'anything', 'things', 'thing', 'there', 'about', 'from', 'by', 'as',
  'that', 'this', 'these', 'those', 'so', 'far', 'up', 'out',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'once', 'twice'
]);

/** Splits on non-word characters and drops scaffolding, digits, and one-letter tokens. */
export function aggregateContentTerms(query: string): string[] {
  return query
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !SCAFFOLDING.has(word) && !/^\d+$/.test(word));
}

/** Detects an aggregate question and returns the content terms to search with. */
export function detectAggregateIntent(query: string): AggregateIntent {
  const detected = AGGREGATE_PATTERNS.some((pattern) => pattern.test(query));
  if (!detected) return { detected: false, terms: [] };
  return { detected: true, terms: aggregateContentTerms(query) };
}
