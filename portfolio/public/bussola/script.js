window.onerror = function (msg, url, line) {
    console.error(`Error: ${msg}\nLine: ${line}`);
};

const resources = [
    // ── Principali ──
    { name: "Portale Alice",    name_en: "Alice Portal",        subtitle: "Gestione carriera, ISEE e segreteria",    subtitle_en: "Career management, ISEE and secretariat", url: "https://www.studenti.unipi.it/Home.do", section: "primary" },
    { name: "Libretto UniPi",   name_en: "UniPi Transcript",    subtitle: "Visualizza voti ed esami superati",       subtitle_en: "View grades and passed exams",            url: "https://libretto.unipi.it/", section: "primary" },
    { name: "Le tue lezioni",   name_en: "Your lectures",       subtitle: "Consulta il tuo orario settimanale",     subtitle_en: "Check your weekly schedule",             url: "https://agendadidattica.unipi.it/Prod/Home/Classes", section: "primary" },
    { name: "Calendario",       name_en: "Calendar",            subtitle: "Vista mensile delle tue lezioni",        subtitle_en: "Monthly view of your lectures",           url: "https://agendadidattica.unipi.it/Prod/Home/Calendar", section: "primary" },
    { name: "La tua mail",      name_en: "Your email",          subtitle: "Accedi alla webmail di ateneo",          subtitle_en: "Access your university webmail",          url: "https://outlook.com/", section: "primary" },
    { name: "Registro lezioni", name_en: "Lecture register",    subtitle: "Tutte le lezioni svolte dai docenti",    subtitle_en: "All lectures given by professors",        url: "https://unimap.unipi.it/cercapersone/cercapersone.php", section: "primary" },
    { name: "Iscrizione esame", name_en: "Exam registration",   subtitle: "Prenota un appello su Valutami",         subtitle_en: "Book an exam session on Valutami",       url: "https://esami.unipi.it/elencoappelli.php", section: "primary" },
    { name: "Le tue iscrizioni",name_en: "Your registrations",  subtitle: "Gestisci le tue prenotazioni agli esami",subtitle_en: "Manage your exam bookings",              url: "https://esami.unipi.it/elencoappelli.php", section: "primary" },

    // ── Didattica & Carriera ──
    { name: "Sito Ufficiale IU Triennale",          name_en: "Official IU Bachelor's Site",         url: "https://www.fileli.unipi.it/informatica-umanistica/", category: "Didattica & Carriera" },
    { name: "Sito Ufficiale IU Magistrale",         name_en: "Official IU Master's Site",           url: "https://www.fileli.unipi.it/informatica-umanistica-lm/", category: "Didattica & Carriera" },
    { name: "Piano di studio Triennale (Cineca)",   name_en: "Bachelor's Study Plan (Cineca)",      url: "https://unipi.coursecatalogue.cineca.it/corsi/2024/10456", category: "Didattica & Carriera" },
    { name: "Piano di studio Magistrale (Cineca)",  name_en: "Master's Study Plan (Cineca)",        url: "https://unipi.coursecatalogue.cineca.it/corsi/2025/11512/insegnamenti/53180", category: "Didattica & Carriera" },
    { name: "Google Drive Appunti",                 name_en: "Shared Notes (Google Drive)",         url: "https://drive.google.com/drive/folders/1-E3zn-oEyeut67agQEV5XQ4qH-pWLKAD?usp=sharing", category: "Didattica & Carriera" },
    { name: "Sistema Bibliotecario di Ateneo",      name_en: "University Library System",           url: "https://www.sba.unipi.it", category: "Didattica & Carriera" },
    { name: "Onesearch Biblioteca",                 name_en: "Library OneSearch",                   url: "https://onesearch.unipi.it/discovery/search?vid=39SBART_UPI:39UPI_V2", category: "Didattica & Carriera" },
    { name: "Cerca corso, insegnamento, docente",   name_en: "Search Course / Professor",           url: "https://unipi.coursecatalogue.cineca.it", category: "Didattica & Carriera" },
    { name: "Cerca personale",                      name_en: "Search staff",                        url: "https://unimap.unipi.it/cercapersone/cercapersone.php", category: "Didattica & Carriera" },
    { name: "Cerca organizzazioni",                 name_en: "Search organisations",                url: "https://unimap.unipi.it/organizzazione/lista.php?f=1CEN@D", category: "Didattica & Carriera" },
    { name: "Sondaggi Unipi",                       name_en: "UniPi Surveys",                       url: "https://agendadidattica.unipi.it/Prod/Home/Survey", category: "Didattica & Carriera" },
    { name: "Orario Pubblico Cineca",               name_en: "Public Timetable (Cineca)",           url: "https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=6319d6a9f7245e0c5c9094e3", category: "Didattica & Carriera" },
    { name: "Aule unipi",                           name_en: "UniPi Classrooms",                    url: "https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=63223a029f080a0aab032afc", category: "Didattica & Carriera" },
    { name: "Ammissione a Magistrale",              name_en: "Master's Admission",                  url: "https://ammissionelm.adm.unipi.it/", category: "Didattica & Carriera" },
    { name: "Tasse Universitarie",                  name_en: "University Fees",                     url: "https://www.studenti.unipi.it/auth/studente/Tasse/ListaFatture.do", category: "Didattica & Carriera" },
    { name: "Richiesta Riduzione Tasse",            name_en: "Fee Reduction Request",               url: "https://www.studenti.unipi.it/auth/Autocertificazioni/Autocertificazione.do?menu_opened_cod=menu_link-navbox_studenti_Segreteria", category: "Didattica & Carriera" },
    { name: "Certificati",                          name_en: "Certificates",                        url: "https://www.studenti.unipi.it/auth/studente/Certificati/ListaCertificati.do?menu_opened_cod=menu_link-navbox_studenti_Segreteria", category: "Didattica & Carriera" },
    { name: "Piano Carriera",                       name_en: "Study Plan",                          url: "https://www.studenti.unipi.it/auth/studente/Piani/PianiHome.do?menu_opened_cod=menu_link-navbox_studenti_Piano_di_Studio", category: "Didattica & Carriera" },
    { name: "Domanda Attesa di Laurea",             name_en: "Graduation Application",              url: "https://www.studenti.unipi.it/auth/studente/AdministrativeFunctions/DomAttLauElencoAction.do?menu_opened_cod=menu_link-navbox_studenti_Carriera", category: "Didattica & Carriera" },
    { name: "Domanda di Proroga",                   name_en: "Extension Request",                   url: "https://www.studenti.unipi.it/auth/Enrollment/EUploadAllegatiStartFakeProcesso.do?menu_opened_cod=menu_link-navbox_studenti_Carriera", category: "Didattica & Carriera" },
    { name: "Conseguimento Titolo",                 name_en: "Degree Achievement",                  url: "https://www.studenti.unipi.it/auth/studente/Graduation/Bacheca.do?menu_opened_cod=menu_link-navbox_studenti_Laurea", category: "Didattica & Carriera" },
    { name: "Modifica Anagrafica",                  name_en: "Update Personal Info",                url: "https://www.studenti.unipi.it/auth/AddressBook/ABMsgAnaPreForm.do", category: "Didattica & Carriera" },

    // ── Mappe & Logistica ──
    { name: "Mappa punti di interesse",             name_en: "Points of interest map",              url: "https://www.google.com/maps/d/u/0/viewer?mid=1q4ousVeGWQnZX-5K3i_SYE3bBsky2tkv&ll=43.696373493015706%2C10.437086399999984&z=12", category: "Mappe & Logistica" },
    { name: "Mappa Musei di Ateneo",                name_en: "University Museums map",              url: "https://maps.app.goo.gl/m2AwsozWfqktJrCb7", category: "Mappe & Logistica" },
    { name: "Polo Fibonacci su Google Maps",        name_en: "Polo Fibonacci on Google Maps",       url: "https://maps.app.goo.gl/iYCT6VaziEFsiam16?g_st=ic", category: "Mappe & Logistica" },
    { name: "Polo Fibonacci su Apple Maps",         name_en: "Polo Fibonacci on Apple Maps",        url: "https://maps.apple.com/place?address=Largo%20Bruno%20Pontecorvo%203,%2056127%20Pisa,%20Italy&coordinate=43.721188,10.407775&name=Polo%20Fibonacci&place-id=I88E823420B8E0D9F&map=explore", category: "Mappe & Logistica" },
    { name: "Mappa interattive aule Fibonacci",     name_en: "Interactive Fibonacci map",           url: "https://plumkewe.github.io/dove-unipi/?p=fibonacci&b=a&f=0&v=top", category: "Mappe & Logistica" },
    { name: "Aule studio",                          name_en: "Study rooms",                         url: "https://www.unipi.it/campus-e-servizi/servizi/biblioteche-e-sale-studio/", category: "Mappe & Logistica" },
    { name: "Mappe bus pisa",                       name_en: "Pisa bus maps",                       url: "https://files.at-bus.it/s3fs-public/documents/AT_Pisa_110x110_web.pdf", category: "Mappe & Logistica" },
    { name: "Collocazione aule",                    name_en: "Classroom locations",                 url: "https://www.fileli.unipi.it/didattica/collocazione-aule/", category: "Mappe & Logistica" },

    // ── Software ──
    { name: "Microsoft 365",            name_en: "Microsoft 365",           url: "https://m365.cloud.microsoft/apps/", category: "Software" },
    { name: "Google Drive",             name_en: "Google Drive",            url: "https://drive.google.com/drive/my-drive%3Fhl%3Dit&ved=2ahUKEwjsnaeP_quRAxWeOfsDHXXPCXkQFnoECAwQAQ&usg=AOvVaw2GMTqVupizsilv2uqasqIg", category: "Software" },
    { name: "OneDrive",                 name_en: "OneDrive",                url: "https://onedrive.live.com/", category: "Software" },
    { name: "Impostazioni Microsoft",   name_en: "Microsoft settings",      url: "https://myaccount.microsoft.com/?ref=MeControl&login_hint=", category: "Software" },
    { name: "Affinity Designer",        name_en: "Affinity Designer",       url: "https://www.affinity.studio/it_it", category: "Software" },

    // ── Mensa & Servizi ──
    { name: "Ricarica tessera mensa",   name_en: "Top up canteen card",     url: "https://ricarichiamoci.dsu.toscana.it/ricarichiamoci/index.html", category: "Mensa & Servizi" },
    { name: "Menu mensa",               name_en: "Canteen menu",            url: "https://canteen.dsutoscana.cloud/menu", category: "Mensa & Servizi" },
    { name: "App MyDSU (Android)",      name_en: "MyDSU App (Android)",     url: "https://play.google.com/store/apps/details?id=com.ristocloudgroup.mydsu&pcampaignid=web_share", category: "Mensa & Servizi" },
    { name: "App MyDSU (iOS)",          name_en: "MyDSU App (iOS)",         url: "https://apps.apple.com/app/id6738960806", category: "Mensa & Servizi" },
    { name: "Carta dello Studente",     name_en: "Student Card",            url: "https://www.regione.toscana.it/-/studente-della-toscana-la-nuova-carta-unica-dello-studente-universitario", category: "Mensa & Servizi" },
    { name: "Medico convenzionato",     name_en: "Medical assistance",      url: "https://unipi.it/AssistenzaMedica", category: "Mensa & Servizi" },
    { name: "Chiosco Fibonacci",        name_en: "Fibonacci Kiosk",         url: "https://www.ilchiosco.info", category: "Mensa & Servizi" },
    { name: "Info DSU Ristorazione",    name_en: "DSU Canteen info",        url: "https://www.dsu.toscana.it/dove-e-cosa-mangiare", category: "Mensa & Servizi" },
    { name: "Info borsa di studio",     name_en: "Scholarship info",        url: "https://www.dsu.toscana.it/borsa-di-studio", category: "Mensa & Servizi" },
    { name: "Info posto alloggio",      name_en: "Housing info",            url: "https://www.dsu.toscana.it/posto-alloggio", category: "Mensa & Servizi" },

    // ── Community ──
    { name: "Community Telegram",                           name_en: "Telegram Community",                          url: "https://t.me/+6mN2nZaSPtcyM2I0", category: "Community" },
    { name: "Gruppo WhatsApp 1º Anno",                      name_en: "WhatsApp Group 1st Year",                     url: "https://chat.whatsapp.com/BT3OUD6YQKK5OX4uHXo9Vk", category: "Community" },
    { name: "Gruppo WhatsApp 2º Anno",                      name_en: "WhatsApp Group 2nd Year",                     url: "https://chat.whatsapp.com/CYcHWJHMqMg4zq1POUrpPK", category: "Community" },
    { name: "Gruppo WhatsApp 3º Anno",                      name_en: "WhatsApp Group 3rd Year",                     url: "https://chat.whatsapp.com/Gru75fkLIsN0wUaJwvfl0P", category: "Community" },
    { name: "Gruppo WhatsApp Magistrale (link non disponibile)", name_en: "WhatsApp Master's Group (link unavailable)", url: "", category: "Community" },

    // ── Convenzioni & Sconti ──
    { name: "Notion",                           name_en: "Notion",                          url: "https://www.notion.com/product/notion-for-education", category: "Convenzioni & Sconti" },
    { name: "Figma",                            name_en: "Figma",                           url: "https://www.figma.com/it-it/education/", category: "Convenzioni & Sconti" },
    { name: "Autodesk Suite",                   name_en: "Autodesk Suite",                  url: "https://www.autodesk.com/it/education/edu-software/overview", category: "Convenzioni & Sconti" },
    { name: "Espresso (The Economist Student)", name_en: "Espresso (The Economist Student)",url: "https://subscribenow.economist.com/student", category: "Convenzioni & Sconti" },
    { name: "UNiDAYS",                          name_en: "UNiDAYS",                         url: "https://www.myunidays.com/", category: "Convenzioni & Sconti" },
    { name: "UniversityBox",                    name_en: "UniversityBox",                   url: "https://www.universitybox.com/", category: "Convenzioni & Sconti" },
    { name: "Framer",                           name_en: "Framer",                          url: "https://www.framer.com/students/", category: "Convenzioni & Sconti" },
    { name: "Whimsical",                        name_en: "Whimsical",                       url: "https://help.whimsical.com/billing/pricing#discounts", category: "Convenzioni & Sconti" },
    { name: "Craft",                            name_en: "Craft",                           url: "https://www.craft.do/it/education", category: "Convenzioni & Sconti" },
    { name: "Sketch",                           name_en: "Sketch",                          url: "https://www.sketch.com/education/", category: "Convenzioni & Sconti" },
    { name: "GitHub Student Developer Pack",    name_en: "GitHub Student Developer Pack",   url: "https://education.github.com/pack", category: "Convenzioni & Sconti" },
    { name: "Convenzioni di ateneo",            name_en: "University agreements & discounts",url: "https://www.unipi.it/campus-e-servizi/opportunita-e-tempo-libero/convenzioni-di-ateneo-gli-sconti-per-studenti/", category: "Convenzioni & Sconti" },
    { name: "Adobe Creative Cloud Studenti",    name_en: "Adobe Creative Cloud Students",   url: "https://www.adobe.com/it/creativecloud/buy/students.html", category: "Convenzioni & Sconti" },

    // ── Consigli & Altro ──
    { name: "Reddit r/universitaly",name_en: "Reddit r/universitaly",   url: "https://www.reddit.com/r/Universitaly/", category: "Consigli & Altro" },
    { name: "Fotocopie",            name_en: "Print shop",               url: "https://print.copyboom.it/", category: "Consigli & Altro" },
    { name: "Quizlet",              name_en: "Quizlet",                  url: "https://www.quizlet.com", category: "Consigli & Altro" }
];

