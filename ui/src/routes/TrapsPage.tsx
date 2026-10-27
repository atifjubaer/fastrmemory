import * as React from 'react';
import { FileCode2, FileSearch, Loader2, Plus, ShieldAlert, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState, ErrorState, PageHeader, SkeletonRows, StatusBadge, Term } from '@/components/common';
import { CreateMemoryDialog } from '@/components/CreateMemoryDialog';
import { useTraps } from '@/hooks/queries';
import { navigate, openMemory, useRoute } from '@/lib/router';
import { formatReward, pluralize, relativeTime } from '@/lib/format';
import { api, type TrapMatch } from '@/lib/api';
import { cn } from '@/lib/utils';

const UNLINKED = '(not linked to a file)';

function TrapItem({ t }: { t: TrapMatch }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => openMemory(t.id)}
        className="flex w-full min-w-0 flex-col gap-1 rounded-md px-3 py-2.5 text-left outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <span className="flex min-w-0 items-center gap-2">
          <ShieldAlert className="size-4 shrink-0 text-trap" aria-hidden />
          <span className="truncate text-sm font-medium">{t.title}</span>
          {t.assertion && (
            <Badge
              variant="outline"
              className={cn(
                'font-mono text-[9px] uppercase font-semibold shrink-0',
                t.assertion_verdict === 'holds' && 'border-success text-success bg-success/10',
                t.assertion_verdict === 'fails' && 'border-risk text-risk bg-risk/10',
                (!t.assertion_verdict || t.assertion_verdict === 'unknown') && 'border-trap text-trap bg-trap/10'
              )}
            >
              {t.assertion_verdict ?? 'asserted'}
            </Badge>
          )}
          <span className="ml-auto shrink-0"><StatusBadge status={t.status} /></span>
        </span>
        <span className="line-clamp-2 pl-6 text-xs text-muted-foreground">{t.content}</span>
        <span className="pl-6 font-mono text-[11px] text-muted-foreground">
          {t.module} · reward {formatReward(t.reward_score)} · {relativeTime(t.created_at)}
        </span>
      </button>
    </li>
  );
}

export function TrapsPage() {
  const route = useRoute();
  const filesParam = route.query.get('files') ?? '';
  const files = React.useMemo(() => filesParam.split(',').map((f) => f.trim()).filter(Boolean), [filesParam]);
  const [input, setInput] = React.useState(filesParam.replace(/,/g, '\n'));
  const [createOpen, setCreateOpen] = React.useState(false);
  const traps = useTraps(files);
  const qc = useQueryClient();

  const distill = useMutation({
    mutationFn: () => api.distill(),
    onSuccess: (res) => {
      if (res.result.distilledCount > 0) {
        toast.success(`Distilled ${res.result.distilledCount} new error trap(s) from recent sessions.`);
        void qc.invalidateQueries();
      } else {
        toast.info('No new error traps distilled from recent tool errors.');
      }
    },
    onError: (err) => toast.error('Distillation failed', { description: (err as Error).message })
  });

  const groups = React.useMemo(() => {
    const map = new Map<string, TrapMatch[]>();
    for (const t of traps.data?.traps ?? []) {
      const keys = files.length > 0 ? (t.matched_files.length ? t.matched_files : [UNLINKED]) : t.linked_files.length ? t.linked_files : [UNLINKED];
      for (const k of keys) {
        const list = map.get(k) ?? [];
        list.push(t);
        map.set(k, list);
      }
    }
    return [...map.entries()].sort((a, b) => (a[0] === UNLINKED ? 1 : b[0] === UNLINKED ? -1 : b[1].length - a[1].length || a[0].localeCompare(b[0])));
  }, [traps.data, files]);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const list = input.split(/[\n,]/).map((f) => f.trim()).filter(Boolean);
    navigate('traps', null, { files: list.join(',') });
  };

  const total = traps.data?.traps.length ?? 0;

  return (
    <div>
      <CreateMemoryDialog open={createOpen} onOpenChange={setCreateOpen} defaultKind="error_trap" />
      <PageHeader
        icon={ShieldAlert}
        title="Error traps"
        description={
          <>
            Bugs agents already hit and how they were fixed. <Term k="trap">Traps</Term> are checked before an agent edits a linked file
            (fastr_trap_recall and the PreToolUse hook).
          </>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => distill.mutate()} disabled={distill.isPending}>
              {distill.isPending ? <Loader2 className="animate-spin size-3.5" aria-hidden /> : <Sparkles className="size-3.5" aria-hidden />}
              Distill traps
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
              <Plus aria-hidden /> Log a trap
            </Button>
          </div>
        }
      />

      <Card className="mb-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileSearch className="size-4 text-muted-foreground" aria-hidden /> Check files before editing
          </CardTitle>
          <CardDescription>The same lookup an agent runs before it edits these files. One path per line, relative to the project root.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={check} className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="src/auth/jwt.ts, src/db/schema.ts"
              aria-label="Files to check"
              className="font-mono"
            />
            <div className="flex gap-2">
              <Button type="submit">Check</Button>
              {files.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setInput('');
                    navigate('traps');
                  }}
                >
                  <X aria-hidden /> Show all
                </Button>
              )}
            </div>
          </form>
          {files.length > 0 && traps.data && (
            <p className={`mt-3 text-sm ${total > 0 ? 'text-trap' : 'text-success'}`} role="status">
              {total > 0
                ? `${pluralize(total, 'trap')} protect ${pluralize(files.length, 'file')}. Read them before editing.`
                : `No active traps for ${pluralize(files.length, 'file')}. Safe to edit.`}
            </p>
          )}
        </CardContent>
      </Card>

      {traps.isLoading || (traps.isFetching && total === 0) ? (
        <SkeletonRows rows={6} />
      ) : traps.isError ? (
        <ErrorState error={traps.error} onRetry={() => traps.refetch()} />
      ) : total === 0 ? (
        <EmptyState icon={ShieldCheck} title={files.length ? 'No traps for these files' : 'No error traps yet'}>
          {files.length
            ? 'Nothing recorded for these paths. Paths must match how traps were linked (project-relative, forward slashes).'
            : 'When an agent diagnoses a bug it calls fastr_trap_log, and the lesson shows up here with the files it protects.'}
        </EmptyState>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {groups.map(([file, list]) => (
            <Card key={file} className="min-w-0 gap-2 py-4">
              <CardHeader className="px-4">
                <CardTitle className="flex min-w-0 items-center gap-2 text-sm">
                  <FileCode2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span className={`truncate font-mono ${file === UNLINKED ? 'text-muted-foreground italic' : ''}`}>{file}</span>
                  <span className="ml-auto shrink-0 font-mono text-xs text-trap">{list.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-1">
                <ul>
                  {list.map((t) => (
                    <TrapItem key={`${file}-${t.id}`} t={t} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
