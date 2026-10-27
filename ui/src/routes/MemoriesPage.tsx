import * as React from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Library, Pin, PinOff, Search, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmptyState, ErrorState, KindBadge, PageHeader, SkeletonRows, StatusBadge } from '@/components/common';
import { useConfirm } from '@/components/ConfirmDialog';
import { useSearch, useStatus } from '@/hooks/queries';
import { useDebounced } from '@/hooks/useDebounced';
import { useMemoryActions } from '@/hooks/useMemoryActions';
import { navigate, openMemory, useRoute } from '@/lib/router';
import { formatReward, pluralize, relativeTime } from '@/lib/format';
import type { SearchHit } from '@/lib/api';
import { cn } from '@/lib/utils';

type SortKey = 'relevance' | 'title' | 'module' | 'reward' | 'recalls' | 'created';
type SortDir = 'asc' | 'desc';

const ALL = '__all';
const ROW_HEIGHT = 52;
/** Above this many rows only the visible window is rendered. */
const WINDOW_THRESHOLD = 200;

function sortRows(rows: SearchHit[], key: SortKey, dir: SortDir): SearchHit[] {
  if (key === 'relevance') {
    // Search results arrive ranked; plain lists put pinned first, then newest.
    return [...rows].sort((a, b) => (b.pinned - a.pinned) || ((b.score ?? 0) - (a.score ?? 0)) || b.created_at.localeCompare(a.created_at));
  }
  const factor = dir === 'asc' ? 1 : -1;
  const get = (m: SearchHit): string | number => {
    switch (key) {
      case 'title': return m.title.toLowerCase();
      case 'module': return m.module.toLowerCase();
      case 'reward': return m.reward_score;
      case 'recalls': return m.retrieval_count;
      case 'created': return m.created_at;
    }
  };
  return [...rows].sort((a, b) => {
    const va = get(a);
    const vb = get(b);
    return (va < vb ? -1 : va > vb ? 1 : 0) * factor;
  });
}

