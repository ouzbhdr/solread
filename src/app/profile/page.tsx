"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  User,
  Unlock,
  Coins,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// Fallback metadata for built-in articles to resolve titles/prices
const BUILT_IN_METADATA: Record<string, { title: string; priceSOL: number; author: string; tag: string }> = {
  "solana-future": {
    title: "The Future of Solana and the Firedancer Update",
    priceSOL: 0.01,
    author: "Solana Guru",
    tag: "Infrastructure",
  },
  "web3-monetization": {
    title: "Web3 Content Creation: Subscription or Micropayments?",
    priceSOL: 0.005,
    author: "Web3 Builder",
    tag: "Business",
  },
};

export default function UserProfile() {
  const { publicKey, connected } = useWallet();
  const [unlockedArticles, setUnlockedArticles] = useState<any[]>([]);
  const [totalSOLSpent, setTotalSOLSpent] = useState(0);
  
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editVal, setEditVal] = useState("");

  // Load username
  useEffect(() => {
    const saved = localStorage.getItem("solread_profile_username");
    if (saved) {
      setUsername(saved);
      setEditVal(saved);
    }
  }, []);

  const saveUsername = () => {
    const trimmed = editVal.trim();
    setUsername(trimmed);
    localStorage.setItem("solread_profile_username", trimmed);
    setIsEditing(false);
  };

  useEffect(() => {
    // 1. Gather all local custom articles
    let customArticles: any[] = [];
    const localCustom = localStorage.getItem("solread_custom_articles");
    if (localCustom) {
      try {
        customArticles = JSON.parse(localCustom);
        if (!Array.isArray(customArticles)) customArticles = [];
      } catch (e) {
        customArticles = [];
      }
    }

    // 2. Identify active wallet key
    const walletKey = publicKey ? publicKey.toBase58() : "anonymous";
    const prefix = `solread_unlocked_${walletKey}_`;
    const anonPrefix = `solread_unlocked_anonymous_`;

    const unlockedList: any[] = [];
    let accumulatedSOL = 0;

    // 3. Scan localStorage keys for unlocked items
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith(prefix) || key.startsWith(anonPrefix))) {
        // Extract article ID
        let id = "";
        if (key.startsWith(prefix)) {
          id = key.substring(prefix.length);
        } else {
          id = key.substring(anonPrefix.length);
        }

        // Avoid adding duplicates (if both anonymous and wallet cached have it)
        if (unlockedList.some((item) => item.id === id)) {
          continue;
        }

        // Resolve metadata
        let metadata = BUILT_IN_METADATA[id];
        if (!metadata) {
          // Check custom articles
          const found = customArticles.find((a) => a.id === id);
          if (found) {
            metadata = {
              title: found.title,
              priceSOL: found.priceSOL,
              author: found.author,
              tag: found.tag,
            };
          }
        }

        if (metadata) {
          unlockedList.push({
            id,
            title: metadata.title,
            priceSOL: metadata.priceSOL,
            author: metadata.author,
            tag: metadata.tag,
          });
          accumulatedSOL += metadata.priceSOL;
        } else {
          // If metadata is completely missing (e.g. custom article deleted)
          unlockedList.push({
            id,
            title: `Custom Article (${id})`,
            priceSOL: 0.005,
            author: "Creator",
            tag: "Other",
          });
          accumulatedSOL += 0.005;
        }
      }
    }

    setUnlockedArticles(unlockedList);
    setTotalSOLSpent(accumulatedSOL);
  }, [publicKey, connected]);

  const shortAddress = (address: string) => {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Profile Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 md:p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none" />
          
          <div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left relative z-10">
            <div className="p-4 bg-purple-600 rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.4)]">
              <User className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2.5 justify-center sm:justify-start flex-wrap mb-1">
                {isEditing ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="text"
                      value={editVal}
                      onChange={(e) => setEditVal(e.target.value)}
                      placeholder="Username"
                      className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-sm font-mono text-slate-200 focus:outline-none focus:border-purple-500 w-36"
                    />
                    <button
                      onClick={saveUsername}
                      className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-mono font-bold cursor-pointer"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => { setEditVal(username); setIsEditing(false); }}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded text-[10px] font-mono cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                ) : (
                  <h2 className="text-xl font-bold tracking-wide text-slate-200 flex items-center gap-2 flex-wrap">
                    {username ? username : (publicKey ? shortAddress(publicKey.toBase58()) : "Guest Reader")}
                    <button
                      onClick={() => { setEditVal(username); setIsEditing(true); }}
                      className="text-[10px] text-slate-500 hover:text-purple-400 font-mono font-normal hover:underline cursor-pointer"
                    >
                      (edit)
                    </button>
                  </h2>
                )}

                {connected && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-950/60 border border-green-800/40 rounded text-[9px] font-mono text-green-400 shrink-0">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-500">
                {connected && publicKey
                  ? `SOL Wallet: ${publicKey.toBase58()}`
                  : "Wallet not connected (browsing as guest)"}
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            {!connected ? (
              <div className="wallet-btn-container">
                <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-500 !rounded-xl !py-2.5 !px-5 !font-mono !font-bold !text-xs !transition-all !shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
              </div>
            ) : (
              <div className="text-right flex flex-col items-center sm:items-end gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Active Wallet</span>
                <span className="text-sm font-mono text-purple-300 bg-purple-950/30 border border-purple-900/40 px-3 py-1 rounded-lg">
                  {publicKey ? shortAddress(publicKey.toBase58()) : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: BookOpen,
              label: "Articles Unlocked",
              value: unlockedArticles.length,
              color: "text-purple-400",
            },
            {
              icon: Coins,
              label: "SOL Invested",
              value: `${totalSOLSpent.toFixed(3)} SOL`,
              color: "text-yellow-400",
            },
            {
              icon: TrendingUp,
              label: "Solana Network",
              value: "Devnet",
              color: "text-green-400",
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{stat.label}</span>
                </div>
                <span className={`text-2xl font-black font-mono tracking-tight ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Unlocked Chronicles List */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <Unlock className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold font-mono tracking-widest text-slate-300 uppercase">
              My Unlocked Library
            </h3>
          </div>

          <hr className="border-slate-800 mb-6" />

          {unlockedArticles.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-3">
              <BookOpen className="w-10 h-10 text-slate-700" />
              <p className="text-xs font-mono text-slate-500">
                You haven&apos;t unlocked any articles yet.
              </p>
              <Link
                href="/"
                className="text-purple-400 hover:text-purple-300 font-mono text-xs hover:underline flex items-center gap-1 mt-2"
              >
                Browse Chronicles <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {unlockedArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {article.tag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600">by {article.author}</span>
                    </div>
                    <h4 className="font-bold text-slate-200 group-hover:text-purple-300 transition-colors text-sm truncate">
                      {article.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-mono font-semibold text-yellow-400 bg-yellow-950/20 border border-yellow-900/30 px-2 py-0.5 rounded">
                      {article.priceSOL} SOL
                    </span>
                    <Link
                      href={`/articles/${article.id}`}
                      className="px-3.5 py-1.5 bg-purple-600/20 hover:bg-purple-600 border border-purple-800/40 hover:border-purple-500 rounded-lg text-purple-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    >
                      Read Now
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80 py-6 text-center text-xs text-slate-600 font-mono">
        © 2026 SolRead & SolJeton · Powered by Solana Devnet
      </footer>
    </div>
  );
}
