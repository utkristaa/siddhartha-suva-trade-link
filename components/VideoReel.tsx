"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src?: string; poster?: string; className?: string; background?: boolean };

export default function VideoReel({ src = "/videos/sidhhartha.mp4", poster = "/videos/poster.jpg", className = "", background = false }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const glow = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

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
    const time = () => setProgress(v.duration ? v.currentTime / v.duration : 0);

    const start = () => {
      v.muted = true;
      v.play().catch(() => setPlaying(false));
    };

    v.addEventListener("play", play);
    v.addEventListener("pause", pause);
    v.addEventListener("timeupdate", time);
    if (v.readyState >= 3) start();
    else v.addEventListener("canplay", start, { once: true });
    setPlaying(!v.paused);

    return () => {
      v.removeEventListener("play", play);
      v.removeEventListener("pause", pause);
      v.removeEventListener("timeupdate", time);
      v.removeEventListener("canplay", start);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  };
  const seek = (val: number) => {
    const v = video.current;
    if (!v || !v.duration) return;
    v.currentTime = val * v.duration;
  };

  return (
    <div className={`group ${background ? "absolute inset-0 z-0 max-w-none" : `relative mx-auto w-full max-w-[520px] ${className}`}`}>
      {!background && <canvas ref={glow} width={32} height={48} aria-hidden="true" className="absolute -inset-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] scale-110 opacity-70 blur-3xl saturate-150" />}
      <div className={`relative h-full overflow-hidden bg-black ${background ? "rounded-none border-0 shadow-none" : "rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"}`} style={background ? undefined : { aspectRatio: "628 / 918", WebkitBoxReflect: "below 6px linear-gradient(transparent 72%, rgba(255,255,255,0.22))" } as React.CSSProperties}>
        <video ref={video} src={src} poster={poster} muted loop playsInline autoPlay preload="auto" className={`h-full w-full object-cover brightness-[0.94] contrast-[1.08] saturate-[1.2] ${background ? "absolute inset-0" : "scale-[1.02]"}`} aria-label="Room showcase reel: painted interiors in bedroom, living room, dining and kitchen" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 max-sm:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-center gap-3 px-4 pb-4 opacity-100 transition duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          <button onClick={toggle} className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-charcoal" aria-label={playing ? "Pause reel" : "Play reel"}>
            {playing ? "Pause" : "Play"}
          </button>
          <input type="range" min={0} max={1} step={0.001} value={progress} onChange={(e) => seek(Number(e.target.value))} aria-label="Reel position" className="h-0.5 flex-1 cursor-pointer accent-white" />
        </div>
      </div>
    </div>
  );
}
