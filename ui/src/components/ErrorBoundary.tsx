import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** True for failures to download a lazily loaded chunk, typically after the dashboard was upgraded while open. */
function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /dynamically imported module|Importing a module script failed|Failed to fetch|ChunkLoadError/i.test(message);
}

interface State {
  error: Error | null;
}

/** Keeps one broken page from blanking the whole dashboard. Resets when `resetKey` changes (navigation). */
export class ErrorBoundary extends React.Component<{ resetKey: string; children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const stale = isChunkLoadError(error);
    return (
      <div role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-risk/40 bg-risk-weak px-6 py-12 text-center">
        <AlertTriangle className="size-6 text-risk" aria-hidden />
        <div>
          <h2 className="font-medium">{stale ? 'The dashboard was updated' : 'This page crashed'}</h2>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {stale ? 'Reload to get the new version.' : error.message || 'Unexpected error while rendering this page.'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => window.location.reload()}>
            <RefreshCw aria-hidden /> Reload
          </Button>
          {!stale && (
            <Button size="sm" variant="outline" onClick={() => this.setState({ error: null })}>
              Try again
            </Button>
          )}
        </div>
      </div>
    );
  }
}
