import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next-[#D90429]' // atau font bawaan Next.js
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PASSIVE.WEAR — Underground Apparel & Heavyweight Goods',
    template: '%s | PASSIVE.WEAR',
  },
  description: 'Official Brand Profile & Pre-Order Management System for PASSIVE.WEAR. Heavyweight apparel, precise cuts, and underground subculture culture.',
  keywords: ['PASSIVE.WEAR', 'Underground Apparel', 'Heavyweight T-Shirt', 'Streetwear Indonesia', 'Pre-Order Apparel'],
  authors: [{ name: 'PASSIVE.WEAR' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-[#0B0B0B] text-stone-200 antialiased selection:bg-[#D90429] selection:text-white">
        {children}
      </body>
    </html>
  );
}