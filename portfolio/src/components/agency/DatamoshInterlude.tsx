"use client";

import {useEffect,useRef} from "react";

const PALETTE=["#f4f1e9","#ffd500","#18231f","#ef5b3f","#7897ff","#171717","#f4f1e9","#ffd500","#171717","#ef5b3f","#f4f1e9"];
const COLS=11,TILES=15,POWER=1.65,CYCLE=.28,COL_PHASE=-.4,STRETCH=8.5,SPRING_K=1.6;
const SPRING_NORM=1-Math.exp(-SPRING_K);
const spring=(p:number)=>{const half=(t:number)=>(1-Math.exp(-SPRING_K*t))/SPRING_NORM;return p<.5?.5*half(2*p):1-.5*half(2*(1-p))};

export function DatamoshInterlude({lang}:{lang:"it"|"en"}){
  const section=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{const host=section.current,c=canvas.current;if(!host||!c)return;const ctx=c.getContext("2d",{alpha:false});if(!ctx)return;const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;let w=1,h=1,dpr=1,edges:number[]=[],elapsed=0,last=0,raf=0,onScreen=false;
    const measure=()=>{const r=c.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);w=Math.max(1,Math.round(r.width*dpr));h=Math.max(1,Math.round(r.height*dpr));c.width=w;c.height=h;ctx.imageSmoothingEnabled=false;edges=Array.from({length:COLS+1},(_,i)=>Math.round(w*Math.pow(i/COLS,POWER)))};
    const edge=(k:number)=>{const u=k/TILES;if(u<0)return u*.05;if(u>1)return 1+(u-1)*.05;const a=Math.pow(u,STRETCH);return a/(a+Math.pow(1-u,STRETCH))};
    const draw=()=>{ctx.fillStyle="#171717";ctx.fillRect(0,0,w,h);for(let i=0;i<COLS;i++){const x=edges[i],cw=edges[i+1]-x,linear=elapsed/CYCLE+i*COL_PHASE,step=Math.floor(linear),flow=step+spring(linear-step),base=-Math.floor(flow),bleed=Math.round(.012*h);for(let n=TILES+2;n>=-2;n--){const id=base+n,k=id+flow,top=Math.round(edge(k)*h),bot=Math.round(edge(k+1)*h)+bleed;if(bot<=top||bot<=0||top>=h)continue;const y=Math.max(0,top),th=Math.min(h,bot)-y;ctx.fillStyle=PALETTE[((id-i)%PALETTE.length+PALETTE.length)%PALETTE.length];ctx.fillRect(x,y,cw,th)}}};
    const tick=(now:number)=>{const dt=last?Math.min(.05,(now-last)/1000):0;last=now;elapsed+=dt;draw();if(onScreen&&!document.hidden)raf=requestAnimationFrame(tick)};
    const io=new IntersectionObserver(entries=>{const next=entries.some(e=>e.isIntersecting);if(next&&!onScreen&&!reduced){onScreen=true;last=0;raf=requestAnimationFrame(tick)}else if(!next){onScreen=false;cancelAnimationFrame(raf)}},{rootMargin:"100px"});
    const scroll=()=>{const r=host.getBoundingClientRect(),travel=Math.max(1,host.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-r.top/travel));host.style.setProperty("--mosh-progress",String(p));host.style.setProperty("--mosh-opacity",String(1-Math.max(0,(p-.68)/.32)))};
    const ro=new ResizeObserver(()=>{measure();draw()});ro.observe(c);io.observe(host);addEventListener("scroll",scroll,{passive:true});measure();if(reduced){elapsed=CYCLE*.45;draw()}scroll();return()=>{cancelAnimationFrame(raf);io.disconnect();ro.disconnect();removeEventListener("scroll",scroll)};
  },[]);
  return <section className="studio-mosh-interlude" ref={section} aria-label={lang==="it"?"Dal rumore alla chiarezza":"From noise to clarity"}><div className="studio-mosh-sticky"><canvas ref={canvas}/><div className="studio-mosh-copy"><h2>{lang==="it"?<>Tolgo il rumore.<br/>Resta ciò che conta.</>:<>Cut the noise.<br/>Keep what matters.</>}</h2><p>{lang==="it"?"Il processo trasforma confusione in una presenza chiara.":"The process turns confusion into a clear presence."}</p></div></div></section>;
}
