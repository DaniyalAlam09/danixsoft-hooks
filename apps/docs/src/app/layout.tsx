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
  title: '@danixsoft/hooks',
  description: 'A collection of beautiful, dependency-free React hooks.',
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
