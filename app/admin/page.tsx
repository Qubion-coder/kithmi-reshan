'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Link as LinkIcon, Sparkles, User, Settings, MessageCircle } from 'lucide-react';
import {
  WEDDING,
  GUEST_PREFIXES,
  type GuestPrefix,
  formatGuestName,
  buildInvitationLink,
  buildInvitationMessage,
} from '@/lib/wedding';

export default function AdminPage() {
  const [prefix, setPrefix] = useState<GuestPrefix>('Mr.');
  const [name, setName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [toast, setToast] = useState('');

  const generateLink = () => {
    const formatted = formatGuestName(prefix, name);
    if (!formatted) return;
    setDisplayName(formatted);
    setGeneratedLink(buildInvitationLink(window.location.origin, formatted));
  };

  const message = generatedLink ? buildInvitationMessage(displayName, generatedLink) : '';

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers without clipboard API permission
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setToast(label);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fdf6f8] text-[#3a3b38] selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Settings className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-[#8f3d60] text-center">
            Invitation Link Generator
          </h1>
          <p className="text-[#71736e] text-center max-w-md">
            {WEDDING.brideName} &amp; {WEDDING.groomName} — create a personalized link and WhatsApp message for each guest.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-3xl border border-primary/20 bg-white shadow-[0_20px_50px_rgba(235,129,169,0.12)] h-fit"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="prefix" className="block text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                  Select Prefix
                </label>
                <div className="relative">
                  <select
                    id="prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value as GuestPrefix)}
                    className="w-full bg-[#fdf6f8] border border-primary/20 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                  >
                    {GUEST_PREFIXES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="guest" className="block text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                  Guest Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                  <input
                    id="guest"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateLink()}
                    placeholder="e.g. Sanjaya"
                    className="w-full bg-[#fdf6f8] border border-primary/20 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-colors placeholder:text-[#71736e]/50"
                  />
                </div>
              </div>

              <button
                onClick={generateLink}
                disabled={!name.trim()}
                className="w-full rounded-xl bg-primary px-6 py-4 font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Link
                </span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => copy(generatedLink, 'Link copied!')}
                  disabled={!generatedLink}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-secondary/40 text-[#5f6f3c] bg-secondary/10 hover:bg-secondary/20 transition-all font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link Only
                </button>
                <button
                  onClick={() => copy(message, 'Message copied!')}
                  disabled={!generatedLink}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary text-white hover:brightness-95 transition-all font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-4 h-4" />
                  Copy Full Message
                </button>
              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 min-w-0"
          >
            {generatedLink ? (
              <>
                <div className="p-6 rounded-3xl border border-primary/20 bg-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Greeting Preview</p>
                  <p className="font-serif text-2xl text-[#8f3d60]">Dear {displayName} ❤️</p>
                  <p className="mt-3 text-sm text-[#71736e] italic">
                    On the website: “We cordially invite {displayName} to celebrate our special day with us.”
                  </p>
                </div>

                <div className="p-6 rounded-3xl border border-dashed border-primary/30 bg-white">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Invitation Link</span>
                  </div>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 rounded-xl bg-[#fdf6f8] border border-primary/10 break-all text-sm font-mono text-[#3a3b38] hover:text-primary"
                  >
                    {generatedLink}
                  </a>
                </div>

                <div className="p-6 rounded-3xl border border-secondary/30 bg-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Full Message</p>
                  <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-[#3a3b38]">{message}</pre>
                </div>
              </>
            ) : (
              <div className="p-8 rounded-3xl border border-primary/10 bg-white/60 h-full min-h-64 flex flex-col items-center justify-center text-center text-[#71736e]">
                <div className="w-16 h-16 rounded-full border border-dashed border-primary/30 flex items-center justify-center mb-6">
                  <LinkIcon className="w-6 h-6 text-primary/50" />
                </div>
                <p className="text-sm">The link and message preview will appear here after you click Generate Link.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#3a3b38] px-5 py-3 text-sm text-white shadow-xl"
          >
            <Check className="w-4 h-4 text-secondary" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
