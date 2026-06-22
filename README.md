# SolRead & SolJeton Paywall

SolRead is a Web3 publishing platform, and SolJeton is an embeddable micropayment paywall widget. Together, they enable a **pay-per-content** monetization model for digital creators on the Solana blockchain.

Instead of expensive monthly subscriptions, readers can instantly unlock premium articles by paying micro-amounts of SOL (e.g., 0.01 SOL) using browser wallets or mobile Solana Pay QR codes.

---

## Features 🚀

- **SolJeton Paywall Widget:** An embeddable component that locks premium content.
- **Single-Line Widget Integration:** Publishers can embed the paywall on any website (WordPress, Webflow, custom HTML) with a single `div` placeholder and a script tag.
- **Web3 Browser Wallet Integration:** Connect Phantom, Solflare, or other wallets to approve payments with one click.
- **Solana Pay QR Support:** Generate standard Solana Pay URLs so mobile wallet users can scan and pay instantly.
- **Secure On-Chain Verification:** A Next.js API route fetches the transaction signature directly from the Solana Devnet RPC to verify the recipient address and transferred SOL amount before revealing content.
- **English-first Retro Theme:** Sleek cyberpunk/CRT aesthetics for high-end visual appeal.

---

## Single-Line Integration Guide (For Publishers) 🔌

To place a SolJeton paywall on an external blog, website, or publication, add these two snippets to the HTML:

```html
<!-- 1. The placeholder where the paywall will render. 
     Set data-soljeton-reveal-id to the ID of the premium content div to automatically reveal it. -->
<div data-soljeton-article="solana-future" data-soljeton-reveal-id="parent-premium-content" data-soljeton-domain="https://solread.vercel.app"></div>

<!-- 2. The single-line SolJeton widget script -->
<script src="https://solread.vercel.app/widget.js"></script>
```

*Note: Replace `https://solread.vercel.app` with your deployed domain, or use `http://localhost:3000` during local development.*

---

## Technical Stack 🛠️

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Blockchain Libraries:** `@solana/web3.js`, `@solana/wallet-adapter-react`, `@solana/pay`
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
