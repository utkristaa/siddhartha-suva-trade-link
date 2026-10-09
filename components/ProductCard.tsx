"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { productInquiryLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";

export default function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 16 });
  const sy = useSpring(my, { stiffness: 160, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const sheenX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const sheen = useTransform(sheenX, (v) => `radial-gradient(circle at ${v} 20%, rgba(255,255,255,0.55), transparent 45%)`);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <article className={`group ${className}`} style={{ perspective: 1100 }}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="tilt-3d relative flex h-full flex-col overflow-hidden bg-white/85 p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.55)] backdrop-blur-md"
      >
        <div className="relative flex h-72 items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70" style={{ background: product.glow }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={`${product.brand} ${product.name} paint bucket`}
            className="relative max-h-full max-w-[78%] object-contain drop-shadow-[0_26px_26px_rgba(0,0,0,0.3)]"
            style={{ transform: "translateZ(70px)" }}
          />
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: sheen }} />
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="rounded-full bg-charcoal px-3 py-1 font-medium text-white">{product.tag}</span>
          <span className="text-black/55">{product.brand}</span>
        </div>
        <h3 className="serif-display mt-4 text-4xl" style={{ transform: "translateZ(30px)" }}>{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-black/70">{product.category}</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/60">{product.note}</p>
        <a
          href={productInquiryLink(product.inquiryName)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center rounded-full border border-charcoal px-5 py-2.5 text-sm font-medium transition hover:bg-charcoal hover:text-white"
          aria-label={`Inquire about ${product.inquiryName} on WhatsApp`}
        >
          Inquire on WhatsApp
        </a>
      </motion.div>
    </article>
  );
}