let openInNewTab = false;
let activeCategory = null;

const categoryDefinitions = [
    { title: 'Didattica & Carriera', title_en: 'Academics & Career',    icon: 'assets/grad.webp' },
    { title: 'Mappe & Logistica',    title_en: 'Maps & Logistics',       icon: 'assets/map.webp' },
    { title: 'Software',             title_en: 'Software',               icon: 'assets/other.webp' },
    { title: 'Mensa & Servizi',      title_en: 'Canteen & Services',     icon: 'assets/canteen.webp' },
    { title: 'Community',            title_en: 'Community',              icon: 'assets/social.webp' },
    { title: 'Convenzioni & Sconti', title_en: 'Deals & Discounts',      icon: 'assets/discount.webp' },
    { title: 'Consigli & Altro',     title_en: 'Tips & More',            icon: 'assets/bulb.webp' }
];

function getSearchQuery() {
    return (window.currentSearchQuery || '').trim();
}

function getCurrentAcademicYearValue() {
    const now = new Date();
    const year = now.getFullYear();
    return String(now.getMonth() >= 6 ? year : year - 1);
}

function buildSearchAssistActions(rawQuery) {
    const query = rawQuery.trim();
    const academicYear = getCurrentAcademicYearValue();

    const i18n = window.BussolaI18n || { t: k => k };
    return [
        {
            label: i18n.t('links_action_subject'),
            icon: 'ri-book-open-line',
            type: 'link',
            href: `https://esami.unipi.it/elencoappelli.php?from=sappelli&docente=&insegnamento=${encodeURIComponent(query)}&cds=&cerca=`
        },
        {
            label: i18n.t('links_action_prof_val'),
            icon: 'ri-user-search-line',
            type: 'link',
            href: `https://esami.unipi.it/elencoappelli.php?from=sappelli&docente=${encodeURIComponent(query)}&insegnamento=&cds=&cerca=`
        },
        {
            label: i18n.t('links_action_programme'),
            icon: 'ri-file-list-3-line',
            type: 'copy-link',
            href: `https://unipi.coursecatalogue.cineca.it/corsi/${encodeURIComponent(academicYear)}`,
            copyText: query,
            copyLabel: i18n.t('links_copy_query')
        },
        {
            label: i18n.t('links_action_prof_cat'),
            icon: 'ri-graduation-cap-line',
            type: 'copy-link',
            href: 'https://unipi.coursecatalogue.cineca.it/ricercaDocenti',
            copyText: query,
            copyLabel: i18n.t('links_copy_name')
        },
        {
            label: i18n.t('links_action_prof_map'),
            icon: 'ri-team-line',
            type: 'copy-link',
            action: 'https://unimap.unipi.it/cercapersone/cercapersone.php',
            href: 'https://unimap.unipi.it/cercapersone/cercapersone.php',
            copyText: query,
            copyLabel: i18n.t('links_copy_surname')
        },
        {
            label: i18n.t('links_action_book'),
            icon: 'ri-book-shelf-line',
            type: 'link',
            href: `https://onesearch.unipi.it/discovery/search?vid=39SBART_UPI:39UPI_V2&query=any,contains,${encodeURIComponent(query)}`
        }
    ];
}

