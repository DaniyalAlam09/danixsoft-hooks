import { getDanixSoftFamily } from '@/lib/danixsoft-family';

/**
 * "More from DanixSoft" — a quiet footer band introducing DanixSoft and linking
 * its other products. The list comes from danixsoft.com/products.json (see
 * src/lib/danixsoft-family.ts), so new products appear here without code
 * changes. Server component: ships no JavaScript.
 */
export default async function MoreFromDanixSoft() {
  const { company, products } = await getDanixSoftFamily('danixsoft-hooks');
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="more-from-danixsoft"
      className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,4fr)]"
    >
      <div className="max-w-sm">
        <h2
          id="more-from-danixsoft"
          className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-fg"
        >
          More from {company.name}
        </h2>
        <p className="text-sm leading-relaxed text-fg-muted">
          @danixsoft/hooks is built and maintained by {company.name}. {company.about}
        </p>
        <p className="mt-3 text-sm text-fg-subtle">
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted underline underline-offset-2 transition-colors hover:text-accent"
          >
            Visit {company.name}
          </a>
          <span aria-hidden> · </span>
          Founded by{' '}
          <a
            href={company.founder.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted underline underline-offset-2 transition-colors hover:text-accent"
          >
            {company.founder.name}
          </a>
        </p>
      </div>

      <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block py-0.5">
              <span className="text-sm font-semibold text-fg transition-colors group-hover:text-accent">
                {p.name}
              </span>
              <span className="ml-2 text-[11px] uppercase tracking-wide text-fg-subtle">
                {p.category}
              </span>
              <span className="mt-1 block text-sm leading-snug text-fg-muted">{p.tagline}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
