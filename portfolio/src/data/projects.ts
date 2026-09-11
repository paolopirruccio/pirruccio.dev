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
  {title:"Il Sarcofago Tebanianus",color:"#4a3526",logo:"/3D/resources/svg decorativi/incappucciati.svg",images:["/assets/opt/3d.webp","/assets/opt/3d-2.webp","/assets/opt/3d-3.webp"],href:"/case-study/sarcofago-tebanianus",liveHref:"/3D/index.html",desc:{it:"Un reperto da esplorare in 3D.",en:"Explore an ancient artifact in 3D."}},
  {title:"Laprendoconsport",color:"#c14a22",logo:"/case-studies/laprendoconsport/pittogramma.svg",images:["/assets/opt/laprendoconsport.webp"],href:"/case-study/laprendoconsport",liveHref:"/laprendoconsport.html",desc:{it:"Comunicazione digitale per lo sport.",en:"Digital communication for sport."}},
  {title:"La Bussola di Infouma",color:"#6d5210",logo:"/assets/opt/compass-logo.webp",images:["/assets/opt/bussola.webp","/assets/opt/bussola-2.webp","/assets/opt/bussola-3.webp"],href:"/case-study/bussola-infouma",liveHref:"/bussola/index.html",desc:{it:"Risorse per la vita universitaria.",en:"Resources for university life."}},
  {title:"BlogOwl",color:"#5b37c4",logo:"/bdd/illustrazioni/logo-navbar.svg",images:["/assets/opt/blogowl.webp"],href:"/case-study/blogowl",liveHref:"/bdd/login.html",desc:{it:"Una community di blog.",en:"A community of blogs."}},
  {title:"Text Encoding Project",color:"#186a5e",logo:"/codifica/immagini/logo.webp",images:["/assets/opt/codifica.webp","/assets/opt/codifica-2.webp","/assets/opt/codifica-3.webp"],href:"/case-study/text-encoding",liveHref:"/codifica/codifica.html",desc:{it:"Testi da codificare e confrontare.",en:"Encode and compare texts."}},
  {title:"AsterGift",color:"#7d2fb0",logo:"/case-studies/astergift/marchio.svg",images:["/assets/opt/astergift.webp"],href:"/case-study/astergift",desc:{it:"Un’identità per regalare stelle.",en:"A brand for gifting stars."}},
  {title:"NASA Project",color:"#1f4bad",logo:"/ppw/favicon.webp",images:["/assets/opt/ppw.webp","/assets/opt/ppw-2.webp","/assets/opt/ppw-3.webp"],href:"/case-study/nasa",liveHref:"/ppw/index.html",desc:{it:"Un sito alla scoperta di Marte.",en:"A website exploring Mars."}},
  {title:"CINeo",color:"#879414",logo:"/cineo/assets/cineo-icon.png",images:["/cineo/assets/posters/01-interstellar.jpg","/cineo/assets/posters/02-the-truman-show.jpg","/cineo/assets/posters/03-inception.jpg"],href:"/case-study/cineo",liveHref:"/cineo/index.html",desc:{it:"Una biblioteca digitale di film.",en:"A digital film library."}},
];
