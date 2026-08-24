"use client";

import {useEffect, useRef} from "react";

type Lang = "it" | "en";

export function StudioWipDialog({open, onClose, lang}:{open:boolean; onClose:()=>void; lang:Lang}){
  const closeButton=useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    if(!open)return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    closeButton.current?.focus();
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape")onClose()};
    window.addEventListener("keydown",onKeyDown);
    return()=>{
      document.body.style.overflow=previousOverflow;
      window.removeEventListener("keydown",onKeyDown);
    };
  },[open,onClose]);

  if(!open)return null;

  return <div className="studio-wip-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}>
    <section id="studio-wip-dialog" className="studio-wip-dialog" role="dialog" aria-modal="true" aria-labelledby="studio-wip-title" aria-describedby="studio-wip-copy">
      <span className="studio-wip-kicker">PRR / STUDIO</span>
      <h2 id="studio-wip-title">Work in progress.</h2>
      <p id="studio-wip-copy">{lang==="it"?"Lo Studio è ancora in costruzione. Torna presto.":"The Studio is still under construction. Check back soon."}</p>
      <button ref={closeButton} type="button" onClick={onClose}>{lang==="it"?"Va bene":"Got it"}</button>
    </section>
  </div>;
}
