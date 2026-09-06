import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Renders the small inline subset our article blocks use:
 * `code`, **bold**, _italic_ and [text](href).
 *
 * Deliberately not a full markdown parser — a fixed, tiny grammar keeps the
 * content files readable and the output predictable.
 */
const PATTERN = /(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g;

export function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(PATTERN).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={index}
              className="rounded-[5px] border border-border bg-bg-muted px-[0.35em] py-[0.15em] font-mono text-[0.875em] text-accent-soft-fg"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith('_') && part.endsWith('_')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }

        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const isExternal = href.startsWith('http');
          const className =
            'font-medium text-accent underline decoration-accent/30 underline-offset-[3px] transition-colors hover:decoration-accent';

          return isExternal ? (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {label}
            </a>
          ) : (
            <Link key={index} href={href} className={className}>
              {label}
            </Link>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
