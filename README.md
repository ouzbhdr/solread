# SolRead & SolJeton Paywall

SolRead is a Web3 publishing platform, and SolJeton is an embeddable micropayment paywall widget. Together, they enable a **pay-per-content** monetization model for digital creators on the Solana blockchain.

Instead of expensive monthly subscriptions, readers can instantly unlock premium articles by paying micro-amounts of SOL (e.g., 0.01 SOL) using browser wallets or mobile Solana Pay QR codes.

---

## Features 🚀

- **SolJeton Paywall Widget:** An embeddable component that locks premium content and handles wallet connections and Solana Pay QR codes.
- **Interactive Code Generator (`/soljeton`):** An interactive panel for publishers to configure and generate customized single-line embed HTML snippets in real time.
- **Persistent Payment Memory:** Smart client-side cache stores unlocked articles keyed by the reader's wallet address. Once paid, articles remain unlocked instantly upon return visits—no re-verification waiting times.
- **Chronicle Publisher (`/write`):** A beautiful author interface to draft new premium chronicles, set prices in SOL, configure category tags, and publish drafts immediately.
- **Reader Library & Profile (`/profile`):** A decentralized user dashboard showing connected wallet keys, total articles unlocked, estimated SOL spent, and a custom library of previously unlocked articles.
- **Secure On-Chain Verification:** A Next.js API route fetches the transaction signature directly from the Solana Devnet RPC to verify the recipient address and transferred SOL amount before returning premium content.
- **English-first Retro Theme:** Sleek cyberpunk/CRT aesthetics for high-end visual appeal.

---

## Decentralized Architecture (No-DB Design) 🌐

SolRead and SolJeton are built with a Web3-native, serverless approach designed to avoid centralized single points of failure:

1. **The Blockchain is the Database:** The status of all payments resides immutably on the Solana ledger. The platform has no SQL database tracking accounts, purchases, or passwords.
2. **On-Chain Verification:** The backend (`/api/sol-jeton/verify`) behaves as a stateless verification oracle. It validates transactions directly against the Solana network using standard RPC endpoints.
3. **Decentralized Publishing & Storage:** Currently, custom draft articles and purchase tokens are stored in the client browser's local state (`localStorage`). This ensures zero signup friction and a completely cookie-less, private browsing experience. In production, drafts can be written directly to permanent storage networks like **Arweave** (using a Mirror-like model) or **IPFS**.

---

## Single-Line Integration Guide (For Publishers) 🔌

To place a SolJeton paywall on an external blog, website, or publication, add these two snippets to the HTML:

```html
<!-- 1. The placeholder where the paywall will render. -->
<div 
  data-soljeton-article="solana-future" 
  data-soljeton-price="0.01"
  data-soljeton-recipient="GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR"
  data-soljeton-reveal-id="premium-content-div" 
  data-soljeton-domain="https://solread.vercel.app"
></div>

<!-- 2. The single-line SolJeton widget script -->
<script src="https://solread.vercel.app/widget.js"></script>
```

*Note: Replace `https://solread.vercel.app` with your deployed domain, or use `http://localhost:3000` during local development.*

---

## Technical Stack 🛠️

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Blockchain Libraries:** `@solana/web3.js`, `@solana/wallet-adapter-react`
- **Icons:** `lucide-react`
- **Styling:** CSS Variables + TailwindCSS
- **Type Safety:** TypeScript

---

## Getting Started (Local Development) ⚙️

### Prerequisites
Make sure you have Node.js installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portal.
Open [http://localhost:3000/demo-embed.html](http://localhost:3000/demo-embed.html) to see the external site widget demo.

### 3. Build for Production
```bash
npm run build
```

---

## License 📄
This project is open-source and licensed under the MIT License.
