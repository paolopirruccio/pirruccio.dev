function initNavbar() {
    const pages = [
        { id: 'aule',    i18nKey: 'nav_aule',     label: 'Aule libere', icon: 'ri-door-open-line', url: './aule.html' },
        { id: 'links',   i18nKey: 'nav_links',   label: 'Servizi', icon: 'ri-bookmark-line',     url: './links.html' },
        { id: 'lezioni', i18nKey: 'nav_lezioni',  label: 'Lezioni', icon: 'ri-presentation-line', url: './lezioni.html' },
        { id: 'orientati', i18nKey: 'nav_orientati', label: 'Orientati', icon: 'ri-map-2-line', url: './orientati.html' },
        { id: 'aiuto',   i18nKey: 'nav_help',     label: 'Aiuto',   icon: 'ri-question-line',     url: './aiuto.html' }
    ];

    const i18n = window.BussolaI18n || { t: (k, fallback) => fallback || k };

    const currentPath = window.location.pathname;
    const currentPage = pages.find(p => currentPath.endsWith(p.url.replace('./', '')))?.id || '';

    const navbarHtml = `
    <div class="page-switcher">
        ${pages.map(page => `
            <a href="${page.url}" class="page-switcher-btn ${currentPage === page.id ? 'active' : ''}">
                <i class="${page.icon}"></i>
                <span data-i18n="${page.i18nKey}">${i18n.t(page.i18nKey) || page.label}</span>
            </a>
        `).join('')}
    </div>
    `;

    const container = document.body;
    const placeholder = document.createElement('div');
    placeholder.innerHTML = navbarHtml;
    container.insertBefore(placeholder.firstElementChild, container.firstChild);
}

document.addEventListener('DOMContentLoaded', initNavbar);