async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
}

async function submitExternalSearch(action) {
    if (action.type === 'link') {
        window.open(action.href, '_blank', 'noopener,noreferrer');
        return;
    }

    if (action.type === 'copy-link') {
        const copied = await copyTextToClipboard(action.copyText || '');
        window.open(action.href, '_blank', 'noopener,noreferrer');
        showToast(copied ? action.copyLabel || 'Testo copiato negli appunti' : 'Pagina aperta. Copia la query manualmente.');
        return;
    }

    const form = document.createElement('form');
    form.method = action.method || 'post';
    form.action = action.action;
    form.style.display = 'none';

    form.target = '_blank';
    form.rel = 'noopener noreferrer';

    Object.entries(action.fields || {}).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

function renderSearchAssist(query) {
    const wrapper = document.createElement('section');
    wrapper.className = 'search-assist-rail fade-in-card visible';

    const header = document.createElement('div');
    header.className = 'search-assist-rail-header';

    const i18n = window.BussolaI18n || { t: k => k };

    const title = document.createElement('p');
    title.className = 'search-assist-rail-title';
    title.textContent = i18n.t('links_external_title');

    const description = document.createElement('p');
    description.className = 'search-assist-rail-description';
    description.append(i18n.t('links_external_desc') + ' ');
    const queryHighlight = document.createElement('strong');
    queryHighlight.textContent = query;
    description.appendChild(queryHighlight);
    description.append('.');

    header.appendChild(title);
    header.appendChild(description);

    const actions = document.createElement('div');
    actions.className = 'search-assist-carousel';

    buildSearchAssistActions(query).forEach(action => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'search-assist-chip';
        button.innerHTML = `
            <i class="${action.icon}"></i>
            <span>${action.label}</span>
            <i class="ri-arrow-right-up-line search-assist-chip-arrow"></i>
        `;
        button.addEventListener('click', () => submitExternalSearch(action));
        actions.appendChild(button);
    });

    wrapper.appendChild(header);
    wrapper.appendChild(actions);

    return wrapper;
}

