'use client';

import { useEffect } from 'react';
import SidebarNav from './sidebar-nav';
import { siteConfig } from '@/lib/site';
import { GitHubIcon, NpmIcon } from '@/components/ui/icons';

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Prevent the page behind the drawer from scrolling.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 top-(--header-h) z-40 lg:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative h-full w-[86vw] max-w-xs animate-in-up border-r border-border bg-bg px-4 pb-16 pt-5 shadow-[var(--shadow-lg)]">
        <SidebarNav onNavigate={onClose} />

        <div className="absolute inset-x-4 bottom-0 flex gap-2 border-t border-border bg-bg py-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm text-fg-muted"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <a
            href={siteConfig.links.npm}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm text-fg-muted"
          >
            <NpmIcon className="h-4 w-4" /> npm
          </a>
        </div>
      </div>
    </div>
  );
}
