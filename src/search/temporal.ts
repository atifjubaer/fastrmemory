/**
 * Temporal query windows.
 *
 * "How many times did I bake in the past two weeks?" is not a topical query: it is a
 * date-bounded one. BM25 cannot see the bound, so it ranks sessions by shared words and
 * loses the ones outside the window. This module parses the bound into an absolute
 * interval using the question date, so retrieval can filter on `valid_from` first and
 * rank inside the surviving set.
 *
 * Only explicit, unambiguous ranges are parsed. Anything else returns null and retrieval
 * behaves exactly as before.
 */

export interface TemporalWindow {
  /** Inclusive lower bound, ISO-8601 UTC. */
  start: string;
  /** Inclusive upper bound, ISO-8601 UTC. */
  end: string;
  /** Human-readable description of what was parsed, for result annotation. */
  label: string;
}

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12
};

const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, a: 1, an: 1
};

const UNIT_MS: Record<string, number> = {
  day: 86_400_000,
  week: 7 * 86_400_000,
  month: 30 * 86_400_000,
  year: 365 * 86_400_000
};

/** Parses `2023/05/30 (Tue) 23:40` and ISO strings. Returns null for unknown formats. */
export function parseQuestionDate(value: string | undefined | null): Date | null {
  if (!value) return null;
  const match = /^(\d{4})[/-](\d{2})[/-](\d{2})(?:\s*\([A-Za-z]{3}\))?(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(value.trim());
  if (match) {
    const [, year, month, day, hour, minute, second] = match;
    const date = new Date(Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      hour ? Number(hour) : 0,
      minute ? Number(minute) : 0,
      second ? Number(second) : 0
    ));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function iso(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function windowFrom(start: Date, end: Date, label: string): TemporalWindow | null {
  if (start.getTime() > end.getTime()) return null;
  return { start: iso(start), end: iso(end), label };
}

function subtractUnits(date: Date, amount: number, unit: string): Date {
  if (unit === 'month') {
    // Calendar months have different lengths, so the day is clamped to the last day of
    // the target month instead of rolling forward (2023-05-30 minus 3 months is
    // 2023-02-28, not 2023-03-02).
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() - amount;
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const day = Math.min(date.getUTCDate(), lastDay);
    return new Date(Date.UTC(
      year,
      month,
      day,
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    ));
  }
  if (unit === 'year') {
    const copy = new Date(date.getTime());
    copy.setUTCFullYear(copy.getUTCFullYear() - amount);
    return copy;
  }
  return new Date(date.getTime() - amount * UNIT_MS[unit]);
}

/**
 * Extracts an absolute window from a question.
 *
 * `questionDate` anchors relative ranges. Without it, only absolute ranges ("in 2022",
 * "in March 2023") can be resolved.
 */
export function detectTemporalWindow(query: string, questionDate: Date | null): TemporalWindow | null {
  const text = query.toLowerCase().replace(/\s+/g, ' ').trim();
  const anchor = questionDate ?? null;

  // "past two weeks", "last 3 months", "in the past year"
  const counted = /\b(?:in the )?(?:past|last)\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(day|week|month|year)s?\b/.exec(text);
  if (counted && anchor) {
    const amount = /^\d+$/.test(counted[1]) ? Number(counted[1]) : NUMBER_WORDS[counted[1]];
    if (amount > 0) {
      return windowFrom(subtractUnits(anchor, amount, counted[2]), anchor, `past ${counted[1]} ${counted[2]}${amount === 1 ? '' : 's'}`);
    }
  }

  // "past few months", "last couple of weeks"
  const vague = /\b(?:in the )?(?:past|last)\s+(few|couple(?: of)?)\s+(day|week|month|year)s?\b/.exec(text);
  if (vague && anchor) {
    // "a few" is conventionally three; "a couple" is two.
    const amount = vague[1] === 'few' ? 3 : 2;
    return windowFrom(subtractUnits(anchor, amount, vague[2]), anchor, `past ${vague[1]} ${vague[2]}s`);
  }

  if (anchor) {
    // "this week / month / year"
    const current = /\bthis (week|month|year)\b/.exec(text);
    if (current) {
      const unit = current[1];
      let start: Date;
      if (unit === 'week') {
        start = new Date(anchor.getTime());
        const day = start.getUTCDay();
        start.setUTCDate(start.getUTCDate() - ((day + 6) % 7));
        start.setUTCHours(0, 0, 0, 0);
      } else if (unit === 'month') {
        start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
      } else {
        start = new Date(Date.UTC(anchor.getUTCFullYear(), 0, 1));
      }
      return windowFrom(start, anchor, `this ${unit}`);
    }

    // "last week / month / year"
    const previous = /\blast (week|month|year)\b/.exec(text);
    if (previous) {
      const unit = previous[1];
      if (unit === 'year') {
        const year = anchor.getUTCFullYear() - 1;
        return windowFrom(new Date(Date.UTC(year, 0, 1)), new Date(Date.UTC(year, 11, 31, 23, 59, 59)), 'last year');
      }
      if (unit === 'month') {
        const start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() - 1, 1));
        const end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 0, 23, 59, 59));
        return windowFrom(start, end, 'last month');
      }
      const start = new Date(anchor.getTime());
      const day = start.getUTCDay();
      start.setUTCDate(start.getUTCDate() - ((day + 6) % 7) - 7);
      start.setUTCHours(0, 0, 0, 0);
      return windowFrom(start, new Date(start.getTime() + 7 * UNIT_MS.day - 1000), 'last week');
    }

    // "since the start of the year", "since the beginning of this year", "since this year"
    if (/\bsince (?:the )?(?:start|beginning) of (?:the|this) year\b|\bsince (?:the )?(?:this )?year\b/.test(text)) {
      return windowFrom(new Date(Date.UTC(anchor.getUTCFullYear(), 0, 1)), anchor, 'since the start of the year');
    }

    // "since 2021", "since March 2022"
    const since = /\bsince\s+(?:(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+)?(\d{4})\b/.exec(text);
    if (since) {
      const month = since[1] ? MONTHS[since[1]] : 1;
      const year = Number(since[2]);
      return windowFrom(new Date(Date.UTC(year, month - 1, 1)), anchor, `since ${since[1] ? `${since[1]} ` : ''}${year}`);
    }
  }

  // Absolute year: "in 2022", "during 2021"
  const year = /\b(?:in|during)\s+(\d{4})\b/.exec(text);
  if (year) {
    const value = Number(year[1]);
    return windowFrom(new Date(Date.UTC(value, 0, 1)), new Date(Date.UTC(value, 11, 31, 23, 59, 59)), `in ${value}`);
  }

  // Absolute month + year: "in March 2023"
  const monthYear = /\b(?:in|during)\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})\b/.exec(text);
  if (monthYear) {
    const month = MONTHS[monthYear[1]];
    const value = Number(monthYear[2]);
    return windowFrom(
      new Date(Date.UTC(value, month - 1, 1)),
      new Date(Date.UTC(value, month, 0, 23, 59, 59)),
      `${monthYear[1]} ${value}`
    );
  }

  return null;
}

/** True when a memory's `valid_from` falls inside the window. Unparseable dates never match. */
export function withinWindow(validFrom: string, window: TemporalWindow): boolean {
  const time = Date.parse(validFrom);
  if (Number.isNaN(time)) return false;
  return time >= Date.parse(window.start) && time <= Date.parse(window.end);
}
