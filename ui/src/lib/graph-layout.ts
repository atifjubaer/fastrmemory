import type { GraphNode, GraphResponse } from './api';

export interface LaidOutNode extends GraphNode {
  x: number;
  y: number;
}

export interface GraphLayout {
  nodes: LaidOutNode[];
  width: number;
  height: number;
}

const LINK = 70; // ideal edge length inside a component
const LABEL_ROOM = 190; // horizontal space reserved to the right of each component for labels
const GAP = 36;

/** Seeded PRNG so the same data always produces the same picture. */
function prng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * Lays out each connected component with a small force simulation, then packs the components
 * into rows. Projects are mostly many small clusters (a memory plus the files it protects); laying
 * them out together makes clusters repel each other to the edges and collapse internally.
 */
export function layoutGraph(graph: GraphResponse, maxWidth: number): GraphLayout {
  const n = graph.nodes.length;
  if (n === 0) return { nodes: [], width: maxWidth, height: 0 };
  const index = new Map(graph.nodes.map((node, i) => [node.id, i]));
  const links = graph.edges
    .map((e) => [index.get(e.source), index.get(e.target)] as const)
    .filter((l): l is readonly [number, number] => l[0] !== undefined && l[1] !== undefined && l[0] !== l[1]);

  // Union-find over edges
  const parent = graph.nodes.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (const [a, b] of links) parent[find(a)] = find(b);
  const groups = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    const root = find(i);
    const g = groups.get(root) ?? [];
    g.push(i);
    groups.set(root, g);
  }

  const rand = prng(11);
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const boxes: Array<{ members: number[]; minX: number; minY: number; w: number; h: number }> = [];

  for (const members of groups.values()) {
    const m = members.length;
    members.forEach((i, j) => {
      // Start vertical (+90deg): two-node pairs then stack, keeping right-hand labels clear of each other.
      const angle = (j / m) * Math.PI * 2 + Math.PI / 2;
      x[i] = Math.cos(angle) * LINK * Math.sqrt(m) * 0.5 + rand();
      y[i] = Math.sin(angle) * LINK * Math.sqrt(m) * 0.5 + rand();
    });
    if (m > 1) {
      const inGroup = new Set(members);
      const groupLinks = links.filter(([a]) => inGroup.has(a));
      const iterations = m > 300 ? 80 : 200;
      for (let it = 0; it < iterations; it++) {
        const temp = LINK * 0.6 * (1 - it / iterations) + 0.5;
        const dx = new Map<number, number>();
        const dy = new Map<number, number>();
        for (const i of members) { dx.set(i, 0); dy.set(i, 0); }
        for (let p = 0; p < m; p++) {
          for (let q = p + 1; q < m; q++) {
            const i = members[p];
            const j = members[q];
            let vx = x[i] - x[j];
            let vy = y[i] - y[j];
            let d2 = vx * vx + vy * vy;
            if (d2 < 0.01) { vx = rand() - 0.5; vy = rand() - 0.5; d2 = 0.01; }
            const f = (LINK * LINK) / d2;
            dx.set(i, dx.get(i)! + vx * f); dy.set(i, dy.get(i)! + vy * f);
            dx.set(j, dx.get(j)! - vx * f); dy.set(j, dy.get(j)! - vy * f);
          }
        }
        for (const [a, b] of groupLinks) {
          const vx = x[a] - x[b];
          const vy = y[a] - y[b];
          const d = Math.sqrt(vx * vx + vy * vy) || 0.01;
          const f = d / LINK;
          dx.set(a, dx.get(a)! - vx * f); dy.set(a, dy.get(a)! - vy * f);
          dx.set(b, dx.get(b)! + vx * f); dy.set(b, dy.get(b)! + vy * f);
        }
        for (const i of members) {
          const ddx = dx.get(i)!;
          const ddy = dy.get(i)!;
          const len = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
          x[i] += (ddx / len) * Math.min(len, temp);
          y[i] += (ddy / len) * Math.min(len, temp);
        }
      }
    }
    if (m > 1) {
      // Rotate so the component's long axis is vertical: labels extend to the right, so a vertical
      // spread keeps them from running over neighbouring nodes.
      let cx = 0, cy = 0;
      for (const i of members) { cx += x[i]; cy += y[i]; }
      cx /= m; cy /= m;
      let sxx = 0, syy = 0, sxy = 0;
      for (const i of members) {
        const ux = x[i] - cx, uy = y[i] - cy;
        sxx += ux * ux; syy += uy * uy; sxy += ux * uy;
      }
      const major = 0.5 * Math.atan2(2 * sxy, sxx - syy); // angle of the principal axis
      const rot = Math.PI / 2 - major;
      const cos = Math.cos(rot), sin = Math.sin(rot);
      for (const i of members) {
        const ux = x[i] - cx, uy = y[i] - cy;
        x[i] = cx + ux * cos - uy * sin;
        y[i] = cy + ux * sin + uy * cos;
      }
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const i of members) {
      minX = Math.min(minX, x[i]); maxX = Math.max(maxX, x[i]);
      minY = Math.min(minY, y[i]); maxY = Math.max(maxY, y[i]);
    }
    boxes.push({ members, minX, minY, w: maxX - minX + LABEL_ROOM, h: maxY - minY + 24 });
  }

  // Shelf packing: biggest components first, left to right, wrapping at maxWidth.
  boxes.sort((a, b) => b.members.length - a.members.length || b.h - a.h);
  const nodes: LaidOutNode[] = [];
  let cursorX = GAP;
  let cursorY = GAP;
  let rowH = 0;
  let usedW = 0;
  for (const box of boxes) {
    if (cursorX > GAP && cursorX + box.w > maxWidth) {
      cursorX = GAP;
      cursorY += rowH + GAP;
      rowH = 0;
    }
    for (const i of box.members) {
      nodes.push({ ...graph.nodes[i], x: cursorX + (x[i] - box.minX) + 8, y: cursorY + (y[i] - box.minY) + 12 });
    }
    cursorX += box.w + GAP;
    usedW = Math.max(usedW, cursorX);
    rowH = Math.max(rowH, box.h);
  }
  return { nodes, width: Math.max(maxWidth, usedW), height: cursorY + rowH + GAP };
}
