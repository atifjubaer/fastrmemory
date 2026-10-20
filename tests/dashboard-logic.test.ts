import { describe, it, expect } from 'vitest';
import { layoutGraph } from '../ui/src/lib/graph-layout.js';
import { wordDiff, diffStats } from '../ui/src/lib/diff.js';
import type { GraphResponse } from '../ui/src/lib/api.js';

function sampleGraph(): GraphResponse {
  const nodes: GraphResponse['nodes'] = [];
  const edges: GraphResponse['edges'] = [];
  // 8 memory+file pairs, one 3-node chain with an entity, and an isolated memory.
  for (let i = 0; i < 8; i++) {
    nodes.push({ id: `mem_${i}`, label: `Memory ${i}`, type: 'memory', kind: 'rule' });
    nodes.push({ id: `src/file${i}.ts`, label: `src/file${i}.ts`, type: 'file' });
    edges.push({ source: `mem_${i}`, target: `src/file${i}.ts`, relation: 'links' });
  }
  nodes.push({ id: 'ent_jwt', label: 'jwt', type: 'entity' });
  edges.push({ source: 'mem_0', target: 'ent_jwt', relation: 'entity_link' });
  nodes.push({ id: 'mem_lonely', label: 'Lonely', type: 'memory', kind: 'workflow' });
  return { nodes, edges };
}

describe('dashboard graph layout', () => {
  it('is deterministic, places every node, and stays inside the requested width', () => {
    const a = layoutGraph(sampleGraph(), 960);
    const b = layoutGraph(sampleGraph(), 960);
    expect(a.nodes).toHaveLength(sampleGraph().nodes.length);
    expect(a.nodes.map((n) => [n.x, n.y])).toEqual(b.nodes.map((n) => [n.x, n.y]));
    for (const n of a.nodes) {
      expect(Number.isFinite(n.x) && Number.isFinite(n.y)).toBe(true);
      expect(n.x).toBeGreaterThanOrEqual(0);
      expect(n.x).toBeLessThanOrEqual(a.width);
      expect(n.y).toBeGreaterThanOrEqual(0);
      expect(n.y).toBeLessThanOrEqual(a.height);
    }
  });

  it('keeps nodes apart instead of stacking clusters on top of each other', () => {
    const { nodes } = layoutGraph(sampleGraph(), 960);
    let minDist = Infinity;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        minDist = Math.min(minDist, Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y));
      }
    }
    expect(minDist).toBeGreaterThan(20);
  });

  it('wraps components onto new rows on narrow canvases', () => {
    const wide = layoutGraph(sampleGraph(), 2400);
    const narrow = layoutGraph(sampleGraph(), 500);
    expect(narrow.height).toBeGreaterThan(wide.height);
  });

  it('handles an empty graph', () => {
    expect(layoutGraph({ nodes: [], edges: [] }, 960).nodes).toEqual([]);
  });
});

describe('dashboard word diff', () => {
  it('reconstructs both texts and counts changed words', () => {
    const before = 'Reserve stock then confirm inside one transaction';
    const after = 'Reserve stock then confirm with raw SQL row locks';
    const ops = wordDiff(before, after);
    expect(ops.filter((o) => o.type !== 'added').map((o) => o.text).join('')).toBe(before);
    expect(ops.filter((o) => o.type !== 'removed').map((o) => o.text).join('')).toBe(after);
    const stats = diffStats(ops);
    expect(stats.removed).toBe(3);
    expect(stats.added).toBe(5);
  });

  it('marks only the inserted line, not everything after it', () => {
    const ops = wordDiff('a b c d', 'a X b c d');
    expect(ops.filter((o) => o.type === 'added').map((o) => o.text.trim())).toEqual(['X']);
    expect(ops.some((o) => o.type === 'removed')).toBe(false);
  });
});
