import { createRequire } from 'node:module';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ReplayWorkspace } from '../ui/src/components/ReplayWorkspace.js';
import type { ReplayResponse } from '../ui/src/lib/api.js';

// The root package has no React dependency; the dashboard's own install provides it.
const uiRequire = createRequire(path.resolve(process.cwd(), 'ui/package.json'));
const React = uiRequire('react');
const { renderToStaticMarkup } = uiRequire('react-dom/server');

describe('ReplayWorkspace', () => {
  it('renders the empty state before a range is loaded', () => {
    const html = renderToStaticMarkup(React.createElement(ReplayWorkspace, { data: null }));
    expect(html).toContain('Choose a replay window');
    expect(html).toContain('start and end timestamp');
  });

  it('renders both snapshots, the diff sections, and open conflicts', () => {
    const data: ReplayResponse = {
      from: {
        at: '2026-01-01T00:00:00.000Z',
        tokenCount: 100,
        contentHash: 'a'.repeat(64),
        active: [],
        historyCount: 0,
        eventCount: 2,
        conflictCount: 0,
      },
      to: {
        at: '2026-01-02T00:00:00.000Z',
        tokenCount: 112,
        contentHash: 'b'.repeat(64),
        active: [
          {
            id: 'mem_new',
            title: 'Use WAL mode',
            module: 'db',
            kind: 'rule',
            status: 'verified',
            rewardScore: 1,
            validFrom: '2026-01-02T00:00:00.000Z',
            validTo: null,
            supersededById: null,
            files: ['src/db/schema.ts'],
          },
        ],
        historyCount: 1,
        eventCount: 4,
        conflictCount: 1,
      },
      diff: {
        fromAt: '2026-01-01T00:00:00.000Z',
        toAt: '2026-01-02T00:00:00.000Z',
        added: [
          {
            id: 'mem_new',
            title: 'Use WAL mode',
            module: 'db',
            kind: 'rule',
            status: 'verified',
            validFrom: '2026-01-02T00:00:00.000Z',
            validTo: null,
            supersededById: null,
          },
        ],
        superseded: [
          {
            id: 'mem_old',
            title: 'Use rollback journal',
            module: 'db',
            kind: 'rule',
            status: 'superseded',
            validFrom: '2026-01-01T00:00:00.000Z',
            validTo: '2026-01-02T00:00:00.000Z',
            supersededById: 'mem_new',
          },
        ],
        stillActive: [],
        changed: [],
        conflicts: [
          {
            id: 1,
            memoryAId: 'mem_new',
            memoryBId: 'mem_other',
            reason: 'Conflicting journal modes',
            score: 0.9,
            status: 'open',
          },
        ],
        tokenDelta: 12,
        newTrapIds: ['mem_trap'],
      },
      markdown: '## FastrMemory diff',
    };

    const html = renderToStaticMarkup(React.createElement(ReplayWorkspace, { data }));
    expect(html).toContain('Start snapshot');
    expect(html).toContain('End snapshot');
    expect(html).toContain('Memory diff');
    expect(html).toContain('+12');
    expect(html).toContain('Use WAL mode');
    expect(html).toContain('Use rollback journal');
    expect(html).toContain('Conflicting journal modes');
    expect(html).toContain('New error traps');
  });

  it('renders an empty snapshot window as an empty state', () => {
    const data: ReplayResponse = {
      from: {
        at: '2026-01-01T00:00:00.000Z',
        tokenCount: 0,
        contentHash: 'c'.repeat(64),
        active: [],
        historyCount: 0,
        eventCount: 0,
        conflictCount: 0,
      },
      to: {
        at: '2026-01-02T00:00:00.000Z',
        tokenCount: 0,
        contentHash: 'd'.repeat(64),
        active: [],
        historyCount: 0,
        eventCount: 0,
        conflictCount: 0,
      },
      diff: {
        fromAt: '2026-01-01T00:00:00.000Z',
        toAt: '2026-01-02T00:00:00.000Z',
        added: [],
        superseded: [],
        stillActive: [],
        changed: [],
        conflicts: [],
        tokenDelta: 0,
        newTrapIds: [],
      },
      markdown: '## FastrMemory diff',
    };

    const html = renderToStaticMarkup(React.createElement(ReplayWorkspace, { data }));
    expect(html).toContain('No memories in this window');
  });
});
