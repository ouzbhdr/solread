"use client";

import React from "react";
import { Header } from "@/components/header";
import {
  Map,
  CheckCircle2,
  Clock,
  Sparkles,
  Link as LinkIcon,
  Code2,
  Globe,
  Milestone,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function RoadmapPage() {
  const currentDomain = typeof window !== "undefined" ? window.location.origin : "https://solread.vercel.app";

  const timeline = [
    {
      phase: "Phase 1: Proof of Concept & MVP",
      time: "Q2 2026",
      status: "completed",
      items: [
        "Create responsive Web3 retro cyberpunk portal (SolRead)",
        "Build SolJeton Paywall component supporting browser wallets & mobile Solana Pay QR codes",
        "Implement stateless Devnet transaction verification API via directly polling Devnet ledger logs",
        "Add client-side local cache for unlocked premium content (Payment Memory) to prevent double paying",
        "Add chronicle drafting editor (/write) saving articles locally to preview the creator monetization loop",
        "Create reader library & stats dashboard profile page (/profile)",
      ],
    },
    {
      phase: "Phase 2: Decentralized Storage & Mainnet",
      time: "Q3 2026",
      status: "in-progress",
      items: [
        "Store published articles permanently and censorship-resistant on Arweave / IPFS using Pinata or Bundlr",
        "Transition verify API to Solana Mainnet with dual custom token billing options (USDC, BONK, stablecoins)",
        "Implement cryptographic validation tokens (JWT/Web3 signatures) in widget.js to secure content delivery",
        "Embed paywall customizations (custom themes, fonts, colors) dynamically loaded via widget config",
      ],
    },
    {
      phase: "Phase 3: Creator Analytics & SaaS Panel",
      time: "Q4 2026",
      status: "planned",
      items: [
        "Develop web publisher panel to view real-time unlocking graphs, subscriber traffic, and SOL earnings",
        "Introduce smart contract subscriptions (recurring micropayments powered by Solana stream protocols)",
        "Establish an embed preview simulator allowing creators to test their widget layouts live in browser",
      ],
    },
    {
      phase: "Phase 4: Developer Ecosystem & DAO",
      time: "2027+",
      status: "planned",
      items: [
        "Release SolJeton React, Vue, and WordPress plugins for zero-code integration by non-crypto developers",
        "Deploy a 1% network fee protocol contract feeding a developer grant treasury",
        "Initiate a DAO governance token model giving active creators vote shares in monetization protocol parameters",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/60 border border-purple-800/40 rounded-full text-xs font-mono text-purple-400">
            <Milestone className="w-3.5 h-3.5" />
            <span>SOLREAD & SOLJETON ROADMAP</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Development Journey
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Our strategic vision to transform SolRead into a fully decentralized publication hub and scale SolJeton into a Web3-wide micropayments standard.
          </p>
        </div>

        {/* Live Deployments & Repository Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 md:p-8 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none" />
          <h3 className="text-sm font-bold font-mono tracking-widest text-slate-300 uppercase mb-6 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            Live Deployment & Codebase
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Vercel Deploy Link */}
            <a
              href={currentDomain}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/50 p-4 rounded-2xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-950/60 border border-purple-900/50 rounded-xl group-hover:bg-purple-600/10 transition-colors">
                  <LinkIcon className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide">Live Portal Vercel</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 max-w-[200px] sm:max-w-none truncate">{currentDomain}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/ouzbhdr/solread"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/50 p-4 rounded-2xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-950/60 border border-purple-900/50 rounded-xl group-hover:bg-purple-600/10 transition-colors">
                  <Code2 className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide">GitHub Repository</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">github.com/ouzbhdr/solread</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-12">
          {timeline.map((phase, idx) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in-progress";

            return (
              <div key={idx} className="relative pl-8 md:pl-10 group">
                {/* Connector Dot */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full border-4 transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 border-slate-950 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                      : isInProgress
                      ? "bg-purple-600 border-slate-950 shadow-[0_0_10px_rgba(168,85,247,0.6)] animate-pulse"
                      : "bg-slate-800 border-slate-950"
                  }`}
                />

                {/* Phase Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-base font-bold text-slate-200">{phase.phase}</h3>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800 rounded-full px-2.5 py-1">
                    {phase.time}
                  </span>
                  
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-green-950/60 border border-green-800/40 text-green-400">
                      <CheckCircle2 className="w-3 h-3" /> COMPLETED
                    </span>
                  ) : isInProgress ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-950/60 border border-purple-800/40 text-purple-400 animate-pulse">
                      <Clock className="w-3 h-3" /> IN PROGRESS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-500">
                      <Sparkles className="w-3 h-3" /> PLANNED
                    </span>
                  )}
                </div>

                {/* Phase Items Card */}
                <div className="bg-slate-900/30 border border-slate-900 hover:border-slate-800/60 transition-colors p-6 rounded-2xl">
                  <ul className="space-y-3">
                    {phase.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${isInProgress ? "bg-purple-500 animate-pulse" : "bg-slate-700"}`} />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80 py-6 text-center text-xs text-slate-600 font-mono">
        © 2026 SolRead & SolJeton · Powered by Solana Devnet
      </footer>
    </div>
  );
}
