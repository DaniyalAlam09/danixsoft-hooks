'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
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
      <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
        @danixsoft<span className="text-indigo-500">/hooks</span>
      </h1>
      <nav className="space-y-1">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">Core</div>
        <Link href="/" className={getLinkClass('/')}>Getting Started</Link>
        
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">State & Storage</div>
        <Link href="/use-boolean" className={getLinkClass('/use-boolean')}>useBoolean</Link>
        <Link href="/use-counter" className={getLinkClass('/use-counter')}>useCounter</Link>
        <Link href="/use-map" className={getLinkClass('/use-map')}>useMap</Link>
        <Link href="/use-local-storage" className={getLinkClass('/use-local-storage')}>useLocalStorage</Link>
        <Link href="/use-session-storage" className={getLinkClass('/use-session-storage')}>useSessionStorage</Link>
        <Link href="/use-cookie" className={getLinkClass('/use-cookie')}>useCookie</Link>
        <Link href="/use-debounce" className={getLinkClass('/use-debounce')}>useDebounce</Link>
        <Link href="/use-toggle" className={getLinkClass('/use-toggle')}>useToggle</Link>
        <Link href="/use-previous" className={getLinkClass('/use-previous')}>usePrevious</Link>
        <Link href="/use-step" className={getLinkClass('/use-step')}>useStep</Link>
        
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">Forms & Data</div>
        <Link href="/use-form" className={getLinkClass('/use-form')}>useForm</Link>
        <Link href="/use-pagination" className={getLinkClass('/use-pagination')}>usePagination</Link>
        <Link href="/use-infinite-scroll" className={getLinkClass('/use-infinite-scroll')}>useInfiniteScroll</Link>
        <Link href="/use-fetch" className={getLinkClass('/use-fetch')}>useFetch</Link>
        
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">DOM & Browser</div>
        <Link href="/use-click-outside" className={getLinkClass('/use-click-outside')}>useClickOutside</Link>
        <Link href="/use-click-any-where" className={getLinkClass('/use-click-any-where')}>useClickAnyWhere</Link>
        <Link href="/use-media-query" className={getLinkClass('/use-media-query')}>useMediaQuery</Link>
        <Link href="/use-on-screen" className={getLinkClass('/use-on-screen')}>useOnScreen</Link>
        <Link href="/use-intersection-observer" className={getLinkClass('/use-intersection-observer')}>useIntersectionObserver</Link>
        <Link href="/use-window-size" className={getLinkClass('/use-window-size')}>useWindowSize</Link>
        <Link href="/use-window-scroll" className={getLinkClass('/use-window-scroll')}>useWindowScroll</Link>
        <Link href="/use-document-title" className={getLinkClass('/use-document-title')}>useDocumentTitle</Link>
        <Link href="/use-event-listener" className={getLinkClass('/use-event-listener')}>useEventListener</Link>
        <Link href="/use-hover" className={getLinkClass('/use-hover')}>useHover</Link>
        <Link href="/use-screen" className={getLinkClass('/use-screen')}>useScreen</Link>
        <Link href="/use-mutation-observer" className={getLinkClass('/use-mutation-observer')}>useMutationObserver</Link>
        <Link href="/use-script" className={getLinkClass('/use-script')}>useScript</Link>
        
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">Timers & Lifecycle</div>
        <Link href="/use-interval" className={getLinkClass('/use-interval')}>useInterval</Link>
        <Link href="/use-timeout" className={getLinkClass('/use-timeout')}>useTimeout</Link>
        <Link href="/use-countdown" className={getLinkClass('/use-countdown')}>useCountdown</Link>
        <Link href="/use-is-mounted" className={getLinkClass('/use-is-mounted')}>useIsMounted</Link>
        <Link href="/use-is-client" className={getLinkClass('/use-is-client')}>useIsClient</Link>
        <Link href="/use-unmount" className={getLinkClass('/use-unmount')}>useUnmount</Link>
        <Link href="/use-update-effect" className={getLinkClass('/use-update-effect')}>useUpdateEffect</Link>
        <Link href="/use-event" className={getLinkClass('/use-event')}>useEvent</Link>
        <Link href="/use-isomorphic-layout-effect" className={getLinkClass('/use-isomorphic-layout-effect')}>useIsomorphicLayoutEffect</Link>

        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">Advanced Sensors</div>
        <Link href="/use-copy-to-clipboard" className={getLinkClass('/use-copy-to-clipboard')}>useCopyToClipboard</Link>
        <Link href="/use-online-state" className={getLinkClass('/use-online-state')}>useOnlineState</Link>
        <Link href="/use-geolocation" className={getLinkClass('/use-geolocation')}>useGeolocation</Link>
        <Link href="/use-audio" className={getLinkClass('/use-audio')}>useAudio</Link>
        <Link href="/use-mouse" className={getLinkClass('/use-mouse')}>useMouse</Link>
        <Link href="/use-touch" className={getLinkClass('/use-touch')}>useTouch</Link>
        <Link href="/use-swipe" className={getLinkClass('/use-swipe')}>useSwipe</Link>
        <Link href="/use-scroll-lock" className={getLinkClass('/use-scroll-lock')}>useScrollLock</Link>
      </nav>
    </aside>
  );
}
