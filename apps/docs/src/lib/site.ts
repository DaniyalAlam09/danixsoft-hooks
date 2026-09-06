/**
 * Single source of truth for anything that references the deployed site.
 * Change the domain here and metadata, sitemap, robots, JSON-LD and OG
 * images all follow.
 */
export const siteConfig = {
  url: 'https://react-hooks.danixsoft.com',
  name: '@danixsoft/hooks',
  shortName: 'DanixSoft Hooks',
  tagline: 'The Ultimate React Hooks Library',
  description:
    '44 production-ready React hooks with zero dependencies, full TypeScript types and SSR safety. Works with Next.js, Vite, Remix and React Native Web. Free and MIT licensed.',
  locale: 'en_US',
  lang: 'en',
  package: '@danixsoft/hooks',
  hookCount: 44,
  author: {
    name: 'DanixSoft',
    url: 'https://danixsoft.com',
    email: 'hello@danixsoft.com',
  },
  links: {
    github: 'https://github.com/DaniyalAlam09/danixsoft-hooks',
    issues: 'https://github.com/DaniyalAlam09/danixsoft-hooks/issues',
    discussions: 'https://github.com/DaniyalAlam09/danixsoft-hooks/discussions',
    npm: 'https://www.npmjs.com/package/@danixsoft/hooks',
    bundlephobia: 'https://bundlephobia.com/package/@danixsoft/hooks',
    changelog:
      'https://github.com/DaniyalAlam09/danixsoft-hooks/blob/main/CHANGELOG.md',
    license:
      'https://github.com/DaniyalAlam09/danixsoft-hooks/blob/main/LICENSE',
  },
  twitter: '@danixsoft',
  googleSiteVerification: '_hkHm6noShAZfqFRiBQg5pEaGqQLU52sW1O2P1DHAF8',
} as const;

export const absoluteUrl = (path = '/') =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`.replace(
    /\/$/,
    path === '/' ? '' : '',
  );
