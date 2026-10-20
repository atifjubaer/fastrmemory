import * as React from 'react';
import { FlaskConical, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { EmptyState, ErrorState, KindBadge, PageHeader, SkeletonRows, Term } from '@/components/common';
import { useExplain } from '@/hooks/queries';
import { useDebounced } from '@/hooks/useDebounced';
import { navigate, openMemory, useRoute } from '@/lib/router';

const STREAMS = [
  { key: 'rankA', label: 'BM25', className: 'bg-brand' },
  { key: 'rankB', label: 'Vector', className: 'bg-success' },
  { key: 'rankC', label: 'Graph', className: 'bg-pinned' },
] as const;

/** A rank of 0 means the stream did not return this memory. */
function RankCell({ rank }: { rank: number }) {
  return rank > 0 ? <span className="font-mono tabular-nums">#{rank}</span> : <span className="text-muted-foreground">—</span>;
}

export function SearchLabPage() {
  const route = useRoute();
  const initial = route.query.get('q') ?? '';
  const [text, setText] = React.useState(initial);
  const q = useDebounced(text.trim(), 300);
  const explain = useExplain(q);

  React.useEffect(() => {
    if (q !== initial) navigate('search', null, { q });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const results = explain.data?.results ?? [];
  const maxScore = Math.max(...results.map((r) => r.score), 0.0001);

  return (
    <div>
      <PageHeader
        icon={FlaskConical}
        title="Search Lab"
        description={
          <>
            See exactly how recall ranks memories for a query: each stream's rank and the fused <Term k="rrf">RRF</Term> score,
            including the trap and verified boosts.
          </>
        }
      />
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a query an agent might ask, e.g. jwt expiration"
          aria-label="Query"
          className="pl-9"
          autoFocus
        />
      </div>

      {!q ? (
        <EmptyState icon={FlaskConical} title="Enter a query">
          Results show which of the three streams (keywords, vectors, file graph) found each memory and the final ranking agents receive.
        </EmptyState>
      ) : explain.isLoading ? (
        <SkeletonRows rows={5} />
      ) : explain.isError ? (
        <ErrorState error={explain.error} onRetry={() => explain.refetch()} />
      ) : results.length === 0 ? (
        <EmptyState icon={Search} title="No memory matched">
          None of the streams found a match. Agents would get an empty recall for this query.
        </EmptyState>
      ) : (
        <>
          <p className="mb-2 text-sm text-muted-foreground" aria-live="polite">
            {results.length} result{results.length === 1 ? '' : 's'} · {explain.data?.totalTimeMs} ms end to end · ~{explain.data?.totalTokens} tokens
            returned to the agent
          </p>
          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">#</th>
                  <th className="px-3 py-2 text-left font-medium">Memory</th>
                  {STREAMS.map((s) => (
                    <th key={s.key} className="px-3 py-2 text-left font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`size-2 rounded-full ${s.className}`} aria-hidden />
                        {s.label}
                      </span>
                    </th>
                  ))}
                  <th className="w-48 px-3 py-2 text-left font-medium">Fused score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">{i + 1}</td>
                    <td className="w-full max-w-0 px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => openMemory(r.id)}
                        className="flex w-full min-w-0 max-w-full items-center gap-2 rounded-sm text-left outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        <KindBadge kind={r.kind} className="shrink-0" />
                        <span className="truncate">{r.title}</span>
                      </button>
                    </td>
                    {STREAMS.map((s) => (
                      <td key={s.key} className="px-3 py-2.5 text-xs">
                        <RankCell rank={r[s.key]} />
                      </td>
                    ))}
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted" aria-hidden>
                          <div className="h-full rounded-full bg-brand" style={{ width: `${(r.score / maxScore) * 100}%` }} />
                        </div>
                        <span className="w-14 text-right font-mono text-xs tabular-nums">{r.score.toFixed(4)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
