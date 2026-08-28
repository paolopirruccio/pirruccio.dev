"use client";
import { ReactNode, useRef } from "react";
import { useRimMask } from "./use-ai-lights";

export function RimBody({ children, pulseKey, className = "" }: { children: ReactNode; pulseKey: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const layers = useRimMask(ref, 25);
  return <div ref={ref} className={`rim-body ${className}`} data-playing={pulseKey > 0 || undefined}>
    <div className="rim-layers" aria-hidden="true" key={pulseKey}>{layers.flatMap((l, i) => [false, true].map(mirror => <span key={`${i}-${mirror}`} className={`rim-layer ${l.ring ? "rim-ring" : ""} ${mirror ? "rim-mirror" : ""}`} style={{ inset: -l.pad, WebkitMaskImage: `url(${l.mask})`, maskImage: `url(${l.mask})` }} />))}</div>
    <div className="rim-face">{children}</div>
  </div>;
}