function getIcon(name) {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('whatsapp')) return 'ri-whatsapp-line';
    if (lowerName.includes('telegram')) return 'ri-telegram-line';
    if (lowerName.includes('instagram')) return 'ri-instagram-line';
    if (lowerName.includes('reddit')) return 'ri-reddit-line';
    if (lowerName.includes('github')) return 'ri-github-line';
    if (lowerName.includes('google drive')) return 'ri-drive-line';
    if (lowerName.includes('onedrive')) return 'ri-cloud-line';
    if (lowerName.includes('microsoft') || lowerName.includes('office')) return 'ri-microsoft-line';
    if (lowerName.includes('android') || lowerName.includes('google play')) return 'ri-google-play-line';
    if (lowerName.includes('apple') || lowerName.includes('(ios)')) return 'ri-apple-line';
    if (lowerName.includes('maps') || lowerName.includes('mappa')) return 'ri-map-2-line';
    if (lowerName.includes('chiosco')) return 'ri-store-2-line';
    if (lowerName.includes('bus') || lowerName.includes('trasporti')) return 'ri-bus-line';
    if (lowerName.includes('mail') || lowerName.includes('outlook')) return 'ri-mail-line';
    if (lowerName.includes('calendario') || lowerName.includes('orario')) return 'ri-calendar-event-line';
    if (lowerName.includes('esame') || lowerName.includes('appelli')) return 'ri-pass-valid-line';
    if (lowerName.includes('libretto')) return 'ri-book-read-line';
    if (lowerName.includes('carta dello studente')) return 'ri-pass-pending-line';
    if (lowerName.includes('alice') || lowerName.includes('portale')) return 'ri-user-smile-line';
    if (lowerName.includes('mensa') || lowerName.includes('ristorazione')) return 'ri-restaurant-line';

    if (lowerName.includes('bibliotecario')) return 'ri-book-shelf-line';
    if (lowerName.includes('ricarica')) return 'ri-wallet-3-line';
    if (lowerName.includes('cerca')) return 'ri-menu-search-line';
    if (lowerName.includes('biblioteca')) return 'ri-book-open-line';
    if (lowerName.includes('medico')) return 'ri-stethoscope-line';
    if (lowerName.includes('aule')) return 'ri-building-line';
    if (lowerName.includes('sondaggi')) return 'ri-survey-line';
    if (lowerName.includes('registro')) return 'ri-list-check';
    if (lowerName.includes('insegnamenti')) return 'ri-list-check-3';
    if (lowerName.includes('notion')) return 'ri-sticky-note-line';
    if (lowerName.includes('figma') || lowerName.includes('sketch') || lowerName.includes('framer') || lowerName.includes('adobe') || lowerName.includes('affinity')) return 'ri-pen-nib-line';

    if (lowerName.includes('quizlet')) return 'ri-brain-line';
    if (lowerName.includes('autodesk')) return 'ri-box-3-line';
    if (lowerName.includes('guida')) return 'ri-compass-line';
    if (lowerName.includes('fotocopie')) return 'ri-printer-line';
    if (lowerName.includes('unidays')) return 'ri-coupon-2-line';
    if (lowerName.includes('espresso')) return 'ri-newspaper-line';
    if (lowerName.includes('whim')) return 'ri-pencil-ruler-line';
    if (lowerName.includes('convenzioni')) return 'ri-service-line';
    if (lowerName.includes('tasse') || lowerName.includes('fatture') || lowerName.includes('borsa')) return 'ri-money-euro-circle-line';
    if (lowerName.includes('craft')) return 'ri-file-4-line';

    if (lowerName.includes('certificati')) return 'ri-file-paper-2-line';
    if (lowerName.includes('laurea') || lowerName.includes('titolo')) return 'ri-graduation-cap-line';
    if (lowerName.includes('anagrafica')) return 'ri-id-card-line';
    if (lowerName.includes('proroga')) return 'ri-timer-line';
    if (lowerName.includes('le tue lezioni')) return 'ri-presentation-line';
    if (lowerName.includes('le tue iscrizioni')) return 'ri-contract-line';
    if (lowerName.includes('ammissione')) return 'ri-file-check-line';
    if (lowerName.includes('universitybox')) return 'ri-discount-percent-line';
    if (lowerName.includes('piano')) return 'ri-list-indefinite';
    if (lowerName.includes('alloggio')) return 'ri-home-4-line';

    return 'ri-link';
}

