import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { packageVersion } from '@/lib/package-info';

import { siteConfig } from '@/lib/site';
import {
  jsonLdGraph,
  organizationSchema,
  websiteSchema,
  softwareSchema,
  sourceCodeSchema,
} from '@/lib/seo';
import ThemeProvider from '@/components/theme/theme-provider';
import ThemeScript from '@/components/theme/theme-script';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import JsonLd from '@/components/ui/json-ld';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    // Every child page supplies its own full title, so the template only
    // catches routes that set a bare string.
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'react hooks',
    'react hooks library',
    'typescript react hooks',
    'custom react hooks',
    'usehooks',
    'nextjs hooks',
    'ssr safe react hooks',
    'zero dependency react hooks',
    'react 19 hooks',
    siteConfig.package,
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: 'technology',
  alternates: {
    canonical: siteConfig.url,
    types: {
      // Machine-readable summaries for AI assistants and answer engines.
      'text/plain': [
        { url: `${siteConfig.url}/llms.txt`, title: 'llms.txt' },
        { url: `${siteConfig.url}/llms-full.txt`, title: 'llms-full.txt' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: siteConfig.googleSiteVerification,
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1f' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = jsonLdGraph(
    organizationSchema(),
    websiteSchema(),
    softwareSchema(packageVersion),
    sourceCodeSchema(packageVersion),
  );

  return (
    <html
      lang={siteConfig.lang}
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLd data={schema} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            Skip to content
          </a>

          <Header version={packageVersion} />

          {/* Each route group supplies its own shell: (docs) adds the
              sidebar, (marketing) renders full width. */}
          <main id="main">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
