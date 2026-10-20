import type { MemoryKind } from './api';

/** SQLite `datetime('now')` values have no timezone; treat them as UTC. */
export function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const normalized = /[zZ]|[+-]\d\d:?\d\d$/.test(value) ? value : `${value.replace(' ', 'T')}Z`;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

const rtf = typeof Intl !== 'undefined' ? new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }) : null;

export function relativeTime(value: string | null | undefined): string {
  const d = parseDate(value);
  if (!d) return '—';
  const diffSec = Math.round((d.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSec);
  if (!rtf) return d.toLocaleString();
  if (abs < 45) return rtf.format(diffSec, 'second');
  if (abs < 2700) return rtf.format(Math.round(diffSec / 60), 'minute');
  if (abs < 64800) return rtf.format(Math.round(diffSec / 3600), 'hour');
  if (abs < 2592000) return rtf.format(Math.round(diffSec / 86400), 'day');
  if (abs < 31536000) return rtf.format(Math.round(diffSec / 2592000), 'month');
  return rtf.format(Math.round(diffSec / 31536000), 'year');
}

export function absoluteTime(value: string | null | undefined): string {
  const d = parseDate(value);
  return d ? d.toLocaleString() : '—';
}

export const KIND_LABEL: Record<MemoryKind, string> = {
  rule: 'Rule',
  decision: 'Decision',
  error_trap: 'Trap',
  workflow: 'Workflow',
};

export function formatReward(score: number | null | undefined): string {
  if (score === null || score === undefined || Number.isNaN(score)) return '—';
  return `${score.toFixed(2)}x`;
}

export function pluralize(n: number, word: string, plural = `${word}s`): string {
  return `${n.toLocaleString()} ${n === 1 ? word : plural}`;
}
