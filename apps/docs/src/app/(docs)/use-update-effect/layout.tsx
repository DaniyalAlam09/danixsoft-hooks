import type { Metadata } from 'next';
import HookPage from '@/components/docs/hook-page';
import { hookMetadata } from '@/lib/seo';

export const metadata: Metadata = hookMetadata('use-update-effect');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HookPage slug="use-update-effect">{children}</HookPage>;
}
