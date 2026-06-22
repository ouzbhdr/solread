"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Edit3,
  Coins,
  Send,
  Eye,
  Settings,
  Sparkles,
  Info,
  CheckCircle2,
  Lock,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Image,
  Table,
  Type,
} from "lucide-react";

export default function WriteArticle() {
  const router = useRouter();
  const { publicKey } = useWallet();

  const [title, setTitle] = useState("");
  const [teaser, setTeaser] = useState("");
  const [premiumContent, setPremiumContent] = useState("");
  const [priceSOL, setPriceSOL] = useState("0.005");
  const [readTime, setReadTime] = useState("3 min read");
  const [tag, setTag] = useState("General");
  const [author, setAuthor] = useState("");
  const [recipient, setRecipient] = useState("");

  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  const updateContent = () => {
    if (editorRef.current) {
      setPremiumContent(editorRef.current.innerHTML);
    }
  };

  const insertHTMLAtCursor = (html: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const sel = window.getSelection();
    if (sel && sel.getRangeAt && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement("div");
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node;
      while ((node = el.firstChild)) {
        frag.appendChild(node);
      }
      range.insertNode(frag);
      range.collapse(false);
    } else if (editorRef.current) {
      editorRef.current.innerHTML += html;
    }
  };

  // Auto-fill wallet address on connection
  useEffect(() => {
    if (publicKey) {
      setRecipient(publicKey.toBase58());
    }
  }, [publicKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isContentEmpty = (html: string) => {
      const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
      return text === "";
    };

    if (!title || !teaser || isContentEmpty(premiumContent) || !priceSOL || !tag || !author || !recipient) {
      setStatus("Please fill in all required fields.");
      return;
    }

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const articleId = `custom-${slug}-${randomSuffix}`;

      const newArticle = {
        id: articleId,
        title,
        teaser,
        premiumContent,
        priceSOL: parseFloat(priceSOL),
        readTime,
        tag,
        author,
        recipient,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isCustom: true,
      };

      // Load existing custom articles
      const existing = localStorage.getItem("solread_custom_articles");
      let articlesList = [];
      if (existing) {
        try {
          articlesList = JSON.parse(existing);
          if (!Array.isArray(articlesList)) articlesList = [];
        } catch (e) {
          articlesList = [];
        }
      }

      // Add to list
      articlesList.unshift(newArticle);
      localStorage.setItem("solread_custom_articles", JSON.stringify(articlesList));

      setIsSuccess(true);
      setStatus("Chronicle published successfully! Redirecting...");
      setTimeout(() => {
        router.push(`/articles/${articleId}`);
      }, 1500);
    } catch (error) {
      setStatus("Error writing article details.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-purple-900/40 border border-purple-800/40 rounded-xl">
            <Edit3 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-wide text-slate-200">
              WRITE CHRONICLE
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Draft your custom locked article and monetize it using Solana.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-950/50 border border-green-800/50 rounded-2xl flex items-center gap-3 text-green-300 font-mono text-sm animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            <span>{status}</span>
          </div>
        )}

        {/* Error Alert */}
        {!isSuccess && status && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 rounded-2xl flex items-center gap-2 text-red-300 font-mono text-xs">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>{status}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
          {/* Main Form Fields (2/3 width) */}
          <div className="md:col-span-2 flex flex-col gap-6 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Article Title <span className="text-purple-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Decoding Solana Transaction Fees"
                className="bg-slate-950/80 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-200 transition-colors"
                required
              />
            </div>

            {/* Teaser */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Teaser / Free Preview <span className="text-purple-500">*</span>
                </label>
                <span className="text-[9px] font-mono text-slate-500">Visible to everyone</span>
              </div>
              <textarea
                value={teaser}
                onChange={(e) => setTeaser(e.target.value)}
                rows={3}
                placeholder="Give readers a compelling introduction. This text sits above the paywall..."
                className="bg-slate-950/80 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-xl px-4 py-3 text-xs text-slate-300 transition-colors resize-none leading-relaxed"
                required
              />
            </div>

            {/* Premium Content */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Premium Locked Content <span className="text-purple-500">*</span>
                </label>
                <span className="text-[9px] font-mono text-purple-400 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Locked by Paywall
                </span>
              </div>
              
              <div className="flex flex-col border border-slate-800 rounded-xl overflow-hidden focus-within:border-purple-600">
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950 border-b border-slate-800">
                  <button
                    type="button"
                    onClick={() => document.execCommand("bold", false)}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => document.execCommand("italic", false)}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => document.execCommand("underline", false)}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Underline"
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                  
                  <span className="w-[1px] h-4 bg-slate-800 mx-1" />

                  <button
                    type="button"
                    onClick={() => document.execCommand("formatBlock", false, "H1")}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Heading 1"
                  >
                    <Heading1 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => document.execCommand("formatBlock", false, "H2")}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Heading 2"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-[1px] h-4 bg-slate-800 mx-1" />

                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Enter image URL:");
                      if (url) {
                        insertHTMLAtCursor(`<img src="${url}" alt="Image" class="max-w-full h-auto rounded-xl my-3 border border-slate-800" />`);
                        updateContent();
                      }
                    }}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Insert Image"
                  >
                    <Image className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const tableHTML = `<table class="w-full border-collapse border border-slate-800 my-4 text-xs bg-slate-900/40">
  <thead>
    <tr class="bg-slate-900">
      <th class="border border-slate-800 p-2 font-mono text-slate-200">Header 1</th>
      <th class="border border-slate-800 p-2 font-mono text-slate-200">Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-800 p-2 font-mono text-slate-300">Cell 1</td>
      <td class="border border-slate-800 p-2 font-mono text-slate-300">Cell 2</td>
    </tr>
  </tbody>
</table>`;
                      insertHTMLAtCursor(tableHTML);
                      updateContent();
                    }}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Insert Table"
                  >
                    <Table className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-[1px] h-4 bg-slate-800 mx-1" />

                  <button
                    type="button"
                    onClick={() => document.execCommand("formatBlock", false, "P")}
                    className="p-1.5 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 rounded transition-colors cursor-pointer"
                    title="Paragraph Text"
                  >
                    <Type className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div
                  ref={editorRef}
                  contentEditable
                  onInput={updateContent}
                  data-placeholder="Write your premium, locked content here. You can insert tables, images, headings and format text..."
                  className="min-h-[280px] max-h-[500px] bg-slate-950/80 focus:outline-none px-4 py-3 text-xs font-mono text-slate-300 overflow-y-auto leading-relaxed prose-preview"
                />
              </div>
            </div>
          </div>

          {/* Settings Sidebar (1/3 width) */}
          <div className="flex flex-col gap-6">
            {/* Paywall Controls */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="text-xs font-bold font-mono tracking-widest text-purple-300 uppercase flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" />
                Monetization Settings
              </h2>
              <hr className="border-slate-800" />

              {/* Price SOL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Coins className="w-3 h-3 text-yellow-500" /> Price in SOL
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={priceSOL}
                  onChange={(e) => setPriceSOL(e.target.value)}
                  className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300"
                  required
                />
              </div>

              {/* Recipient Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Paste receiver wallet address"
                  className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300"
                  required
                />
                {!publicKey && (
                  <span className="text-[9px] font-mono text-slate-600 leading-normal">
                    ⚠️ Connect wallet to auto-fill your public key.
                  </span>
                )}
              </div>

              {/* Author */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Satoshi Turkey"
                  className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300"
                  required
                />
              </div>

              {/* Read Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300"
                  required
                />
              </div>

              {/* Tag */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Category Tag
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="bg-slate-950 border border-slate-800 focus:border-purple-600 focus:outline-none rounded-lg px-3 py-2 text-xs font-mono text-slate-300 cursor-pointer"
                >
                  <option value="General">General</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Business">Business</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono font-bold py-3 px-6 rounded-2xl text-xs tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              PUBLISH CHRONICLE
            </button>
          </div>
        </form>
      </main>

      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80 py-6 text-center text-xs text-slate-600 font-mono">
        © 2026 SolRead & SolJeton · Powered by Solana Devnet
      </footer>
    </div>
  );
}
