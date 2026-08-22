"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SquircleArticle, SquircleBox, SquircleButton, SquircleLink } from "@/components/squircle/SquircleControl";
import { FooterOverscrollGlow } from "@/components/portfolio/FooterOverscrollGlow";
import { ElasticSeparator } from "@/components/portfolio/ElasticSeparator";
import { RimBody } from "@/components/ai-lights/RimBody";
import {portfolioProjects as projects,type PortfolioProject} from "@/data/projects";
import {CASE_STUDIES_ENABLED} from "@/config/features";

type Lang = "it" | "en";

const PassionStickers = dynamic(() => import("@/components/portfolio/PassionStickers").then(module => module.PassionStickers), { ssr: false });
const TravelGallery = dynamic(() => import("@/components/portfolio/TravelGallery").then(module => module.TravelGallery), { ssr: false });

const text = {
  it:{projects:"Qualche progetto",all:"Vedi tutti",about:"Qualche info",services:"Servizi",profile:"Profilo",experience:"Esperienza",education:"Istruzione",skills:"Competenze",download:"Scarica CV",contact:"Contattami",popular:"Più scelto",profileText:"UX designer con formazione umanistica e competenze tecniche trasversali. Progetta interfacce intuitive e accessibili, curando l’esperienza utente e la coerenza visiva. Abile nel mediare tra design e sviluppo grazie alla conoscenza dei linguaggi web."},
  en:{projects:"Some projects",all:"View all",about:"About me",services:"Services",profile:"Profile",experience:"Experience",education:"Education",skills:"Skills",download:"Download CV",contact:"Contact me",popular:"Most popular",profileText:"UX designer with a humanities background and broad technical skills. Designs intuitive, accessible interfaces with attention to user experience and visual coherence, bridging design and development through web technologies."},
};

const serviceData = [
  {name:"Quick Fix",icon:"fa-solid fa-wrench",price:"€30",unit:"1h",desc:{it:"Fix rapidi, bug e piccole modifiche",en:"Quick fixes, bugs and small changes"},items:{it:["Correzione bug","Modifiche testo/immagini","Fix responsive","Supporto via chat"],en:["Bug fixing","Text/image changes","Responsive fixes","Chat support"]}},
  {name:"Standard",icon:"fa-solid fa-code",price:"€75",unit:"3h",featured:true,desc:{it:"Aggiornamenti, nuove sezioni e restyling",en:"Updates, new sections and restyling"},items:{it:["Tutto del Quick Fix","Nuove sezioni o pagine","Restyling grafico","SEO base"],en:["Everything in Quick Fix","New sections or pages","Visual restyling","Basic SEO"]}},
  {name:"Pro",icon:"fa-solid fa-rocket",price:"€120",unit:"6h",desc:{it:"Progetti corposi e redesign completo",en:"Larger projects and complete redesign"},items:{it:["Tutto dello Standard","Redesign completo","Nuove funzionalità","Consulenza UX/UI"],en:["Everything in Standard","Complete redesign","New features","UX/UI consulting"]}},
];

export function RemainingPortfolio({lang,onOpenStudio}:{lang:Lang;onOpenStudio:()=>void}){
  const t=text[lang]; const projectDeck=useRef<HTMLDivElement>(null); const [cvOpen,setCvOpen]=useState(false); const [travelOpen,setTravelOpen]=useState(false);
  return <div className="react-portfolio">
    <ElasticSeparator label={lang==="it"?"Separatore tra contatti e progetti":"Separator between contacts and projects"}/>
    <section className="react-section projects-section"><h2>{t.projects}</h2><div className="react-slider-wrap"><SquircleButton className="react-arrow prev" onClick={()=>projectDeck.current?.scrollBy({left:-384,behavior:"smooth"})}><i className="fa-solid fa-chevron-left"/></SquircleButton><div className="react-project-deck" ref={projectDeck}>{projects.map(p=><ProjectCard key={p.title} project={p} lang={lang}/>) }<SquircleLink className="view-all-card" href="/gallery"><i className="fa-solid fa-arrow-right"/><span>{t.all}</span></SquircleLink></div><SquircleButton className="react-arrow next" onClick={()=>projectDeck.current?.scrollBy({left:384,behavior:"smooth"})}><i className="fa-solid fa-chevron-right"/></SquircleButton></div></section>
    <ElasticSeparator/>
    <Accordion title={t.about} open={cvOpen} setOpen={setCvOpen}><div className="react-cv"><aside><h3>Paolo Pirruccio</h3><span className="role">UX/UI Designer</span><Info title={t.skills}><p>Figma, Sketch, Adobe Suite<br/>HTML, CSS, WordPress<br/>JavaScript, PHP, SQL</p></Info><SquircleLink className="cv-download" href="/legacy/assets/cv-paolo-pirruccio.pdf"><i className="fa-solid fa-file-arrow-down"/> {t.download}</SquircleLink></aside><div className="cv-content"><Info title={t.profile}><p>{t.profileText}</p></Info><Info title={t.experience}><Entry title="Digital Marketing & UX" meta="CityComm s.r.l · Laprendoconsport.it"/><Entry title={lang==="it"?"Volontario FAI":"FAI Volunteer"} meta="Fondo Ambiente Italiano · Siracusa"/></Info><Info title={t.education}><Entry title={lang==="it"?"Magistrale in Informatica Umanistica":"Master’s Degree in Digital Humanities"} meta={lang==="it"?"Università di Pisa · In corso":"University of Pisa · Ongoing"}/><Entry title={lang==="it"?"Laurea in Informatica Umanistica":"Bachelor’s Degree in Digital Humanities"} meta="Università di Pisa · 2025"/></Info></div></div></Accordion>
    <ElasticSeparator/>
    <Accordion title={lang==="it"?"Qualche foto":"Some photos"} open={travelOpen} setOpen={setTravelOpen}>{travelOpen?<TravelGallery lang={lang}/>:null}</Accordion>
    <PortfolioFooter lang={lang} onOpenStudio={onOpenStudio}/>
  </div>;
}

