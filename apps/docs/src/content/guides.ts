import type { Article } from '@/lib/article';

/**
 * Long-form editorial pages.
 *
 * Each one leads with a direct `answer` — the paragraph an answer engine can
 * quote verbatim — then goes deep enough to be worth a reader's time.
 */
export const guides: Article[] = [
  {
    slug: 'react-hooks-cheat-sheet',
    section: '/guides',
    title: 'React Hooks Cheat Sheet (2026): Every Built-in and Custom Hook',
    heading: 'The React Hooks Cheat Sheet',
    description:
      'A complete reference to every built-in React hook and the 44 custom hooks in @danixsoft/hooks — what each one does, when to reach for it, and the mistake people make with it.',
    answer:
      'React ships eleven commonly used built-in hooks: useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect, useId, useTransition and useSyncExternalStore. Everything else — persisting to localStorage, debouncing a value, detecting clicks outside an element, watching a media query — is a custom hook you either write yourself or install. @danixsoft/hooks provides 44 of the most common ones with zero dependencies and full TypeScript types.',
    keywords: [
      'react hooks cheat sheet',
      'react hooks list',
      'all react hooks',
      'react hooks reference',
      'useState useEffect useMemo',
      'custom react hooks',
    ],
    datePublished: '2025-02-04',
    dateModified: '2026-01-20',
    related: ['custom-react-hooks-best-practices', 'nextjs-ssr-safe-hooks'],
    blocks: [
      {
        type: 'lead',
        text: 'Hooks replaced class components in 2019 and have barely changed since. What _has_ changed is the set of problems people solve with them. This page is two references in one: the built-in hooks React gives you, and the custom hooks almost every application ends up needing.',
      },
      {
        type: 'keyTakeaway',
        text: 'If you find yourself writing the same `useEffect` in three components, that is a custom hook trying to get out. The whole point of hooks is that stateful logic becomes portable.',
      },

      { type: 'h2', text: 'The built-in React hooks' },
      {
        type: 'p',
        text: 'These come with React itself. You never install them, and every custom hook is ultimately built out of them.',
      },
      {
        type: 'table',
        head: ['Hook', 'What it gives you', 'Reach for it when'],
        rows: [
          ['`useState`', 'A value and a setter that triggers a re-render', 'Any piece of state a component owns'],
          ['`useEffect`', 'A side effect that runs after render, with cleanup', 'Subscriptions, timers, imperative DOM work'],
          ['`useContext`', 'The nearest provider value for a context', 'Theme, auth, locale — anything ambient'],
          ['`useReducer`', 'State transitions expressed as actions', 'State with several fields that change together'],
          ['`useCallback`', 'A memoised function identity', 'Passing callbacks to memoised children'],
          ['`useMemo`', 'A memoised computed value', 'Genuinely expensive derivations only'],
          ['`useRef`', 'A mutable box that survives renders without causing one', 'DOM nodes, timers, "previous value" tracking'],
          ['`useLayoutEffect`', 'An effect that runs before the browser paints', 'Measuring layout, avoiding visual flicker'],
          ['`useId`', 'A stable unique id across server and client', 'Linking labels to inputs in SSR apps'],
          ['`useTransition`', 'A pending flag for non-urgent updates', 'Keeping the UI responsive during heavy renders'],
          ['`useSyncExternalStore`', 'A tear-free subscription to an outside store', 'Integrating non-React state libraries'],
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'The two rules that catch everyone',
        text: 'Hooks must be called at the top level of a component or another hook — never inside a condition, loop, or nested function — and only from React functions. React tracks hooks positionally, so a conditional hook shifts every subsequent hook by one and corrupts your state.',
      },

      { type: 'h2', text: 'The custom hooks every app ends up needing' },
      {
        type: 'p',
        text: 'React deliberately stops at primitives. The gap between `useState` and a working feature is where custom hooks live. Below is that gap, grouped the way it actually shows up in a codebase.',
      },

      { type: 'h3', text: 'State that has to outlive a render' },
      {
        type: 'p',
        text: 'Plain `useState` is gone the moment the component unmounts. Preferences, drafts and dismissals usually need to survive a reload — or at least a route change.',
      },
      {
        type: 'hooks',
        slugs: ['use-local-storage', 'use-session-storage', 'use-cookie', 'use-previous'],
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Persisted theme preference',
        code: `import { useLocalStorage } from '@danixsoft/hooks';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    </button>
  );
}`,
      },

      { type: 'h3', text: 'Reading the browser' },
      {
        type: 'p',
        text: 'Viewport size, media queries, scroll position, visibility, network status. Each one is an event listener plus cleanup plus an SSR guard — three chances to get it subtly wrong.',
      },
      {
        type: 'hooks',
        slugs: [
          'use-media-query',
          'use-window-size',
          'use-on-screen',
          'use-online-state',
          'use-window-scroll',
          'use-screen',
        ],
      },

      { type: 'h3', text: 'Timing and rate limiting' },
      {
        type: 'p',
        text: 'A search box that fires a request on every keystroke is the single most common performance bug in React applications. Debouncing it is one line.',
      },
      {
        type: 'hooks',
        slugs: ['use-debounce', 'use-interval', 'use-timeout', 'use-countdown'],
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Debounced search',
        code: `import { useState } from 'react';
import { useDebounce, useFetch } from '@danixsoft/hooks';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data, loading } = useFetch(\`/api/search?q=\${debouncedQuery}\`);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {loading ? <Spinner /> : <Results items={data} />}
    </>
  );
}`,
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Note which value goes where: the **input** stays bound to `query` so typing feels instant, while the **request** uses `debouncedQuery`. Swapping them makes the field feel laggy.',
      },

      { type: 'h3', text: 'Interaction and gestures' },
      {
        type: 'hooks',
        slugs: ['use-click-outside', 'use-hover', 'use-mouse', 'use-swipe', 'use-copy-to-clipboard'],
      },

      { type: 'h3', text: 'Lifecycle escape hatches' },
      {
        type: 'p',
        text: 'These exist because `useEffect` alone cannot express "only on updates", "only on unmount", or "always the latest closure" without boilerplate that is easy to get wrong.',
      },
      {
        type: 'hooks',
        slugs: ['use-update-effect', 'use-unmount', 'use-event', 'use-is-mounted', 'use-is-client'],
      },

      { type: 'h2', text: 'The five mistakes that account for most hook bugs' },
      {
        type: 'steps',
        items: [
          {
            name: 'Stale closures in intervals and event handlers',
            text: 'A callback registered once captures the state from that render forever. `useInterval` and `useEvent` both solve this by keeping the callback in a ref and always invoking the latest version.',
          },
          {
            name: 'Missing cleanup',
            text: 'Every subscription, timer and listener you create in an effect must be returned as a cleanup function. Forgetting this leaks memory and, in React Strict Mode, doubles your side effects in development.',
          },
          {
            name: 'Objects and arrays in dependency arrays',
            text: 'A fresh object literal is a new identity on every render, so the effect runs every time. Depend on primitive fields, or memoise the object with `useMemo`.',
          },
          {
            name: 'Reaching for useMemo too early',
            text: 'Memoisation is not free — it costs a comparison and extra memory on every render. Measure before you memoise anything cheaper than a few milliseconds.',
          },
          {
            name: 'Touching window during server rendering',
            text: 'Any hook that reads `window`, `document`, `localStorage` or `navigator` must guard for the server, or your Next.js build will crash and your hydration will mismatch.',
          },
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'The SSR problem is big enough to deserve its own page — see [SSR-safe hooks in Next.js](/guides/nextjs-ssr-safe-hooks) for the full treatment.',
      },

      { type: 'h2', text: 'Install the whole set' },
      {
        type: 'p',
        text: 'Every hook linked on this page is a named export from one tree-shakeable package.',
      },
      {
        type: 'code',
        lang: 'bash',
        code: 'npm install @danixsoft/hooks',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'How many hooks does React have built in?',
            answer:
              'React 19 exposes around a dozen hooks in common use: useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue, useId, useDeferredValue, useTransition, useSyncExternalStore and useActionState. Most applications use five or six of them regularly.',
          },
          {
            question: 'Should I write my own hooks or install a library?',
            answer:
              'Write your own for logic specific to your product — that is the whole point of custom hooks. Install a library for the generic, well-understood problems (debouncing, localStorage, media queries) where a well-tested implementation already exists and the edge cases are known.',
          },
          {
            question: 'Do custom hooks hurt performance?',
            answer:
              'No. A custom hook is a plain function call; it adds no component to the tree and no extra render. Performance depends on what the hook does internally, not on the fact that it is a hook.',
          },
          {
            question: 'Can a custom hook call another custom hook?',
            answer:
              'Yes, and that is normal. Hooks compose freely as long as every call happens at the top level of the function. Several hooks in this library are built on top of others in it.',
          },
        ],
      },
    ],
  },

  {
    slug: 'nextjs-ssr-safe-hooks',
    section: '/guides',
    title: 'SSR-Safe React Hooks in Next.js: Fixing Hydration Mismatches',
    heading: 'SSR-safe hooks in Next.js',
    description:
      'Why "window is not defined" and hydration mismatches happen, and the four patterns that fix them for good in Next.js, Remix and any server-rendered React app.',
    answer:
      'A hydration mismatch happens when the HTML React rendered on the server differs from what it renders on the client during hydration. It is almost always caused by reading browser-only state — localStorage, window dimensions, matchMedia, Date, or a random value — directly during render. The fix is to render the server-safe default first, then update after mount, either with a useEffect, an isClient flag, or a blocking inline script when you cannot tolerate a flash.',
    keywords: [
      'nextjs hydration mismatch',
      'window is not defined nextjs',
      'ssr safe react hooks',
      'text content did not match',
      'useLayoutEffect ssr warning',
      'next.js localStorage',
    ],
    datePublished: '2025-03-11',
    dateModified: '2026-01-20',
    related: ['react-localstorage-guide', 'custom-react-hooks-best-practices'],
    blocks: [
      {
        type: 'lead',
        text: 'Server rendering gives you fast first paint and indexable HTML. It also gives you a category of bug that does not exist in a client-only app: the server and the browser disagree about what the page should look like.',
      },

      { type: 'h2', text: 'The two errors and what each one means' },
      {
        type: 'h3',
        text: '"ReferenceError: window is not defined"',
      },
      {
        type: 'p',
        text: 'This one is a crash, not a warning. Your module or component touched a browser global while running in Node. It happens at import time if the access is at module scope, and at render time if it is in the component body.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Crashes during the build',
        code: `// ✗ Runs in Node during \`next build\` — there is no window there.
const isWide = window.innerWidth > 1024;

export function Banner() {
  return <div>{isWide ? 'wide' : 'narrow'}</div>;
}`,
      },
      {
        type: 'h3',
        text: '"Hydration failed" / "Text content did not match"',
      },
      {
        type: 'p',
        text: 'This one is subtler. The code ran fine on both sides, but produced different output. React throws away the server HTML for that subtree and re-renders it on the client, which costs you the performance benefit you paid for and often shows a visible flash.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Renders differently on server and client',
        code: `// ✗ The server has no localStorage, so it renders 'dark'.
//   The browser reads 'light' and renders something else. Mismatch.
function ThemeLabel() {
  const stored =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  return <span>{stored ?? 'dark'}</span>;
}`,
      },
      {
        type: 'callout',
        tone: 'warn',
        text: 'Guarding with `typeof window !== "undefined"` stops the crash but **causes** the mismatch: it makes the render output depend on where the code is running, which is exactly what React forbids.',
      },

      { type: 'h2', text: 'Pattern 1: render the default, then correct after mount' },
      {
        type: 'p',
        text: 'The safest general-purpose fix. Initialise state to a value the server can also produce, then read the browser in an effect. Effects never run on the server, so the first render matches by construction.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'The shape every SSR-safe hook uses',
        code: `import { useEffect, useState } from 'react';

export function useWindowWidth() {
  // Server and first client render agree on undefined.
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}`,
      },
      {
        type: 'p',
        text: 'Every browser-reading hook in this library follows exactly that shape, so you get the behaviour without writing it 20 times.',
      },
      {
        type: 'hooks',
        slugs: ['use-window-size', 'use-media-query', 'use-screen', 'use-online-state'],
        title: 'Hooks built on this pattern',
      },

      { type: 'h2', text: 'Pattern 2: gate the whole subtree with an isClient flag' },
      {
        type: 'p',
        text: 'When a component genuinely cannot render meaningfully on the server — a map, a chart sized to the viewport, anything reading `navigator` — do not try. Render a placeholder of the same size, then swap.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Deferring browser-only UI',
        code: `import { useIsClient } from '@danixsoft/hooks';

function LocationCard() {
  const isClient = useIsClient();

  // Reserve the space so the swap does not shift layout (and does not hurt CLS).
  if (!isClient) return <div className="h-40 animate-pulse rounded-xl bg-muted" />;

  return <MapWidget />;
}`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'Keep the placeholder the same size',
        text: 'Swapping a zero-height placeholder for real content is a layout shift, and Cumulative Layout Shift is a Core Web Vital. Reserve the final dimensions up front.',
      },

      { type: 'h2', text: 'Pattern 3: a blocking inline script when a flash is unacceptable' },
      {
        type: 'p',
        text: 'Patterns 1 and 2 both show the default first. For a theme that is usually fine for a chart, and completely unacceptable for the page background — a white flash before dark mode loads is the most-complained-about bug in dark-mode implementations.',
      },
      {
        type: 'p',
        text: 'The escape hatch is a small synchronous script in `<head>`. The browser executes it while parsing, before the first paint, so the correct class is already on `<html>` when anything is drawn.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'app/layout.tsx',
        code: `const themeScript = \`
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();
\`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
      },
      {
        type: 'callout',
        tone: 'info',
        text: '`suppressHydrationWarning` on `<html>` is required here, and it is safe: it tells React to accept the DOM it finds at that one node rather than the server payload. It does **not** suppress warnings for the rest of the tree. This exact technique is what powers the theme switch on this site.',
      },

      { type: 'h2', text: 'Pattern 4: useIsomorphicLayoutEffect for measurement' },
      {
        type: 'p',
        text: 'React warns that `useLayoutEffect` does nothing on the server — correctly, since there is no layout to read. But downgrading to `useEffect` everywhere reintroduces flicker for genuine measurement work. The standard resolution is to pick per environment.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `import { useIsomorphicLayoutEffect } from '@danixsoft/hooks';

// useLayoutEffect in the browser, useEffect on the server. No warning, no flicker.
useIsomorphicLayoutEffect(() => {
  setHeight(ref.current.getBoundingClientRect().height);
}, []);`,
      },

      { type: 'h2', text: 'Server Components change where the problem lives' },
      {
        type: 'p',
        text: 'In the Next.js App Router, components are server components by default and never hydrate — so they cannot mismatch. The moment you add `"use client"`, the component renders on the server for the initial HTML **and** hydrates in the browser, and every rule above applies again.',
      },
      {
        type: 'list',
        items: [
          '**Server Component** — runs once, on the server. No hooks, no browser APIs, no hydration risk.',
          '**Client Component** — pre-rendered on the server, then hydrated. Hooks work; SSR safety matters.',
          'Push `"use client"` as far down the tree as you can. Smaller client boundaries mean less to hydrate and fewer places to get it wrong.',
        ],
      },
      {
        type: 'keyTakeaway',
        text: 'The rule that prevents every bug on this page: **your render output must not depend on where the code is running.** If a value only exists in the browser, it belongs in an effect or an inline script — never in the render body.',
      },

      { type: 'h2', text: 'A checklist before you ship' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Search your client components for `window`, `document`, `localStorage`, `navigator` and `matchMedia` outside of effects.',
          'Check for `Date.now()`, `new Date()` and `Math.random()` in render — all three differ between server and client.',
          'Run a production build, not just `next dev`; some mismatches only surface once the HTML is actually pre-rendered.',
          'Load the page with JavaScript disabled and confirm the server HTML is sensible on its own.',
          'Watch the console during a hard refresh — hydration warnings appear once and are easy to miss on a soft navigation.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Why does my hydration error only appear in production?',
            answer:
              'Development and production render through different code paths, and React batches and reports warnings differently. Time-dependent and locale-dependent values are also more likely to diverge once the server pre-renders at build time rather than per request. Always verify with next build && next start.',
          },
          {
            question: 'Is suppressHydrationWarning a legitimate fix?',
            answer:
              'On a single element whose content you deliberately correct with an inline script, yes — that is its intended use. As a way to silence a mismatch you have not understood, no: React will still discard and re-render that subtree on the client, so you keep the performance cost and lose the warning that told you about it.',
          },
          {
            question: 'Do I need these patterns with Vite or Create React App?',
            answer:
              'No. A purely client-rendered app has no server render to disagree with. These problems are specific to SSR and static pre-rendering — Next.js, Remix, Astro and Gatsby.',
          },
          {
            question: 'Does useEffect run on the server in Next.js?',
            answer:
              'No, never. Effects run only in the browser after hydration. That is precisely why moving browser access into an effect fixes the mismatch — the server simply skips it.',
          },
        ],
      },
    ],
  },

  {
    slug: 'debounce-vs-throttle-in-react',
    section: '/guides',
    title: 'Debounce vs Throttle in React: Which One and When',
    heading: 'Debounce vs throttle in React',
    description:
      'The practical difference between debouncing and throttling, with React examples for search inputs, scroll handlers, autosave and resize listeners.',
    answer:
      'Debouncing waits until activity stops before running your function — use it when only the final value matters, such as a search input or autosave. Throttling runs your function at most once per interval while activity continues — use it when you need regular updates during the activity, such as a scroll progress bar or a drag handler. Debounce answers "what did they settle on?"; throttle answers "where are they now?".',
    keywords: [
      'debounce vs throttle react',
      'react debounce hook',
      'throttle scroll react',
      'debounce search input',
      'lodash debounce react',
    ],
    datePublished: '2025-04-22',
    dateModified: '2026-01-20',
    related: ['react-hooks-cheat-sheet', 'custom-react-hooks-best-practices'],
    blocks: [
      {
        type: 'lead',
        text: 'Both techniques limit how often a function runs. They are not interchangeable, and picking the wrong one produces a UI that feels either laggy or broken.',
      },
      {
        type: 'table',
        head: ['', 'Debounce', 'Throttle'],
        rows: [
          ['Fires', 'Once, after activity stops', 'At a fixed rate, during activity'],
          ['During a burst', 'Nothing happens', 'Runs every N ms'],
          ['Question it answers', '"What did they settle on?"', '"Where are they right now?"'],
          ['Typing 10 characters fast', '1 call', '~3 calls at 100 ms'],
          ['Classic use', 'Search, autosave, validation', 'Scroll, resize, drag, mousemove'],
          ['Feels wrong when', 'Used for scroll — the UI freezes then jumps', 'Used for search — you fire needless requests'],
        ],
      },

      { type: 'h2', text: 'Debounce: wait for the pause' },
      {
        type: 'p',
        text: 'A debounced function resets its timer every time it is called. It only actually runs once the calls stop for the full delay. For a search box, that means one request when the user finishes typing rather than one per keystroke.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Search without the request storm',
        code: `import { useState } from 'react';
import { useDebounce } from '@danixsoft/hooks';

function ProductSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) return;
    search(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      value={query}                                  // instant feedback
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products…"
    />
  );
}`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'Pick the delay deliberately',
        text: '**150–250 ms** feels instant and still cuts most requests. **300–500 ms** is the sweet spot for network calls. Above **800 ms** the UI starts to feel unresponsive, because the average person pauses that long mid-word.',
      },
      {
        type: 'p',
        text: 'The same hook covers autosave, which is the other place debouncing shines — you want one write after the user stops typing, not one per character.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Autosave a draft',
        code: `const [draft, setDraft] = useState('');
const debouncedDraft = useDebounce(draft, 1000);

// Skips the initial render, so an empty draft is never written.
useUpdateEffect(() => {
  saveDraft(debouncedDraft);
}, [debouncedDraft]);`,
      },

      { type: 'h2', text: 'Throttle: a steady drip' },
      {
        type: 'p',
        text: 'A throttled function runs immediately, then refuses to run again until the interval has elapsed. Scroll events fire dozens of times a second; a throttled handler turns that into a manageable stream while still updating continuously.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Throttling with a ref timestamp',
        code: `import { useRef, useCallback } from 'react';
import { useEventListener } from '@danixsoft/hooks';

function useThrottledScroll(handler: (y: number) => void, ms = 100) {
  const lastRun = useRef(0);

  const onScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastRun.current < ms) return;
    lastRun.current = now;
    handler(window.scrollY);
  }, [handler, ms]);

  useEventListener('scroll', onScroll);
}`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Often you need neither',
        text: 'For scroll-triggered UI, `IntersectionObserver` beats a throttled scroll handler outright — the browser does the work off the main thread and tells you only when something actually crosses the viewport. Use [useOnScreen](/use-on-screen) or [useIntersectionObserver](/use-intersection-observer) instead of throttling.',
      },

      { type: 'h2', text: 'Why the naive React implementation breaks' },
      {
        type: 'p',
        text: 'The instinct is to wrap the handler in `lodash.debounce` inside the component. It does not work, and the reason is worth understanding.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Broken: a new debounced function every render',
        code: `function Broken() {
  const [query, setQuery] = useState('');

  // ✗ Recreated on every render, so the timer resets and never fires.
  const debouncedSearch = debounce((value) => search(value), 300);

  return <input onChange={(e) => debouncedSearch(e.target.value)} />;
}`,
      },
      {
        type: 'p',
        text: 'Each render produces a brand-new debounced function with a brand-new internal timer, so no call ever survives long enough to fire. Wrapping it in `useCallback` fixes the identity but introduces a stale closure — the memoised function captures the state from the render that created it.',
      },
      {
        type: 'p',
        text: 'Debouncing the **value** rather than the callback sidesteps both problems entirely. There is no function identity to preserve and no closure to go stale.',
      },
      {
        type: 'keyTakeaway',
        text: 'Debounce the value, not the callback. `const debounced = useDebounce(value, 300)` has no identity problem, no stale closure, and no cleanup to forget.',
      },

      { type: 'h2', text: 'Choosing, in one question' },
      {
        type: 'steps',
        items: [
          {
            name: 'Do you need updates while the activity is happening?',
            text: 'Yes → throttle. A progress bar, a follow-the-cursor tooltip and a drag preview all need continuous feedback.',
          },
          {
            name: 'Do you only care about the final value?',
            text: 'Yes → debounce. Search queries, autosave, form validation and resize-driven layout recalculation only need the settled value.',
          },
          {
            name: 'Is it about an element entering or leaving the viewport?',
            text: 'Then neither — use IntersectionObserver. It is more accurate and cheaper than any listener you can throttle.',
          },
        ],
      },
      {
        type: 'hooks',
        slugs: ['use-debounce', 'use-on-screen', 'use-event-listener', 'use-window-scroll'],
        title: 'Hooks referenced here',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Is there a useThrottle hook in @danixsoft/hooks?',
            answer:
              'Not currently. Most throttling needs in React are better served by IntersectionObserver (useOnScreen, useIntersectionObserver) or by a ref-based timestamp inside a useEventListener handler, as shown above. Debouncing a value covers the remaining cases.',
          },
          {
            question: 'What debounce delay should I use for a search input?',
            answer:
              'Start at 300 ms. Lower it toward 150 ms if your backend is fast and the result set is small; raise it toward 500 ms if each request is expensive. Above 800 ms the input begins to feel unresponsive.',
          },
          {
            question: 'Does useDebounce cancel the pending update on unmount?',
            answer:
              'Yes. It clears its timeout in the effect cleanup, so no state update is attempted after the component has unmounted.',
          },
          {
            question: 'Can I debounce and throttle the same value?',
            answer:
              'You can, but it usually signals that two different consumers want different things. Keep the raw value for the throttled consumer and derive a debounced copy for the other — they can coexist from one source of truth.',
          },
        ],
      },
    ],
  },

  {
    slug: 'react-localstorage-guide',
    section: '/guides',
    title: 'Using localStorage in React: The Complete Guide',
    heading: 'localStorage in React, done properly',
    description:
      'Persisting React state to localStorage without hydration errors, cross-tab desync, quota crashes or JSON parse failures — with a production-ready hook.',
    answer:
      'To use localStorage in React safely you need four things: a lazy useState initialiser so you read storage only once, a typeof window guard so server rendering does not crash, a try/catch around every read and write because storage can be disabled or full, and a storage event listener so other tabs stay in sync. useLocalStorage from @danixsoft/hooks handles all four.',
    keywords: [
      'react localstorage hook',
      'persist state react',
      'uselocalstorage',
      'react localstorage ssr',
      'sync localstorage across tabs',
    ],
    datePublished: '2025-05-19',
    dateModified: '2026-01-20',
    related: ['nextjs-ssr-safe-hooks', 'custom-react-hooks-best-practices'],
    blocks: [
      {
        type: 'lead',
        text: 'Persisting a preference sounds like a two-line job. The two-line version has four bugs in it, and every one of them shows up in production rather than on your machine.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'The version everyone writes first',
        code: `function useLocalStorage(key, initial) {
  // ✗ Reads storage on every render
  // ✗ Crashes during server rendering
  // ✗ Throws if the value is not valid JSON
  // ✗ Other tabs never find out about the change
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) ?? initial
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
      },

      { type: 'h2', text: 'Bug 1: reading storage on every render' },
      {
        type: 'p',
        text: '`useState(expensiveCall())` evaluates its argument on every single render, then throws the result away on all but the first. `localStorage.getItem` is a synchronous, blocking, main-thread call — doing it 60 times a second during an animation is measurable.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Lazy initialiser: runs exactly once',
        code: `const [value, setValue] = useState(() => {
  // Only called on the first render.
  return readFromStorage(key, initial);
});`,
      },

      { type: 'h2', text: 'Bug 2: the server has no localStorage' },
      {
        type: 'p',
        text: 'Under Next.js this crashes the build outright. The initialiser must return the fallback when there is no window, which also keeps the server HTML and the first client render in agreement.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const [value, setValue] = useState<T>(() => {
  if (typeof window === 'undefined') return initial;
  // …read storage
});`,
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'This deliberately means the first paint shows the default, not the stored value. If a flash is unacceptable — a theme, for instance — you need a blocking inline script as well; see [SSR-safe hooks in Next.js](/guides/nextjs-ssr-safe-hooks).',
      },

      { type: 'h2', text: 'Bug 3: storage throws more often than you think' },
      {
        type: 'p',
        text: 'Every access can raise. Safari in private browsing has historically thrown on write; browsers with cookies blocked can throw on read; the quota is finite and exceeding it throws; and any hand-edited or half-written value makes `JSON.parse` throw.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Never let persistence break the app',
        code: `const read = (key: string, fallback: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.warn(\`Could not read localStorage key "\${key}":\`, error);
    return fallback;
  }
};`,
      },
      {
        type: 'keyTakeaway',
        text: 'Persistence is an enhancement, never a requirement. If storage fails, the component must keep working with in-memory state — a failed write should cost the user their preference, not their session.',
      },

      { type: 'h2', text: 'Bug 4: two tabs, two truths' },
      {
        type: 'p',
        text: 'Open your app in two tabs, change the theme in one, and the other keeps the old value until it reloads. The browser fires a `storage` event for exactly this — but only in the _other_ tabs, never the one that made the change.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Cross-tab synchronisation',
        code: `useEffect(() => {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== key || event.newValue === null) return;
    try {
      setValue(JSON.parse(event.newValue));
    } catch {
      /* ignore a corrupt write from another tab */
    }
  };

  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}, [key]);`,
      },
      {
        type: 'p',
        text: 'For components inside the _same_ tab to stay in sync, the setter also dispatches a synthetic `StorageEvent` — otherwise two components using the same key would drift apart. `useLocalStorage` does this for you.',
      },

      { type: 'h2', text: 'The finished hook' },
      {
        type: 'code',
        lang: 'tsx',
        title: 'All four fixes, one import',
        code: `import { useLocalStorage } from '@danixsoft/hooks';

interface Preferences {
  theme: 'light' | 'dark';
  compact: boolean;
}

function Settings() {
  const [prefs, setPrefs] = useLocalStorage<Preferences>('prefs', {
    theme: 'dark',
    compact: false,
  });

  return (
    <label>
      <input
        type="checkbox"
        checked={prefs.compact}
        onChange={(e) => setPrefs({ ...prefs, compact: e.target.checked })}
      />
      Compact layout
    </label>
  );
}`,
      },

      { type: 'h2', text: 'Which storage should you actually use?' },
      {
        type: 'table',
        head: ['', 'localStorage', 'sessionStorage', 'Cookies'],
        rows: [
          ['Lifetime', 'Until explicitly cleared', 'Until the tab closes', 'Until the expiry you set'],
          ['Scope', 'All tabs on the origin', 'One tab', 'All tabs, and sent to the server'],
          ['Capacity', '~5–10 MB', '~5 MB', '~4 KB per cookie'],
          ['Server can read it', 'No', 'No', 'Yes, on every request'],
          ['Good for', 'Preferences, drafts, caches', 'Multi-step form state', 'Locale, consent, session ids'],
          ['Hook', '[useLocalStorage](/use-local-storage)', '[useSessionStorage](/use-session-storage)', '[useCookie](/use-cookie)'],
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Never store credentials',
        text: 'localStorage is readable by any JavaScript running on your origin, which includes anything injected through an XSS vulnerability. Access tokens belong in an httpOnly cookie the browser will not hand to scripts at all.',
      },

      { type: 'h2', text: 'What not to persist' },
      {
        type: 'list',
        items: [
          '**Auth tokens and API keys** — use httpOnly cookies.',
          '**Anything personal you have not disclosed** — persisted identifiers can bring the storage under GDPR and similar regimes.',
          '**Large data sets** — the quota is small and the API is synchronous; use IndexedDB past a megabyte or so.',
          '**Server-derived state** — a cached API response goes stale silently and is far more confusing than a refetch.',
        ],
      },
      {
        type: 'hooks',
        slugs: ['use-local-storage', 'use-session-storage', 'use-cookie', 'use-is-client'],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Why does my localStorage value flash the default on first paint?',
            answer:
              'Because the server rendered the default and the browser only reads storage after hydration. That is correct and necessary to avoid a hydration mismatch. If the flash is unacceptable for something as visible as a theme, add a blocking inline script in the document head to apply the stored value before the first paint.',
          },
          {
            question: 'How much can I store in localStorage?',
            answer:
              'Roughly 5 MB per origin in most browsers, though the exact quota varies and is shared with other storage. Exceeding it throws a QuotaExceededError, which is why every write should sit inside a try/catch.',
          },
          {
            question: 'Does useLocalStorage work in React Native?',
            answer:
              'No. React Native has no localStorage; use AsyncStorage or MMKV instead. The hook works in any browser environment, including React Native Web.',
          },
          {
            question: 'How do I clear a persisted value?',
            answer:
              'Set it back to the initial value, or call window.localStorage.removeItem(key) directly and update state. Removing the key means the next mount falls back to the initial value you passed.',
          },
        ],
      },
    ],
  },

  {
    slug: 'custom-react-hooks-best-practices',
    section: '/guides',
    title: 'Custom React Hooks: 12 Best Practices for Production Code',
    heading: 'Writing custom hooks that survive production',
    description:
      'Naming, return shapes, dependency arrays, cleanup, testing and TypeScript patterns for custom React hooks that other people have to maintain.',
    answer:
      'A good custom hook has a name starting with "use", returns either a tuple (for one or two values) or an object (for three or more), keeps every callback stable with useCallback or a ref, cleans up every subscription it creates, guards browser APIs for server rendering, and never accepts a config object it recreates internally. Extract a hook when the same stateful logic appears in a second component — not before.',
    keywords: [
      'custom react hooks best practices',
      'how to write a custom hook',
      'react hook naming convention',
      'reusable react logic',
      'testing custom hooks',
    ],
    datePublished: '2025-06-30',
    dateModified: '2026-01-20',
    related: ['react-hooks-cheat-sheet', 'fixing-stale-closures-in-react'],
    blocks: [
      {
        type: 'lead',
        text: 'A custom hook is just a function that calls other hooks. That simplicity is the point — and the reason a bad one spreads through a codebase before anyone notices.',
      },

      { type: 'h2', text: '1. Extract on the second use, not the first' },
      {
        type: 'p',
        text: 'Premature abstraction is worse than duplication. The first time you write the logic you do not yet know which parts vary. The second time you do, and the right shape becomes obvious.',
      },

      { type: 'h2', text: '2. Name it for what it gives you' },
      {
        type: 'p',
        text: 'The `use` prefix is not decorative — React\'s linter uses it to enforce the rules of hooks. Past that, name the hook after the value it returns rather than its implementation.',
      },
      {
        type: 'table',
        head: ['Prefer', 'Avoid', 'Why'],
        rows: [
          ['`useWindowSize`', '`useResizeHandler`', 'Names the value, not the mechanism'],
          ['`useIsOnline`', '`useNetworkEffect`', 'Reads like a boolean at the call site'],
          ['`useDebounce`', '`useDebouncedValueWithTimeout`', 'Shorter, and the timeout is an implementation detail'],
        ],
      },

      { type: 'h2', text: '3. Tuple for one or two values, object for three or more' },
      {
        type: 'p',
        text: 'A tuple lets the caller rename freely, which matters when a component uses the same hook twice. Past two elements, positional destructuring becomes a memory test.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// Two values — a tuple lets both instances be named naturally.
const [name, setName] = useLocalStorage('name', '');
const [city, setCity] = useLocalStorage('city', '');

// Five values — an object stays readable and lets callers take a subset.
const { count, increment, decrement, reset, setCount } = useCounter(0);`,
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'When you return a tuple from TypeScript, add `as const` or an explicit tuple type. Without it TypeScript widens the return to an array union and destructuring loses its types.',
      },

      { type: 'h2', text: '4. Keep returned functions referentially stable' },
      {
        type: 'p',
        text: 'A function whose identity changes every render will invalidate every `useMemo`, `useCallback` and `React.memo` downstream, and re-run any effect that depends on it.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Stable actions',
        code: `export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  // The updater form means these never need \`count\` as a dependency,
  // so their identity is stable for the life of the component.
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, increment, decrement, reset };
}`,
      },

      { type: 'h2', text: '5. Clean up everything you start' },
      {
        type: 'p',
        text: 'Timers, listeners, observers, subscriptions and in-flight requests all need a cleanup function. React Strict Mode deliberately mounts, unmounts and remounts components in development specifically to expose the ones you forgot.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `useEffect(() => {
  const observer = new ResizeObserver(handleResize);
  observer.observe(element);
  return () => observer.disconnect();   // ← not optional
}, [element]);`,
      },

      { type: 'h2', text: '6. Put the callback in a ref, not the dependency array' },
      {
        type: 'p',
        text: 'If your hook takes a callback, do not depend on it directly — callers pass inline arrow functions, which change identity every render and would re-subscribe your listener each time.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'The latest-ref pattern',
        code: `export function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback);

  // Keep the ref current without disturbing the interval.
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;                    // null pauses the timer
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);                                     // only the delay restarts it
}`,
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'This is the single most important pattern in custom hooks. It gets its own page: [fixing stale closures in React](/guides/fixing-stale-closures-in-react).',
      },

      { type: 'h2', text: '7. Accept primitives, not object literals' },
      {
        type: 'p',
        text: 'An options object passed inline is a new reference every render. If your hook depends on it, the effect never stops re-running.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// ✗ New object every render → effect runs forever.
useIntersectionObserver(ref, { threshold: 0.5 });

// ✓ Destructure to primitives inside the hook and depend on those.
export function useIntersectionObserver(ref, { threshold = 0, rootMargin = '0px' } = {}) {
  useEffect(() => {
    /* … */
  }, [ref, threshold, rootMargin]);
}`,
      },

      { type: 'h2', text: '8. Make it work on the server' },
      {
        type: 'p',
        text: 'Even if you are not server rendering today, someone will move the app to Next.js eventually. Guard browser globals in the state initialiser and do the real read in an effect.',
      },

      { type: 'h2', text: '9. Type the generics, not the call sites' },
      {
        type: 'p',
        text: 'A well-typed hook means callers never write a type annotation. Infer from the arguments wherever you can.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(/* … */);
  const set = useCallback((v: T | ((prev: T) => T)) => { /* … */ }, [key]);
  return [value, set] as const;         // as const preserves the tuple
}

