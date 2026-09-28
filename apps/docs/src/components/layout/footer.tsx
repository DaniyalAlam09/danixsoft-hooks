import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { hookCategories, hooksByCategory, hookCount } from '@/lib/hooks-registry';
import { GitHubIcon, NpmIcon } from '@/components/ui/icons';
import Logo from './logo';
import MoreFromDanixSoft from './more-from-danixsoft';

const resources = [
  { title: 'Documentation', href: '/docs' },
  { title: 'All Hooks', href: '/hooks' },
  { title: 'Guides', href: '/guides' },
  { title: 'Comparisons', href: '/compare' },
  { title: 'API Reference', href: '/api-reference' },
  { title: 'FAQ', href: '/faq' },
];

const guides = [
  { title: 'React Hooks Cheat Sheet', href: '/guides/react-hooks-cheat-sheet' },
  { title: 'SSR-Safe Hooks in Next.js', href: '/guides/nextjs-ssr-safe-hooks' },
  { title: 'Debounce vs Throttle', href: '/guides/debounce-vs-throttle-in-react' },
  { title: 'localStorage in React', href: '/guides/react-localstorage-guide' },
  { title: 'Custom Hook Best Practices', href: '/guides/custom-react-hooks-best-practices' },
  { title: 'Fixing Stale Closures', href: '/guides/fixing-stale-closures-in-react' },
];

/**
 * A deliberately link-dense footer: it gives every page a path to the
 * category hubs and top guides, which is the cheapest internal-linking win
 * a documentation site has.
 */
export default async function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-[100rem] px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <div className="max-w-sm">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-semibold tracking-tight text-fg">
                @danixsoft<span className="text-accent">/hooks</span>
              </span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-fg-muted">
              {hookCount} production-ready React hooks. Zero dependencies, full
              TypeScript types, SSR-safe by default and MIT licensed — free
              forever.
            </p>
            <div className="flex gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="rounded-lg border border-border bg-surface p-2 text-fg-muted transition-colors hover:text-fg"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="npm package"
                className="rounded-lg border border-border bg-surface p-2 text-fg-muted transition-colors hover:text-fg"
              >
                <NpmIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Resources" links={resources} />
          <FooterColumn title="Guides" links={guides} />

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-fg">
              Hook categories
            </p>
            <ul className="space-y-2">
              {hookCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/hooks#${category.slug}`}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {category.title}
                    <span className="ml-1.5 text-xs text-fg-subtle">
                      {hooksByCategory(category.id).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-fg">
              Popular hooks
            </p>
            <ul className="space-y-2">
              {[
                'use-local-storage',
                'use-debounce',
                'use-fetch',
                'use-media-query',
                'use-click-outside',
                'use-copy-to-clipboard',
              ].map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="font-mono text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <MoreFromDanixSoft />

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            A{' '}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted underline underline-offset-2 transition-colors hover:text-accent"
            >
              {siteConfig.author.name}
            </a>{' '}
            product. © {year} {siteConfig.author.name}. Released under the{' '}
            <a
              href={siteConfig.links.license}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted underline underline-offset-2 transition-colors hover:text-accent"
            >
              MIT licence
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="/llms.txt"
              className="transition-colors hover:text-accent"
              title="Machine-readable summary for AI assistants"
            >
              llms.txt
            </a>
            <a href="/sitemap.xml" className="transition-colors hover:text-accent">
              Sitemap
            </a>
            <a
              href={siteConfig.links.changelog}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Changelog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-fg">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-accent"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
