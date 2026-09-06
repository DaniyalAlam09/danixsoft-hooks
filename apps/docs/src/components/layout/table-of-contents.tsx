'use client';

import { useEffect, useState } from 'react';
import type { TocEntry } from '@/lib/article';
import { cn } from '@/lib/cn';

/**
 * Right-hand "On this page" rail with a scroll spy.
 * Entries are supplied by the page rather than scraped from the DOM, so the
 * list is correct on the very first paint.
 */
export default function TableOfContents({
  entries,
  className,
}: {
  entries: TocEntry[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        // Prefer the topmost heading currently inside the reading band.
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
          return;
        }

        // Nothing in band (e.g. a long section): keep the last heading above the fold.
        const above = headings.filter(
          (heading) => heading.getBoundingClientRect().top < 120,
        );
        if (above.length > 0) setActiveId(above[above.length - 1].id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={activeId === entry.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 py-1 text-[13px] leading-snug transition-colors',
                entry.level === 3 ? 'pl-6' : 'pl-3',
                activeId === entry.id
                  ? 'border-accent font-medium text-accent'
                  : 'border-transparent text-fg-muted hover:border-border-strong hover:text-fg',
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
