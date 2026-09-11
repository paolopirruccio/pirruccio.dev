"use client";

import { CSSProperties, useCallback, useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SquircleBox, SquircleButton, SquircleLink } from "@/components/squircle/SquircleControl";
import { FooterOverscrollGlow } from "@/components/portfolio/FooterOverscrollGlow";
import { ElasticSeparator } from "@/components/portfolio/ElasticSeparator";
import {portfolioProjects as projects,type PortfolioProject} from "@/data/projects";

type Lang = "it" | "en";

const PassionStickers = dynamic(() => import("@/components/portfolio/PassionStickers").then(module => module.PassionStickers), { ssr: false });
const TravelGallery = dynamic(() => import("@/components/portfolio/TravelGallery").then(module => module.TravelGallery), { ssr: false, loading: () => <SectionSkeleton kind="photos" /> });
const OccasionalWorkExperience = dynamic(() => import("@/components/agency/OccasionalWorkExperience").then(module => module.OccasionalWorkExperience), { ssr: false, loading: () => <SectionSkeleton kind="services" /> });

const text = {
  it:{projects:"Progetti e casi studio",all:"Vedi tutti",about:"Su di me",services:"Qualche servizio",profile:"Profilo",experience:"Esperienza",education:"Istruzione",skills:"Competenze",download:"Scarica CV",contact:"Contattami",popular:"Più scelto",profileText:"UX designer con formazione umanistica e competenze tecniche trasversali. Progetta interfacce intuitive e accessibili, curando l’esperienza utente e la coerenza visiva. Abile nel mediare tra design e sviluppo grazie alla conoscenza dei linguaggi web."},
  en:{projects:"Projects and case studies",all:"View all",about:"About me",services:"Some services",profile:"Profile",experience:"Experience",education:"Education",skills:"Skills",download:"Download CV",contact:"Contact me",popular:"Most popular",profileText:"UX designer with a humanities background and broad technical skills. Designs intuitive, accessible interfaces with attention to user experience and visual coherence, bridging design and development through web technologies."},
};

export function RemainingPortfolio({lang,onOpenStudio}:{lang:Lang;onOpenStudio:()=>void}){
  const t=text[lang]; const projectDeck=useRef<HTMLDivElement>(null); const serviceScrollTimer=useRef(0); const [servicesOpen,setServicesOpen]=useState(false); const [cvOpen,setCvOpen]=useState(false); const [travelOpen,setTravelOpen]=useState(false);
  const closeOccasionalWork=useCallback(()=>setServicesOpen(false),[]);
  const centerServiceHero=useCallback(function seek(attempt=0){
    const hero=document.querySelector("#servizi .studio-cycle-hero");
    if(hero){hero.scrollIntoView({behavior:"smooth",block:"center"});return}
    if(attempt<40)serviceScrollTimer.current=window.setTimeout(()=>seek(attempt+1),60);
  },[]);
  const openServicesCentered=useCallback(()=>{
    window.clearTimeout(serviceScrollTimer.current);
    setServicesOpen(true);
    serviceScrollTimer.current=window.setTimeout(()=>centerServiceHero(),0);
  },[centerServiceHero]);
  useEffect(()=>{
    window.addEventListener("open-portfolio-services",openServicesCentered);
    return()=>{window.removeEventListener("open-portfolio-services",openServicesCentered);window.clearTimeout(serviceScrollTimer.current)};
  },[openServicesCentered]);
  return <div className="react-portfolio">
    <ElasticSeparator label={lang==="it"?"Separatore tra contatti e progetti":"Separator between contacts and projects"}/>
    <section className="react-section projects-section"><div className="projects-section-head"><h2>{t.projects}</h2><a className="projects-gallery-link" href="/gallery" aria-label={lang==="it"?"Vedi tutti i progetti":"View all projects"}><i className="fa-solid fa-chevron-right" aria-hidden="true"/></a></div><div className="react-slider-wrap"><SquircleButton className="react-arrow prev" aria-label={lang==="it"?"Progetti precedenti":"Previous projects"} onClick={()=>projectDeck.current?.scrollBy({left:-384,behavior:"smooth"})}><i className="fa-solid fa-chevron-left" aria-hidden="true"/></SquircleButton><div className="react-project-deck" ref={projectDeck}>{projects.map(p=><ProjectCard key={p.title} project={p} lang={lang}/>) }<SquircleLink className="view-all-card" href="/gallery"><i className="fa-solid fa-table-cells-large" aria-hidden="true"/><span>{t.all}</span></SquircleLink></div><SquircleButton className="react-arrow next" aria-label={lang==="it"?"Progetti successivi":"Next projects"} onClick={()=>projectDeck.current?.scrollBy({left:384,behavior:"smooth"})}><i className="fa-solid fa-chevron-right" aria-hidden="true"/></SquircleButton></div></section>
    <ElasticSeparator/>
    <Accordion id="portfolio-about" title={t.about} open={cvOpen} setOpen={setCvOpen}><div className="react-cv"><aside><h3>Paolo Pirruccio</h3><span className="role">UX/UI Designer</span><Info title={t.skills}><p>Figma, Sketch, Adobe Suite<br/>HTML, CSS, WordPress<br/>JavaScript, PHP, SQL</p></Info><SquircleLink className="cv-download" href="/assets/cv-paolo-pirruccio.pdf"><i className="fa-solid fa-file-arrow-down"/> {t.download}</SquircleLink></aside><div className="cv-content"><Info title={t.profile}><p>{t.profileText}</p></Info><Info title={t.experience}><Entry title="Digital Marketing & UX" meta="CityComm s.r.l · Laprendoconsport.it"/><Entry title={lang==="it"?"Volontario FAI":"FAI Volunteer"} meta="Fondo Ambiente Italiano · Siracusa"/></Info><Info title={t.education}><Entry title={lang==="it"?"Magistrale in Informatica Umanistica":"Master’s Degree in Digital Humanities"} meta={lang==="it"?"Università di Pisa · In corso":"University of Pisa · Ongoing"}/><Entry title={lang==="it"?"Laurea in Informatica Umanistica":"Bachelor’s Degree in Digital Humanities"} meta="Università di Pisa · 2025"/></Info></div></div></Accordion>
    <ElasticSeparator/>
    <Accordion id="servizi" title={t.services} open={servicesOpen} setOpen={next=>next?openServicesCentered():closeOccasionalWork()} className="occasional-work-accordion">{servicesOpen?<OccasionalWorkExperience lang={lang}/>:null}</Accordion>
    <ElasticSeparator/>
    <Accordion className="miscellaneous-accordion" title={lang==="it"?"Cose varie":"Odds and ends"} open={travelOpen} setOpen={setTravelOpen}>{travelOpen?<TravelGallery lang={lang}/>:null}</Accordion>
    <PortfolioFooter lang={lang} onOpenStudio={onOpenStudio}/>
  </div>;
}

