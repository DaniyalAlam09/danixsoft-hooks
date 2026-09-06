import type { Article } from '@/lib/article';

/**
 * Comparison pages.
 *
 * These target high-intent "X vs Y" searches. Claims about other libraries are
 * kept to characteristics that are stable and publicly documented — API shape,
 * dependency posture, licence, maintenance model — rather than exact hook
 * counts or bundle sizes, which move between releases. Every page tells the
 * reader when the alternative is the better choice; a comparison nobody trusts
 * is worth nothing.
 */
export const comparisons: Article[] = [
  {
    slug: 'usehooks-ts',
    section: '/compare',
    title: '@danixsoft/hooks vs usehooks-ts: An Honest Comparison',
    heading: '@danixsoft/hooks vs usehooks-ts',
    description:
      'Both are small, TypeScript-first, zero-dependency React hook libraries. Here is where they genuinely differ and how to choose between them.',
    answer:
      'usehooks-ts and @danixsoft/hooks solve the same problem in a very similar way: both are TypeScript-first, tree-shakeable, zero-runtime-dependency collections of small React hooks under the MIT licence. usehooks-ts is the older and more widely adopted of the two. @danixsoft/hooks covers a wider surface in a few areas — forms, pagination, audio, gestures — and ships an llms.txt so AI coding assistants can read its full API. If you already use usehooks-ts and it covers your needs, there is no compelling reason to migrate.',
    keywords: [
      'usehooks-ts alternative',
      'danixsoft hooks vs usehooks-ts',
      'best react hooks library',
      'typescript react hooks library',
    ],
    datePublished: '2025-09-08',
    dateModified: '2026-01-20',
    related: ['react-use', 'ahooks'],
    blocks: [
      {
        type: 'lead',
        text: 'These two libraries are more alike than different, and any comparison that pretends otherwise is selling something. Both are small, both are typed, both have no runtime dependencies, both are MIT. What follows is where the daylight actually is.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'How to read this page',
        text: 'Hook counts and bundle sizes change with every release, so this page compares design decisions rather than numbers. For current figures, check [npm](https://www.npmjs.com/package/@danixsoft/hooks) and [Bundlephobia](https://bundlephobia.com) for both packages.',
      },

      { type: 'h2', text: 'What the two libraries share' },
      {
        type: 'list',
        items: [
          '**TypeScript from source**, not bolted-on `@types` packages, so generics infer at the call site.',
          '**Zero runtime dependencies** — nothing enters your lockfile but the package itself.',
          '**Tree-shakeable ES modules** with `sideEffects: false`, so unused hooks are dropped by the bundler.',
          '**SSR-safe implementations** that guard browser globals and work under Next.js and Remix.',
          '**The MIT licence**, free for commercial use.',
          '**A near-identical core API** — `useLocalStorage`, `useDebounce`, `useMediaQuery`, `useClickOutside` and friends behave the same way in both.',
        ],
      },
      {
        type: 'keyTakeaway',
        text: 'For the common hooks, the two libraries are close to interchangeable. Choose on coverage of the hooks you actually need, not on a feature matrix.',
      },

      { type: 'h2', text: 'Where they differ' },
      {
        type: 'table',
        head: ['', '@danixsoft/hooks', 'usehooks-ts'],
        rows: [
          ['Maturity', 'Newer, smaller community', 'Established, widely adopted, large download volume'],
          ['Form state', '[useForm](/use-form) with validation, touched fields and submit handling', 'Not included — pair with React Hook Form or Formik'],
          ['Pagination', '[usePagination](/use-pagination) and [useStep](/use-step)', 'Not included'],
          ['Gestures', '[useSwipe](/use-swipe), [useTouch](/use-touch), [useMouse](/use-mouse)', 'Not included'],
          ['Media', '[useAudio](/use-audio)', 'Not included'],
          ['Data fetching', '[useFetch](/use-fetch) with abort on unmount', 'Not included — pair with TanStack Query or SWR'],
          ['AI assistant support', 'Ships `llms.txt` and `llms-full.txt`', 'Standard docs site'],
          ['Documentation', 'Live interactive demo on every hook page', 'Documentation site with examples'],
        ],
      },

      { type: 'h2', text: 'When usehooks-ts is the better choice' },
      {
        type: 'p',
        text: 'Being honest about this is the point of the page.',
      },
      {
        type: 'list',
        items: [
          '**You already use it and it works.** Migration cost is real; novelty is not a reason.',
          '**Your organisation weights adoption heavily.** More downloads means more people have already hit the edge cases, and more StackOverflow answers exist.',
          '**You only need the core hooks.** If `useLocalStorage`, `useDebounce` and `useMediaQuery` cover you, the extra surface here buys you nothing.',
          '**You prefer specialised libraries for the bigger jobs.** React Hook Form and TanStack Query are more capable than any general hook collection\'s form and fetch hooks, including ours.',
        ],
      },

      { type: 'h2', text: 'When @danixsoft/hooks fits better' },
      {
        type: 'list',
        items: [
          '**You want fewer packages.** Basic forms, pagination and fetching are included, so a small app can stop at one dependency.',
          '**You are building touch-first UI.** Swipe, touch and pointer hooks are here rather than in a separate gesture library.',
          '**Your team leans on AI coding assistants.** The published `llms.txt` gives Claude, ChatGPT, Copilot and Cursor the full API surface, so generated code uses real signatures instead of invented ones.',
          '**You want to try before installing.** Every hook page runs a live demo of the published package.',
        ],
      },

      { type: 'h2', text: 'Migrating, if you decide to' },
      {
        type: 'p',
        text: 'The overlapping hooks share names and, for the most part, signatures — so the majority of a migration is changing the import specifier.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'Most call sites need only this',
        code: `- import { useLocalStorage, useDebounce } from 'usehooks-ts';
+ import { useLocalStorage, useDebounce } from '@danixsoft/hooks';`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Verify return shapes as you go',
        text: 'Names match; exact return shapes are not guaranteed to. Check each hook\'s [type signature](/hooks) against your call sites, and let TypeScript find the rest — a type error at build time is exactly the outcome you want here.',
      },
      {
        type: 'p',
        text: 'Running both side by side during a migration is fine. Both are tree-shakeable, so the bundler only includes what each import actually pulls in.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Is @danixsoft/hooks a fork of usehooks-ts?',
            answer:
              'No. It is an independent implementation. Several hook names are shared because those names are effectively community conventions — useLocalStorage and useDebounce mean the same thing across every React hook library.',
          },
          {
            question: 'Can I use both libraries in the same project?',
            answer:
              'Yes. Both are tree-shakeable with no runtime dependencies, so the only cost is the hooks you actually import. This is a practical way to migrate gradually rather than in one commit.',
          },
          {
            question: 'Which library is smaller?',
            answer:
              'Neither, in any way that matters. Both are tree-shakeable, so your bundle contains only the hooks you import — typically well under a kilobyte gzipped each. The size of the full package is irrelevant unless you import everything.',
          },
          {
            question: 'Which one should a new project pick?',
            answer:
              'Look at the hooks you know you need. If forms, pagination or gestures are on the list, @danixsoft/hooks covers them in one package. If you only need the common utilities, either library will serve you well and usehooks-ts has the larger community behind it.',
          },
        ],
      },
    ],
  },

  {
    slug: 'react-use',
    section: '/compare',
    title: '@danixsoft/hooks vs react-use: Breadth or Focus',
    heading: '@danixsoft/hooks vs react-use',
    description:
      'react-use is the largest React hooks collection ever published. Here is when that breadth helps you and when a smaller, typed, dependency-free library is the better call.',
    answer:
      'react-use is the broadest React hooks library available, with hundreds of hooks covering almost every conceivable case, but it carries runtime dependencies and its maintenance cadence has slowed considerably. @danixsoft/hooks is deliberately much smaller — 44 hooks that cover the common cases — with zero runtime dependencies and TypeScript written from source. Choose react-use when you need an unusual hook that nothing else provides; choose @danixsoft/hooks when you want a lean, actively maintained core.',
    keywords: [
      'react-use alternative',
      'react-use vs',
      'lightweight react hooks library',
      'react hooks library comparison',
    ],
    datePublished: '2025-10-14',
    dateModified: '2026-01-20',
    related: ['usehooks-ts', 'mantine-hooks'],
    blocks: [
      {
        type: 'lead',
        text: 'react-use was the library that proved custom hooks could be packaged. Its catalogue is still unmatched in size. The trade-offs that come with that size are the whole story here.',
      },

      { type: 'h2', text: 'The core trade-off' },
      {
        type: 'table',
        head: ['', '@danixsoft/hooks', 'react-use'],
        rows: [
          ['Philosophy', 'A curated core of common cases', 'Comprehensive coverage of everything'],
          ['Hook count', '44', 'Several hundred'],
          ['Runtime dependencies', 'None', 'Several, pulled in transitively'],
          ['TypeScript', 'Written in TypeScript from source', 'Types included, with some looser signatures'],
          ['Maintenance', 'Actively maintained', 'Maintenance cadence has slowed'],
          ['Learning curve', 'Small enough to read in an afternoon', 'Large — discovery itself takes effort'],
          ['Licence', 'MIT', 'Unlicense'],
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'Before choosing either, check the current state of both projects — recent releases, open issues, and the dependency tree on [npm](https://www.npmjs.com/package/react-use). Library health changes, and a comparison page is a snapshot, not a live feed.',
      },

      { type: 'h2', text: 'The dependency question' },
      {
        type: 'p',
        text: 'This is the most concrete difference. react-use ships with runtime dependencies, which means installing it adds transitive packages to your lockfile. Each one is a version to track, an audit surface, and a potential supply-chain consideration.',
      },
      {
        type: 'p',
        text: '@danixsoft/hooks has no runtime dependencies at all. Every hook is built from React primitives and standard browser APIs, so installing it adds exactly one entry to your lockfile.',
      },
      {
        type: 'code',
        lang: 'bash',
        title: 'What you actually install',
        code: `# @danixsoft/hooks — one package, no transitive deps
npm install @danixsoft/hooks

# Check for yourself before you commit either way:
npm info @danixsoft/hooks dependencies
npm info react-use dependencies`,
      },
      {
        type: 'keyTakeaway',
        text: 'In a small app the dependency count is a footnote. In a regulated environment, or any codebase where every transitive package gets reviewed, it is often the deciding factor.',
      },

      { type: 'h2', text: 'When react-use is genuinely the right answer' },
      {
        type: 'list',
        items: [
          '**You need a hook nothing else has.** react-use covers territory — battery status, media devices, complex async state machines, browser permissions — that smaller libraries simply do not.',
          '**You already depend on it and it works.** A working integration is worth more than a tidier dependency tree.',
          '**You want one place to look first.** Breadth has real value when you would otherwise be evaluating five packages.',
        ],
      },

      { type: 'h2', text: 'When the smaller library wins' },
      {
        type: 'list',
        items: [
          '**Your dependency tree is audited.** Zero runtime dependencies is a materially easier conversation with a security team.',
          '**You want strict, inferring types.** Hooks written in TypeScript from the start tend to infer better than hooks typed after the fact.',
          '**You value a readable surface.** 44 hooks fit in your head; several hundred do not, and hooks nobody knows about get reimplemented anyway.',
          '**Active maintenance matters to you.** React changes — Strict Mode, concurrent rendering, Server Components have all moved the ground under hook libraries.',
        ],
      },

      { type: 'h2', text: 'Using both' },
      {
        type: 'p',
        text: 'This is a legitimate strategy rather than a compromise. Take the common hooks from the lean library and reach for react-use only for the specific exotic hook you need — the bundler will tree-shake both.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `import { useLocalStorage, useDebounce } from '@danixsoft/hooks';
import { useBattery } from 'react-use';   // only where nothing else covers it`,
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Is react-use abandoned?',
            answer:
              'Not abandoned, but its release cadence has slowed noticeably compared to its peak. Check the repository\'s recent commit and release history before adopting it for a long-lived project — that is a better signal than any comparison page.',
          },
          {
            question: 'Does @danixsoft/hooks plan to match react-use hook for hook?',
            answer:
              'No. The library is deliberately curated. Hooks are added when a case comes up repeatedly, not to grow a number. A hook you cannot find is worse than a hook that does not exist.',
          },
          {
            question: 'Does the Unlicense cause problems?',
            answer:
              'Rarely in practice, but some corporate legal teams have clearer processes for MIT than for public-domain dedications like the Unlicense. If your organisation maintains an approved-licence list, check it before adopting either.',
          },
          {
            question: 'Which has better TypeScript support?',
            answer:
              '@danixsoft/hooks is written in TypeScript from source, so generics infer at the call site without annotations. react-use ships types, but some signatures are looser, which shows up as more explicit annotations in your code.',
          },
        ],
      },
    ],
  },

  {
    slug: 'ahooks',
    section: '/compare',
    title: '@danixsoft/hooks vs ahooks: Lean Utilities or a Framework',
    heading: '@danixsoft/hooks vs ahooks',
    description:
      'ahooks brings a powerful useRequest and a large enterprise-oriented toolkit. Here is how that compares to a small, dependency-free utility collection.',
    answer:
      'ahooks, maintained by Alibaba, is a large and well-engineered hooks library whose standout feature is useRequest — a fully featured async manager with caching, polling, retries and debouncing built in. @danixsoft/hooks is smaller and simpler, with zero runtime dependencies and a basic useFetch rather than a request framework. Choose ahooks if you want its async layer; choose @danixsoft/hooks if you want lean utilities and prefer a dedicated library like TanStack Query for data fetching.',
    keywords: [
      'ahooks alternative',
      'ahooks vs',
      'useRequest react',
      'enterprise react hooks library',
    ],
    datePublished: '2025-11-06',
    dateModified: '2026-01-20',
    related: ['react-use', 'mantine-hooks'],
    blocks: [
      {
        type: 'lead',
        text: 'ahooks is not really a competitor to a utility hook collection — it is closer to a framework with a hooks-shaped API. That distinction determines which one you should install.',
      },

      { type: 'h2', text: 'Different problems, similar packaging' },
      {
        type: 'table',
        head: ['', '@danixsoft/hooks', 'ahooks'],
        rows: [
          ['Scope', 'Utility hooks for common UI problems', 'A broad toolkit including an async layer'],
          ['Async story', '[useFetch](/use-fetch) — data, error, loading, abort on unmount', '`useRequest` — caching, polling, retry, debounce, dependent requests'],
          ['Runtime dependencies', 'None', 'Several'],
          ['Maintainer', 'DanixSoft (independent)', 'Alibaba'],
          ['Docs language', 'English', 'English and Chinese'],
          ['Bundle posture', 'Tree-shakeable, tiny per hook', 'Tree-shakeable, but larger units'],
          ['Licence', 'MIT', 'MIT'],
        ],
      },

      { type: 'h2', text: 'useRequest is the real decision' },
      {
        type: 'p',
        text: 'Nearly every ahooks-versus-alternative decision comes down to one hook. `useRequest` handles caching, polling, retries, debouncing, dependent requests, manual triggering and loading-state delays — a genuinely large amount of behaviour that most applications need in some form.',
      },
      {
        type: 'p',
        text: 'Our [useFetch](/use-fetch) does not attempt that. It gives you `data`, `error` and `loading`, and aborts the request when the URL changes or the component unmounts. That is the right size for a utility library and clearly not enough for a data-heavy application.',
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'The third option',
        text: 'If you want a serious async layer, [TanStack Query](https://tanstack.com/query) is more capable than either library\'s built-in offering — request deduplication, background refetching, optimistic updates and a devtools panel. Pairing TanStack Query with a lean utility library is a common and effective combination.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'A pairing that works well',
        code: `// Data layer: purpose-built.
import { useQuery } from '@tanstack/react-query';

// UI utilities: small and dependency-free.
import { useDebounce, useMediaQuery, useClickOutside } from '@danixsoft/hooks';

function ProductSearch() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 300);
  const { data, isLoading } = useQuery({
    queryKey: ['products', debounced],
    queryFn: () => searchProducts(debounced),
  });
  // …
}`,
      },

      { type: 'h2', text: 'When ahooks is the better fit' },
      {
        type: 'list',
        items: [
          '**You want `useRequest` specifically** and do not want to add a separate data library.',
          '**You are already in the Ant Design ecosystem**, where ahooks is the natural companion.',
          '**Your team reads Chinese documentation**, which is first-class rather than a translation.',
          '**You want a large toolkit from one vendor** with a single support surface.',
        ],
      },

      { type: 'h2', text: 'When the leaner library is the better fit' },
      {
        type: 'list',
        items: [
          '**You already use TanStack Query or SWR.** Adding ahooks means two async layers competing for the same job.',
          '**Zero runtime dependencies is a requirement**, not a preference.',
          '**You want utilities, not a framework.** Adopting a framework-shaped library is a bigger architectural commitment than installing a few hooks.',
          '**Your app is touch-heavy.** Swipe, touch and pointer hooks are first-class here.',
        ],
      },
      {
        type: 'keyTakeaway',
        text: 'Ask what you want the library to own. If the answer includes your data-fetching architecture, ahooks or TanStack Query. If it is small stateful UI logic, a lean utility collection is the better shape.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Can I use ahooks and @danixsoft/hooks together?',
            answer:
              'Yes. Both are tree-shakeable, so importing useRequest from one and useSwipe from the other costs only those hooks. Just avoid using both libraries\' versions of the same hook in one codebase — pick one per concern so behaviour stays predictable.',
          },
          {
            question: 'Does @danixsoft/hooks plan to add caching and polling to useFetch?',
            answer:
              'No. Doing that properly means request deduplication, cache invalidation and background refetching, which is a different library. TanStack Query already does it well, and duplicating it badly would serve nobody.',
          },
          {
            question: 'Is ahooks only for Ant Design projects?',
            answer:
              'No, it works in any React application. The Ant Design association reflects a shared maintainer, not a technical coupling.',
          },
        ],
      },
    ],
  },

  {
    slug: 'mantine-hooks',
    section: '/compare',
    title: '@danixsoft/hooks vs @mantine/hooks: Standalone or Part of a UI Kit',
    heading: '@danixsoft/hooks vs @mantine/hooks',
    description:
      'Mantine ships an excellent hooks package alongside its component library. Here is when to take it standalone and when a UI-agnostic collection fits better.',
    answer:
      '@mantine/hooks is a high-quality, well-documented hooks package that can be installed on its own without the rest of Mantine. It is the natural choice if you already use Mantine components. @danixsoft/hooks is UI-agnostic with zero runtime dependencies and is the better fit for projects on Tailwind, shadcn/ui, Material UI or a bespoke design system, where pulling in another ecosystem\'s conventions has no upside.',
    keywords: [
      'mantine hooks alternative',
      'mantine hooks standalone',
      'react hooks without ui library',
      'headless react hooks',
    ],
    datePublished: '2025-12-02',
    dateModified: '2026-01-20',
    related: ['usehooks-ts', 'ahooks'],
    blocks: [
      {
        type: 'lead',
        text: 'Mantine\'s hooks package is genuinely good, and it is published separately from the component library — so "are you using Mantine?" is a real question rather than a rhetorical one.',
      },

      { type: 'h2', text: 'The comparison in short' },
      {
        type: 'table',
        head: ['', '@danixsoft/hooks', '@mantine/hooks'],
        rows: [
          ['Standalone install', 'Yes — it is the whole product', 'Yes, though it is designed alongside Mantine'],
          ['Runtime dependencies', 'None', 'Minimal, but present'],
          ['UI coupling', 'None — works with any styling approach', 'None technically, but shaped by Mantine\'s conventions'],
          ['Documentation', 'Live demo on every hook page', 'Excellent, integrated with the Mantine docs'],
          ['TypeScript', 'Written in TypeScript from source', 'Written in TypeScript from source'],
          ['Licence', 'MIT', 'MIT'],
          ['Best when', 'Any stack, no UI kit assumed', 'You already use Mantine'],
        ],
      },

      { type: 'h2', text: 'If you use Mantine, use Mantine\'s hooks' },
      {
        type: 'p',
        text: 'This is the straightforward case. The hooks are designed against the same conventions as the components, several integrate directly with them, and you are already carrying the ecosystem. Adding a second hooks library to a Mantine app means two answers to every question and no benefit.',
      },

      { type: 'h2', text: 'If you do not use Mantine' },
      {
        type: 'p',
        text: 'Then the argument for taking a UI kit\'s hooks package is weaker. You inherit another project\'s naming conventions and release cadence for utilities that have nothing to do with rendering.',
      },
      {
        type: 'p',
        text: 'Most React applications today are on Tailwind with shadcn/ui, on Material UI, or on a bespoke design system. In all three cases a hooks library with no UI opinions at all is the cleaner dependency.',
      },
      {
        type: 'code',
        lang: 'tsx',
        title: 'No styling assumptions — bring your own classes',
        code: `import { useClickOutside, useScrollLock, useMediaQuery } from '@danixsoft/hooks';

function Drawer({ open, onClose, children }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useClickOutside(ref, onClose);
  useScrollLock(open);          // freeze the page behind the drawer

  return (
    <div ref={ref} className={isMobile ? 'inset-x-0 bottom-0' : 'inset-y-0 right-0'}>
      {children}
    </div>
  );
}`,
      },
      {
        type: 'keyTakeaway',
        text: 'The question is not which hooks package is better written — both are solid. It is whether you want your utility hooks to come from the same ecosystem as your components.',
      },

      { type: 'h2', text: 'Where the coverage differs' },
      {
        type: 'p',
        text: 'Both libraries cover the common ground — storage, media queries, click outside, clipboard, viewport, debouncing. Beyond that they diverge according to what each was built for.',
      },
      {
        type: 'list',
        items: [
          '**Mantine leans toward UI-kit needs**: focus traps, scroll areas, hotkeys and similar hooks that pair with its components.',
          '**We lean toward app-level needs**: [useForm](/use-form), [usePagination](/use-pagination), [useFetch](/use-fetch), [useSwipe](/use-swipe) and [useAudio](/use-audio).',
          '**Both are tree-shakeable**, so trying either costs only the hooks you import.',
        ],
      },
      {
        type: 'hooks',
        slugs: ['use-click-outside', 'use-scroll-lock', 'use-media-query', 'use-copy-to-clipboard'],
        title: 'The hooks most people reach for first',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Can I install @mantine/hooks without the Mantine component library?',
            answer:
              'Yes — it is published as its own package and works in any React project. Whether you should depends on whether its conventions fit the rest of your stack.',
          },
          {
            question: 'Do I need a CSS framework to use @danixsoft/hooks?',
            answer:
              'No. The hooks return state and refs and render nothing at all, so they work identically with Tailwind, CSS Modules, styled-components, vanilla CSS or no styling.',
          },
          {
            question: 'Which has better documentation?',
            answer:
              'Mantine\'s documentation is excellent and long-established. Ours runs a live, editable demo of the published package on every hook page and publishes an llms.txt for AI assistants. They are different strengths — look at both and judge for yourself.',
          },
        ],
      },
    ],
  },
];

export const getComparison = (slug: string) =>
  comparisons.find((comparison) => comparison.slug === slug);
