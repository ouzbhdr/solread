"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SolJetonPaywall } from "@/components/sol-jeton/paywall";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Coins, ChevronLeft, Calendar, User, CheckCircle2, ArrowLeft } from "lucide-react";

// Mock metadata to display details on the client
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
  }
> = {
  "solana-future": {
    title: "The Future of Solana and the Firedancer Update",
    teaser: "Solana is one of the fastest networks in the blockchain world, capable of executing tens of thousands of transactions per second (TPS). However, with the upcoming Firedancer update, things are about to change completely...",
    priceSOL: 0.01,
    readTime: "4 min read",
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7", // Default mock recipient (devnet)
    author: "Solana Guru",
    date: "Jun 22, 2026",
  },
  "web3-monetization": {
    title: "Web3 Content Creation: Subscription or Micropayments?",
    teaser: "For years, content creators have depended on advertising revenues or monthly subscription models like Substack. However, micropayments (pay-per-content) are opening a brand new era...",
    priceSOL: 0.005,
    readTime: "3 min read",
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7",
    author: "Web3 Builder",
    date: "Jun 21, 2026",
  },
};

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;

  const article = ARTICLES_METADATA[id];
  const [unlockedContent, setUnlockedContent] = useState<string | null>(null);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold font-mono text-red-500 mb-4">ERROR: ARTICLE NOT FOUND</h2>
        <Link href="/" className="text-purple-400 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to SolRead
        </Link>
      </div>
    );
  }

  const handleUnlocked = (premiumContent: string) => {
    setUnlockedContent(premiumContent);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"></div>

      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Header */}
      <header className="border-b border-purple-900/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
            <span className="text-lg font-black tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              SOLREAD
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !py-2.5 !px-5 !font-mono !font-bold !text-sm !transition-all" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full relative z-10">
        <article className="flex flex-col gap-6">
          {/* Article Info */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-100">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 border-b border-slate-900 pb-4">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.date}</span>
              </div>
              <div className="ml-auto px-2.5 py-1 bg-purple-950/40 border border-purple-900/30 rounded-md text-purple-400">
                {article.readTime}
              </div>
            </div>
          </div>

          {/* Teaser Content (Always visible) */}
          <div className="text-base md:text-lg leading-relaxed text-slate-300 font-sans">
            <p>{article.teaser}</p>
          </div>

          {/* Locked / Unlocked Content State */}
          {!unlockedContent ? (
            <div className="my-8 relative">
              {/* Blur effect representing hidden content */}
              <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
              <div className="text-slate-700 select-none blur-[6px] space-y-4 leading-relaxed pointer-events-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                </p>
                <p>
                  Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
                </p>
              </div>

              {/* SolJeton Paywall Widget */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pt-8">
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
            <div className="my-6 p-6 md:p-8 bg-slate-900/40 border border-green-900/50 rounded-2xl animate-fade-in relative shadow-[0_0_30px_rgba(34,197,94,0.05)]">
              {/* CRT glow effect */}
              <div className="absolute inset-0 border border-green-500/20 rounded-2xl pointer-events-none"></div>

              {/* Unlocked banner */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950/50 border border-green-800/50 rounded-full text-xs font-mono text-green-400 mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CONTENT UNLOCKED WITH SOLJETON</span>
              </div>

              {/* Real premium content */}
              <div className="text-base md:text-lg leading-relaxed text-slate-100 font-sans space-y-4">
                <p className="border-l-4 border-green-500 pl-4 italic text-slate-400 text-sm md:text-base font-mono mb-6">
                  This section was loaded from the secure server after your payment was verified on the Solana blockchain.
                </p>
                <p className="whitespace-pre-line">{unlockedContent}</p>
              </div>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-950/30 bg-slate-950/90 py-8 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 SOLREAD & SOLJETON. All Rights Reserved. Devnet Demo.</p>
      </footer>
    </div>
  );
}
