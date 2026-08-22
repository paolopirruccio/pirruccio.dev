/*
 * CASE STUDY SETUP
 * Duplicate one object, change its slug and replace the content below.
 * Put your files in /public/case-studies/[slug]/ and reference them as
 * /case-studies/[slug]/filename.webp. Missing images become clean placeholders.
 */
export type CaseStudy={
  slug:string;
  title:string;
  eyebrow:string;
  summary:string;
  year:string;
  services:string[];
  role:string;
  website?:string;
  focus?:"brand"|"product";
  theme:{background:string;surface:string;ink:string;muted:string;accent:string;accentInk:string;fontDisplay:string;fontBody:string};
  logo?:string;
  logoAlt?:string;
  challenge:{title:string;body:string};
  solution:{title:string;body:string};
  logoStudy:Array<{src?:string;label:string;note?:string}>;
  palette:Array<{name:string;hex:string}>;
  typography:Array<{name:string;usage:string;sample:string}>;
  productSystem?:Array<{label:string;title:string;body:string;icon:string}>;
  screenshots:Array<{src?:string;alt:string;caption:string;size?:"wide"|"tall"|"standard"}>;
  outcome:{title:string;body:string;points:string[]};
};

export const caseStudies:CaseStudy[]=[
  {
    slug:"laprendoconsport",title:"Laprendoconsport",eyebrow:"Sport · Salute · Cultura",summary:"Un ecosistema editoriale che rende lo sport più comprensibile, autorevole e vicino alle persone.",year:"2025",services:["Brand system","UX/UI","Web design"],role:"Design & sviluppo",website:"/legacy/laprendoconsport.html",
    theme:{background:"#f1efe8",surface:"#ffffff",ink:"#171717",muted:"#6d6860",accent:"#ef593e",accentInk:"#171717",fontDisplay:'"Instrument Serif", serif',fontBody:'Inter, Arial, sans-serif'},
    challenge:{title:"Trasformare contenuti diversi in un’unica esperienza.",body:"Il progetto aveva bisogno di una gerarchia chiara e di una personalità capace di tenere insieme informazione, movimento e accessibilità."},
    solution:{title:"Un sistema energico, ma facile da attraversare.",body:"Colori netti, moduli editoriali e una griglia flessibile rendono riconoscibile ogni contenuto senza spezzare la continuità del brand."},
    logoStudy:[{label:"Segno principale",note:"Inserisci qui il logo definitivo."},{label:"Costruzione",note:"Griglia, proporzioni o prove del marchio."},{label:"Riduzione",note:"Versione icona e test alle piccole dimensioni."}],
    palette:[{name:"Coral",hex:"#EF593E"},{name:"Ink",hex:"#171717"},{name:"Paper",hex:"#F1EFE8"},{name:"Sky",hex:"#93B9FF"}],
    typography:[{name:"Instrument Serif",usage:"Titoli e voce editoriale",sample:"Lo sport raccontato bene."},{name:"Inter",usage:"Testi, dati e interfaccia",sample:"Chiarezza prima di tutto."}],
    screenshots:[{src:"/legacy/assets/opt/laprendoconsport.webp",alt:"Homepage Laprendoconsport",caption:"Homepage",size:"wide"},{alt:"Pagina articolo",caption:"Template editoriale",size:"tall"},{alt:"Vista mobile",caption:"Navigazione mobile"}],
    outcome:{title:"Un’identità pronta a crescere con i contenuti.",body:"Il template mette in evidenza l’approccio progettuale e lascia spazio agli screenshot reali che verranno aggiunti.",points:["Gerarchia più leggibile","Sistema visivo coerente","Esperienza responsive"]}
  },
  {
    slug:"astergift",title:"AsterGift",eyebrow:"Concept · E-commerce · Brand",summary:"Regalare una stella come se fosse un prodotto reale: un’identità digitale sospesa tra scienza e immaginazione.",year:"2024",services:["Brand identity","Art direction","E-commerce concept"],role:"Concept & design",
    theme:{background:"#120b25",surface:"#21163d",ink:"#f8f1ff",muted:"#b9afc9",accent:"#b678ff",accentInk:"#160b25",fontDisplay:'"Instrument Serif", serif',fontBody:'Inter, Arial, sans-serif'},
    challenge:{title:"Rendere credibile un prodotto volutamente impossibile.",body:"Serviva un linguaggio che non sembrasse né un progetto scientifico freddo né un semplice negozio di regali."},
    solution:{title:"Un catalogo cosmico con regole molto terrestri.",body:"La narrazione emozionale convive con schede, categorie e call to action familiari, creando un’esperienza sorprendente ma comprensibile."},
    logoStudy:[{label:"Wordmark",note:"Inserisci il marchio principale."},{label:"Orbita",note:"Mostra geometrie e principio generativo."},{label:"Costellazione",note:"Pattern, simboli e applicazioni."}],
    palette:[{name:"Void",hex:"#120B25"},{name:"Orbit",hex:"#B678FF"},{name:"Starlight",hex:"#F8F1FF"},{name:"Solar",hex:"#FFD45A"}],
    typography:[{name:"Instrument Serif",usage:"Titoli emozionali",sample:"Una stella tutta tua."},{name:"Inter",usage:"Catalogo e interfaccia",sample:"Scegli, personalizza, regala."}],
    screenshots:[{src:"/legacy/assets/opt/astergift.webp",alt:"AsterGift website",caption:"Direzione visuale",size:"wide"},{alt:"Catalogo delle stelle",caption:"Catalogo",size:"standard"},{alt:"Scheda prodotto",caption:"Product detail",size:"tall"}],
    outcome:{title:"Un concept completo, non soltanto una bella homepage.",body:"Il case study può raccontare la costruzione del marchio e l’intero percorso d’acquisto.",points:["Concept memorabile","Sistema espandibile","Storytelling commerciale"]}
  },
  {
    slug:"nasa",title:"Opportunity",eyebrow:"NASA · Educational · Immersive",summary:"Un viaggio digitale nella missione Opportunity, costruito come un piccolo archivio interattivo da esplorare.",year:"2022",services:["Web experience","Interaction design","Visual storytelling"],role:"Design & front-end",website:"/legacy/ppw/index.html",logo:"/legacy/ppw/images/green-logo.png",logoAlt:"Opportunity project logo",
    theme:{background:"#e7e1d4",surface:"#f8f4ea",ink:"#211b17",muted:"#70675f",accent:"#315d47",accentInk:"#f8f4ea",fontDisplay:'Georgia, "Times New Roman", serif',fontBody:'Inter, Arial, sans-serif'},
    challenge:{title:"Raccontare molti materiali senza costruire un’enciclopedia.",body:"Testi, immagini, curiosità e contenuti interattivi dovevano diventare un percorso, non un semplice elenco di informazioni."},
    solution:{title:"Un’esplorazione a tappe, con il rover come guida.",body:"Ogni pagina aggiunge un frammento della missione e usa interazioni semplici per mantenere vivo il senso di scoperta."},
    logoStudy:[{src:"/legacy/ppw/images/green-logo.png",label:"Marchio principale"},{src:"/legacy/ppw/images/blue-logo.png",label:"Variante cromatica"},{src:"/legacy/ppw/images/violet-logo.png",label:"Sistema di varianti"}],
    palette:[{name:"Mission green",hex:"#315D47"},{name:"Martian soil",hex:"#A55E3A"},{name:"Archive",hex:"#E7E1D4"},{name:"Night",hex:"#211B17"}],
    typography:[{name:"Georgia",usage:"Titoli e racconto",sample:"A journey across Mars."},{name:"Inter",usage:"Dati e navigazione",sample:"Mission log · Sol 5111"}],
    screenshots:[{src:"/legacy/assets/opt/ppw.webp",alt:"Opportunity homepage",caption:"Homepage",size:"wide"},{src:"/legacy/assets/opt/ppw-2.webp",alt:"Opportunity internal page",caption:"Mission archive",size:"tall"},{src:"/legacy/assets/opt/ppw-3.webp",alt:"Opportunity project detail",caption:"Interactive content",size:"standard"}],
    outcome:{title:"Un progetto didattico che si comporta come un’esperienza.",body:"La griglia permette di valorizzare sia il racconto sia i dettagli di interazione e sviluppo.",points:["Narrazione progressiva","Interazioni tematiche","Archivio accessibile"]}
  },
  {
    slug:"sarcofago-tebanianus",title:"Il Sarcofago Tebanianus",eyebrow:"Cultura · 3D · Patrimonio",summary:"Un reperto antico diventa un’esperienza digitale da osservare, capire e collocare nel suo contesto.",year:"2024",services:["UX/UI","3D integration","Web design"],role:"Design & sviluppo",website:"/legacy/3D/index.html",logo:"/legacy/assets/logos/sarcofago.png",logoAlt:"Il Sarcofago Tebanianus",
    theme:{background:"#211a16",surface:"#30251f",ink:"#f4ede4",muted:"#bcaea1",accent:"#a88464",accentInk:"#17120f",fontDisplay:'"Instrument Serif", serif',fontBody:'Inter, Arial, sans-serif'},
    challenge:{title:"Far leggere un oggetto complesso senza appiattirlo.",body:"Il sarcofago richiedeva rigore storico, chiarezza narrativa e uno spazio capace di valorizzare il modello tridimensionale."},
    solution:{title:"Un museo digitale concentrato su un solo reperto.",body:"La navigazione accompagna dalla visione d’insieme ai dettagli, alternando contesto, racconto e interazione con il modello 3D."},
    logoStudy:[{src:"/legacy/assets/logos/sarcofago.png",label:"Monogramma"},{label:"Costruzione",note:"Spazio per griglia e proporzioni."},{label:"Applicazioni",note:"Segnaletica e declinazioni digitali."}],
    palette:[{name:"Terra",hex:"#4A3526"},{name:"Papiro",hex:"#E8DAC7"},{name:"Ombra",hex:"#211A16"},{name:"Bronzo",hex:"#A88464"}],
    typography:[{name:"Instrument Serif",usage:"Titoli e racconto",sample:"Un reperto, molte storie."},{name:"Inter",usage:"Informazioni e interfaccia",sample:"Esplora il modello tridimensionale."}],
    screenshots:[{src:"/legacy/assets/opt/3d.webp",alt:"Homepage del Sarcofago Tebanianus",caption:"Homepage",size:"wide"},{src:"/legacy/assets/opt/3d-2.webp",alt:"Modello 3D",caption:"Esplorazione 3D",size:"tall"},{src:"/legacy/assets/opt/3d-3.webp",alt:"Contenuto storico",caption:"Approfondimento"}],
    outcome:{title:"Il reperto non è più soltanto mostrato: può essere esplorato.",body:"Il brand study riunisce identità, contenuto culturale e interazione in un percorso coerente.",points:["Modello 3D centrale","Contesto accessibile","Identità museale"]}
  },
  {
    slug:"bussola-infouma",title:"La Bussola di Infouma",eyebrow:"Università · Community · Orientamento",summary:"Un punto di riferimento digitale per orientarsi tra corsi, strumenti e vita universitaria.",year:"2023",services:["Product design","Information architecture","Front-end"],role:"UX/UI & sviluppo",website:"/legacy/bussola/index.html",logo:"/legacy/assets/opt/compass-logo.webp",logoAlt:"La Bussola di Infouma",
    theme:{background:"#f0ead9",surface:"#fffaf0",ink:"#251d0a",muted:"#74694d",accent:"#d2a928",accentInk:"#251d0a",fontDisplay:'"Instrument Serif", serif',fontBody:'Inter, Arial, sans-serif'},
    challenge:{title:"Mettere ordine in informazioni sparse e quotidiane.",body:"Materiali didattici, link, consigli e strumenti vivevano in luoghi diversi e risultavano difficili da trovare."},
    solution:{title:"Una bussola, anche nella struttura dell’interfaccia.",body:"Categorie immediate e percorsi brevi trasformano un insieme eterogeneo di risorse in un hub riconoscibile."},
    logoStudy:[{src:"/legacy/assets/opt/compass-logo.webp",label:"Simbolo"},{label:"Griglia",note:"Costruzione della bussola."},{label:"Iconografia",note:"Sistema di segni per le categorie."}],
    palette:[{name:"Ochre",hex:"#D2A928"},{name:"Ink",hex:"#251D0A"},{name:"Paper",hex:"#F0EAD9"},{name:"Cream",hex:"#FFFAF0"}],
    typography:[{name:"Instrument Serif",usage:"Titoli e personalità",sample:"Trova la tua direzione."},{name:"Inter",usage:"Navigazione e contenuti",sample:"Risorse per Informatica Umanistica."}],
    screenshots:[{src:"/legacy/assets/opt/bussola.webp",alt:"Homepage La Bussola",caption:"Homepage",size:"wide"},{src:"/legacy/assets/opt/bussola-2.webp",alt:"Risorse universitarie",caption:"Archivio risorse"},{src:"/legacy/assets/opt/bussola-3.webp",alt:"Pagina interna",caption:"Navigazione",size:"tall"}],
    outcome:{title:"Meno tempo a cercare, più tempo per studiare.",body:"Il progetto traduce un bisogno reale della comunità studentesca in una struttura semplice da mantenere.",points:["Risorse centralizzate","Orientamento rapido","Sistema espandibile"]}
  },
  {
    slug:"blogowl",title:"BlogOwl",eyebrow:"Social · Publishing · Product",summary:"Una piattaforma che raccoglie blog diversi e rende naturale scoprirli, seguirli e discuterne.",year:"2023",services:["Product UX","Interface design","Web development"],role:"Design & sviluppo",website:"/legacy/bdd/login.html",logo:"/legacy/bdd/illustrazioni/logo-navbar.svg",logoAlt:"BlogOwl",
    theme:{background:"#171224",surface:"#28203c",ink:"#f7f3ff",muted:"#b9afca",accent:"#7658d8",accentInk:"#ffffff",fontDisplay:'"Instrument Serif", serif',fontBody:'Inter, Arial, sans-serif'},
    challenge:{title:"Far convivere lettura lunga e dinamiche social.",body:"La piattaforma doveva dare spazio agli autori senza perdere le interazioni tipiche di una community digitale."},
    solution:{title:"Un feed che invita ad approfondire, non soltanto a scorrere.",body:"Card editoriali, profili e conversazioni formano un sistema in cui la scoperta porta naturalmente alla lettura."},
    logoStudy:[{src:"/legacy/bdd/illustrazioni/logo-navbar.svg",label:"Marchio"},{label:"Mascotte",note:"Espressioni e riduzioni del gufo."},{label:"Icona",note:"Test alle piccole dimensioni."}],
    palette:[{name:"Night",hex:"#171224"},{name:"Owl",hex:"#7658D8"},{name:"Paper",hex:"#F7F3FF"},{name:"Lilac",hex:"#B9AFCA"}],
    typography:[{name:"Instrument Serif",usage:"Titoli editoriali",sample:"Storie che meritano tempo."},{name:"Inter",usage:"Interfaccia sociale",sample:"Segui · Leggi · Condividi"}],
    screenshots:[{src:"/legacy/assets/opt/blogowl.webp",alt:"Interfaccia BlogOwl",caption:"Direzione di prodotto",size:"wide"},{alt:"Feed editoriale",caption:"Feed"},{alt:"Profilo autore",caption:"Profilo",size:"tall"}],
    outcome:{title:"Una community costruita attorno ai contenuti.",body:"Il sistema visivo distingue BlogOwl da un social generico e mette il valore editoriale al centro.",points:["Scoperta dei contenuti","Identità riconoscibile","Interazioni integrate"]}
  },
  {
    slug:"text-encoding",title:"Text Encoding Project",eyebrow:"TEI · Ricerca · Digital Humanities",summary:"Uno strumento accademico per codificare, confrontare e leggere il testo come struttura e come contenuto.",year:"2022",services:["Research UX","Data interface","Front-end"],role:"UX/UI & sviluppo",website:"/legacy/codifica/codifica.html",focus:"product",
    theme:{background:"#e8f0ec",surface:"#f8fcfa",ink:"#102c27",muted:"#59726c",accent:"#278979",accentInk:"#f8fcfa",fontDisplay:'"Instrument Serif", serif',fontBody:'Inter, Arial, sans-serif'},
    challenge:{title:"Rendere leggibile una codifica pensata per le macchine.",body:"Il progetto doveva mostrare testo, markup e confronti senza richiedere all’utente di conoscere già il linguaggio TEI."},
    solution:{title:"Più livelli di lettura nella stessa interfaccia.",body:"Contenuto, struttura e apparato critico diventano viste coordinate, con gerarchie che aiutano sia lo studio sia il confronto."},
    logoStudy:[{src:"/legacy/codifica/immagini/logo.webp",label:"Marchio"},{label:"Sintassi",note:"Segni derivati dal markup."},{label:"Riduzione",note:"Versione per navigazione e favicon."}],
    palette:[{name:"Research",hex:"#278979"},{name:"Deep ink",hex:"#102C27"},{name:"Archive",hex:"#E8F0EC"},{name:"Surface",hex:"#F8FCFA"}],
    typography:[{name:"Instrument Serif",usage:"Titoli e fonti",sample:"Il testo oltre la pagina."},{name:"Inter",usage:"Controlli e annotazioni",sample:"Element · Attribute · Value"}],
    productSystem:[{label:"IDEA",title:"Testo e codice, insieme",body:"L’interfaccia mette in relazione il documento leggibile e la sua struttura TEI senza costringere a scegliere una sola vista.",icon:"fa-solid fa-code"},{label:"STACK",title:"HTML · CSS · JavaScript · XML/TEI",body:"Uno stack essenziale, scelto per rendere trasparente la logica del progetto e mantenere il prototipo facile da esplorare.",icon:"fa-solid fa-layer-group"},{label:"ICONE",title:"Azioni riconoscibili",body:"Un set coerente distingue confronto, annotazione, navigazione e cambio di vista anche negli spazi più densi.",icon:"fa-solid fa-icons"},{label:"TESTO",title:"Gerarchie per contenuti complessi",body:"Dimensioni, pesi e spaziature separano fonte, markup, metadati e controlli senza spezzare il flusso di lettura.",icon:"fa-solid fa-font"}],
    screenshots:[{src:"/legacy/assets/opt/codifica.webp",alt:"Homepage Text Encoding Project",caption:"Homepage",size:"wide"},{src:"/legacy/assets/opt/codifica-2.webp",alt:"Confronto del testo",caption:"Confronto",size:"tall"},{src:"/legacy/assets/opt/codifica-3.webp",alt:"Vista codificata",caption:"Codifica"}],
    outcome:{title:"La complessità rimane, ma diventa attraversabile.",body:"Il brand study mostra come un’interfaccia possa tradurre strumenti specialistici senza impoverirli.",points:["Markup comprensibile","Confronto immediato","Ricerca accessibile"]}
  }
];

export const caseStudyBySlug=(slug:string)=>caseStudies.find(item=>item.slug===slug);
