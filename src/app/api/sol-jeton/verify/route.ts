import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";

// Mock database of premium articles
const ARTICLES: Record<
  string,
  {
    title: string;
    teaser: string;
    premiumContent: string;
    priceSOL: number;
    recipient: string;
  }
> = {
  "solana-future": {
    title: "The Future of Solana and the Firedancer Update",
    teaser: "Solana is one of the fastest networks in the blockchain world, capable of executing tens of thousands of transactions per second (TPS). However, with the upcoming Firedancer update, things are about to change completely...",
    premiumContent: "Firedancer is a new validator client for Solana, written from scratch in C++ by Jump Crypto. It aims to break past current hardware limits of the Rust client and reach up to 1 million transactions per second. This update will help Solana reduce outages, boost security, and enhance decentralization. Often called Solana 2.0, this era will allow DeFi applications to execute at the speed of traditional financial exchanges. That is why Firedancer is a massive turning point for the Solana ecosystem.",
    priceSOL: 0.01,
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7", // Default mock recipient (devnet)
  },
  "web3-monetization": {
    title: "Web3 Content Creation: Subscription or Micropayments?",
    teaser: "For years, content creators have depended on advertising revenues or monthly subscription models like Substack. However, micropayments (pay-per-content) are opening a brand new era...",
    premiumContent: "Monthly subscriptions put a mental strain on users (Subscription Fatigue). Instead of paying $5/month for every site we occasionally read, paying 0.01 SOL (roughly 1-2 cents) only for the article we actually read is much fairer for the reader and provides instant liquidity to the creator. With the SolJeton widget, as soon as the user confirms the wallet transaction, the content is unlocked and rendered on their screen. The true power of Web3 lies in these frictionless micro-financial transactions.",
    priceSOL: 0.005,
    recipient: "7tD8Bq5Qc17pD58aQJtGg4gCdtjQzPZtK7N2c7K1N2c7",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { signature, articleId, recipientAddress } = body;

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

    // Connect to Solana Devnet RPC
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    // Fetch and parse the transaction
    let transaction = null;
    let retries = 5;

    // The transaction might take a few seconds to be indexable on RPC, so we retry a few times
    while (retries > 0) {
      transaction = await connection.getParsedTransaction(signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      });

      if (transaction) break;
      
      // Wait 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
      retries--;
    }

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found on the Solana blockchain. Please ensure the transaction is confirmed." },
        { status: 404 }
      );
    }

    // Verify recipient wallet and amount transferred
    const targetRecipient = recipientAddress || article.recipient;
    const accountKeys = transaction.transaction.message.accountKeys.map((acc) =>
      acc.pubkey.toBase58()
    );

    const recipientIndex = accountKeys.indexOf(targetRecipient);

    if (recipientIndex === -1) {
      return NextResponse.json(
        { error: "Payment recipient could not be verified. It might have been sent to an incorrect wallet." },
        { status: 400 }
      );
    }

    // Calculate balance difference for the recipient (postBalances - preBalances)
    const preBalance = transaction.meta?.preBalances[recipientIndex] || 0;
    const postBalance = transaction.meta?.postBalances[recipientIndex] || 0;
    const lamportsTransferred = postBalance - preBalance;
    const solTransferred = lamportsTransferred / 1e9;

    const expectedPriceSOL = article.priceSOL;

    // Check if the transferred amount is sufficient (allowing a tiny margin for rounding)
    if (solTransferred < expectedPriceSOL - 0.0001) {
      return NextResponse.json(
        {
          error: `Insufficient payment. Expected: ${expectedPriceSOL} SOL, Received: ${solTransferred} SOL.`,
        },
        { status: 400 }
      );
    }

    // Success! Return the premium content
    return NextResponse.json({
      success: true,
      premiumContent: article.premiumContent,
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
