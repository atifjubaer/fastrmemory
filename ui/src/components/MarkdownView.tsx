import React from 'react';
import { CopyButton } from './CopyButton';

interface MarkdownViewProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content, className, style }) => {
  if (!content) return null;

  // Split text into blocks (paragraphs, code blocks, lists)
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = '';

  const renderInline = (text: string): React.ReactNode[] => {
    // Regex matches inline code `code`, bold **bold**, italic *italic*, or link [text](url)
    const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return tokens.map((token, idx) => {
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code
            key={idx}
            style={{
              background: 'var(--bg-subtle)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9em',
              color: 'var(--accent)',
              border: '1px solid var(--border)',
            }}
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={idx} style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith('*') && token.endsWith('*')) {
        return <em key={idx}>{token.slice(1, -1)}</em>;
      }
      return token;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        const codeText = codeBuffer.join('\n');
        elements.push(
          <div
            key={`code-${i}`}
            style={{
              position: 'relative',
              margin: '10px 0',
              borderRadius: '8px',
              background: 'var(--bg-code, #0b0f19)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            {codeLang && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                }}
              >
                <span>{codeLang}</span>
                <CopyButton text={codeText} label="Copy" />
              </div>
            )}
            <pre
              style={{
                margin: 0,
                padding: '12px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                lineHeight: 1.5,
                color: '#e2e8f0',
                overflowX: 'auto',
              }}
            >
              <code>{codeText}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        codeLang = '';
        inCodeBlock = false;
      } else {
        // Open code block
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${i}`} style={{ fontSize: '14px', fontWeight: 700, margin: '14px 0 6px 0', color: 'var(--text-strong)' }}>
          {renderInline(line.slice(4))}
        </h4>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${i}`} style={{ fontSize: '15px', fontWeight: 700, margin: '16px 0 8px 0', color: 'var(--text-strong)' }}>
          {renderInline(line.slice(3))}
        </h3>
      );
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h2 key={`h2-${i}`} style={{ fontSize: '17px', fontWeight: 800, margin: '18px 0 10px 0', color: 'var(--text-strong)' }}>
          {renderInline(line.slice(2))}
        </h2>
      );
      continue;
    }

    // Bullet lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      elements.push(
        <div key={`li-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '4px 0', fontSize: '13px', lineHeight: 1.5 }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>&bull;</span>
          <div>{renderInline(line.trim().slice(2))}</div>
        </div>
      );
      continue;
    }

    // Numbered lists
    const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      elements.push(
        <div key={`ol-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '4px 0', fontSize: '13px', lineHeight: 1.5 }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{numMatch[1]}.</span>
          <div>{renderInline(numMatch[2])}</div>
        </div>
      );
      continue;
    }

    // Blockquotes
    if (line.trim().startsWith('> ')) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          style={{
            margin: '8px 0',
            padding: '6px 12px',
            borderLeft: '3px solid var(--accent)',
            background: 'var(--accent-weak)',
            borderRadius: '0 6px 6px 0',
            fontSize: '12px',
            color: 'var(--text)',
          }}
        >
          {renderInline(line.trim().slice(2))}
        </blockquote>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      elements.push(<div key={`sp-${i}`} style={{ height: '8px' }} />);
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${i}`} style={{ margin: '4px 0', fontSize: '13px', lineHeight: 1.55, color: 'var(--text)' }}>
        {renderInline(line)}
      </p>
    );
  }

  return (
    <div className={className} style={{ ...style, wordBreak: 'break-word' }}>
      {elements}
    </div>
  );
};
