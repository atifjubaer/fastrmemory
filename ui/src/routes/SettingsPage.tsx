import { AlertTriangle, Download, Monitor, Moon, RefreshCw, Settings, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/common';
import { CopyButton } from '@/components/CopyButton';
import { useMemories, useStatus } from '@/hooks/queries';
import { useLiveSync } from '@/hooks/useLiveSync';
import { useTheme, type ThemeMode } from '@/lib/theme';
import { relativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';

const THEMES: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function SettingsPage() {
  const { mode, setMode } = useTheme();
  const sync = useLiveSync();
  const status = useStatus();
  const memories = useMemories();
  const s = status.data;

  const mcpJson = s
    ? JSON.stringify({ mcpServers: { fastrmemory: s.mcp } }, null, 2)
    : 'Loading MCP config…';

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <PageHeader icon={Settings} title="Settings" description="Dashboard preferences are stored in this browser only." />

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.value}
                type="button"
                role="radio"
                aria-checked={mode === t.value}
                onClick={() => setMode(t.value)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border p-3 text-sm outline-none transition-colors hover:bg-accent/50 focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  mode === t.value && 'border-brand bg-brand-weak'
                )}
              >
                <t.icon className="size-5" aria-hidden />
                {t.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live updates</CardTitle>
          <CardDescription>
            Agents write through their own MCP server process, so the dashboard polls the database version to pick up their changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Checkbox id="live-polling" checked={sync.pollingEnabled} onCheckedChange={(v) => sync.setPollingEnabled(Boolean(v))} />
            <Label htmlFor="live-polling">Watch for changes from agents and the CLI</Label>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Label htmlFor="live-interval">Check every</Label>
            <Select value={String(sync.intervalMs)} onValueChange={(v) => sync.setIntervalMs(Number(v))} disabled={!sync.pollingEnabled}>
              <SelectTrigger id="live-interval" className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1000">1 second</SelectItem>
                <SelectItem value="2000">2 seconds</SelectItem>
                <SelectItem value="5000">5 seconds</SelectItem>
                <SelectItem value="15000">15 seconds</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={sync.resync}>
              <RefreshCw aria-hidden /> Resync now
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Status: {sync.health} · stream {sync.sse}
            {sync.lastSyncAt ? ` · last check ${relativeTime(new Date(sync.lastSyncAt).toISOString())}` : ''}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          <div className="flex min-w-0 items-center gap-2">
            <span className="w-24 shrink-0 text-muted-foreground">Name</span>
            <span className="truncate">{s?.projectName ?? '…'}</span>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <span className="w-24 shrink-0 text-muted-foreground">Project ID</span>
            <code className="truncate font-mono text-xs">{s?.projectId ?? '…'}</code>
            {s && <CopyButton text={s.projectId} description="Copy project ID" variant="ghost" />}
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <span className="w-24 shrink-0 text-muted-foreground">Project root</span>
            <code className="min-w-0 truncate font-mono text-xs">{s?.projectRoot ?? '…'}</code>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <span className="w-24 shrink-0 text-muted-foreground">Database</span>
            <code className="min-w-0 truncate font-mono text-xs">{s?.dbPath ?? '…'}</code>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <span className="w-24 shrink-0 text-muted-foreground">Server version</span>
            <code className="font-mono text-xs">{s?.version ?? '…'}</code>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <span className="w-24 shrink-0 text-muted-foreground">MCP source</span>
            <span className="text-xs">
              {s?.mcpSource === 'local' ? 'Local CLI' : s?.mcpSource === 'registry' ? 'npm registry' : '…'}
            </span>
          </div>
          {s?.isHomeProject && (
            <div className="mt-2 flex gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
              <div>
                This dashboard is running from your home directory. Stop it and run{' '}
                <code className="font-mono">fastr ui</code> from the repository root; otherwise MCP clients will store
                memories in <code className="font-mono">{s.dbPath}</code>.
              </div>
            </div>
          )}
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!memories.data}
              onClick={() => downloadJson(`fastrmemory-${s?.projectName ?? 'export'}-memories.json`, memories.data)}
            >
              <Download aria-hidden /> Export active memories (JSON)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connect an agent</CardTitle>
          <CardDescription>
            Run <code className="font-mono">{'fastr mcp init --client <client> --scope project'}</code> in this
            repository, or copy this config. <code className="font-mono">fastr setup</code> also installs skills and{' '}
            <code className="font-mono">AGENTS.md</code>; <code className="font-mono">fastr hook install</code> adds
            lifecycle hooks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-3 font-mono text-xs">{mcpJson}</pre>
            {s && (
              <CopyButton text={mcpJson} description="Copy MCP config" variant="ghost" className="absolute top-2 right-2" />
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Uses the local CLI when available; otherwise it pins the npm package. On Windows the registry config uses{' '}
            <code className="font-mono">cmd /c npx</code>. Add <code className="font-mono">--profile core</code>{' '}
            before <code className="font-mono">--project</code> for the smaller 12-tool surface.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
