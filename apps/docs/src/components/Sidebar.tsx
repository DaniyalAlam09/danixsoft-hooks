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
        <Link href="/use-local-storage" className={getLinkClass('/use-local-storage')}>useLocalStorage</Link>
        <Link href="/use-debounce" className={getLinkClass('/use-debounce')}>useDebounce</Link>
        <Link href="/use-toggle" className={getLinkClass('/use-toggle')}>useToggle</Link>
        <Link href="/use-previous" className={getLinkClass('/use-previous')}>usePrevious</Link>
        
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">Forms & Data</div>
        <Link href="/use-form" className={getLinkClass('/use-form')}>useForm</Link>
        <Link href="/use-pagination" className={getLinkClass('/use-pagination')}>usePagination</Link>
        <Link href="/use-infinite-scroll" className={getLinkClass('/use-infinite-scroll')}>useInfiniteScroll</Link>
        <Link href="/use-fetch" className={getLinkClass('/use-fetch')}>useFetch</Link>
        
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 mt-6">DOM & Browser</div>
        <Link href="/use-click-outside" className={getLinkClass('/use-click-outside')}>useClickOutside</Link>
        <Link href="/use-media-query" className={getLinkClass('/use-media-query')}>useMediaQuery</Link>
        <Link href="/use-on-screen" className={getLinkClass('/use-on-screen')}>useOnScreen</Link>
        <Link href="/use-window-size" className={getLinkClass('/use-window-size')}>useWindowSize</Link>
      </nav>
    </aside>
  );
}
