"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SolJetonPaywall } from "@/components/sol-jeton/paywall";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Coins, ChevronLeft, Calendar, User, CheckCircle2, ArrowLeft, Lock } from "lucide-react";

const ARTICLES_METADATA: Record<
  string,
  {
    title: string;
    teaser: string;
    priceSOL: number;
    readTime: string;
    recipient: string;
    author: string;
    date: string;
    tag: string;
  }
> = {
  "solana-future": {
    title: "The Future of Solana and the Firedancer Update",
    teaser: "Solana is one of the fastest networks in the blockchain world, capable of executing tens of thousands of transactions per second (TPS). However, with the upcoming Firedancer update, things are about to change completely...",
    priceSOL: 0.01,
    readTime: "4 min read",
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7",
    author: "Solana Guru",
    date: "Jun 22, 2026",
    tag: "Infrastructure",
  },
  "web3-monetization": {
    title: "Web3 Content Creation: Subscription or Micropayments?",
    teaser: "For years, content creators have depended on advertising revenues or monthly subscription models like Substack. However, micropayments (pay-per-content) are opening a brand new era...",
    priceSOL: 0.005,
    readTime: "3 min read",
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7",
    author: "Web3 Builder",
    date: "Jun 21, 2026",
    tag: "Business",
  },
};

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;

  const article = ARTICLES_METADATA[id];
  const [unlockedContent, setUnlockedContent] = useState<string | null>(null);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 gap-4">
        <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-2xl text-center">
          <h2 className="text-xl font-bold font-mono text-red-400 mb-2">ERROR: ARTICLE NOT FOUND</h2>
          <p className="text-sm text-slate-500">The article you&apos;re looking for doesn&apos;t exist.</p>
        </div>
        <Link href="/" className="text-purple-400 hover:underline flex items-center gap-2 text-sm font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to SolRead
        </Link>
      </div>
    );
  }

  const handleUnlocked = (premiumContent: string) => {
    setUnlockedContent(premiumContent);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_3px]" />

      {/* Header */}
      <header className="border-b border-purple-900/40 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
            <div className="p-1.5 bg-purple-600/20 rounded-lg border border-purple-800/30">
              <Coins className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-base font-black tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              SOLREAD
            </span>
          </Link>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-500 !rounded-xl !py-2 !px-4 !font-mono !font-bold !text-sm !transition-all !shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-10 flex-1 w-full">
        <article className="flex flex-col gap-6">

          {/* Tag + meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
              {article.tag}
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{article.date}</span>
              </div>
              <span className="ml-auto px-2 py-0.5 bg-purple-950/60 border border-purple-900/40 rounded text-purple-400">
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-slate-100">
            {article.title}
          </h1>

          {/* Teaser */}
          <div className="text-base leading-relaxed text-slate-300 border-l-2 border-purple-800/50 pl-4">
            <p>{article.teaser}</p>
          </div>

          <hr className="border-slate-800" />

          {/* Locked / Unlocked Content State */}
          {!unlockedContent ? (
            <div className="flex flex-col gap-6">
              {/* Blurred preview lines */}
              <div className="relative overflow-hidden rounded-xl">
                <div className="space-y-3 blur-sm select-none pointer-events-none opacity-40 p-4 bg-slate-900/30 rounded-xl border border-slate-800">
                  <div className="h-3 bg-slate-600 rounded w-full" />
                  <div className="h-3 bg-slate-600 rounded w-5/6" />
                  <div className="h-3 bg-slate-600 rounded w-4/6" />
                  <div className="h-3 bg-slate-600 rounded w-full" />
                  <div className="h-3 bg-slate-600 rounded w-3/4" />
                  <div className="h-3 bg-slate-600 rounded w-5/6" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-full text-xs font-mono text-slate-400 backdrop-blur-sm">
                    <Lock className="w-3.5 h-3.5 text-purple-400" />
                    Premium content is locked
                  </div>
                </div>
              </div>

              {/* Paywall Widget — in normal document flow, not absolute */}
              <div className="w-full">
                <SolJetonPaywall
                  articleId={id}
                  priceSOL={article.priceSOL}
                  recipientAddress={article.recipient}
                  onUnlocked={handleUnlocked}
                />
              </div>
            </div>
          ) : (
            /* Unlocked Premium Content */
            <div className="p-6 md:p-8 bg-slate-900/40 border border-green-900/50 rounded-2xl relative">
              <div className="absolute inset-0 border border-green-500/10 rounded-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950/50 border border-green-800/50 rounded-full text-xs font-mono text-green-400 mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CONTENT UNLOCKED WITH SOLJETON</span>
              </div>

              <div className="text-base leading-relaxed text-slate-100 font-sans space-y-4">
                <p className="border-l-4 border-green-500 pl-4 italic text-slate-400 text-sm font-mono mb-6">
                  This section was decrypted and delivered after your payment was verified on the Solana blockchain.
                </p>
                <p className="whitespace-pre-line">{unlockedContent}</p>
              </div>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80 py-6 text-center text-xs text-slate-600 font-mono">
        © 2026 SolRead & SolJeton · Powered by Solana Devnet
      </footer>
    </div>
  );
}
