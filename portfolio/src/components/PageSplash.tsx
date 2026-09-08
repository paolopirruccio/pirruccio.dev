"use client";

import {useEffect,useState} from "react";

export function PageSplash(){
  const[phase,setPhase]=useState<"visible"|"leaving"|"hidden">("visible");

  useEffect(()=>{
    let cancelled=false;
    let frame=0;
    let leaveTimer=0;
    let removeTimer=0;
    const started=performance.now();
    const shapesReady=()=>[...document.querySelectorAll<HTMLElement>(".squircle-control")]
      .every(element=>!element.offsetWidth||Boolean(element.style.clipPath));
    const finish=()=>{
      if(cancelled)return;
      leaveTimer=window.setTimeout(()=>{
        if(cancelled)return;
        setPhase("leaving");
        removeTimer=window.setTimeout(()=>setPhase("hidden"),280);
      },Math.max(0,420-(performance.now()-started)));
    };
    const waitForShapes=(attempt=0)=>{
      if(shapesReady()||attempt>=18){finish();return}
      frame=requestAnimationFrame(()=>waitForShapes(attempt+1));
    };
    void document.fonts.ready.then(()=>{
      frame=requestAnimationFrame(()=>requestAnimationFrame(()=>waitForShapes()));
    });
    return()=>{
      cancelled=true;
      cancelAnimationFrame(frame);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  },[]);

  if(phase==="hidden")return null;
  return <div className={`page-splash${phase==="leaving"?" is-leaving":""}`} aria-hidden="true"><span className="page-splash-mark">PP</span></div>;
}
