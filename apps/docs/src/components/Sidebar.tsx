'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [search, setSearch] = useState('');
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
        : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5'
    }`;
  };

  return (
    <aside className="w-64 h-screen sticky top-0 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 p-6 hidden md:block shrink-0 pb-20">
      <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
        @danixsoft<span className="text-indigo-500">/hooks</span>
      </h1>
      
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search 42+ hooks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-neutral-100 dark:bg-neutral-800/50 border border-transparent dark:border-neutral-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white dark:focus:bg-neutral-800 transition-colors"
        />
      </div>

      <nav className="space-y-1">
        <NavSection title="Core" show={!search || "getting started".includes(search.toLowerCase())}>
          <NavLink href="/" search={search}>Getting Started</NavLink>
          <NavLink href="/api-reference" search={search}>API Reference</NavLink>
        </NavSection>
        
        <NavSection title="State & Storage" show={!search}>
        <NavLink href="/use-boolean" search={search}>useBoolean</NavLink>
        <NavLink href="/use-counter" search={search}>useCounter</NavLink>
        <NavLink href="/use-map" search={search}>useMap</NavLink>
        <NavLink href="/use-local-storage" search={search}>useLocalStorage</NavLink>
        <NavLink href="/use-session-storage" search={search}>useSessionStorage</NavLink>
        <NavLink href="/use-cookie" search={search}>useCookie</NavLink>
        <NavLink href="/use-debounce" search={search}>useDebounce</NavLink>
        <NavLink href="/use-toggle" search={search}>useToggle</NavLink>
        <NavLink href="/use-previous" search={search}>usePrevious</NavLink>
        <NavLink href="/use-step" search={search}>useStep</NavLink>
        </NavSection>
        
        <NavSection title="Forms & Data" show={!search}>
          <NavLink href="/use-form" search={search}>useForm</NavLink>
          <NavLink href="/use-pagination" search={search}>usePagination</NavLink>
          <NavLink href="/use-infinite-scroll" search={search}>useInfiniteScroll</NavLink>
          <NavLink href="/use-fetch" search={search}>useFetch</NavLink>
        </NavSection>
        
        <NavSection title="DOM & Browser" show={!search}>
          <NavLink href="/use-click-outside" search={search}>useClickOutside</NavLink>
          <NavLink href="/use-click-any-where" search={search}>useClickAnyWhere</NavLink>
          <NavLink href="/use-media-query" search={search}>useMediaQuery</NavLink>
          <NavLink href="/use-on-screen" search={search}>useOnScreen</NavLink>
          <NavLink href="/use-intersection-observer" search={search}>useIntersectionObserver</NavLink>
          <NavLink href="/use-window-size" search={search}>useWindowSize</NavLink>
          <NavLink href="/use-window-scroll" search={search}>useWindowScroll</NavLink>
          <NavLink href="/use-document-title" search={search}>useDocumentTitle</NavLink>
          <NavLink href="/use-event-listener" search={search}>useEventListener</NavLink>
          <NavLink href="/use-hover" search={search}>useHover</NavLink>
          <NavLink href="/use-screen" search={search}>useScreen</NavLink>
          <NavLink href="/use-mutation-observer" search={search}>useMutationObserver</NavLink>
          <NavLink href="/use-script" search={search}>useScript</NavLink>
        </NavSection>
        
        <NavSection title="Timers & Lifecycle" show={!search}>
          <NavLink href="/use-interval" search={search}>useInterval</NavLink>
          <NavLink href="/use-timeout" search={search}>useTimeout</NavLink>
          <NavLink href="/use-countdown" search={search}>useCountdown</NavLink>
          <NavLink href="/use-is-mounted" search={search}>useIsMounted</NavLink>
          <NavLink href="/use-is-client" search={search}>useIsClient</NavLink>
          <NavLink href="/use-unmount" search={search}>useUnmount</NavLink>
          <NavLink href="/use-update-effect" search={search}>useUpdateEffect</NavLink>
          <NavLink href="/use-event" search={search}>useEvent</NavLink>
          <NavLink href="/use-isomorphic-layout-effect" search={search}>useIsomorphicLayoutEffect</NavLink>
        </NavSection>

        <NavSection title="Advanced Sensors" show={!search}>
          <NavLink href="/use-copy-to-clipboard" search={search}>useCopyToClipboard</NavLink>
          <NavLink href="/use-online-state" search={search}>useOnlineState</NavLink>
          <NavLink href="/use-geolocation" search={search}>useGeolocation</NavLink>
          <NavLink href="/use-audio" search={search}>useAudio</NavLink>
          <NavLink href="/use-mouse" search={search}>useMouse</NavLink>
          <NavLink href="/use-touch" search={search}>useTouch</NavLink>
          <NavLink href="/use-swipe" search={search}>useSwipe</NavLink>
          <NavLink href="/use-scroll-lock" search={search}>useScrollLock</NavLink>
        </NavSection>
      </nav>
    </aside>
  );

  function NavSection({ title, show, children }: { title: string, show: boolean, children: React.ReactNode }) {
    // If we are searching, we only show the title if one of its children matches.
    // The children (NavLinks) handle their own visibility, but we don't want empty sections.
    // For simplicity in this quick implementation, we'll let the sections render and if empty, they just look like a list of results.
    // Actually, a better way:
    return (
      <div className="mb-6">
        {show && <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-2">{title}</div>}
        <div className="space-y-1">
          {children}
        </div>
      </div>
    );
  }

  function NavLink({ href, search, children }: { href: string, search: string, children: string }) {
    if (search && !children.toLowerCase().includes(search.toLowerCase())) {
      return null;
    }
    return <Link href={href} className={getLinkClass(href)}>{children}</Link>;
  }
}