function projectMonogram(title:string){const ignored=new Set(["il","lo","la","i","gli","le","the","project"]);const words=title.trim().split(/\s+/).filter(word=>!ignored.has(word.toLowerCase()));return words.slice(0,2).map(word=>word[0]).join("").toUpperCase()||title.slice(0,2).toUpperCase()}
export function ProjectCard({project:p,lang}:{project:PortfolioProject;lang:Lang}){
  const [logoError,setLogoError]=useState(false);
  const hasLogo=Boolean(p.logo)&&!logoError;
  const studyLabel=`${p.title} — ${lang==="it"?"leggi il case study":"read the case study"}`;
  const siteLabel=`${p.title} — ${lang==="it"?"apri il sito":"open website"}`;
  return <article className="react-project-card" style={{"--proj-color":p.color} as CSSProperties}>
    <span className="project-card-shadow" aria-hidden="true"><SquircleBox className="project-card-surface"/></span><div className="project-thumbs"><img className="back" src={p.images[1]||p.images[0]} alt="" loading="lazy" decoding="async"/><img className="front" src={p.images[0]} alt="" loading="lazy" decoding="async"/></div><div className="project-body"><SquircleBox className={`project-logo${hasLogo?"":" is-monogram"}`}>{hasLogo&&<img src={p.logo} alt="" loading="lazy" decoding="async" onError={()=>setLogoError(true)}/>}<i aria-hidden="true">{projectMonogram(p.title)}</i></SquircleBox><strong>{p.title}</strong><p>{p.desc[lang]}</p></div>
    <a className="project-case-link" href={p.href} aria-label={studyLabel} title={studyLabel}></a>
    {p.liveHref&&<a className="project-site-link" href={p.liveHref} aria-label={siteLabel} title={siteLabel}><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"/></a>}
  </article>;
}
export function PortfolioFooter({lang,showStickers=true}:{lang:Lang;onOpenStudio?:()=>void;showStickers?:boolean}){
  const now=new Date();
  return <><footer className={`react-footer${showStickers?"":" without-stickers"}`} id="portfolio-footer"><div className="react-footer-meta"><p>© {now.getFullYear()} Paolo Pirruccio. All rights reserved. · <a className="portfolio-privacy-link" href="/privacy">Privacy policy</a></p><div className="footer-socials-react"><a href="mailto:pirruccio.01@gmail.com" aria-label={lang==="it"?"Invia una email":"Send an email"}><i className="fa-solid fa-envelope"/></a><a href="https://www.instagram.com/pirruccio_paolo/" aria-label="Instagram"><i className="fa-brands fa-instagram"/></a><a href="https://www.linkedin.com/in/paolopirruccio/" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"/></a><a href="https://t.me/sunriseshy" aria-label="Telegram"><i className="fa-brands fa-telegram"/></a></div></div>{showStickers?<LazyPassionStickers/>:null}</footer><FooterOverscrollGlow/></>;
}
function LazyPassionStickers(){const host=useRef<HTMLDivElement>(null);const[ready,setReady]=useState(false);useEffect(()=>{const node=host.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setReady(true);observer.disconnect()}},{rootMargin:"240px"});observer.observe(node);return()=>observer.disconnect()},[]);return <div ref={host}>{ready?<PassionStickers/>:null}</div>}
function SectionSkeleton({kind}:{kind:"photos"|"services"}){return <div className={`section-loading-skeleton is-${kind}`} role="status" aria-label="Caricamento contenuti"><span/><span/><span/><i/></div>}
function Accordion({title,open,setOpen,children,id,className=""}:{title:string;open:boolean;setOpen:(v:boolean)=>void;children:React.ReactNode;id?:string;className?:string}){const uid=useId(),bodyId=`accordion-${uid.replace(/:/g,"")}`;return <section className={`react-section accordion ${open?"is-open":""} ${className}`.trim()} id={id}><button type="button" className="accordion-head" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls={bodyId}><h2>{title}</h2><i className={`fa-solid fa-chevron-down ${open?"open":""}`} aria-hidden="true"/></button><div id={bodyId} className={`accordion-body ${open?"open":""}`} role="region" aria-hidden={!open}>{children}</div></section>}
function Info({title,children}:{title:string;children:React.ReactNode}){return <section className="cv-info"><h4>{title}</h4>{children}</section>}
function Entry({title,meta}:{title:string;meta:string}){return <div className="cv-entry"><strong>{title}</strong><span>{meta}</span></div>}
