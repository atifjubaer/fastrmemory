import type { ReactNode } from 'react';
import { ArrowRight, Clock, Home, Inbox, Sparkles, Swords, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card';
import { EmptyState, ErrorState, KindBadge, PageHeader, SkeletonRows, StatTile, StatusBadge, Term } from '@/components/common';
import { ConflictCard } from '@/components/ConflictCard';
import { useConflicts, useMemories, useStatus, useTimeline } from '@/hooks/queries';
import { buildHash, navigate, openMemory } from '@/lib/router';
import { formatReward, relativeTime } from '@/lib/format';
import type { Memory } from '@/lib/api';

function MemoryRowButton({ m, right }: { m: Memory; right?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => openMemory(m.id)}
      className="flex w-full min-w-0 items-center gap-3 rounded-md px-2 py-2 text-left outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <KindBadge kind={m.kind} />
      <span className="min-w-0 flex-1 truncate text-sm">{m.title}</span>
      {right}
    </button>
  );
}

export function HomePage() {
  const status = useStatus();
  const memories = useMemories();
  const timeline = useTimeline(12);
  const conflicts = useConflicts();
  const s = status.data;

  const staging = (memories.data ?? []).filter((m) => m.status === 'staging').slice(0, 6);
  const lowReward = [...(memories.data ?? [])]
    .filter((m) => m.reward_score < 1)
    .sort((a, b) => a.reward_score - b.reward_score)
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        icon={Home}
        title={s ? s.projectName : 'Home'}
        description="What your agents have learned in this project, what needs review, and what changed recently."
      />

      {status.isError ? (
        <ErrorState error={status.error} onRetry={() => status.refetch()} className="mb-6" />
      ) : (
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile
            loading={status.isLoading}
            label="Active memories"
            value={s?.activeCount ?? 0}
            hint={s ? `${s.status.stagingCount} staging · ${s.modulesCount} modules` : undefined}
            onClick={() => navigate('memories')}
          />
          <StatTile
            loading={status.isLoading}
            label="Error traps"
            value={s?.trapsCount ?? 0}
            tone={s && s.trapsCount > 0 ? 'trap' : 'default'}
            hint="2.0x recall boost"
            onClick={() => navigate('traps')}
          />
          <StatTile
            loading={status.isLoading}
            label="Open conflicts"
            value={s?.conflictsCount ?? 0}
            tone={s && s.conflictsCount > 0 ? 'risk' : 'success'}
            hint={s && s.conflictsCount === 0 ? 'All rules consistent' : 'Needs a decision'}
            onClick={() => navigate('conflicts')}
          />
          <StatTile
            loading={status.isLoading}
            label="Ready tasks"
            value={s?.frontierCount ?? 0}
            tone="brand"
            hint={s ? `${s.actionsCount} actions total` : undefined}
            onClick={() => navigate('actions')}
          />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="min-w-0 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" aria-hidden /> Recent activity
            </CardTitle>
            <CardDescription>Newest memories, traps and supersessions.</CardDescription>
          </CardHeader>
          <CardContent>
            {timeline.isLoading ? (
              <SkeletonRows rows={6} />
            ) : timeline.isError ? (
              <ErrorState error={timeline.error} onRetry={() => timeline.refetch()} />
            ) : (timeline.data ?? []).length === 0 ? (
              <EmptyState icon={Sparkles} title="No memories yet">
                Agents add memories through <code className="font-mono">fastr_remember</code> and{' '}
                <code className="font-mono">fastr_trap_log</code>, or you can add one with <b>New memory</b>.
              </EmptyState>
            ) : (
              <ol className="flex flex-col">
                {(timeline.data ?? []).map((e) => (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => openMemory(e.id)}
                      className="flex w-full min-w-0 items-center gap-3 rounded-md px-2 py-2 text-left outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <KindBadge kind={e.kind} />
                      <span className={`min-w-0 flex-1 truncate text-sm ${e.status === 'superseded' ? 'text-muted-foreground line-through' : ''}`}>
                        {e.title}
                      </span>
                      <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">{e.module}</span>
                      <span className="shrink-0 text-right text-xs whitespace-nowrap text-muted-foreground">{relativeTime(e.createdAt)}</span>
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>

        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Inbox className="size-4 text-muted-foreground" aria-hidden /> Awaiting verification
              </CardTitle>
              <CardDescription>
                <Term k="staging">Staging</Term> memories agents recorded but nobody confirmed yet.
              </CardDescription>
              <CardAction>
                <Button variant="ghost" size="xs" asChild>
                  <a href={buildHash('memories', null, { status: 'staging' })}>
                    All <ArrowRight aria-hidden />
                  </a>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              {memories.isLoading ? (
                <SkeletonRows rows={3} />
              ) : staging.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nothing waiting. Every recorded memory is verified.</p>
              ) : (
                staging.map((m) => <MemoryRowButton key={m.id} m={m} right={<StatusBadge status={m.status} />} />)
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="size-4 text-muted-foreground" aria-hidden /> Low reward
              </CardTitle>
              <CardDescription>
                Memories agents rated as unhelpful (<Term k="reward">reward</Term> below 1.0x).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {memories.isLoading ? (
                <SkeletonRows rows={3} />
              ) : lowReward.length === 0 ? (
                <p className="text-sm text-muted-foreground">No memory has negative feedback.</p>
              ) : (
                lowReward.map((m) => (
                  <MemoryRowButton
                    key={m.id}
                    m={m}
                    right={<span className="font-mono text-xs text-risk tabular-nums">{formatReward(m.reward_score)}</span>}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {(conflicts.data ?? []).length > 0 && (
        <section className="mt-6" aria-labelledby="home-conflicts">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="home-conflicts" className="flex items-center gap-2 font-semibold">
              <Swords className="size-4 text-risk" aria-hidden /> Open conflicts
            </h2>
            <Button variant="ghost" size="xs" asChild>
              <a href={buildHash('conflicts')}>
                All conflicts <ArrowRight aria-hidden />
              </a>
            </Button>
          </div>
          <div className="grid gap-3">
            {(conflicts.data ?? []).slice(0, 2).map((c) => (
              <ConflictCard key={c.id} conflict={c} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
