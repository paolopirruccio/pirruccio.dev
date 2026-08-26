/**
 * theme.js — La Bussola di InfoUma
 * Gestisce tema visivo, font, color-scheme e settings overlay globale.
 * Includere in <head> di ogni pagina bussola.
 */
(function () {
    const VALID = ['original', 'neo', 'letterato', 'nord', 'analogico', 'dislessia'];

    // Temi che supportano sia light che dark mode
    const THEMES_WITH_COLOR_SCHEME = ['letterato', 'dislessia'];

    const FONT_URLS = {
        neo:       'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap',
        letterato: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap',
        analogico: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=VT323&display=swap',
        original:  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap',
        nord:      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap',
        dislessia: 'https://cdn.jsdelivr.net/npm/opendyslexic@0.0.3/index.css',
    };

    function loadFont(theme) {
        const url = FONT_URLS[theme];
        if (!url) return;
        if (document.querySelector('link[data-bussola-font="' + theme + '"]')) return;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.setAttribute('data-bussola-font', theme);
        document.head.appendChild(link);
    }

    function applyTheme(theme) {
        if (!VALID.includes(theme)) theme = 'original';
        document.documentElement.setAttribute('data-theme', theme);
        loadFont(theme);
    }

    function applyColorScheme(scheme) {
        // scheme = 'auto' | 'dark' | 'light'
        if (!scheme || scheme === 'auto') {
            document.documentElement.removeAttribute('data-color-scheme');
        } else {
            document.documentElement.setAttribute('data-color-scheme', scheme);
        }
        localStorage.setItem('bussola_color_scheme', scheme || 'auto');
    }

    // Applica immediatamente al caricamento (evita flash tema errato)
    var current = localStorage.getItem('bussola_theme') || 'original';
    applyTheme(current);
    var currentScheme = localStorage.getItem('bussola_color_scheme') || 'auto';
    applyColorScheme(currentScheme);

    /* ── Settings overlay — iniettato in tutte le pagine ── */
    function injectSettings() {
        if (document.getElementById('bussolaSettingsOverlay')) return;

        // Trigger button (bottom-left)
        var trigger = document.createElement('div');
        trigger.className = 'bussola-settings-trigger';
        trigger.id = 'bussolaSettingsTrigger';
        trigger.innerHTML = '<button onclick="BussolaSettings.open()" class="scroll-btn" title="Impostazioni" aria-label="Impostazioni"><i class="ri-settings-3-line"></i></button>';
        document.body.appendChild(trigger);

        // Overlay HTML
        var overlay = document.createElement('div');
        overlay.className = 'bussola-settings-overlay';
        overlay.id = 'bussolaSettingsOverlay';
        overlay.setAttribute('onclick', 'if(event.target===this)BussolaSettings.close()');
        overlay.innerHTML = [
            '<div class="bussola-settings-sheet">',
            '  <div class="settings-handle"></div>',
            '  <div>',
            '    <p class="settings-section-label">Tema</p>',
            '    <div class="theme-grid" id="bussolaThemeGrid">',
            '      <div class="theme-card" data-theme="original"  onclick="BussolaSettings.selectTheme(\'original\')"> <div class="theme-dot dot-original"></div> <span class="theme-name">Original</span></div>',
            '      <div class="theme-card" data-theme="neo"       onclick="BussolaSettings.selectTheme(\'neo\')">      <div class="theme-dot dot-neo"></div>      <span class="theme-name">Neo</span></div>',
            '      <div class="theme-card" data-theme="letterato" onclick="BussolaSettings.selectTheme(\'letterato\')"><div class="theme-dot dot-letterato"></div><span class="theme-name">Letterato</span></div>',
            '      <div class="theme-card" data-theme="nord"      onclick="BussolaSettings.selectTheme(\'nord\')">     <div class="theme-dot dot-nord"></div>     <span class="theme-name">Nord</span></div>',
            '      <div class="theme-card" data-theme="analogico" onclick="BussolaSettings.selectTheme(\'analogico\')"><div class="theme-dot dot-analogico"></div><span class="theme-name">Analogico</span></div>',
            '      <div class="theme-card" data-theme="dislessia" onclick="BussolaSettings.selectTheme(\'dislessia\')"><div class="theme-dot dot-dislessia"></div><span class="theme-name">Dislessia</span></div>',
            '    </div>',
            '  </div>',
            '  <div id="bussolaColorSchemeSection" style="display:none;">',
            '    <p class="settings-section-label">Modalità</p>',
            '    <div class="color-scheme-toggle">',
            '      <button class="scheme-btn" id="bussolaSchemeAuto"  onclick="BussolaSettings.setColorScheme(\'auto\')"><i class="ri-contrast-2-line"></i> Auto</button>',
            '      <button class="scheme-btn" id="bussolaSchemeDark"  onclick="BussolaSettings.setColorScheme(\'dark\')"><i class="ri-moon-line"></i> Dark</button>',
            '      <button class="scheme-btn" id="bussolaSchemeLight" onclick="BussolaSettings.setColorScheme(\'light\')"><i class="ri-sun-line"></i> Light</button>',
            '    </div>',
            '  </div>',
            '  <div>',
            '    <p class="settings-section-label">Lingua</p>',
            '    <div class="lang-toggle">',
            '      <button class="lang-btn" id="bussolaLangIT" onclick="BussolaSettings.setLang(\'it\')">IT</button>',
            '      <button class="lang-btn" id="bussolaLangEN" onclick="BussolaSettings.setLang(\'en\')">EN</button>',
            '    </div>',
            '  </div>',
            '</div>'
        ].join('');
        document.body.appendChild(overlay);

        refreshGrid();
        refreshLang();
        refreshColorSchemeSection();

        window.addEventListener('scroll', function () {
            var t = document.getElementById('bussolaSettingsTrigger');
            if (!t) return;
            if (window.scrollY > 200) t.classList.add('visible');
            else t.classList.remove('visible');
        });
        setTimeout(function () {
            window.dispatchEvent(new Event('scroll'));
        }, 100);
    }

    function refreshGrid() {
        var cur = localStorage.getItem('bussola_theme') || 'original';
        document.querySelectorAll('#bussolaThemeGrid .theme-card').forEach(function (card) {
            card.classList.toggle('active', card.dataset.theme === cur);
        });
    }

    function refreshLang() {
        var lang = localStorage.getItem('bussola_lang') || 'it';
        var it = document.getElementById('bussolaLangIT');
        var en = document.getElementById('bussolaLangEN');
        if (it) it.classList.toggle('active', lang === 'it');
        if (en) en.classList.toggle('active', lang === 'en');
    }

    function refreshColorSchemeSection() {
        var cur = localStorage.getItem('bussola_theme') || 'original';
        var section = document.getElementById('bussolaColorSchemeSection');
        if (!section) return;

        var supports = THEMES_WITH_COLOR_SCHEME.includes(cur);
        section.style.display = supports ? '' : 'none';

        if (supports) {
            var scheme = localStorage.getItem('bussola_color_scheme') || 'auto';
            var btnAuto  = document.getElementById('bussolaSchemeAuto');
            var btnDark  = document.getElementById('bussolaSchemeDark');
            var btnLight = document.getElementById('bussolaSchemeLight');
            if (btnAuto)  btnAuto.classList.toggle('active',  scheme === 'auto');
            if (btnDark)  btnDark.classList.toggle('active',  scheme === 'dark');
            if (btnLight) btnLight.classList.toggle('active', scheme === 'light');
        }
    }

    // API pubblica
    window.BussolaTheme = {
        get: function () { return localStorage.getItem('bussola_theme') || 'original'; },
        set: function (theme) {
            localStorage.setItem('bussola_theme', theme);
            applyTheme(theme);
            refreshGrid();
        },
    };

    window.BussolaSettings = {
        open: function () {
            var o = document.getElementById('bussolaSettingsOverlay');
            if (o) { refreshGrid(); refreshLang(); refreshColorSchemeSection(); o.classList.add('active'); }
        },
        close: function () {
            var o = document.getElementById('bussolaSettingsOverlay');
            if (o) o.classList.remove('active');
        },
        selectTheme: function (theme) {
            window.BussolaTheme.set(theme);
            refreshColorSchemeSection();
            if (typeof refreshThemeGrid === 'function') refreshThemeGrid();
        },
        setLang: function (lang) {
            localStorage.setItem('bussola_lang', lang);
            refreshLang();
            if (typeof applyLang === 'function') applyLang(lang);
        },
        setColorScheme: function (scheme) {
            applyColorScheme(scheme);
            refreshColorSchemeSection();
        },
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSettings);
    } else {
        injectSettings();
    }
})();
