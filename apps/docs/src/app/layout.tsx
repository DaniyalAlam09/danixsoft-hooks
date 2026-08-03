import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import ThemeProvider from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '@danixsoft/hooks - The Ultimate React Hooks Library',
  description: 'A collection of 32+ beautiful, highly-optimized, zero-dependency React hooks for Next.js and Vite. Improve your workflow with production-ready utilities.',
  keywords: ['react', 'hooks', 'react hooks', 'nextjs', 'usehooks', 'typescript hooks', 'custom hooks', 'react 18'],
  authors: [{ name: 'DanixSoft', url: 'https://danixsoft.com' }],
  creator: 'DanixSoft',
  publisher: 'DanixSoft',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danixsoft-hooks-docs.vercel.app',
    title: '@danixsoft/hooks - Enterprise React Hooks',
    description: '32+ highly-optimized, SSR-safe, zero-dependency React hooks for modern applications.',
    siteName: '@danixsoft/hooks Docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: '@danixsoft/hooks - Enterprise React Hooks',
    description: '32+ highly-optimized, zero-dependency React hooks.',
    creator: '@danixsoft',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
