'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  hookCategories,
  hooks,
  hooksByCategory,
  type HookEntry,
} from '@/lib/hooks-registry';
import { listIcon, SearchIcon, ArrowRightIcon, CloseIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

export default function HooksDirectory() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<string>('all');

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return hooks.filter((hook) => {
      if (category !== 'all' && hook.category !== category) return false;
      if (!needle) return true;
      return (
        hook.name.toLowerCase().includes(needle) ||
        hook.summary.toLowerCase().includes(needle) ||
        hook.keywords.some((keyword) => keyword.includes(needle))
      );
    });
  }, [query, category]);

  const filtering = query.trim().length > 0 || category !== 'all';

  return (
    <>
      <div className="sticky top-(--header-h) z-20 -mx-4 mb-8 border-b border-border bg-bg/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="relative mb-3">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-fg-subtle" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, purpose or keyword — try “storage”, “scroll”, “swipe”…"
            aria-label="Search hooks"
            className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-10 text-[15px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent/50"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-fg-subtle hover:text-fg"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={category === 'all'}
            onClick={() => setCategory('all')}
            count={hooks.length}
          >
            All hooks
          </FilterChip>
          {hookCategories.map((entry) => (
            <FilterChip
              key={entry.id}
              active={category === entry.id}
              onClick={() => setCategory(entry.id)}
              count={hooksByCategory(entry.id).length}
            >
              {entry.title}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtering ? (
        <section aria-live="polite">
          <p className="mb-4 text-sm text-fg-muted">
            {matches.length} {matches.length === 1 ? 'hook' : 'hooks'} match
            {matches.length === 1 ? 'es' : ''} your filter.
          </p>
          {matches.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-16 text-center">
              <p className="mb-1 font-medium text-fg">Nothing found</p>
              <p className="text-sm text-fg-muted">
                Try a broader term, or{' '}
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategory('all');
                  }}
                  className="font-medium text-accent hover:underline"
                >
                  clear the filters
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {matches.map((hook) => (
                <HookCard key={hook.slug} hook={hook} />
              ))}
            </div>
          )}
        </section>
      ) : (
        hookCategories.map((entry) => {
          const Icon = listIcon(entry.icon);
          return (
            <section
              key={entry.id}
              id={entry.slug}
              className="mb-14 scroll-mt-32"
            >
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-fg">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold tracking-tight text-fg">
                    {entry.title}
                    <span className="ml-2 text-sm font-normal text-fg-subtle">
                      {hooksByCategory(entry.id).length} hooks
                    </span>
                  </h2>
                  <p className="mt-1 text-pretty text-[15px] leading-relaxed text-fg-muted">
                    {entry.blurb}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {hooksByCategory(entry.id).map((hook) => (
                  <HookCard key={hook.slug} hook={hook} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </>
  );
}

function FilterChip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors',
        active
          ? 'border-transparent bg-accent text-accent-fg'
          : 'border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg',
      )}
    >
      {children}
      <span className={cn('ml-1.5', active ? 'opacity-70' : 'text-fg-subtle')}>
        {count}
      </span>
    </button>
  );
}

function HookCard({ hook }: { hook: HookEntry }) {
  return (
    <Link
      href={`/${hook.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_32px_-18px_var(--accent-ring)]"
    >
      <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[15px] font-semibold text-fg">
        {hook.name}
        <ArrowRightIcon className="h-3.5 w-3.5 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      </p>
      <p className="text-[13.5px] leading-relaxed text-fg-muted">
        {hook.summary}
      </p>
    </Link>
  );
}
