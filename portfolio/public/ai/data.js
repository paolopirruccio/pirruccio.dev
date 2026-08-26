const APP_DATA = {
    "personal": {
        "name": "Paolo",
        "avatar": "assets/avatar.webp",
        "welcomeMessage": "Ciao! Sono l'assistente digitale di Paolo. Posso darti info sui suoi progetti, contatti o altro ancora. Come posso esserti utile?"
    },
    "lastUpdate": "05/12/2025",
    "theme": {
        "default": "dark"
    },
    "intents": [
        {
            "keywords": [
                "ciao",
                "hey",
                "salve",
                "buongiorno",
                "buonasera",
                "heila",
                "ehi",
                "pronto",
                "ci sei",
                "scusa",
                "hello",
                "hi",
                "start",
                "buon pomeriggio",
                "buona sera",
                "buona mattina"
            ],
            "response": "Ciao! Sono qui. Dimmi pure, come posso aiutarti o cosa vorresti sapere su Paolo?",
            "actionId": null
        },
        {
            "keywords": [
                "come stai",
                "tutto bene",
                "come va",
                "che si dice",
                "tutto ok",
                "stai bene"
            ],
            "response": "Tutto operativo! Di cosa avevi bisogno?",
            "actionId": null
        },

        {
            "keywords": [
                "ultimo aggiornamento",
                "ultima modifica",
                "ultimo update"
            ],
            "response": "Last update: {{LAST_UPDATE}}",
            "actionId": null
        },

        {
            "keywords": [
                "chi sei",
                "cosa fai",
                "funzioni",
                "presentati",
                "chi è questo bot",
                "descriviti"
            ],
            "response": "Sono un assistente virtuale programmato per gestire le comunicazioni di Paolo Pirruccio. Posso fornirti i suoi contatti, link di pagamento, portfolio e altro ancora.",
            "actionId": null
        },
        {
            "keywords": [
                "mensa", "menu"
            ],
            "response": "Certo! Ecco il menu della mensa di oggi.",
            "actionId": "mensa"
        },
        {
            "keywords": [
                "prenota", "call", "appuntamento", "meeting", "tidycal", "calendario", "fissa"
            ],
            "response": "Certamente! Puoi prenotare una chiamata con Paolo da qui.",
            "actionId": "tidycal"
        },

        {
            "keywords": [
                "sono libero domani"
            ],
            "response": "Sì.",
            "actionId": null
        },

        {
            "keywords": [
                "gloria", "penso"
            ],
            "response": "Vuoi aggiungerla in CC?",
            "actionId": "email"
        },
        {
            "keywords": [
                "sono paolo"
            ],
            "response": "Salva padrone!",
            "actionId": null
        },
        {
            "keywords": [
                "grazie",
                "gentile",
                "perfetto",
                "ottimo",
                "grande",
                "thanks"
            ],
            "response": "È un piacere! Se ti serve altro, sono qui.",
            "actionId": null
        },
        {
            "keywords": [
                "muori",
                "ammazzati",
                "crepa",
                "suicidati",
                "esplodi",
                "buttati",
                "troia",
                "puttana",
                "bastardo",
                "stronzo"

            ],
            "response": "Vedo che ho il piacere di parlare con una testa di cazzo... Serve altro?",
            "actionId": null
        },
        {
            "keywords": [
                "vaffanculo",
                "fanculo",
                "fuck",
                "shit",
                "fottiti",
                "vai a cagare",
                "stronzo",
                "merda",
                "cazzo",
                "coglione",
                "pezzo di merda",
                "suca"
            ],
            "response": "Che linguaggio colorito... Serve altro?",
            "actionId": null
        },
        {
            "keywords": [
                "sei scemo",
                "sei un idiota",
                "rincoglionito",
                "scemo",
                "idiota",
                "stocazzo",
                "maleducato",
                "ignorante",
                "terrone",
                "deficiente",
                "sei lento",
                "è tardi",
                "è presto",
                "non mi frega"
            ],
            "response": "Okay... Serve altro?",
            "actionId": null
        },

        {
            "keywords": [
                "schlein",
                "trump",
                "putin",
                "harris",
                "kamala",
                "meloni"
            ],
            "response": "Non vorrei parlare di questi argomenti... Serve altro?",
            "actionId": null
        },
        {
            "keywords": [
                "mi ami",
                "ti amo",
                "sposami",
                "fidanziamoci",
                "sposiamoci",
                "love you",
                "love u",
                "sei bello"
            ],
            "response": "Sono lusingato, ma le relazioni a distanza server-client sono difficili. 💔",
            "actionId": null
        },
        {
            "keywords": [
                "blah",
                "asdf",
                "qwerty",
                "...",
                "bho",
                "non so",
                "test"
            ],
            "response": "Interessante punto di vista. Se volevi solo testare se sono sveglio: sì, ci sono. Serve altro?",
            "actionId": null
        },
        {
            "keywords": [
                "vattene",
                "sparisci",
                "lasciami stare",
                "fuori",
                "basta",
                "stop",
                "esci",
                "tua madre",
                "tua sorella"
            ],
            "response": "Messaggio ricevuto. Non devi fare altro che chiudere la chat, non mi offendo mica... 👋",
            "actionId": null
        },
        {
            "keywords": [
                "orientamento",
                "vita personale",
                "fidanzamento",
                "fidanzato",
                "fidanzata",
                "vita privata"
            ],
            "response": "Manteniamoci professionali. Cosa posso fare per te?",
            "actionId": null
        },
        {
            "keywords": [
                "razzista",
                "fascista",
                "politica",
                "voti",
                "destra",
                "sinistra"
            ],
            "response": "Io non voto, sono un bot. Se vuoi parlare di politica con lui, ti consiglio di scrivergli una mail.",
            "actionId": "email"
        },
        {
            "keywords": [
                "bravo",
                "intelligente",
                "sei forte",
                "bel bot",
                "complimenti"
            ],
            "response": "Grazie mille! Faccio del mio meglio. 😎",
            "actionId": null
        },

        {
            "keywords": [
                "stupido",
                "non capisci",
                "inutile",
                "scemo",
                "bot stupido",
                "fai schifo",
                "fai cagare",
                "merda"
            ],
            "response": "Mi dispiace se non sono riuscito ad aiutarti. Sto ancora imparando! Prova a riformulare la domanda in modo più semplice.",
            "actionId": null
        },
        {
            "keywords": [
                "chi è paolo",
                "parlami di paolo",
                "raccontami di lui",
                "bio",
                "biografia",
                "autore"
            ],
            "response": "Paolo è nato nel 2001 ed è originario di Siracusa. Studia Informatica Umanistica a Pisa e si interessa di tecnologia, grafica digitale e viaggi. È un appassionato del mondo Apple.",
            "actionId": null
        },
        {
            "keywords": [
                "studi",
                "università",
                "scuola",
                "laurea",
                "formazione",
                "informatica umanistica"
            ],
            "response": "Paolo studia Informatica Umanistica. È un campo affascinante che unisce la tecnologia alle discipline umanistiche.",
            "actionId": null
        },
        {
            "keywords": [
                "interessi",
                "hobby",
                "cosa gli piace",
                "passioni",
                "tempo libero"
            ],
            "response": "Quando non è al computer, Paolo ama viaggiare, ascoltare podcast e sperimentare con la grafica digitale. Ah, ed è un grande fan dei prodotti Apple.",
            "actionId": null
        },
        {
            "keywords": [
                "soldi",
                "pagare",
                "inviare denaro",
                "bonifico",
                "debito",
                "saldare",
                "conto"
            ],
            "response": "Certamente. Puoi inviare denaro a Paolo tramite Revolut o PayPal. Cosa preferisci?",
            "actionId": null
        },
        {
            "keywords": [
                "mail",
                "email",
                "scrivere",
                "contattare",
                "posta",
                "indirizzo email",
            ],
            "response": "Il modo migliore per parlare cose serie è via mail. Puoi scrivere alla mail personale di Paolo direttamente da qui.",
            "actionId": "email"
        },
        {
            "keywords": [
                "telegram",
                "chat",
                "messaggio",
                "messaggiare",
                "tg",
                "username telegram",
                "parlare con paolo",
                "devo parlare con paolo",
                "passami paolo"
            ],
            "response": "Ecco il contatto Telegram di Paolo per una chat veloce.",
            "actionId": "telegram"
        },
        {
            "keywords": [
                "instagram",
                "foto",
                "insta",
                "ig",
                "social",
                "immagini"
            ],
            "response": "Puoi seguire Paolo su Instagram qui.",
            "actionId": "instagram"
        },

        {
            "keywords": [
                "bdd",
                "basi",
                "basi di dati"

            ],
            "response": "Ecco il sito del progetto realizzato per l'esame di Basi di Dati",
            "actionId": "bdd"
        },

        {
            "keywords": [
                "codifica",
                "codifica di testi"

            ],
            "response": "Ecco il sito del progetto realizzato per l'esame di Codifica di Testi.",
            "actionId": "codifica"
        },
        {
            "keywords": [
                "Contattalo"
            ],
            "response": "Certo! Preferisci via mail, via Telegram oppure vuoi che ti prenoti un appuntamento?",
            "actionId": null
        },

        {
            "keywords": [
                "linkedin",
                "lavoro",
                "professionale",
                "esperienze",
                "business"
            ],
            "response": "Per i dettagli professionali e il CV, ti consiglio di visitare il profilo LinkedIn oppure scrivi cv per scaricare il suo curriculum vitae direttamente qui.",
            "actionId": "linkedin"
        },
        {
            "keywords": [
                "cv",
                "curriculum",
                "scarica cv",
                "resume",
                "scarica curriculum"
            ],
            "response": "Ecco il mio Curriculum Vitae. Puoi scaricarlo cliccando qui sotto.",
            "actionId": "download_cv"
        },
        {
            "keywords": [
                "barzelletta",
                "battuta",
                "fammi ridere",
                "scherza",
                "ridere"
            ],
            "response": "Un file ZIP entra in un bar e chiede un drink. Il barista: 'Te lo faccio subito, ma per favore non ti scompisciare qui dentro!' 🥁",
            "actionId": null
        },

        {
            "keywords": ["sono libero"],
            "response": "E io che ne so.",
            "actionId": null
        },

        {
            "keywords": [
                "senso della",
                "filosofia",
                "perché siamo qui"
            ],
            "response": "Secondo i miei calcoli è 42.",
            "actionId": null
        },
        {
            "keywords": [
                "aiuto",
                "help",
                "non so cosa fare",
                "comandi",
                "menu"
            ],
            "response": "Non preoccuparti. Prova a chiedermi i 'contatti', i 'social'.",
            "actionId": null
        },
        {
            "keywords": [
                "che ore sono",
                "ora",
                "orario",
                "che ora è"
            ],
            "response": "Sono le {{TIME}}.",
            "actionId": null
        },
        {
            "keywords": [
                "che giorno è",
                "data",
                "giorno",
                "oggi"
            ],
            "response": "Oggi è {{DATE}}.",
            "actionId": null
        },
        {
            "keywords": [
                "compleanno",
                "quando è nato",
                "data di nascita",
                "nato"
            ],
            "response": "Paolo è nato nel 2001.",
            "actionId": null
        },
        {
            "keywords": [
                "quanti anni ha",
                "età",
                "anni",
                "vecchio"
            ],
            "response": "Paolo è del 2001, quindi ha {{AGE}} anni.",
            "actionId": null
        },
        {
            "keywords": [
                "colore preferito",
                "colore",
                "che colore gli piace"
            ],
            "response": "Il colore preferito di Paolo è il Giallo.",
            "actionId": null
        },

        {
            "keywords": [
                "apple o samsung",
                "android o ios",
                "meglio apple",
                "meglio samsung",
                "iphone o samsung"
            ],
            "response": "Senza dubbio Apple. ",
            "actionId": null
        },

        {
            "keywords": ["machine", "ml"],
            "response": "Cerchi il link alla nuova dispensa unica di Machine Learning? Eccolo:",
            "actionId": "ml"
        },

        {
            "keywords": ["gemma"],
            "response": "Cerchi gli appunti semplificati di Machine Learning? Ecco il link:",
            "actionId": "gemma"
        },
        {
            "keywords": ["slide", "slides", "presentazioni", "dispense"],
            "response": "Cerchi le dispense di Machine Learning? Ecco il link:",
            "actionId": "slide"
        },
        {
            "keywords": ["notion"],
            "response": "Trovi Paolo su Notion con la sua mail universitaria.",
            "actionId": null
        },
        {
            "keywords": ["ppw", "progettazione", "programmazione e progettazione web"],
            "response": "Ecco il link al suo sito web di Progettazione e Programmazione Web.",
            "actionId": "ppw"
        },
        {
            "keywords": ["editoria digitale", "digital publishing"],
            "response": "Non me ne parlare.",
            "actionId": null
        },
        {
            "keywords": ["seminario"],
            "response": "Ecco il link al seminario di Cultura Digitale su YouTube.",
            "actionId": "seminario"
        },
        {
            "keywords": ["studiare", "studiando", "cosa studi", "studio"],
            "response": "Attualmente Paolo studia alla magistrale di Informatica Umanistica.",
            "actionId": null
        },
        {
            "keywords": ["bussola", "lista link"],
            "response": "Certo! Qui puoi trovare una collezione di link utili per Informatica Umanistica.",
            "actionId": "bussola"
        },
        {
            "keywords": ["faq", "guida"],
            "response": "Ecco la guida per iniziare a districarti con il corso di Informatica Umanistica.",
            "actionId": "guida"
        },
        {
            "keywords": ["dove trovarti", "dove trovarlo"],
            "response": "Controlla sul suo sito personale:",
            "actionId": "portfolio"
        },
        {
            "keywords": ["portfolio", "il tuo sito", "questo sito"],
            "response": "Ecco il link al portfolio di Paolo. (C'è anche un pulsante 'Portfolio' in alto a destra)",
            "actionId": "portfolio"
        },
        {
            "keywords": ["desktop", "studiamo", "old site"],
            "response": "Ecco l'ambiente desktop per studiare in armonia.",
            "actionId": "desktop"
        },
        {
            "keywords": ["whatsapp", "wa", "chat whatsapp"],
            "response": "Scrivi a Paolo su Telegram per farti dare il suo numero di telefono:",
            "actionId": "telegram"
        },
        {
            "keywords": ["twitter", "x", "tweet"],
            "response": "Paolo non è presente su X (Twitter).",
            "actionId": null
        },
        {
            "keywords": ["numero di telefono", "telefono", "cellulare", "chiama"],
            "response": "Per la privacy, non condivido il numero di telefono qui. Meglio usare la mail o Telegram!",
            "actionId": "email"
        },
        {
            "keywords": ["chiedimi come contattare paolo", "come contatto paolo", "info contatti"],
            "response": "Puoi contattare Paolo via Email, Telegram o WhatsApp.",
            "actionId": "email"
        },
        {
            "keywords": ["seguirlo sui social", "follow", "segui"],
            "response": "Paolo ha un account Instagram. Eccolo:",
            "actionId": "instagram"
        },

        {
            "keywords": ["paypal", "paga con paypal"],
            "response": "Il metodo più veloce: ecco il link PayPal di Paolo.",
            "actionId": "paypal"
        },
        {
            "keywords": ["postepay"],
            "response": "Paolo usa anche Postepay. Se hai il suo numero di telefono dovrebbe comparire tra i contatti P2P. Altrimenti scrivigli in privato per il numero di telefono.",
            "actionId": "telegram"
        },

        {
            "keywords": ["numero telefono", "cellulare", "telefono"],
            "response": "Mi dispiace ma non sono autorizzato a dare il numero di telefono. Scrivigli in privato via mail.",
            "actionId": "email"
        },

        {
            "keywords": ["revolut", "rev", "invia con revolut"],
            "response": "Certo! Ecco il link al RevTag di Paolo.",
            "actionId": "revolut"
        },
        {
            "keywords": ["inviargli del denaro"],
            "response": "Revolut, PayPal o PostePay?",
            "actionId": null
        },

        {
            "keywords": ["christian", "chris"],
            "response": "Ciao Christian! Cosa posso fare per te? (Ricordati il bulk)",
            "actionId": null
        },



        {
            "keywords": ["spotify", "musica", "playlist", "cosa ascolti"],
            "response": "Ecco cosa sta ascoltando Paolo su Spotify.",
            "actionId": "spotify"
        },
        {
            "keywords": ["assisi"],
            "response": "DOBBIAMO ANDARCI.",
            "actionId": null
        },
        {
            "keywords": ["cosa ti piace", "gusti", "preferenze"],
            "response": "Mi piace l'efficienza.  Cosa posso fare per aiutarti?",
            "actionId": null
        },
        {
            "keywords": ["che fai", "cosa stai facendo", "attività"],
            "response": "Io aspetto i tuoi comandi.",
            "actionId": null
        },

        {
            "keywords": ["bookmarks", "segnalibri", "link salvati", "preferiti"],
            "response": "Ecco i link che Paolo ha salvato nei suoi Bookmarks.",
            "actionId": "bookmarks"
        },
        {
            "keywords": ["library", "libreria", "libri", "letture"],
            "response": "Ecco la libreria digitale di Paolo con le sue letture consigliate.",
            "actionId": "library"
        },
        {
            "keywords": ["blog", "articoli", "scrive", "post"],
            "response": "Leggi gli ultimi articoli scritti da Paolo sul suo Blog.",
            "actionId": "blog"
        },
        {
            "keywords": ["risorse", "resources", "materiale", "utilità"],
            "response": "Qui trovi una raccolta di risorse utili condivise da Paolo.",
            "actionId": "resources"
        },
        {
            "keywords": ["progetti", "galleria", "lavori", "gallery", "projects", "portfolio visuale"],
            "response": "Ho aperto la galleria con tutti i progetti di Paolo.",
            "actionId": "gallery"
        },
        {
            "keywords": ["lingue", "che lingue parli", "inglese"],
            "response": "Paolo parla Italiano (madrelingua) e Inglese.",
            "actionId": null
        },
        {
            "keywords": ["dove sei", "location", "città", "dove vivi", "di dove sei"],
            "response": "Paolo è originario di Siracusa, in Sicilia, ma attualmente studia in Toscana.",
            "actionId": null
        },
        {
            "keywords": ["ultimo aggiornamento", "last update", "quando sei stato aggiornato", "versione"],
            "response": "Il mio ultimo aggiornamento risale al {{LAST_UPDATE}}.",
            "actionId": null
        },

        {
            "keywords": ["nintendo", "switch", "amico", "friend code", "codice amico"],
            "response": "Certo! Ecco il codice amico Nintendo Switch di Paolo.",
            "actionId": "nintendo"
        },
        {
            "keywords": ["amazon", "wishlist", "lista desideri", "regalo"],
            "response": "Se vuoi fare un regalo a Paolo, ecco la sua wishlist Amazon.",
            "actionId": "amazon"
        },
        {
            "keywords": ["mail universitaria", "mail unipi", "posta unipi", "email studenti"],
            "response": "Certo! Ecco il link alla webmail universitaria.",
            "actionId": "uni_mail"
        },
        {
            "keywords": ["valutami", "esami", "valutazione", "unipi valutami"],
            "response": "Certo! Ecco il portale Valutami di Unipi.",
            "actionId": "valutami"
        },
        {
            "keywords": ["ricarichiamoci", "ricarica mensa", "soldi mensa", "dsu ricarica", "ricarica"],
            "response": "Ecco il portale per ricaricare la mensa.",
            "actionId": "ricarichiamoci"
        },
        {
            "keywords": ["aule", "cerca aule", "dove lezione", "trova aula"],
            "response": "Certo! Ecco il portale per cercare le aule Unipi.",
            "actionId": "aule"
        },
        {
            "keywords": ["orario", "lezioni", "orario lezioni", "agenda"],
            "response": "Certo! Ecco l'agenda orario delle lezioni.",
            "actionId": "orario"
        },

        {
            "keywords": ["okay", "ok", "va bene", "k"],
            "response": "Ok!",
            "actionId": null
        },
        {
            "keywords": ["controllo risposte", "debug", "test mode"],
            "response": "Modalità debug attivata... Tutto sembra in regola.",
            "actionId": null
        },
        {
            "keywords": ["reset", "riavvia", "restart"],
            "response": "Il pulsante reset è in alto a destra.",
            "actionId": null
        },
        {
            "keywords": ["no", "negativo"],
            "response": "Ricevuto. Cosa posso fare d'altro per te?",
            "actionId": null
        },
        {
            "keywords": ["sì", "si", "affermativo", "certo", "forse"],
            "response": "Ottimo. Cosa posso fare d'altro per te?",
            "actionId": null
        },
        {
            "keywords": ["sono stanco", "ho sonno", "sonno", "vado a dormire"],
            "response": "Riposati!",
            "actionId": null
        },

        {
            "keywords": ["buonanotte", "notte", "goodnight"],
            "response": "Buonanotte! Sogni d'oro (e senza bug). 🌙",
            "actionId": null
        },
        {
            "keywords": ["pazzo", "sei pazzo", "folle"],
            "response": "Bisogna essere un po' pazzi per fare questo lavoro!",
            "actionId": null
        },
        {
            "keywords": ["figlio di"],
            "response": "Ehi, piano con le parole! Mia madre è una CPU molto rispettabile.",
            "actionId": null
        },
        {
            "keywords": ["stocazzo"],
            "response": "Elegante come un poeta francese.",
            "actionId": null
        }
    ],
    "actions": {
        "paypal": {
            "type": "link",
            "title": "PayPal.Me",
            "subtitle": "Invia denaro in sicurezza",
            "url": "https://paypal.me/PaoloPirruccio",
            "icon": "fa-brands fa-paypal",
            "color": "#0070BA"
        },
        "email": {
            "type": "mailto",
            "title": "Invia Email",
            "subtitle": "paolo@example.com",
            "url": "mailto:paolo@example.com",
            "icon": "fa-solid fa-envelope",
            "color": "#5856D6"
        },
        "tidycal": {
            "type": "link",
            "title": "Book a Call",
            "subtitle": "Tidycal",
            "url": "https://tidycal.com/paolopirruccio",
            "icon": "fa-solid fa-calendar-check",
            "color": "#007AFF"
        },
        "bookmarks": {
            "type": "link",
            "title": "Bookmarks",
            "subtitle": "Salvati",
            "url": "#",
            "icon": "fa-solid fa-bookmark",
            "color": "#FFCC00"
        },
        "library": {
            "type": "link",
            "title": "Library",
            "subtitle": "Libreria",
            "url": "#",
            "icon": "fa-solid fa-book-open",
            "color": "#8E8E93"
        },
        "blog": {
            "type": "link",
            "title": "Blog",
            "subtitle": "Articoli",
            "url": "#",
            "icon": "fa-solid fa-pen-nib",
            "color": "#FF9500"
        },
        "resources": {
            "type": "link",
            "title": "Risorse",
            "subtitle": "Download",
            "url": "#",
            "icon": "fa-solid fa-folder-open",
            "color": "#007AFF"
        },
        "gallery": {
            "type": "link",
            "title": "Galleria Progetti",
            "subtitle": "Visualizza",
            "url": "../gallery.html",
            "icon": "fa-solid fa-images",
            "color": "#AF52DE"
        },
        "instagram": {
            "type": "link",
            "title": "Instagram",
            "subtitle": "@tuousername",
            "url": "https://www.instagram.com/pirruccio_paolo/",
            "icon": "fa-brands fa-instagram",
            "color": "#E1306C"
        },
        "linkedin": {
            "type": "link",
            "title": "LinkedIn",
            "subtitle": "Profilo Professionale",
            "url": "https://www.linkedin.com/in/paolopirruccio/",
            "icon": "fa-brands fa-linkedin",
            "color": "#0077B5"
        },
        "download_cv": {
            "type": "file",
            "title": "Scarica CV",
            "subtitle": "PDF Document",
            "url": "../assets/cv-paolo-pirruccio.pdf",
            "download": "Paolo_Pirruccio_CV.pdf",
            "icon": "fa-solid fa-file-arrow-down",
            "color": "#34C759"
        },

        "codifica": {
            "type": "link",
            "title": "Codifica di Testi",
            "subtitle": "Progetto Web",
            "url": "../codifica/index.html",
            "icon": "fa-solid fa-code",
            "color": "#3c965aff"
        },
        "mensa": {
            "type": "link",
            "title": "Menu Mensa",
            "subtitle": "Menu DSU",
            "url": "https://canteen.dsutoscana.cloud/menu/0/0/4/3",
            "icon": "fa-solid fa-utensils",
            "color": "#FF3B30"
        },
        "ml": {
            "type": "link",
            "title": "Machine Learning",
            "subtitle": "Dispensa Unica Rielaborata",
            "url": "https://docs.google.com/document/d/1uFpxCrcj1sXxF-W9AsaUcs4VG8jiUefDIcVJ7YM0gY8/edit?usp=sharing",
            "icon": "fa-solid fa-robot",
            "color": "#AF52DE"
        },
        "gemma": {
            "type": "link",
            "title": "Appunti di Gemma",
            "subtitle": "Appunti",
            "url": "https://docs.google.com/document/d/1eDkUC_VOQAD-Auy5j4snNo0rJVQa2iMhmtcQ3L2W9XE/edit?usp=sharing",
            "icon": "fa-solid fa-brain",
            "color": "#4285F4"
        },
        "slide": {
            "type": "link",
            "title": "Slide & Materiale ML",
            "subtitle": "Slide Machine Learning",
            "url": "https://docs.google.com/document/d/1jSbxXr7PfZa0Sde4rh4878t12KYL3_4IwHNtO2aO47M/edit?usp=sharing",
            "icon": "fa-solid fa-layer-group",
            "color": "#FFCC00"
        },
        "ppw": {
            "type": "link",
            "title": "PPW",
            "subtitle": "Progetto Programmazione Web",
            "url": "../ppw/index.html",
            "icon": "fa-solid fa-pencil-ruler",
            "color": "#5856D6"
        },
        "seminario": {
            "type": "link",
            "title": "Seminario Cultura Digitale",
            "subtitle": "YouTube",
            "url": "https://www.youtube.com/channel/UCUlp9sHqY1nguO-1IPaR-ZA",
            "icon": "fa-brands fa-youtube",
            "color": "#FF0000"
        },
        "portfolio": {
            "type": "link",
            "title": "Portfolio",
            "subtitle": "Torna alla Home",
            "url": "../index.html",
            "icon": "fa-solid fa-briefcase",
            "color": "#007AFF"
        },

        "telegram": {
            "type": "link",
            "title": "Telegram",
            "subtitle": "Messaggio su Revolut",
            "url": "https://t.me/sunriseshy",
            "icon": "fa-brands fa-telegram",
            "color": "#007AFF"
        },

        "bdd": {
            "type": "link",
            "title": "Progetto Basi di Dati",
            "subtitle": "Sito Web",
            "url": "../bdd/index.html",
            "icon": "fa-solid fa-database",
            "color": "#433864ff"
        },
        "desktop": {
            "type": "link",
            "title": "Desktop",
            "subtitle": "Ambiente Desktop",
            "url": "../desktop/index.html",
            "icon": "fa-solid fa-desktop",
            "color": "#888888"
        },
        "revolut": {
            "type": "link",
            "title": "Revolut",
            "subtitle": "@paolopirruccio",
            "url": "https://revolut.me/ppirruccio",
            "icon": "fa-solid fa-money-bill",
            "color": "#0075EB"
        },
        "spotify": {
            "type": "link",
            "title": "Spotify",
            "subtitle": "Ascolta la playlist",
            "url": "https://open.spotify.com/playlist/4jZewD1ibeylaOwXASx98z?si=de61904fced74ec8",
            "icon": "fa-brands fa-spotify",
            "color": "#1DB954"
        },
        "nintendo": {
            "type": "link",
            "title": "SW-6634-7443-2318",
            "subtitle": "Codice Amico",
            "url": "#",
            "icon": "fa-solid fa-gamepad",
            "color": "#E60012"
        },
        "amazon": {
            "type": "link",
            "title": "Amazon Wishlist",
            "subtitle": "Lista Desideri",
            "url": "https://www.amazon.it/hz/wishlist/ls/1L4Y0986ZBBOQ/ref=nav_wishlist_lists_1",
            "icon": "fa-brands fa-amazon",
            "color": "#FF9900"
        },
        "uni_mail": {
            "type": "link",
            "title": "Mail Unipi",
            "subtitle": "Webmail Studenti",
            "url": "mailto:p.pirruccio@studenti.unipi.it",
            "icon": "fa-solid fa-graduation-cap",
            "color": "#003366"
        },
        "valutami": {
            "type": "link",
            "title": "Valutami",
            "subtitle": "Portale Esami",
            "url": "https://esami.unipi.it",
            "icon": "fa-solid fa-check-to-slot",
            "color": "#007AFF"
        },
        "ricarichiamoci": {
            "type": "link",
            "title": "Ricarichiamoci",
            "subtitle": "Ricarica Mensa",
            "url": "https://ricarichiamoci.dsu.toscana.it/ricarichiamoci/index.html",
            "icon": "fa-solid fa-wallet",
            "color": "#d66e12ff"
        },
        "aule": {
            "type": "link",
            "title": "Cerca Aule",
            "subtitle": "Unipi Aule",
            "url": "bussola/aule.html",
            "icon": "fa-solid fa-building-columns",
            "color": "#5856D6"
        },
        "orario": {
            "type": "link",
            "title": "Orario Lezioni",
            "subtitle": "Agenda Unipi",
            "url": "bussola/lezioni.html",
            "icon": "fa-solid fa-calendar-days",
            "color": "#FFD60A"
        },
        "bussola": {
            "type": "link",
            "title": "La Bussola di InfoUma",
            "subtitle": "Lista link",
            "url": "bussola/index.html",
            "icon": "fa-solid fa-compass",
            "color": "#a38f35ff"
        },
        "guida": {
            "type": "link",
            "title": "La Guida di InfoUma",
            "subtitle": "Lista FAQ",
            "url": "bussola/faq.html",
            "icon": "fa-solid fa-book",
            "color": "#6765c0ff"
        }

    },
    "fallbacks": [
        "Non sono sicuro di aver capito. Forse intendevi...",
        "Mmh, questo non lo so. Però posso aiutarti con...",
        "Non ho una risposta precisa, ma prova a chiedermi...",
        "Mi dispiace, ancora devo imparare a capire tante cose. Prova con...",
        "Interessante, ma fuori dalle mie competenze attuali. Ti suggerisco..."
    ],
    "suggestions": [
        "Portfolio",
        "Contatti",
        "Appuntamento",
        "Social",
        "Chi sei",
        "Email",
        "LinkedIn",
        "PayPal",
        "CV",
        "Progetti"
    ]
};

