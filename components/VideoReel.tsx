"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src?: string; poster?: string; className?: string };

export default function VideoReel({ src = "/videos/sidhhartha.mp4", poster = "/videos/poster.jpg", className = "" }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const glow = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);

  // Dynamic reflection glow: sample the live frame into a tiny canvas, then blur it up behind the frame.
  useEffect(() => {
    const v = video.current, c = glow.current;
    if (!v || !c) return;
    const g = c.getContext("2d");
    if (!g) return;
    let raf = 0;
    const loop = () => {
      if (v.readyState >= 2) g.drawImage(v, 0, 0, c.width, c.height);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    v.playsInline = true;
    v.loop = true;
    v.preload = "auto";

    const play = () => setPlaying(true);
    const pause = () => setPlaying(false);

    const start = () => {
      v.muted = true;
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    v.addEventListener("play", play);
    v.addEventListener("pause", pause);
    if (v.readyState >= 3) start();
    else v.addEventListener("canplay", start, { once: true });
    setPlaying(!v.paused);

    return () => {
      v.removeEventListener("play", play);
      v.removeEventListener("pause", pause);
      v.removeEventListener("canplay", start);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else v.pause();
  };
  return (
    <div className={`group relative mx-auto w-full ${className}`}>
      <canvas ref={glow} width={32} height={48} aria-hidden="true" className="absolute -inset-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+4rem)] scale-110 opacity-70 blur-3xl saturate-150" />
      <div className="relative aspect-[628/918] overflow-hidden rounded-md border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        <video ref={video} src={src} poster={poster} muted loop playsInline autoPlay preload="auto" className="absolute inset-0 h-full w-full object-cover brightness-[0.98] contrast-[1.04] saturate-[1.08]" aria-label="Room showcase reel: painted interiors in bedroom, living room, dining and kitchen" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 max-sm:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-center gap-3 px-4 pb-4 opacity-100 transition duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          <button onClick={toggle} className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-charcoal" aria-label={playing ? "Pause reel" : "Play reel"}>
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
