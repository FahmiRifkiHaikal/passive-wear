'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  Lock,
  ShieldCheck,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const BRAND = {
  name: "PASSIVE.WEAR",
  tagline: "STREETWEAR. CULTURE. MOVEMENT.",
  established: "2026",
  instagram: "https://instagram.com/passive.wear",
};

const FEATURED_PRODUCTS = [
  {
    id: "ARTICLE #001",
    title: "REIGN OF CHAOS",
    specs: "20s Heavyweight Cotton (230 GSM) • Plastisol Discharge",
    status: "BATCH #01 COMPLETED"
  },
  {
    id: "ARTICLE #002",
    title: "SILENT VOID",
    specs: "16s Ultra Heavyweight (260 GSM) • High-Density Screenprint",
    status: "UPCOMING DROP"
  }
];

export default function BrandProfilePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-stone-200 font-mono selection:bg-[#D90429] selection:text-white">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tighter text-xl text-stone-100 flex items-center gap-2 hover:text-[#D90429] transition-colors">
            <Flame className="w-5 h-5 text-[#D90429]" />
            <span>{BRAND.name}</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="#about" className="hidden sm:block hover:text-[#D90429] transition-colors">ABOUT</a>
            <a href="#catalog" className="hidden sm:block hover:text-[#D90429] transition-colors">ARCHIVE</a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-stone-800 rounded hover:border-[#D90429] hover:text-[#D90429] transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 hover:border-[#D90429] px-3 py-1.5 rounded text-stone-300 hover:text-white transition-all text-[11px]"
            >
              <Lock className="w-3 h-3 text-[#D90429]" />
              <span>ADMIN LOGIN</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">

        {/* HERO SECTION BRAND */}
        <section className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32 border-b border-stone-800/80 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#D90429]" />
            <span>OFFICIAL BRAND PROFILE</span>
          </div>

          <h1 className="text-5xl sm:text-8xl font-black text-stone-100 tracking-tight leading-none mb-6 uppercase">
            {BRAND.name}
          </h1>

          {/* Sub-headline / Slogan Utama */}
          <p className="text-base sm:text-lg font-bold uppercase tracking-wider text-stone-200">
            Born from the streets, built for the culture.
          </p>

          {/* Paragraf Deskripsi */}
          <p className="text-sm sm:text-base leading-relaxed text-stone-400">
            PASSIVE.WEAR is an independent streetwear label that blends minimal aesthetics,
            everyday movement, and street culture into timeless pieces. We create clothing for
            those who move differently — effortless, expressive, and unapologetically themselves.
          </p>

          {/* Tagline Dinamis (Aksen Merah Brand) */}
          <div className="pt-2">
            <p className="font-mono text-base sm:text-lg font-black uppercase tracking-widest text-[#D90429]">
              {BRAND.tagline}
            </p>
          </div>

          {/* Closing Tagline */}
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-stone-500 border-l-2 border-[#D90429] pl-3 py-0.5">
            Stay passive. Move different.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 bg-[#D90429] hover:bg-[#b00320] text-white font-extrabold px-6 py-3.5 rounded text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#D90429]/20"
            >
              LIHAT KATALOG ARTIKEL <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-bold px-6 py-3.5 rounded text-xs tracking-wider uppercase transition-all"
            >
              INSTAGRAM <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* ABOUT & MANIFESTO */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-20 border-b border-stone-800/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#D90429] uppercase tracking-widest">// BRAND MANIFESTO</span>
              <h2 className="text-3xl font-black text-stone-100 uppercase tracking-tight">
                QUALITY OVER MASS PRODUCTION.
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm font-sans leading-relaxed">
                Setiap artikel yang diproduksi oleh {BRAND.name} melalui tahapan seleksi material kain berkualitas tinggi seperti 20s & 16s Heavyweight Cotton dengan pemotongan *Boxy Fit*. Kami tidak memproduksi secara massal, melainkan berbasis batch sistematis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-900/40 border border-stone-800 p-5 rounded">
                <Layers className="w-6 h-6 text-[#D90429] mb-3" />
                <h3 className="font-bold text-stone-200 text-xs uppercase mb-1">Heavyweight Fabric</h3>
                <p className="text-[11px] text-stone-500 font-sans">Gramasi 230 - 260 GSM pre-shrunk cotton.</p>
              </div>

              <div className="bg-stone-900/40 border border-stone-800 p-5 rounded">
                <ShieldCheck className="w-6 h-6 text-[#D90429] mb-3" />
                <h3 className="font-bold text-stone-200 text-xs uppercase mb-1">Strict QC</h3>
                <p className="text-[11px] text-stone-500 font-sans">Pemeriksaan detail jahitan & ketahanan sablon.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHIVE / KATALOG ARTIKEL */}
        <section id="catalog" className="max-w-6xl mx-auto px-6 py-20 border-b border-stone-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#D90429] uppercase tracking-widest">// ARCHIVE & DROPS</span>
              <h2 className="text-3xl font-black text-stone-100 uppercase tracking-tight mt-1">KATALOG ARTIKEL BRAND</h2>
            </div>
            <p className="text-xs text-stone-500 font-sans mt-2 md:mt-0">Daftar artikel yang dirilis & dikelola secara eksklusif.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_PRODUCTS.map((item) => (
              <div key={item.id} className="bg-stone-900/30 border border-stone-800 rounded-lg p-6 space-y-4 hover:border-stone-700 transition-all">
                <div className="aspect-video bg-stone-950 border border-stone-800/80 rounded flex items-center justify-center relative overflow-hidden">
                  <span className="text-stone-700 text-xs font-bold">[ MOCKUP ARTIKEL: {item.title} ]</span>
                  <span className="absolute top-3 left-3 bg-stone-900 border border-stone-800 px-2 py-1 text-[10px] text-stone-400 font-mono">
                    {item.id}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-stone-100 uppercase">{item.title}</h3>
                    <span className="text-[10px] bg-[#D90429]/10 border border-[#D90429]/30 text-[#D90429] px-2 py-0.5 rounded font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-sans mt-2">{item.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2 font-extrabold text-stone-400">
            <Flame className="w-4 h-4 text-[#D90429]" />
            <span>{BRAND.name}</span>
          </div>

          <p className="font-sans">© {BRAND.established} {BRAND.name}. All Rights Reserved.</p>

          <Link href="/admin/login" className="hover:text-stone-400 flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#D90429]" /> Admin Portal
          </Link>
        </footer>

      </main>
    </div>
  );
}