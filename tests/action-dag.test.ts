import { describe, it, expect, beforeEach } from 'vitest';
import { FastrRepository } from '../src/db/repository.js';
import { initDatabase } from '../src/db/schema.js';

describe('Multi-Agent Action DAG', () => {
  let repo: FastrRepository;
  const projectId = 'test-proj-dag';

  beforeEach(() => {
    const db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('creates actions with dependencies and computes unblocked frontier', () => {
    // Action A: Run migrations (no prereqs)
    const actA = repo.createAction({
      projectId,
      title: 'Run migrations',
      priority: 10,
    });

    // Action B: Seed test accounts (requires Action A)
    const actB = repo.createAction({
      projectId,
      title: 'Seed test accounts',
      priority: 8,
      requires: [actA.id],
    });

    // Action C: Execute smoke test (requires Action B)
    const actC = repo.createAction({
      projectId,
      title: 'Execute smoke test',
      priority: 9,
      requires: [actB.id],
    });

    // Initially, only Action A is in frontier because B requires A, and C requires B
    let frontier = repo.getFrontier(projectId);
    expect(frontier.length).toBe(1);
    expect(frontier[0].id).toBe(actA.id);

    // Agent claims Action A
    const claimedA = repo.getNextAction(projectId, 'agent-01');
    expect(claimedA?.id).toBe(actA.id);
    expect(claimedA?.status).toBe('active');
    expect(claimedA?.assigned_to).toBe('agent-01');

    // Complete Action A
    repo.updateAction(actA.id, { status: 'done' });

    // Now Action B should be in frontier, but Action C is still blocked
    frontier = repo.getFrontier(projectId);
    expect(frontier.length).toBe(1);
    expect(frontier[0].id).toBe(actB.id);

    // Complete Action B
    repo.updateAction(actB.id, { status: 'done' });

    // Now Action C is unlocked in frontier
    frontier = repo.getFrontier(projectId);
    expect(frontier.length).toBe(1);
    expect(frontier[0].id).toBe(actC.id);
  });

  it('prevents conflicting actions from being parallelized in the frontier', () => {
    // Action 1: Deploy to staging
    const act1 = repo.createAction({
      projectId,
      title: 'Deploy to staging',
      priority: 5,
    });

    // Action 2: Reset staging DB (conflicts with Deploy)
    const act2 = repo.createAction({
      projectId,
      title: 'Reset staging DB',
      priority: 6,
      conflictsWith: [act1.id],
    });

    // Before either is active, both could be in frontier (sorted by priority)
    let frontier = repo.getFrontier(projectId);
    expect(frontier.length).toBe(2);

    // Start Action 2 (higher priority)
    repo.updateAction(act2.id, { status: 'active', assignedTo: 'agent-dev' });

    // Now Action 1 should be suppressed from frontier because act2 is active
    frontier = repo.getFrontier(projectId);
    expect(frontier.length).toBe(1);
    expect(frontier[0].id).toBe(act2.id);

    // Once Action 2 completes, Action 1 is ready again
    repo.updateAction(act2.id, { status: 'done' });
    frontier = repo.getFrontier(projectId);
    expect(frontier.length).toBe(1);
    expect(frontier[0].id).toBe(act1.id);
  });
});

describe('Bounded Working Memory Slots', () => {
  let repo: FastrRepository;
  const projectId = 'test-proj-slots';

  beforeEach(() => {
    const db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('sets and retrieves bounded working memory slots', () => {
    const slot = repo.setSlot(projectId, 'current_goal', 'Implement Phase 4 Action DAG');
    expect(slot.slot_key).toBe('current_goal');
    expect(slot.content).toBe('Implement Phase 4 Action DAG');

    const fetched = repo.getSlot(projectId, 'current_goal');
    expect(fetched?.content).toBe('Implement Phase 4 Action DAG');

    // Update slot
    repo.setSlot(projectId, 'current_goal', 'Implement Phase 5 Memory Slots');
    const updated = repo.getSlot(projectId, 'current_goal');
    expect(updated?.content).toBe('Implement Phase 5 Memory Slots');

    // List slots
    repo.setSlot(projectId, 'scratchpad', 'Temporary agent notes');
    const allSlots = repo.listSlots(projectId);
    expect(allSlots.length).toBe(2);
  });

  it('rejects slot content exceeding bounded size limit', () => {
    const largeContent = 'a'.repeat(500);
    expect(() => {
      repo.setSlot(projectId, 'tiny_slot', largeContent, 200);
    }).toThrow(/exceeds slot size limit/);
  });
});
