import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * AI crawlers are allowed explicitly rather than relying on the wildcard.
 * Being cited by an answer engine is the modern equivalent of a backlink, and
 * several of these agents treat an absent explicit rule as ambiguous.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'DuckAssistBot',
  'MistralAI-User',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Search crawlers, called out so the intent is unambiguous.
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot', 'Slurp', 'Applebot'],
        allow: '/',
      },
      {
        userAgent: aiCrawlers,
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
