const projectData = [
    {
        id: "sarcofago3d",
        title: "Il Sarcofago Tebanianus",
        descI18n: "proj_3d_desc",
        // logo mancante → forniscilo in assets/logos/sarcofago.png (fallback: solo nome)
        logo: "assets/logos/sarcofago.png",
        images: [
            "assets/3d.png",
            "assets/3d-2.png",
            "assets/3d-3.png"
        ],
        link: {
            url: "3D/index.html",
            textI18n: "proj_3d_link",
            external: false,
            protected: true
        }
    },
    {
        id: "laprendo",
        title: "Laprendoconsport",
        descI18n: "proj_laprendo_desc",
        // logo mancante → forniscilo in assets/logos/laprendo.png
        logo: "assets/logos/laprendo.png",
        images: [
            "assets/laprendoconsport.jpg"
        ],
        link: {
            url: "laprendoconsport.html",
            textI18n: "view_website", // Generic "View Website" or could be specific
            external: false
        }
    },
    {
        id: "bussola",
        title: "La Bussola di Infouma",
        descI18n: "proj_bussola_desc",
        logo: "bussola/assets/compass.png",
        images: [
            "assets/bussola.jpeg",
            "assets/bussola-2.jpeg",
            "assets/bussola-3.jpeg"
        ],
        link: {
            url: "bussola/index.html",
            textI18n: "view_website"
        }
    },
    {
        id: "blogowl",
        title: "BlogOwl",
        descI18n: "proj_blogowl_desc",
        logo: "bdd/illustrazioni/logo-navbar.svg",
        images: [
            "assets/blogowl.jpg"
        ],
        link: {
            url: "bdd/login.html",
            textI18n: "proj_blogowl_link"
        }
    },
    {
        id: "codifica",
        title: "Text Encoding Project",
        descI18n: "proj_codifica_desc",
        logo: "codifica/immagini/logo.webp",
        images: [
            "assets/codifica.jpeg",
            "assets/codifica-2.jpeg",
            "assets/codifica-3.jpeg"
        ],
        link: {
            url: "codifica/codifica.html",
            textI18n: "view_website"
        }
    },
    {
        id: "astergift",
        title: "AsterGift",
        descI18n: "proj_astergift_desc",
        // logo mancante → forniscilo in assets/logos/astergift.png
        logo: "assets/logos/astergift.png",
        images: [
            "assets/astergift.jpg"
        ],
        link: null
    },
    {
        id: "nasa",
        title: "NASA Project",
        descI18n: "proj_nasa_desc",
        logo: "ppw/images/green-logo.png",
        images: [
            "assets/ppw.jpeg",
            "assets/ppw-2.jpeg",
            "assets/ppw-3.jpeg"
        ],
        link: {
            url: "ppw/index.html",
            textI18n: "view_website"
        }
    }
];

function renderProjects(containerId, isSlider = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear existing (except for the "view all" card in slider)
    let viewAllCard = null;
    if (isSlider) {
        viewAllCard = container.querySelector('.gallery-slider-end');
        container.innerHTML = '';
    } else {
        container.innerHTML = '';
    }

    projectData.forEach(project => {
        // ── Home: card compatta ridisegnata (screenshot + logo + nome) ──
        if (isSlider) {
            const url = project.link ? project.link.url : 'gallery.html';
            const card = document.createElement('a');
            card.className = 'proj-card';
            card.href = url;
            card.setAttribute('aria-label', project.title);
            if (project.link && project.link.protected) {
                card.addEventListener('click', function (e) {
                    e.preventDefault();
                    sessionStorage.setItem('portfolio_ref', '1');
                    window.location.href = url;
                });
            } else if (project.link && project.link.external) {
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
            }
            card.innerHTML = `
                <div class="proj-card-media">
                    <img src="${project.images[0]}" alt="${project.title}" class="proj-card-img" loading="lazy">
                </div>
                <div class="proj-card-foot">
                    <span class="proj-card-logo-wrap">
                        <img src="${project.logo}" alt="" class="proj-card-logo" loading="lazy"
                             onerror="this.parentElement.remove()">
                    </span>
                    <span class="proj-card-name">${project.title}</span>
                    <i class="fa-solid fa-arrow-right proj-card-arrow"></i>
                </div>
            `;
            container.appendChild(card);
            return;
        }

        // ── gallery.html: card ricca (invariata) ──
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const imagesJson = JSON.stringify(project.images);

        let linkHtml = '';
        if (project.link) {
            const i18nLink = project.link.textI18n || 'view_website';
            if (project.link.protected) {
                linkHtml = `
                    <a href="${project.link.url}" class="project-link" data-i18n="${i18nLink}"
                       onclick="event.preventDefault(); sessionStorage.setItem('portfolio_ref','1'); window.location.href=this.href;">
                        View Website <i class="fa-solid fa-arrow-right"></i>
                    </a>
                `;
            } else {
                const target = project.link.external ? 'target="_blank" rel="noopener noreferrer"' : '';
                linkHtml = `
                    <a href="${project.link.url}" class="project-link" ${target} data-i18n="${i18nLink}">
                        View Website <i class="fa-solid fa-arrow-right"></i>
                    </a>
                `;
            }
        }

        item.innerHTML = `
            <div class="gallery-image-container" data-images='${imagesJson}'>
                <img src="${project.images[0]}" alt="${project.title}" class="gallery-img">
                <div class="gallery-overlay">
                    <i class="fa-solid fa-images"></i>
                </div>
            </div>
            <div class="gallery-info" style="position: relative;">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc" data-i18n="${project.descI18n}" style="transition: all 0.3s ease;"></p>
                ${isSlider ? `<div class="expand-desc-btn" onclick="const p = this.previousElementSibling; p.style.webkitLineClamp = p.style.webkitLineClamp === 'unset' ? '3' : 'unset'; const i = this.querySelector('i'); i.classList.toggle('fa-chevron-down'); i.classList.toggle('fa-chevron-up');" style="cursor: pointer; text-align: center; color: var(--text-secondary); margin-bottom: 10px; opacity: 0.7;"><i class="fa-solid fa-chevron-down"></i></div>` : ''}
                ${linkHtml}
            </div>
        `;
        container.appendChild(item);
    });

    if (isSlider && viewAllCard) {
        container.appendChild(viewAllCard);
    }
}
