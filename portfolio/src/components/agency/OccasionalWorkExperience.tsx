"use client";

import {useEffect,useRef,useState,type CSSProperties,type MouseEvent} from "react";
import dynamic from "next/dynamic";
import {RimBody} from "@/components/ai-lights/RimBody";
import {SquircleLink} from "@/components/squircle/SquircleControl";

type Lang="it"|"en";

const AgencyBlurHero=dynamic(()=>import("@/components/agency/AgencyBlurHero").then(module=>module.AgencyBlurHero));

const copy={
  it:{services:"Cosa posso costruire per te",process:"Ecco come funziona.",faq:"Prima di scrivermi"},
  en:{services:"What I can build for you",process:"Here’s how it works.",faq:"Before you write"},
};

const serviceCards=[
  {n:"01",title:{it:"Un sito tutto nuovo.",en:"A brand-new website."},text:{it:"Struttura, interfaccia e sviluppo responsive. Fino a 5 pagine, modulo contatti e ti faccio trovare su Google.",en:"Structure, interface and responsive development. Up to 5 pages, a contact form and the essentials to help people find you on Google."},price:"€400*"},
  {n:"02",title:{it:"Recupero il recuperabile.",en:"I’ll salvage what I can."},text:{it:"Do una sistematina al tuo sito attuale. Se è umanamente possibile.",en:"I’ll tidy up your current website. If it is humanly possible."},price:"€300*"},
  {n:"03",title:{it:"Sito a singola pagina.",en:"A single-page website."},text:{it:"Chiamata anche Landing page. L’essenziale.",en:"Also known as a landing page. Just the essentials."},price:"€250*"},
];

export function OccasionalWorkExperience({lang}:{lang:Lang}){
  const t=copy[lang];
  const[mailPulse,setMailPulse]=useState(0);
  const mailTimer=useRef<number|null>(null);
  const openMailAfterPulse=(event:MouseEvent<HTMLAnchorElement>)=>{
    event.preventDefault();
    if(mailTimer.current)window.clearTimeout(mailTimer.current);
    setMailPulse(value=>value+1);
    mailTimer.current=window.setTimeout(()=>{window.location.href="mailto:pirruccio.01@gmail.com"},900);
  };
  useEffect(()=>()=>{if(mailTimer.current)window.clearTimeout(mailTimer.current)},[]);
  const faqs=lang==="it"?
    [{q:"Quanto costa?",a:"Dipende dalla complessità. Dopo una prima call ricevi una proposta chiara, con prezzo e tempi definiti."},{q:"Quanto tempo serve?",a:"Una landing richiede in genere 1–2 settimane; un sito completo 3–5 settimane."},{q:"Lavori anche con un sito già esistente?",a:"Sì. Posso intervenire con un redesign completo o migliorare soltanto le parti che frenano il progetto."},{q:"Poi resto da solo?",a:"No. Consegna guidata, documentazione essenziale e un periodo di supporto post-lancio definito nel preventivo."}]:
    [{q:"How much does it cost?",a:"It depends on complexity. After an initial call, you receive a clear proposal with defined timing and price."},{q:"How long does it take?",a:"A landing page usually takes 1–2 weeks; a complete website takes 3–5 weeks."},{q:"Can you work on an existing site?",a:"Yes. I can redesign it completely or improve only the parts holding the project back."},{q:"Am I left alone after launch?",a:"No. You receive a guided handoff, essential documentation and a post-launch support period defined in the proposal."}];

  return <div className="occasional-work-experience studio-page">
    <AgencyBlurHero lang={lang}/>
    <div className="occasional-work-content">
      <section className="studio-section studio-process"><header><h2>{t.process}</h2></header><div className="liquid-process-grid">
        <ProcessCard n="01" tag="Brief" title={lang==="it"?"Ci capiamo.":"We understand each other."} text={lang==="it"?"Obiettivi, pubblico e cosa deve fare davvero il sito. Decido il pacchetto (e il prezzo) giusto per te.":"Goals, audience and what the website actually needs to do. I choose the right package (and price) for you."}/>
        <ProcessCard n="02" tag="Demo" title={lang==="it"?"Via ai lavori":"Work begins"} text={lang==="it"?"Architettura, testi e interfaccia. Hai due revisioni totali incluse nel prezzo.":"Structure, copy and interface. Two rounds of revisions are included in the price."}/>
        <ProcessCard n="03" tag="Live" title={lang==="it"?"Sito pronto":"Website ready"} text={lang==="it"?"Codice veloce, responsive e semplice da mantenere.":"Fast, responsive code that stays easy to maintain."}/>
      </div></section>
      <section className="studio-section studio-services occasional-stacked-services"><header><h2>{t.services}</h2></header><StackedServices lang={lang}/><p className="studio-service-disclaimer">{lang==="it"?"* Salvo imprevisti. Non ce ne dovrebbero essere.":"* Barring surprises. There shouldn’t be any."}</p></section>
      <section className="studio-faq occasional-faq"><header><h2>{t.faq}</h2></header>{faqs.map((faq,index)=><Faq key={index}{...faq}/>)}</section>
      <section className="occasional-contact-finale"><RimBody pulseKey={mailPulse} className="occasional-mail-rim"><SquircleLink className="occasional-mail-link" href="mailto:pirruccio.01@gmail.com" onClick={openMailAfterPulse}>{lang==="it"?"Scrivimi":"Email me"}</SquircleLink></RimBody><small>{lang==="it"?"Quando vuoi iniziare, scrivimi qui.":"When you’re ready to start, email me here."}</small></section>
    </div>
  </div>;
}

