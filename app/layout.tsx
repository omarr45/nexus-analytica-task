'use client';

import './globals.css';

import { AuthProvider } from '@/contexts/auth-context';
import { Inter as FontSans } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>Nexus Analytica Task</title>
        <meta name='description' content='Data Analysis Platform' />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
