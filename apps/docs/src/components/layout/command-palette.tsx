'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hooks, hookCategories } from '@/lib/hooks-registry';
import { primaryNav, docsNav } from '@/lib/navigation';
import { SearchIcon, CloseIcon, ArrowRightIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

interface SearchItem {
  id: string;
  title: string;
  hint: string;
  href: string;
  group: string;
  /** Extra terms matched against but not displayed. */
  terms: string;
}

const buildIndex = (): SearchItem[] => [
  ...primaryNav.map((link) => ({
    id: `nav:${link.href}`,
    title: link.title,
    hint: link.hint ?? '',
    href: link.href,
    group: 'Navigation',
    terms: `${link.title} ${link.hint ?? ''}`,
  })),
  ...docsNav.flatMap((group) =>
    group.links.map((link) => ({
      id: `docs:${link.href}`,
      title: link.title,
      hint: link.hint ?? '',
      href: link.href,
      group: group.title,
      terms: `${link.title} ${link.hint ?? ''}`,
    })),
  ),
  ...hooks.map((hook) => ({
    id: `hook:${hook.slug}`,
    title: hook.name,
    hint: hook.summary,
    href: `/${hook.slug}`,
    group:
      hookCategories.find((category) => category.id === hook.category)?.title ??
      'Hooks',
    terms: `${hook.name} ${hook.slug} ${hook.summary} ${hook.keywords.join(' ')}`,
  })),
];

/** Cheap subsequence-aware scoring: exact prefix > word start > substring. */
const score = (item: SearchItem, query: string) => {
  const haystack = item.terms.toLowerCase();
  const title = item.title.toLowerCase();
  if (title === query) return 1000;
  if (title.startsWith(query)) return 500 - title.length;
  if (new RegExp(`\\b${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(title))
    return 300;
  if (title.includes(query)) return 200;
  if (haystack.includes(query)) return 100;
  return -1;
};

export default function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return index.filter((item) => item.group === 'Navigation').concat(
        index.filter((item) => item.id.startsWith('hook:')).slice(0, 6),
      );
    }
    return index
      .map((item) => ({ item, rank: score(item, trimmed) }))
      .filter((entry) => entry.rank >= 0)
      .sort((a, b) => b.rank - a.rank)
      .slice(0, 24)
      .map((entry) => entry.item);
  }, [index, query]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery('');
    setActive(0);
  }, [onOpenChange]);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActive((current) => (current + 1) % Math.max(results.length, 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActive(
          (current) =>
            (current - 1 + Math.max(results.length, 1)) %
            Math.max(results.length, 1),
        );
      } else if (event.key === 'Enter' && results[active]) {
        event.preventDefault();
        go(results[active].href);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, results, active, close, go]);

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  // Lock the page behind the dialog.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 animate-fade"
      role="dialog"
      aria-modal="true"
      aria-label="Search the documentation"
    >
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative mx-auto mt-[10vh] w-[92vw] max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_70px_-20px_rgba(0,0,0,.45)]">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon className="h-4.5 w-4.5 shrink-0 text-fg-subtle" />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0); // a new result set starts at the top
            }}
            placeholder="Search hooks, guides and docs…"
            aria-label="Search"
            className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-subtle"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={listRef}
          className="max-h-[55vh] overflow-y-auto p-2 custom-scrollbar"
        >
          {results.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-fg-subtle">
              No matches for &ldquo;{query}&rdquo;. Try a hook name like{' '}
              <span className="font-mono text-fg-muted">useDebounce</span>.
            </p>
          )}

          {results.map((item, position) => {
            const showGroup =
              position === 0 || results[position - 1].group !== item.group;
            return (
              <div key={item.id}>
                {showGroup && (
                  <p className="px-3 pb-1.5 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
                    {item.group}
                  </p>
                )}
                <button
                  type="button"
                  data-active={position === active}
                  onMouseEnter={() => setActive(position)}
                  onClick={() => go(item.href)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    position === active ? 'bg-accent-soft' : 'hover:bg-bg-muted',
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'truncate text-sm font-medium',
                        item.id.startsWith('hook:') && 'font-mono',
                        position === active
                          ? 'text-accent-soft-fg'
                          : 'text-fg',
                      )}
                    >
                      {item.title}
                    </p>
                    {item.hint && (
                      <p className="truncate text-[12.5px] text-fg-muted">
                        {item.hint}
                      </p>
                    )}
                  </div>
                  <ArrowRightIcon
                    className={cn(
                      'h-4 w-4 shrink-0 text-accent transition-opacity',
                      position === active ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-border bg-bg-subtle px-4 py-2.5 text-[11px] text-fg-subtle">
          <Hint keys={['↑', '↓']}>navigate</Hint>
          <Hint keys={['↵']}>open</Hint>
          <Hint keys={['esc']}>close</Hint>
        </div>
      </div>
    </div>
  );
}

function Hint({ keys, children }: { keys: string[]; children: string }) {
  return (
    <span className="flex items-center gap-1">
      {keys.map((key) => (
        <kbd
          key={key}
          className="rounded border border-border bg-surface px-1.5 py-0.5 font-sans text-[10px] font-semibold text-fg-muted"
        >
          {key}
        </kbd>
      ))}
      {children}
    </span>
  );
}
