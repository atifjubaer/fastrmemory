import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle2, Database, HeartPulse, Info, Loader2, Stethoscope, Wrench, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorState, PageHeader, SkeletonRows, StatTile, Term } from '@/components/common';
import { CopyButton } from '@/components/CopyButton';
import { useHealth } from '@/hooks/queries';
import { api, type DiagnosticIssue, type HealResult } from '@/lib/api';
import { absoluteTime } from '@/lib/format';

/** Suggested next step for each diagnostic category, shown under the issue. */
const FIX_HINT: Record<DiagnosticIssue['category'], string> = {
  integrity: 'Back up .fastr/fastr.db, then run `fastrmemory heal`. If integrity errors remain, restore from a snapshot.',
  fts5: 'The keyword index is out of sync with memories. "Heal" rebuilds it from the memories table.',
  file_links: 'Some file links point to memories that no longer exist. "Heal" removes the dangling links.',
  actions: 'Some action dependencies reference missing actions. "Heal" prunes the broken edges.',
  storage: 'Write-ahead log or storage issue. "Heal" checkpoints the WAL and reclaims space.',
};

function SeverityIcon({ severity }: { severity: DiagnosticIssue['severity'] }) {
  if (severity === 'error') return <XCircle className="size-4 shrink-0 text-risk" aria-label="Error" />;
  if (severity === 'warning') return <AlertTriangle className="size-4 shrink-0 text-trap" aria-label="Warning" />;
  return <Info className="size-4 shrink-0 text-brand" aria-label="Info" />;
}

export function HealthPage() {
  const health = useHealth();
  const qc = useQueryClient();
  const heal = useMutation({
    mutationFn: (dryRun: boolean) => api.heal(dryRun),
    onSuccess: (res: HealResult) => {
      if (res.dryRun) {
        toast.info(res.actionsTaken.length ? `Heal would: ${res.actionsTaken.join(' · ')}` : 'Nothing to heal.');
      } else {
        toast.success(`Healed ${res.fixedCount} issue${res.fixedCount === 1 ? '' : 's'}`, {
          description: res.remainingIssues ? `${res.remainingIssues} issue(s) need manual attention.` : 'Database is consistent.',
        });
        void qc.invalidateQueries();
      }
    },
    onError: (err) => toast.error('Heal failed', { description: (err as Error).message }),
  });

  const data = health.data;
  const report = data?.report;

  return (
    <div>
      <PageHeader
        icon={HeartPulse}
        title="Health"
        description="Integrity of the SQLite store, the keyword index, file links and the action graph, plus search coverage."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => health.refetch()} disabled={health.isFetching}>
              {health.isFetching ? <Loader2 className="animate-spin" aria-hidden /> : <Stethoscope aria-hidden />} Re-run diagnosis
            </Button>
            <Button variant="outline" size="sm" onClick={() => heal.mutate(true)} disabled={heal.isPending || !report}>
              Preview heal
            </Button>
            <Button size="sm" onClick={() => heal.mutate(false)} disabled={heal.isPending || !report || report.fixableIssues === 0}>
              {heal.isPending ? <Loader2 className="animate-spin" aria-hidden /> : <Wrench aria-hidden />} Heal
            </Button>
          </>
        }
      />

      {health.isLoading ? (
        <SkeletonRows rows={6} />
      ) : health.isError ? (
        <ErrorState error={health.error} onRetry={() => health.refetch()} />
      ) : data && report ? (
        <div className="flex flex-col gap-5">
          <div
            role="status"
            className={`flex items-center gap-3 rounded-xl border p-4 ${report.healthy ? 'border-success/40 bg-success-weak' : 'border-trap/40 bg-trap-weak'}`}
          >
            {report.healthy ? (
              <CheckCircle2 className="size-5 text-success" aria-hidden />
            ) : (
              <AlertTriangle className="size-5 text-trap" aria-hidden />
            )}
            <div className="min-w-0">
              <div className="font-medium">
                {report.healthy ? 'All checks passed' : `${report.totalIssues} issue${report.totalIssues === 1 ? '' : 's'} found`}
              </div>
              <div className="text-xs text-muted-foreground">
                Checked {absoluteTime(report.timestamp)} · {report.fixableIssues} fixable automatically
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile label="Memories" value={report.metrics.memoryCount} hint={`${report.metrics.ftsRowCount} keyword index rows`} />
            <StatTile
              label={<Term k="embedding">Embedding coverage</Term>}
              value={`${data.status.embeddingCoveragePercent}%`}
              tone={data.status.embeddingCoveragePercent > 0 ? 'success' : 'default'}
              hint={data.status.embeddingCoveragePercent === 0 ? 'Keyword + graph search only' : 'Vector search active'}
            />
            <StatTile
              label={<Term k="spool">Write spool</Term>}
              value={data.status.pendingSpoolCount}
              tone={data.status.pendingSpoolCount > 0 ? 'trap' : 'success'}
              hint={data.status.pendingSpoolCount > 0 ? 'Queued while the DB was locked' : 'Nothing queued'}
            />
            <StatTile label="Journal mode" value={report.metrics.walMode.toUpperCase()} hint={`${report.metrics.fileLinkCount} file links`} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Issues</CardTitle>
              <CardDescription>Each issue lists a suggested fix. "Heal" applies the safe automatic repairs.</CardDescription>
            </CardHeader>
            <CardContent>
              {report.issues.length === 0 ? (
                <p className="text-sm text-muted-foreground">No issues.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {report.issues.map((issue, i) => (
                    <li key={i} className="rounded-lg border p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <SeverityIcon severity={issue.severity} />
                        <span className="text-sm font-medium">{issue.description}</span>
                        <Badge variant="muted" className="font-mono text-[10px]">{issue.category}</Badge>
                        {issue.affectedCount > 0 && <Badge variant="outline">{issue.affectedCount} affected</Badge>}
                        {issue.fixable && <Badge variant="success">auto-fixable</Badge>}
                      </div>
                      <p className="mt-1.5 pl-6 text-xs text-muted-foreground">{FIX_HINT[issue.category]}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {heal.data && !heal.data.dryRun && heal.data.actionsTaken.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Last heal</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm">
                  {heal.data.actionsTaken.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-4 text-muted-foreground" aria-hidden /> Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-muted-foreground">Database</span>
                <code className="min-w-0 truncate font-mono text-xs">{data.dbPath}</code>
                <CopyButton text={data.dbPath} description="Copy database path" variant="ghost" />
              </div>
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-muted-foreground">Spool file</span>
                <code className="min-w-0 truncate font-mono text-xs">{data.spool.path}</code>
              </div>
              <p className="text-xs text-muted-foreground">
                CLI equivalents: <code className="font-mono">fastrmemory diagnose</code> and <code className="font-mono">fastrmemory heal</code>.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
