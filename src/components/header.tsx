"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Coins, BookOpen, Terminal, Edit3, User } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Articles", icon: BookOpen },
    { href: "/soljeton", label: "SolJeton Widget", icon: Terminal },
    { href: "/write", label: "Write", icon: Edit3 },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="border-b border-purple-900/40 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between flex-wrap gap-3 sm:flex-nowrap">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="p-1.5 bg-purple-600 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all duration-300">
            <Coins className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
            SOLREAD
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? "bg-purple-900/40 border border-purple-800/60 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Wallet + Network */}
        <div className="flex items-center gap-3 shrink-0 ml-auto sm:ml-0">
          <span className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800 rounded-full px-2.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Devnet
          </span>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-500 !rounded-xl !py-1.5 !px-3.5 !font-mono !font-bold !text-xs !transition-all !shadow-[0_0_10px_rgba(147,51,234,0.3)]" />
        </div>
      </div>
    </header>
  );
}