function renderChips() {
    const container = document.getElementById('filter-chips');
    if (!container) return;

    container.innerHTML = '';

    const createChip = (id, label) => {
        const chip = document.createElement('div');
        chip.className = `filter-chip ${activeCategory === id ? 'active' : ''}`;
        chip.textContent = label;
        chip.addEventListener('click', () => {
            if (activeCategory === id) {
                activeCategory = null;
            } else {
                activeCategory = id;
            }
            renderChips();
            renderLinks();
        });
        return chip;
    };

    const i18n = window.BussolaI18n || { t: k => k, getLang: () => 'it' };
    const lang = i18n.getLang();
    container.appendChild(createChip('Principali', i18n.t('links_principali')));
    categoryDefinitions.forEach(def => {
        const label = (lang === 'en' && def.title_en) ? def.title_en : def.title;
        container.appendChild(createChip(def.title, label));
    });
}

function renderLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = '';

    const rawQuery = getSearchQuery();
    const query = rawQuery.toLowerCase();

    const isSearchActive = rawQuery.length > 0;
    const isSearchFocused = document.activeElement === document.getElementById('search-input');

    const chipsContainer = document.getElementById('filter-chips');
    if (chipsContainer) {
        if (isSearchActive || isSearchFocused) {
            chipsContainer.style.display = 'none';
        } else {
            chipsContainer.style.display = 'flex';
        }
    }

    const i18n = window.BussolaI18n || { t: k => k, getLang: () => 'it' };
    const lang = i18n.getLang();

    const primaryLinks = [];
    const groupedLinks = {};

    if (rawQuery) {
        container.appendChild(renderSearchAssist(rawQuery));
    }

    categoryDefinitions.forEach(def => {
        groupedLinks[def.title] = [];
    });
    groupedLinks['Altro'] = [];

    resources.forEach(link => {
        if (query) {
            const matchIT = link.name.toLowerCase().includes(query);
            const matchEN = link.name_en ? link.name_en.toLowerCase().includes(query) : false;
            if (!matchIT && !matchEN) return;
        }

        if (link.section === 'primary') {
            primaryLinks.push(link);
        } else if (link.category && groupedLinks[link.category]) {
            groupedLinks[link.category].push(link);
        } else {
            groupedLinks['Altro'].push(link);
        }
    });

    if (primaryLinks.length > 0 && (isSearchActive || isSearchFocused || activeCategory === null || activeCategory === "Principali")) {
        const section = document.createElement('div');
        section.className = 'links-primary';
        primaryLinks.forEach(link => {
            const card = document.createElement('a');
            card.href = link.url;
            card.className = 'card-primary fade-in-card';
            card.target = openInNewTab ? '_blank' : '_self';
            const displayName     = (lang === 'en' && link.name_en)     ? link.name_en     : link.name;
            const displaySubtitle = (lang === 'en' && link.subtitle_en) ? link.subtitle_en : link.subtitle;
            card.innerHTML = `
                <i class="${getIcon(link.name)} icon"></i>
                <div class="card-content" style="display: flex; flex-direction: column;">
                    <span class="title">${displayName}</span>
                    ${displaySubtitle ? `<span class="subtitle" style="font-size: 0.8rem; opacity: 0.7; margin-top: 0.2rem; font-weight: 400;">${displaySubtitle}</span>` : ''}
                </div>
            `;
            section.appendChild(card);
        });
        container.appendChild(section);
    }

    categoryDefinitions.forEach(def => {
        const categoryTitle = def.title;
        const links = groupedLinks[categoryTitle];

        if (links && links.length > 0 && (isSearchActive || isSearchFocused || activeCategory === null || activeCategory === categoryTitle)) {
            const displayCat = (lang === 'en' && def.title_en) ? def.title_en : def.title;
            const title = document.createElement('h2');
            title.className = 'section-title';
            title.innerHTML = `<img src="${def.icon}" class="section-icon-img" alt=""> ${displayCat}`;
            container.appendChild(title);

            const section = document.createElement('div');
            section.className = 'links-tertiary';

            links.forEach(link => {
                const card = document.createElement('a');
                card.href = link.url;
                card.className = 'card-tertiary fade-in-card';
                card.target = openInNewTab ? '_blank' : '_self';
                if (link.url === '#' || link.url === '') {
                    card.classList.add('disabled');
                    card.removeAttribute('href');
                }
                const displayName     = (lang === 'en' && link.name_en)     ? link.name_en     : link.name;
                const displaySubtitle = (lang === 'en' && link.subtitle_en) ? link.subtitle_en : link.subtitle;
                card.innerHTML = `
                    <i class="${getIcon(link.name)} icon"></i>
                    <div class="card-content" style="display: flex; flex-direction: column;">
                        <span class="title">${displayName}</span>
                        ${displaySubtitle ? `<span class="subtitle" style="font-size: 0.8rem; opacity: 0.7; margin-top: 0.2rem; font-weight: 400;">${displaySubtitle}</span>` : ''}
                    </div>
                `;
                section.appendChild(card);
            });
            container.appendChild(section);
        }
    });

    const allListsEmpty = Object.values(groupedLinks).every(arr => arr.length === 0);
    if (primaryLinks.length === 0 && allListsEmpty) {
        const emptyState = document.createElement('p');
        emptyState.className = 'search-empty-state';
        emptyState.textContent = i18n.t('links_empty');
        container.appendChild(emptyState);
    }

    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-card:not(.visible)').forEach(card => {
            observer.observe(card);
        });
    }, 50);
}

