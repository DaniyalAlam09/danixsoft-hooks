import Link from 'next/link';
import { ChevronRightIcon } from '@/components/ui/icons';

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail. Pair it with `breadcrumbSchema` for the JSON-LD. */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-fg-subtle">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRightIcon className="h-3.5 w-3.5 opacity-60" />
              )}
              {isLast ? (
                <span className="font-medium text-fg-muted" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="transition-colors hover:text-accent"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
