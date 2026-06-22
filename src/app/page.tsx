"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import {
  Coins,
  BookOpen,
  ChevronRight,
  Terminal,
  Code2,
  Copy,
  Check,
  Zap,
  Globe,
  Lock,
  Unlock,
  User,
  Calendar,
} from "lucide-react";

const ARTICLES = [
  {
    id: "solana-future",
    title: "The Future of Solana and the Firedancer Update",
    teaser:
      "Solana is one of the fastest networks in the blockchain world, capable of executing tens of thousands of transactions per second. With the upcoming Firedancer update, things are about to change completely...",
    priceSOL: 0.01,
    readTime: "4 min read",
    tag: "Infrastructure",
  },
  {
    id: "web3-monetization",
    title: "Web3 Content Creation: Subscription or Micropayments?",
    teaser:
      "For years, content creators have depended on advertising revenues or monthly subscription models. However, micropayments (pay-per-content) are opening a brand new era for digital publishing...",
    priceSOL: 0.005,
    readTime: "3 min read",
    tag: "Business",
  },
];

const WIDGET_SNIPPET = `<!-- 1. Paywall container -->
<div
  data-soljeton-article="solana-future"
  data-soljeton-price="0.01"
  data-soljeton-recipient="YOUR_WALLET_ADDRESS"
  data-soljeton-reveal-id="premium-content"
  data-soljeton-domain="https://solread.vercel.app">
</div>

<!-- 2. SolJeton Widget (single line) -->
<script src="https://solread.vercel.app/widget.js"></script>`;

