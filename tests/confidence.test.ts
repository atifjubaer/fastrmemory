import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { confidenceTier } from '../src/db/confidence.js';

const P = 'proj_confidence';

describe('per-ID confidence tiers and 3-bad dormancy', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
    applySchema(db);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  function memory(title: string, verified = true) {
    return repo.insertMemory({
      projectId: P,
      module: 'auth',
      kind: 'rule',
      title,
      content: `${title} content`,
      verified
    });
  }

  it('maps active scores and lifecycle states to confidence tiers', () => {
    expect(confidenceTier({ status: 'verified', reward_score: 2.0 })).toBe('high');
    expect(confidenceTier({ status: 'verified', reward_score: 1.5 })).toBe('high');
    expect(confidenceTier({ status: 'verified', reward_score: 1.49 })).toBe('medium');
    expect(confidenceTier({ status: 'staging', reward_score: 0.8 })).toBe('medium');
    expect(confidenceTier({ status: 'staging', reward_score: 0.79 })).toBe('low');
    expect(confidenceTier({ status: 'dormant', reward_score: 3.0 })).toBe('dormant');
    expect(confidenceTier({ status: 'superseded', reward_score: 3.0 })).toBe('superseded');
  });

  it('keeps a low-scoring memory active until three consecutive bad outcomes', () => {
    const target = memory('Target rule');
    const innocent = memory('Innocent rule');

    const first = repo.updateFeedback(target.id, 'bad');
    expect(first.reward_score).toBe(0.5);
    expect(first.status).toBe('verified');
    expect(first.confidence_tier).toBe('low');
    expect(first.bad_streak).toBe(1);

    const second = repo.updateFeedback(target.id, 'bad');
    expect(second.reward_score).toBe(0.1);
    expect(second.status).toBe('verified');
    expect(second.confidence_tier).toBe('low');
    expect(second.bad_streak).toBe(2);

    const third = repo.updateFeedback(target.id, 'bad');
    expect(third.reward_score).toBe(0.1);
    expect(third.status).toBe('dormant');
    expect(third.confidence_tier).toBe('dormant');
    expect(third.bad_streak).toBe(3);
    expect(third.dormant).toBe(true);

    expect(repo.getMemory(target.id)?.status).toBe('dormant');
    expect(repo.getMemory(innocent.id)?.status).toBe('verified');
    expect(repo.getMemory(innocent.id)?.reward_score).toBe(1.0);
  });

  it('resets the bad streak on a good outcome and records an append-only audit trail', () => {
    const target = memory('Recoverable rule');
    repo.updateFeedback(target.id, 'bad');
    repo.updateFeedback(target.id, 'bad');

    const recovered = repo.updateFeedback(target.id, 'good');
    expect(recovered.reward_score).toBe(0.3);
    expect(recovered.status).toBe('verified');
    expect(recovered.bad_streak).toBe(0);
    expect(recovered.confidence_tier).toBe('low');

    const badAgain = repo.updateFeedback(target.id, 'bad');
    expect(badAgain.reward_score).toBe(0.1);
    expect(badAgain.status).toBe('verified');
    expect(badAgain.bad_streak).toBe(1);

    const rows = db.prepare(`
      SELECT outcome, reward_after, status_after, confidence_tier, bad_streak
      FROM memory_feedback WHERE memory_id = ? ORDER BY rowid ASC
    `).all(target.id) as any[];
    expect(rows).toHaveLength(4);
    expect(rows.map((row) => row.outcome)).toEqual(['bad', 'bad', 'good', 'bad']);
    expect(rows[2].reward_after).toBe(0.3);
    expect(rows[2].confidence_tier).toBe('low');
    expect(rows[2].bad_streak).toBe(0);
    expect(rows[3].bad_streak).toBe(1);
  });
});
