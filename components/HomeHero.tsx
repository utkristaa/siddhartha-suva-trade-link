"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/whatsapp";

const PaintSpiral = dynamic(() => import("@/components/PaintSpiral"), { ssr: false });

function StaggerWord({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: "0.5em", letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "-0.01em" }}
          transition={{ delay: delay + i * 0.05, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-visible px-6 pb-12 pt-28 md:items-center md:pb-16 md:pt-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_35%),linear-gradient(90deg,rgba(245,241,235,0.95),rgba(245,241,235,0.7))]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[-8%] right-[-6%] z-0 h-[72vh] w-[78vw] opacity-95 md:bottom-[-10%] md:right-[-8%] md:h-[76vh] md:w-[60vw]">
        <PaintSpiral />
      </div>

      <p
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 text-sm font-medium tracking-[0.4em] text-black/60 md:block"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        A PLAYGROUND OF PURE COLOUR.
      </p>

      <div className="relative z-10 mx-auto w-full max-w-7xl md:pl-14">
        <h1 className="serif-display text-[clamp(3.3rem,12vw,12rem)] leading-[0.74] text-charcoal">
          <StaggerWord text="SIDDHARTHA" />
          <br />
          <span className="mt-2 block md:mt-1 md:pl-[12vw]">
            <StaggerWord text="SUVA" delay={0.55} />
            <span className="mx-[2vw] inline-block h-[0.06em] w-[7vw] max-w-[90px] bg-charcoal align-middle" aria-hidden="true" />
            <StaggerWord text="TRADE LINK" delay={0.75} className="text-[0.48em] italic" />
          </span>
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} className="mt-8 flex flex-wrap items-center gap-5 md:ml-[12vw]">
          <p className="max-w-xs text-sm leading-relaxed text-black/70 md:hidden">A PLAYGROUND OF PURE COLOUR.</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black">
            Direct Inquiry
          </a>
          <a href="#rooms" className="text-sm font-medium underline underline-offset-4">See the rooms</a>
        </motion.div>
      </div>
    </section>
  );
}