const HOW_IT_WORKS = [
  {
    icon: Code2,
    title: "Embed One Snippet",
    desc: "Add a single <div> placeholder and one <script> tag to any website — WordPress, Webflow, custom HTML.",
    color: "purple",
  },
  {
    icon: Lock,
    title: "Content Gets Locked",
    desc: "SolJeton renders an elegant paywall over your premium content automatically. No backend changes needed.",
    color: "pink",
  },
  {
    icon: Zap,
    title: "Reader Pays via Solana",
    desc: "Reader connects their Phantom/Solflare wallet and pays a micro-amount of SOL (e.g. 0.01 SOL ≈ $1.5).",
    color: "yellow",
  },
  {
    icon: Unlock,
    title: "Content Unlocks Instantly",
    desc: "Payment is verified on-chain in seconds. Premium content appears automatically — no page reload.",
    color: "green",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 border border-slate-700 hover:border-purple-500 text-slate-400 hover:text-purple-300 text-xs font-mono transition-all"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function Home() {
  const [floatingY, setFloatingY] = useState(0);
  const [articlesList, setArticlesList] = useState<any[]>(ARTICLES);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      setFloatingY(Math.sin(t * 0.8) * 8);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Merge built-in articles with custom user articles from localStorage
  useEffect(() => {
    const localArticles = localStorage.getItem("solread_custom_articles");
    if (localArticles) {
      try {
        const parsed = JSON.parse(localArticles);
        if (Array.isArray(parsed)) {
          // Prepend custom articles so they appear first
          setArticlesList([...parsed, ...ARTICLES]);
        }
      } catch (e) {
        console.error("Failed to parse custom articles", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">

      {/* Animated gradient orbs background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Scanline CRT overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_3px] z-10" />

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)] opacity-60" />

      {/* ── HEADER ── */}
      <Header />

      {/* ── HERO ── */}
      <section className="relative z-20 max-w-5xl mx-auto px-4 pt-20 pb-16 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-950/60 border border-purple-700/50 rounded-full text-xs font-mono text-purple-300 backdrop-blur-sm">
          <Terminal className="w-3.5 h-3.5" />
          <span>POWERED BY SOLJETON PAYWALL WIDGET</span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-black tracking-tight leading-none"
          style={{ transform: `translateY(${floatingY * 0.15}px)` }}
        >
          <span className="text-slate-100">Read Premium.</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            Pay Per Article.
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          No subscriptions. No sign-ups. Connect your Solana wallet and pay micro-amounts
          to instantly unlock premium articles — or embed the{" "}
          <span className="text-purple-400 font-mono font-semibold">SolJeton widget</span>{" "}
          on your own site with a single line of code.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <a
            href="#articles"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-mono font-bold text-sm transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] hover:-translate-y-0.5"
          >
            Read Articles →
          </a>
          <a
            href="#embed"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-xl font-mono font-bold text-sm text-slate-300 hover:text-white transition-all hover:-translate-y-0.5"
          >
            Embed on Your Site
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-6 text-center">
          {[
            { value: "~0.01 SOL", label: "Per Article" },
            { value: "&lt;3s", label: "Unlock Time" },
            { value: "1 Line", label: "To Embed" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span
                className="text-2xl font-black font-mono bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                dangerouslySetInnerHTML={{ __html: s.value }}
              />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section id="articles" className="relative z-20 max-w-5xl mx-auto px-4 pb-20 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-900/40 rounded-lg border border-purple-800/40">
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <h2 className="text-sm font-bold font-mono tracking-widest text-purple-400 uppercase">
            Latest Chronicles
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-800/50 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {articlesList.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:via-purple-600/3 group-hover:to-pink-600/5 transition-all duration-500" />

              {/* Top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/60 transition-all duration-500 rounded-t-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
                    {article.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-500">{article.readTime}</span>
                    <span className="px-2.5 py-1 bg-purple-950/80 border border-purple-800/50 rounded-lg text-purple-300 font-mono font-bold text-xs group-hover:bg-purple-600/20 group-hover:border-purple-600/50 transition-all">
                      {article.priceSOL} SOL
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold tracking-tight text-slate-100 mb-3 leading-snug group-hover:text-white transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-400 transition-colors mb-4">
                  {article.teaser}
                </p>

                {article.author && (
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    {article.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="relative mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                  <Lock className="w-3 h-3" />
                  <span>Premium locked</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span>Unlock with Jeton</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-20 w-full border-t border-slate-800/50 bg-slate-900/20 backdrop-blur-sm py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-full text-xs font-mono text-slate-400 mb-4">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>FOR PUBLISHERS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-100 mb-3">
              Embed on Any Website
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              SolJeton is a drop-in paywall widget. Add it to any existing site without changing your backend or infrastructure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              const colors: Record<string, string> = {
                purple: "from-purple-500/10 border-purple-800/40 text-purple-400",
                pink: "from-pink-500/10 border-pink-800/40 text-pink-400",
                yellow: "from-yellow-500/10 border-yellow-800/40 text-yellow-400",
                green: "from-green-500/10 border-green-800/40 text-green-400",
              };
              const cls = colors[step.color];
              return (
                <div
                  key={i}
                  className={`relative bg-gradient-to-b ${cls.split(" ")[0]} to-transparent border ${cls.split(" ")[1]} rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${cls.split(" ")[2]}`} />
                    <span className="text-xs font-mono text-slate-600">0{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-200 text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Code snippet */}
          <div id="embed" className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono text-slate-500">your-blog.html</span>
              </div>
              <CopyButton text={WIDGET_SNIPPET} />
            </div>
            <pre className="p-5 text-sm font-mono overflow-x-auto leading-relaxed">
              <code>
                <span className="text-slate-600">{"<!-- 1. Paywall container -->"}</span>{"\n"}
                <span className="text-slate-400">{"<"}</span>
                <span className="text-pink-400">{"div"}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-article"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{'"solana-future"'}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-price"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{'"0.01"'}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-recipient"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{'"YOUR_WALLET_ADDRESS"'}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-reveal-id"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{'"premium-content"'}</span>{"\n"}
                {"  "}
                <span className="text-purple-300">{"data-soljeton-domain"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{'"https://solread.vercel.app"'}</span>
                <span className="text-slate-400">{">"}</span>
                <span className="text-slate-400">{"</"}
                <span className="text-pink-400">div</span>{">"}</span>{"\n\n"}
                <span className="text-slate-600">{"<!-- 2. SolJeton Widget (single line) -->"}</span>{"\n"}
                <span className="text-slate-400">{"<"}</span>
                <span className="text-pink-400">{"script"}</span>{" "}
                <span className="text-purple-300">{"src"}</span>
                <span className="text-slate-400">{"="}</span>
                <span className="text-yellow-300">{'"https://solread.vercel.app/widget.js"'}</span>
                <span className="text-slate-400">{">"}</span>
                <span className="text-slate-400">{"</"}</span>
                <span className="text-pink-400">{"script"}</span>
                <span className="text-slate-400">{">"}</span>
              </code>
            </pre>
          </div>

          <p className="text-center text-xs font-mono text-slate-600 mt-4">
            That&apos;s it. Two lines. No API keys. No backend. Works on any site.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 border-t border-slate-800/50 bg-slate-950/80 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-600/20 rounded-lg border border-purple-800/30">
              <Coins className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-sm font-mono font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SOLREAD
            </span>
          </div>
          <p className="text-xs font-mono text-slate-600">
            © 2026 SolRead & SolJeton · Powered by Solana Devnet
          </p>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
