"use client";

import { useEffect, useRef } from "react";

export type Room = { src: string; title: string; finish: string; palette: string[] };

const CARD_W = 280;
const CARD_H = 440;
const GAP = 24;

export default function RoomCarousel({ rooms }: { rooms: Room[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const s = useRef({
    x: 0, vx: 0, drag: false, lastX: 0,
  });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const st = s.current;
    let raf = 0;

    const tick = () => {
      const W = el.clientWidth;
      const stride = CARD_W + GAP;
      const cycle = rooms.length * stride;
      if (!st.drag) {
        st.x += st.vx - 0.24;
        st.vx *= 0.94;
        st.x = ((st.x % cycle) + cycle) % cycle;
      }
      rooms.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const offset = ((st.x + i * stride + cycle / 2) % cycle + cycle) % cycle - cycle / 2;
        const left = W / 2 - CARD_W / 2 + offset;
        card.style.transform = `translate3d(${left}px,0,0)`;
        card.style.zIndex = String(1000 - Math.round(Math.abs(offset)));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rooms]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (s.current.drag) return;
      const drift = (event.clientX / window.innerWidth - 0.5) * 2;
      s.current.vx += drift * 0.22;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    const st = s.current;
    st.drag = true;
    st.lastX = e.clientX;
    st.vx = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.drag) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    st.x += dx;
    st.vx = dx;
  };
  const onUp = (e: React.PointerEvent) => {
    const st = s.current;
    st.drag = false;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };

  return (
    <div className="relative">
      <div
        ref={wrap}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative cursor-grab select-none overflow-hidden active:cursor-grabbing"
        style={{ height: CARD_H + 90, touchAction: "pan-y" }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Room design showcase. Drag to browse the continuously looping gallery."
      >
        <div className="absolute left-0 top-10 h-full w-full">
          {rooms.map((r, i) => (
            <div
              key={r.src}
              ref={(n) => { cardRefs.current[i] = n; }}
              className="absolute left-0 top-0 will-change-transform"
              style={{ width: CARD_W, height: CARD_H }}
            >
              <figure
                className="relative h-full w-full overflow-hidden rounded-md bg-charcoal shadow-[0_24px_48px_-32px_rgba(0,0,0,0.65)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.src} alt={r.title} draggable={false} className="pointer-events-none h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_8%,rgba(255,236,190,0.35),transparent_55%)] mix-blend-soft-light" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-5 pt-16 text-white">
                  <p className="serif-display text-2xl">{r.title}</p>
                  <p className="mt-1 text-xs text-white/70">{r.finish}</p>
                  <div className="mt-3 flex gap-1.5">
                    {r.palette.map((c) => (
                      <span key={c} className="h-3.5 w-3.5 rounded-full ring-1 ring-white/40" style={{ background: c }} />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
