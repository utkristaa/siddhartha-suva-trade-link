"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/products";

const featured = [products[0], products[1], products[3]];

/**
 * Scroll-linked paint wipe. A roller edge travels left to right, replacing a peeling wall
 * with the finished colour and the flagship buckets.
 */
export default function PaintWipe() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, [0.08, 0.82], [0, 100]);
  const clip = useTransform(p, (v) => `inset(0 ${100 - v}% 0 0)`);
  const edge = useTransform(p, (v) => `${v}%`);

  return (
    <section ref={ref} className="relative h-[230vh]" aria-label="Step into a world of colour">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Before: bare, peeling wall */}
        <div className="absolute inset-0 bg-[#d9cdb9]">
          <div className="mx-auto grid h-full max-w-7xl grid-cols-12 items-center gap-6 px-6">
            <div className="col-span-12 md:col-span-7">
              <h2 className="serif-display text-[clamp(3.2rem,9vw,9rem)] text-charcoal">STEP INTO A WORLD OF COLOUR</h2>
              <p className="mt-6 max-w-sm text-sm text-black/70">A fresh coat can change the feel of a room.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/textures/peeling-wall.jpg" alt="A gloved hand rolling white paint over a peeling wall" loading="lazy" decoding="async" className="col-span-12 hidden h-[70vh] w-full object-cover md:col-span-5 md:block" />
          </div>
        </div>

        {/* After: painted wall with flagship buckets */}
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-charcoal text-white">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
            <p className="serif-display text-[clamp(2rem,4.5vw,4.4rem)]">A fresh start for your walls.</p>
            <div className="mt-8 grid grid-cols-3 gap-4 md:gap-10">
              {featured.map((f, i) => (
                <div key={f.id} className={i === 1 ? "md:translate-y-10" : ""}>
                  <div className="relative flex h-[34vh] items-center justify-center">
                    <div className="absolute h-44 w-44 rounded-full opacity-50 blur-3xl" style={{ background: f.glow }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image} alt={`${f.brand} ${f.name}`} loading="lazy" decoding="async" className="relative max-h-full object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,0.6)]" />
                  </div>
                  <p className="mt-3 text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-white/60">{f.brand}</p>
                </div>
              ))}
            </div>
            <Link href="/products" className="mt-10 w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-ochre">Browse the paints</Link>
          </div>
        </motion.div>

        {/* Wet roller edge */}
        <motion.div aria-hidden="true" style={{ left: edge }} className="pointer-events-none absolute inset-y-0 z-10 w-10 -translate-x-1/2">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white/80" />
        </motion.div>
      </div>
    </section>
  );
}
