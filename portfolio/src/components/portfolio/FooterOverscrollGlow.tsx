"use client";
import {useEffect,useId,useRef,useState} from "react";

const LIGHT_COLORS=[
  {offset:0,color:"#f8f8f8"},
  {offset:.22,color:"#b8c8ff"},
  {offset:.42,color:"#eef2ff"},
  {offset:.6,color:"#ffd700"},
  {offset:.76,color:"#fff1a8"},
  {offset:.9,color:"#d8c8ff"},
  {offset:1,color:"#d8c8ff00"},
];
const DARK_COLORS=[
  {offset:0,color:"#070908"},
  {offset:.28,color:"#18231f"},
  {offset:.52,color:"#52675e"},
  {offset:.72,color:"#d6b94f"},
  {offset:.9,color:"#f0df9a"},
  {offset:1,color:"#f0df9a00"},
];
const WIDTH=1271,HEIGHT=599;

function heights(count:number){const middle=(count-1)/2;return Array.from({length:count},(_,index)=>{const distance=middle?Math.abs(index-middle)/middle:0;return HEIGHT*(.44+.54*(1-Math.pow(distance,1.24)))})}

export function FooterOverscrollGlow(){
  const[intensity,setIntensity]=useState(0);
  const[dark,setDark]=useState(false);
  const energy=useRef(0);
  const frame=useRef(0);
  const touchY=useRef(0);
  const uid=useId().replace(/:/g,"");

  useEffect(()=>{
    const scheme=matchMedia("(prefers-color-scheme: dark)");
    const syncScheme=()=>setDark(scheme.matches);
    syncScheme();scheme.addEventListener("change",syncScheme);
    const atBottom=()=>window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-3;
    const animate=()=>{
      energy.current*=.76;
      if(energy.current<.008){energy.current=0;setIntensity(0);frame.current=0;return}
      setIntensity(energy.current);
      frame.current=requestAnimationFrame(animate);
    };
    const push=(force:number)=>{
      if(!atBottom()||force<=0)return;
      energy.current=Math.min(1,energy.current+force/150);
      setIntensity(energy.current);
      if(!frame.current)frame.current=requestAnimationFrame(animate);
    };
    const onWheel=(event:WheelEvent)=>push(event.deltaY);
    const onTouchStart=(event:TouchEvent)=>{touchY.current=event.touches[0]?.clientY??0};
    const onTouchMove=(event:TouchEvent)=>{const next=event.touches[0]?.clientY??touchY.current;push(touchY.current-next);touchY.current=next};
    const onScroll=()=>{if(!atBottom()){energy.current=0;setIntensity(0)}};
    window.addEventListener("wheel",onWheel,{passive:true});
    window.addEventListener("touchstart",onTouchStart,{passive:true});
    window.addEventListener("touchmove",onTouchMove,{passive:true});
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>{cancelAnimationFrame(frame.current);scheme.removeEventListener("change",syncScheme);window.removeEventListener("wheel",onWheel);window.removeEventListener("touchstart",onTouchStart);window.removeEventListener("touchmove",onTouchMove);window.removeEventListener("scroll",onScroll)};
  },[]);

  const bars=heights(9),barWidth=WIDTH/bars.length,colors=dark?DARK_COLORS:LIGHT_COLORS;
  return <div className="footer-overscroll-glow" style={{opacity:intensity*(dark?.48:.72),transform:`scaleY(${intensity})`}} aria-hidden><svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" fill="none"><defs><linearGradient id={`footer-glow-${uid}`} x1="0" y1="1" x2="0" y2="0">{colors.map(stop=><stop key={stop.offset} offset={stop.offset} stopColor={stop.color}/>)}</linearGradient><filter id={`footer-blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={dark?28:18}/></filter></defs>{bars.map((height,index)=><g key={index} filter={`url(#footer-blur-${uid})`}><rect x={index*barWidth} y={HEIGHT-height} width={barWidth*1.24} height={height} fill={`url(#footer-glow-${uid})`}/></g>)}</svg></div>}
