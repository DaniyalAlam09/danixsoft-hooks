import type { Block } from '@/lib/article';

/** The getting-started page. Heading text drives both the anchors and the TOC. */
export const docsBlocks: Block[] = [
  {
    type: 'lead',
    text: '@danixsoft/hooks is a collection of 44 React hooks with no runtime dependencies, written in TypeScript and safe to render on a server. This page takes you from an empty project to a working hook in about two minutes.',
  },

  { type: 'h2', text: 'Requirements' },
  {
    type: 'list',
    items: [
      '**React 18 or later**, including React 19. React is a peer dependency, so your app controls the version.',
      '**Node 18 or later** for the build tooling. The hooks themselves run in the browser and have no Node requirement.',
      '**TypeScript 5 or later** if you use TypeScript. Types ship with the package — there is no separate `@types` install.',
    ],
  },

  { type: 'h2', text: 'Installation' },
  {
    type: 'code',
    lang: 'bash',
    code: `npm install @danixsoft/hooks
# or: pnpm add @danixsoft/hooks
# or: yarn add @danixsoft/hooks
# or: bun add @danixsoft/hooks`,
  },
  {
    type: 'p',
    text: 'That is the whole install. The package has no runtime dependencies, so nothing else enters your lockfile.',
  },

  { type: 'h2', text: 'Quick start' },
  {
    type: 'p',
    text: 'Every hook is a named export from the package root. Import what you need and call it like any other hook.',
  },
  {
    type: 'code',
    lang: 'tsx',
    title: 'components/theme-toggle.tsx',
    code: `import { useLocalStorage } from '@danixsoft/hooks';

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}`,
  },
  {
    type: 'callout',
    tone: 'tip',
    title: 'Next.js App Router',
    text: 'Hooks only run in Client Components. Add `"use client"` at the top of any file that calls one — the same rule React applies to `useState`. Keep that directive as far down the tree as possible so less of your app has to hydrate.',
  },
  {
    type: 'p',
    text: 'A slightly larger example, combining three hooks to build a debounced, responsive search box with persisted history:',
  },
  {
    type: 'code',
    lang: 'tsx',
    title: 'components/search.tsx',
    code: `'use client';

import { useState } from 'react';
import { useDebounce, useLocalStorage, useMediaQuery } from '@danixsoft/hooks';

export function Search() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useLocalStorage<string[]>('search-history', []);

  const debouncedQuery = useDebounce(query, 300);       // one request per pause
  const isMobile = useMediaQuery('(max-width: 768px)'); // SSR-safe breakpoint

  return (
    <input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder={isMobile ? 'Search' : 'Search everything…'}
    />
  );
}`,
  },
  {
    type: 'hooks',
    slugs: ['use-local-storage', 'use-debounce', 'use-media-query', 'use-toggle'],
    title: 'Good hooks to start with',
  },

  { type: 'h2', text: 'TypeScript' },
  {
    type: 'p',
    text: 'The package is written in TypeScript and ships its own declarations. In most cases you never write a type annotation — the generics infer from the arguments you pass.',
  },
  {
    type: 'code',
    lang: 'tsx',
    code: `// Inferred as string, because the initial value is a string.
const [name, setName] = useLocalStorage('name', 'Ada');

// Inferred as Preferences, because the initial value is a Preferences.
const [prefs, setPrefs] = useLocalStorage('prefs', { compact: false });

// Annotate explicitly when the type is wider than the initial value.
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');`,
  },
  {
    type: 'callout',
    tone: 'info',
    text: 'The third case is the one worth remembering: without the annotation, TypeScript infers the literal type `"dark"` and rejects `setTheme("light")`. Widening the generic is the fix.',
  },

  { type: 'h2', text: 'Server-side rendering' },
  {
    type: 'p',
    text: 'Every hook that reads a browser API guards it and returns a stable value during server rendering. That means no `window is not defined` crash during the build, and no hydration mismatch on the client.',
  },
  {
    type: 'p',
    text: 'The consequence worth knowing: browser-derived values are only correct after hydration. `useWindowSize` returns `undefined` on the server, `useMediaQuery` returns `false`, and `useLocalStorage` returns the initial value until the effect runs. This is deliberate — it is what keeps the first render identical on both sides.',
  },
  {
    type: 'code',
    lang: 'tsx',
    title: 'Reserve the space, then fill it',
    code: `import { useIsClient } from '@danixsoft/hooks';

function ViewportBadge() {
  const isClient = useIsClient();

  // Same dimensions before and after, so nothing shifts (and CLS stays at 0).
  if (!isClient) return <span className="inline-block h-6 w-24" />;

  return <span>{window.innerWidth}px</span>;
}`,
  },
  {
    type: 'callout',
    tone: 'warn',
    title: 'When a flash is unacceptable',
    text: 'For something as visible as a theme, showing the default first is not good enough. You need a blocking inline script in the document head — the full technique is in [SSR-safe hooks in Next.js](/guides/nextjs-ssr-safe-hooks).',
  },

  { type: 'h2', text: 'Tree shaking' },
  {
    type: 'p',
    text: 'The package is published as ES modules and marked `sideEffects: false`, so any modern bundler — webpack, Vite, Rollup, esbuild, Turbopack — drops the hooks you do not import.',
  },
  {
    type: 'code',
    lang: 'tsx',
    code: `// Only useDebounce reaches your bundle. The other 43 hooks are dropped.
import { useDebounce } from '@danixsoft/hooks';`,
  },
  {
    type: 'p',
    text: 'There is no deep-import path to remember and no `/dist/useDebounce` convention — importing from the package root is already optimal.',
  },

  { type: 'h2', text: 'Testing' },
  {
    type: 'p',
    text: 'The hooks are ordinary functions, so `renderHook` from React Testing Library tests them directly. Nothing has to be mocked to use the library itself.',
  },
  {
    type: 'code',
    lang: 'tsx',
    title: 'counter.test.ts',
    code: `import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@danixsoft/hooks';

it('respects the configured maximum', () => {
  const { result } = renderHook(() => useCounter(0, { max: 2 }));

  act(() => {
    result.current.increment();
    result.current.increment();
    result.current.increment();  // refused
  });

  expect(result.current.count).toBe(2);
});`,
  },
  {
    type: 'callout',
    tone: 'info',
    text: 'Hooks that read browser APIs need a DOM environment. Set `environment: "jsdom"` in Vitest, or `testEnvironment: "jsdom"` in Jest.',
  },

  { type: 'h2', text: 'Where to go next' },
  {
    type: 'list',
    items: [
      '[Browse all 44 hooks](/hooks) — the full catalogue with a live demo on every page.',
      '[The React hooks cheat sheet](/guides/react-hooks-cheat-sheet) — built-in and custom hooks in one reference.',
      '[SSR-safe hooks in Next.js](/guides/nextjs-ssr-safe-hooks) — the hydration rules in depth.',
      '[API reference](/api-reference) — generated directly from the source types.',
      '[FAQ](/faq) — licensing, compatibility and support questions.',
    ],
  },
];
