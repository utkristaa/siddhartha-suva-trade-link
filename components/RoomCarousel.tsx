"use client";

import { useEffect, useRef } from "react";

export type Room = { src: string; title: string; finish: string; palette: string[] };

const CARD_W = 300;
const CARD_H = 470;
const GAP = 36;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function RoomCarousel({ rooms }: { rooms: Room[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const s = useRef({
    x: 0, vx: 0, drag: false, lastX: 0, moved: 0, startIndex: -1,
    spin: 0, spinV: 0, init: false,
    flip: [] as ({ t0: number } | null)[],
  });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const st = s.current;
    st.flip = rooms.map(() => null);
    let raf = 0;

    const bounds = () => {
      const W = el.clientWidth;
      const max = W / 2 - CARD_W / 2;
      const min = max - (rooms.length - 1) * (CARD_W + GAP);
      return { W, max, min };
    };

    const tick = (now: number) => {
      const { W, max, min } = bounds();
      if (!st.init) { st.x = max; st.init = true; }
      if (!st.drag) {
        st.x += st.vx;
        st.vx *= 0.94;
        if (st.x > max) st.vx += (max - st.x) * 0.12;
        if (st.x < min) st.vx += (min - st.x) * 0.12;
        st.spinV += -st.spin * 0.05;
        st.spinV *= 0.84;
        st.spin += st.spinV;
      }
      rooms.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const left = st.x + i * (CARD_W + GAP);
        const off = left + CARD_W / 2 - W / 2;
        let flipDeg = 0;
        const f = st.flip[i];
        if (f) {
          const p = clamp((now - f.t0) / 1100, 0, 1);
          flipDeg = easeOut(p) * 360;
          if (p >= 1) st.flip[i] = null;
        }
        const ry = clamp(-off / W * 42, -48, 48) + st.spin + flipDeg;
        const tz = -Math.abs(off) * 0.28;
        const sc = 1 - Math.min(Math.abs(off) / W, 0.6) * 0.22;
        card.style.transform = `translate3d(${left}px,0,${tz}px) rotateY(${ry}deg) scale(${sc})`;
        card.style.zIndex = String(1000 - Math.round(Math.abs(off)));
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

    const id = window.setInterval(() => {
      if (!s.current.drag) {
        s.current.vx += -18;
      }
    }, 1800);

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.clearInterval(id);
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    const st = s.current;
    st.drag = true;
    st.lastX = e.clientX;
    st.moved = 0;
    st.vx = 0;
    const target = (e.target as HTMLElement).closest("[data-card]") as HTMLElement | null;
    st.startIndex = target ? Number(target.dataset.card) : -1;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.drag) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    st.moved += Math.abs(dx);
    st.x += dx;
    st.vx = dx;
    st.spin = clamp(st.spin + dx * 0.35, -70, 70); // card rotation follows the drag
    st.spinV = 0;
  };
  const onUp = (e: React.PointerEvent) => {
    const st = s.current;
    st.drag = false;
    if (st.moved < 6 && st.startIndex >= 0) {
      st.flip[st.startIndex] = { t0: performance.now() };
    }
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
        style={{ height: CARD_H + 90, perspective: 1500, touchAction: "pan-y" }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Room design showcase. Drag to browse, click a card to spin it."
      >
        <div className="absolute left-0 top-10" style={{ transformStyle: "preserve-3d", width: "100%", height: CARD_H }}>
          {rooms.map((r, i) => (
            <div
              key={r.src}
              data-card={i}
              ref={(n) => { cardRefs.current[i] = n; }}
              className="absolute left-0 top-0 will-change-transform"
              style={{ width: CARD_W, height: CARD_H, transformStyle: "preserve-3d" }}
            >
              <figure
                className="relative h-full w-full overflow-hidden bg-charcoal shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)]"
                style={{ borderRadius: `${CARD_W / 2}px ${CARD_W / 2}px 6px 6px`, backfaceVisibility: "hidden" }}
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
              {/* Back face so the 360 spin reads as a solid card */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-studio text-charcoal"
                style={{ borderRadius: `${CARD_W / 2}px ${CARD_W / 2}px 6px 6px`, transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <p className="serif-display px-10 text-center text-3xl">Every Wall Tells a Story.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
