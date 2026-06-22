"use client";

import React from "react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Coins, BookOpen, ChevronRight, Terminal } from "lucide-react";

// Mock articles data for listing
const ARTICLES = [
  {
    id: "solana-future",
    title: "The Future of Solana and the Firedancer Update",
    teaser: "Solana is one of the fastest networks in the blockchain world, capable of executing tens of thousands of transactions per second (TPS). However, with the upcoming Firedancer update, things are about to change completely...",
    priceSOL: 0.01,
    readTime: "4 min read",
  },
  {
    id: "web3-monetization",
    title: "Web3 Content Creation: Subscription or Micropayments?",
    teaser: "For years, content creators have depended on advertising revenues or monthly subscription models like Substack. However, micropayments (pay-per-content) are opening a brand new era...",
    priceSOL: 0.005,
    readTime: "3 min read",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"></div>

      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Header */}
      <header className="border-b border-purple-900/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-purple-600 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:scale-105 transition-all">
              <Coins className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              SOLREAD
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !py-2.5 !px-5 !font-mono !font-bold !text-sm !transition-all" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-4xl mx-auto px-4 pt-16 pb-12 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/50 border border-purple-800/50 rounded-full text-xs font-mono text-purple-300">
          <Terminal className="w-3.5 h-3.5" />
          <span>FUELED BY SOLJETON PAYWALL</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
          Retro{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(168,85,247,0.3)]">
            Pay-Per-Content
          </span>{" "}
          SaaS
        </h1>
        <p className="text-lg text-slate-400 max-w-xl">
          No long sign-up forms or expensive monthly subscriptions. Pay instantly in seconds using Solana for the specific article you want to read, and unlock it immediately!
        </p>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-24 flex-1 w-full">
        <h2 className="text-xl font-bold font-mono tracking-wider text-purple-400 mb-8 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          LATEST CHRONICLES
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-4">
                  <span>{article.readTime}</span>
                  <span className="px-2.5 py-1 bg-purple-950/60 border border-purple-800/40 rounded-md text-purple-300 font-semibold">
                    {article.priceSOL} SOL
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-100 mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-3 mb-6">
                  {article.teaser}
                </p>
              </div>

              <Link
                href={`/articles/${article.id}`}
                className="w-full bg-slate-950 hover:bg-purple-600 border border-purple-900/40 hover:border-purple-600 text-purple-400 hover:text-white py-3 px-4 rounded-xl font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                UNLOCK WITH JETON
                <ChevronRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-950/30 bg-slate-950/90 py-8 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 SOLREAD & SOLJETON. All Rights Reserved. Devnet Demo.</p>
      </footer>
    </div>
  );
}
