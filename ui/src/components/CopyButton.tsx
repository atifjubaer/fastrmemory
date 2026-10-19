import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older environments
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      className={`copy-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: label ? '3px 8px' : '4px',
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        borderRadius: '4px',
        border: '1px solid var(--border)',
        background: copied ? 'var(--success-weak)' : 'var(--surface)',
        color: copied ? 'var(--success)' : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {label && <span>{copied ? 'Copied!' : label}</span>}
    </button>
  );
};
