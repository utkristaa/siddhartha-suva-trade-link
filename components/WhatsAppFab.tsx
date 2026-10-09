"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Siddhartha Suva Trade Link on WhatsApp"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-4 right-4 z-50 flex min-h-14 items-center gap-3 rounded-full border border-white/15 bg-charcoal py-2 pl-2 pr-5 text-sm font-semibold text-white shadow-[0_14px_36px_-14px_rgba(0,0,0,0.65)] transition-colors hover:bg-[#202020] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#10251a]">
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.1L3 20l1.3-4.8a8.2 8.2 0 1 1 15.9-3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.3 7.8c-.3.4-.8 1-.8 2s.7 2.3 1.8 3.6c1.2 1.4 2.6 2.3 4 2.8 1.5.5 2.2.3 2.7-.3.3-.4.6-1 .5-1.4l-2.1-1-.9 1.1c-.6-.2-1.4-.7-2.1-1.3-.7-.6-1.3-1.4-1.6-2l.9-.9-1-2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>WhatsApp</span>
    </motion.a>
  );
}
