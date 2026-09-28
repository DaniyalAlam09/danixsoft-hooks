import type { Metadata } from 'next';
import HookPage from '@/components/docs/hook-page';
import { hookMetadata } from '@/lib/seo';

export const metadata: Metadata = hookMetadata('use-on-screen');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HookPage slug="use-on-screen">{children}</HookPage>;
}
