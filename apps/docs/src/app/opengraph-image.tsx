import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';
import { hooks } from '@/lib/hooks-registry';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Root-level OG image. Next.js applies it to every route that does not
 * define its own, so one file covers the whole site.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'linear-gradient(135deg, #16161a 0%, #1e1b3a 55%, #2a1f52 100%)',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #8b7ff5 0%, #6d5ef0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              fontWeight: 700,
              color: 'white',
            }}
          >
            h
          </div>
          {/* Satori requires an explicit display on any node with >1 child. */}
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
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 68,
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 920,
            display: 'flex',
          }}
        >
          The React hooks you keep rewriting, written once.
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: '#a5a0c0',
            lineHeight: 1.4,
            maxWidth: 880,
            display: 'flex',
          }}
        >
          {hooks.length} production-ready hooks. Zero dependencies, fully typed,
          SSR-safe.
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {['TypeScript', 'Tree-shakeable', 'MIT licensed'].map((tag) => (
            <div
              key={tag}
              style={{
                border: '1px solid #3a3560',
                borderRadius: 999,
                padding: '10px 22px',
                fontSize: 22,
                color: '#c4c0da',
              }}
            >
              {tag}
            </div>
          ))}
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 24,
              color: '#6f6a8c',
            }}
          >
            react-hooks.danixsoft.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
