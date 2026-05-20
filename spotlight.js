(function () {
    const externalLinkAttrs = (url, download) => {
        if (download) return `download="${download}"`;
        const isExternal = url.startsWith('http') || url.startsWith('mailto');
        return isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
    };

    const t = (key) => {
        const lang = localStorage.getItem('preferredLanguage') || 'it';
        return (translations && translations[lang] && translations[lang][key]) || key;
    };

    const HIDDEN_APPS = ['blog', 'library', 'gym', 'desktop', 'uscite', 'sara'];
    const SEARCH_ITEMS = [
        ...PORTFOLIO_APPS.filter(app => !HIDDEN_APPS.includes(app.id)).map(app => ({
            title: app.title,
            sub: app.sub,
            icon: app.icon,
            color: app.spotlightColor || app.color || '#333',
            url: app.url,
            download: app.download
        })),
        { title: 'Bussola UniPi', sub: 'Link Utili', icon: 'fa-solid fa-compass', color: '#ca8a04', url: 'bussola/index.html' }
    ];

    const overlay = document.getElementById('spotlight-overlay');
    const backdrop = document.getElementById('spotlight-backdrop');
    const input = document.getElementById('spotlight-input');
    const inputWrap = input.closest('.spotlight-input-wrap');
    const results = document.getElementById('spotlight-results');
    const searchBtn = document.getElementById('search-btn');
    const langBtn = document.getElementById('lang-btn');
    let activeIndex = -1;
    let currentFiltered = [...SEARCH_ITEMS];
    let unipiMode = false;
    let botMode = false;
    let hiddenMode = false;

    const UNIPI_ITEMS = [
        { title: 'Portale Studenti (Alice)', sub: 'Carriera', color: '#0070BA', icon: 'fa-solid fa-user', url: 'https://www.studenti.unipi.it/Home.do' },
        { title: 'Libretto UniPi', sub: 'Carriera', color: '#0070BA', icon: 'fa-solid fa-book', url: 'https://libretto.unipi.it/' },
        { title: 'Le tue lezioni', sub: 'Agenda', color: '#5856D6', icon: 'fa-solid fa-chalkboard-user', url: 'https://agendadidattica.unipi.it/Prod/Home/Classes' },
        { title: 'Calendario lezioni', sub: 'Agenda', color: '#5856D6', icon: 'fa-solid fa-calendar-days', url: 'https://agendadidattica.unipi.it/Prod/Home/Calendar' },
        { title: 'La tua mail', sub: 'Outlook', color: '#0078D4', icon: 'fa-solid fa-envelope', url: 'https://outlook.com/' },
        { title: 'Iscriviti a un esame', sub: 'Carriera', color: '#34C759', icon: 'fa-solid fa-file-pen', url: 'https://esami.unipi.it/elencoappelli.php' },
        { title: 'Sito Ufficiale IU Triennale', sub: 'Didattica', color: '#007AFF', icon: 'fa-solid fa-graduation-cap', url: 'https://www.fileli.unipi.it/informatica-umanistica/' },
        { title: 'Sito Ufficiale IU Magistrale', sub: 'Didattica', color: '#007AFF', icon: 'fa-solid fa-graduation-cap', url: 'https://www.fileli.unipi.it/informatica-umanistica-lm/' },
        { title: 'Google Drive Appunti', sub: 'Didattica', color: '#FBBC04', icon: 'fa-brands fa-google-drive', url: 'https://drive.google.com/drive/folders/1-E3zn-oEyeut67agQEV5XQ4qH-pWLKAD' },
        { title: 'Sistema Bibliotecario', sub: 'Biblioteca', color: '#8E8E93', icon: 'fa-solid fa-landmark', url: 'https://www.sba.unipi.it' },
        { title: 'Onesearch Biblioteca', sub: 'Biblioteca', color: '#8E8E93', icon: 'fa-solid fa-magnifying-glass', url: 'https://onesearch.unipi.it' },
        { title: 'Cerca corso / docente', sub: 'Didattica', color: '#AF52DE', icon: 'fa-solid fa-magnifying-glass-arrow-right', url: 'https://unipi.coursecatalogue.cineca.it' },
        { title: 'Orario Pubblico Cineca', sub: 'Didattica', color: '#AF52DE', icon: 'fa-solid fa-clock', url: 'https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=6319d6a9f7245e0c5c9094e3' },
        { title: 'Aule UniPi', sub: 'Logistica', color: '#FF9500', icon: 'fa-solid fa-building', url: 'https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=63223a029f080a0aab032afc' },
        { title: 'Tasse Universitarie', sub: 'Segreteria', color: '#FF3B30', icon: 'fa-solid fa-money-bill', url: 'https://www.studenti.unipi.it/auth/studente/Tasse/ListaFatture.do' },
        { title: 'Certificati', sub: 'Segreteria', color: '#FF3B30', icon: 'fa-solid fa-file-contract', url: 'https://www.studenti.unipi.it/auth/studente/Certificati/ListaCertificati.do' },
        { title: 'Ammissione a Magistrale', sub: 'Carriera', color: '#34C759', icon: 'fa-solid fa-check-circle', url: 'https://ammissionelm.adm.unipi.it/' },
        { title: 'Mappa Polo Fibonacci', sub: 'Google Maps', color: '#34A853', icon: 'fa-solid fa-map-location-dot', url: 'https://maps.app.goo.gl/iYCT6VaziEFsiam16' },
        { title: 'Guida Fibonacci', sub: 'Logistica', color: '#FF9500', icon: 'fa-solid fa-compass', url: 'https://plumkewe.github.io/dove-unipi/?p=fibonacci' },
        { title: 'Aule studio', sub: 'Logistica', color: '#8E8E93', icon: 'fa-solid fa-chair', url: 'https://www.unipi.it/campus-e-servizi/servizi/biblioteche-e-sale-studio/' },
        { title: 'Mappe bus Pisa', sub: 'Logistica', color: '#0088CC', icon: 'fa-solid fa-bus', url: 'https://files.at-bus.it/s3fs-public/documents/AT_Pisa_110x110_web.pdf' },
        { title: 'Microsoft 365', sub: 'Software', color: '#0078D4', icon: 'fa-brands fa-microsoft', url: 'https://m365.cloud.microsoft/apps/' },
        { title: 'Figma Education', sub: 'Software', color: '#F24E1E', icon: 'fa-brands fa-figma', url: 'https://www.figma.com/it-it/education/' },
        { title: 'GitHub Student Pack', sub: 'Convenzioni', color: '#1a1a1a', icon: 'fa-brands fa-github', url: 'https://education.github.com/pack' },
        { title: 'Adobe Creative Cloud', sub: 'Convenzioni', color: '#FF0000', icon: 'fa-brands fa-adobe', url: 'https://www.adobe.com/it/creativecloud/buy/students.html' },
        { title: 'Ricarica tessera mensa', sub: 'Mensa', color: '#FF3B30', icon: 'fa-solid fa-wallet', url: 'https://ricarichiamoci.dsu.toscana.it/ricarichiamoci/index.html' },
        { title: 'Menu mensa', sub: 'Mensa', color: '#FF3B30', icon: 'fa-solid fa-utensils', url: 'https://canteen.dsutoscana.cloud/menu' },
        { title: 'Borsa di studio DSU', sub: 'Mensa & Servizi', color: '#FF9500', icon: 'fa-solid fa-hand-holding-dollar', url: 'https://www.dsu.toscana.it/borsa-di-studio' },
        { title: 'Community Telegram IU', sub: 'Community', color: '#0088CC', icon: 'fa-brands fa-telegram', url: 'https://t.me/+6mN2nZaSPtcyM2I0' },
        { title: 'Notion Education', sub: 'Convenzioni', color: '#2d2d2d', icon: 'fa-solid fa-n', url: 'https://www.notion.com/product/notion-for-education' },
        { title: 'UNiDAYS', sub: 'Convenzioni', color: '#5856D6', icon: 'fa-solid fa-tags', url: 'https://www.myunidays.com/' },
        { title: 'Quizlet', sub: 'Studio', color: '#4257B2', icon: 'fa-solid fa-brain', url: 'https://www.quizlet.com' },
        { title: 'Fotocopie', sub: 'Servizi', color: '#8E8E93', icon: 'fa-solid fa-print', url: 'https://print.copyboom.it/' },
        { title: 'La Bussola di InfoUma', sub: 'Tutti i link ->', color: '#1C1C1E', icon: 'fa-solid fa-compass', url: 'bussola/index.html' }
    ];

    function setMode(mode) {
        inputWrap.classList.remove('mode-bot', 'mode-unipi', 'mode-hidden');
        if (mode) inputWrap.classList.add(`mode-${mode}`);
    }

    function processText(text) {
        const now = new Date();
        let age = now.getFullYear() - 2001;
        if (now.getMonth() < 5 || (now.getMonth() === 5 && now.getDate() < 4)) age--;
        const appData = (typeof APP_DATA !== 'undefined') ? APP_DATA : null;
        return text
            .replace('{{AGE}}', age)
            .replace('{{TIME}}', now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }))
            .replace('{{DATE}}', now.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
            .replace('{{LAST_UPDATE}}', appData?.lastUpdate || 'N/A');
    }

    function botFindResponse(text) {
        if (typeof BotNLP !== 'undefined' && typeof APP_DATA !== 'undefined') {
            const res = BotNLP.findResponse(text, APP_DATA);
            if (res) {
                return { text: processText(res.text), action: res.action };
            }
        }
        const fallbacks = (typeof APP_DATA !== 'undefined' && APP_DATA?.fallbacks)
            ? APP_DATA.fallbacks
            : ["Non sono sicuro. Prova a chiedere 'contatti', 'social' o 'paypal'."];
        return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], action: null };
    }

    function showBotResponse(query) {
        results.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;padding:16px 14px;">
                <div style="width:38px;height:38px;border-radius:10px;background:#ca8a04;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;flex-shrink:0;">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div style="font-family:Inter,sans-serif;font-size:0.85rem;color:#999;">
                    <span class="bot-thinking">${t('spotlight_thinking')}</span><span class="bot-dots">...</span>
                </div>
            </div>`;

        setTimeout(() => {
            const response = botFindResponse(query);
            if (!response) return;

            let actionHTML = '';
            if (response.action) {
                const a = response.action;
                actionHTML = `
                    <a href="${a.url}" ${externalLinkAttrs(a.url, a.download)} class="spotlight-item" style="margin-top:6px;" onclick="setTimeout(closeSpotlight,100)">
                        <div class="spotlight-item-icon" style="background:${a.color || '#333'}"><i class="${a.icon}"></i></div>
                        <div class="spotlight-item-info">
                            <div class="spotlight-item-title">${a.title}</div>
                            <div class="spotlight-item-sub">${a.subtitle || ''}</div>
                        </div>
                        <i class="fa-solid fa-chevron-right spotlight-item-arrow"></i>
                    </a>`;
            }

            results.innerHTML = `
                <div style="padding:14px 14px 6px;display:flex;align-items:flex-start;gap:12px;">
                    <div style="width:38px;height:38px;border-radius:10px;background:#ca8a04;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;flex-shrink:0;margin-top:2px;">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div style="font-family:Inter,sans-serif;">
                        <div style="font-size:0.95rem;font-weight:600;margin-bottom:4px;">${t('spotlight_assistant')}</div>
                        <div style="font-size:0.9rem;line-height:1.5;color:var(--text-secondary,#666);">${response.text}</div>
                    </div>
                </div>
                ${actionHTML}
                <div style="padding:8px 14px 10px;">
                    <a href="ai/index.html" class="spotlight-item" style="background:rgba(202,138,4,0.05);">
                        <div class="spotlight-item-icon" style="background:#ca8a04"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                        <div class="spotlight-item-info">
                            <div class="spotlight-item-title">${t('spotlight_open_chat')}</div>
                            <div class="spotlight-item-sub">AI Assistant</div>
                        </div>
                        <i class="fa-solid fa-chevron-right spotlight-item-arrow"></i>
                    </a>
                </div>`;
        }, 700);
    }

    function openSpotlight() {
        overlay.classList.add('active');
        input.value = '';
        currentFiltered = [...SEARCH_ITEMS];
        renderResults(currentFiltered);
        activeIndex = -1;
        setTimeout(() => input.focus(), 100);
        document.body.style.overflow = 'hidden';
    }

    function closeSpotlight() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function renderResults(items) {
        if (items.length === 0) {
            const q = input.value.trim();
            results.innerHTML = `
                <div style="text-align:center;padding:24px 20px 16px;font-family:Inter,sans-serif;">
                    <div style="color:#aaa;font-size:0.9rem;margin-bottom:12px;">${t('spotlight_no_results')} "<strong>${q}</strong>"</div>
                    <button id="ask-bot-btn" style="display:inline-flex;align-items:center;gap:8px;padding:9px 18px;background:#ca8a04;color:#fff;border:none;border-radius:20px;font-family:Inter,sans-serif;font-size:0.85rem;font-weight:600;cursor:pointer;">
                        <i class="fa-solid fa-robot"></i> ${t('spotlight_ask_ai')}
                    </button>
                    <div style="margin-top:10px;font-size:0.75rem;color:#bbb;">${t('bot_italian_only')}</div>
                </div>`;
            document.getElementById('ask-bot-btn')?.addEventListener('click', () => showBotResponse(q));
            return;
        }

        results.innerHTML = items.map((item, i) => `
            <a href="${item.url}" ${externalLinkAttrs(item.url, item.download)}
               class="spotlight-item${i === activeIndex ? ' active' : ''}" data-index="${i}">
                <div class="spotlight-item-icon" style="background:${item.color}"><i class="${item.icon}"></i></div>
                <div class="spotlight-item-info">
                    <div class="spotlight-item-title">${item.title}</div>
                    <div class="spotlight-item-sub">${item.sub}</div>
                </div>
                <i class="fa-solid fa-chevron-right spotlight-item-arrow"></i>
            </a>
        `).join('');
    }

    function updateActive() {
        results.querySelectorAll('.spotlight-item').forEach((el, i) => {
            el.classList.toggle('active', i === activeIndex);
            if (i === activeIndex) {
                el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        });
    }

    function renderBotMode(query) {
        results.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px 6px;border-bottom:1px solid rgba(0,0,0,0.06);font-family:Inter,sans-serif;">
                <div style="width:28px;height:28px;border-radius:8px;background:#ca8a04;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.8rem;"><i class="fa-solid fa-robot"></i></div>
                <span style="font-size:0.8rem;font-weight:600;color:#888;">${t('bot_mode_title')}</span>
                <span style="margin-left:auto;font-size:0.72rem;color:#bbb;">${t('bot_mode_hint')}</span>
            </div>
            ${query
                ? `<div style="padding:14px;font-family:Inter,sans-serif;font-size:0.9rem;color:#aaa;">
                        <kbd style="padding:2px 8px;background:rgba(0,0,0,0.06);border-radius:6px;font-size:0.78rem;border:1px solid rgba(0,0,0,0.1);">↵</kbd>
                        &nbsp;${t('bot_mode_ask')}: "<strong style="color:var(--text-primary,#1a1a1a);">${query}</strong>"
                   </div>`
                : `<div style="text-align:center;padding:24px 20px;font-family:Inter,sans-serif;font-size:0.9rem;color:#aaa;">
                        ${t('bot_mode_type_hint')}
                   </div>`
            }
            <div style="text-align:center;padding:0 14px 10px;font-size:0.75rem;color:#bbb;">${t('bot_italian_only')}</div>`;
    }

    function renderUnipiResults(items, raw) {
        const sub = raw.slice(6).trim();
        const header = `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px 6px;border-bottom:1px solid rgba(0,0,0,0.06);font-family:Inter,sans-serif;">
            <div style="width:28px;height:28px;border-radius:8px;background:#1C1C1E;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.8rem;"><i class="fa-solid fa-compass"></i></div>
            <span style="font-size:0.8rem;font-weight:600;color:#888;">Bussola UniPi ${sub ? '- ' + sub : ''}</span>
            <span style="margin-left:auto;font-size:0.72rem;color:#bbb;">${items.length} link</span>
        </div>`;
        if (items.length === 0) {
            results.innerHTML = `${header}<div style="text-align:center;padding:20px;color:#aaa;font-size:0.9rem;font-family:Inter,sans-serif;">Nessun link trovato</div>`;
            return;
        }

        results.innerHTML = header + items.map((item, i) => `
            <a href="${item.url}" ${externalLinkAttrs(item.url)}
               class="spotlight-item${i === activeIndex ? ' active' : ''}" data-index="${i}">
                <div class="spotlight-item-icon" style="background:${item.color}"><i class="${item.icon}"></i></div>
                <div class="spotlight-item-info">
                    <div class="spotlight-item-title">${item.title}</div>
                    <div class="spotlight-item-sub">${item.sub}</div>
                </div>
                <i class="fa-solid fa-chevron-right spotlight-item-arrow"></i>
            </a>
        `).join('');
    }

    function renderHiddenResults(items, raw) {
        const sub = raw.slice(7).trim();
        const header = `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px 6px;border-bottom:1px solid rgba(0,0,0,0.06);font-family:Inter,sans-serif;">
            <div style="width:28px;height:28px;border-radius:8px;background:#333;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.8rem;"><i class="fa-solid fa-box-open"></i></div>
            <span style="font-size:0.8rem;font-weight:600;color:#888;">${t('spotlight_hidden_title')} ${sub ? '- ' + sub : ''}</span>
            <span style="margin-left:auto;font-size:0.72rem;color:#bbb;">${items.length} app</span>
        </div>`;
        if (items.length === 0) {
            results.innerHTML = `${header}<div style="text-align:center;padding:20px;color:#aaa;font-size:0.9rem;font-family:Inter,sans-serif;">${t('spotlight_hidden_no_results')}</div>`;
            return;
        }

        results.innerHTML = header + items.map((item, i) => `
            <a href="${item.url}" ${externalLinkAttrs(item.url)}
               class="spotlight-item${i === activeIndex ? ' active' : ''}" data-index="${i}">
                <div class="spotlight-item-icon" style="background:${item.color}"><i class="${item.icon}"></i></div>
                <div class="spotlight-item-info">
                    <div class="spotlight-item-title">${item.title}</div>
                    <div class="spotlight-item-sub">${item.sub}</div>
                </div>
                <i class="fa-solid fa-chevron-right spotlight-item-arrow"></i>
            </a>
        `).join('');
    }

    searchBtn.addEventListener('click', openSpotlight);
    backdrop.addEventListener('click', closeSpotlight);
    document.getElementById('spotlight-close-btn')?.addEventListener('click', closeSpotlight);

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight;
        const bottomPos = document.body.offsetHeight - 100;
        searchBtn.classList.toggle('expanded', scrollPos >= bottomPos);
    });

    input.addEventListener('input', () => {
        const raw = input.value;
        const q = raw.toLowerCase().trim();

        if (raw.startsWith('/unipi')) {
            unipiMode = true;
            botMode = false;
            hiddenMode = false;
            setMode('unipi');
            const sub = raw.slice(6).toLowerCase().trim();
            currentFiltered = sub
                ? UNIPI_ITEMS.filter(it => it.title.toLowerCase().includes(sub) || it.sub.toLowerCase().includes(sub))
                : [...UNIPI_ITEMS];
            activeIndex = currentFiltered.length ? 0 : -1;
            renderUnipiResults(currentFiltered, raw);
            return;
        }

        if (raw.startsWith('/bot')) {
            botMode = true;
            unipiMode = false;
            hiddenMode = false;
            setMode('bot');
            renderBotMode(raw.slice(4).trim());
            return;
        }

        if (raw.startsWith('/hidden')) {
            hiddenMode = true;
            unipiMode = false;
            botMode = false;
            setMode('hidden');
            const sub = raw.slice(7).toLowerCase().trim();
            const hiddenItems = PORTFOLIO_APPS
                .filter(app => HIDDEN_APPS.includes(app.id))
                .map(app => ({
                    title: app.title,
                    sub: app.sub,
                    icon: app.icon,
                    color: app.spotlightColor || app.color || '#333',
                    url: app.url
                }));
            currentFiltered = sub
                ? hiddenItems.filter(it => it.title.toLowerCase().includes(sub) || it.sub.toLowerCase().includes(sub))
                : [...hiddenItems];
            activeIndex = currentFiltered.length ? 0 : -1;
            renderHiddenResults(currentFiltered, raw);
            return;
        }

        unipiMode = false;
        botMode = false;
        hiddenMode = false;
        setMode(null);
        currentFiltered = q
            ? SEARCH_ITEMS.filter(it => it.title.toLowerCase().includes(q) || it.sub.toLowerCase().includes(q))
            : [...SEARCH_ITEMS];
        activeIndex = currentFiltered.length ? 0 : -1;
        renderResults(currentFiltered);
    });

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            overlay.classList.contains('active') ? closeSpotlight() : openSpotlight();
            return;
        }

        if (!overlay.classList.contains('active')) return;

        const items = results.querySelectorAll('.spotlight-item');
        if (e.key === 'Escape') {
            closeSpotlight();
            return;
        }

        if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) e.preventDefault();

        if (e.key === 'ArrowDown') {
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
            updateActive();
        } else if (e.key === 'ArrowUp') {
            activeIndex = Math.max(activeIndex - 1, 0);
            updateActive();
        } else if (e.key === 'Enter') {
            if (botMode) {
                const query = input.value.slice(4).trim();
                if (query) showBotResponse(query);
                return;
            }

            if (activeIndex >= 0 && items[activeIndex]) {
                items[activeIndex].click();
                closeSpotlight();
            } else if (input.value.trim() && !unipiMode && !hiddenMode) {
                showBotResponse(input.value.trim());
            }
        }
    });

    langBtn.addEventListener('click', () => {
        const current = localStorage.getItem('preferredLanguage') || 'it';
        if (typeof setLanguage === 'function') setLanguage(current === 'it' ? 'en' : 'it');
    });

    window.closeSpotlight = closeSpotlight;
})();
