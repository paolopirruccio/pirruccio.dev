"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { vscoPhotos as photos } from "@/data/vscoPhotos";
import "./TravelGallery.css";

type Lang = "it" | "en";
const positions = [{ scale: 1, x: 0, y: 0, rotate: -1 }, { scale: .96, x: 15, y: 13, rotate: 1.4 }, { scale: .92, x: 29, y: 25, rotate: -1.8 }, { scale: .88, x: 42, y: 36, rotate: 1 }];

function shuffledPhotoOrder() {
  const next = photos.map((_, index) => index);
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}

export function TravelGallery({ lang }: { lang: Lang }) {
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState(shuffledPhotoOrder);
  const [hasLoaded, setHasLoaded] = useState(false);
  const justDragged = useRef(false);
  const cycle = () => setOrder((previous) => [...previous.slice(1), previous[0]]);

  return <div className={`travel-stack-section ${hasLoaded ? "is-ready" : "is-loading"}`}>
    {!hasLoaded&&<div className="travel-photo-loading" role="status" aria-label={lang === "it" ? "Caricamento fotografie" : "Loading photographs"}><span/><span/><span/><i/></div>}
    <div className="travel-editorial-copy">
      <div className="travel-stack-copy">
        <p>{lang === "it" ? "Qualche ricordo, senza un ordine preciso." : "A few memories, in no particular order."}</p>
        <small>{lang === "it" ? "Tocca o trascina per sfogliare" : "Tap or drag to browse"}</small>
      </div>
      <div className="travel-memory-mark" aria-hidden><i /><i /><i /><b /></div>
    </div>
    <div className="travel-photo-column"><div className="travel-photo-stack" aria-label={lang === "it" ? "Mazzo di fotografie di viaggio" : "Stack of travel photographs"}>
      {order.slice(0, positions.length).map((photoIndex, pos) => {
        const photo = photos[photoIndex], rest = positions[Math.min(pos, positions.length - 1)], front = pos === 0;
        return <motion.figure animate={{ rotate: rest.rotate, scale: rest.scale, x: rest.x, y: rest.y }} aria-label={front ? `${photo.place} — ${lang === "it" ? "prossima foto" : "next photo"}` : undefined} className={`travel-stack-card ${front ? "is-front" : "is-behind"}`} drag={front && !reduceMotion ? "x" : false} dragSnapToOrigin key={photo.id} onClick={() => { if (!front) return; if (justDragged.current) { justDragged.current = false; return; } cycle(); }} onDragEnd={() => { justDragged.current = true; cycle(); }} onKeyDown={(event) => { if (front && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); cycle(); } }} role={front ? "button" : undefined} style={{ cursor: front ? "grab" : "default", zIndex: photos.length - pos }} tabIndex={front ? 0 : -1} transition={reduceMotion ? { duration: 0 } : { damping: 30, stiffness: 320, type: "spring" }} whileDrag={{ cursor: "grabbing", rotate: front ? -3 : 0, scale: 1.02 }}>
          <img alt={photo.place} decoding="async" draggable={false} loading={front ? "eager" : "lazy"} onError={()=>setHasLoaded(true)} onLoad={()=>setHasLoaded(true)} src={photo.src} />
          <figcaption className={front ? "" : "is-hidden"}><strong>{photo.place}</strong></figcaption>
          {pos > 0 && <i aria-hidden style={{ opacity: pos === 1 ? .16 : .3 }} />}
        </motion.figure>;
      })}
    </div></div>
  </div>;
}