export function AgencyServices({lang}:{lang:Lang}){
  const [open,setOpen]=useState(false);
  const t=text[lang];
  return <div className="react-portfolio agency-services"><Accordion title={t.services} open={open} setOpen={setOpen} id="services"><div className="react-pricing">{serviceData.map(s=><SquircleArticle className={s.featured?"featured":""} key={s.name}>{s.featured&&<span className="pricing-badge">{t.popular}</span>}<div className="price-head"><i className={s.icon}/><h3>{s.name}</h3><p>{s.desc[lang]}</p></div><div className="price"><strong>{s.price}</strong><span> / {s.unit}</span></div><ul>{s.items[lang].map(x=><li key={x}><i className="fa-solid fa-check"/>{x}</li>)}</ul><SquircleLink href={`mailto:pirruccio.01@gmail.com?subject=${s.name}`}>{t.contact}</SquircleLink></SquircleArticle>)}</div></Accordion></div>;
}

function projectMonogram(title:string){const ignored=new Set(["il","lo","la","i","gli","le","the","project"]);const words=title.trim().split(/\s+/).filter(word=>!ignored.has(word.toLowerCase()));return words.slice(0,2).map(word=>word[0]).join("").toUpperCase()||title.slice(0,2).toUpperCase()}
export function ProjectCard({project:p,lang}:{project:PortfolioProject;lang:Lang}){const [logoError,setLogoError]=useState(false);const hasLogo=Boolean(p.logo)&&!logoError;const destination=CASE_STUDIES_ENABLED?p.href:p.liveHref;const content=<><SquircleBox className="project-card-surface"/><div className="project-thumbs"><img className="back" src={p.images[1]||p.images[0]} alt="" loading="lazy" decoding="async"/><img className="front" src={p.images[0]} alt="" loading="lazy" decoding="async"/></div><div className="project-body"><SquircleBox className={`project-logo${hasLogo?"":" is-monogram"}`}>{hasLogo&&<img src={p.logo} alt="" loading="lazy" decoding="async" onError={()=>setLogoError(true)}/>}<i aria-hidden="true">{projectMonogram(p.title)}</i></SquircleBox><strong>{p.title}</strong><p>{p.desc[lang]}</p></div>{destination&&<i className="fa-solid fa-arrow-right project-arrow"/>}</>;return destination?<a className="react-project-card" href={destination} style={{"--proj-color":p.color} as CSSProperties} aria-label={`${p.title} — ${lang==="it"?"visita il progetto":"visit project"}`}>{content}</a>:<article className="react-project-card is-disabled" style={{"--proj-color":p.color} as CSSProperties} aria-label={`${p.title} — ${lang==="it"?"progetto non disponibile":"project unavailable"}`}>{content}</article>}
export function PortfolioFooter({lang,onOpenStudio}:{lang:Lang;onOpenStudio?:()=>void}){const[pulse,setPulse]=useState(0);const openStudio=()=>{setPulse(value=>value+1);onOpenStudio?.()};return <><footer className="react-footer"><ElasticSeparator label={lang==="it"?"Separatore del footer":"Footer separator"}/><div className="react-footer-meta"><p>© {new Date().getFullYear()} Paolo Pirruccio. All rights reserved.</p><div className="footer-socials-react"><a href="mailto:pirruccio.01@gmail.com" aria-label={lang==="it"?"Invia una email":"Send an email"}><i className="fa-solid fa-envelope"/></a><a href="https://www.instagram.com/pirruccio_paolo/" aria-label="Instagram"><i className="fa-brands fa-instagram"/></a><a href="https://www.linkedin.com/in/paolopirruccio/" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"/></a><a href="https://t.me/sunriseshy" aria-label="Telegram"><i className="fa-brands fa-telegram"/></a></div></div><LazyPassionStickers/>{onOpenStudio?<section className="portfolio-studio-invite"><h2>{lang==="it"?"Occasionalmente mi trovate nello":"Occasionally, you can find me at the"}</h2><RimBody pulseKey={pulse} className="portfolio-studio-rim"><SquircleButton className="portfolio-studio-cta" onClick={openStudio}>Studio</SquircleButton></RimBody></section>:null}</footer><FooterOverscrollGlow/></>}
function LazyPassionStickers(){const host=useRef<HTMLDivElement>(null);const[ready,setReady]=useState(false);useEffect(()=>{const node=host.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setReady(true);observer.disconnect()}},{rootMargin:"240px"});observer.observe(node);return()=>observer.disconnect()},[]);return <div ref={host}>{ready?<PassionStickers/>:null}</div>}
function Accordion({title,open,setOpen,children,id}:{title:string;open:boolean;setOpen:(v:boolean)=>void;children:React.ReactNode;id?:string}){return <section className="react-section accordion" id={id}><button className="accordion-head" onClick={()=>setOpen(!open)} aria-expanded={open}><h2>{title}</h2><i className={`fa-solid fa-chevron-down ${open?"open":""}`}/></button><div className={`accordion-body ${open?"open":""}`}>{children}</div></section>}
function Info({title,children}:{title:string;children:React.ReactNode}){return <section className="cv-info"><h4>{title}</h4>{children}</section>}
function Entry({title,meta}:{title:string;meta:string}){return <div className="cv-entry"><strong>{title}</strong><span>{meta}</span></div>}
