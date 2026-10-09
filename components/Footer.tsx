import Link from "next/link";
import { PHONES, whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-charcoal px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="serif-display text-4xl sm:text-5xl md:text-7xl">Siddhartha Suva Trade Link</p>
          <p className="mt-4 max-w-sm text-sm text-white/60">Berger and Asian Paints, with practical advice on colour and finish from our team.</p>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm font-semibold">Pages</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {[["/", "Home"], ["/about", "About Us"], ["/products", "Products"], ["/portfolio", "Portfolio"], ["/contact", "Contact"]].map(([h, l]) => (
              <li key={h}><Link href={h} className="transition hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm font-semibold">Call or message</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">WhatsApp {PHONES.primary}</a></li>
            {PHONES.secondary.map((p) => <li key={p}><a href={`tel:${p}`} className="transition hover:text-white">{p}</a></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
