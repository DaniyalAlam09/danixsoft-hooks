import type { Metadata } from 'next';
import HookPage from '@/components/docs/hook-page';
import { hookMetadata } from '@/lib/seo';

export const metadata: Metadata = hookMetadata('use-infinite-scroll');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HookPage slug="use-infinite-scroll">{children}</HookPage>;
}
