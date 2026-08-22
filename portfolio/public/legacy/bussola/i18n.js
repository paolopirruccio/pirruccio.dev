/**
 * i18n.js — La Bussola di InfoUma
 * Traduzione IT/EN centralizzata per tutte le pagine.
 * Includere dopo theme.js in ogni pagina.
 */
(function () {
    const DICT = {
        it: {
            /* ── Lezioni ── */
            lezioni_h1:               'Cerca Lezioni',
            lezioni_desc:             'Cerca lezioni di oggi e dei prossimi giorni al polo Fibonacci.',
            lezioni_placeholder:      'Cerca lezione per nome o professore...',
            lezioni_tomorrow:         'Domani',
            lezioni_today_btn:        'Oggi',
            lezioni_total_label:      'Lezioni trovate:',
            lezioni_typing_title:     'Continua a digitare...',
            lezioni_typing_hint:      'Inserisci almeno 3 caratteri per iniziare la ricerca.',
            lezioni_loading:          'Caricamento lezioni in corso...',
            lezioni_error_title:      'Servizio Cineca non disponibile',
            lezioni_error_desc:       "I server dell'università (Cineca) non rispondono o sono in manutenzione. Riprova tra qualche minuto.",
            lezioni_retry:            'Riprova ora',
            lezioni_none_title:       'Nessuna lezione trovata',
            lezioni_none_hint:        'Prova con un altro nome di corso, professore o aula.',
            lezioni_today_prefix:     'Oggi, ',
            lezioni_room_tbd:         'Aula da definire',
            lezioni_unknown:          'Corso Sconosciuto',
            week_from:                'Dal',
            week_to:                  'al',
            /* ── Aule ── */
            aule_h1:                  'Cerca Aule',
            aule_desc:                "Trova un'aula libera, controlla che lezione c'è e quando finisce al Polo Fibonacci.",
            aule_placeholder:         'Cerca aule del Fibonacci...',
            aule_tomorrow:            'Domani',
            aule_today_btn:           'Oggi',
            aule_free_label:          'Aule libere:',
            aule_sync:                'Sinc. Cineca UP',
            aule_favorites:           'Preferiti',
            aule_fav_add:             'Aggiungi ai preferiti',
            aule_fav_remove:          'Rimuovi dai preferiti',
            aule_all_buildings:       'Tutti gli Edifici',
            aule_all_floors:          'Tutti i piani',
            aule_floor:               'Piano',
            aule_polo_closed_title:   'Polo Chiuso',
            aule_polo_closed_desc:    'Il polo è aperto dal lunedì al venerdì, dalle 08:00 alle 19:30.',
            aule_error_title:         'Servizio Cineca non disponibile',
            aule_error_desc:          "I server dell'università non rispondono. L'app non può determinare quali aule siano libere in questo momento.",
            aule_retry:               'Riprova ora',
            aule_load_error:          'Impossibile caricare i dati. Controlla la connessione e ricarica la pagina.',
            aule_no_results:          'Nessun risultato disponibile.',
            aule_free_until:          'Libera fino alle',
            aule_free_until_close:    'Fino a chiusura',
            aule_free_from:           'Si libera alle',
            aule_free_in:             'Si libera tra',
            aule_remaining_under1:    'Ancora per meno di un minuto',
            aule_map_title:           'Apri mappa completa',
            aule_map_desc:            'Esplora tutte le aule e i poli su Dove UniPi.',
            /* ── FAQ ── */
            faq_h1:                   'Domande Frequenti',
            faq_desc:                 'Le risposte alle domande più frequenti su corsi di InfoUma, esami, vita universitaria e altro.',
            faq_placeholder:          'Cerca domande...',
            faq_suggest_title:        'Hai una domanda da aggiungere?',
            faq_suggest_desc:         'Aiuta i tuoi compagni suggerendo nuove domande.',
            faq_wip_title:            'In lavorazione',
            faq_wip_desc:             "Le FAQ di InfoUma sono in preparazione.\nTorneremo presto con risposte complete su corsi, esami e vita universitaria.",
            faq_wip_preview:          'Anteprima',
            faq_back_home:            'Home',
            cat_didattica:            'Didattica & Carriera',
            cat_mensa:                'Mensa & Servizi',
            cat_mappe:                'Mappe & Logistica',
            cat_rappresentanti:       'Rappresentanti',
            faq_q1: 'Come posso iscrivermi agli esami?',
            faq_a1: 'Le iscrizioni si effettuano tramite il portale esami.unipi.it. Ricorda di controllare le date di apertura e chiusura delle iscrizioni.',
            faq_q2: "Dove trovo l'orario delle lezioni?",
            faq_a2: 'L\'orario è disponibile sul portale Agenda Didattica o tramite il link "Il mio calendario lezioni" nella home page.',
            faq_q3: 'Chi posso contattare per problemi amministrativi?',
            faq_a3: "Per problemi relativi alla carriera, contatta la Segreteria Studenti. Per questioni didattiche, rivolgiti all'Unità Didattica del dipartimento.",
            faq_q4: 'Come accedo alla posta universitaria?',
            faq_a4: 'Puoi accedere tramite il portale Outlook utilizzando le tue credenziali di ateneo (nome.cognome@studenti.unipi.it).',
            faq_q5: 'Dove si trovano le aule del Polo Fibonacci?',
            faq_a5: 'Il Polo Fibonacci si trova in Largo Bruno Pontecorvo 3. Puoi consultare la mappa nella sezione "Mappe & Logistica" della home.',
            rep_bachelor:             'Rappresentante Triennale',
            rep_master:               'Rappresentante Magistrale',
            faq_total:                (n) => `${n} domande frequenti`,
            /* ── Navbar ── */
            nav_home:                 'Home',
            nav_links:                'Link',
            nav_lezioni:              'Lezioni',
            nav_aule:                 'Aule',
            nav_faq:                  'FAQ',
            /* ── Link ── */
            links_h1:                 'Link Utili',
            links_desc:               'Tutti i link ai servizi di Informatica Umanistica, raccolti in un unico posto.',
            links_search:             'Cerca link...',
            links_new_tab:            'Apri in nuova pagina',
            links_suggest_title:      'Hai un link da suggerire?',
            links_suggest_desc:       'Contribuisci a rendere la Bussola più completa inviando i tuoi suggerimenti.',
            links_external_title:     'Ricerche esterne',
            links_external_desc:      'Apri subito una ricerca per',
            links_empty:              'Nessun link trovato.',
            links_total:              (n) => `${n} link indicizzati`,
            links_principali:         'Principali',
            links_action_subject:     'Cerca materia su Valutami',
            links_action_prof_val:    'Cerca prof su Valutami',
            links_action_programme:   'Cerca programma su Course Catalogue',
            links_action_prof_cat:    'Cerca prof su Course Catalogue',
            links_action_prof_map:    'Cerca prof su Unimap',
            links_action_book:        'Cerca libro nelle biblioteche',
            links_copy_query:         'Query copiata: incollala nella ricerca di Course Catalogue',
            links_copy_name:          'Nome copiato: incollalo nella ricerca docenti di Course Catalogue',
            links_copy_surname:       'Cognome copiato: incollalo nella ricerca di UniMap',
            /* ── Comune ── */
            report_bug:               'Segnala un bug',
            footer_brand:             'La Bussola di InfoUma',
            footer_disclaimer:        "Le informazioni riportate potrebbero essere inesatte.\nNon affiliato all'Università di Pisa o a Cineca.",
        },
        en: {
            /* ── Lezioni ── */
            lezioni_h1:               'Find Lectures',
            lezioni_desc:             'Search today\'s and upcoming lectures at Polo Fibonacci.',
            lezioni_placeholder:      'Search by course name or professor...',
            lezioni_tomorrow:         'Tomorrow',
            lezioni_today_btn:        'Today',
            lezioni_total_label:      'Lectures found:',
            lezioni_typing_title:     'Keep typing...',
            lezioni_typing_hint:      'Enter at least 3 characters to start searching.',
            lezioni_loading:          'Loading lectures...',
            lezioni_error_title:      'Cineca service unavailable',
            lezioni_error_desc:       'The university servers (Cineca) are not responding or are under maintenance. Please try again in a few minutes.',
            lezioni_retry:            'Try again',
            lezioni_none_title:       'No lectures found',
            lezioni_none_hint:        'Try a different course name, professor, or room.',
            lezioni_today_prefix:     'Today, ',
            lezioni_room_tbd:         'Room TBD',
            lezioni_unknown:          'Unknown Course',
            week_from:                'From',
            week_to:                  'to',
            /* ── Aule ── */
            aule_h1:                  'Find Rooms',
            aule_desc:                'Find a free room, check what lecture is on and when it ends at Polo Fibonacci.',
            aule_placeholder:         'Search rooms at Fibonacci...',
            aule_tomorrow:            'Tomorrow',
            aule_today_btn:           'Today',
            aule_free_label:          'Free rooms:',
            aule_sync:                'Sync. Cineca UP',
            aule_favorites:           'Favourites',
            aule_fav_add:             'Add to favourites',
            aule_fav_remove:          'Remove from favourites',
            aule_all_buildings:       'All Buildings',
            aule_all_floors:          'All Floors',
            aule_floor:               'Floor',
            aule_polo_closed_title:   'Building Closed',
            aule_polo_closed_desc:    'The building is open Monday to Friday, from 08:00 to 19:30.',
            aule_error_title:         'Cineca service unavailable',
            aule_error_desc:          'The university servers are not responding. The app cannot determine which rooms are free right now.',
            aule_retry:               'Try again',
            aule_load_error:          'Failed to load data. Check your connection and reload the page.',
            aule_no_results:          'No results available.',
            aule_free_until:          'Free until',
            aule_free_until_close:    'Until closing',
            aule_free_from:           'Free from',
            aule_free_in:             'Free in',
            aule_remaining_under1:    'Less than a minute left',
            aule_map_title:           'Open full map',
            aule_map_desc:            'Explore all rooms and buildings on Dove UniPi.',
            /* ── FAQ ── */
            faq_h1:                   'Frequently Asked Questions',
            faq_desc:                 'Answers to the most common questions about InfoUma courses, exams, university life and more.',
            faq_placeholder:          'Search questions...',
            faq_suggest_title:        'Have a question to add?',
            faq_suggest_desc:         'Help your peers by suggesting new questions.',
            faq_wip_title:            'Work in progress',
            faq_wip_desc:             "The InfoUma FAQ section is under preparation.\nWe'll be back soon with complete answers about courses, exams and university life.",
            faq_wip_preview:          'Preview',
            faq_back_home:            'Home',
            cat_didattica:            'Academics & Career',
            cat_mensa:                'Canteen & Services',
            cat_mappe:                'Maps & Logistics',
            cat_rappresentanti:       'Student Representatives',
            faq_q1: 'How do I register for exams?',
            faq_a1: 'Registrations are done through the esami.unipi.it portal. Remember to check the opening and closing dates for registrations.',
            faq_q2: 'Where can I find the lecture schedule?',
            faq_a2: 'The schedule is available on the Agenda Didattica portal or through the "My lecture calendar" link on the home page.',
            faq_q3: 'Who can I contact for administrative issues?',
            faq_a3: "For career-related issues, contact the Student Secretariat. For academic matters, contact the Department's Teaching Unit.",
            faq_q4: 'How do I access my university email?',
            faq_a4: 'You can access it through the Outlook portal using your university credentials (nome.cognome@studenti.unipi.it).',
            faq_q5: 'Where are the classrooms at Polo Fibonacci?',
            faq_a5: 'Polo Fibonacci is located in Largo Bruno Pontecorvo 3. You can check the map in the "Maps & Logistics" section of the home page.',
            rep_bachelor:             'Undergraduate Representative',
            rep_master:               'Graduate Representative',
            faq_total:                (n) => `${n} frequently asked questions`,
            /* ── Navbar ── */
            nav_home:                 'Home',
            nav_links:                'Links',
            nav_lezioni:              'Lectures',
            nav_aule:                 'Rooms',
            nav_faq:                  'FAQ',
            /* ── Link ── */
            links_h1:                 'Useful Links',
            links_desc:               'All links to Informatica Umanistica services, collected in one place.',
            links_search:             'Search links...',
            links_new_tab:            'Open in new tab',
            links_suggest_title:      'Have a link to suggest?',
            links_suggest_desc:       'Help make the Bussola more complete by sending your suggestions.',
            links_external_title:     'External searches',
            links_external_desc:      'Open a search for',
            links_empty:              'No links found.',
            links_total:              (n) => `${n} indexed links`,
            links_principali:         'Main',
            links_action_subject:     'Search subject on Valutami',
            links_action_prof_val:    'Search professor on Valutami',
            links_action_programme:   'Search programme on Course Catalogue',
            links_action_prof_cat:    'Search professor on Course Catalogue',
            links_action_prof_map:    'Search professor on Unimap',
            links_action_book:        'Search books in the library',
            links_copy_query:         'Query copied: paste it in the Course Catalogue search',
            links_copy_name:          'Name copied: paste it in the Course Catalogue professor search',
            links_copy_surname:       'Surname copied: paste it in the UniMap search',
            /* ── Comune ── */
            report_bug:               'Report a bug',
            footer_brand:             'La Bussola di InfoUma',
            footer_disclaimer:        "Information provided may be inaccurate.\nNot affiliated with the University of Pisa or Cineca.",
        }
    };

    function getLang() {
        return localStorage.getItem('bussola_lang') || 'it';
    }

    function t(key) {
        const lang = getLang();
        const val = (DICT[lang] || {})[key];
        if (val !== undefined) return val;
        return (DICT['it'] || {})[key] || key;
    }

    /**
     * Applies translations to all [data-i18n] elements on the page.
     * For <input> elements sets .placeholder; for others sets .textContent.
     */
    function applyDataI18n(lang) {
        document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'it');
        const dict = DICT[lang] || DICT['it'];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const val = dict[key];
            if (val === undefined || typeof val !== 'string') return;
            if (el.tagName === 'INPUT') {
                el.placeholder = val;
            } else {
                el.textContent = val;
            }
        });
    }

    /**
     * Picks the best course name from dettagliDidattici based on current lang.
     * Cineca returns multiple entries — tries to match 'en'/'it' via linguaId field.
     */
    function getCourseName(evento) {
        const lang = getLang();
        const dettagli = evento?.dettagliDidattici || [];
        if (dettagli.length === 0) {
            return evento?.tipoAttivita?.descrizione || t('lezioni_unknown');
        }
        if (lang === 'en' && dettagli.length > 1) {
            const enEntry = dettagli.find(d => {
                const lid = (d.linguaId || d.lingua || d.codiceLinqua || '').toLowerCase();
                return lid.includes('en') || lid === '2'; // Cineca sometimes uses numeric IDs
            });
            if (enEntry?.nome) return enEntry.nome;
        }
        return dettagli[0]?.nome || evento?.tipoAttivita?.descrizione || t('lezioni_unknown');
    }

    window.BussolaI18n = { t, getLang, applyDataI18n, getCourseName, DICT };
})();
