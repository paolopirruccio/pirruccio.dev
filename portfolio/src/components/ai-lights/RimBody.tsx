"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRimMask } from "./use-ai-lights";

export function RimBody({ children, pulseKey, className = "" }: { children: ReactNode; pulseKey: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const layers = useRimMask(ref, 25); const [playing, setPlaying] = useState(false);
  useEffect(() => { if (!pulseKey) return; setPlaying(false); const a = requestAnimationFrame(() => requestAnimationFrame(() => setPlaying(true))); return () => cancelAnimationFrame(a) }, [pulseKey]);
  return <div ref={ref} className={`rim-body ${className}`} data-playing={playing || undefined}>
    <div className="rim-layers" aria-hidden="true">{layers.flatMap((l, i) => [false, true].map(mirror => <span key={`${i}-${mirror}`} className={`rim-layer ${l.ring ? "rim-ring" : ""} ${mirror ? "rim-mirror" : ""}`} style={{ inset: -l.pad, WebkitMaskImage: `url(${l.mask})`, maskImage: `url(${l.mask})` }} />))}</div>
    <div className="rim-face">{children}</div>
  </div>;
}
