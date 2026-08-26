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
  {title:"Il Sarcofago Tebanianus",color:"#4a3526",logo:"",images:["/assets/opt/3d.webp","/assets/opt/3d-2.webp","/assets/opt/3d-3.webp"],href:"/case-study/sarcofago-tebanianus",liveHref:"/3D/index.html",desc:{it:"Sito di valorizzazione con modello 3D interattivo, storia e localizzazione del reperto.",en:"Cultural heritage website with an interactive 3D model, history and artifact location."}},
  {title:"Laprendoconsport",color:"#c14a22",logo:"",images:["/assets/opt/laprendoconsport.webp"],href:"/case-study/laprendoconsport",liveHref:"/laprendoconsport.html",desc:{it:"Progetto di comunicazione digitale con focus su sport, salute e ottimizzazione UX.",en:"Digital communication project focused on sport, health and UX optimization."}},
  {title:"La Bussola di Infouma",color:"#6d5210",logo:"/assets/opt/compass-logo.webp",images:["/assets/opt/bussola.webp","/assets/opt/bussola-2.webp","/assets/opt/bussola-3.webp"],href:"/case-study/bussola-infouma",liveHref:"/bussola/index.html",desc:{it:"Hub digitale per gli studenti di Informatica Umanistica dell’Università di Pisa.",en:"Digital hub for Digital Humanities students at the University of Pisa."}},
  {title:"BlogOwl",color:"#5b37c4",logo:"/bdd/illustrazioni/logo-navbar.svg",images:["/assets/opt/blogowl.webp"],href:"/case-study/blogowl",liveHref:"/bdd/login.html",desc:{it:"Aggregatore di blog con dinamiche social e interfaccia ottimizzata.",en:"Blog aggregator featuring social dynamics and an optimized interface."}},
  {title:"Text Encoding Project",color:"#186a5e",logo:"/codifica/immagini/logo.webp",images:["/assets/opt/codifica.webp","/assets/opt/codifica-2.webp","/assets/opt/codifica-3.webp"],href:"/case-study/text-encoding",liveHref:"/codifica/codifica.html",desc:{it:"Piattaforma accademica per codifica, confronto e analisi di testi.",en:"Academic platform for text encoding, comparison and analysis."}},
  {title:"AsterGift",color:"#7d2fb0",logo:"",images:["/assets/opt/astergift.webp"],href:"/case-study/astergift",desc:{it:"Brand identity ed e-commerce sperimentale per la vendita fittizia di stelle.",en:"Brand identity and experimental e-commerce for the fictional sale of stars."}},
  {title:"NASA Project",color:"#1f4bad",logo:"/ppw/images/green-logo.png",images:["/assets/opt/ppw.webp","/assets/opt/ppw-2.webp","/assets/opt/ppw-3.webp"],href:"/case-study/nasa",liveHref:"/ppw/index.html",desc:{it:"Esperienza immersiva dedicata alla missione Opportunity.",en:"Immersive experience dedicated to the Opportunity mission."}},
  {title:"CINeo",color:"#879414",logo:"/cineo/assets/cineo-icon.png",images:["/cineo/assets/posters/01-interstellar.jpg","/cineo/assets/posters/02-the-truman-show.jpg","/cineo/assets/posters/03-inception.jpg"],href:"/cineo/index.html",liveHref:"/cineo/index.html",desc:{it:"Biblioteca digitale del cinema: 30 film con metadati, trame, citazioni, sceneggiature e colonne sonore.",en:"Digital cinema library: 30 films with metadata, plots, quotes, screenplays and soundtracks."}},
];
