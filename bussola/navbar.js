function initNavbar() {
    const pages = [
        { id: 'links', label: 'Link', icon: 'ri-bookmark-line', url: './links.html' },
        { id: 'lezioni', label: 'Lezioni', icon: 'ri-presentation-line', url: './lezioni.html' },
        { id: 'aule', label: 'Aule', icon: 'ri-door-open-line', url: './aule.html' },
        { id: 'faq', label: 'Faq', icon: 'ri-question-line', url: './faq.html' }
    ];

    const currentPath = window.location.pathname;
    const currentPage = pages.find(p => currentPath.endsWith(p.url.replace('./', '')))?.id || 'bussola';

    const isDashboard = currentPage === 'bussola';

    const navbarHtml = `
    <div class="page-switcher">
        ${isDashboard
            ? `<a href="#!" onclick="document.getElementById('infouma-modal').classList.add('active'); return false;" class="page-switcher-logo" title="InfoUma About">
                 <img src="assets/compass.webp" alt="InfoUma">
               </a>`
            : `<a href="./index.html" class="page-switcher-logo" title="InfoUma Home">
                 <img src="assets/compass.webp" alt="InfoUma">
               </a>`
        }
        ${pages.map(page => `
            <a href="${page.url}" class="page-switcher-btn ${currentPage === page.id ? 'active' : ''}">
                <i class="${page.icon}"></i>
                <span>${page.label}</span>
            </a>
        `).join('')}
    </div>
    `;

    // Inject into the first div or before main if no specific container exists
    const container = document.body;
    const placeholder = document.createElement('div');
    placeholder.innerHTML = navbarHtml;
    container.insertBefore(placeholder.firstElementChild, container.firstChild);
}

document.addEventListener('DOMContentLoaded', initNavbar);
