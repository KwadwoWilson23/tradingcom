import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Traders Ring | Forex Arena',
  description: 'Trading competition platform - Connect your MT4/MT5 and compete live',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans text-slate-900 bg-white">{children}</body>
    </html>
  );
}
