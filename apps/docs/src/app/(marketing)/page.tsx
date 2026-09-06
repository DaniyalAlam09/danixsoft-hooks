import type { Metadata } from 'next';
import Link from 'next/link';
import { packageVersion } from '@/lib/package-info';
import { siteConfig } from '@/lib/site';
import { hookCategories, hooks, hooksByCategory } from '@/lib/hooks-registry';
import { guides } from '@/content/guides';
import { buildMetadata, faqSchema, jsonLdGraph, itemListSchema } from '@/lib/seo';
import JsonLd from '@/components/ui/json-ld';
import CodeBlock from '@/components/docs/code-block';
import InstallTabs from '@/components/docs/install-tabs';
import { LinkButton, Badge, SectionHeading } from '@/components/ui/primitives';
import {
  ArrowRightIcon,
  BoltIcon,
  GitHubIcon,
  LeafIcon,
  listIcon,
  ServerIcon,
  ShieldIcon,
  SparkIcon,
  BookIcon,
  ScaleIcon,
  CheckIcon,
} from '@/components/ui/icons';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.package} — ${hooks.length} Production-Ready React Hooks`,
  description: siteConfig.description,
  path: '/',
  keywords: [
    'react hooks library',
    'best react hooks',
    'typescript react hooks',
    'zero dependency react hooks',
    'nextjs react hooks',
    'ssr safe hooks',
    'free react hooks',
  ],
});

const pillars = [
  {
    Icon: LeafIcon,
    title: 'Zero runtime dependencies',
    body: 'Installing adds exactly one entry to your lockfile. Every hook is built from React primitives and standard browser APIs — nothing transitive, nothing to audit.',
  },
  {
    Icon: ShieldIcon,
    title: 'TypeScript from source',
    body: 'Not bolted-on type definitions. Generics infer at the call site, so useLocalStorage("theme", "dark") is typed as a string without you writing an annotation.',
  },
  {
    Icon: ServerIcon,
    title: 'SSR-safe by default',
    body: 'Every browser API is guarded and every hook returns a stable value during server rendering. No "window is not defined", no hydration mismatches, in Next.js or Remix.',
  },
  {
    Icon: BoltIcon,
    title: 'Tree-shakeable',
    body: 'Marked sideEffects: false and shipped as ES modules. Import one hook and your bundle grows by roughly one hook — the size of the full package is irrelevant.',
  },
];

const faqs = [
  {
    question: `Is ${siteConfig.package} free to use commercially?`,
    answer:
      'Yes. The library is open source under the MIT licence, which permits commercial use, modification and redistribution. There is no paid tier and no attribution requirement.',
  },
  {
    question: 'Which React versions are supported?',
    answer:
      'React 18 and above, including React 19. React is a peer dependency, so you stay in control of the version your application uses.',
  },
  {
    question: 'Does it work with Next.js App Router and Server Components?',
    answer:
      'Yes. Hooks run in Client Components, so add the "use client" directive to the component that calls them — the same requirement React itself imposes on useState. Every hook is written to be safe during the server pre-render pass.',
  },
  {
    question: 'How large is the bundle?',
    answer:
      'Whatever the hooks you import weigh — typically well under a kilobyte gzipped each. The package is tree-shakeable, so unimported hooks never reach your bundle.',
  },
  {
    question: 'Can I use it with Vite, Remix or React Native Web?',
    answer:
      'Yes. The package is framework-agnostic and ships both ESM and CommonJS builds. Anywhere React runs in a browser environment, these hooks run.',
  },
  {
    question: 'How is it different from writing the hooks myself?',
    answer:
      'Mostly in the edge cases. Cleanup on unmount, stale closures, SSR guards, storage quota errors and cross-tab synchronisation are each easy to miss and tedious to test. These implementations handle them and are covered by a test suite.',
  },
];

const heroSnippet = `'use client';

import {
  useLocalStorage,
  useToggle,
} from '@danixsoft/hooks';

export function Settings() {
  // Persisted, synced across
  // tabs, safe during SSR.
  const [theme, setTheme] =
    useLocalStorage('theme', 'dark');

  const [compact, toggle] =
    useToggle(false);

  return (
    <button onClick={toggle}>
      {compact ? 'Cosy' : 'Compact'}
    </button>
  );
}`;

const quickStart = `import { useLocalStorage, useDebounce, useMediaQuery } from '@danixsoft/hooks';

