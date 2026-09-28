import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';
import { getHook, getCategory, hooks } from '@/lib/hooks-registry';

export const dynamic = 'force-static';
export const dynamicParams = false;

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return hooks.map((hook) => ({ slug: hook.slug }));
}

/**
 * Per-hook Open Graph image, prerendered at build time. The hook routes are
 * 44 static folders, so one route handler here is far cheaper than an
 * opengraph-image file in each. Referenced from hookMetadata() in lib/seo.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const hook = getHook(slug);
  if (!hook) return new Response('Not found', { status: 404 });
  const category = getCategory(hook.category);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          background:
            'linear-gradient(135deg, #16161a 0%, #1e1b3a 55%, #2a1f52 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#a5a0c0',
            fontWeight: 600,
          }}
        >
          <span>@danixsoft</span>
          <span style={{ color: '#8b7ff5' }}>/hooks</span>
          <span style={{ marginLeft: 24, color: '#6f6a8c' }}>
            {category.title}
          </span>
        </div>

        <div
          style={{
            marginTop: 64,
            fontSize: 84,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.03em',
            display: 'flex',
          }}
        >
          {hook.name}
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: '#c4c0da',
            lineHeight: 1.35,
            maxWidth: 1000,
            display: 'flex',
          }}
        >
          {hook.summary}
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {['SSR-safe', 'Zero dependencies', 'TypeScript'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  border: '1px solid #3a3560',
                  borderRadius: 999,
                  padding: '10px 22px',
                  fontSize: 22,
                  color: '#c4c0da',
                }}
              >
                {tag}
              </div>
            ),
          )}
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              whiteSpace: 'nowrap',
              fontSize: 24,
              color: '#6f6a8c',
            }}
          >
            {siteConfig.url.replace('https://', '')}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
