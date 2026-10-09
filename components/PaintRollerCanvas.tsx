"use client";

import { useEffect, useRef } from "react";

const PALETTE = ["#3E6A8A", "#C0553F", "#D9A441", "#7E9C84", "#B9A4D9", "#E0785F", "#2F4858"];

/**
 * Global full-viewport canvas. Pointer movement and scrolling push a paint roller
 * across the page, laying down wet colour that slowly dries away to reveal the studio
 * white beneath. It sits behind page content and never intercepts input.
 */
export default function PaintRollerCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const brushRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    document.body.style.cursor = "none";

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let colorIndex = 0;
    let last: { x: number; y: number } | null = null;
    let pointer = { x: w * 0.7, y: h * 0.4 };
    let lastScrollY = window.scrollY;
    let dragging = false;
    let hue = PALETTE[0];

    const stamp = (x0: number, y0: number, x1: number, y1: number, width: number, color: string, alpha: number) => {
      const dx = x1 - x0, dy = y1 - y0;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.5) return;
      const angle = Math.atan2(dy, dx);
      ctx.save();
      ctx.translate(x0, y0);
      ctx.rotate(angle);
      // Wet body of the stroke
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(0, -width / 2, dist + 2, width, width * 0.18);
      ctx.fill();
      // Roller nap: fine streaks along the direction of travel
      ctx.globalAlpha = alpha * 0.35;
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 5; i++) {
        const oy = -width / 2 + Math.random() * width;
        ctx.fillRect(0, oy, dist + 2, 0.8 + Math.random() * 1.4);
      }
      // Wet sheen along the leading edge
      ctx.globalAlpha = alpha * 0.28;
      const g = ctx.createLinearGradient(0, -width / 2, 0, width / 2);
      g.addColorStop(0, "rgba(255,255,255,0.0)");
      g.addColorStop(0.22, "rgba(255,255,255,0.9)");
      g.addColorStop(0.32, "rgba(255,255,255,0.0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, -width / 2, dist + 2, width);
      ctx.restore();
    };

    const nextColor = () => {
      colorIndex = (colorIndex + 1) % PALETTE.length;
      hue = PALETTE[colorIndex];
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - (last?.x ?? e.clientX);
      const dy = e.clientY - (last?.y ?? e.clientY);
      const angle = Math.atan2(dy, dx || 1);
      if (brushRef.current) {
        brushRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(${angle}rad)`;
      }
      if (last) {
        const speed = Math.hypot(dx, dy);
        const width = Math.min(120, 46 + speed * 1.1);
        stamp(last.x, last.y, e.clientX, e.clientY, width, hue, dragging ? 0.34 : 0.2);
      }
      last = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => { dragging = true; nextColor(); };
    const onUp = () => { dragging = false; };
    const onLeave = () => { last = null; };

    const onScroll = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (Math.abs(dy) < 1) return;
      // Roller travels vertically at the pointer's x, like rolling a wall
      const x = pointer.x;
      const y = pointer.y;
      const len = Math.max(-220, Math.min(220, dy * 2.2));
      stamp(x, y, x, y - len, 90, hue, 0.26);
      if (Math.abs(dy) > 90) nextColor();
    };

    let raf = 0;
    const dry = () => {
      // Dry slowly so lower layers re-emerge
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 0.012;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      raf = requestAnimationFrame(dry);
    };
    raf = requestAnimationFrame(dry);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
      <div
        ref={brushRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{
          width: 110,
          height: 34,
          transformOrigin: "14px 50%",
          filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.2))",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: "50%", width: 72, height: 18, transform: "translateY(-50%)", borderRadius: "18px 12px 12px 18px", background: "linear-gradient(90deg, #d4b07a 0%, #9c6940 18%, #4a2b1c 100%)", boxShadow: "inset -8px 0 0 rgba(255,255,255,0.2), inset 10px 0 0 rgba(0,0,0,0.18)" }} />
        <div style={{ position: "absolute", left: 52, top: "50%", width: 38, height: 28, transform: "translateY(-50%)", borderRadius: "14px 18px 18px 14px", background: "linear-gradient(90deg, #b84a2a 0%, #d96a3e 22%, #f0b47d 58%, #d19d4f 100%)", boxShadow: "inset -10px 0 0 rgba(0,0,0,0.14), inset 0 0 0 1px rgba(255,255,255,0.28)" }} />
        <div style={{ position: "absolute", left: 76, top: "50%", width: 24, height: 32, transform: "translateY(-50%)", background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4) 12%, rgba(255,255,255,0.1) 100%)", clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)", opacity: 0.7 }} />
        <div style={{ position: "absolute", left: 14, top: "50%", width: 60, height: 22, transform: "translateY(-50%)", background: "linear-gradient(90deg, rgba(255,255,255,0.78), rgba(255,255,255,0.05))", mixBlendMode: "screen", opacity: 0.7, clipPath: "polygon(0 50%, 100% 10%, 100% 90%, 0 50%)" }} />
      </div>
    </>
  );
}
