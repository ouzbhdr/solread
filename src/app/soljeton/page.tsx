"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import {
  Terminal,
  Code2,
  Copy,
  Check,
  Zap,
  Lock,
  Unlock,
  Coins,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { SolJetonPaywall } from "@/components/sol-jeton/paywall";

export default function SolJetonShowcase() {
  const [articleId, setArticleId] = useState("my-first-article");
  const [priceSOL, setPriceSOL] = useState("0.005");
  const [recipient, setRecipient] = useState("YOUR_WALLET_ADDRESS");
  const [token, setToken] = useState("SOL");
  const [copied, setCopied] = useState(false);
  const [previewUnlocked, setPreviewUnlocked] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState("");

  const currentDomain = typeof window !== "undefined" ? window.location.origin : "https://solread.vercel.app";

  const generatedSnippet = `<!-- 1. Place the container where you want the paywall to render -->
<div
  data-soljeton-article="${articleId}"
  data-soljeton-price="${priceSOL}"
  data-soljeton-recipient="${recipient}"
  data-soljeton-token="${token}"
  data-soljeton-reveal-id="premium-locked-content"
  data-soljeton-domain="${currentDomain}"
></div>

<!-- 2. Import the single line embed widget script -->
<script src="${currentDomain}/widget.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/60 border border-purple-800/40 rounded-full text-xs font-mono text-purple-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>SOLANA WEB3 MONETIZATION ENGINE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            SolJeton Paywall Widget
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            The ultimate plug-and-play solution for creators. Monetize any web page, blog, or publication with sub-second Solana Devnet payments. No databases, no complex backends.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Zap,
              title: "On-Chain Instant Verification",
              desc: "Payments are checked directly against the Solana Devnet in 2-3 seconds using light web3 client parsing.",
            },
            {
              icon: Layers,
              title: "Dual Payment Options",
              desc: "Readers can pay with Phantom/Solflare browser wallets, or scan the generated QR code on mobile wallets.",
            },
            {
              icon: Coins,
              title: "100% Direct P2P Payments",
              desc: "SOL flows straight from the reader's wallet into the recipient address. Zero intermediary platform fees.",
            },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 hover:border-purple-500/30 transition-all group"
              >
                <div className="p-3 bg-purple-950/60 border border-purple-900/50 w-fit rounded-xl mb-4 group-hover:bg-purple-600/10 transition-colors">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-bold text-slate-200 mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Step 1: Design & Preview (Side-by-Side) */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          {/* Inputs Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-lg font-bold font-mono tracking-wider text-purple-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              CONFIGURE WIDGET
            </h2>
            <hr className="border-slate-800" />

            {/* Input 1: Article ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Article ID (Unique handle)
              </label>
              <input
                type="text"
                value={articleId}
                onChange={(e) => setArticleId(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300 transition-colors"
                placeholder="e.g. solana-deep-dive"
              />
            </div>

            {/* Input 2: Price in SOL/USDC */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Article Price
              </label>
              <input
                type="number"
                step="0.0001"
                value={priceSOL}
                onChange={(e) => setPriceSOL(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300 transition-colors"
                placeholder="e.g. 0.005"
              />
            </div>

            {/* Input: Payment Token */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Payment Token / Coin
              </label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300 cursor-pointer"
              >
                <option value="SOL">SOL (Solana)</option>
                <option value="USDC">USDC (USD Coin)</option>
                <option value="USDG">USDG (USD Gate stablecoin)</option>
              </select>
            </div>

            {/* Input 3: Recipient Wallet Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Recipient Wallet Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300 transition-colors"
                placeholder="Solana Wallet Public Key"
              />
            </div>
            
            <div className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl text-[10px] font-mono text-purple-400 leading-relaxed">
              💡 Use any devnet wallet. Readers will send the exact SOL price to this address to verify on-chain transaction logs.
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col gap-5">
            <div>
              <h3 className="text-lg font-bold font-mono tracking-wider text-purple-300 uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                LIVE PREVIEW
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                See exactly how the paywall behaves on your visitors&apos; screens.
              </p>
            </div>
            <hr className="border-slate-800" />
            
            {previewUnlocked ? (
              <div className="bg-green-950/20 border border-green-800/40 rounded-xl p-6 text-center flex flex-col gap-3 items-center">
                <Unlock className="w-8 h-8 text-green-400 animate-bounce" />
                <h4 className="font-bold text-green-400 font-mono text-sm">CONTENT UNLOCKED!</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {unlockedContent || "🎉 Success! This is your premium locked content revealed automatically."}
                </p>
                <button 
                  onClick={() => {
                    setPreviewUnlocked(false);
                    setUnlockedContent("");
                  }}
                  className="mt-2 text-xs font-mono text-purple-400 hover:text-purple-300 underline cursor-pointer"
                >
                  Reset Lock Demo
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-center py-2">
                <SolJetonPaywall
                  articleId={articleId}
                  priceSOL={parseFloat(priceSOL) || 0.005}
                  recipientAddress={recipient === "YOUR_WALLET_ADDRESS" || !recipient.trim() ? "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR" : recipient}
                  token={token}
                  onUnlocked={(content) => {
                    setPreviewUnlocked(true);
                    setUnlockedContent(content);
                  }}
                  customPremiumContent="🎉 Success! This is your premium locked content revealed automatically."
                />
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Grab Code & Learn Integration */}
        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Code Output Panel (3/5 size) */}
          <div className="md:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/40">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono text-slate-400">widget-snippet.html</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 border border-slate-700 hover:border-purple-500 text-slate-400 hover:text-purple-300 text-xs font-mono transition-all"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied!" : "Copy Snippet"}
              </button>
            </div>

            {/* Code display */}
            <pre className="p-6 text-xs font-mono overflow-x-auto leading-relaxed max-h-[350px]">
              <code>
                <span className="text-slate-600">{"<!-- 1. Place the container where you want the paywall to render -->"}</span>{"\n"}
                <span className="text-slate-400">{"<"}</span>
                <span className="text-pink-400">{"div"}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-article"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{`"${articleId}"`}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-price"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{`"${priceSOL}"`}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-recipient"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{`"${recipient}"`}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-token"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{`"${token}"`}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-reveal-id"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{'"premium-locked-content"'}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-domain"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{`"${currentDomain}"`}</span>{"\n"}
                <span className="text-slate-400">{"></div>"}</span>{"\n\n"}
                <span className="text-slate-600">{"<!-- 2. Import the single line embed widget script -->"}</span>{"\n"}
                <span className="text-slate-400">{"<"}</span>
                <span className="text-pink-400">{"script"}</span>{" "}
                <span className="text-purple-300">{"src"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{`"${currentDomain}/widget.js"`}</span>
                <span className="text-slate-400">{"></"}</span>
                <span className="text-pink-400">{"script"}</span>
                <span className="text-slate-400">{">"}</span>
              </code>
            </pre>
          </div>

          {/* Integration Guide (2/5 size) */}
          <div className="md:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h4 className="font-mono font-bold text-xs text-slate-300 mb-2 uppercase tracking-wide">
              How Integration Works
            </h4>
            <ol className="list-decimal list-inside text-xs text-slate-500 space-y-2.5">
              <li>
                Place a <code className="text-slate-400 bg-slate-950 px-1 py-0.5 rounded font-mono">{"<div>"}</code> container inside your article flow right where the paywall should appear.
              </li>
              <li>
                Set the actual premium content section on your page to have the ID matching <code className="text-slate-400 bg-slate-950 px-1 py-0.5 rounded font-mono">{"data-soljeton-reveal-id"}</code> (e.g. <code className="text-slate-400 bg-slate-950 px-1 py-0.5 rounded font-mono">{"id=\"premium-locked-content\""}</code>). Style it with <code className="text-slate-400 bg-slate-950 px-1 py-0.5 rounded font-mono">{"display: none"}</code> by default.
              </li>
              <li>
                Inject the <code className="text-slate-400 bg-slate-950 px-1 py-0.5 rounded font-mono">{"widget.js"}</code> script. It automatically finds the paywall placeholder, initializes the secure payment iframe, and displays the content instantly upon verified transaction.
              </li>
            </ol>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80 py-6 text-center text-xs text-slate-600 font-mono">
        © 2026 SolRead & SolJeton · Powered by Solana Devnet
      </footer>
    </div>
  );
}
