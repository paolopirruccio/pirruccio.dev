const projectData = [
    {
        id: "sarcofago3d",
        color: "#4a3526",
        title: "Il Sarcofago Tebanianus",
        descI18n: "proj_3d_desc",
        // logo mancante → forniscilo in assets/logos/sarcofago.png (fallback: solo nome)
        logo: "assets/logos/sarcofago.png",
        images: [
            "assets/opt/3d.webp",
            "assets/opt/3d-2.webp",
            "assets/opt/3d-3.webp"
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
        color: "#c14a22",
        title: "Laprendoconsport",
        descI18n: "proj_laprendo_desc",
        // logo mancante → forniscilo in assets/logos/laprendo.png
        logo: "assets/logos/laprendo.png",
        images: [
            "assets/opt/laprendoconsport.webp"
        ],
        link: {
            url: "laprendoconsport.html",
            textI18n: "view_website", // Generic "View Website" or could be specific
            external: false
        }
    },
    {
        id: "bussola",
        color: "#6d5210",
        title: "La Bussola di Infouma",
        descI18n: "proj_bussola_desc",
        logo: "assets/opt/compass-logo.webp",
        images: [
            "assets/opt/bussola.webp",
            "assets/opt/bussola-2.webp",
            "assets/opt/bussola-3.webp"
        ],
        link: {
            url: "bussola/index.html",
            textI18n: "view_website"
        }
    },
    {
        id: "blogowl",
        color: "#5b37c4",
        title: "BlogOwl",
        descI18n: "proj_blogowl_desc",
        logo: "bdd/illustrazioni/logo-navbar.svg",
        images: [
            "assets/opt/blogowl.webp"
        ],
        link: {
            url: "bdd/login.html",
            textI18n: "proj_blogowl_link"
        }
    },
    {
        id: "codifica",
        color: "#186a5e",
        title: "Text Encoding Project",
        descI18n: "proj_codifica_desc",
        logo: "codifica/immagini/logo.webp",
        images: [
            "assets/opt/codifica.webp",
            "assets/opt/codifica-2.webp",
            "assets/opt/codifica-3.webp"
        ],
        link: {
            url: "codifica/codifica.html",
            textI18n: "view_website"
        }
    },
    {
        id: "astergift",
        color: "#7d2fb0",
        title: "AsterGift",
        descI18n: "proj_astergift_desc",
        // logo mancante → forniscilo in assets/logos/astergift.png
        logo: "assets/logos/astergift.png",
        images: [
            "assets/opt/astergift.webp"
        ],
        link: null
    },
    {
        id: "nasa",
        color: "#1f4bad",
        title: "NASA Project",
        descI18n: "proj_nasa_desc",
        logo: "ppw/images/green-logo.png",
        images: [
            "assets/opt/ppw.webp",
            "assets/opt/ppw-2.webp",
            "assets/opt/ppw-3.webp"
        ],
        link: {
            url: "ppw/index.html",
            textI18n: "view_website"
        }
    }
];

// costruisce una card progetto (stesso design in home slider e in gallery)
function buildProjectCard(project) {
    const url = project.link ? project.link.url : 'gallery.html';
    const card = document.createElement('a');
    card.className = 'proj-card';
    card.href = url;
    card.setAttribute('aria-label', project.title);
    if (project.color) card.style.setProperty('--proj-color', project.color);
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
    const img2 = project.images[1] || project.images[0];
    const mono = (project.title.trim()[0] || '?').toUpperCase();
    card.innerHTML = `
        <div class="proj-card-thumbs" aria-hidden="true">
            <img class="proj-thumb proj-thumb-back" src="${img2}" alt="" loading="lazy">
            <img class="proj-thumb proj-thumb-front" src="${project.images[0]}" alt="" loading="lazy">
        </div>
        <div class="proj-card-body">
            <span class="proj-card-logo-wrap">
                <img src="${project.logo}" alt="" class="proj-card-logo" loading="lazy"
                     onerror="this.closest('.proj-card-logo-wrap').classList.add('mono'); this.remove()">
                <span class="proj-card-monogram" aria-hidden="true">${mono}</span>
            </span>
            <span class="proj-card-name">${project.title}</span>
            <p class="proj-card-desc" data-i18n="${project.descI18n}"></p>
        </div>
        <i class="fa-solid fa-arrow-right proj-card-arrow" aria-hidden="true"></i>
    `;
    return card;
}

function renderProjects(containerId, isSlider = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // nel slider preserva la card "vedi tutti" in coda
    let viewAllCard = isSlider ? container.querySelector('.gallery-slider-end') : null;
    container.innerHTML = '';

    projectData.forEach(function (project) {
        container.appendChild(buildProjectCard(project));
    });

    if (isSlider && viewAllCard) {
        container.appendChild(viewAllCard);
    }
}
