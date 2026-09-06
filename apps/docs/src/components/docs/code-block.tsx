'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckIcon, CopyIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  /** Filename shown in the window chrome. Pass null to hide the chrome entirely. */
  title?: string | null;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'tsx',
  title = 'Usage Example',
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the code is still selectable */
    }
  };

  return (
    <div
      className={cn(
        'group relative my-6 overflow-hidden rounded-xl border border-code-border bg-code-bg',
        className,
      )}
    >
      {title !== null && (
        <div className="flex items-center justify-between border-b border-code-border bg-code-chrome px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="truncate font-mono text-xs text-code-fg/55">
              {title}
            </span>
          </div>
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
      )}

      {title === null && (
        <div className="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
      )}

      <div className="overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '0.85rem',
            lineHeight: 1.65,
          }}
          codeTagProps={{
            style: { fontFamily: 'var(--font-mono)' },
          }}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            minWidth: '2.25em',
            paddingRight: '1.25em',
            color: 'var(--code-fg)',
            opacity: 0.28,
            textAlign: 'right',
            userSelect: 'none',
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function CopyButton({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
      className="flex items-center gap-1.5 rounded-md border border-code-border bg-code-bg/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-code-fg/70 backdrop-blur transition-colors hover:text-code-fg"
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-[#28c840]" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
