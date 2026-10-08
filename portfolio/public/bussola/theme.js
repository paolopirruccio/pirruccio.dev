/**
 * Bussola appearance settings: automatic, dark, and light palettes with independent fonts.
 */
(function () {
    const THEMES = ['auto', 'black', 'white'];
    const FONTS = {
        inter: {
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
        },
        bricolage: {
            url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap'
        },
        instrument: {
            url: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap'
        },
        opendyslexic: {
            url: 'https://cdn.jsdelivr.net/npm/opendyslexic@0.0.3/index.css'
        },
        atkinson: {
            url: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap'
        },
        dm_sans: {
            url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'
        },
        lora: {
            url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap'
        },
        nunito: {
            url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap'
        },
        source_sans: {
            url: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800&display=swap'
        },
        fira_code: {
            url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap'
        }
    };

    function loadFont(name) {
        const font = FONTS[name];
        if (!font || document.querySelector('link[data-bussola-font="' + name + '"]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = font.url;
        link.setAttribute('data-bussola-font', name);
        document.head.appendChild(link);
    }

    function applyResolvedTheme(theme) {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        const resolvedTheme = theme === 'auto' ? (prefersLight ? 'white' : 'classic') : theme;
        document.documentElement.setAttribute('data-theme', resolvedTheme);
        document.documentElement.setAttribute('data-theme-choice', theme);
    }

    function applyTheme(theme) {
        if (!THEMES.includes(theme)) theme = 'auto';
        applyResolvedTheme(theme);
        localStorage.setItem('bussola_theme', theme);
    }

    function applyFont(name) {
        if (!FONTS[name]) name = 'inter';
        document.documentElement.setAttribute('data-font', name);
        loadFont(name);
        localStorage.setItem('bussola_font', name);
        const select = document.getElementById('bussolaFontSelect');
        if (select && select.value !== name) select.value = name;
    }

    // The old "classic" palette was the default; make that default follow the device.
    const savedTheme = localStorage.getItem('bussola_theme');
    const legacyToTheme = { classic: 'auto', letterato: 'white', dislessia: 'white' };
    applyTheme(THEMES.includes(savedTheme) ? savedTheme : (legacyToTheme[savedTheme] || 'auto'));
    if (window.matchMedia) {
        const colorPreference = window.matchMedia('(prefers-color-scheme: light)');
        const onColorPreferenceChange = function () {
            const selectedTheme = localStorage.getItem('bussola_theme') || 'auto';
            if (selectedTheme === 'auto') applyResolvedTheme('auto');
        };
        if (colorPreference.addEventListener) colorPreference.addEventListener('change', onColorPreferenceChange);
        else if (colorPreference.addListener) colorPreference.addListener(onColorPreferenceChange);
    }
    localStorage.removeItem('bussola_color_scheme');
    applyFont(localStorage.getItem('bussola_font') || 'inter');

    function injectSettings() {
        if (document.getElementById('bussolaSettingsOverlay')) return;

        const trigger = document.createElement('div');
        trigger.className = 'bussola-settings-trigger';
        trigger.id = 'bussolaSettingsTrigger';
        trigger.innerHTML = '<button onclick="BussolaSettings.open()" class="scroll-btn" title="Impostazioni" aria-label="Impostazioni"><i class="ri-settings-3-line"></i></button>';
        document.body.appendChild(trigger);

        const overlay = document.createElement('div');
        overlay.className = 'bussola-settings-overlay';
        overlay.id = 'bussolaSettingsOverlay';
        overlay.setAttribute('onclick', 'if(event.target===this)BussolaSettings.close()');
        overlay.innerHTML = [
            '<section class="bussola-settings-sheet" role="dialog" aria-modal="true" aria-labelledby="bussolaSettingsTitle">',
            '  <div class="settings-handle"></div>',
            '  <h2 id="bussolaSettingsTitle" class="settings-section-label">Aspetto</h2>',
            '  <p class="settings-section-label">Tema</p>',
            '  <div class="theme-grid" id="bussolaThemeGrid">',
            '    <button type="button" class="theme-card" data-theme="auto" onclick="BussolaSettings.selectTheme(\'auto\')"><span class="theme-dot dot-auto" aria-hidden="true"></span><span class="theme-name">Automatico</span></button>',
            '    <button type="button" class="theme-card" data-theme="black" onclick="BussolaSettings.selectTheme(\'black\')"><span class="theme-dot dot-black"></span><span class="theme-name">Black</span></button>',
            '    <button type="button" class="theme-card" data-theme="white" onclick="BussolaSettings.selectTheme(\'white\')"><span class="theme-dot dot-white"></span><span class="theme-name">White</span></button>',
            '  </div>',
            '  <label class="settings-section-label" for="bussolaFontSelect">Carattere</label>',
            '  <div class="settings-font-select-wrap">',
            '  <select id="bussolaFontSelect" class="settings-font-select">',
            '    <option value="inter">Inter</option>',
            '    <option value="bricolage">Bricolage Grotesque</option>',
            '    <option value="instrument">Instrument Serif</option>',
            '    <option value="opendyslexic">OpenDyslexic</option>',
            '    <option value="atkinson">Atkinson Hyperlegible</option>',
            '    <option value="dm_sans">DM Sans</option>',
            '    <option value="lora">Lora</option>',
            '    <option value="nunito">Nunito</option>',
            '    <option value="source_sans">Source Sans 3</option>',
            '    <option value="fira_code">Fira Code</option>',
            '  </select>',
            '  <i class="ri-arrow-down-s-line" aria-hidden="true"></i>',
            '  </div>',
            '  <label class="settings-toggle-row" for="bussolaLinksNewTab">',
            '    <span data-i18n="links_new_tab">Apri i link in una nuova scheda</span>',
            '    <input id="bussolaLinksNewTab" type="checkbox" role="switch">',
            '  </label>',
            '  <div class="settings-language">',
            '    <p class="settings-section-label">Lingua</p>',
            '    <div class="lang-toggle">',
            '      <button class="lang-btn" id="bussolaLangIT" onclick="BussolaSettings.setLang(\'it\')">IT</button>',
            '      <button class="lang-btn" id="bussolaLangEN" onclick="BussolaSettings.setLang(\'en\')">EN</button>',
            '    </div>',
            '  </div>',
            '</section>'
        ].join('');
        document.body.appendChild(overlay);

        document.getElementById('bussolaFontSelect').addEventListener('change', function () {
            applyFont(this.value);
        });
        document.getElementById('bussolaLinksNewTab').addEventListener('change', function () {
            localStorage.setItem('bussola_links_new_tab', String(this.checked));
            if (typeof window.renderLinks === 'function') window.renderLinks();
        });
        refreshGrid();
        refreshLang();
        refreshLinkTargetPreference();

        window.addEventListener('scroll', function () {
            const button = document.getElementById('bussolaSettingsTrigger');
            if (button) button.classList.toggle('visible', window.scrollY > 200);
        });
        setTimeout(function () { window.dispatchEvent(new Event('scroll')); }, 100);
    }

    function refreshGrid() {
        const current = localStorage.getItem('bussola_theme') || 'auto';
        document.querySelectorAll('#bussolaThemeGrid .theme-card').forEach(function (card) {
            const selected = card.dataset.theme === current;
            card.classList.toggle('active', selected);
            card.setAttribute('aria-pressed', String(selected));
        });
    }

    function refreshLang() {
        const lang = localStorage.getItem('bussola_lang') || 'it';
        const it = document.getElementById('bussolaLangIT');
        const en = document.getElementById('bussolaLangEN');
        if (it) it.classList.toggle('active', lang === 'it');
        if (en) en.classList.toggle('active', lang === 'en');
    }

    function refreshLinkTargetPreference() {
        const toggle = document.getElementById('bussolaLinksNewTab');
        if (toggle) toggle.checked = localStorage.getItem('bussola_links_new_tab') === 'true';
    }

    window.BussolaTheme = {
        get: function () { return localStorage.getItem('bussola_theme') || 'auto'; },
        set: function (theme) { applyTheme(theme); refreshGrid(); }
    };
    window.BussolaSettings = {
        open: function () {
            const overlay = document.getElementById('bussolaSettingsOverlay');
            if (overlay) { refreshGrid(); refreshLang(); refreshLinkTargetPreference(); applyFont(localStorage.getItem('bussola_font') || 'inter'); overlay.classList.add('active'); }
        },
        close: function () {
            const overlay = document.getElementById('bussolaSettingsOverlay');
            if (overlay) overlay.classList.remove('active');
        },
        selectTheme: function (theme) { applyTheme(theme); refreshGrid(); },
        setLang: function (lang) {
            localStorage.setItem('bussola_lang', lang);
            refreshLang();
            if (typeof applyLang === 'function') applyLang(lang);
            else if (window.BussolaI18n) window.BussolaI18n.applyDataI18n(lang);
            refreshLinkTargetPreference();
        }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectSettings);
    else injectSettings();
})();
