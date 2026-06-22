"use client";

import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { QRCodeSVG } from "qrcode.react";
import { Coins, QrCode, Wallet, Lock, Loader2, CheckCircle } from "lucide-react";

interface SolJetonPaywallProps {
  articleId: string;
  priceSOL: number;
  recipientAddress: string;
  onUnlocked: (premiumContent: string) => void;
  customPremiumContent?: string;
  token?: string;
}

export const SolJetonPaywall: React.FC<SolJetonPaywallProps> = ({
  articleId,
  priceSOL,
  recipientAddress,
  onUnlocked,
  customPremiumContent,
  token = "SOL",
}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "qr">("wallet");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [solanaPayUrl, setSolanaPayUrl] = useState("");

  // Generate Solana Pay standard URL for mobile wallets
  useEffect(() => {
    // solana:<recipient>?amount=<amount>&label=<label>&message=<message>
    const label = encodeURIComponent("SolRead");
    const message = encodeURIComponent(`Unlock content: ${articleId}`);
    const url = `solana:${recipientAddress}?amount=${priceSOL}&label=${label}&message=${message}`;
    setSolanaPayUrl(url);
  }, [recipientAddress, priceSOL, articleId]);

  // Method 1: Web3 Browser Wallet Integration (Connect & Pay)
  const handleWalletPayment = async () => {
    if (!publicKey) {
      setStatusMessage("Please connect your wallet first.");
      return;
    }

    try {
      setIsLoading(true);
      setStatusMessage("Preparing transaction...");

      const lamportsToSend = token === "SOL"
        ? priceSOL * LAMPORTS_PER_SOL
        : 0.0001 * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: lamportsToSend,
        })
      );

      setStatusMessage("Waiting for wallet approval...");
      const signature = await sendTransaction(transaction, connection);

      setStatusMessage("Waiting for network confirmation (approx. 3-5s)...");
      
      // Call backend verification API with the signature
      const response = await fetch("/api/sol-jeton/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signature,
          articleId,
          recipientAddress,
          customPriceSOL: priceSOL,
          customPremiumContent: customPremiumContent,
          token: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment verification failed.");
      }

      setStatusMessage("Payment verified successfully!");
      
      // Save unlock state to localStorage for persistence
      const walletKey = publicKey ? publicKey.toBase58() : "anonymous";
      localStorage.setItem(
        `solread_unlocked_${walletKey}_${articleId}`,
        JSON.stringify({ premiumContent: data.premiumContent })
      );
      localStorage.setItem(
        `solread_unlocked_anonymous_${articleId}`,
        JSON.stringify({ premiumContent: data.premiumContent })
      );

      onUnlocked(data.premiumContent);
    } catch (error: any) {
      console.error("Payment error:", error);
      setStatusMessage(error.message || "An error occurred during payment.");
    } finally {
      setIsLoading(false);
    }
  };

  // Method 2: Manual Signature Submission (Used with Solana Pay QR)
  const [manualSignature, setManualSignature] = useState("");
  const [isVerifyingQR, setIsVerifyingQR] = useState(false);

  const handleVerifyQRPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSignature.trim()) {
      setStatusMessage("Please enter the transaction signature.");
      return;
    }

    try {
      setIsVerifyingQR(true);
      setStatusMessage("Verifying signature...");

      const response = await fetch("/api/sol-jeton/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signature: manualSignature.trim(),
          articleId,
          recipientAddress,
          customPriceSOL: priceSOL,
          customPremiumContent: customPremiumContent,
          token: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signature could not be verified.");
      }

      setStatusMessage("Payment verified successfully!");

      // Save unlock state to localStorage for persistence
      const walletKey = publicKey ? publicKey.toBase58() : "anonymous";
      localStorage.setItem(
        `solread_unlocked_${walletKey}_${articleId}`,
        JSON.stringify({ premiumContent: data.premiumContent })
      );
      localStorage.setItem(
        `solread_unlocked_anonymous_${articleId}`,
        JSON.stringify({ premiumContent: data.premiumContent })
      );

      onUnlocked(data.premiumContent);
    } catch (error: any) {
      console.error("Verification error:", error);
      setStatusMessage(error.message || "Verification failed.");
    } finally {
      setIsVerifyingQR(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border-2 border-purple-500 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)] overflow-hidden relative font-sans text-slate-100 p-6 md:p-8">
      {/* Scanline CRT overlay for retro vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"></div>

      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-full animate-pulse">
          <Lock className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold tracking-wider text-purple-300 font-mono">
          SOLJETON PAYWALL
        </h3>
        <p className="text-sm text-slate-400">
          The rest of this article is premium locked. Insert a jeton to unlock and read.
        </p>
        <div className="mt-2 px-4 py-1.5 bg-purple-500/20 border border-purple-500 rounded-full font-mono text-purple-200 font-semibold text-lg animate-bounce">
          {priceSOL} {token}
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-lg mb-6 border border-slate-800">
        <button
          onClick={() => setPaymentMethod("wallet")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            paymentMethod === "wallet"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Wallet className="w-4 h-4" />
          Browser Wallet
        </button>
        <button
          onClick={() => setPaymentMethod("qr")}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            paymentMethod === "qr"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <QrCode className="w-4 h-4" />
          Solana Pay QR
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col items-center">
        {paymentMethod === "wallet" ? (
          <div className="w-full flex flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-2 py-4">
              <Coins className="w-12 h-12 text-yellow-400 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-2">
                Insert Jeton Slot
              </span>
            </div>

            {/* Solana Adapter Custom Styled Button container */}
            <div className="wallet-btn-container w-full flex justify-center">
              <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !py-3 !px-6 !font-mono !font-bold !w-full !justify-center !text-sm !transition-all" />
            </div>

            {publicKey && (
              <button
                onClick={handleWalletPayment}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-mono font-bold text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {statusMessage.includes("confirm") ? "CONFIRMING..." : "PROCESSING..."}
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4" />
                    INSERT JETON & UNLOCK
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-5">
            <p className="text-xs text-slate-400 text-center">
              Scan the QR code with your mobile wallet (Phantom/Solflare) and approve the transaction.
            </p>

            <div className="p-4 bg-white rounded-xl border-4 border-purple-500/30">
              {solanaPayUrl ? (
                <QRCodeSVG value={solanaPayUrl} size={160} />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
              )}
            </div>

            {/* Manual Verification Form */}
            <form onSubmit={handleVerifyQRPayment} className="w-full mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Transaction Signature (Tx Hash)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualSignature}
                    onChange={(e) => setManualSignature(e.target.value)}
                    placeholder="Solana Transaction Signature"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-purple-500"
                    disabled={isVerifyingQR}
                  />
                  <button
                    type="submit"
                    disabled={isVerifyingQR || !manualSignature}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-mono px-4 rounded-lg text-xs font-bold transition-all"
                  >
                    {isVerifyingQR ? <Loader2 className="w-4 h-4 animate-spin" /> : "VERIFY"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Status Bar */}
      {statusMessage && (
        <div
          className={`mt-4 p-3 rounded-lg border text-xs font-mono flex items-center gap-2 ${
            statusMessage.includes("Hata") || statusMessage.includes("başarısız")
              ? "bg-red-950/50 border-red-800/50 text-red-300"
              : statusMessage.includes("başarıyla")
              ? "bg-green-950/50 border-green-800/50 text-green-300"
              : "bg-slate-950/50 border-slate-800/50 text-purple-300"
          }`}
        >
          {statusMessage.includes("başarıyla") ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-green-400" />
          ) : statusMessage.includes("Hata") || statusMessage.includes("başarısız") ? (
            <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          ) : (
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-purple-400" />
          )}
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
};
