import type { Metadata } from 'next';
import HookPage from '@/components/docs/hook-page';
import { buildMetadata } from '@/lib/seo';
import { getHook } from '@/lib/hooks-registry';

const hook = getHook('use-online-state')!;

export const metadata: Metadata = buildMetadata({
  title: `${hook.name} — React Hook | @danixsoft/hooks`,
  description: hook.summary + ' Zero dependencies, fully typed and SSR-safe. Copy-paste example included.',
  path: '/use-online-state',
  keywords: [hook.name, `react ${hook.name}`, ...hook.keywords],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HookPage slug="use-online-state">{children}</HookPage>;
}
