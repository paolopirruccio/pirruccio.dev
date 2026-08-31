"use client";

import {useEffect,useState} from "react";
import {RimBody} from "@/components/ai-lights/RimBody";
import {PortfolioFooter,ProjectCard} from "@/components/portfolio/RemainingPortfolio";
import {SquircleBox,SquircleButton,SquircleLink} from "@/components/squircle/SquircleControl";
import {portfolioProjects} from "@/data/projects";
import {StudioWipDialog} from "@/components/StudioWipDialog";

type Lang="it"|"en";

export function ProjectsGallery(){
  const[lang,setLang]=useState<Lang>("it");
  const[studioWipOpen,setStudioWipOpen]=useState(false);
  useEffect(()=>{const saved=localStorage.getItem("preferredLanguage") as Lang|null;if(saved==="it"||saved==="en")queueMicrotask(()=>setLang(saved))},[]);
  useEffect(()=>{document.documentElement.lang=lang},[lang]);
  useEffect(()=>{const ua=navigator.userAgent,safari=/Safari\//.test(ua)&&!/(?:Chrome|Chromium|CriOS|Edg|EdgiOS|FxiOS|OPiOS|Android)\//.test(ua);document.documentElement.classList.toggle("is-safari",safari);return()=>document.documentElement.classList.remove("is-safari")},[]);
  const toggle=()=>setLang(current=>{const next=current==="it"?"en":"it";localStorage.setItem("preferredLanguage",next);return next});
  return <main className="app-shell mode-personal gallery-app">
    <nav className="shell-controls" aria-label="Portfolio view">
      <RimBody pulseKey={0} className="mode-switch-rim"><SquircleBox className="shell-segmented">
        <SquircleLink aria-current="page" href="/io">{lang==="it"?"Io":"Me"}</SquircleLink>
        <SquircleButton onClick={()=>setStudioWipOpen(true)} aria-haspopup="dialog" aria-controls="studio-wip-dialog">Studio</SquircleButton>
      </SquircleBox></RimBody>
      <SquircleButton className="shell-language" onClick={toggle}>{lang==="it"?"EN":"IT"}</SquircleButton>
    </nav>
    <div className="view-stage"><div className="react-portfolio gallery-portfolio">
      <SquircleLink className="gallery-back" href="/io"><i className="fa-solid fa-arrow-left" aria-hidden="true"/>{lang==="it"?"Torna a Io":"Back to Me"}</SquircleLink>
      <section className="react-section gallery-heading"><h1>{lang==="it"?"Tutti i progetti":"All projects"}</h1><p>{lang==="it"?"Una raccolta di esperimenti, prodotti digitali e lavori accademici.":"A collection of experiments, digital products and academic work."}</p></section>
      <section className="gallery-project-grid" aria-label={lang==="it"?"Tutti i progetti":"All projects"}>{portfolioProjects.map(project=><ProjectCard key={project.title} project={project} lang={lang}/>)}</section>
      <PortfolioFooter lang={lang}/>
    </div></div>
    <StudioWipDialog open={studioWipOpen} onClose={()=>setStudioWipOpen(false)} lang={lang}/>
  </main>;
}
