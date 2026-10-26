/**
 * Loaders for public retrieval benchmarks.
 *
 * The datasets themselves are not committed. Each loader validates the shape it expects and
 * converts sessions or dialogue turns into memory rows with stable ids. Gold ids are the
 * dataset's own session or turn identifiers, prefixed with the project id so that multiple
 * examples can share one benchmark database.
 */

import { createHash } from 'node:crypto';

export interface PublicMemory {
  id: string;
  projectId: string;
  title: string;
  content: string;
  validFrom: string;
}

export interface PublicCase {
  id: string;
  projectId: string;
  query: string;
  category: string;
  goldIds: string[];
  goldCount: number;
  missingGoldCount: number;
  /** ISO timestamp of the question, when the dataset provides one. Anchors temporal windows. */
  questionDate?: string;
}

export interface PublicDataset {
  name: string;
  memories: PublicMemory[];
  cases: PublicCase[];
  examples: number;
  skippedCases: number;
}

export interface ParseOptions {
  /** Keep only the first N examples. Used for smoke runs, never for published numbers. */
  limit?: number;
}

interface LongMemEvalTurn {
  role?: string;
  content?: string;
}

interface LongMemEvalItem {
  question_id?: string;
  question_type?: string;
  question?: string;
  question_date?: string;
  haystack_dates?: string[];
  haystack_session_ids?: string[];
  haystack_sessions?: LongMemEvalTurn[][];
  answer_session_ids?: string[];
}

interface LoCoMoTurn {
  speaker?: string;
  dia_id?: string;
  text?: string;
  blip_caption?: string;
}

interface LoCoMoQa {
  question?: string;
  evidence?: string[];
  category?: number | string;
}

interface LoCoMoItem {
  sample_id?: string;
  qa?: LoCoMoQa[];
  conversation?: Record<string, unknown>;
}

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};

function compact(text: string, maxLength: number): string {
  const value = text.replace(/\s+/g, ' ').trim();
  return value.length <= maxLength ? value : `${value.slice(0, maxLength - 1)}...`;
}

function longMemEvalDate(value: string): string {
  const match = /^(\d{4})\/(\d{2})\/(\d{2}) \([A-Za-z]{3}\) (\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) {
    const fallback = Date.parse(value);
    if (Number.isNaN(fallback)) throw new Error(`Unrecognized LongMemEval date: ${value}`);
    return new Date(fallback).toISOString();
  }
  return new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]))
  ).toISOString();
}

function locomoDate(value: string): string {
  const match = /^(\d{1,2}):(\d{2}) (am|pm) on (\d{1,2}) ([A-Za-z]+), (\d{4})$/.exec(value.trim());
  if (!match) {
    const fallback = Date.parse(value);
    if (Number.isNaN(fallback)) throw new Error(`Unrecognized LoCoMo date: ${value}`);
    return new Date(fallback).toISOString();
  }
  const hour12 = Number(match[1]);
  const hour = match[3].toLowerCase() === 'pm' ? (hour12 % 12) + 12 : hour12 % 12;
  const month = MONTHS[match[5].toLowerCase()];
  if (month === undefined) throw new Error(`Unrecognized LoCoMo month: ${match[5]}`);
  return new Date(
    Date.UTC(Number(match[6]), month, Number(match[4]), hour, Number(match[2]))
  ).toISOString();
}

function safeId(value: string): string {
  return value.replace(/[^A-Za-z0-9_]+/g, '_');
}

/**
 * LongMemEval: one project per question, one memory per haystack session, gold session ids
 * from `answer_session_ids`. Retrieval is session-level, not answer generation.
 */
