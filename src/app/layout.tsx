import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SolJetonWalletProvider } from "@/components/sol-jeton/wallet-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolRead - Retro Solana Pay-Per-Content Portal",
  description: "Read premium articles by paying micro-amounts instantly using SolJeton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-purple-600 selection:text-white">
        <SolJetonWalletProvider>{children}</SolJetonWalletProvider>
      </body>
    </html>
  );
}

