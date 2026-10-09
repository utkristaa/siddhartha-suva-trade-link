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
      whileHover={{ scale: 1.04 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-charcoal py-3 pl-4 pr-5 text-sm font-medium text-white shadow-[0_18px_50px_-14px_rgba(0,0,0,0.6)]"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.45 15.1L2 22l5.04-1.55A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.3 14.97l-.3-.19-2.99.92.96-2.9-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.7c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.63 1.1 2.81c.14.18 1.9 3.03 4.7 4.13 2.32.91 2.8.73 3.3.68.5-.05 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.11-.25-.18-.52-.32-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.2-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.5-.84-2.05-.22-.52-.44-.45-.61-.46Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}
