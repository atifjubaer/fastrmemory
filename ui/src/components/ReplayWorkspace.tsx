import { ArrowDownRight, ArrowUpRight, GitCompare, History, ShieldAlert, Swords, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState, ErrorState, SkeletonRows, StatTile } from '@/components/common';
import { absoluteTime, pluralize } from '@/lib/format';
import type { ReplayDiffEntry, ReplayResponse, ReplaySnapshotView } from '@/lib/api';

const MAX_ENTRIES = 8;

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <div className="text-[11px] font-medium text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-mono text-sm tabular-nums">{value}</div>
      {hint && <div className="truncate text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function SnapshotCard({ label, snapshot }: { label: string; snapshot: ReplaySnapshotView }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="size-4 text-brand" aria-hidden />
          {label}
        </CardTitle>
        <CardDescription>
          <span className="font-mono text-xs">{snapshot.at}</span>
          <span className="ml-2 text-xs">{absoluteTime(snapshot.at)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="Active" value={String(snapshot.active.length)} />
          <Metric label="History" value={String(snapshot.historyCount)} />
          <Metric label="Events" value={snapshot.eventCount.toLocaleString()} />
          <Metric label="Conflicts" value={String(snapshot.conflictCount)} />
        </div>
        <div className="grid grid-cols-2 gap-3 border-t pt-3">
          <Metric label="Tokens" value={snapshot.tokenCount.toLocaleString()} />
          <Metric label="Content hash" value={snapshot.contentHash.slice(0, 12)} hint={snapshot.contentHash} />
        </div>
        <div>
          <div className="mb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">Active set</div>
          {snapshot.active.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active memories at this timestamp.</p>
          ) : (
            <ul className="space-y-1.5">
              {snapshot.active.slice(0, MAX_ENTRIES).map((memory) => (
                <li
                  key={memory.id}
                  className="flex min-w-0 items-center gap-2 rounded-md border bg-muted/20 px-2 py-1.5"
                >
                  <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
                    {memory.kind}
                  </Badge>
                  <span className="truncate text-sm">{memory.title}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">{memory.module}</span>
                </li>
              ))}
            </ul>
          )}
          {snapshot.active.length > MAX_ENTRIES && (
            <p className="mt-2 text-xs text-muted-foreground">+{snapshot.active.length - MAX_ENTRIES} more active memories</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function DiffList({ entries, empty }: { entries: ReplayDiffEntry[]; empty: string }) {
  if (entries.length === 0) return <p className="text-sm text-muted-foreground">{empty}</p>;
  return (
    <>
      <ul className="space-y-1.5">
        {entries.slice(0, MAX_ENTRIES).map((entry) => (
          <li key={entry.id} className="flex min-w-0 items-center gap-2 rounded-md border bg-muted/20 px-2 py-1.5">
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{entry.id}</span>
            <span className="truncate text-sm">{entry.title}</span>
            <Badge variant="muted" className="ml-auto shrink-0 font-mono text-[10px]">
              {entry.kind}
            </Badge>
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{entry.module}</span>
          </li>
        ))}
      </ul>
      {entries.length > MAX_ENTRIES && <p className="mt-2 text-xs text-muted-foreground">+{entries.length - MAX_ENTRIES} more</p>}
    </>
  );
}

function DiffSection({
  title,
  icon: Icon,
  entries,
  empty,
}: {
  title: string;
  icon: LucideIcon;
  entries: ReplayDiffEntry[];
  empty: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" aria-hidden />
          {title}
          <Badge variant="muted">{entries.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DiffList entries={entries} empty={empty} />
      </CardContent>
    </Card>
  );
}

export interface ReplayWorkspaceProps {
  data: ReplayResponse | null | undefined;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

/**
 * Presentational replay workspace. The route owns the time-range controls and
 * data fetching; this component only renders snapshots and the diff.
 */
export function ReplayWorkspace({ data, isLoading = false, error, onRetry }: ReplayWorkspaceProps) {
  if (isLoading) return <SkeletonRows rows={8} />;
  if (error) return <ErrorState error={error} onRetry={onRetry} />;
  if (!data) {
    return (
      <EmptyState icon={History} title="Choose a replay window">
        Pick a start and end timestamp to reconstruct the active memory set at each point and compare what changed.
      </EmptyState>
    );
  }

  const hasAny =
    data.from.active.length > 0 ||
    data.to.active.length > 0 ||
    data.diff.added.length > 0 ||
    data.diff.superseded.length > 0 ||
    data.diff.stillActive.length > 0 ||
    data.diff.changed.length > 0 ||
    data.diff.conflicts.length > 0;

  if (!hasAny) {
    return (
      <EmptyState icon={History} title="No memories in this window">
        No active memories existed at either timestamp. Move the range or add memories first.
      </EmptyState>
    );
  }

  const delta = data.diff.tokenDelta;
  const deltaLabel = `${delta >= 0 ? '+' : ''}${delta.toLocaleString()}`;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile
          label="Token delta"
          value={deltaLabel}
          hint={delta === 0 ? 'No token change' : delta > 0 ? 'The active set grew' : 'The active set shrank'}
          tone={delta > 0 ? 'brand' : delta < 0 ? 'risk' : 'default'}
        />
        <StatTile label="Added memories" value={String(data.diff.added.length)} hint="Present in the end snapshot only" />
        <StatTile
          label="Open conflicts"
          value={String(data.diff.conflicts.length)}
          hint="Both sides active at the end"
          tone={data.diff.conflicts.length > 0 ? 'risk' : 'default'}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SnapshotCard label="Start snapshot" snapshot={data.from} />
        <SnapshotCard label="End snapshot" snapshot={data.to} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <GitCompare className="size-4 text-brand" aria-hidden />
          Memory diff
        </h2>
        <p className="text-xs text-muted-foreground">
          {pluralize(data.diff.added.length, 'addition')}, {pluralize(data.diff.superseded.length, 'supersession')},{' '}
          {pluralize(data.diff.changed.length, 'change')}
        </p>
      </div>

      {data.diff.newTrapIds.length > 0 && (
        <div className="flex items-start gap-2 rounded-xl border border-trap/40 bg-trap-weak px-4 py-3 text-sm text-trap" role="status">
          <ShieldAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">New error traps in the end snapshot</p>
            <p className="mt-0.5 font-mono text-xs">{data.diff.newTrapIds.join(', ')}</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <DiffSection
          title="Added"
          icon={ArrowUpRight}
          entries={data.diff.added}
          empty="No memories were added in this window."
        />
        <DiffSection
          title="Superseded"
          icon={ArrowDownRight}
          entries={data.diff.superseded}
          empty="No memories were superseded in this window."
        />
        <DiffSection
          title="Changed"
          icon={GitCompare}
          entries={data.diff.changed}
          empty="No active memory changed its content or metadata."
        />
        <DiffSection
          title="Still active"
          icon={History}
          entries={data.diff.stillActive}
          empty="No memories stayed active across both snapshots."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Swords className="size-4 text-muted-foreground" aria-hidden />
            Open conflicts
            <Badge variant={data.diff.conflicts.length > 0 ? 'risk' : 'muted'}>{data.diff.conflicts.length}</Badge>
          </CardTitle>
          <CardDescription>Conflicts are open at the end snapshot and both memories are still active.</CardDescription>
        </CardHeader>
        <CardContent>
          {data.diff.conflicts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open conflicts between active memories.</p>
          ) : (
            <ul className="space-y-2">
              {data.diff.conflicts.map((conflict) => (
                <li key={conflict.id} className="rounded-md border bg-muted/20 px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">#{conflict.id}</span>
                    <span className="text-sm">{conflict.reason}</span>
                    <Badge variant="risk" className="ml-auto font-mono text-[10px]">
                      score {conflict.score}
                    </Badge>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {conflict.memoryAId} vs {conflict.memoryBId}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
