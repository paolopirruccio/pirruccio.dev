"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import dynamic from "next/dynamic";
import { SquircleBox, SquircleButton, SquircleLink } from "@/components/squircle/SquircleControl";
import { StudioWipDialog } from "@/components/StudioWipDialog";

type Lang = "it" | "en";

const RemainingPortfolio = dynamic(() => import("@/components/portfolio/RemainingPortfolio").then(module => module.RemainingPortfolio));

export function PortfolioApp() {
  const [lang, setLang] = useState<Lang>("it");
  const [studioWipOpen, setStudioWipOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as Lang | null;
    if (savedLang === "it" || savedLang === "en") queueMicrotask(() => setLang(savedLang));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const ua = navigator.userAgent;
    const safari = /Safari\//.test(ua) && !/(?:Chrome|Chromium|CriOS|Edg|EdgiOS|FxiOS|OPiOS|Android)\//.test(ua);
    document.documentElement.classList.toggle("is-safari", safari);
    return () => document.documentElement.classList.remove("is-safari");
  }, []);

  const toggleLanguage = () => {
    setLang(current => {
      const next = current === "it" ? "en" : "it";
      localStorage.setItem("preferredLanguage", next);
      return next;
    });
  };

  return <main className="app-shell mode-personal">
    <nav className="shell-controls" aria-label="Portfolio view">
      <span className="personal-language-wrap">
        <SquircleButton className="shell-language personal-glass-content" onClick={toggleLanguage}>{lang === "it" ? "EN" : "IT"}</SquircleButton>
      </span>
      <span className="personal-mail-wrap">
        <SquircleLink className="shell-language shell-mail personal-glass-content" href="mailto:pirruccio.01@gmail.com" aria-label={lang === "it" ? "Scrivimi via email" : "Email me"}><i className="fa-solid fa-envelope"/></SquircleLink>
      </span>
    </nav>

    <div className="view-stage">
      <PersonalHero lang={lang} />
      <PersonalContacts lang={lang} />
      <RemainingPortfolio lang={lang} onOpenStudio={() => setStudioWipOpen(true)} />
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

function PersonalContacts({ lang }: { lang: Lang }) {
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
      <SquircleButton className={`contact-arrow prev ${canBack ? "" : "hidden"}`} onClick={() => scroll(-1)} aria-label={lang==="it"?"Contatti precedenti":"Previous contacts"}><i className="fa-solid fa-chevron-left" aria-hidden="true" /></SquircleButton>
      <div className="contact-deck" ref={deck} onScroll={update}>
        {contactItems.map(item => {const external=item.href.startsWith("https://");return <a className={`contact-card ${item.id}`} href={item.href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined} onClick={item.id==="services"?event=>{event.preventDefault();window.dispatchEvent(new CustomEvent("open-portfolio-services"))}:undefined} key={item.id}>
          <SquircleBox className="contact-card-inner">
            <div className="contact-card-header"><span>{item.label[lang]}</span><i className={item.icon} /></div>
            <h2>{item.title[lang]}</h2>
            <span className="contact-visual" />
          </SquircleBox>
        </a>})}
      </div>
      <SquircleButton className={`contact-arrow next ${canForward ? "" : "hidden"}`} onClick={() => scroll(1)} aria-label={lang==="it"?"Contatti successivi":"Next contacts"}><i className="fa-solid fa-chevron-right" aria-hidden="true" /></SquircleButton>
    </div>
  </section>;
}
