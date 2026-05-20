const PORTFOLIO_VERSION = "v2.0.0";

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const footers = document.querySelectorAll('.site-footer, .footer, .admin-footer, footer');
        footers.forEach(footer => {
            if (footer.querySelector('.site-version-display')) return;

            const versionEl = document.createElement('div');
            versionEl.className = 'site-version-display';
            versionEl.style.marginTop = '15px';
            versionEl.style.fontSize = '0.8rem';
            versionEl.style.color = 'inherit';
            versionEl.style.opacity = '0.6';
            versionEl.style.textAlign = 'center';
            versionEl.textContent = `Version: ${PORTFOLIO_VERSION}`;

            footer.appendChild(versionEl);
        });
    }, 100);
});