function SortHeader({
  label,
  k,
  sort,
  onSort,
  className,
}: {
  label: string;
  k: SortKey;
  sort: { key: SortKey; dir: SortDir };
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const active = sort.key === k;
  const Icon = !active ? ArrowUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown;
  return (
    <button
      type="button"
      onClick={() => onSort(k)}
      aria-label={`Sort by ${label}`}
      aria-pressed={active}
      className={cn('inline-flex items-center gap-1 rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50', active && 'text-foreground', className)}
    >
      {label}
      <Icon className="size-3" aria-hidden />
    </button>
  );
}

export function MemoriesPage() {
  const route = useRoute();
  const status = useStatus();
  const q = route.query.get('q') ?? '';
  const kind = route.query.get('kind') ?? '';
  const module = route.query.get('module') ?? '';
  const memStatus = route.query.get('status') ?? '';
  const pinned = (route.query.get('pinned') ?? '') as '' | '1' | '0';

  const [text, setText] = React.useState(q);
  const debounced = useDebounced(text.trim(), 250);
  const [sort, setSort] = React.useState<{ key: SortKey; dir: SortDir }>({ key: 'relevance', dir: 'desc' });
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const { setPinned, forget } = useMemoryActions();
  const { confirm, element: confirmElement } = useConfirm();

  const setFilter = React.useCallback(
    (patch: Record<string, string>) => {
      const next = Object.fromEntries(route.query);
      for (const [k, v] of Object.entries(patch)) {
        if (v) next[k] = v;
        else delete next[k];
      }
      navigate('memories', route.name === 'memories' ? route.id : null, next);
    },
    [route]
  );

  // Keep the URL in sync with the debounced search box so searches are shareable deep links.
  React.useEffect(() => {
    if (debounced !== q) setFilter({ q: debounced });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const search = useSearch({ q, kind, module, status: memStatus, pinned, limit: 2000 });
  const rows = React.useMemo(() => sortRows(search.data?.results ?? [], sort.key, sort.dir), [search.data, sort]);

  // Drop selections that are no longer visible (filtered out or forgotten).
  React.useEffect(() => {
    setSelected((prev) => {
      const visible = new Set(rows.map((r) => r.id));
      const next = new Set([...prev].filter((id) => visible.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [rows]);

  const onSort = (k: SortKey) =>
    setSort((s) => (s.key === k ? { key: k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key: k, dir: k === 'title' || k === 'module' ? 'asc' : 'desc' }));

  const selectedRows = rows.filter((r) => selected.has(r.id));
  const allSelected = rows.length > 0 && selected.size === rows.length;
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Simple windowing for very large projects.
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [range, setRange] = React.useState({ start: 0, end: WINDOW_THRESHOLD });
  const windowed = rows.length > WINDOW_THRESHOLD;
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el || !windowed) return;
    const update = () => {
      const start = Math.max(0, Math.floor(el.scrollTop / ROW_HEIGHT) - 10);
      const end = Math.min(rows.length, start + Math.ceil(el.clientHeight / ROW_HEIGHT) + 20);
      setRange((r) => (r.start === start && r.end === end ? r : { start, end }));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [windowed, rows.length]);
  const visibleRows = windowed ? rows.slice(range.start, range.end) : rows;

  const hasFilters = Boolean(q || kind || module || memStatus || pinned);
  const modules = status.data?.modules ?? [];

  return (
    <div>
      {confirmElement}
      <PageHeader
        icon={Library}
        title="Memories"
        description="Rules, decisions, workflows and error traps your agents recall. Search uses the same hybrid ranking agents get from fastr_recall."
      />

      <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search titles, content, files…"
            aria-label="Search memories"
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <Select value={kind || ALL} onValueChange={(v) => setFilter({ kind: v === ALL ? '' : v })}>
            <SelectTrigger className="w-full sm:w-36" aria-label="Filter by kind"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All kinds</SelectItem>
              <SelectItem value="rule">Rules</SelectItem>
              <SelectItem value="error_trap">Traps</SelectItem>
              <SelectItem value="decision">Decisions</SelectItem>
              <SelectItem value="workflow">Workflows</SelectItem>
            </SelectContent>
          </Select>
          <Select value={module || ALL} onValueChange={(v) => setFilter({ module: v === ALL ? '' : v })}>
            <SelectTrigger className="w-full sm:w-40" aria-label="Filter by module"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All modules</SelectItem>
              {modules.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={memStatus || ALL} onValueChange={(v) => setFilter({ status: v === ALL ? '' : v })}>
            <SelectTrigger className="w-full sm:w-36" aria-label="Filter by status"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Active</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="superseded">Superseded</SelectItem>
              <SelectItem value="dormant">Dormant</SelectItem>
            </SelectContent>
          </Select>
          <Select value={pinned || ALL} onValueChange={(v) => setFilter({ pinned: v === ALL ? '' : v })}>
            <SelectTrigger className="w-full sm:w-32" aria-label="Filter by pinned"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Any pin</SelectItem>
              <SelectItem value="1">Pinned</SelectItem>
              <SelectItem value="0">Not pinned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-2 flex min-h-8 flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {selected.size > 0 ? (
          <>
            <span className="font-medium text-foreground">{selected.size} selected</span>
            <Button size="xs" variant="outline" onClick={() => setPinned(selectedRows, true)}>
              <Pin aria-hidden /> Pin
            </Button>
            <Button size="xs" variant="outline" onClick={() => setPinned(selectedRows, false)}>
              <PinOff aria-hidden /> Unpin
            </Button>
            <Button
              size="xs"
              variant="outline"
              className="text-risk"
              onClick={() =>
                confirm({
                  title: `Forget ${pluralize(selectedRows.length, 'memory', 'memories')}?`,
                  description: 'They stop being recalled by agents and move to history (superseded). You can undo for 6 seconds.',
                  confirmLabel: 'Forget',
                  destructive: true,
                  onConfirm: () => {
                    forget(selectedRows);
                    setSelected(new Set());
                  },
                })
              }
            >
              <Trash2 aria-hidden /> Forget
            </Button>
            <Button size="xs" variant="ghost" onClick={() => setSelected(new Set())}>
              Clear selection
            </Button>
          </>
        ) : (
          <>
            <span aria-live="polite">
              {search.isPlaceholderData && search.isFetching ? 'Searching… · ' : ''}
              {search.data ? pluralize(search.data.total, 'memory', 'memories') : '…'}
              {search.data && search.data.mode === 'search' ? ` matching "${search.data.query}"` : ''}
              {search.data ? ` · ${search.data.tookMs} ms` : ''}
            </span>
            {hasFilters && (
              <Button
                size="xs"
                variant="ghost"
                onClick={() => {
                  setText('');
                  navigate('memories', route.id, {});
                }}
              >
                <X aria-hidden /> Clear filters
              </Button>
            )}
          </>
        )}
      </div>

      {search.isLoading ? (
        <SkeletonRows rows={8} />
      ) : search.isError ? (
        <ErrorState error={search.error} onRetry={() => search.refetch()} />
      ) : rows.length === 0 ? (
        <EmptyState
          icon={hasFilters ? Search : Library}
          title={hasFilters ? 'No memories match' : 'No memories yet'}
          action={hasFilters ? <Button variant="outline" size="sm" onClick={() => { setText(''); navigate('memories', null, {}); }}>Clear filters</Button> : undefined}
        >
          {hasFilters
            ? 'Try fewer words or remove a filter. Search matches whole words in titles, content and modules.'
            : 'Agents record memories with fastr_remember and fastr_trap_log. You can also add one with New memory.'}
        </EmptyState>
      ) : (
        <div
          className={cn('overflow-hidden rounded-xl border bg-card transition-opacity', search.isPlaceholderData && search.isFetching && 'opacity-60')}
          aria-busy={search.isFetching}
        >
          <div
            role="row"
            className="grid grid-cols-[2rem_minmax(0,1fr)_5.5rem] items-center gap-3 border-b bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground md:grid-cols-[2rem_minmax(0,1fr)_8rem_6rem_5rem_4.5rem_6.5rem]"
          >
            <Checkbox
              checked={allSelected ? true : selected.size > 0 ? 'indeterminate' : false}
              onCheckedChange={(v) => setSelected(v ? new Set(rows.map((r) => r.id)) : new Set())}
              aria-label="Select all memories"
            />
            <SortHeader label={sort.key === 'relevance' && q ? 'Title (by relevance)' : 'Title'} k="title" sort={sort} onSort={onSort} />
            <SortHeader label="Module" k="module" sort={sort} onSort={onSort} className="hidden md:inline-flex" />
            <span className="hidden md:block">Status</span>
            <SortHeader label="Reward" k="reward" sort={sort} onSort={onSort} className="hidden md:inline-flex" />
            <SortHeader label="Recalls" k="recalls" sort={sort} onSort={onSort} className="hidden md:inline-flex" />
            <SortHeader label="Created" k="created" sort={sort} onSort={onSort} className="justify-self-end" />
          </div>
          <div ref={scrollRef} className={cn(windowed && 'max-h-[70vh] overflow-y-auto')}>
            <ul style={windowed ? { height: rows.length * ROW_HEIGHT, position: 'relative' } : undefined}>
              {visibleRows.map((m, i) => (
                <li
                  key={m.id}
                  style={windowed ? { position: 'absolute', top: (range.start + i) * ROW_HEIGHT, left: 0, right: 0, height: ROW_HEIGHT } : undefined}
                  className={cn(
                    'grid grid-cols-[2rem_minmax(0,1fr)_5.5rem] items-center gap-3 border-b px-3 py-2.5 text-sm last:border-b-0 md:grid-cols-[2rem_minmax(0,1fr)_8rem_6rem_5rem_4.5rem_6.5rem]',
                    selected.has(m.id) && 'bg-accent/50',
                    m.kind === 'error_trap' && 'border-l-2 border-l-trap'
                  )}
                >
                  <Checkbox checked={selected.has(m.id)} onCheckedChange={() => toggle(m.id)} aria-label={`Select ${m.title}`} />
                  <button
                    type="button"
                    onClick={() => openMemory(m.id)}
                    className="flex min-w-0 items-center gap-2 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <KindBadge kind={m.kind} className="shrink-0" />
                    {m.pinned ? <Pin className="size-3.5 shrink-0 text-pinned" aria-label="Pinned" /> : null}
                    <span className="truncate font-medium hover:underline">{m.title}</span>
                    {m.assertion && (
                      <span className="hidden sm:inline-flex rounded px-1.5 py-0.5 font-mono text-[9px] uppercase border font-semibold border-trap/30 text-trap bg-trap/10 shrink-0">
                        asserted
                      </span>
                    )}
                  </button>
                  <span className="hidden truncate font-mono text-xs text-muted-foreground md:block">{m.module}</span>
                  <span className="hidden md:block"><StatusBadge status={m.status} /></span>
                  <span className={cn('hidden font-mono text-xs tabular-nums md:block', m.reward_score < 1 ? 'text-risk' : 'text-muted-foreground')}>
                    {formatReward(m.reward_score)}
                  </span>
                  <span className="hidden font-mono text-xs text-muted-foreground tabular-nums md:block">{m.retrieval_count}</span>
                  <span className="justify-self-end text-xs whitespace-nowrap text-muted-foreground">{relativeTime(m.created_at)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
