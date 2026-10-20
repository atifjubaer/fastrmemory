import * as React from 'react';
import {
  ChevronDown,
  Clipboard,
  FileCode2,
  GitCommitVertical,
  Link2,
  Pin,
  PinOff,
  ShieldCheck,
  ShieldQuestion,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton, copyText } from './CopyButton';
import { MarkdownView } from './MarkdownView';
import { InlineWordDiff } from './WordDiff';
import { ErrorState, HelpTip, KindBadge, StatusBadge, Term } from './common';
import { useMemoryDetail, useMemoryHistory } from '@/hooks/queries';
import { useMemoryActions } from '@/hooks/useMemoryActions';
import { isPendingForget, pendingPinned, usePendingOps } from '@/lib/pending-ops';
import { closeMemory, memoryPermalink, openMemory, useRoute } from '@/lib/router';
import { absoluteTime, formatReward, relativeTime } from '@/lib/format';
import type { Memory } from '@/lib/api';
import { cn } from '@/lib/utils';

export function MemoryDetailSheet() {
  const route = useRoute();
  const id = route.memoryId;
  return (
    <Sheet open={Boolean(id)} onOpenChange={(open) => !open && closeMemory()}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-2xl">
        {id ? <MemoryDetailBody id={id} /> : <SheetTitle className="sr-only">Memory</SheetTitle>}
      </SheetContent>
    </Sheet>
  );
}

function mcpCall(tool: string, args: Record<string, unknown>): string {
  return `${tool} ${JSON.stringify(args)}`;
}

function shellQuote(value: string): string {
  return `"${value.replace(/(["\\$`])/g, '\\$1')}"`;
}

