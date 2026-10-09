"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-colors duration-500 ${
          scrolled ? "border-black/10 bg-white/80 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]" : "border-black/5 bg-white/50"
        }`}
      >
        <Link href="/" className="serif-display text-xl tracking-tight md:text-2xl" aria-label="Siddhartha Suva Trade Link, home">
          Siddhartha Suva
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} className="relative">
                <Link href={l.href} className="relative block rounded-full px-4 py-2 text-sm font-medium tracking-wide text-black/70 transition hover:text-black">
                  {active && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-charcoal" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                  )}
                  <span className={active ? "text-white" : ""}>{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>
      {open && (
        <motion.ul
          id="mobile-navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 w-[calc(100%-2rem)] max-w-5xl rounded-3xl border border-black/10 bg-white/95 p-3 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={`block rounded-2xl px-4 py-3 text-lg ${pathname === l.href ? "bg-charcoal text-white" : "text-black/80"}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
