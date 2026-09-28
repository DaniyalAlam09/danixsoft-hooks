'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useHydrated } from '@/lib/use-hydrated';
import { primaryNav } from '@/lib/navigation';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/cn';
import {
  GitHubIcon,
  MenuIcon,
  SearchIcon,
  CloseIcon,
} from '@/components/ui/icons';
import { ThemeSwitch, ThemeToggleButton } from './theme-toggle';
import MobileNav from './mobile-nav';
import Logo from './logo';

// Search is loaded on first open (⌘K, "/" or the button) rather than
// hydrated on every page view.
const CommandPalette = dynamic(() => import('./command-palette'), {
  ssr: false,
});

export default function Header({ version }: { version: string }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const hydrated = useHydrated();

  // The drawer is keyed to the route it was opened on, so a navigation closes
  // it without an effect that would have to call setState.
  const [navOpenFor, setNavOpenFor] = useState<string | null>(null);
  const navOpen = navOpenFor === pathname;
  const closeNav = () => setNavOpenFor(null);

  // navigator is only readable in the browser; before hydration we render the
  // Ctrl label, which is also the correct default for most visitors.
  const isMac =
    hydrated && /Mac|iPhone|iPad/.test(navigator.platform ?? '');

  // Global ⌘K / Ctrl+K shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      // "/" opens search, but not while the user is typing in a field.
      if (
        event.key === '/' &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 h-(--header-h) border-b border-border bg-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-[100rem] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setNavOpenFor(navOpen ? null : pathname)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            className="-ml-1 rounded-lg p-2 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg lg:hidden"
          >
            {navOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={`${siteConfig.name} home`}
          >
            <Logo className="h-7 w-7" />
            <span className="hidden font-semibold tracking-tight text-fg sm:inline">
              @danixsoft<span className="text-accent">/hooks</span>
            </span>
          </Link>

          <span className="hidden rounded-full border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[11px] text-fg-subtle md:inline">
            v{version}
          </span>

          <nav
            aria-label="Main"
            className="ml-4 hidden items-center gap-1 lg:flex"
          >
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'bg-accent-soft text-accent-soft-fg'
                    : 'text-fg-muted hover:bg-bg-muted hover:text-fg',
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search documentation"
              className="flex items-center gap-2 rounded-lg border border-border bg-bg-subtle py-1.5 pl-2.5 pr-2 text-sm text-fg-subtle transition-colors hover:border-border-strong hover:text-fg-muted sm:w-56 md:w-64"
            >
              <SearchIcon className="h-4 w-4 shrink-0" />
              <span className="hidden flex-1 text-left sm:inline">Search…</span>
              <kbd className="ml-auto hidden shrink-0 rounded border border-border bg-surface px-1.5 py-0.5 font-sans text-[10px] font-semibold sm:inline">
                {isMac ? '⌘' : 'Ctrl '}K
              </kbd>
            </button>

            {/* Wrapped rather than passing a `hidden` class into the
                component — its own `inline-flex` would tie on specificity. */}
            <div className="hidden sm:block">
              <ThemeSwitch />
            </div>
            <div className="sm:hidden">
              <ThemeToggleButton />
            </div>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the source on GitHub"
              className="hidden rounded-lg border border-border bg-surface p-2 text-fg-muted transition-colors hover:text-fg sm:block"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <MobileNav open={navOpen} onClose={closeNav} />
      {searchOpen && (
        <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      )}
    </>
  );
}
