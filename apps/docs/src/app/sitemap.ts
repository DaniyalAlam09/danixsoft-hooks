import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { hooks } from '@/lib/hooks-registry';
import { guides } from '@/content/guides';
import { comparisons } from '@/content/comparisons';
import { hookLastModified, lastModified } from '@/lib/last-modified';

const url = (route: string) =>
  route === '/' ? siteConfig.url : `${siteConfig.url}${route}`;

/**
 * Generated from the same registries the site renders from, so a new hook,
 * guide or comparison is in the sitemap the moment it exists — no manual list
 * to forget to update.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Last git commit touching what each page renders from, so lastModified is
  // a real freshness signal rather than the deploy time.
  const docs = (path: string) => `apps/docs/src/${path}`;
  const registry = docs('lib/hooks-registry.ts');
  const librarySource = 'packages/hooks/src';

  const core: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: lastModified(docs('app/(marketing)/page.tsx'), registry), changeFrequency: 'weekly', priority: 1 },
    { url: url('/hooks'), lastModified: lastModified(docs('app/(docs)/hooks'), registry), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/docs'), lastModified: lastModified(docs('app/(docs)/docs')), changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/guides'), lastModified: lastModified(docs('content/guides.ts')), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/compare'), lastModified: lastModified(docs('content/comparisons.ts')), changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/faq'), lastModified: lastModified(docs('content/faq.ts')), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/more-from-danixsoft'), lastModified: lastModified(docs('app/(marketing)/more-from-danixsoft'), docs('lib/danixsoft-family.ts')), changeFrequency: 'monthly', priority: 0.3 },
    { url: url('/api-reference'), lastModified: lastModified(librarySource), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const hookPages: MetadataRoute.Sitemap = hooks.map((hook) => ({
    url: url(`/${hook.slug}`),
    lastModified: hookLastModified(hook.slug, hook.name),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: url(`/guides/${guide.slug}`),
    lastModified: new Date(guide.dateModified ?? guide.datePublished),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((entry) => ({
    url: url(`/compare/${entry.slug}`),
    lastModified: new Date(entry.dateModified ?? entry.datePublished),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // /api-reference/* symbol pages are deliberately left out: hook symbols
  // canonicalise to their hook page and type pages are noindex (see the
  // api-reference page's generateMetadata). Only the index is listed above.

  return [...core, ...hookPages, ...guidePages, ...comparisonPages];
}
