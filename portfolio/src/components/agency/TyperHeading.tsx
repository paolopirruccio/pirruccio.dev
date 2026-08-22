"use client";

import {useEffect,useMemo,useRef,useState} from "react";

const STATES=["fill","inverse","accent","border"] as const;

export function TyperHeading({text}:{text:string}){
  const host=useRef<HTMLHeadingElement>(null);
  const chars=useMemo(()=>[...text],[text]);
  const [step,setStep]=useState(-1);

  useEffect(()=>{
    const element=host.current;
    if(!element)return;
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){setStep(Number.MAX_SAFE_INTEGER);return}
    let timer=0;
    const observer=new IntersectionObserver(entries=>{
      if(!entries[0]?.isIntersecting)return;
      observer.disconnect();
      const started=performance.now();
      timer=window.setInterval(()=>{
        const elapsed=performance.now()-started;
        setStep(Math.floor(elapsed/44));
        if(elapsed>chars.length*34+720)window.clearInterval(timer);
      },44);
    },{threshold:.35});
    observer.observe(element);
    return()=>{observer.disconnect();window.clearInterval(timer)};
  },[chars.length,text]);

  let visibleIndex=0;
  return <h2 ref={host} className="studio-typer" aria-label={text}>{text.split(/(\s+)/).map((part,partIndex)=>{
    if(/^\s+$/.test(part))return <span className="studio-typer-space" aria-hidden key={partIndex}> </span>;
    return <span className="studio-typer-word" aria-hidden key={partIndex}>{[...part].map((char,charIndex)=>{
      const index=visibleIndex++;
      const local=step-Math.floor(index*.78);
      const state=step===Number.MAX_SAFE_INTEGER||local>=8?"done":local<0?"init":STATES[(local+index)%STATES.length];
      return <span className={`studio-typer-char typer-${state}`} key={`${charIndex}-${char}`}>{char}</span>;
    })}</span>;
  })}</h2>;
}