function Faq({q,a}:{q:string;a:string}){const[open,setOpen]=useState(false);return <button className="studio-faq-row" onClick={()=>setOpen(!open)} aria-expanded={open}><span>{q}</span><b>{open?"−":"+"}</b><i className={open?"open":""}>{a}</i></button>}
function ProcessCard({n,tag,title,text}:{n:string;tag:string;title:string;text:string}){return <article className="liquid-process-unit"><div className="liquid-unit-skin" aria-hidden><i className="liquid-unit-card"/><i className="liquid-unit-tab"/></div><div className="liquid-process-copy"><b>{n}</b><h3>{title}</h3><p>{text}</p></div><div className="liquid-tab-handle">{tag}</div></article>}
function StackedServices({lang}:{lang:Lang}){const deck=useRef<HTMLDivElement>(null);useEffect(()=>{const host=deck.current;if(!host||matchMedia("(max-width: 900px), (prefers-reduced-motion: reduce)").matches)return;const cards=[...host.querySelectorAll<HTMLElement>(".studio-service-pane")],contents=[...host.querySelectorAll<HTMLElement>(".studio-service-card")];let frame=0;const update=()=>{frame=0;cards.forEach((card,i)=>{const content=contents[i],next=cards[i+1];if(!content||!next){if(content)content.style.transform="";return}const pinned=96+(i+1)*42,offset=next.getBoundingClientRect().top-pinned,distance=Math.max(card.offsetHeight-pinned,1),progress=Math.max(0,Math.min(1,1-offset/distance)),end=.94+i*.025;content.style.transform=progress<.001?"":`scale(${1+(end-1)*progress})`})};const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",onScroll);return()=>{removeEventListener("scroll",onScroll);removeEventListener("resize",onScroll);cancelAnimationFrame(frame);contents.forEach(item=>item.style.transform="")}},[]);return <div className="studio-service-stack" ref={deck}>{serviceCards.map((service,index)=><div className="studio-service-pane" style={{"--service-index":index+1} as CSSProperties} key={service.n}><article className="studio-service-card"><h3>{service.title[lang]}</h3><p>{service.text[lang]}</p><small className="studio-service-price"><strong>{service.price}</strong></small></article></div>)}</div>}
