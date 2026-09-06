import { hookCategories, hooksByCategory } from './hooks-registry';

export interface NavLink {
  title: string;
  href: string;
  /** Short line used in the command palette and mega-menu. */
  hint?: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  /** Category anchor on the /hooks directory page, when applicable. */
  href?: string;
  links: NavLink[];
}

/** Primary header navigation. */
export const primaryNav: NavLink[] = [
  { title: 'Docs', href: '/docs', hint: 'Install, quick start and concepts' },
  { title: 'Hooks', href: '/hooks', hint: 'Browse all 44 hooks by category' },
  { title: 'Guides', href: '/guides', hint: 'In-depth React tutorials' },
  { title: 'Compare', href: '/compare', hint: 'How we stack up against alternatives' },
  { title: 'API', href: '/api-reference', hint: 'Generated TypeScript reference' },
];

/** Left sidebar: everything that is not a hook page. */
export const docsNav: NavGroup[] = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Introduction', href: '/', hint: 'What the library is and why it exists' },
      { title: 'Installation', href: '/docs', hint: 'npm, yarn, pnpm and bun' },
      { title: 'Quick Start', href: '/docs#quick-start', hint: 'Your first hook in 60 seconds' },
      { title: 'TypeScript', href: '/docs#typescript', hint: 'Types, inference and generics' },
      { title: 'Server-Side Rendering', href: '/docs#server-side-rendering', hint: 'Next.js, Remix and hydration' },
      { title: 'Tree Shaking', href: '/docs#tree-shaking', hint: 'How bundle size stays flat' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { title: 'All Hooks', href: '/hooks', hint: 'Searchable directory' },
      { title: 'API Reference', href: '/api-reference', hint: 'Generated from source' },
      { title: 'FAQ', href: '/faq', hint: 'Common questions answered' },
    ],
  },
];

/** Sidebar section built from the hook registry so it can never drift. */
export const hooksNav: NavGroup[] = hookCategories.map((category) => ({
  title: category.title,
  href: `/hooks#${category.slug}`,
  links: hooksByCategory(category.id).map((hook) => ({
    title: hook.name,
    href: `/${hook.slug}`,
    hint: hook.summary,
  })),
}));

export const fullSidebarNav: NavGroup[] = [...docsNav, ...hooksNav];
