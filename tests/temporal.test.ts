import { describe, it, expect } from 'vitest';
import {
  detectTemporalWindow,
  parseQuestionDate,
  withinWindow,
  type TemporalWindow
} from '../src/search/temporal.js';

/**
 * Temporal windows are parsed from the question and anchored on the question date.
 * Only explicit ranges are recognised; anything ambiguous returns null so retrieval
 * behaves exactly as it did before the feature existed.
 */

const ANCHOR = parseQuestionDate('2023/05/30 (Tue) 23:40')!;

function window(query: string, anchor: Date | null = ANCHOR): TemporalWindow | null {
  return detectTemporalWindow(query, anchor);
}

describe('parseQuestionDate', () => {
  it('parses the LongMemEval date format including the weekday', () => {
    const date = parseQuestionDate('2023/05/30 (Tue) 23:40');
    expect(date?.toISOString()).toBe('2023-05-30T23:40:00.000Z');
  });

  it('parses ISO timestamps', () => {
    expect(parseQuestionDate('2023-01-02T03:04:05Z')?.toISOString()).toBe('2023-01-02T03:04:05.000Z');
  });

  it('returns null for missing or unparseable values', () => {
    expect(parseQuestionDate(undefined)).toBeNull();
    expect(parseQuestionDate('')).toBeNull();
    expect(parseQuestionDate('not a date')).toBeNull();
  });
});

describe('detectTemporalWindow', () => {
  it('resolves "past two weeks" against the question date', () => {
    const result = window('How many times did I bake something in the past two weeks?');
    expect(result).not.toBeNull();
    expect(result!.start).toBe('2023-05-16T23:40:00Z');
    expect(result!.end).toBe('2023-05-30T23:40:00Z');
    expect(result!.label).toBe('past two weeks');
  });

  it('resolves counted ranges with word numbers', () => {
    expect(window('what did I read in the past three months?')?.label).toBe('past three months');
  });

  it('treats "a few" as three and "a couple" as two', () => {
    expect(window('how many in the past few months?')?.label).toBe('past few months');
    expect(window('how many in the past few months?')?.start).toBe('2023-02-28T23:40:00Z');
    expect(window('what happened in the last couple of weeks?')?.start).toBe('2023-05-16T23:40:00Z');
  });

  it('resolves calendar-relative ranges', () => {
    expect(window('how many this month?')).toMatchObject({ start: '2023-05-01T00:00:00Z', label: 'this month' });
    expect(window('how many this year?')).toMatchObject({ start: '2023-01-01T00:00:00Z', label: 'this year' });
    expect(window('how many last month?')).toMatchObject({
      start: '2023-04-01T00:00:00Z',
      end: '2023-04-30T23:59:59Z',
      label: 'last month'
    });
  });

  it('resolves "since the start of the year" and "since 2021"', () => {
    expect(window('how much since the start of the year?')).toMatchObject({
      start: '2023-01-01T00:00:00Z',
      end: '2023-05-30T23:40:00Z'
    });
    expect(window('how much since 2021?')).toMatchObject({ start: '2021-01-01T00:00:00Z' });
  });

  it('resolves absolute years and months without an anchor', () => {
    expect(window('what did I do in 2022?', null)).toMatchObject({
      start: '2022-01-01T00:00:00Z',
      end: '2022-12-31T23:59:59Z'
    });
    expect(window('what did I do in March 2023?', null)).toMatchObject({ start: '2023-03-01T00:00:00Z' });
  });

  it('returns null when a relative range has no anchor', () => {
    expect(window('how many in the past two weeks?', null)).toBeNull();
  });

  it('returns null for ordinary topical questions', () => {
    expect(window('Where is the auth middleware?')).toBeNull();
    expect(window('How many projects have I led?')).toBeNull();
  });
});

describe('withinWindow', () => {
  const range = window('how many in the past two weeks?')!;

  it('includes both boundaries regardless of sub-second precision', () => {
    expect(withinWindow('2023-05-16T23:40:00Z', range)).toBe(true);
    expect(withinWindow('2023-05-16T23:40:00.000Z', range)).toBe(true);
    expect(withinWindow('2023-05-30T23:40:00.000Z', range)).toBe(true);
  });

  it('excludes rows outside the range', () => {
    expect(withinWindow('2023-05-16T23:39:59Z', range)).toBe(false);
    expect(withinWindow('2023-05-30T23:40:01Z', range)).toBe(false);
    expect(withinWindow('2022-01-01T00:00:00Z', range)).toBe(false);
  });

  it('never matches an unparseable date', () => {
    expect(withinWindow('', range)).toBe(false);
    expect(withinWindow('yesterday', range)).toBe(false);
  });
});
