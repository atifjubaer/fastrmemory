import { useState } from 'react';
import { GitCompare, History, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common';
import { ReplayWorkspace } from '@/components/ReplayWorkspace';
import { useReplay } from '@/hooks/queries';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Format a Date as the local `YYYY-MM-DDTHH:mm` value required by datetime-local inputs. */
function localInput(value: Date): string {
  const local = new Date(value.getTime() - value.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function rangeForDays(days: number): { from: string; to: string } {
  const to = new Date();
  const from = new Date(to.getTime() - days * DAY_MS);
  return { from: from.toISOString(), to: to.toISOString() };
}

export function ReplayPage() {
  const [initial] = useState(() => rangeForDays(7));
  const [fromLocal, setFromLocal] = useState(() => localInput(new Date(initial.from)));
  const [toLocal, setToLocal] = useState(() => localInput(new Date(initial.to)));
  const [range, setRange] = useState(initial);
  const [formError, setFormError] = useState<string | null>(null);
  const replay = useReplay(range.from, range.to);

  const applyRange = () => {
    const from = new Date(fromLocal);
    const to = new Date(toLocal);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      setFormError('Enter a valid start and end timestamp.');
      return;
    }
    if (from.getTime() > to.getTime()) {
      setFormError('The start timestamp must be before or equal to the end timestamp.');
      return;
    }
    setFormError(null);
    setRange({ from: from.toISOString(), to: to.toISOString() });
  };

  const applyPreset = (days: number) => {
    const next = rangeForDays(days);
    setFromLocal(localInput(new Date(next.from)));
    setToLocal(localInput(new Date(next.to)));
    setFormError(null);
    setRange(next);
  };

  return (
    <div>
      <PageHeader
        icon={History}
        title="Replay & Diff"
        description="Reconstruct the active memory set at two timestamps, inspect the snapshots, and review every addition, supersession, change, and open conflict between them."
        actions={
          <Button variant="outline" size="sm" onClick={() => replay.refetch()} disabled={replay.isFetching}>
            <RefreshCw className={replay.isFetching ? 'animate-spin' : undefined} aria-hidden />
            Refresh
          </Button>
        }
      />

      <Card className="mb-5">
        <CardContent className="pt-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
              From
              <Input
                type="datetime-local"
                value={fromLocal}
                onChange={(event) => setFromLocal(event.target.value)}
                className="w-full lg:w-[220px]"
              />
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
              To
              <Input
                type="datetime-local"
                value={toLocal}
                onChange={(event) => setToLocal(event.target.value)}
                className="w-full lg:w-[220px]"
              />
            </label>
            <Button onClick={applyRange} disabled={replay.isFetching}>
              <GitCompare aria-hidden />
              Compare
            </Button>
            <div className="flex gap-2 lg:ml-auto">
              <Button variant="outline" size="sm" onClick={() => applyPreset(7)}>
                7 days
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset(30)}>
                30 days
              </Button>
            </div>
          </div>
          {formError && (
            <p className="mt-2 text-sm text-risk" role="alert">
              {formError}
            </p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Replay reads the bi-temporal columns directly. It does not write memories, events, or conflicts.
          </p>
        </CardContent>
      </Card>

      <ReplayWorkspace
        data={replay.data}
        isLoading={replay.isLoading}
        error={replay.isError ? replay.error : null}
        onRetry={() => replay.refetch()}
      />
    </div>
  );
}
