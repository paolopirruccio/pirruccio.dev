"use client";

import {useEffect,useState} from "react";
import {PortfolioFooter,ProjectCard} from "@/components/portfolio/RemainingPortfolio";
import {SquircleButton,SquircleLink} from "@/components/squircle/SquircleControl";
import {portfolioProjects} from "@/data/projects";

type Lang="it"|"en";

export function ProjectsGallery(){
  const[lang,setLang]=useState<Lang>("it");
  useEffect(()=>{const saved=localStorage.getItem("preferredLanguage") as Lang|null;if(saved==="it"||saved==="en")queueMicrotask(()=>setLang(saved))},[]);
  useEffect(()=>{document.documentElement.lang=lang},[lang]);
  useEffect(()=>{const ua=navigator.userAgent,safari=/Safari\//.test(ua)&&!/(?:Chrome|Chromium|CriOS|Edg|EdgiOS|FxiOS|OPiOS|Android)\//.test(ua);document.documentElement.classList.toggle("is-safari",safari);return()=>document.documentElement.classList.remove("is-safari")},[]);
  const toggle=()=>setLang(current=>{const next=current==="it"?"en":"it";localStorage.setItem("preferredLanguage",next);return next});
  return <main className="app-shell mode-personal gallery-app">
    <nav className="shell-controls gallery-controls" aria-label={lang==="it"?"Lingua":"Language"}>
      <SquircleButton className="shell-language" onClick={toggle}>{lang==="it"?"EN":"IT"}</SquircleButton>
    </nav>
    <div className="view-stage"><div className="react-portfolio gallery-portfolio">
      <SquircleLink className="gallery-back" href="/io"><i className="fa-solid fa-arrow-left" aria-hidden="true"/>{lang==="it"?"Torna al portfolio":"Back to Me"}</SquircleLink>
      <section className="react-section gallery-heading"><h1>{lang==="it"?"Tutti i progetti":"All projects"}</h1><p>{lang==="it"?"Una raccolta di esperimenti, prodotti digitali e lavori accademici.":"A collection of experiments, digital products and academic work."}</p></section>
      <section className="gallery-project-grid" aria-label={lang==="it"?"Tutti i progetti":"All projects"}>{portfolioProjects.map(project=><ProjectCard key={project.title} project={project} lang={lang}/>)}</section>
      <PortfolioFooter lang={lang} showStickers={false}/>
    </div></div>
  </main>;
}
