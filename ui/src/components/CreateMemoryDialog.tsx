import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { api, type MemoryKind } from '@/lib/api';
import { openMemory } from '@/lib/router';
import { useStatus } from '@/hooks/queries';

const KIND_OPTIONS: Array<{ value: MemoryKind; label: string }> = [
  { value: 'rule', label: 'Rule' },
  { value: 'error_trap', label: 'Error trap (2.0x recall boost)' },
  { value: 'decision', label: 'Decision' },
  { value: 'workflow', label: 'Workflow' },
];

export function CreateMemoryDialog({
  open,
  onOpenChange,
  defaultKind = 'rule',
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultKind?: MemoryKind;
}) {
  const qc = useQueryClient();
  const status = useStatus();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [module, setModule] = React.useState('general');
  const [kind, setKind] = React.useState<MemoryKind>(defaultKind);
  const [files, setFiles] = React.useState('');

  React.useEffect(() => {
    if (open) setKind(defaultKind);
  }, [open, defaultKind]);

  const mutation = useMutation({
    mutationFn: () =>
      api.createMemory({
        title: title.trim(),
        content: content.trim(),
        module: module.trim() || 'general',
        kind,
        files: files
          .split(/[,\n]/)
          .map((f) => f.trim())
          .filter(Boolean),
      }),
    onSuccess: (memory) => {
      toast.success(`Saved ${memory.kind === 'error_trap' ? 'error trap' : memory.kind}`, {
        description: memory.title,
        action: { label: 'Open', onClick: () => openMemory(memory.id) },
      });
      setTitle('');
      setContent('');
      setFiles('');
      onOpenChange(false);
      void qc.invalidateQueries();
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    mutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={submit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Record a memory</DialogTitle>
            <DialogDescription>
              Memories created here are stored as verified and are immediately available to agents through fastr_recall.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="mem-title">Title</Label>
            <Input
              id="mem-title"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Always use big-endian for the binary protocol"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mem-content">Content</Label>
            <Textarea
              id="mem-content"
              required
              rows={5}
              className="max-h-64"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Explain the pattern, gotcha or fix. Markdown is supported."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="mem-module">Module</Label>
              <Input
                id="mem-module"
                list="mem-module-options"
                value={module}
                onChange={(e) => setModule(e.target.value)}
                placeholder="auth, api, db..."
              />
              <datalist id="mem-module-options">
                {(status.data?.modules ?? []).map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mem-kind">Kind</Label>
              <Select value={kind} onValueChange={(v) => setKind(v as MemoryKind)}>
                <SelectTrigger id="mem-kind" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {KIND_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mem-files">Linked files</Label>
            <Input
              id="mem-files"
              value={files}
              onChange={(e) => setFiles(e.target.value)}
              placeholder="src/auth.ts, src/server.ts"
              aria-describedby="mem-files-hint"
            />
            <p id="mem-files-hint" className="text-xs text-muted-foreground">
              Comma separated. Linked files let agents find this memory with fastr_trap_recall before editing them.
            </p>
          </div>

          {mutation.isError && (
            <p role="alert" className="rounded-md bg-risk-weak px-3 py-2 text-sm text-risk">
              {(mutation.error as Error).message}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || !title.trim() || !content.trim()}>
              {mutation.isPending && <Loader2 className="animate-spin" aria-hidden />}
              Save memory
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
