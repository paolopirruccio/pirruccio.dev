"use client";

import {useEffect,useState} from "react";

type Lang="it"|"en";

const CATEGORIES:Record<Lang,string[]>={
  it:["bar","ristoranti","tabaccherie","negozi di abbigliamento","parrucchieri","palestre","hotel","pasticcerie","studi professionali","farmacie","B&B","artigiani","centri estetici","pizzerie","pub","gelaterie","panifici","fiorai","gioiellerie","ottiche","autofficine","dentisti","veterinari","agenzie immobiliari","fotografi","architetti","commercialisti","scuole di danza","centri yoga","agriturismi","cantine","librerie","associazioni","negozi","musei","teatri","musicisti","illustratori","ceramisti","chef","personal trainer","startup","eventi","festival","podcast","ristoranti stellati","tour operator","case vacanza","(quasi) tutto"],
  en:["bars","restaurants","tobacconists","clothing shops","hair salons","gyms","hotels","pastry shops","professional firms","pharmacies","B&Bs","makers","beauty salons","pizzerias","pubs","ice cream shops","bakeries","florists","jewellery shops","opticians","garages","dentists","veterinary clinics","estate agencies","photographers","architects","accountants","dance schools","yoga studios","farm stays","wineries","bookshops","associations","shops","museums","theatres","musicians","illustrators","ceramists","chefs","personal trainers","startups","events","festivals","podcasts","fine dining","tour operators","holiday homes","(almost) anything"]
};

const SPEEDS=[900,720,580,470,380,310,250,205,170,140,115,95,80,68,58,50,44,38];

export function AgencyBlurHero({lang}:{lang:Lang}){
  const[index,setIndex]=useState(0);
  const categories=CATEGORIES[lang];

  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    let current=0,timer=0,disposed=false;
    const advance=()=>{
      if(disposed||current>=categories.length-1)return;
      current+=1;
      setIndex(current);
      if(current<categories.length-1)timer=window.setTimeout(advance,SPEEDS[Math.min(current,SPEEDS.length-1)]);
    };
    timer=window.setTimeout(advance,SPEEDS[0]);
    return()=>{disposed=true;window.clearTimeout(timer)};
  },[categories,lang]);

  return <header className="studio-cycle-hero studio-service-poster">
    <div className="studio-poster-main">
      <h2>{lang==="it"?"Faccio siti web":"I build websites"}</h2>
      <div className="studio-poster-category"><span>{lang==="it"?"per":"for"}</span><strong key={`${lang}-${index}`}>{categories[index]}</strong></div>
    </div>
  </header>;
}
