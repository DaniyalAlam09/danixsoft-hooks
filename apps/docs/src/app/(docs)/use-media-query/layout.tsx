import type { Metadata } from 'next';
import HookPage from '@/components/docs/hook-page';
import { buildMetadata } from '@/lib/seo';
import { getHook } from '@/lib/hooks-registry';

const hook = getHook('use-media-query')!;

export const metadata: Metadata = buildMetadata({
  title: `${hook.name} — React Hook | @danixsoft/hooks`,
  description: hook.summary + ' Zero dependencies, fully typed and SSR-safe. Copy-paste example included.',
  path: '/use-media-query',
  keywords: [hook.name, `react ${hook.name}`, ...hook.keywords],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HookPage slug="use-media-query">{children}</HookPage>;
}
