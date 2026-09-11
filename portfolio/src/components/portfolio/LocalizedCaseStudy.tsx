"use client";
import {useEffect,useState} from "react";
import type {CaseStudy} from "@/data/case-studies";
import {CaseStudyTemplate} from "./CaseStudyTemplate";
import {SquircleButton} from "@/components/squircle/SquircleControl";
export function LocalizedCaseStudy({italian,english}:{italian:CaseStudy;english:CaseStudy}){
  const [lang,setLang]=useState<"it"|"en">("it");
  useEffect(()=>{const saved=localStorage.getItem("preferredLanguage");if(saved==="en")queueMicrotask(()=>setLang("en"));},[]);
  useEffect(()=>{document.documentElement.lang=lang;},[lang]);
  const toggle=()=>{const next=lang==="it"?"en":"it";localStorage.setItem("preferredLanguage",next);setLang(next);};
  return <><SquircleButton className="case-language" onClick={toggle} aria-label={lang==="it"?"Read in English":"Leggi in italiano"}>{lang==="it"?"EN":"IT"}</SquircleButton><CaseStudyTemplate study={lang==="it"?italian:english} lang={lang}/></>;
}
