/**
 * The cross-engine corpus must be reproducible, unambiguous, and honest.
 *
 * These tests pin the properties the benchmark's numbers depend on:
 *   - the same seed produces byte-identical text on every machine,
 *   - every gold document is the only document that matches its query terms,
 *   - no paraphrase synonym leaks into a document, or the paraphrase tier would stop
 *     measuring what it claims to measure,
 *   - marker rank extraction works on the three output shapes in play.
 */

import { describe, expect, it } from 'vitest';
import {
  buildMarkerCorpus,
  MARKER_EVENTS,
  MARKER_PROBLEMS,
  MARKER_SYSTEMS,
  MARKER_SYMPTOMS,
  MARKER_TIERS,
  markerRank,
  mulberry32
} from '../src/bench/marker-corpus.js';

const corpus = buildMarkerCorpus({ docs: 1200, golds: 40 });

describe('marker corpus determinism', () => {
  it('produces identical bytes for the same seed', () => {
    const again = buildMarkerCorpus({ docs: 1200, golds: 40 });
    expect(again.docs.map((doc) => doc.content)).toEqual(corpus.docs.map((doc) => doc.content));
    expect(again.queries).toEqual(corpus.queries);
  });

  it('produces different golds for a different seed', () => {
    const other = buildMarkerCorpus({ docs: 1200, golds: 40, seed: 7 });
    expect(other.queries.map((query) => query.goldDocId)).not.toEqual(corpus.queries.map((query) => query.goldDocId));
  });

  it('keeps the mulberry32 sequence stable', () => {
    const next = mulberry32(1);
    const values = [next(), next(), next()];
    const again = mulberry32(1);
    expect([again(), again(), again()]).toEqual(values);
    for (const value of values) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('scales down without changing the prefix', () => {
    const small = buildMarkerCorpus({ docs: 180, golds: 30 });
    expect(small.docs).toHaveLength(180);
    expect(small.docs.map((doc) => doc.content)).toEqual(corpus.docs.slice(0, 180).map((doc) => doc.content));
  });
});

describe('marker corpus structure', () => {
  it('covers the full system x problem grid', () => {
    expect(MARKER_SYSTEMS).toHaveLength(30);
    expect(MARKER_PROBLEMS).toHaveLength(40);
    expect(new Set(MARKER_SYSTEMS).size).toBe(MARKER_SYSTEMS.length);
    expect(new Set(MARKER_PROBLEMS.map((entry) => entry.term)).size).toBe(MARKER_PROBLEMS.length);
    expect(new Set(MARKER_PROBLEMS.map((entry) => entry.synonym)).size).toBe(MARKER_PROBLEMS.length);
    expect(corpus.docs).toHaveLength(1200);
  });

  it('gives every document a unique marker at position 0', () => {
    const markers = new Set(corpus.docs.map((doc) => doc.marker));
    expect(markers.size).toBe(corpus.docs.length);
    for (const doc of corpus.docs) {
      expect(doc.content.startsWith(doc.marker)).toBe(true);
      expect(doc.marker).toMatch(/^MKR-[0-9A-F]{10}$/);
    }
  });

  it('makes the exact tier unambiguous', () => {
    const pairs = corpus.docs.map((doc) => `${doc.system}\u0000${doc.problem}`);
    expect(new Set(pairs).size).toBe(corpus.docs.length);
  });

  it('makes the multi tier unambiguous', () => {
    // 30 systems x 54 symptoms x 7 events has lcm 1890, so no triple can repeat inside
    // a 1200-document corpus. If this fails, the multi tier has a tie at the top.
    const triples = corpus.docs.map((doc) => `${doc.system}\u0000${doc.symptom}\u0000${doc.event}`);
    expect(new Set(triples).size).toBe(corpus.docs.length);
    expect(MARKER_EVENTS).toHaveLength(7);
    expect(MARKER_SYMPTOMS).toHaveLength(54);
  });

  it('shares each symptom and event widely enough to be a real distraction', () => {
    const symptomCounts = new Map<string, number>();
    const eventCounts = new Map<string, number>();
    for (const doc of corpus.docs) {
      symptomCounts.set(doc.symptom, (symptomCounts.get(doc.symptom) ?? 0) + 1);
      eventCounts.set(doc.event, (eventCounts.get(doc.event) ?? 0) + 1);
    }
    for (const count of symptomCounts.values()) expect(count).toBeGreaterThanOrEqual(20);
    for (const count of eventCounts.values()) expect(count).toBeGreaterThanOrEqual(150);
  });

  it('emits one query per tier per gold, with valid gold ids', () => {
    const ids = new Set(corpus.docs.map((doc) => doc.id));
    for (const tier of MARKER_TIERS) {
      expect(corpus.queries.filter((query) => query.tier === tier)).toHaveLength(40);
    }
    for (const query of corpus.queries) {
      expect(ids.has(query.goldDocId)).toBe(true);
      const doc = corpus.docs.find((candidate) => candidate.id === query.goldDocId);
      expect(doc?.marker).toBe(query.goldMarker);
      expect(query.id.startsWith(`q-${query.tier}-`)).toBe(true);
    }
    expect(new Set(corpus.queries.map((query) => query.id)).size).toBe(corpus.queries.length);
  });
});

describe('marker corpus tiers', () => {
  it('keeps every paraphrase synonym out of every document', () => {
    const haystack = corpus.docs.map((doc) => doc.content.toLowerCase()).join('\n');
    for (const synonym of Object.values(corpus.synonyms)) {
      expect(haystack).not.toContain(synonym.toLowerCase());
    }
  });

  it('puts the exact query terms in the gold document', () => {
    for (const query of corpus.queries.filter((candidate) => candidate.tier === 'exact')) {
      const doc = corpus.docs.find((candidate) => candidate.id === query.goldDocId)!;
      expect(query.query).toContain(doc.system);
      expect(query.query).toContain(doc.problem);
    }
  });

  it('puts the multi query terms in the gold document', () => {
    for (const query of corpus.queries.filter((candidate) => candidate.tier === 'multi')) {
      const doc = corpus.docs.find((candidate) => candidate.id === query.goldDocId)!;
      expect(query.query).toContain(doc.system);
      expect(query.query).toContain(doc.symptom);
      expect(query.query).toContain(doc.event);
    }
  });

  it('gives the paraphrase tier only the system name as lexical signal', () => {
    for (const query of corpus.queries.filter((candidate) => candidate.tier === 'paraphrase')) {
      const doc = corpus.docs.find((candidate) => candidate.id === query.goldDocId)!;
      expect(query.query).toContain(doc.system);
      expect(query.query).not.toContain(doc.problem);
      const synonym = corpus.synonyms[doc.problem];
      expect(query.query).toContain(synonym);
    }
  });
});

describe('markerRank', () => {
  const gold = 'MKR-1111111111';

  it('returns null when the gold marker is absent', () => {
    expect(markerRank('MKR-2222222222 nothing here', gold)).toBeNull();
  });

  it('returns 1 when the gold marker comes first', () => {
    expect(markerRank(`${gold} body MKR-2222222222 body`, gold)).toBe(1);
  });

  it('counts distinct documents before the gold, not raw occurrences', () => {
    const context = `MKR-2222222222 first MKR-2222222222 repeated MKR-3333333333 second ${gold} third`;
    expect(markerRank(context, gold)).toBe(3);
  });

  it('works on JSON, Markdown, and plain text shapes', () => {
    const json = JSON.stringify({ results: [{ title: 'MKR-2222222222 a' }, { title: gold }] });
    const markdown = `## Found 2 memories\n\n[verified] MKR-2222222222 a\n\n[verified] ${gold} b`;
    const plain = `MKR-2222222222 a\n${gold} b`;
    expect(markerRank(json, gold)).toBe(2);
    expect(markerRank(markdown, gold)).toBe(2);
    expect(markerRank(plain, gold)).toBe(2);
  });
});
