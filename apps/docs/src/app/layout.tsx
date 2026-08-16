import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import packageJson from '../../../../packages/hooks/package.json';

import ThemeProvider from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${packageJson.name} - The Ultimate React Hooks Library`,
  description: packageJson.description,
  keywords: ['react', 'hooks', 'react hooks', 'nextjs', 'usehooks', 'typescript hooks', 'custom hooks', 'react 18'],
  authors: [{ name: 'DanixSoft', url: 'https://danixsoft.com' }],
  creator: 'DanixSoft',
  publisher: 'DanixSoft',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danixsoft-hooks-docs.vercel.app',
    title: `${packageJson.name} - Enterprise React Hooks`,
    description: packageJson.description,
    siteName: '@danixsoft/hooks Docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${packageJson.name} - Enterprise React Hooks`,
    description: packageJson.description,
    creator: '@danixsoft',
  },
  verification: {
    google: '_hkHm6noShAZfqFRiBQg5pEaGqQLU52sW1O2P1DHAF8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: packageJson.name,
    description: packageJson.description,
    url: 'https://danixsoft-hooks-docs.vercel.app',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    softwareVersion: packageJson.version,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${roboto.className} antialiased selection:bg-blue-500/30 bg-neutral-50 dark:bg-[#121212] transition-colors`}>
        <ThemeProvider>
          <div className="mx-auto flex h-screen overflow-hidden">
            <Sidebar />
            
            {/* Main Content */}
            <main id="top" className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto w-full">
                {children}
              </div>
            </main>
            
            <RightSidebar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
