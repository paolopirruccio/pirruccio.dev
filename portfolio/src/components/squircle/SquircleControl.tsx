"use client";

import {useLayoutEffect,useRef,useState,type AnchorHTMLAttributes,type ButtonHTMLAttributes,type CSSProperties,type HTMLAttributes,type RefObject} from "react";
import {squirclePath} from "./superellipse";

function useSquircleStyle<T extends HTMLElement>(elementRef:RefObject<T|null>){
  const[clipPath,setClipPath]=useState<string>();
  useLayoutEffect(()=>{
    const element=elementRef.current;if(!element)return;
    const measure=()=>{
      const width=element.offsetWidth,height=element.offsetHeight;if(!width||!height)return;
      const inset=Number(element.dataset.squircleInset||0);
      const radius=Math.max(0,Math.min(height*.42,width*.22,72)-inset);
      setClipPath(`path("${squirclePath({width,height,radius,smoothing:1,exponent:5})}")`);
    };
    measure();
    const observer=new ResizeObserver(measure);observer.observe(element);
    return()=>observer.disconnect();
  },[elementRef]);
  return{ready:Boolean(clipPath),style:clipPath?({clipPath,WebkitClipPath:clipPath} as CSSProperties):undefined};
}

export function SquircleButton({className="",style,...props}:ButtonHTMLAttributes<HTMLButtonElement>){const ref=useRef<HTMLButtonElement>(null),shape=useSquircleStyle(ref);return <button {...props} ref={ref} className={`squircle-control ${className}`} style={{...style,...shape.style}}/>}
export function SquircleLink({className="",style,...props}:AnchorHTMLAttributes<HTMLAnchorElement>){const ref=useRef<HTMLAnchorElement>(null),shape=useSquircleStyle(ref);return <a {...props} ref={ref} className={`squircle-control ${className}`} style={{...style,...shape.style}}/>}
export function SquircleBox({className="",style,...props}:HTMLAttributes<HTMLDivElement>){const ref=useRef<HTMLDivElement>(null),shape=useSquircleStyle(ref);return <div {...props} data-squircle-ready={shape.ready||undefined} ref={ref} className={`squircle-control ${className}`} style={{...style,...shape.style}}/>}
export function SquircleArticle({className="",style,...props}:HTMLAttributes<HTMLElement>){const ref=useRef<HTMLElement>(null),shape=useSquircleStyle(ref);return <article {...props} ref={ref} className={`squircle-control ${className}`} style={{...style,...shape.style}}/>}