// Inferred as string — no annotation needed at the call site.
const [name, setName] = useLocalStorage('name', 'Ada');`,
      },

      { type: 'h2', text: '10. Return loading and error, not just data' },
      {
        type: 'p',
        text: 'Any hook that does asynchronous work has at least three states. Returning only the happy path pushes the other two back onto every caller.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const { data, loading, error } = useFetch<User[]>('/api/users');

if (loading) return <Skeleton />;
if (error) return <ErrorState error={error} />;
return <UserList users={data} />;`,
      },

      { type: 'h2', text: '11. Test the hook, not a component wrapping it' },
      {
        type: 'p',
        text: '`renderHook` from React Testing Library runs a hook in isolation, which keeps the test about behaviour rather than markup.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'counter.test.ts',
        code: `import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@danixsoft/hooks';

it('clamps at the configured maximum', () => {
  const { result } = renderHook(() => useCounter(0, { max: 2 }));

  act(() => {
    result.current.increment();
    result.current.increment();
    result.current.increment();   // should be refused
  });

  expect(result.current.count).toBe(2);
});`,
      },

      { type: 'h2', text: '12. Do one thing' },
      {
        type: 'p',
        text: 'A hook that fetches, caches, paginates and manages a modal is four hooks. Small hooks compose; large ones get copied and diverge.',
      },
      {
        type: 'keyTakeaway',
        text: 'If you cannot describe what a hook returns in a single sentence, it is doing too much. Split it until you can.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Can a custom hook call another custom hook?',
            answer:
              'Yes, and it is encouraged. Composition is how hooks stay small. The only constraint is the rules of hooks: every call must be at the top level of the function, never inside a condition or loop.',
          },
          {
            question: 'Should every custom hook live in its own file?',
            answer:
              'Yes, in a hooks directory, named after the hook. It makes them discoverable, keeps imports honest about what a module depends on, and lets bundlers tree-shake properly.',
          },
          {
            question: 'When should I use useReducer inside a custom hook?',
            answer:
              'When several pieces of state change together in response to the same events. A fetch hook tracking data, loading and error is a good example — a reducer makes the invalid combinations unrepresentable.',
          },
          {
            question: 'Do custom hooks share state between components?',
            answer:
              'No. Each component that calls a hook gets its own independent state. To share state you need context, an external store, or a browser-level store like localStorage — which is exactly how useLocalStorage manages to stay in sync across components.',
          },
        ],
      },
    ],
  },

  {
    slug: 'fixing-stale-closures-in-react',
    section: '/guides',
    title: 'Fixing Stale Closures in React Hooks',
    heading: 'Stale closures, and how to stop them',
    description:
      'Why your setInterval logs the same number forever, why your event handler sees old state, and the three patterns that fix it permanently.',
    answer:
      'A stale closure happens when a function captures state from the render in which it was created and keeps using that snapshot after the state has changed. It shows up most often in setInterval, setTimeout and event listeners registered once with an empty dependency array. The three fixes are: use the functional updater form of setState, add the value to the dependency array so the effect re-subscribes, or store the callback in a ref and always invoke the latest version.',
    keywords: [
      'react stale closure',
      'setInterval react wrong value',
      'useEffect stale state',
      'useCallback stale closure',
      'react hook captures old state',
    ],
    datePublished: '2025-08-12',
    dateModified: '2026-01-20',
    related: ['custom-react-hooks-best-practices', 'react-hooks-cheat-sheet'],
    blocks: [
      {
        type: 'lead',
        text: 'It is the bug that makes people distrust hooks. The code looks right, React reports no error, and the number on screen simply refuses to move.',
      },

      { type: 'h2', text: 'The classic reproduction' },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Counts to 1, then stops',
        code: `function BrokenCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);   // \`count\` is 0 in this closure — forever
    }, 1000);
    return () => clearInterval(id);
  }, []);                    // runs once, captures the first render

  return <p>{count}</p>;
}`,
      },
      {
        type: 'p',
        text: 'The effect runs once, on mount. At that moment `count` is `0`, and the arrow function passed to `setInterval` closes over that binding. Every tick computes `0 + 1`. The state does update to `1`, which re-renders — but the interval is still holding the function from the very first render.',
      },
      {
        type: 'keyTakeaway',
        text: 'Each render creates a new set of variables. A function created during a render sees that render\'s values permanently. Nothing "updates" a closure after the fact.',
      },

      { type: 'h2', text: 'Fix 1: the functional updater' },
      {
        type: 'p',
        text: 'When the new state derives from the old, pass a function to the setter. React hands it the current value, so the closure never needs to know it.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `useEffect(() => {
  const id = setInterval(() => {
    setCount((current) => current + 1);   // ✓ always the latest
  }, 1000);
  return () => clearInterval(id);
}, []);`,
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'This is the best fix when it applies. It also removes `count` from the dependency array legitimately, so the interval is created once instead of being torn down and rebuilt every second.',
      },

      { type: 'h2', text: 'Fix 2: declare the dependency honestly' },
      {
        type: 'p',
        text: 'If the effect really does need the value — not just to update it — put it in the dependency array and let the effect re-run.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `useEffect(() => {
  const id = setInterval(() => {
    console.log('current query:', query);
  }, 1000);
  return () => clearInterval(id);
}, [query]);   // ✓ new closure whenever query changes`,
      },
      {
        type: 'callout',
        tone: 'warn',
        text: 'This tears down and recreates the interval on every change. For a logging effect that is fine; for an interval that must keep a steady cadence, or a WebSocket you do not want to reconnect, it is not — use fix 3.',
      },

      { type: 'h2', text: 'Fix 3: the latest-ref pattern' },
      {
        type: 'p',
        text: 'A ref is a mutable box shared by every render. Write the newest callback into it on each render, and have the long-lived subscription read from the box at call time.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Fresh values, stable subscription',
        code: `function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback);

  useEffect(() => {
    saved.current = callback;      // every render refreshes the box
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);                     // the interval itself is untouched
}`,
      },
      {
        type: 'p',
        text: 'The interval is created once and never restarted, yet each tick calls the newest callback with the newest state. This is what [useInterval](/use-interval), [useTimeout](/use-timeout), [useEventListener](/use-event-listener) and [useEvent](/use-event) in this library all do internally.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Using the hook version',
        code: `import { useInterval } from '@danixsoft/hooks';

function Counter() {
  const [count, setCount] = useState(0);

  // No dependency array to get wrong, no cleanup to forget.
  useInterval(() => setCount(count + 1), 1000);

  return <p>{count}</p>;   // ✓ counts up correctly
}`,
      },

      { type: 'h2', text: 'Where else it bites' },
      {
        type: 'table',
        head: ['Situation', 'Symptom', 'Fix'],
        rows: [
          ['`setInterval` / `setTimeout` in an effect', 'Value frozen at its initial state', 'Updater form, or latest-ref'],
          ['`addEventListener` with `[]` deps', 'Handler reads old props', 'Latest-ref (`useEventListener`)'],
          ['`useCallback` with missing deps', 'Memoised function sends stale data', 'Add the dep, or use `useEvent`'],
          ['A promise `.then` after an await', 'Writes state the user already changed', 'Guard with `useIsMounted`'],
          ['WebSocket / subscription callbacks', 'Messages handled against stale state', 'Latest-ref'],
        ],
      },

      { type: 'h2', text: 'Catching it before it ships' },
      {
        type: 'list',
        items: [
          'Enable `react-hooks/exhaustive-deps` and treat it as an error, not a warning. It catches the overwhelming majority of these.',
          'When you deliberately omit a dependency, leave a comment explaining why — an unexplained disable is where the next bug hides.',
          'Prefer the functional updater form for any state derived from previous state, as a habit rather than a fix.',
          'Reach for a hook that already solves it. `useInterval`, `useTimeout`, `useEventListener` and `useEvent` exist precisely so this pattern is written once.',
        ],
      },
      {
        type: 'hooks',
        slugs: ['use-interval', 'use-event', 'use-event-listener', 'use-is-mounted'],
        title: 'Hooks that handle this for you',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Is a stale closure a React bug?',
            answer:
              'No, it is standard JavaScript closure behaviour. A function captures the variables in scope when it is created. React renders create a new scope each time, so a function that outlives its render keeps looking at the old one.',
          },
          {
            question: 'Why does adding the value to the dependency array work?',
            answer:
              'Because the effect then re-runs whenever the value changes, creating a new closure over the new value — and cleaning up the old subscription first. The trade-off is that the subscription is torn down and rebuilt each time.',
          },
          {
            question: 'When should I use a ref instead of a dependency?',
            answer:
              'When the subscription is expensive or must not be interrupted — an interval that needs a steady cadence, a WebSocket, an IntersectionObserver — but the callback still needs current state. That is exactly what the latest-ref pattern is for.',
          },
          {
            question: 'Does useEvent solve this everywhere?',
            answer:
              'It solves it for callbacks: you get a stable function identity that always reads current state. It does not help with values you read directly inside an effect body — for those you still need the dependency array or the updater form.',
          },
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) =>
  guides.find((guide) => guide.slug === slug);
