import * as React from 'react';
import type { Memory } from '@/lib/api';
import { squarify } from '@/utils/squarify';

const HEADER = 20;
const GAP = 3;

export type TreemapSize = 'count' | 'recalls';

function memoryWeight(m: Memory, size: TreemapSize): number {
  return size === 'recalls' ? 1 + m.retrieval_count : 1;
}

function fill(m: Memory): string {
  if (m.kind === 'error_trap') return 'var(--trap)';
  if (m.kind === 'decision') return 'var(--pinned)';
  if (m.kind === 'workflow') return 'var(--success)';
  return 'var(--brand)';
}

/**
 * Modules as blocks, memories as tiles inside them. SVG sized from the container with a
 * ResizeObserver, so hit areas always match what is drawn and colours follow the theme.
 */
export function TreemapCanvas({
  memories,
  size,
  onSelect,
}: {
  memories: Memory[];
  size: TreemapSize;
  onSelect: (id: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const height = Math.max(360, Math.min(640, Math.round(width * 0.6)));

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout = React.useMemo(() => {
    if (!width) return [];
    const groups = new Map<string, Memory[]>();
    for (const m of memories) {
      const list = groups.get(m.module) ?? [];
      list.push(m);
      groups.set(m.module, list);
    }
    const modules = [...groups.entries()]
      .map(([name, list]) => ({ name, list: [...list].sort((a, b) => memoryWeight(b, size) - memoryWeight(a, size)) }))
      .map((g) => ({ ...g, total: g.list.reduce((s, m) => s + memoryWeight(m, size), 0) }))
      .sort((a, b) => b.total - a.total);
    const outer = squarify(modules.map((g) => g.total), 0, 0, width, height);
    return modules.map((g, i) => {
      const r = outer[i];
      const inner =
        r.w > GAP * 2 && r.h > HEADER + GAP
          ? squarify(g.list.map((m) => memoryWeight(m, size)), r.x + GAP, r.y + HEADER, r.w - GAP * 2, r.h - HEADER - GAP)
          : [];
      return { ...g, rect: r, tiles: g.list.map((m, j) => ({ m, r: inner[j] })).filter((t) => t.r && t.r.w > 1 && t.r.h > 1) };
    });
  }, [memories, size, width, height]);

  return (
    <div ref={ref} className="w-full">
      {width > 0 && (
        <svg width={width} height={height} role="group" aria-label="Memories by module" className="block">
          {layout.map((g) => (
            <g key={g.name}>
              <rect x={g.rect.x + 1} y={g.rect.y + 1} width={Math.max(0, g.rect.w - 2)} height={Math.max(0, g.rect.h - 2)} rx={8} fill="var(--muted)" />
              {g.rect.w > 60 && (
                <text x={g.rect.x + 8} y={g.rect.y + 14} fontSize={11} fontWeight={600} fill="var(--muted-foreground)">
                  {g.name.length * 6.5 > g.rect.w - 40 ? `${g.name.slice(0, Math.max(3, Math.floor((g.rect.w - 40) / 6.5)))}…` : g.name} · {g.list.length}
                </text>
              )}
              {g.tiles.map(({ m, r }) => {
                const showText = r.w > 70 && r.h > 26;
                return (
                  <g
                    key={m.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${m.title} (${g.name}, ${m.retrieval_count} recalls)`}
                    className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-ring [&:focus-visible>rect]:stroke-[3] [&:hover>rect]:opacity-100"
                    onClick={() => onSelect(m.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect(m.id);
                      }
                    }}
                  >
                    <title>{`${m.title}\n${g.name} · ${m.kind} · reward ${m.reward_score.toFixed(2)} · ${m.retrieval_count} recalls`}</title>
                    <rect
                      x={r.x + 1}
                      y={r.y + 1}
                      width={Math.max(0, r.w - 2)}
                      height={Math.max(0, r.h - 2)}
                      rx={4}
                      fill={fill(m)}
                      opacity={m.status === 'staging' ? 0.45 : 0.8}
                      stroke="var(--card)"
                      strokeWidth={1}
                    />
                    {showText && (
                      <text x={r.x + 6} y={r.y + 16} fontSize={11} fill="#fff" className="pointer-events-none">
                        {m.title.length * 6.2 > r.w - 12 ? `${m.title.slice(0, Math.max(3, Math.floor((r.w - 12) / 6.2) - 1))}…` : m.title}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
