import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GitFork, Loader2, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState, ErrorState, PageHeader, SkeletonRows, Term } from '@/components/common';
import { ActionDagCanvas, STATUS_STYLE } from '@/components/ActionDagCanvas';
import { useActions } from '@/hooks/queries';
import { api, type ActionItem, type ActionStatus } from '@/lib/api';
import { navigate, useRoute } from '@/lib/router';
import { relativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';

const STATUS_ORDER: ActionStatus[] = ['active', 'pending', 'blocked', 'done', 'cancelled'];

function ActionDetail({ action, all, onClose }: { action: ActionItem; all: Map<string, ActionItem>; onClose: () => void }) {
  const link = (id: string) => (
    <li key={id}>
      <button
        type="button"
        onClick={() => navigate('actions', id)}
        className="truncate text-left text-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {all.get(id)?.title ?? id}
      </button>
    </li>
  );
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-start gap-2">
          <span className="min-w-0 flex-1">{action.title}</span>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close details">
            <X aria-hidden />
          </Button>
        </CardTitle>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline">{STATUS_STYLE[action.status].label}</Badge>
          <Badge variant="muted">Priority {action.priority}</Badge>
          {action.isFrontier && <Badge variant="brand">Ready</Badge>}
          {action.assigned_to && <Badge variant="secondary">{action.assigned_to}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        {action.description && <p className="whitespace-pre-wrap text-muted-foreground">{action.description}</p>}
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <div className="mb-1 text-xs font-medium text-muted-foreground">Requires</div>
            {action.requires.length ? <ul>{action.requires.map(link)}</ul> : <p className="text-xs text-muted-foreground">Nothing</p>}
          </div>
          <div>
            <div className="mb-1 text-xs font-medium text-muted-foreground">Unlocks</div>
            {action.unlocks.length ? <ul>{action.unlocks.map(link)}</ul> : <p className="text-xs text-muted-foreground">Nothing</p>}
          </div>
          <div>
            <div className="mb-1 text-xs font-medium text-muted-foreground">Conflicts with</div>
            {action.conflictsWith.length ? <ul>{action.conflictsWith.map(link)}</ul> : <p className="text-xs text-muted-foreground">Nothing</p>}
          </div>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground">
          {action.id} · created {relativeTime(action.created_at)}
          {action.completed_at ? ` · completed ${relativeTime(action.completed_at)}` : ''}
        </p>
      </CardContent>
    </Card>
  );
}

export default function ActionsPage() {
  const route = useRoute();
  const actions = useActions();
  const qc = useQueryClient();
  const seed = useMutation({
    mutationFn: api.seedActions,
    onSuccess: (res) => {
      toast.success(res.alreadySeeded ? 'Example workflow already exists' : 'Added an example 3-step workflow');
      void qc.invalidateQueries();
    },
    onError: (err) => toast.error('Could not add the example', { description: (err as Error).message }),
  });

  const list = actions.data?.actions ?? [];
  const byId = React.useMemo(() => new Map(list.map((a) => [a.id, a])), [list]);
  const selected = route.id ? byId.get(route.id) ?? null : null;

  return (
    <div>
      <PageHeader
        icon={GitFork}
        title="Actions"
        description={
          <>
            Work items agents coordinate on, with prerequisites and conflicts. <Term k="frontier">Frontier</Term> tasks are ready to claim
            with fastr_next.
          </>
        }
      />
      {actions.isLoading || (actions.isFetching && list.length === 0) ? (
        <SkeletonRows rows={6} />
      ) : actions.isError ? (
        <ErrorState error={actions.error} onRetry={() => actions.refetch()} />
      ) : list.length === 0 ? (
        <EmptyState
          icon={GitFork}
          title="No actions yet"
          action={
            <Button size="sm" variant="outline" onClick={() => seed.mutate()} disabled={seed.isPending}>
              {seed.isPending ? <Loader2 className="animate-spin" aria-hidden /> : <Sparkles aria-hidden />} Add an example workflow
            </Button>
          }
        >
          Agents create actions with fastr_action_create and claim ready ones with fastr_next. The example adds three demo tasks to this
          project's database.
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-4">
          <ActionDagCanvas
            actions={list}
            edges={actions.data?.edges ?? []}
            selectedId={selected?.id ?? null}
            onSelect={(id) => navigate('actions', id === selected?.id ? null : id)}
          />
          {selected && <ActionDetail action={selected} all={byId} onClose={() => navigate('actions')} />}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {STATUS_ORDER.map((s) => {
              const items = list.filter((a) => a.status === s);
              return (
                <section key={s} aria-labelledby={`col-${s}`} className="min-w-0 rounded-xl border bg-card p-3">
                  <h2 id={`col-${s}`} className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <span className={cn('size-2 rounded-full', STATUS_STYLE[s].dot)} aria-hidden />
                    {STATUS_STYLE[s].label}
                    <span className="ml-auto font-mono text-xs text-muted-foreground">{items.length}</span>
                  </h2>
                  {items.length === 0 ? (
                    <p className="text-xs text-muted-foreground">None</p>
                  ) : (
                    <ul className="flex flex-col gap-1">
                      {items.map((a) => (
                        <li key={a.id}>
                          <button
                            type="button"
                            onClick={() => navigate('actions', a.id)}
                            aria-current={a.id === selected?.id ? 'true' : undefined}
                            className={cn(
                              'flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring/50',
                              a.id === selected?.id && 'bg-accent'
                            )}
                          >
                            <span className="truncate">{a.title}</span>
                            {a.isFrontier && <Badge variant="brand" className="ml-auto shrink-0 text-[10px]">ready</Badge>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