export function parseLongMemEval(raw: unknown, options: ParseOptions = {}): PublicDataset {
  if (!Array.isArray(raw)) throw new Error('LongMemEval root must be an array');
  const memories: PublicMemory[] = [];
  const cases: PublicCase[] = [];
  let skippedCases = 0;
  const limit = options.limit ?? raw.length;

  for (const value of raw.slice(0, limit)) {
    const item = value as LongMemEvalItem;
    if (
      typeof item.question_id !== 'string' ||
      typeof item.question !== 'string' ||
      !Array.isArray(item.haystack_sessions) ||
      !Array.isArray(item.haystack_session_ids) ||
      !Array.isArray(item.haystack_dates) ||
      !Array.isArray(item.answer_session_ids)
    ) {
      skippedCases++;
      continue;
    }

    const projectId = `lme_${safeId(item.question_id)}`;
    const sessionIds = item.haystack_session_ids;
    const goldSessionIds = new Set(item.answer_session_ids);
    const indexed = new Set<string>();

    item.haystack_sessions.forEach((turns, index) => {
      const sessionId = sessionIds[index];
      if (typeof sessionId !== 'string' || !Array.isArray(turns)) return;
      const date = item.haystack_dates?.[index];
      const validFrom = typeof date === 'string' ? longMemEvalDate(date) : new Date(0).toISOString();
      const lines = turns
        .filter((turn) => typeof turn?.content === 'string' && turn.content.trim().length > 0)
        .map((turn) => `${turn.role ?? 'unknown'}: ${turn.content!.trim()}`);
      if (lines.length === 0) return;

      const firstUser = turns.find((turn) => turn.role === 'user' && turn.content);
      const id = `${projectId}_${safeId(sessionId)}`;
      indexed.add(sessionId);
      memories.push({
        id,
        projectId,
        title: compact(firstUser?.content ?? sessionId, 120),
        content: `[${date ?? 'unknown date'}] ${sessionId}\n${lines.join('\n')}`,
        validFrom
      });
    });

    const goldIds = Array.from(goldSessionIds)
      .filter((sessionId) => indexed.has(sessionId))
      .map((sessionId) => `${projectId}_${safeId(sessionId)}`);
    if (goldIds.length === 0) {
      skippedCases++;
      continue;
    }

    cases.push({
      id: item.question_id,
      projectId,
      query: item.question,
      category: item.question_type ?? 'unknown',
      goldIds,
      goldCount: goldSessionIds.size,
      missingGoldCount: goldSessionIds.size - goldIds.length,
      questionDate: typeof item.question_date === 'string' ? longMemEvalDate(item.question_date) : undefined
    });
  }

  return {
    name: 'longmemeval_s',
    memories,
    cases,
    examples: cases.length,
    skippedCases
  };
}

/**
 * LoCoMo: one project per conversation, one memory per dialogue turn, gold turn ids from
 * each question's `evidence` list. Retrieval is turn-level, not answer generation.
 */
export function parseLoCoMo(raw: unknown, options: ParseOptions = {}): PublicDataset {
  if (!Array.isArray(raw)) throw new Error('LoCoMo root must be an array');
  const memories: PublicMemory[] = [];
  const cases: PublicCase[] = [];
  let skippedCases = 0;
  const limit = options.limit ?? raw.length;

  for (const value of raw.slice(0, limit)) {
    const item = value as LoCoMoItem;
    if (!item.conversation || !Array.isArray(item.qa)) {
      skippedCases += item.qa?.length ?? 1;
      continue;
    }

    const sampleId = safeId(item.sample_id ?? `sample_${cases.length}`);
    const projectId = `locomo_${sampleId}`;
    const indexed = new Set<string>();
    const sessionKeys = Object.keys(item.conversation)
      .map((key) => ({ key, match: /^session_(\d+)$/.exec(key) }))
      .filter((entry): entry is { key: string; match: RegExpExecArray } => entry.match !== null)
      .sort((a, b) => Number(a.match[1]) - Number(b.match[1]));

    for (const { key } of sessionKeys) {
      const turns = item.conversation[key];
      if (!Array.isArray(turns)) continue;
      const dateValue = item.conversation[`${key}_date_time`];
      const validFrom = typeof dateValue === 'string' ? locomoDate(dateValue) : new Date(0).toISOString();

      for (const turnValue of turns) {
        const turn = turnValue as LoCoMoTurn;
        if (typeof turn.dia_id !== 'string' || typeof turn.text !== 'string') continue;
        if (turn.text.trim().length === 0) continue;
        const id = `${projectId}_${safeId(turn.dia_id)}`;
        const caption = typeof turn.blip_caption === 'string' && turn.blip_caption.trim().length > 0
          ? ` [image: ${turn.blip_caption.trim()}]`
          : '';
        indexed.add(turn.dia_id);
        memories.push({
          id,
          projectId,
          title: `${turn.dia_id} ${turn.speaker ?? 'unknown'}`,
          content: `${turn.speaker ?? 'unknown'}: ${turn.text.trim()}${caption}`,
          validFrom
        });
      }
    }

    for (const qa of item.qa) {
      if (typeof qa.question !== 'string' || qa.question.trim().length === 0) {
        skippedCases++;
        continue;
      }
      const evidence = (Array.isArray(qa.evidence) ? qa.evidence : [])
        .flatMap((entry) => (typeof entry === 'string' ? entry.split(/[;,\s]+/) : []))
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0);
      const goldIds = Array.from(new Set(evidence))
        .filter((diaId) => indexed.has(diaId))
        .map((diaId) => `${projectId}_${safeId(diaId)}`);
      if (goldIds.length === 0) {
        skippedCases++;
        continue;
      }
      cases.push({
        id: `${sampleId}_${cases.length}`,
        projectId,
        query: qa.question,
        category: qa.category === undefined ? 'unknown' : `category_${qa.category}`,
        goldIds,
        goldCount: new Set(evidence).size,
        missingGoldCount: new Set(evidence).size - goldIds.length
      });
    }
  }

  return {
    name: 'locomo10',
    memories,
    cases,
    examples: cases.length,
    skippedCases
  };
}

