
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderProjects === 'function') {
        renderProjects('home-projects-slider', true);
        if (typeof setLanguage === 'function') {
            setLanguage(localStorage.getItem('preferredLanguage') || 'en');
        }
    }

    const toggleAccordion = (toggleId, listId, chevronId) => {
        const toggle = document.getElementById(toggleId);
        const list = document.getElementById(listId);
        const chevron = document.getElementById(chevronId);

        if (toggle && list && chevron) {
            const handleToggle = () => {
                const isOpen = list.classList.toggle('open');
                chevron.classList.toggle('rotate');
                toggle.setAttribute('aria-expanded', isOpen);
            };

            toggle.addEventListener('click', handleToggle);
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle();
                }
            });
        }
    };

    toggleAccordion('curriculum-toggle', 'curriculum-list', 'curriculum-chevron');
    toggleAccordion('projects-toggle', 'projects-list', 'projects-chevron');
    toggleAccordion('services-toggle', 'services-list', 'services-chevron');
    toggleAccordion('apps-toggle', 'apps-list', 'apps-chevron');
    toggleAccordion('blog-toggle', 'blog-list', 'blog-chevron');
    toggleAccordion('viaggi-toggle', 'viaggi-list', 'viaggi-chevron');

    const initChevron = (listId, chevronId, toggleId) => {
        const list = document.getElementById(listId);
        const chevron = document.getElementById(chevronId);
        const toggle = document.getElementById(toggleId);
        if (list && chevron) {
            const style = window.getComputedStyle(list);
            if (style.display !== 'none' && style.maxHeight !== '0px') {
                chevron.classList.add('rotate');
                list.classList.add('open');
                if (toggle) toggle.setAttribute('aria-expanded', 'true');
            }
        }
    };
    initChevron('curriculum-list', 'curriculum-chevron', 'curriculum-toggle');
    initChevron('projects-list', 'projects-chevron', 'projects-toggle');

    // Deep link: auto-open services section if #servizi is in the URL
    if (window.location.hash === '#servizi' || window.location.hash === '#services') {
        const servicesList = document.getElementById('services-list');
        const servicesChevron = document.getElementById('services-chevron');
        const servicesToggle = document.getElementById('services-toggle');
        if (servicesList && servicesChevron) {
            servicesList.classList.add('open');
            servicesChevron.classList.add('rotate');
            if (servicesToggle) servicesToggle.setAttribute('aria-expanded', 'true');
            setTimeout(() => {
                document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }

    document.addEventListener('keydown', (e) => {
        const arrowKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
        if (!arrowKeys.includes(e.key) && e.key !== 'Escape') return;

        if (e.key === 'Escape') {
            qrModal?.classList.remove('active');
            return;
        }

        const focusableElements = Array.from(document.querySelectorAll('.card, [tabindex="0"], .app-item, .footer-name-link')).filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
        });

        if (focusableElements.length === 0) return;

        let currentFocus = document.activeElement;
        let currentIndex = focusableElements.indexOf(currentFocus);

        if (currentIndex === -1) {
            if (arrowKeys.includes(e.key)) {
                focusableElements[0].focus();
                e.preventDefault();
            }
            return;
        }

        if (arrowKeys.includes(e.key)) e.preventDefault();

        const getPosition = (el) => el.getBoundingClientRect();
        const currentPos = getPosition(currentFocus);

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

    const homeProjSlider = document.getElementById('home-projects-slider');
    const projPrev = document.getElementById('proj-prev');
    const projNext = document.getElementById('proj-next');
    if (homeProjSlider && projPrev && projNext) {
        const updateSliderBtns = () => {
            const maxScrollLeft = homeProjSlider.scrollWidth - homeProjSlider.clientWidth;
            if (homeProjSlider.scrollLeft <= 5) {
                projPrev.classList.add('hidden');
            } else {
                projPrev.classList.remove('hidden');
            }

            if (homeProjSlider.scrollLeft >= maxScrollLeft - 5) {
                projNext.classList.add('hidden');
            } else {
                projNext.classList.remove('hidden');
            }

            homeProjSlider.classList.remove('at-start', 'at-end', 'no-scroll');
            if (maxScrollLeft <= 0) {
                homeProjSlider.classList.add('no-scroll');
            } else if (homeProjSlider.scrollLeft <= 5) {
                homeProjSlider.classList.add('at-start');
            } else if (homeProjSlider.scrollLeft >= maxScrollLeft - 5) {
                homeProjSlider.classList.add('at-end');
            }
        };

        projPrev.addEventListener('click', () => {
            homeProjSlider.scrollBy({ left: -320, behavior: 'smooth' });
        });
        projNext.addEventListener('click', () => {
            homeProjSlider.scrollBy({ left: 320, behavior: 'smooth' });
        });

        homeProjSlider.addEventListener('scroll', updateSliderBtns);

        setTimeout(updateSliderBtns, 100);
        window.addEventListener('resize', updateSliderBtns);
    }

    const qrModal = document.getElementById('qr-modal');
    const qrImage = document.getElementById('qr-image');
    const qrLabel = document.getElementById('qr-label');
    const modalClose = document.getElementById('modal-close');

    document.querySelectorAll('.qr-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const url = trigger.getAttribute('data-qr');
            const cleanTitle = trigger.closest('.card').querySelector('.card-title').textContent.trim();

            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
            qrLabel.innerText = cleanTitle;
            qrModal.classList.add('active');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            qrModal.classList.remove('active');
        });
    }

    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                qrModal.classList.remove('active');
            }
        });
    }

    const cards = document.querySelectorAll('.card');
    if ('IntersectionObserver' in window && cards.length > 0) {
        const observer = new IntersectionObserver((entries, animationObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const ageSpan = document.getElementById('dynamic-age');
    if (ageSpan) {
        const birthDate = new Date('2001-06-04');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        ageSpan.textContent = age;
        if (window.applyLetterHover) window.applyLetterHover();
    }

    if (typeof PORTFOLIO_APPS !== 'undefined') {
        const appsList = document.getElementById('apps-list');
        if (appsList) {
            appsList.innerHTML = PORTFOLIO_APPS.filter(app => app.inGrid).map(app => `
                <a href="${app.url}" class="app-item" ${app.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    <div class="app-icon" style="background-color: ${app.colorBg}; color: ${app.colorText};">
                        <i class="${app.icon}"></i>
                    </div>
                    <span class="app-name">${app.title}</span>
                </a>
            `).join('');
        }

        const footerSocials = document.querySelector('.footer-socials');
        if (footerSocials) {
            const footerApps = ['email', 'instagram', 'linkedin', 'telegram', 'paypal'];
            footerSocials.innerHTML = footerApps.map(id => {
                const app = PORTFOLIO_APPS.find(a => a.id === id);
                return app ? `<a href="${app.url}" class="footer-social-link" target="_blank" rel="noopener noreferrer" title="${app.title}"><i class="${app.icon}"></i></a>` : '';
            }).join('');
        }
    }

    // Sticker passioni: rotazione e posizione lungo il bordo randomizzate a ogni load
    const rand = (min, max) => Math.random() * (max - min) + min;
    const stickerConfig = {
        'st-apple':    { rotBase: -16, edge: 'side', prop: 'bottom', min: 14, max: 62 },
        'st-politics': { rotBase: 15,  edge: 'side', prop: 'bottom', min: 14, max: 62 },
        'st-travel':   { rotBase: -8,  edge: 'bottom', prop: 'left', min: 46, max: 60 },
        'st-books':    { rotBase: 11,  edge: 'bottom', prop: 'left', min: 14, max: 32 }
    };
    Object.entries(stickerConfig).forEach(([cls, cfg]) => {
        const el = document.querySelector('.' + cls);
        if (!el) return;
        el.style.setProperty('--st-rot', (cfg.rotBase + rand(-7, 7)).toFixed(1) + 'deg');
        el.style.setProperty('--st-jx', rand(-6, 6).toFixed(1) + 'px');
        el.style[cfg.prop] = cfg.prop === 'left'
            ? rand(cfg.min, cfg.max).toFixed(1) + '%'
            : rand(cfg.min, cfg.max).toFixed(0) + 'px';
    });
});
