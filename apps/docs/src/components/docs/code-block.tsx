import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/cn';
import CopyButton from './copy-button';

/*
 * A server component on purpose: highlighting runs at build time, so the
 * tokenised markup is in the static HTML and neither the Prism grammars nor
 * the tokenising work reach the browser. Only the copy button hydrates.
 * Do not import this from a 'use client' file — that would pull the whole
 * highlighter back into the client bundle.
 */

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
          <CopyButton text={code.trim()} />
        </div>
      )}

      {title === null && (
        <div className="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          <CopyButton text={code.trim()} />
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
