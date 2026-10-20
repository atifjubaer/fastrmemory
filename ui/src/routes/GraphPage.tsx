import * as React from 'react';
import { Boxes, FileCode2, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState, ErrorState, PageHeader, SkeletonRows } from '@/components/common';
import { useGraph } from '@/hooks/queries';
import { useDebounced } from '@/hooks/useDebounced';
import { navigate, openMemory, useRoute } from '@/lib/router';
import type { GraphNode } from '@/lib/api';
import { layoutGraph, type LaidOutNode } from '@/lib/graph-layout';
import { cn } from '@/lib/utils';

const W = 960;

function nodeColor(p: GraphNode): string {
  if (p.type === 'file') return 'var(--muted-foreground)';
  if (p.type === 'entity') return 'var(--pinned)';
  return p.kind === 'error_trap' ? 'var(--trap)' : 'var(--brand)';
}

export default function GraphPage() {
  const route = useRoute();
  const file = route.query.get('file') ?? '';
  const [text, setText] = React.useState(file);
  const debounced = useDebounced(text.trim(), 400);
  React.useEffect(() => {
    if (debounced !== file) navigate('graph', null, { file: debounced });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const graph = useGraph(file || undefined);
  const layout = React.useMemo(() => (graph.data ? layoutGraph(graph.data, W) : null), [graph.data]);
  const pts = layout?.nodes ?? [];
  const byId = React.useMemo(() => new Map(pts.map((p) => [p.id, p])), [pts]);
  const [hover, setHover] = React.useState<string | null>(null);

  const neighbours = React.useMemo(() => {
    if (!hover || !graph.data) return null;
    const set = new Set([hover]);
    for (const e of graph.data.edges) {
      if (e.source === hover) set.add(e.target);
      if (e.target === hover) set.add(e.source);
    }
    return set;
  }, [hover, graph.data]);

  const activate = (p: LaidOutNode) => {
    if (p.type === 'memory') openMemory(p.id);
    else if (p.type === 'file') {
      setText(p.label);
      navigate('graph', null, { file: p.label });
    }
  };

  return (
    <div>
      <PageHeader
        icon={Boxes}
        title="Knowledge graph"
        description="How memories, files and named entities connect. Recall walks these links (spreading activation) when an agent edits a file."
      />
      <div className="mb-3 flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <FileCode2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Focus on a file, e.g. src/auth/jwt.ts (2-hop neighbourhood)"
            aria-label="Focus file"
            className="pl-9 font-mono"
          />
        </div>
        {file && (
          <Button variant="ghost" onClick={() => { setText(''); navigate('graph'); }}>
            <X aria-hidden /> Whole project
          </Button>
        )}
      </div>

      {graph.isLoading ? (
        <SkeletonRows rows={6} />
      ) : graph.isError ? (
        <ErrorState error={graph.error} onRetry={() => graph.refetch()} />
      ) : pts.length === 0 ? (
        <EmptyState icon={Boxes} title={file ? 'Nothing linked to this file' : 'The graph is empty'}>
          Memories join the graph when they are linked to files (the files argument of fastr_remember / fastr_trap_log) or mention named
          entities.
        </EmptyState>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <svg viewBox={`0 0 ${layout?.width ?? W} ${Math.max(layout?.height ?? 0, 240)}`} className="block h-auto w-full" role="group" aria-label={`Graph with ${pts.length} nodes`}>
            <g>
              {graph.data!.edges.map((e, i) => {
                const a = byId.get(e.source);
                const b = byId.get(e.target);
                if (!a || !b) return null;
                const dim = neighbours && !(neighbours.has(e.source) && neighbours.has(e.target));
                return (
                  <line
                    key={i}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--muted-foreground)"
                    strokeOpacity={dim ? 0.08 : 0.35}
                    strokeWidth={1}
                  />
                );
              })}
            </g>
            <g>
              {pts.map((p) => {
                const dim = neighbours && !neighbours.has(p.id);
                const r = p.type === 'memory' ? 7 : p.type === 'file' ? 5 : 4.5;
                const showLabel = !dim && (pts.length <= 60 || neighbours?.has(p.id) || p.type === 'file');
                return (
                  <g
                    key={p.id}
                    transform={`translate(${p.x},${p.y})`}
                    role="button"
                    tabIndex={p.type === 'entity' ? -1 : 0}
                    aria-label={`${p.type}: ${p.label}`}
                    className={cn('outline-none', p.type !== 'entity' && 'cursor-pointer')}
                    opacity={dim ? 0.25 : 1}
                    onMouseEnter={() => setHover(p.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(p.id)}
                    onBlur={() => setHover(null)}
                    onClick={() => activate(p)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        activate(p);
                      }
                    }}
                  >
                    {p.type === 'file' ? (
                      <rect x={-r} y={-r} width={r * 2} height={r * 2} rx={1.5} fill={nodeColor(p)} />
                    ) : (
                      <circle r={r} fill={nodeColor(p)} stroke="var(--card)" strokeWidth={1.5} />
                    )}
                    {showLabel && (
                      <text x={r + 4} y={4} fontSize={11} fill="var(--foreground)" className="pointer-events-none">
                        {p.label.length > 32 ? `${p.label.slice(0, 31)}…` : p.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t px-3 py-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-brand" aria-hidden /> Memory</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-trap" aria-hidden /> Error trap</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-muted-foreground" aria-hidden /> File (click to focus)</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-pinned" aria-hidden /> Entity</span>
            <span className="ml-auto inline-flex items-center gap-1"><Maximize2 className="size-3" aria-hidden /> {pts.length} nodes · {graph.data!.edges.length} links</span>
          </div>
        </div>
      )}
    </div>
  );
}
