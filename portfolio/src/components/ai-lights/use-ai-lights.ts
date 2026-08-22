"use client";
import { RefObject, useEffect, useState } from "react";
import { buildMask, padOf, RIM_LAYERS, RIM_STOPS } from "./mask";
export type Layer = { mask: string; pad: number; ring?: number };

export function useRimMask(ref: RefObject<HTMLElement | null>, radius = 24): Layer[] {
  const [layers, setLayers] = useState<Layer[]>([]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let timer = 0;
    const build = () => { const box = el.getBoundingClientRect(); if (!box.width || !box.height) return;
      setLayers(RIM_LAYERS.map(l => ({ mask: buildMask({ width: box.width, height: box.height, radius, strokeWidth: l.strokeWidth, blur: l.blur, alpha: l.alpha, ring: l.ring, stops: RIM_STOPS }), pad: padOf(l.strokeWidth, l.blur), ring: l.ring })));
    };
    build(); const ro = new ResizeObserver(() => { clearTimeout(timer); timer = window.setTimeout(build, 460) }); ro.observe(el);
    return () => { clearTimeout(timer); ro.disconnect() };
  }, [ref, radius]);
  return layers;
}
