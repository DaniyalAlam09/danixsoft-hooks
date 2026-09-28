import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from './site';
import { getHook } from './hooks-registry';
import { hookLastModified } from './last-modified';

interface PageSeoInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. `/use-local-storage`. */
  path: string;
  keywords?: string[];
  /** ISO date — set on articles so Google can show a freshness signal. */
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article';
  /** Set true for thin utility routes we would rather keep out of the index. */
  noindex?: boolean;
  /** Social card. Defaults to the site-wide /opengraph-image. */
  image?: { path: string; alt: string };
}

const DEFAULT_IMAGE = {
  path: '/opengraph-image',
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
};

/**
 * Builds a complete, canonical-correct Metadata object.
 * Every page in the app should go through this so we never ship a route
 * with a missing canonical, a duplicate title or a stale OG url again.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  publishedTime,
  modifiedTime,
  type = 'website',
  noindex = false,
  image = DEFAULT_IMAGE,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  // Set explicitly: a page-level `openGraph` object replaces the root one, so
  // without this every inner page shipped with no og:image at all.
  const images = [
    { url: absoluteUrl(image.path), width: 1200, height: 630, alt: image.alt },
  ];

  return {
    // `absolute` opts out of the root layout's `%s | @danixsoft/hooks`
    // template — every title built here is already complete.
    title: { absolute: title },
    description,
    keywords: [...new Set([...keywords, 'react hooks', 'typescript', siteConfig.package])],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Metadata for a /use-* hook page. Titles follow
 * "useDebounce — React hook for debouncing values | @danixsoft/hooks" so the
 * hook name and the problem it solves both lead the search result.
 */
export function hookMetadata(slug: string): Metadata {
  const hook = getHook(slug);
  if (!hook) throw new Error(`No registry entry for hook "${slug}"`);

  return buildMetadata({
    title: `${hook.name} — React hook for ${hook.purpose} | ${siteConfig.name}`,
    description: `${hook.summary} SSR-safe, zero dependencies and fully typed. Install command, copy-paste example and API signature.`,
    path: `/${hook.slug}`,
    type: 'article',
    modifiedTime: hookLastModified(hook.slug, hook.name),
    keywords: [
      hook.name,
      `react ${hook.name}`,
      `${hook.name} react hook`,
      `react hook for ${hook.purpose}`,
      ...hook.keywords,
    ],
    image: { path: `/og/${hook.slug}`, alt: `${hook.name} — ${hook.summary}` },
  });
}

// --------------------------------------------------------------- JSON-LD

// The publisher is the DanixSoft company, so its @id lives on the company
// domain rather than this product site.
const ORG_ID = `${siteConfig.author.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;
const SOFTWARE_ID = `${siteConfig.url}/#software`;
const SOURCE_ID = `${siteConfig.url}/#source-code`;
const MIT_LICENSE = 'https://opensource.org/licenses/MIT';

export const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: siteConfig.author.name,
  url: siteConfig.author.url,
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { '@id': ORG_ID },
  inLanguage: siteConfig.lang,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/hooks?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const softwareSchema = (version: string) => ({
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: siteConfig.package,
  description: siteConfig.description,
  url: siteConfig.url,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  softwareVersion: version,
  programmingLanguage: 'TypeScript',
  runtimePlatform: 'React 18+',
  license: MIT_LICENSE,
  downloadUrl: siteConfig.links.npm,
  installUrl: siteConfig.links.npm,
  isAccessibleForFree: true,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
});

/** The library as source code — what an assistant needs to cite the repo. */
export const sourceCodeSchema = (version: string) => ({
  '@type': 'SoftwareSourceCode',
  '@id': SOURCE_ID,
  name: siteConfig.package,
  description: siteConfig.description,
  url: siteConfig.url,
  codeRepository: siteConfig.links.github,
  codeSampleType: 'full solution',
  programmingLanguage: {
    '@type': 'ComputerLanguage',
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
  },
  runtimePlatform: ['React 18+', 'Browser', 'Node.js (server-side rendering)'],
  license: MIT_LICENSE,
  version,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  targetProduct: { '@id': SOFTWARE_ID },
  sameAs: [siteConfig.links.npm, siteConfig.links.github],
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const techArticleSchema = ({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  keywords = [],
  image,
  about,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
  /** Site-relative image path, e.g. `/og/use-debounce`. */
  image?: string;
  /** Set on hook pages: the article documents part of the library. */
  about?: 'library';
}) => ({
  '@type': 'TechArticle',
  headline,
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
  datePublished,
  dateModified: dateModified ?? datePublished,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  inLanguage: siteConfig.lang,
  keywords: keywords.join(', '),
  isAccessibleForFree: true,
  proficiencyLevel: 'Beginner',
  isPartOf: { '@id': SITE_ID },
  ...(image ? { image: absoluteUrl(image) } : {}),
  ...(about === 'library'
    ? { about: { '@id': SOFTWARE_ID }, mentions: { '@id': SOURCE_ID } }
    : {}),
});

export const howToSchema = ({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) => ({
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
});

export const itemListSchema = (
  name: string,
  items: { name: string; path: string; description?: string }[],
) => ({
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
    ...(item.description ? { description: item.description } : {}),
  })),
});

/** Wraps one or more schema nodes into a single @graph document. */
export const jsonLdGraph = (...nodes: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
