import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";

// Content database
const ARTICLES: Record<
  string,
  {
    title: string;
    premiumContent: string;
    priceSOL: number;
  }
> = {
  "solana-future": {
    title: "The Future of Solana and the Firedancer Update",
    premiumContent: `Firedancer is a new validator client for Solana, written from scratch in C++ by Jump Crypto. It aims to break past current hardware limits of the Rust client and reach up to 1 million transactions per second.

This update will help Solana reduce outages, boost security, and enhance decentralization. Often called "Solana 2.0", this era will allow DeFi applications to execute at the speed of traditional financial exchanges.

Key improvements Firedancer brings:

→ 1,000,000+ TPS theoretical throughput (vs ~65,000 today)
→ Independent validator implementation (reduces single point of failure risk)
→ Better memory safety through C++ architecture optimized for Solana's pipeline
→ Significantly lower latency for block propagation

This is arguably the most important technical upgrade in Solana's history. When Firedancer goes fully live on mainnet, it will cement Solana as the performance leader in the blockchain space — by a wide margin.`,
    priceSOL: 0.01,
  },
  "web3-monetization": {
    title: "Web3 Content Creation: Subscription or Micropayments?",
    premiumContent: `Monthly subscriptions create a phenomenon called "Subscription Fatigue." Users pay $5-15/month to dozens of platforms and end up not using most of them. The math doesn't work for consumers.

Micropayments change the equation entirely:

→ Pay 0.005 SOL (~$0.75) only for content you actually read
→ Creators get 100% of the payment — no platform fee, no intermediary
→ Payments settle in under 1 second on Solana
→ No credit card required, no account creation, no personal data shared

The SolJeton widget demonstrates exactly this: embed two lines of HTML on any blog, and your readers can pay per-article with one wallet click. 

The Subscription model made sense when payment infrastructure was expensive and slow. On Solana, micropayments are essentially free and instant. The content monetization model is ready to be reinvented.`,
    priceSOL: 0.005,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { signature, articleId } = body;

    if (!signature || !articleId) {
      return NextResponse.json(
        { error: "Missing parameters: signature and articleId are required." },
        { status: 400 }
      );
    }

    const article = ARTICLES[articleId];
    if (!article) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    // Connect to Solana Devnet
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );

    // Fetch transaction with retries (takes a few seconds to be indexed)
    let transaction = null;
    let retries = 6;
    while (retries > 0) {
      transaction = await connection.getParsedTransaction(signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      });
      if (transaction) break;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      retries--;
    }

    if (!transaction) {
      return NextResponse.json(
        {
          error:
            "Transaction not found on Solana Devnet. Please wait a few seconds and try again.",
        },
        { status: 404 }
      );
    }

    // Check transaction did not fail
    if (transaction.meta?.err) {
      return NextResponse.json(
        { error: "Transaction failed on-chain. Please try again." },
        { status: 400 }
      );
    }

    // Calculate total SOL transferred in this transaction
    // We look at the sender (first account key = fee payer / sender)
    const preBalances = transaction.meta?.preBalances ?? [];
    const postBalances = transaction.meta?.postBalances ?? [];

    // Find the largest SOL outflow from any account (= the payment amount)
    let maxSolSent = 0;
    for (let i = 0; i < preBalances.length; i++) {
      const diff = preBalances[i] - postBalances[i];
      if (diff > maxSolSent) {
        maxSolSent = diff;
      }
    }

    const solSent = maxSolSent / 1e9;

    if (solSent < article.priceSOL - 0.001) {
      return NextResponse.json(
        {
          error: `Insufficient payment. Expected at least ${article.priceSOL} SOL, but only detected ${solSent.toFixed(6)} SOL transferred in this transaction.`,
        },
        { status: 400 }
      );
    }

    // ✅ Payment verified — return premium content
    return NextResponse.json({
      success: true,
      solVerified: solSent,
      premiumContent: article.premiumContent,
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Server error: " + (error?.message ?? "Unknown error") },
      { status: 500 }
    );
  }
}
