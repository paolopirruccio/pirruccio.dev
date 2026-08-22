export interface RenderedSticker{canvas:HTMLCanvasElement;width:number;height:number}
export interface RenderOpts{word:string;font:string;weight:number;fill:string;outline:string;fontSizePx:number;border?:number;dpr?:number}
export function renderSticker(opts:RenderOpts):RenderedSticker{
  const dpr=opts.dpr??Math.min(devicePixelRatio||1,2),size=opts.fontSizePx,border=opts.border??Math.max(6,Math.round(size*.16)),fontStr=`${opts.weight} ${size}px ${opts.font}`;
  const meas=document.createElement("canvas").getContext("2d")!;meas.font=fontStr;const m=meas.measureText(opts.word),ascent=m.actualBoundingBoxAscent||size*.8,descent=m.actualBoundingBoxDescent||size*.2,pad=border+4,cssW=Math.ceil(m.width+pad*2),cssH=Math.ceil(ascent+descent+pad*2);
  const canvas=document.createElement("canvas");canvas.width=Math.ceil(cssW*dpr);canvas.height=Math.ceil(cssH*dpr);const ctx=canvas.getContext("2d")!;ctx.scale(dpr,dpr);ctx.textBaseline="alphabetic";ctx.font=fontStr;const bx=pad,by=pad+ascent;
  const base=document.createElement("canvas");base.width=canvas.width;base.height=canvas.height;const bctx=base.getContext("2d")!;bctx.scale(dpr,dpr);bctx.font=fontStr;bctx.textBaseline="alphabetic";bctx.fillStyle=opts.outline;
  for(let r=border;r>.5;r-=1){const stamps=Math.max(16,Math.ceil(r*3));for(let a=0;a<stamps;a++){const ang=a/stamps*Math.PI*2;bctx.fillText(opts.word,bx+Math.cos(ang)*r,by+Math.sin(ang)*r)}}bctx.fillText(opts.word,bx,by);
  ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(base,0,0);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=opts.fill;ctx.font=fontStr;ctx.textBaseline="alphabetic";ctx.fillText(opts.word,bx,by);return{canvas,width:cssW,height:cssH};
}