function showToast(message) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('links-container');
    if (!container) console.error("CRITICAL: 'links-container' not found!");

    renderChips();
    renderLinks();

    const totalLinks = document.getElementById('total-links');
    if (totalLinks) {
        const i18n = window.BussolaI18n || { t: k => k };
        const fn = i18n.DICT ? (i18n.DICT[i18n.getLang()] || i18n.DICT['it']) : null;
        const totalFn = fn && fn.links_total;
        totalLinks.textContent = typeof totalFn === 'function' ? totalFn(resources.length) : `${resources.length} link`;
    }

    const searchInput = document.getElementById('search-input');
    const header = document.querySelector('header');

    if (searchInput) {
        const clearBtn = document.getElementById('search-clear');
        searchInput.addEventListener('focus', () => renderLinks());
        searchInput.addEventListener('blur', () => setTimeout(renderLinks, 100)); // Delay to allow click on links if clicked during blur

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            window.currentSearchQuery = query;

            if (clearBtn) {
                if (query.length > 0) {
                    clearBtn.classList.add('visible');
                } else {
                    clearBtn.classList.remove('visible');
                }
            }

            renderLinks();
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                clearBtn.classList.remove('visible');
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }

    }

    const tabToggle = document.getElementById('new-tab-toggle');
    if (tabToggle) {
        tabToggle.checked = openInNewTab;
        tabToggle.addEventListener('change', (e) => {
            openInNewTab = e.target.checked;
            renderLinks();
            // Optional: can keep a subtle toast, or just let the toggle be the UI feedback
        });
    }

    document.addEventListener('keydown', (e) => {
        const arrowKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
        if (!arrowKeys.includes(e.key) && e.key !== 'Escape') return;

        const focusableElements = Array.from(document.querySelectorAll('a, button, input')).filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
        });

        let currentFocus = document.activeElement;
        let currentIndex = focusableElements.indexOf(currentFocus);

        if (currentIndex === -1) {
            if (arrowKeys.includes(e.key)) {
                e.preventDefault();
                const firstLink = document.querySelector('.card-primary, #search-input');
                if (firstLink) firstLink.focus();
            }
            return;
        }

        if (arrowKeys.includes(e.key)) e.preventDefault();

        const currentPos = currentFocus.getBoundingClientRect();
        let nextIndex = -1;

        switch (e.key) {
            case 'ArrowRight':
                nextIndex = (currentIndex + 1) % focusableElements.length;
                break;
            case 'ArrowLeft':
                nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
                break;
            case 'ArrowDown':
                nextIndex = findNearestElement(focusableElements, currentPos, 'down');
                if (nextIndex === -1) nextIndex = (currentIndex + 1) % focusableElements.length;
                break;
            case 'ArrowUp':
                nextIndex = findNearestElement(focusableElements, currentPos, 'up');
                if (nextIndex === -1) nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
                break;
            case 'Escape':
                if (currentFocus === searchInput) {
                    searchInput.blur();
                }
                break;
        }

        if (nextIndex !== -1) {
            const nextEl = focusableElements[nextIndex];
            nextEl.focus();

            nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }
    });

    function findNearestElement(elements, currentPos, direction) {
        let bestIndex = -1;
        let minDistance = Infinity;

        elements.forEach((el, index) => {
            if (el === document.activeElement) return;
            const pos = el.getBoundingClientRect();

            if (direction === 'down' && pos.top >= currentPos.bottom - 5) {
                const dist = Math.sqrt(Math.pow(pos.left - currentPos.left, 2) + Math.pow(pos.top - currentPos.top, 2));
                if (dist < minDistance) {
                    minDistance = dist;
                    bestIndex = index;
                }
            } else if (direction === 'up' && pos.bottom <= currentPos.top + 5) {
                const dist = Math.sqrt(Math.pow(pos.left - currentPos.left, 2) + Math.pow(pos.top - currentPos.top, 2));
                if (dist < minDistance) {
                    minDistance = dist;
                    bestIndex = index;
                }
            }
        });
        return bestIndex;
    }

    window.addEventListener('scroll', () => {
        const scrollBtn = document.querySelector('.scroll-buttons');
        if (!scrollBtn) return;
        if (window.scrollY > 200) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    window.dispatchEvent(new Event('scroll'));
});
