export type Lang = "it" | "en";

export type PortfolioProject = {
  title:string;
  color:string;
  logo:string;
  images:string[];
  href:string;
  liveHref?:string;
  desc:Record<Lang,string>;
};

export const portfolioProjects:PortfolioProject[]=[
  {title:"Il Sarcofago Tebanianus",color:"#4a3526",logo:"",images:["/legacy/assets/opt/3d.webp","/legacy/assets/opt/3d-2.webp","/legacy/assets/opt/3d-3.webp"],href:"/case-study/sarcofago-tebanianus",liveHref:"/legacy/3D/index.html",desc:{it:"Sito di valorizzazione con modello 3D interattivo, storia e localizzazione del reperto.",en:"Cultural heritage website with an interactive 3D model, history and artifact location."}},
  {title:"Laprendoconsport",color:"#c14a22",logo:"",images:["/legacy/assets/opt/laprendoconsport.webp"],href:"/case-study/laprendoconsport",liveHref:"/legacy/laprendoconsport.html",desc:{it:"Progetto di comunicazione digitale con focus su sport, salute e ottimizzazione UX.",en:"Digital communication project focused on sport, health and UX optimization."}},
  {title:"La Bussola di Infouma",color:"#6d5210",logo:"/legacy/assets/opt/compass-logo.webp",images:["/legacy/assets/opt/bussola.webp","/legacy/assets/opt/bussola-2.webp","/legacy/assets/opt/bussola-3.webp"],href:"/case-study/bussola-infouma",liveHref:"/legacy/bussola/index.html",desc:{it:"Hub digitale per gli studenti di Informatica Umanistica dell’Università di Pisa.",en:"Digital hub for Digital Humanities students at the University of Pisa."}},
  {title:"BlogOwl",color:"#5b37c4",logo:"/legacy/bdd/illustrazioni/logo-navbar.svg",images:["/legacy/assets/opt/blogowl.webp"],href:"/case-study/blogowl",liveHref:"/legacy/bdd/login.html",desc:{it:"Aggregatore di blog con dinamiche social e interfaccia ottimizzata.",en:"Blog aggregator featuring social dynamics and an optimized interface."}},
  {title:"Text Encoding Project",color:"#186a5e",logo:"/legacy/codifica/immagini/logo.webp",images:["/legacy/assets/opt/codifica.webp","/legacy/assets/opt/codifica-2.webp","/legacy/assets/opt/codifica-3.webp"],href:"/case-study/text-encoding",liveHref:"/legacy/codifica/codifica.html",desc:{it:"Piattaforma accademica per codifica, confronto e analisi di testi.",en:"Academic platform for text encoding, comparison and analysis."}},
  {title:"AsterGift",color:"#7d2fb0",logo:"",images:["/legacy/assets/opt/astergift.webp"],href:"/case-study/astergift",desc:{it:"Brand identity ed e-commerce sperimentale per la vendita fittizia di stelle.",en:"Brand identity and experimental e-commerce for the fictional sale of stars."}},
  {title:"NASA Project",color:"#1f4bad",logo:"/legacy/ppw/images/green-logo.png",images:["/legacy/assets/opt/ppw.webp","/legacy/assets/opt/ppw-2.webp","/legacy/assets/opt/ppw-3.webp"],href:"/case-study/nasa",liveHref:"/legacy/ppw/index.html",desc:{it:"Esperienza immersiva dedicata alla missione Opportunity.",en:"Immersive experience dedicated to the Opportunity mission."}},
  {title:"CINeo",color:"#879414",logo:"/legacy/cineo/assets/cineo-icon.png",images:["/legacy/cineo/assets/posters/01-interstellar.jpg","/legacy/cineo/assets/posters/02-the-truman-show.jpg","/legacy/cineo/assets/posters/03-inception.jpg"],href:"/legacy/cineo/index.html",liveHref:"/legacy/cineo/index.html",desc:{it:"Biblioteca digitale del cinema: 30 film con metadati, trame, citazioni, sceneggiature e colonne sonore.",en:"Digital cinema library: 30 films with metadata, plots, quotes, screenplays and soundtracks."}},
];
