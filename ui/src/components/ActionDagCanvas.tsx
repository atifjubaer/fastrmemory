import * as React from 'react';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ActionEdge, ActionItem, ActionStatus } from '@/lib/api';
import { cn } from '@/lib/utils';

const NODE_W = 200;
const NODE_H = 56;
const COL_GAP = 90;
const ROW_GAP = 22;
const PAD = 40;

export const STATUS_STYLE: Record<ActionStatus, { label: string; stroke: string; dot: string }> = {
  pending: { label: 'Pending', stroke: 'var(--border)', dot: 'bg-muted-foreground' },
  active: { label: 'Active', stroke: 'var(--brand)', dot: 'bg-brand' },
  blocked: { label: 'Blocked', stroke: 'var(--risk)', dot: 'bg-risk' },
  done: { label: 'Done', stroke: 'var(--success)', dot: 'bg-success' },
  cancelled: { label: 'Cancelled', stroke: 'var(--muted-foreground)', dot: 'bg-muted-foreground/50' },
};

interface Placed {
  action: ActionItem;
  x: number;
  y: number;
}

/**
 * Layered layout: each action sits one column right of its deepest prerequisite. Deterministic,
 * so the graph never jitters or re-simulates when data refreshes.
 */
function layout(actions: ActionItem[]): { nodes: Placed[]; width: number; height: number } {
  const byId = new Map(actions.map((a) => [a.id, a]));
  const depth = new Map<string, number>();
  const visiting = new Set<string>();
  const depthOf = (id: string): number => {
    const known = depth.get(id);
    if (known !== undefined) return known;
    if (visiting.has(id)) return 0; // cycle guard
    visiting.add(id);
    const a = byId.get(id);
    const d = a && a.requires.length ? 1 + Math.max(...a.requires.filter((r) => byId.has(r)).map(depthOf), -1) : 0;
    visiting.delete(id);
    depth.set(id, d);
    return d;
  };
  const columns = new Map<number, ActionItem[]>();
  for (const a of actions) {
    const d = depthOf(a.id);
    const col = columns.get(d) ?? [];
    col.push(a);
    columns.set(d, col);
  }
  const nodes: Placed[] = [];
  let maxRows = 0;
  for (const [d, col] of columns) {
    col.sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));
    maxRows = Math.max(maxRows, col.length);
    col.forEach((action, i) => nodes.push({ action, x: PAD + d * (NODE_W + COL_GAP), y: PAD + i * (NODE_H + ROW_GAP) }));
  }
  const cols = Math.max(1, columns.size);
  return {
    nodes,
    width: PAD * 2 + cols * NODE_W + (cols - 1) * COL_GAP,
    height: PAD * 2 + maxRows * NODE_H + Math.max(0, maxRows - 1) * ROW_GAP,
  };
}

