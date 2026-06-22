"use client";

import React, { useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
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
    recipient: "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR",
  },
  "web3-monetization": {
    priceSOL: 0.005,
    recipient: "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR",
  },
};

function EmbedContent() {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();

  const queryPrice = searchParams.get("price");
  const queryRecipient = searchParams.get("recipient");
  const queryToken = searchParams.get("token") || "SOL";

  const [unlockedContent, setUnlockedContent] = useState<string | null>(null);

  // Determine metadata (Query parameters take precedence for ultimate flexibility)
  let price = queryPrice ? parseFloat(queryPrice) : null;
  let recipient = queryRecipient || null;
  let token = queryToken;

  if (!price || !recipient) {
    const article = ARTICLES_METADATA[id];
    if (article) {
      price = article.priceSOL;
      recipient = article.recipient;
    }
  }

  if (!price || !recipient) {
    return (
      <div className="bg-slate-950 text-slate-400 font-mono text-xs p-4 border border-red-500 rounded-lg flex items-center justify-center h-screen">
        ERROR: INVALID EMBED CONFIGURATION (Missing price or recipient)
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-2 w-full">
      {!unlockedContent ? (
        <SolJetonPaywall
          articleId={id}
          priceSOL={price}
          recipientAddress={recipient}
          onUnlocked={handleUnlocked}
          token={token}
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
          
          <p className="text-sm leading-relaxed whitespace-pre-line text-slate-200 font-sans">
            {unlockedContent}
          </p>
        </div>
      )}
    </div>
  );
}

export default function EmbedPage() {
  return (
    <Suspense fallback={
      <div className="bg-slate-950 text-slate-500 font-mono text-xs flex items-center justify-center h-screen">
        Loading Paywall...
      </div>
    }>
      <EmbedContent />
    </Suspense>
  );
}
