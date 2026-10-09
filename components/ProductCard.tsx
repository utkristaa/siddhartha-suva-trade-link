"use client";

import { productInquiryLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";

export default function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <article className={`group ${className}`}>
      <div className="relative flex h-full flex-col overflow-hidden bg-white/85 p-6 shadow-[0_24px_56px_-40px_rgba(0,0,0,0.55)] backdrop-blur-md">
        <div className="relative flex h-72 items-center justify-center">
          <div className="absolute inset-8 rounded-full opacity-25 transition-opacity duration-300 group-hover:opacity-40" style={{ background: `radial-gradient(circle, ${product.glow}, transparent 72%)` }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={`${product.brand} ${product.name} paint bucket`}
            loading="lazy"
            decoding="async"
            className="relative max-h-full max-w-[78%] object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:-translate-y-1"
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="rounded-full bg-charcoal px-3 py-1 font-medium text-white">{product.tag}</span>
          <span className="text-black/55">{product.brand}</span>
        </div>
        <h3 className="serif-display mt-4 text-4xl">{product.name}</h3>
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
      </div>
    </article>
  );
}
