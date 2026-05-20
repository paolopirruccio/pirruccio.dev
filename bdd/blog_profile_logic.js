/**
 * blog_profile_logic.js
 * Handles the logic required for rendering a single blog page and its posts.
 */

// ── HTML Escape Utility ──
function escapeHtmlProfile(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', () => {



    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));

    if (!blogId) {
        alert("Blog non valido.");
        window.location.href = 'index.html';
        return;
    }

    const db = window.mockDB.getDB();
    const blog = db.blogs.find(b => b.id === blogId);

    if (!blog) {
        alert("Blog non trovato.");
        window.location.href = 'index.html';
        return;
    }

    const currentUser = window.mockDB.getCurrentUser();
    const owner = db.users.find(u => u.id === blog.id_proprietario);

    const isOwner = currentUser ? blog.id_proprietario === currentUser.id : false;
    // For mock, simply checking owner.
    const isCollaborator = false;

    // Check if following
    const followers = blog.seguaci || [];
    const isFollowing = currentUser ? followers.includes(currentUser.id) : false;

    // Popola Intestazione
    document.getElementById('blog-titolo').textContent = blog.titolo;
    document.getElementById('blog-descrizione').textContent = blog.tagline;
    // Set theme class on body
    if (blog.id_tema) {
        document.getElementById('blog-body').classList.add('style' + blog.id_tema);
    }

    // Popola Meta Info (Categoria, Proprietario, Voto)
    document.getElementById('blog-meta-container').innerHTML = `
        <div class="blog-meta-item"><i class="fas fa-tags"></i> <span>${escapeHtmlProfile(blog.categoria || 'Varie')}</span></div>
        <div class="blog-meta-item"><i class="fas fa-user"></i> <span>${escapeHtmlProfile(owner ? owner.username : 'Anonimo')}</span></div>
        <div class="blog-meta-item"><i class="fas fa-star"></i> <span>5.0</span></div>
    `;

    // Popola Statistiche
    const blogPosts = db.posts.filter(p => p.id_blog === blog.id && p.bozza === 0);
    document.getElementById('blog-stats-container').innerHTML = `
        <div class="stat-item"><div class="stat-number">${blogPosts.length}</div><div>Post</div></div>
        <div class="stat-item"><div class="stat-number">${blog.seguaci ? blog.seguaci.length : 0}</div><div>Followers</div></div>
    `;

    // Mostra Ruolo Utente
    if (isOwner || isCollaborator) {
        const msgEl = document.getElementById('user-role-msg');
        msgEl.style.display = 'block';
        msgEl.textContent = isOwner ? "Sei proprietario di questo blog!" : "Sei coautore di questo blog!";
    }

    // Configura Bottoni Azioni
    const actionsContainer = document.getElementById('blog-actions-container');
    if (isOwner || isCollaborator) {
        actionsContainer.innerHTML = `
            <a href="crea_post.html?blog_id=${blogId}" class="action-btn primary"><i class="fa-solid fa-feather-pointed"></i> Crea Post</a>
            ${isOwner ? `<a href="blog_modifica.html?id=${blogId}" class="action-btn primary"><i class="fa-solid fa-wrench"></i> Opzioni Blog</a>` : ''}
        `;
    } else {
        actionsContainer.innerHTML = `
            <button class="action-btn primary" id="btn-follow">
                 <i class="fas ${isFollowing ? 'fa-circle-xmark' : 'fa-circle-check'}"></i>
                 <span>${isFollowing ? 'Non seguire' : 'Segui'}</span>
            </button>
            <button class="action-btn primary" id="btn-open-recensione">
                 <i class="fas fa-star"></i> Lascia Recensione
            </button>
        `;
    }

    // Bind Recensione Overlay
    const btnOpenRecensione = document.getElementById('btn-open-recensione');
    if (btnOpenRecensione) {
        btnOpenRecensione.addEventListener('click', () => {
            if (!currentUser) { alert('Devi accedere per lasciare una recensione.'); return; }
            document.getElementById('overlayRecensione').classList.add('active');
        });
    }

    // Stars Logic
    let currentRating = 0;
    const stars = document.querySelectorAll('#starContainer .star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            currentRating = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= currentRating) {
                    s.style.color = '#ffd700'; // gold
                } else {
                    s.style.color = '#ccc';
                }
            });
        });
    });

    const btnSalvaRec = document.getElementById('btn-salva-recensione');
    if (btnSalvaRec) {
        btnSalvaRec.addEventListener('click', () => {
            const testo = document.getElementById('testoRecensione').value;
            if (currentRating === 0) {
                alert('Seleziona almeno una stella per votare!');
                return;
            }
            // Mock Saving process (no exact review schema exists in db.js yet, so we just simulate success)
            alert('Recensione salvata con successo! (Mock DB)');
            document.getElementById('overlayRecensione').classList.remove('active');
        });
    }

    // Bind Follow action if it exists
    const btnFollow = document.getElementById('btn-follow');
    if (btnFollow) {
        btnFollow.addEventListener('click', () => {
            if (!currentUser) { alert('Devi accedere per seguire questo blog.'); return; }
            const index = followers.indexOf(currentUser.id);
            if (index > -1) {
                followers.splice(index, 1); // Unfollow
            } else {
                followers.push(currentUser.id); // Follow
            }
            blog.seguaci = followers;
            window.mockDB.saveDB(db);
            window.location.reload();
        });
    }

    // Add Info button in all cases without destroying existing event listeners
    actionsContainer.insertAdjacentHTML('beforeend', `<button class="action-btn primary" id="infoBtn"><i class="fas fa-info-circle"></i> Info</button>`);

    // Bind Info Overlay
    document.getElementById('infoBtn').addEventListener('click', () => {
        document.getElementById('info-descrizione').textContent = blog.descrizione || "Nessuna descrizione disponibile.";
        document.getElementById('info-proprietario').textContent = owner ? owner.username : 'Anonimo';
        document.getElementById('infoOverlay').classList.add('active');
    });

    // Render Posts
    const postsContainer = document.getElementById('postsContainer');

    // Helper like feed.js
    const generatePostHTML = (post) => {
        let imgHtml = '';
        if (post.immagine) {
            imgHtml = `<div class="immagine-container"><img src="${post.immagine}" class="immagine-container-template-blog"></div>`;
        }

        const autorePost = db.users.find(u => u.id === post.id_autore) || { nome: 'Utente', cognome: 'Anonimo', username: 'anon' };

        return `
        <div class="container-template-blog">
            <div class="intestazione-container-template-blog">
                <img src="immagini_profilo/${escapeHtmlProfile(autorePost.immagine_profilo || 'default_profile.webp')}" class="immagine-autore">
                <div class="intestazione-info-utente">
                    <p class="nome-autore">${escapeHtmlProfile(autorePost.nome)} ${escapeHtmlProfile(autorePost.cognome)}</p>
                    <p class="username-autore">@${escapeHtmlProfile(autorePost.username)}</p>
                </div>
            </div>
            <div class="contenuto-container-template-blog">
                <h2 class="titolo-post">${escapeHtmlProfile(post.titolo)}</h2>
                <p class="data_contenuto">Pubblicato di recente</p>
                ${imgHtml}
                <div class="descrizione">
                    <p class="testo-post">${escapeHtmlProfile(post.testo)}</p>
                </div>
            </div>
        </div>
        `;
    };

    if (blogPosts.length > 0) {
        blogPosts.forEach(post => {
            postsContainer.innerHTML += generatePostHTML(post);
        });
    } else {
        postsContainer.innerHTML = '<p style="text-align: center; margin-top: 20px;">Questo blog non ha ancora alcun post.</p>';
    }

});
