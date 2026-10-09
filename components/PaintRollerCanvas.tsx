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

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

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
    let dryRaf = 0;
    let dryUntil = 0;
    let lastDry = 0;

    const dry = (now: number) => {
      if (now - lastDry >= 1000 / 30) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1 - Math.pow(0.988, (now - lastDry) / (1000 / 60));
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
        lastDry = now;
      }
      if (now < dryUntil) {
        dryRaf = requestAnimationFrame(dry);
      } else {
        ctx.clearRect(0, 0, w, h);
        dryRaf = 0;
      }
    };
    const scheduleDrying = () => {
      dryUntil = performance.now() + 2800;
      if (!dryRaf) {
        lastDry = performance.now();
        dryRaf = requestAnimationFrame(dry);
      }
    };

    const stamp = (x0: number, y0: number, x1: number, y1: number, width: number, color: string, alpha: number) => {
      const dx = x1 - x0, dy = y1 - y0;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.5) return;
      const angle = Math.atan2(dy, dx);
      ctx.save();
      ctx.translate(x0, y0);
      ctx.rotate(angle);
      // Soft-edged body with varied opacity keeps the stroke painterly rather than geometric.
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = width * 0.22;
      ctx.beginPath();
      ctx.roundRect(0, -width / 2, dist + 2, width, width * 0.18);
      ctx.fill();
      ctx.shadowBlur = 0;
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
      scheduleDrying();
    };

    const nextColor = () => {
      colorIndex = (colorIndex + 1) % PALETTE.length;
      hue = PALETTE[colorIndex];
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - (last?.x ?? e.clientX);
      const dy = e.clientY - (last?.y ?? e.clientY);
      if (last && dragging) {
        const speed = Math.hypot(dx, dy);
        const width = Math.max(18, Math.min(54, 28 + speed * 0.28));
        stamp(last.x, last.y, e.clientX, e.clientY, width, hue, 0.48);
      }
      last = { x: e.clientX, y: e.clientY };
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      nextColor();
    };
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

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(dryRaf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
  );
}
