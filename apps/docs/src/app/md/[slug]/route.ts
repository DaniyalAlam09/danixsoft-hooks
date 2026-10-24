import { getHook, hooks } from '@/lib/hooks-registry';
import { hookMarkdown } from '@/lib/hook-markdown';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return hooks.map((hook) => ({ slug: hook.slug }));
}

/** Served at /<hook-slug>.md through a rewrite in next.config.ts. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hook = getHook(slug);
  if (!hook) return new Response('Not found', { status: 404 });
  return new Response(hookMarkdown(hook), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      // The HTML page is the canonical version.
      'X-Robots-Tag': 'noindex',
      Link: `<https://react-hooks.danixsoft.com/${hook.slug}>; rel="canonical"`,
    },
  });
}
