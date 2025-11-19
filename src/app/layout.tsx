import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { CreditCardApplyButton } from '@/components/credit-card-apply-button';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Bharat Cricket Chronicles',
  description: 'Your ultimate destination for Indian cricket updates, history, and player profiles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/*
          Google AdSense Script placeholder
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID" crossOrigin="anonymous"></script>
        */}
      </head>
      <body className={cn('font-body antialiased', inter.variable)}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CreditCardApplyButton />
        <Toaster />
      </body>
    </html>
  );
}
