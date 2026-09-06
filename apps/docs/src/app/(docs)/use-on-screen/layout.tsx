import type { Metadata } from 'next';
import HookPage from '@/components/docs/hook-page';
import { buildMetadata } from '@/lib/seo';
import { getHook } from '@/lib/hooks-registry';

const hook = getHook('use-on-screen')!;

export const metadata: Metadata = buildMetadata({
  title: `${hook.name} — React Hook | @danixsoft/hooks`,
  description: hook.summary + ' Zero dependencies, fully typed and SSR-safe. Copy-paste example included.',
  path: '/use-on-screen',
  keywords: [hook.name, `react ${hook.name}`, ...hook.keywords],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HookPage slug="use-on-screen">{children}</HookPage>;
}