function SearchPanel() {
  const [recent, setRecent] = useLocalStorage<string[]>('recent', []);
  const [query, setQuery] = useState('');

  // One request when typing stops, not one per keystroke.
  const debouncedQuery = useDebounce(query, 300);

  // Read a CSS breakpoint from JavaScript, SSR-safe.
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={isMobile ? 'Search' : 'Search the documentation…'}
    />
  );
}`;

export default function Home() {
  const schema = jsonLdGraph(
    faqSchema(faqs),
    itemListSchema(
      'React hook categories',
      hookCategories.map((category) => ({
        name: category.title,
        path: `/hooks#${category.slug}`,
        description: category.blurb,
      })),
    ),
  );

  return (
    <>
      <JsonLd data={schema} />

      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="absolute inset-0 aurora" />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
            <div>
              <Link href="/hooks" className="inline-block">
                <Badge tone="accent" className="mb-6">
                  <SparkIcon className="h-3 w-3" />
                  v{packageVersion} — {hooks.length} hooks, zero dependencies
                </Badge>
              </Link>

              <h1 className="mb-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-fg sm:text-5xl lg:text-[3.5rem]">
                The React hooks you keep{' '}
                <span className="text-gradient">rewriting</span>, written once.
              </h1>

              <p className="mb-9 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
                {hooks.length} production-ready hooks for state, storage, forms,
                the DOM, timers and device sensors. Fully typed, SSR-safe,
                tree-shakeable and free under the MIT licence — with a live demo
                on every page so you can try before you install.
              </p>

              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/docs" size="lg">
                  Get started
                  <ArrowRightIcon className="h-4 w-4" />
                </LinkButton>
                <LinkButton href="/hooks" variant="secondary" size="lg">
                  Browse all {hooks.length} hooks
                </LinkButton>
                <LinkButton
                  href={siteConfig.links.github}
                  variant="ghost"
                  size="lg"
                  external
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </LinkButton>
              </div>

              <InstallTabs className="max-w-lg" />

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
                {[
                  [`${hooks.length}`, 'hooks'],
                  ['0', 'dependencies'],
                  ['100%', 'TypeScript'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-mono text-2xl font-bold text-fg">
                      {value}
                    </dt>
                    <dd className="text-[13px] uppercase tracking-wide text-fg-subtle">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* A real snippet rather than a decorative illustration — it is the
                fastest way to communicate what using the library feels like. */}
            <div className="hidden lg:block">
              <CodeBlock
                code={heroSnippet}
                title="app/settings.tsx"
                className="my-0 shadow-[var(--shadow-lg)]"
              />
              <ul className="mt-5 space-y-2.5">
                {[
                  'No provider to mount, no config to write.',
                  'Works in Next.js, Vite, Remix and React Native Web.',
                  'Every hook has a live demo you can click.',
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[14px] leading-relaxed text-fg-muted"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- why it's different */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Why this library"
          title="Small enough to trust, complete enough to ship"
          description="Four decisions shape every hook in the package. They are the reason it stays out of your way."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {pillars.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-fg">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-2 font-semibold text-fg">{title}</h3>
              <p className="text-[15px] leading-relaxed text-fg-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ code */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="In practice"
                title="Three imports, three solved problems"
                description="Persistence, rate limiting and responsive logic — each one a well-known source of subtle bugs, each one a single line here."
              />
              <ul className="space-y-3">
                {[
                  ['useLocalStorage', 'Persists and syncs across tabs, safely on the server.'],
                  ['useDebounce', 'Cuts a request per keystroke down to one per pause.'],
                  ['useMediaQuery', 'Reads a breakpoint in JS without a hydration mismatch.'],
                ].map(([name, note]) => (
                  <li key={name} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="text-[15px] leading-relaxed text-fg-muted">
                      <Link
                        href={`/${name.replace(/([A-Z])/g, '-$1').toLowerCase()}`}
                        className="font-mono font-semibold text-fg hover:text-accent"
                      >
                        {name}
                      </Link>{' '}
                      — {note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <CodeBlock
              code={quickStart}
              title="SearchPanel.tsx"
              className="my-0"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- categories */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="The catalogue"
          title={`${hooks.length} hooks across ${hookCategories.length} categories`}
          description="Grouped by the problem you are trying to solve rather than by the API they wrap."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {hookCategories.map((category) => {
            const Icon = listIcon(category.icon);
            const entries = hooksByCategory(category.id);
            return (
              <Link
                key={category.id}
                href={`/hooks#${category.slug}`}
                className="group rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_14px_36px_-20px_var(--accent-ring)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-soft-fg">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-semibold text-fg group-hover:text-accent">
                    {category.title}
                  </h3>
                  <span className="ml-auto text-sm text-fg-subtle">
                    {entries.length}
                  </span>
                </div>
                <p className="mb-4 text-[15px] leading-relaxed text-fg-muted">
                  {category.blurb}
                </p>
                <p className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[12.5px] text-fg-subtle">
                  {entries.slice(0, 5).map((hook) => (
                    <span key={hook.slug}>{hook.name}</span>
                  ))}
                  {entries.length > 5 && (
                    <span className="text-accent">
                      +{entries.length - 5} more
                    </span>
                  )}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------- guides */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Guides"
            title="Learn the patterns, not just the API"
            description="The problems these hooks solve are worth understanding even if you never install the package."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {guides.slice(0, 4).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <h3 className="mb-2 flex items-start gap-2 font-semibold text-fg group-hover:text-accent">
                  <BookIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {guide.heading}
                </h3>
                <p className="text-[14px] leading-relaxed text-fg-muted">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              All guides
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <ScaleIcon className="h-4 w-4" />
              Compare with other libraries
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- faq */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people ask before installing"
          align="center"
        />

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-surface px-5 py-4 open:border-accent/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-fg marker:hidden">
                <span className="text-[15px]">{faq.question}</span>
                <span
                  aria-hidden
                  className="shrink-0 text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-fg-muted">
          More answers on the{' '}
          <Link href="/faq" className="font-medium text-accent hover:underline">
            full FAQ page
          </Link>
          .
        </p>
      </section>

      {/* --------------------------------------------------------------- cta */}
      <section className="border-t border-border">
        <div className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 aurora" />
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-fg">
              Stop rewriting useLocalStorage
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-pretty text-[17px] leading-relaxed text-fg-muted">
              One command, {hooks.length} hooks, no dependencies. Free forever
              under the MIT licence.
            </p>
            <InstallTabs className="mx-auto mb-8 max-w-lg text-left" />
            <div className="flex flex-wrap justify-center gap-3">
              <LinkButton href="/docs" size="lg">
                Read the docs
                <ArrowRightIcon className="h-4 w-4" />
              </LinkButton>
              <LinkButton
                href={siteConfig.links.github}
                variant="secondary"
                size="lg"
                external
              >
                <GitHubIcon className="h-4 w-4" />
                Star on GitHub
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
