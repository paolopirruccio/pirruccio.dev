"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import dynamic from "next/dynamic";
import { RimBody } from "@/components/ai-lights/RimBody";
import { SquircleBox, SquircleButton, SquircleLink } from "@/components/squircle/SquircleControl";
import { StudioWipDialog } from "@/components/StudioWipDialog";

type Mode = "personal" | "agency";
type Lang = "it" | "en";

const RemainingPortfolio = dynamic(() => import("@/components/portfolio/RemainingPortfolio").then(module => module.RemainingPortfolio));

export function PortfolioApp({initialMode}:{initialMode:Mode}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [lang, setLang] = useState<Lang>("it");
  const [pulse, setPulse] = useState(0);
  const [changing, setChanging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [studioWipOpen, setStudioWipOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as Lang | null;
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    const syncRoute = () => setMode("personal");
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const selectMode = (next: Mode) => {
    if (next === mode || changing) return;
    setPulse(v => v + 1);
    setChanging(true);
    window.setTimeout(() => setLeaving(true), 1260);
    window.setTimeout(() => {
      setMode(next);
      localStorage.setItem("profileMode", next);
      window.history.replaceState({}, "", "/");
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      window.setTimeout(() => { setLeaving(false); setChanging(false); }, 320);
    }, 1600);
  };

  const toggleLanguage = () => {
    setLang(current => {
      const next = current === "it" ? "en" : "it";
      localStorage.setItem("preferredLanguage", next);
      return next;
    });
  };

  const renderModeControl = (personalGlass = false) => <RimBody pulseKey={pulse} className={`mode-switch-rim${personalGlass ? " personal-glass-wrap" : ""}`}>
    <SquircleBox className={`shell-segmented${personalGlass ? " personal-glass-content" : ""}`}>
      <SquircleButton disabled={changing} onClick={() => selectMode("personal")} aria-pressed={mode === "personal"}>{lang === "it" ? "Io" : "Me"}</SquircleButton>
      <SquircleButton disabled={changing} onClick={() => setStudioWipOpen(true)} aria-haspopup="dialog" aria-controls="studio-wip-dialog">Studio</SquircleButton>
    </SquircleBox>
  </RimBody>;
  const modeControl = renderModeControl();
  const languageControl=<SquircleButton className="shell-language" onClick={toggleLanguage}>{lang === "it" ? "EN" : "IT"}</SquircleButton>;

  return <main className={`app-shell mode-${mode} ${changing ? "is-changing" : ""} ${leaving ? "is-leaving" : ""}`}>
    <nav className="shell-controls" aria-label="Portfolio view" hidden={mode !== "personal"}>
      <span className="personal-language-wrap">
        <SquircleButton className="shell-language personal-glass-content" onClick={toggleLanguage}>{lang === "it" ? "EN" : "IT"}</SquircleButton>
      </span>
      <span className="personal-mail-wrap">
        <SquircleLink className="shell-language shell-mail personal-glass-content" href="mailto:pirruccio.01@gmail.com" aria-label={lang === "it" ? "Scrivimi via email" : "Email me"}><i className="fa-solid fa-envelope"/></SquircleLink>
      </span>
    </nav>

    <div className="view-stage">
      {mode === "personal" ? <>
        <PersonalHero lang={lang} />
        <PersonalContacts lang={lang} onOpenStudio={() => setStudioWipOpen(true)} />
        <RemainingPortfolio lang={lang} onOpenStudio={() => setStudioWipOpen(true)} />
      </> : null}
    </div>
    <StudioWipDialog open={studioWipOpen} onClose={() => setStudioWipOpen(false)} lang={lang}/>
  </main>;
}

function PersonalHero({ lang }: { lang: Lang }) {
  const age = new Date().getFullYear() - 2001 - (new Date() < new Date(new Date().getFullYear(), 5, 4) ? 1 : 0);
  const hero = useRef<HTMLElement>(null);
  useHeroMagnetism(hero);
  return <div className="personal-hero-shell">
    <header className="personal-hero" ref={hero}>
      <h1>
        <HeroLine>Paolo Pirruccio</HeroLine>
        <HeroLine className="indent muted">UX/UI Designer.</HeroLine>
        <HeroLine>{lang === "it" ? "Digital Creative." : "Digital Creative."}</HeroLine>
        <HeroLine className="indent-2 muted">{lang === "it" ? `Da Siracusa. ${age} anni.` : `From Italy. ${age} y.o.`}</HeroLine>
      </h1>
    </header>
  </div>;
}

function HeroLine({ children, className = "" }: { children: string; className?: string }) {
  let wordIndex = 0;
  return <span className={`personal-line ${className}`}>{children.split(/(\s+)/).map((part, index) => {
    if (/^\s+$/.test(part)) return part;
    const depth = .45 + ((wordIndex++ * 37) % 55) / 100;
    return <i className="personal-word" data-depth={depth} key={`${part}-${index}`}>{part}</i>;
  })}</span>;
}

function useHeroMagnetism(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = ref.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    type Motion = { el: HTMLElement; x: number; y: number; r: number; s: number; tx: number; ty: number; tr: number; ts: number };
    const words = [...host.querySelectorAll<HTMLElement>(".personal-word")].map(el => ({ el, x: 0, y: 0, r: 0, s: 1, tx: 0, ty: 0, tr: 0, ts: 1 }));
    let frame = 0;
    let active = false;
    let releaseTimer = 0;
    const tick = () => {
      let moving = false;
      for (const word of words) {
        word.x += (word.tx - word.x) * .16;
        word.y += (word.ty - word.y) * .16;
        word.r += (word.tr - word.r) * .14;
        word.s += (word.ts - word.s) * .16;
        word.el.style.setProperty("--mag-x", `${word.x.toFixed(2)}px`);
        word.el.style.setProperty("--mag-y", `${word.y.toFixed(2)}px`);
        word.el.style.setProperty("--mag-r", `${word.r.toFixed(2)}deg`);
        word.el.style.setProperty("--mag-s", word.s.toFixed(4));
        moving ||= Math.abs(word.tx-word.x)+Math.abs(word.ty-word.y)+Math.abs(word.tr-word.r)+Math.abs(word.ts-word.s) > .02;
      }
      if (active || moving) frame = requestAnimationFrame(tick); else frame = 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const onMove = (event: PointerEvent) => {
      active = true;
      for (const word of words) {
        const box = word.el.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - distance / 310);
        const depth = Number(word.el.dataset.depth || .65);
        word.tx = dx * .13 * pull * depth;
        word.ty = dy * .105 * pull * depth - 11 * pull;
        word.tr = (dx / 310) * 6.5 * pull * depth;
        word.ts = 1 + .09 * pull * depth;
      }
      start();
    };
    const release = () => {
      active = false;
      for (const word of words) { word.tx = 0; word.ty = 0; word.tr = 0; word.ts = 1; }
      start();
    };
    const onTouch = (event: PointerEvent) => {
      if (hasFinePointer || event.pointerType === "mouse") return;
      window.clearTimeout(releaseTimer);
      onMove(event);
      releaseTimer = window.setTimeout(release, 520);
    };
    if (hasFinePointer) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", release);
    } else {
      host.addEventListener("pointerdown", onTouch);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", release);
      host.removeEventListener("pointerdown", onTouch);
    };
  }, [ref]);
}

