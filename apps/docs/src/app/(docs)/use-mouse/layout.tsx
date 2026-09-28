import type { Metadata } from 'next';
import HookPage from '@/components/docs/hook-page';
import { hookMetadata } from '@/lib/seo';

export const metadata: Metadata = hookMetadata('use-mouse');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HookPage slug="use-mouse">{children}</HookPage>;
}
