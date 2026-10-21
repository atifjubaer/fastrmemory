import { describe, expect, it } from 'vitest';
import {
  buildRepoBench,
  parseLoCoMo,
  parseLongMemEval,
  type RepoCommit,
  type RepoFile
} from '../src/bench/public-datasets.js';
import { evaluatePublicEngine, loadPublicDataset, PUBLIC_ENGINES } from '../src/bench/public-harness.js';

describe('public benchmark loaders', () => {
  it('converts LongMemEval sessions into per-question memories and gold ids', () => {
    const dataset = parseLongMemEval([
      {
        question_id: 'q1',
        question_type: 'single-session-user',
        question: 'When is the meeting?',
        haystack_dates: ['2023/05/20 (Sat) 02:21', '2023/05/21 (Sun) 03:00'],
        haystack_session_ids: ['s1', 's2'],
        haystack_sessions: [
          [{ role: 'user', content: 'The meeting is Monday.' }],
          [{ role: 'user', content: 'Dinner at seven.' }]
        ],
        answer_session_ids: ['s1']
      }
    ]);

    expect(dataset.cases).toHaveLength(1);
    expect(dataset.memories).toHaveLength(2);
    expect(dataset.cases[0].goldIds).toEqual(['lme_q1_s1']);
    expect(dataset.cases[0].goldCount).toBe(1);
    expect(dataset.memories[0].validFrom).toBe('2023-05-20T02:21:00.000Z');
    expect(dataset.memories[0].content).toContain('user: The meeting is Monday.');
    expect(dataset.cases[0].projectId).toBe('lme_q1');
  });

  it('converts LoCoMo turns in session order and splits evidence ids', () => {
    const dataset = parseLoCoMo([
      {
        sample_id: 'sample_a',
        qa: [
          {
            question: 'When did Ana go to the support group?',
            evidence: ['D2:1; D1:3'],
            category: 2
          },
          {
            question: 'Unanswerable without evidence',
            evidence: [],
            category: 5
          }
        ],
        conversation: {
          speaker_a: 'Ana',
          speaker_b: 'Bob',
          session_2_date_time: '2:00 pm on 9 May, 2023',
          session_2: [{ speaker: 'Ana', dia_id: 'D2:1', text: 'I went on Monday.' }],
          session_1_date_time: '1:56 pm on 8 May, 2023',
          session_1: [{ speaker: 'Bob', dia_id: 'D1:3', text: 'Hello Ana.' }]
        }
      }
    ]);

    expect(dataset.memories.map((memory) => memory.id)).toEqual([
      'locomo_sample_a_D1_3',
      'locomo_sample_a_D2_1'
    ]);
    expect(dataset.memories[0].validFrom).toBe('2023-05-08T13:56:00.000Z');
    expect(dataset.cases).toHaveLength(1);
    expect(dataset.cases[0].goldIds).toEqual([
      'locomo_sample_a_D2_1',
      'locomo_sample_a_D1_3'
    ]);
    expect(dataset.cases[0].category).toBe('category_2');
    expect(dataset.skippedCases).toBe(1);
  });

  it('builds a real-repository dataset from files and commit subjects', () => {
    const files: RepoFile[] = [
      { path: 'src/a.ts', content: 'export const alpha = 1;' },
      { path: 'docs/b.md', content: '# Beta' },
      { path: 'bin/skip.bin', content: 'binary' }
    ];
    const commits: RepoCommit[] = [
      {
        sha: 'a'.repeat(40),
        subject: 'feat(bench): add public harness',
        files: ['src/a.ts', 'docs/b.md']
      },
      {
        sha: 'b'.repeat(40),
        subject: 'chore: touch a missing file',
        files: ['missing.ts']
      }
    ];
    const dataset = buildRepoBench(files, commits, { projectId: 'repo_test' });

    expect(dataset.memories).toHaveLength(2);
    expect(dataset.cases).toHaveLength(1);
    expect(dataset.cases[0].category).toBe('feat');
    expect(dataset.cases[0].goldIds).toHaveLength(2);
    expect(dataset.cases[0].goldCount).toBe(2);
    expect(dataset.skippedCases).toBe(1);
    expect(dataset.memories[0].id).toMatch(/^repo_test_[a-f0-9]{12}$/);
  });

  it('runs the in-memory retrieval harness against a loaded dataset', async () => {
    const dataset = parseLongMemEval([
      {
        question_id: 'q2',
        question_type: 'single-session-user',
        question: 'What did I say about the meeting?',
        haystack_dates: ['2023/05/20 (Sat) 02:21'],
        haystack_session_ids: ['s1'],
        haystack_sessions: [[{ role: 'user', content: 'The meeting is Monday at nine.' }]],
        answer_session_ids: ['s1']
      }
    ]);
    const { db } = loadPublicDataset(dataset);
    try {
      const engine = PUBLIC_ENGINES.find((candidate) => candidate.name === 'bm25_only')!;
      const evaluation = await evaluatePublicEngine(db, dataset, engine);
      expect(evaluation.overall.count).toBe(1);
      expect(evaluation.cases[0].retrieved[0]).toBe('lme_q2_s1');
      expect(evaluation.overall.hitAt1).toBe(100);
      expect(evaluation.cases[0].goldIds).toEqual(['lme_q2_s1']);
    } finally {
      db.close();
    }
  });
});
