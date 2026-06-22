"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { SolJetonPaywall } from "@/components/sol-jeton/paywall";

// Mock metadata (must match other parts)
const ARTICLES_METADATA: Record<
  string,
  {
    priceSOL: number;
    recipient: string;
  }
> = {
  "solana-future": {
    priceSOL: 0.01,
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7",
  },
  "web3-monetization": {
    priceSOL: 0.005,
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7",
  },
};

export default function EmbedPage() {
  const params = useParams();
  const id = params.id as string;
  const article = ARTICLES_METADATA[id];
  const [unlockedContent, setUnlockedContent] = useState<string | null>(null);

  if (!article) {
    return (
      <div className="bg-slate-950 text-slate-400 font-mono text-xs p-4 border border-red-500 rounded-lg flex items-center justify-center h-screen">
        HATA: GEÇERSİZ İÇERİK ID
      </div>
    );
  }

  const handleUnlocked = (premiumContent: string) => {
    setUnlockedContent(premiumContent);
    
    // Notify parent page if they want to handle the unlock state on their side
    if (typeof window !== "undefined" && window.parent) {
      window.parent.postMessage(
        {
          type: "SOL_JETON_UNLOCKED",
          articleId: id,
          content: premiumContent,
        },
        "*"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-2">
      {!unlockedContent ? (
        <SolJetonPaywall
          articleId={id}
          priceSOL={article.priceSOL}
          recipientAddress={article.recipient}
          onUnlocked={handleUnlocked}
        />
      ) : (
        <div className="w-full max-w-lg bg-slate-900 border-2 border-green-500 rounded-2xl p-6 shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-fade-in text-slate-100 relative">
          {/* CRT scanline glow */}
          <div className="absolute inset-0 border border-green-500/10 rounded-2xl pointer-events-none"></div>
          
          <div className="text-xs font-mono text-green-400 border-b border-green-950 pb-2 mb-4 uppercase tracking-widest flex justify-between items-center">
            <span>SolJeton Unlocked</span>
            <span className="text-[10px] bg-green-950 px-2 py-0.5 rounded border border-green-800">
              Verified
            </span>
          </div>
          
          <p className="text-sm leading-relaxed whitespace-pre-line text-slate-200">
            {unlockedContent}
          </p>
        </div>
      )}
    </div>
  );
}