export function ActionDagCanvas({
  actions,
  edges,
  selectedId,
  onSelect,
}: {
  actions: ActionItem[];
  edges: ActionEdge[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const { nodes, width, height } = React.useMemo(() => layout(actions), [actions]);
  const pos = React.useMemo(() => new Map(nodes.map((n) => [n.action.id, n])), [nodes]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [view, setView] = React.useState({ scale: 1, x: 0, y: 0 });
  const drag = React.useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null);

  const fit = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const scale = Math.min(1.2, Math.max(0.3, Math.min(el.clientWidth / width, el.clientHeight / height)));
    setView({ scale, x: (el.clientWidth - width * scale) / 2, y: Math.max(0, (el.clientHeight - height * scale) / 2) });
  }, [width, height]);

  React.useEffect(() => {
    fit();
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  // Wheel zoom needs a non-passive listener; React's onWheel is passive, so preventDefault would be ignored.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setView((v) => {
        const scale = Math.min(2.5, Math.max(0.25, v.scale * (e.deltaY < 0 ? 1.1 : 1 / 1.1)));
        return { scale, x: mx - ((mx - v.x) * scale) / v.scale, y: my - ((my - v.y) * scale) / v.scale };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Pointer capture keeps the drag alive (and ends it) even when the pointer leaves the canvas.
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('[data-node]')) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    setView((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }));
  };
  const endDrag = () => {
    drag.current = null;
  };

  const zoom = (factor: number) => {
    const el = containerRef.current;
    if (!el) return;
    const cx = el.clientWidth / 2;
    const cy = el.clientHeight / 2;
    setView((v) => {
      const scale = Math.min(2.5, Math.max(0.25, v.scale * factor));
      return { scale, x: cx - ((cx - v.x) * scale) / v.scale, y: cy - ((cy - v.y) * scale) / v.scale };
    });
  };

  const requiresEdges = edges.filter((e) => e.edge_type !== 'conflicts_with');
  const conflictEdges = edges.filter((e) => e.edge_type === 'conflicts_with');

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card">
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <Button variant="outline" size="icon-sm" onClick={() => zoom(1.2)} aria-label="Zoom in"><ZoomIn aria-hidden /></Button>
        <Button variant="outline" size="icon-sm" onClick={() => zoom(1 / 1.2)} aria-label="Zoom out"><ZoomOut aria-hidden /></Button>
        <Button variant="outline" size="icon-sm" onClick={fit} aria-label="Fit to view"><Maximize2 aria-hidden /></Button>
      </div>
      <div
        ref={containerRef}
        className="h-[420px] cursor-grab touch-none select-none active:cursor-grabbing sm:h-[520px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <svg width="100%" height="100%" role="group" aria-label="Action dependency graph">
          <defs>
            <marker id="dag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--muted-foreground)" />
            </marker>
          </defs>
          <g transform={`translate(${view.x},${view.y}) scale(${view.scale})`}>
            {requiresEdges.map((e) => {
              // edge: source requires target -> draw prerequisite (target) -> dependent (source)
              const from = pos.get(e.target_action_id);
              const to = pos.get(e.source_action_id);
              if (!from || !to) return null;
              const x1 = from.x + NODE_W;
              const y1 = from.y + NODE_H / 2;
              const x2 = to.x;
              const y2 = to.y + NODE_H / 2;
              const mid = (x1 + x2) / 2;
              return (
                <path
                  key={`${e.source_action_id}-${e.target_action_id}`}
                  d={`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2 - 2},${y2}`}
                  fill="none"
                  stroke="var(--muted-foreground)"
                  strokeOpacity={0.55}
                  strokeWidth={1.5}
                  markerEnd="url(#dag-arrow)"
                />
              );
            })}
            {conflictEdges.map((e) => {
              const a = pos.get(e.source_action_id);
              const b = pos.get(e.target_action_id);
              if (!a || !b) return null;
              return (
                <line
                  key={`c-${e.source_action_id}-${e.target_action_id}`}
                  x1={a.x + NODE_W / 2}
                  y1={a.y + NODE_H / 2}
                  x2={b.x + NODE_W / 2}
                  y2={b.y + NODE_H / 2}
                  stroke="var(--risk)"
                  strokeDasharray="5 4"
                  strokeWidth={1.5}
                />
              );
            })}
            {nodes.map(({ action, x, y }) => {
              const style = STATUS_STYLE[action.status];
              const selected = action.id === selectedId;
              return (
                <g
                  key={action.id}
                  data-node
                  transform={`translate(${x},${y})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${action.title}, ${style.label}${action.isFrontier ? ', ready' : ''}`}
                  aria-pressed={selected}
                  className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[3]"
                  onClick={() => onSelect(action.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(action.id);
                    }
                  }}
                >
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx={10}
                    fill={action.isFrontier ? 'var(--brand-weak)' : 'var(--card)'}
                    stroke={selected ? 'var(--ring)' : style.stroke}
                    strokeWidth={selected ? 2.5 : 1.5}
                  />
                  <text x={12} y={22} fontSize={12} fontWeight={600} fill="var(--foreground)">
                    {action.title.length > 26 ? `${action.title.slice(0, 25)}…` : action.title}
                  </text>
                  <text x={12} y={41} fontSize={10.5} fill="var(--muted-foreground)">
                    {style.label} · P{action.priority}
                    {action.assigned_to ? ` · ${action.assigned_to.slice(0, 14)}` : ''}
                    {action.isFrontier ? ' · ready' : ''}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t px-3 py-2 text-xs text-muted-foreground">
        {(Object.keys(STATUS_STYLE) as ActionStatus[]).map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={cn('size-2 rounded-full', STATUS_STYLE[s].dot)} aria-hidden /> {STATUS_STYLE[s].label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-brand-weak ring-1 ring-brand" aria-hidden /> Ready (frontier)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0 w-4 border-t border-dashed border-risk" aria-hidden /> Conflicts with
        </span>
        <span className="ml-auto hidden sm:inline">Drag to pan · Ctrl+scroll to zoom</span>
      </div>
    </div>
  );
}
