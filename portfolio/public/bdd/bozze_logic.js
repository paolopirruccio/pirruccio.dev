/**
 * bozze_logic.js
 * Logic for displaying draft posts authored by the user from localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {

    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const fullDb = window.mockDB.getDB();
    const currentUser = window.mockDB.getCurrentUser();

    if (currentUser.isPremium !== 1) {
        document.getElementById('premium-lock').style.display = 'block';
        return;
    }

    const contentArea = document.getElementById('contentArea');

    // Fetch user's drafts (bozza === 1)
    const drafts = fullDb.posts.filter(p => p.id_autore === currentUser.id && p.bozza === 1);

    if (drafts.length === 0) {
        contentArea.innerHTML = '<p style="text-align: center; margin-top: 20px;">Non hai nessuna bozza salvata.</p>';
        return;
    }

    const generateDraftHTML = (post) => {
        const blog = fullDb.blogs.find(b => b.id === post.id_blog);

        return `
        <div class="scatola-blog" style="width: 100%; max-width: 600px; margin-bottom: 20px; border-left: 5px solid #FFC107;">
            <div class="contenuto-blog">
               <h4><a href="blog.html?id=${blog ? blog.id : 1}" style="text-decoration: none; color: inherit;">${post.titolo}</a></h4>
               <p style="font-size: 14px; color: #ddd;">Bozza in: "${blog ? blog.titolo : 'Nessun Blog Assegnato'}"</p>
               <p style="margin-top: 10px;">${post.testo.substring(0, 100)}...</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="bottone-segui" style="background-color: #4CAF50;" onclick="alert('Pubblica post Mock')">Pubblica</button>
                <button class="bottone-segui" style="background-color: #f44336;" onclick="alert('Elimina bozza Mock')">Elimina</button>
            </div>
        </div>
        `;
    };

    let htmlOutput = '';
    drafts.forEach(p => {
        htmlOutput += generateDraftHTML(p);
    });
    contentArea.innerHTML = htmlOutput;

});
