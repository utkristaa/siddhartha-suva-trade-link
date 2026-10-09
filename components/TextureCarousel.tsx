"use client";

import { useRef } from "react";

type Finish = { id: string; name: string; blurb: string; base: string; kind: "matte" | "sheen" | "shield" };

const finishes: Finish[] = [
  { id: "velvet", name: "Velvet matte", blurb: "A soft, low-sheen finish that helps disguise small marks.", base: "#7E9C84", kind: "matte" },
  { id: "sheen", name: "Luxury high sheen", blurb: "A smooth, reflective finish that catches the light.", base: "#3E6A8A", kind: "sheen" },
  { id: "shield", name: "Exterior PU shield", blurb: "A weather-resistant finish for walls exposed to sun and rain.", base: "#C0553F", kind: "shield" },
];

function Surface({ f }: { f: Finish }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const beads = Array.from({ length: 22 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 53 + 11) % 100, s: 14 + ((i * 7) % 22) }));
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="relative aspect-[4/5] w-[min(82vw,320px)] shrink-0 snap-center overflow-hidden sm:aspect-[3/4]"
      style={{ background: f.base, ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      {f.kind === "matte" && (
        <>
          <svg className="absolute inset-0 h-full w-full opacity-[0.28] mix-blend-multiply" aria-hidden="true">
            <filter id="velvet-noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" /></filter>
            <rect width="100%" height="100%" filter="url(#velvet-noise)" />
          </svg>
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.18), transparent 60%)" }} />
        </>
      )}
      {f.kind === "sheen" && (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(0,0,0,0.25), transparent 45%, rgba(255,255,255,0.1))" }} />
          <div className="absolute inset-0 mix-blend-screen" style={{ background: "radial-gradient(ellipse 28% 60% at var(--mx) var(--my), rgba(255,255,255,0.85), transparent 70%)" }} />
        </>
      )}
      {f.kind === "shield" && (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(0,0,0,0.18))" }} />
          {beads.map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s,
                background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0 12%, rgba(255,255,255,0.18) 35%, rgba(0,0,0,0.28) 100%)",
                boxShadow: "0 6px 10px -4px rgba(0,0,0,0.45)",
              }}
            />
          ))}
          <div className="absolute inset-0 mix-blend-soft-light" style={{ background: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.7), transparent 50%)" }} />
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-20 text-white">
        <p className="serif-display text-3xl">{f.name}</p>
        <p className="mt-2 text-xs leading-relaxed text-white/80">{f.blurb}</p>
      </div>
    </div>
  );
}

export default function TextureCarousel() {
  return (
    <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4" role="region" aria-label="Paint finish samples">
      {finishes.map((f) => <Surface key={f.id} f={f} />)}
    </div>
  );
}
