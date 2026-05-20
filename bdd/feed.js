/**
 * feed.js
 * Renders the homepage feed by fetching posts from the mockDB.
 */

// ── HTML Escape Utility ──
function escapeHtmlFeed(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', () => {

    // Ensure db is ready and user is logged in
    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) return;

    const contentArea = document.getElementById('contentArea');
    const loading = document.getElementById('loading');
    let offset = 0;
    const limit = 5; // Load 5 at a time
    let allPosts = [];

    // Helper to format dates like "Pubblicato il..."
    const timeElapsedString = (isoDate) => {
        const date = new Date(isoDate);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays >= 1) {
            return `Pubblicato il ${date.toLocaleDateString('it-IT')}`;
        }
        return 'Pubblicato di recente';
    };

    // Card Template Generator
    const generatePostHTML = (post) => {
        // Simplified version of the PHP `contenuti_genera.php`
        const isAuthor = post.id_autore === window.mockDB.getCurrentUser().id;

        let imgHtml = '';
        if (post.immagine) { // For simplicity, in this mock we might set it to a base64 string or url
            imgHtml = `
             <div class="immagine-container">
                 <img src="${post.immagine}" class="immagine-container-template-blog">
             </div>`;
        }

        return `
        <div class="container-template-blog" data-post-id="${post.id}">
            <div class="intestazione-container-template-blog">
                <img src="immagini_profilo/${escapeHtmlFeed(post.author.immagine_profilo || 'Pic1.webp')}" alt="Autore" class="immagine-autore">
                <div class="intestazione-info-utente">
                    <p class="nome-autore">${escapeHtmlFeed(post.author.nome)} ${escapeHtmlFeed(post.author.cognome)}</p>
                    <p class="username-autore">@${escapeHtmlFeed(post.author.username)} 
                        ${post.author.isPremium ? '<span class="badge-premium"><i class="fas fa-crown"></i></span>' : ''}
                    </p>
                </div>
                <div class="nome-blog">
                    <a href="blog.html?id=${post.blog.id}" class="distintivo-blog">${escapeHtmlFeed(post.blog.titolo)}</a>
                </div>
            </div>

            <div class="contenuto-container-template-blog">
                <div class="categoria-blog">#${escapeHtmlFeed(post.blog.categoria || 'Varie')}</div>
                <h2 class="titolo-post">${escapeHtmlFeed(post.titolo)}</h2>
                <p class="data_contenuto">${timeElapsedString(post.data_ora)}</p>
                
                ${imgHtml}
                
                <div class="descrizione">
                    <p class="testo-post">${escapeHtmlFeed(post.testo)}</p>
                    <div class="bottoni">
                        <div class="bottoni-gruppo-sinistra">
                            <button class="bottone-default bottone-mi-piace" data-post-id="${post.id}">
                                <i class="${(post.likes_users && post.likes_users.includes(window.mockDB.getCurrentUser().id)) ? 'fas' : 'far'} fa-heart" style="margin-right: 5px;"></i>
                                <span class="bottone-default__contenuto">
                                    <span class="bottone-default__testo">Mi Piace</span>
                                    <span class="contatore-like">${post.likes || 0}</span>
                                </span>
                            </button>
                            <button class="bottone-default bottone-commenta" data-post-id="${post.id}">
                                <i class="fa-regular fa-comment" style="margin-right: 5px;"></i>
                                <span class="bottone-default__contenuto"><span class="bottone-default__testo">Commenta</span></span>
                            </button>
                        </div>
                        
                        <!-- Area dei commenti nascosta per default -->
                        <div class="sezione-commenti" style="display: none;">
                            <div class="commenti-esistenti"></div>
                            <div class="nuovo-commento">
                                <textarea placeholder="Scrivi un commento..."></textarea>
                                <button class="invia-commento" data-post-id="${post.id}">Invia</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    const loadPosts = () => {
        if (!contentArea) return;
        loading.style.display = 'block';

        // Simulate network delay
        setTimeout(() => {
            if (allPosts.length === 0) {
                // Fetch all posts initially and cache them
                allPosts = window.mockDB.getAllPosts();
            }

            const postsToRender = allPosts.slice(offset, offset + limit);

            if (postsToRender.length > 0) {
                postsToRender.forEach(post => {
                    contentArea.innerHTML += generatePostHTML(post);
                });
                offset += limit;
            } else if (offset === 0) {
                contentArea.innerHTML = '<p style="text-align: center; margin-top: 20px;">Nessun post trovato.</p>';
            }

            loading.style.display = 'none';
        }, 300); // 300ms fake delay
    };

    // Initial Load
    loadPosts();

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            // Load more if available
            if (offset < allPosts.length) {
                loadPosts();
            }
        }
    });

});