export interface RepoFile {
  path: string;
  content: string;
}

export interface RepoCommit {
  sha: string;
  subject: string;
  files: string[];
}

export interface RepoBenchOptions {
  projectId?: string;
  maxFiles?: number;
  maxFileBytes?: number;
  maxCases?: number;
  extensions?: string[];
  validFrom?: string;
}

/**
 * Real-repository retrieval: one memory per file at a pinned revision, one query per commit
 * subject, and the files changed by that commit as gold. This measures file-level retrieval,
 * not issue resolution or answer generation.
 */
export function buildRepoBench(
  files: RepoFile[],
  commits: RepoCommit[],
  options: RepoBenchOptions = {}
): PublicDataset {
  const projectId = options.projectId ?? 'repo';
  const extensions = options.extensions ?? ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md'];
  const maxFiles = options.maxFiles ?? 5000;
  const maxFileBytes = options.maxFileBytes ?? 256_000;
  const maxCases = options.maxCases ?? 250;
  const validFrom = options.validFrom ?? new Date(0).toISOString();
  const memories: PublicMemory[] = [];
  const indexedPaths = new Set<string>();
  const idByPath = new Map<string, string>();

  for (const file of files) {
    if (memories.length >= maxFiles) break;
    if (!extensions.some((extension) => file.path.toLowerCase().endsWith(extension))) continue;
    if (file.content.length === 0 || Buffer.byteLength(file.content, 'utf8') > maxFileBytes) continue;
    const id = `${projectId}_${createHash('sha1').update(file.path).digest('hex').slice(0, 12)}`;
    indexedPaths.add(file.path);
    idByPath.set(file.path, id);
    memories.push({
      id,
      projectId,
      title: file.path,
      content: `${file.path}\n${file.content}`,
      validFrom
    });
  }

  const cases: PublicCase[] = [];
  let skippedCases = 0;
  for (const commit of commits) {
    if (cases.length >= maxCases) break;
    const subject = commit.subject.replace(/\s+/g, ' ').trim();
    if (subject.length < 10) {
      skippedCases++;
      continue;
    }
    const goldIds = Array.from(new Set(commit.files))
      .filter((file) => indexedPaths.has(file))
      .map((file) => idByPath.get(file)!)
      .filter((id): id is string => typeof id === 'string');
    if (goldIds.length === 0) {
      skippedCases++;
      continue;
    }
    const changedFiles = new Set(commit.files);
    const conventional = /^([a-z]+)(?:\(|:)/.exec(subject);
    cases.push({
      id: commit.sha.slice(0, 12),
      projectId,
      query: subject,
      category: conventional?.[1] ?? 'other',
      goldIds,
      goldCount: changedFiles.size,
      missingGoldCount: changedFiles.size - goldIds.length
    });
  }

  return {
    name: 'repo_history',
    memories,
    cases,
    examples: cases.length,
    skippedCases
  };
}
