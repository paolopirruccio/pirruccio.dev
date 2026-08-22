export interface MaskStop { color: string; stop: number }
export interface MaskOptions {
  width: number; height: number; radius: number; strokeWidth: number; blur: number;
  alpha?: number; stops: MaskStop[]; ring?: number; stopsStart?: number;
}

export const RIM_STOPS: MaskStop[] = [
  { color: "#000", stop: 54 }, { color: "transparent", stop: 126 },
  { color: "transparent", stop: 333 }, { color: "rgba(0,0,0,.1)", stop: 347 },
  { color: "#000", stop: 360 },
];
export const RIM_LAYERS = [
  { strokeWidth: 0, blur: 0, alpha: 1, ring: 1 },
  { strokeWidth: 4, blur: 4, alpha: .3 }, { strokeWidth: 8, blur: 8, alpha: .2 },
  { strokeWidth: 16, blur: 12, alpha: .1 }, { strokeWidth: 20, blur: 20, alpha: .32 },
];

let scratch: HTMLCanvasElement | null = null;
const cache = new Map<string, string>();

export function buildMask(o: MaskOptions): string {
  if (typeof document === "undefined") return "";
  const key = [Math.round(o.width), Math.round(o.height), Math.round(o.radius), o.strokeWidth, o.blur, o.alpha, o.ring].join("|");
  const hit = cache.get(key); if (hit) return hit;
  const pad = Math.ceil(o.strokeWidth + o.blur * 3);
  const w = Math.max(1, Math.ceil(o.width) + pad * 2), h = Math.max(1, Math.ceil(o.height) + pad * 2);
  scratch ??= document.createElement("canvas"); scratch.width = w; scratch.height = h;
  const ctx = scratch.getContext("2d"); if (!ctx) return "";
  ctx.clearRect(0, 0, w, h);
  if (o.blur) ctx.filter = `blur(${/^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? o.blur * .25 : o.blur}px)`;
  const g = ctx.createConicGradient(((o.stopsStart ?? 0) * Math.PI) / 180, w / 2, h / 2);
  o.stops.forEach(s => g.addColorStop(s.stop / 360, s.color)); ctx.strokeStyle = g; ctx.fillStyle = g;
  ctx.globalAlpha = o.alpha ?? 1;
  const x = (w - o.width) / 2, y = (h - o.height) / 2, r = Math.min(o.radius, o.width / 2, o.height / 2);
  ctx.beginPath(); ctx.roundRect(x, y, o.width, o.height, r);
  if (o.strokeWidth) { ctx.lineWidth = o.strokeWidth; ctx.stroke(); }
  else { ctx.fill(); if (o.ring) { ctx.globalCompositeOperation = "destination-out"; ctx.globalAlpha = 1; ctx.filter = "none"; ctx.beginPath(); ctx.roundRect(x + 1, y + 1, o.width - 2, o.height - 2, Math.max(0, r - 1)); ctx.fill(); } }
  const url = scratch.toDataURL("image/png"); if (cache.size >= 24) cache.delete(cache.keys().next().value!); cache.set(key, url); return url;
}
export const padOf = (strokeWidth: number, blur: number) => Math.ceil(strokeWidth + blur * 3);
