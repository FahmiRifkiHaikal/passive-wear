import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google'; // <-- Perbaikan di baris ini
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'PASSIVE.WEAR — Underground Apparel & Heavyweight Goods',
    template: '%s | PASSIVE.WEAR',
  },
  description: 'Official Brand Profile & Pre-Order Management System for PASSIVE.WEAR.',
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
    <html lang="id" className={`dark ${jetbrainsMono.variable}`}>
      <body className="bg-[#0B0B0B] text-stone-200 antialiased selection:bg-[#D90429] selection:text-white">
        {children}
      </body>
    </html>
  );
}