"use client";
import {useEffect,useRef} from "react";

const GLYPHS=["●","○","■","□","×","+","◆","◇","▲","✦","✳","⌁","→","⌄"];
const PALETTES=[
  ["#171717","#5478ff","#ffd700","#d9ccff"],
  ["#242424","#6b8cff","#ffdf42","#ff9e80"],
  ["#343434","#8ea5ff","#f2ca00","#c5b1ff"],
];

export function SymbolsSplash({active,playKey}:{active:boolean;playKey:number}){
  const canvas=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(!active||!playKey)return;
    const el=canvas.current;if(!el)return;
    const ctx=el.getContext("2d");if(!ctx)return;
    const ratio=Math.min(2,window.devicePixelRatio||1);
    const palette=PALETTES[Math.floor(Math.random()*PALETTES.length)];
    const glyphs=Array.from({length:4},()=>GLYPHS[Math.floor(Math.random()*GLYPHS.length)]);
    const seed=Math.random()*100;
    let frame=0,start=performance.now();
    const resize=()=>{el.width=Math.round(innerWidth*ratio);el.height=Math.round(innerHeight*ratio);el.style.width=`${innerWidth}px`;el.style.height=`${innerHeight}px`;ctx.setTransform(ratio,0,0,ratio,0,0)};
    resize();
    const draw=(now:number)=>{
      const t=(now-start)/1000;
      ctx.fillStyle="#f8f8f6";ctx.fillRect(0,0,innerWidth,innerHeight);
      const cell=Math.max(17,Math.min(27,innerWidth/42));
      ctx.textAlign="center";ctx.textBaseline="middle";ctx.font=`600 ${cell*.72}px Inter, sans-serif`;
      for(let y=0;y<innerHeight+cell;y+=cell){for(let x=0;x<innerWidth+cell;x+=cell){
        const wave=Math.sin(x*.009+t*3.1+seed)+Math.cos(y*.012-t*2.4)+Math.sin((x+y)*.005+t*1.7);
        const radial=Math.sin(Math.hypot(x-innerWidth/2,y-innerHeight/2)*.018-t*4);
        const level=Math.max(0,Math.min(3,Math.floor(((wave+radial+4)/8)*4)));
        ctx.globalAlpha=.72+.22*Math.sin(t*2+x*.01+y*.007);
        ctx.fillStyle=palette[level];ctx.fillText(glyphs[level],x+cell/2,y+cell/2);
      }}
      ctx.globalAlpha=1;
      frame=requestAnimationFrame(draw);
    };
    frame=requestAnimationFrame(draw);
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("resize",resize)};
  },[active,playKey]);
  return <canvas ref={canvas} className={`symbols-splash ${active?"is-active":""}`} aria-hidden/>;
}
