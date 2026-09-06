'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { fullSidebarNav } from '@/lib/navigation';
import { cn } from '@/lib/cn';
import { SearchIcon } from '@/components/ui/icons';
import { hookCount } from '@/lib/hooks-registry';

/**
 * The shared nav tree. Rendered by both the desktop sidebar and the mobile
 * drawer so there is only one place to keep the docs structure.
 */
export default function SidebarNav({
  onNavigate,
  showFilter = true,
}: {
  onNavigate?: () => void;
  showFilter?: boolean;
}) {
  const pathname = usePathname();
  const [filter, setFilter] = useState('');

  const groups = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return fullSidebarNav;
    return fullSidebarNav
      .map((group) => ({
        ...group,
        links: group.links.filter(
          (link) =>
            link.title.toLowerCase().includes(query) ||
            (link.hint ?? '').toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.links.length > 0);
  }, [filter]);

  return (
    <div className="flex h-full flex-col">
      {showFilter && (
        <div className="relative mb-5 shrink-0">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <input
            type="search"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder={`Filter ${hookCount} hooks…`}
            aria-label="Filter navigation"
            className="h-9 w-full rounded-lg border border-border bg-bg-subtle pl-9 pr-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent/50 focus:bg-surface"
          />
        </div>
      )}

      <nav
        aria-label="Documentation"
        className="min-h-0 flex-1 overflow-y-auto pb-10 custom-scrollbar"
      >
        {groups.length === 0 && (
          <p className="px-2 py-6 text-sm text-fg-subtle">
            Nothing matches &ldquo;{filter}&rdquo;.
          </p>
        )}

        {groups.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
              {group.href ? (
                <Link
                  href={group.href}
                  onClick={onNavigate}
                  className="transition-colors hover:text-accent"
                >
                  {group.title}
                </Link>
              ) : (
                group.title
              )}
            </p>
            <ul className="space-y-0.5">
              {group.links.map((link) => {
                const active = pathname === link.href.split('#')[0] &&
                  !link.href.includes('#');
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative block rounded-lg px-2.5 py-1.5 text-[13.5px] transition-colors',
                        active
                          ? 'bg-accent-soft font-semibold text-accent-soft-fg'
                          : 'text-fg-muted hover:bg-bg-muted hover:text-fg',
                        link.title.startsWith('use') && 'font-mono',
                      )}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent"
                        />
                      )}
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