const contactItems = [
  { id: "email", label: { it: "Contatto", en: "Contact" }, title: { it: "Scrivimi", en: "Email Me" }, href: "mailto:pirruccio.01@gmail.com", icon: "fa-solid fa-envelope" },
  { id: "services", label: { it: "Servizi", en: "Services" }, title: { it: "Servizi", en: "Services" }, href: "/io#servizi", icon: "fa-solid fa-pen-ruler" },
  { id: "instagram", label: { it: "Social", en: "Social" }, title: { it: "Instagram", en: "Instagram" }, href: "https://www.instagram.com/pirruccio_paolo/", icon: "fa-brands fa-instagram" },
  { id: "telegram", label: { it: "Messaggio", en: "Message" }, title: { it: "Telegram", en: "Telegram" }, href: "https://t.me/sunriseshy", icon: "fa-brands fa-telegram" },
  { id: "linkedin", label: { it: "Connettiti", en: "Connect" }, title: { it: "LinkedIn", en: "LinkedIn" }, href: "https://www.linkedin.com/in/paolopirruccio/", icon: "fa-brands fa-linkedin" },
] as const;

function PersonalContacts({ lang }: { lang: Lang; onOpenStudio:()=>void }) {
  const deck = useRef<HTMLDivElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(true);
  const update = () => {
    const el = deck.current;
    if (!el) return;
    setCanBack(el.scrollLeft > 5);
    setCanForward(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };
  useEffect(() => { update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, []);
  const scroll = (direction: number) => deck.current?.scrollBy({ left: direction * 324, behavior: "smooth" });
  return <section className="personal-contacts">
    <div className="contact-slider">
      <SquircleButton className={`contact-arrow prev ${canBack ? "" : "hidden"}`} onClick={() => scroll(-1)} aria-label="Contatti precedenti"><i className="fa-solid fa-chevron-left" /></SquircleButton>
      <div className="contact-deck" ref={deck} onScroll={update}>
        {contactItems.map(item => <a className={`contact-card ${item.id}`} href={item.href} target={item.id==="services"?undefined:"_blank"} rel={item.id==="services"?undefined:"noopener noreferrer"} onClick={item.id==="services"?event=>{event.preventDefault();window.dispatchEvent(new CustomEvent("open-portfolio-services"))}:undefined} key={item.id}>
          <SquircleBox className="contact-card-inner">
            <div className="contact-card-header"><span>{item.label[lang]}</span><i className={item.icon} /></div>
            <h2>{item.title[lang]}</h2>
            <span className="contact-visual" />
          </SquircleBox>
        </a>)}
      </div>
      <SquircleButton className={`contact-arrow next ${canForward ? "" : "hidden"}`} onClick={() => scroll(1)} aria-label="Contatti successivi"><i className="fa-solid fa-chevron-right" /></SquircleButton>
    </div>
  </section>;
}
