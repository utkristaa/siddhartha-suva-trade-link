import Link from "next/link";
import { PHONES, whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-ochre bg-charcoal px-6 pb-8 pt-14 text-white sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.9fr] lg:gap-12 lg:pb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="serif-display max-w-xl text-4xl leading-[0.9] sm:text-5xl md:text-6xl">Siddhartha Suva Trade Link</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">Berger and Asian Paints, with practical advice on colour and finish from our team.</p>
          </div>
          <nav aria-label="Footer pages">
            <h2 className="text-xs font-semibold text-ochre">Explore</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-1 text-sm text-white/70 sm:grid-cols-1">
              {[["/", "Home"], ["/about", "About Us"], ["/products", "Products"], ["/portfolio", "Portfolio"], ["/contact", "Contact"]].map(([h, l]) => (
                <li key={h}><Link href={h} className="inline-flex min-h-11 items-center transition-colors hover:text-white">{l}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold text-ochre">Call or message</h2>
            <ul className="mt-3 divide-y divide-white/10 text-sm text-white/70">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between gap-4 transition-colors hover:text-white">
                  <span>WhatsApp</span><span className="tabular-nums text-white">{PHONES.primary}</span>
                </a>
              </li>
              {PHONES.secondary.map((p) => (
                <li key={p}>
                  <a href={`tel:${p}`} aria-label={`Call ${p}`} className="flex min-h-11 items-center justify-between gap-4 transition-colors hover:text-white">
                    <span>Call</span><span className="tabular-nums text-white">{p}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Siddhartha Suva Trade Link</p>
          <p>Created by Utkrista</p>
        </div>
      </div>
    </footer>
  );
}