// ==========================================
// ==========================================
const BotNLP = {

    stopWords: new Set(["il", "lo", "la", "i", "gli", "le", "di", "a", "da", "in", "con", "su", "per", "tra", "fra", "un", "uno", "una", "e", "che", "non", "mi", "ti", "ci", "vi", "si", "come", "dove", "quando", "chi", "cosa", "perche", "perché", "quali"]),

    levenshtein(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    },

    tokenize(text) {
        return text.toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()?’"“]/g, " ")
            .split(/\s+/)
            .filter(w => w.length > 1 && !this.stopWords.has(w));
    },

    findResponse(text, appData) {
        const lower = text.toLowerCase().trim();
        if (!appData?.intents) return null;

        if (/^[\d\s+\-*/().]+$/.test(lower) && /\d/.test(lower) && /[+\-*/]/.test(lower)) {
            try {
                const r = new Function('return ' + lower)();
                if (r !== undefined && !isNaN(r) && isFinite(r)) {
                    return { text: `Il risultato è: ${r}`, action: null, isMath: true };
                }
            } catch (_) { }
        }

        const userTokens = this.tokenize(text);

        let maxScore = 0;
        let foundIntent = null;

        for (const intent of appData.intents) {
            let intentScore = 0;

            for (const kw of intent.keywords) {
                const kwStr = kw.toLowerCase();

                if (lower === kwStr) {
                    intentScore += 100;
                    break;
                }

                if (lower.includes(' ' + kwStr + ' ') || lower.startsWith(kwStr + ' ') || lower.endsWith(' ' + kwStr)) {
                    intentScore += 20;
                }

                const kwTokens = this.tokenize(kwStr);

                for (const uToken of userTokens) {
                    for (const kToken of kwTokens) {
                        if (uToken === kToken) {
                            intentScore += 10; // Exact word match
                        } else if (uToken.length > 4 && kToken.length > 4) {
                            const dist = this.levenshtein(uToken, kToken);
                            if (dist <= 2) {
                                intentScore += (8 - dist * 2);
                            }
                        } else if (uToken.length >= 3 && kToken.length >= 3) {
                            if (uToken.startsWith(kToken) || kToken.startsWith(uToken)) {
                                intentScore += 5; // Good prefix match (stemming approximation)
                            } else if (this.levenshtein(uToken, kToken) === 1) {
                                intentScore += 4; // 1 typo for small words
                            }
                        }
                    }
                }
            }

            if (this.lastActionId && intent.actionId === this.lastActionId) {
                intentScore += 5;
            }

            if (intentScore > maxScore) {
                maxScore = intentScore;
                foundIntent = intent;
            }
        }

        if (foundIntent && maxScore >= 5) {
            return {
                text: foundIntent.response,
                action: foundIntent.actionId ? appData.actions[foundIntent.actionId] : null,
                intent: foundIntent
            };
        }

        const fallbacks = appData.fallbacks || ["Non sono sicuro di aver capito. Forse intendevi..."];
        return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], action: null, isFallback: true };
    }
};
