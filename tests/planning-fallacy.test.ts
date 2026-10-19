import { describe, it, expect, beforeEach } from 'vitest';
import { detectForwardClaim, calculateBaserate } from '../src/learn/planning-fallacy.js';
import { FastrRepository } from '../src/db/repository.js';
import { initDatabase } from '../src/db/schema.js';

describe('Planning Fallacy Claim Detector', () => {
  it('detects forward-looking estimation claims with numbers and units', () => {
    const claim1 = 'Refactoring the database will take 3 hours to complete.';
    const res1 = detectForwardClaim(claim1);
    expect(res1.matched).toBe(true);
    expect(res1.estimateValue).toBe(3);
    expect(res1.estimateUnit).toBe('hours');

    const claim2 = 'The API migration is estimated at 2.5 days.';
    const res2 = detectForwardClaim(claim2);
    expect(res2.matched).toBe(true);
    expect(res2.estimateValue).toBe(2.5);
    expect(res2.estimateUnit).toBe('days');

    const claim3 = 'Fixed bug in token generation.';
    const res3 = detectForwardClaim(claim3);
    expect(res3.matched).toBe(false);
  });
});

describe('Planning Fallacy Baserate Calculator', () => {
  it('calculates mean ratio, median p50 ratio, and MAE across historical tasks', () => {
    const closed = [
      { estimate_value: 2, actual_value: 4 }, // 2.0x
      { estimate_value: 1, actual_value: 2 }, // 2.0x
      { estimate_value: 4, actual_value: 6 }, // 1.5x
    ];

    const baserate = calculateBaserate('refactor', closed);
    expect(baserate).not.toBeNull();
    expect(baserate?.count).toBe(3);
    expect(baserate?.meanEstimate).toBe((2 + 1 + 4) / 3);
    expect(baserate?.meanActual).toBe((4 + 2 + 6) / 3);
    expect(baserate?.meanRatio).toBeCloseTo((2.0 + 2.0 + 1.5) / 3, 2);
    expect(baserate?.summary).toContain('Last 3 closed predictions in class [refactor]');
  });
});

describe('FastrRepository Predictions Integration', () => {
  let db: any;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('records predictions and calculates calibration once closed', () => {
    // 1. Create open prediction
    const p1 = repo.createPrediction({
      projectId: 'proj_test',
      classTag: 'migration',
      claimText: 'Migrate to SQLite WAL mode will take 2 hours',
      estimateValue: 2,
      estimateUnit: 'hours',
    });
    expect(p1.id).toBeDefined();
    expect(p1.closure_state).toBe('open');

    // 2. Close prediction with actual outcome
    const closed1 = repo.closePrediction(p1.id!, 4); // took 4 hours (2.0x)
    expect(closed1.closure_state).toBe('closed');
    expect(closed1.actual_value).toBe(4);

    // 3. Second prediction
    const p2 = repo.createPrediction({
      projectId: 'proj_test',
      classTag: 'migration',
      claimText: 'Index rebuild will take 1 hour',
      estimateValue: 1,
      estimateUnit: 'hours',
    });
    repo.closePrediction(p2.id!, 2); // took 2 hours (2.0x)

    // 4. Query calibration
    const baserate = repo.getPredictionBaserate('proj_test', 'migration');
    expect(baserate).not.toBeNull();
    expect(baserate?.count).toBe(2);
    expect(baserate?.meanRatio).toBe(2.0);
    expect(baserate?.summary).toContain('averaged 2.00x actual');
  });
});
