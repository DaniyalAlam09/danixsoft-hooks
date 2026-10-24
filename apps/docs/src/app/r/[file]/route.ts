import { hooks } from '@/lib/hooks-registry';
import { registryIndex, registryItemForFile } from '@/lib/hook-registry-items';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { file: 'registry.json' },
    ...hooks.map((hook) => ({ file: `${hook.slug}.json` })),
  ];
}

/** /r/<hook>.json (shadcn registry item) and /r/registry.json (index). */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const body = file === 'registry.json' ? registryIndex() : registryItemForFile(file);
  if (!body) return new Response('Not found', { status: 404 });
  return Response.json(body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
