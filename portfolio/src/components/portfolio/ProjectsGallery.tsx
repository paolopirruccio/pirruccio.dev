"use client";

import {useEffect,useState} from "react";
import {RimBody} from "@/components/ai-lights/RimBody";
import {PortfolioFooter,ProjectCard} from "@/components/portfolio/RemainingPortfolio";
import {SquircleBox,SquircleButton,SquircleLink} from "@/components/squircle/SquircleControl";
import {portfolioProjects} from "@/data/projects";

type Lang="it"|"en";

export function ProjectsGallery(){
  const[lang,setLang]=useState<Lang>("it");
  useEffect(()=>{const saved=localStorage.getItem("preferredLanguage") as Lang|null;if(saved)setLang(saved)},[]);
  const toggle=()=>setLang(current=>{const next=current==="it"?"en":"it";localStorage.setItem("preferredLanguage",next);return next});
  return <main className="app-shell mode-personal gallery-app">
    <nav className="shell-controls" aria-label="Portfolio view">
      <RimBody pulseKey={0} className="mode-switch-rim"><SquircleBox className="shell-segmented">
        <SquircleButton aria-pressed onClick={()=>window.location.href="/io"}>{lang==="it"?"Io":"Me"}</SquircleButton>
        <SquircleButton aria-pressed={false} onClick={()=>window.location.href="/"}>Studio</SquircleButton>
      </SquircleBox></RimBody>
      <SquircleButton className="shell-language" onClick={toggle}>{lang==="it"?"EN":"IT"}</SquircleButton>
    </nav>
    <div className="view-stage"><div className="react-portfolio gallery-portfolio">
      <SquircleLink className="gallery-back" href="/io"><i className="fa-solid fa-arrow-left"/>{lang==="it"?"Torna a Io":"Back to Me"}</SquircleLink>
      <section className="react-section gallery-heading"><h1>{lang==="it"?"Tutti i progetti":"All projects"}</h1><p>{lang==="it"?"Una raccolta di esperimenti, prodotti digitali e lavori accademici.":"A collection of experiments, digital products and academic work."}</p></section>
      <section className="gallery-project-grid" aria-label={lang==="it"?"Tutti i progetti":"All projects"}>{portfolioProjects.map(project=><ProjectCard key={project.title} project={project} lang={lang}/>)}</section>
      <PortfolioFooter lang={lang}/>
    </div></div>
  </main>;
}
