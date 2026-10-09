"use client";

import { useEffect, useRef, useState } from "react";

const SWATCHES = [
  { name: "Slate blue", hex: "#3E6A8A" },
  { name: "Brick", hex: "#C0553F" },
  { name: "Ochre", hex: "#D9A441" },
  { name: "Sage", hex: "#7E9C84" },
  { name: "Lilac", hex: "#B9A4D9" },
  { name: "Charcoal", hex: "#111111" },
];

export default function BrushPad() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(SWATCHES[1].hex);
  const [size, setSize] = useState(26);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const colorRef = useRef(color);
  const sizeRef = useRef(size);
  colorRef.current = color;
  sizeRef.current = size;

  const fit = () => {
    const c = ref.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = c.getBoundingClientRect();
    const snapshot = document.createElement("canvas");
    snapshot.width = c.width; snapshot.height = c.height;
    snapshot.getContext("2d")?.drawImage(c, 0, 0);
    c.width = r.width * dpr; c.height = r.height * dpr;
    const g = c.getContext("2d")!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = "#fafafa"; g.fillRect(0, 0, r.width, r.height);
    if (snapshot.width) g.drawImage(snapshot, 0, 0, snapshot.width / dpr, snapshot.height / dpr);
  };

  useEffect(() => {
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const pt = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const stroke = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const g = ref.current!.getContext("2d")!;
    const w = sizeRef.current;
    g.lineCap = "round";
    g.lineJoin = "round";
    // Bristles: several offset hairlines, with a lighter wet highlight on top
    const bristles = 7;
    for (let i = 0; i < bristles; i++) {
      const o = (i / (bristles - 1) - 0.5) * w;
      g.globalAlpha = 0.5 + (i % 3) * 0.14;
      g.strokeStyle = colorRef.current;
      g.lineWidth = Math.max(1.5, w / 5);
      g.beginPath();
      g.moveTo(a.x + o * 0.2, a.y + o);
      g.lineTo(b.x + o * 0.2, b.y + o);
      g.stroke();
    }
    g.globalAlpha = 0.16;
    g.strokeStyle = "#ffffff";
    g.lineWidth = w * 0.18;
    g.beginPath();
    g.moveTo(a.x, a.y - w * 0.22);
    g.lineTo(b.x, b.y - w * 0.22);
    g.stroke();
    g.globalAlpha = 1;
  };

  const down = (e: React.PointerEvent) => {
    drawing.current = true;
    last.current = pt(e);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current || !last.current) return;
    const p = pt(e);
    stroke(last.current, p);
    last.current = p;
  };
  const up = () => { drawing.current = false; last.current = null; };
  const clear = () => {
    const c = ref.current!;
    const g = c.getContext("2d")!;
    const r = c.getBoundingClientRect();
    g.fillStyle = "#fafafa";
    g.fillRect(0, 0, r.width, r.height);
  };
  const save = () => {
    const a = document.createElement("a");
    a.download = "my-colour-trail.png";
    a.href = ref.current!.toDataURL("image/png");
    a.click();
  };

  return (
    <div>
      <canvas
        ref={ref}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="h-[360px] w-full cursor-crosshair border border-black/15 bg-studio"
        style={{ touchAction: "none" }}
        role="img"
        aria-label="Drawing pad. Drag to leave a trail of paint."
      />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex gap-2" role="group" aria-label="Paint colour">
          {SWATCHES.map((s) => (
            <button
              key={s.hex}
              onClick={() => setColor(s.hex)}
              aria-label={s.name}
              aria-pressed={color === s.hex}
              className={`h-8 w-8 rounded-full transition ${color === s.hex ? "ring-2 ring-offset-2 ring-charcoal" : "ring-1 ring-black/20"}`}
              style={{ background: s.hex }}
            />
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-black/70">
          Brush width
          <input type="range" min={10} max={60} value={size} onChange={(e) => setSize(Number(e.target.value))} className="accent-charcoal" />
        </label>
        <div className="ml-auto flex gap-2">
          <button onClick={clear} className="rounded-full border border-charcoal px-4 py-2 text-sm font-medium transition hover:bg-charcoal hover:text-white">Clear pad</button>
          <button onClick={save} className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white">Save as image</button>
        </div>
      </div>
    </div>
  );
}