function MemoryDetailBody({ id }: { id: string }) {
  const detail = useMemoryDetail(id);
  const history = useMemoryHistory(id);
  const ops = usePendingOps();
  const { setPinned, forget } = useMemoryActions();
  const [tab, setTab] = React.useState('content');

  React.useEffect(() => setTab('content'), [id]);

  if (detail.isLoading) {
    return (
      <div className="flex flex-col gap-3 p-6" aria-busy="true">
        <SheetTitle className="sr-only">Loading memory {id}</SheetTitle>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    );
  }
  if (detail.isError || !detail.data) {
    return (
      <div className="p-6">
        <SheetTitle className="mb-4">Memory {id}</SheetTitle>
        <ErrorState error={detail.error ?? 'Not found'} onRetry={() => void detail.refetch()} />
      </div>
    );
  }

  const m = detail.data;
  const pinOverride = pendingPinned(ops, m.id);
  const pinned = pinOverride ?? Boolean(m.pinned);
  const forgetting = isPendingForget(ops, m.id);
  const inactive = m.status === 'superseded' || m.status === 'dormant' || m.valid_to !== null;
  const chain = history.data?.chain ?? [];

  const copyItems: Array<{ label: string; value: string }> = [
    { label: 'Memory ID', value: m.id },
    { label: 'Permalink', value: memoryPermalink(m.id) },
    { label: 'MCP: fastr_recall', value: mcpCall('fastr_recall', { query: m.title, module: m.module }) },
    { label: 'MCP: fastr_feedback (good)', value: mcpCall('fastr_feedback', { memoryId: m.id, outcome: 'good' }) },
    { label: 'MCP: fastr_verify_provenance', value: mcpCall('fastr_verify_provenance', { memoryId: m.id }) },
    ...(m.linked_files.length
      ? [{ label: 'MCP: fastr_trap_recall', value: mcpCall('fastr_trap_recall', { files: m.linked_files }) }]
      : []),
    { label: 'CLI: fastrmemory recall', value: `fastrmemory recall ${shellQuote(m.title)} -m ${m.module}` },
    { label: 'Content (markdown)', value: m.content },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <SheetHeader className="gap-2 border-b px-5 pt-5 pb-4 pr-12">
        <div className="flex flex-wrap items-center gap-1.5">
          <code className="truncate font-mono text-xs text-brand">{m.id}</code>
          <CopyButton text={m.id} description="Copy memory ID" variant="ghost" />
          <KindBadge kind={m.kind} />
          <StatusBadge status={m.status} />
          {pinned && (
            <Badge variant="pinned" className="text-[10px]">
              <Pin aria-hidden /> Pinned
            </Badge>
          )}
          {forgetting && (
            <Badge variant="risk" className="text-[10px]">
              Forgetting...
            </Badge>
          )}
        </div>
        <SheetTitle className="text-lg leading-snug">{m.title}</SheetTitle>
        <SheetDescription>
          {m.module} · recorded {relativeTime(m.created_at)} by @{m.agent_id || 'default'}
        </SheetDescription>
        <div className="mt-1 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setPinned([m], !pinned)} disabled={inactive || forgetting}>
            {pinned ? <PinOff aria-hidden /> : <Pin aria-hidden />}
            {pinned ? 'Unpin' : 'Pin'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-risk hover:text-risk"
            onClick={() => {
              forget([m]);
              closeMemory();
            }}
            disabled={inactive || forgetting}
          >
            <Trash2 aria-hidden /> Forget
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Clipboard aria-hidden /> Copy <ChevronDown aria-hidden className="opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Copy to clipboard</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {copyItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onSelect={async () => {
                    const ok = await copyText(item.value);
                    if (ok) toast.success(`Copied ${item.label}`);
                    else toast.error('Clipboard is not available');
                  }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SheetHeader>

      <Tabs value={tab} onValueChange={setTab} className="min-h-0 flex-1 gap-0">
        <div className="border-b px-5 py-2">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">
              History{chain.length > 1 ? ` (${chain.length})` : ''}
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <TabsContent value="content" className="flex flex-col gap-4">
            {inactive && (
              <div className="rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                This version is <Term k="superseded">{m.status}</Term>
                {m.superseded_reason ? `: ${m.superseded_reason}` : '.'}
                {m.superseded_by_id && (
                  <>
                    {' '}
                    <button type="button" className="text-brand underline-offset-4 hover:underline" onClick={() => openMemory(m.superseded_by_id!)}>
                      Open the replacement
                    </button>
                  </>
                )}
              </div>
            )}
            <MarkdownView content={m.content} />
            <LinkedFiles files={m.linked_files} />
          </TabsContent>

          <TabsContent value="details">
            <DetailsGrid memory={m} pinned={pinned} />
          </TabsContent>

          <TabsContent value="history">
            {history.isLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : history.isError ? (
              <ErrorState error={history.error} onRetry={() => void history.refetch()} />
            ) : (
              <HistoryView chain={chain} currentId={m.id} />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function LinkedFiles({ files }: { files: string[] }) {
  return (
    <section aria-labelledby="linked-files-h">
      <h3 id="linked-files-h" className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase">
        <Link2 className="size-3.5" aria-hidden /> Linked files ({files.length})
      </h3>
      {files.length === 0 ? (
        <p className="text-sm text-muted-foreground">Project-wide: not linked to specific files.</p>
      ) : (
        <ul className="flex flex-wrap gap-1.5">
          {files.map((f) => (
            <li key={f}>
              <Badge variant="outline" className="max-w-full font-mono text-[11px]">
                <FileCode2 aria-hidden />
                <span className="truncate">{f}</span>
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DetailsGrid({ memory: m, pinned }: { memory: Memory & { provenance?: { verified: boolean; reason: string; signature: string | null } }; pinned: boolean }) {
  const rows: Array<{ label: React.ReactNode; value: React.ReactNode }> = [
    { label: 'Module', value: <span className="font-mono">{m.module}</span> },
    { label: <Term k={m.status === 'staging' ? 'staging' : m.status === 'verified' ? 'verified' : 'superseded'}>Status</Term>, value: <StatusBadge status={m.status} /> },
    { label: <Term k="reward">Reward</Term>, value: <span className="font-mono">{formatReward(m.reward_score)}</span> },
    { label: <Term k="recall">Recall count</Term>, value: <span className="font-mono">{m.retrieval_count ?? 0}</span> },
    { label: <Term k="pinned">Pinned</Term>, value: pinned ? 'Yes' : 'No' },
    { label: <Term k="embedding">Embedded</Term>, value: m.embedded ? 'Yes' : 'No (keyword and graph recall only)' },
    { label: 'Author', value: <span className="font-mono">@{m.agent_id || 'default'}</span> },
    { label: 'Created', value: <span title={m.created_at}>{absoluteTime(m.created_at)}</span> },
    { label: 'Valid until', value: m.valid_to ? absoluteTime(m.valid_to) : 'Current' },
    { label: 'Last recalled', value: m.last_recalled_at ? relativeTime(m.last_recalled_at) : 'Never' },
  ];
  const prov = m.provenance;
  return (
    <div className="flex flex-col gap-4">
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {rows.map((r, i) => (
          <div key={i} className="flex min-w-0 flex-col gap-0.5 border-b pb-2">
            <dt className="text-xs text-muted-foreground">{r.label}</dt>
            <dd className="text-sm break-words">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className={cn('rounded-lg border p-3', prov?.verified ? 'border-success/40 bg-success-weak' : 'bg-muted/40')}>
        <div className="flex items-center gap-2 text-sm font-medium">
          {prov?.verified ? <ShieldCheck className="size-4 text-success" aria-hidden /> : <ShieldQuestion className="size-4 text-muted-foreground" aria-hidden />}
          <Term k="provenance">Provenance</Term>: {prov ? (prov.verified ? 'signature verified' : 'not verified') : 'unknown'}
        </div>
        {prov && <p className="mt-1 text-xs text-muted-foreground">{prov.reason}</p>}
        {m.provenance_hash && <code className="mt-2 block font-mono text-[11px] break-all text-muted-foreground">{m.provenance_hash}</code>}
      </div>
    </div>
  );
}

function HistoryView({ chain, currentId }: { chain: Memory[]; currentId: string }) {
  const currentIndex = Math.max(0, chain.findIndex((c) => c.id === currentId));
  const [selected, setSelected] = React.useState(currentIndex);
  React.useEffect(() => setSelected(currentIndex), [currentIndex]);

  if (chain.length <= 1) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <GitCommitVertical className="mx-auto mb-2 size-5" aria-hidden />
        No other versions. When an agent calls fastr_supersede on this memory, the old and new versions are linked here and you
        can diff them word by word. <HelpTip k="supersession" label="supersession" />
      </div>
    );
  }

  const version = chain[selected];
  const previous = selected > 0 ? chain[selected - 1] : null;

  return (
    <div className="flex flex-col gap-4">
      <ol className="relative flex flex-col gap-1 border-l pl-4" aria-label="Version chain, oldest first">
        {chain.map((v, i) => (
          <li key={v.id} className="relative">
            <span
              aria-hidden
              className={cn(
                'absolute top-3 -left-[21px] size-2.5 rounded-full border-2 border-background',
                v.valid_to ? 'bg-muted-foreground/50' : 'bg-success'
              )}
            />
            <button
              type="button"
              onClick={() => setSelected(i)}
              aria-current={i === selected ? 'true' : undefined}
              className={cn(
                'flex w-full flex-col items-start rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50',
                i === selected && 'bg-accent'
              )}
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-medium">v{i + 1}</span>
                <code className="font-mono text-[11px] text-muted-foreground">{v.id}</code>
                {v.id === currentId && <Badge variant="brand" className="text-[10px]">viewing</Badge>}
                {!v.valid_to && <Badge variant="success" className="text-[10px]">current</Badge>}
              </span>
              <span className="line-clamp-1 text-xs text-muted-foreground">
                {v.title} · {relativeTime(v.created_at)}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <section className="rounded-lg border p-3" aria-live="polite">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium">
            {previous ? `Changes in v${selected + 1} (vs v${selected})` : `v${selected + 1} is the original version`}
          </h3>
          {version.id !== currentId && (
            <Button size="xs" variant="outline" onClick={() => openMemory(version.id)}>
              Open v{selected + 1}
            </Button>
          )}
        </div>
        {previous ? (
          <div className="flex flex-col gap-3">
            {previous.title !== version.title && (
              <div>
                <div className="mb-1 text-xs text-muted-foreground uppercase">Title</div>
                <InlineWordDiff before={previous.title} after={version.title} />
              </div>
            )}
            <div>
              <div className="mb-1 text-xs text-muted-foreground uppercase">Content</div>
              <InlineWordDiff before={previous.content} after={version.content} />
            </div>
            {previous.superseded_reason && (
              <p className="text-xs text-muted-foreground">Reason recorded: {previous.superseded_reason}</p>
            )}
          </div>
        ) : (
          <MarkdownView content={version.content} />
        )}
      </section>
    </div>
  );
}
