export interface FaqGroup {
  title: string;
  items: { question: string; answer: string }[];
}

/**
 * The FAQ is the highest-leverage page for answer engines: every entry is a
 * self-contained question and answer, which is exactly the unit an LLM or a
 * featured snippet extracts. Keep answers complete enough to stand alone.
 */
export const faqGroups: FaqGroup[] = [
  {
    title: 'Getting started',
    items: [
      {
        question: 'What is @danixsoft/hooks?',
        answer:
          '@danixsoft/hooks is an open-source React hooks library containing 44 production-ready hooks for state, storage, forms, data fetching, the DOM, timers and device sensors. It has no runtime dependencies, is written in TypeScript, is safe to render on a server, and is released under the MIT licence.',
      },
      {
        question: 'How do I install it?',
        answer:
          'Run npm install @danixsoft/hooks (or pnpm add, yarn add, or bun add). There are no peer dependencies beyond React 18 or later, and no additional @types package to install — the type declarations ship with the library.',
      },
      {
        question: 'How do I import a hook?',
        answer:
          "Every hook is a named export from the package root, for example: import { useLocalStorage } from '@danixsoft/hooks'. There is no deep-import path to remember; the package is tree-shakeable, so importing from the root is already optimal for bundle size.",
      },
      {
        question: 'Do I need to configure anything after installing?',
        answer:
          'No. There is no provider to mount, no context to set up and no build configuration to change. Import a hook and call it.',
      },
    ],
  },
  {
    title: 'Compatibility',
    items: [
      {
        question: 'Which versions of React are supported?',
        answer:
          'React 18 and above, including React 19. React is declared as a peer dependency, so your application controls which version is installed and there is no risk of two copies of React ending up in the bundle.',
      },
      {
        question: 'Does it work with Next.js?',
        answer:
          'Yes, with both the App Router and the Pages Router. In the App Router, hooks must be called from Client Components, so add the "use client" directive to any file that uses one — the same requirement React places on useState. Every hook is written to render safely during the server pre-render pass.',
      },
      {
        question: 'Does it work with Vite, Remix, Astro or Gatsby?',
        answer:
          'Yes. The package is framework-agnostic and ships both ES module and CommonJS builds. Anywhere React runs in a browser environment, these hooks run.',
      },
      {
        question: 'Does it work with React Native?',
        answer:
          'Partially. Hooks that use only React primitives — useCounter, useToggle, usePrevious, useInterval, useDebounce and similar — work fine. Hooks that read browser APIs such as localStorage, matchMedia or the Geolocation API do not, because those APIs do not exist in React Native. React Native Web is fully supported.',
      },
      {
        question: 'Does it work with React Server Components?',
        answer:
          'Hooks by definition require client-side state, so they run in Client Components. Server Components cannot use any hook, including React\'s own useState. Mark the component that calls a hook with "use client" and keep that boundary as far down the tree as you can.',
      },
    ],
  },
  {
    title: 'Bundle size and performance',
    items: [
      {
        question: 'How much will this add to my bundle?',
        answer:
          'Only the hooks you import. The package is published as ES modules and marked sideEffects: false, so bundlers drop everything you do not use. A typical hook is well under a kilobyte gzipped, which makes the size of the full package irrelevant to your build.',
      },
      {
        question: 'Do I need to use deep imports for tree shaking to work?',
        answer:
          'No. Importing from the package root already tree-shakes correctly with webpack, Vite, Rollup, esbuild and Turbopack. Deep import paths are not supported and are not needed.',
      },
      {
        question: 'Are the hooks optimised for re-renders?',
        answer:
          'Yes. Returned callbacks are wrapped in useCallback or backed by refs so their identity is stable across renders, which means they will not invalidate React.memo, useMemo or effect dependency arrays downstream.',
      },
    ],
  },
  {
    title: 'Server-side rendering',
    items: [
      {
        question: 'Will these hooks cause hydration mismatches?',
        answer:
          'No. Every hook that reads a browser API returns a server-safe value during the initial render and only reads the real value in an effect, which runs exclusively in the browser. That is what guarantees the server HTML and the first client render agree.',
      },
      {
        question: 'Why does useWindowSize return undefined at first?',
        answer:
          'Because the server has no window and cannot know the viewport size. Returning undefined until after hydration is what prevents a mismatch. Render a placeholder of the final dimensions while the value is undefined so the swap does not shift your layout.',
      },
      {
        question: 'Why does my persisted theme flash the default on load?',
        answer:
          'Because localStorage is only readable after hydration, so the server necessarily renders the default. For a theme, where the flash is very visible, add a small blocking script in the document head that applies the stored value before the first paint. The full technique is documented in our Next.js SSR guide.',
      },
      {
        question: 'Do I still get the "useLayoutEffect does nothing on the server" warning?',
        answer:
          'Not from this library. Hooks that need synchronous measurement use useIsomorphicLayoutEffect, which resolves to useLayoutEffect in the browser and useEffect on the server.',
      },
    ],
  },
  {
    title: 'Licensing and support',
    items: [
      {
        question: 'Is it free for commercial use?',
        answer:
          'Yes. The library is released under the MIT licence, which permits commercial use, modification, distribution and private use. There is no paid tier, no usage limit and no attribution requirement beyond retaining the licence notice.',
      },
      {
        question: 'Can I copy a hook into my own codebase instead of installing?',
        answer:
          'Yes — the MIT licence allows it. The source is on GitHub and each hook is a single self-contained file. If you only need one or two hooks and want no dependency at all, vendoring them is a perfectly reasonable choice.',
      },
      {
        question: 'How do I report a bug or request a hook?',
        answer:
          'Open an issue on the GitHub repository. Bug reports are most useful with a minimal reproduction; hook requests are most useful with a description of the problem you are solving rather than a proposed API.',
      },
      {
        question: 'Is the library actively maintained?',
        answer:
          'Yes. Check the repository\'s commit and release history for the current cadence — that is a more reliable signal than any claim on a documentation page.',
      },
      {
        question: 'Can I contribute?',
        answer:
          'Yes. The repository accepts pull requests. New hooks should be dependency-free, SSR-safe, fully typed and covered by tests, matching the conventions of the existing hooks.',
      },
    ],
  },
  {
    title: 'Using it with AI assistants',
    items: [
      {
        question: 'Does the library work well with AI coding assistants?',
        answer:
          'Yes. The site publishes llms.txt and llms-full.txt, machine-readable summaries containing every hook name, signature and description. Pointing Claude, ChatGPT, Copilot or Cursor at those files means generated code uses the real API rather than invented signatures.',
      },
      {
        question: 'Where are the llms.txt files?',
        answer:
          'At react-hooks.danixsoft.com/llms.txt for the concise version and react-hooks.danixsoft.com/llms-full.txt for the complete reference including descriptions and examples. Both are plain text and are regenerated from the source on every release.',
      },
      {
        question: 'How do I get an assistant to use the correct API?',
        answer:
          'Paste the llms.txt URL into the conversation, or add it to your project rules file (CLAUDE.md, .cursorrules, or the equivalent). The signatures are generated from the TypeScript source, so they are accurate for the current release.',
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((group) => group.items);
