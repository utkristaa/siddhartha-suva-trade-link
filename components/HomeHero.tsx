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
          initial={{ opacity: 0, y: "0.4em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.035, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-[linear-gradient(135deg,#fbf9f5_0%,#f5f1eb_58%,#eee8df_100%)] px-6 pb-16 pt-28 md:min-h-[88vh] md:pt-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_22%_18%,rgba(255,255,255,0.72),transparent_52%)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-y-[-8%] left-[8%] right-[-22%] z-0 opacity-95 mix-blend-multiply md:inset-y-[-18%] md:left-[23%] md:right-[-15%]"
        style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 18%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 18%, black 88%, transparent 100%)" }}
      >
        <PaintSpiral />
      </div>

      <p
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 text-sm font-medium tracking-[0.4em] text-black/60 md:block"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        Find a colour you will love living with.
      </p>

      <div className="relative z-10 mx-auto w-full max-w-7xl md:pl-14">
        <h1 className="serif-display text-4xl leading-[0.82] text-charcoal sm:text-7xl lg:text-9xl">
          <StaggerWord text="SIDDHARTHA" className="block whitespace-nowrap" />
          <span className="mt-2 flex flex-wrap items-center gap-x-2 md:mt-1 md:gap-x-[2vw] md:pl-[12vw]">
            <StaggerWord text="SUVA" delay={0.55} />
            <span className="inline-block h-[0.06em] w-[clamp(24px,7vw,90px)] bg-charcoal align-middle" aria-hidden="true" />
            <StaggerWord text="TRADE LINK" delay={0.75} className="text-[0.44em] italic" />
          </span>
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} className="mt-8 flex flex-wrap items-center gap-5 md:ml-[12vw]">
          <p className="max-w-xs text-sm leading-relaxed text-black/70 md:hidden">Find a colour you will love living with.</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black">
            Direct Inquiry
          </a>
          <a href="#rooms" className="text-sm font-medium underline underline-offset-4">See the rooms</a>
        </motion.div>
      </div>
    </section>
  );
}
