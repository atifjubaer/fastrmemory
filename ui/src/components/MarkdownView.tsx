import * as React from 'react';
import { CopyButton } from './CopyButton';
import { cn } from '@/lib/utils';

/** Tiny, dependency-free markdown renderer for memory content (code blocks, headings, lists, quotes, inline marks). */
function renderInline(text: string): React.ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g);
  return tokens.map((token, idx) => {
    if (token.length > 1 && token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={idx} className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.length > 3 && token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.length > 2 && token.startsWith('*') && token.endsWith('*')) {
      return <em key={idx}>{token.slice(1, -1)}</em>;
    }
    return token;
  });
}

export function MarkdownView({ content, className }: { content: string; className?: string }) {
  const elements = React.useMemo(() => {
    const out: React.ReactNode[] = [];
    if (!content) return out;
    const lines = content.split('\n');
    let inCode = false;
    let codeLang = '';
    let buffer: string[] = [];

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('```')) {
        if (inCode) {
          const code = buffer.join('\n');
          out.push(
            <div key={`code-${i}`} className="my-2 overflow-hidden rounded-lg border bg-muted/60">
              <div className="flex items-center justify-between border-b px-3 py-1 font-mono text-[11px] text-muted-foreground">
                <span>{codeLang || 'code'}</span>
                <CopyButton text={code} label="Copy" variant="ghost" />
              </div>
              <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          );
          buffer = [];
          codeLang = '';
          inCode = false;
        } else {
          inCode = true;
          codeLang = trimmed.slice(3).trim();
        }
        return;
      }
      if (inCode) {
        buffer.push(line);
        return;
      }
      if (line.startsWith('### ')) out.push(<h4 key={i} className="mt-3 mb-1 text-sm font-semibold">{renderInline(line.slice(4))}</h4>);
      else if (line.startsWith('## ')) out.push(<h3 key={i} className="mt-3 mb-1 text-[15px] font-semibold">{renderInline(line.slice(3))}</h3>);
      else if (line.startsWith('# ')) out.push(<h2 key={i} className="mt-3 mb-1.5 text-base font-bold">{renderInline(line.slice(2))}</h2>);
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* '))
        out.push(
          <div key={i} className="my-1 flex gap-2 text-sm leading-relaxed">
            <span aria-hidden className="font-bold text-brand">•</span>
            <div>{renderInline(trimmed.slice(2))}</div>
          </div>
        );
      else if (/^\d+\.\s+/.test(trimmed)) {
        const m = trimmed.match(/^(\d+)\.\s+(.*)$/)!;
        out.push(
          <div key={i} className="my-1 flex gap-2 text-sm leading-relaxed">
            <span className="font-mono font-semibold text-brand">{m[1]}.</span>
            <div>{renderInline(m[2])}</div>
          </div>
        );
      } else if (trimmed.startsWith('> '))
        out.push(
          <blockquote key={i} className="my-2 rounded-r-md border-l-2 border-brand bg-brand-weak px-3 py-1.5 text-sm">
            {renderInline(trimmed.slice(2))}
          </blockquote>
        );
      else if (!trimmed) out.push(<div key={i} className="h-2" />);
      else out.push(<p key={i} className="my-1 text-sm leading-relaxed">{renderInline(line)}</p>);
    });

    if (inCode && buffer.length) {
      out.push(
        <pre key="code-unclosed" className="my-2 overflow-x-auto rounded-lg border bg-muted/60 p-3 font-mono text-xs">
          <code>{buffer.join('\n')}</code>
        </pre>
      );
    }
    return out;
  }, [content]);

  return <div className={cn('break-words', className)}>{elements}</div>;
}
