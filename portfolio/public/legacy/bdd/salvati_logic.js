/**
 * salvati_logic.js
 * Logic for displaying saved posts from localStorage.
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

    // For mock purposes: Assume there's an array of saved post IDs per user
    // However, our db.js doesn't specifically have a 'savedPosts' array for users yet.
    // We will just filter posts that have id=1 and id=2 as a mocked representation
    const savedPostIds = [1, 2];

    const savedPosts = fullDb.posts.filter(p => savedPostIds.includes(p.id) && p.bozza === 0);

    if (savedPosts.length === 0) {
        contentArea.innerHTML = '<p style="text-align: center; margin-top: 20px;">Non hai ancora salvato nessun post.</p>';
        return;
    }

    const generatePostHTML = (post) => {
        const blog = fullDb.blogs.find(b => b.id === post.id_blog);
        const owner = fullDb.users.find(u => u.id === post.id_autore);

        let imgHtml = '';
        if (post.immagine) {
            imgHtml = `<div class="immagine-container"><img src="${post.immagine}" class="immagine-container-template-blog"></div>`;
        }

        return `
        <div class="scatola-blog" style="width: 100%; max-width: 600px; margin-bottom: 20px;">
            <div class="contenuto-blog">
               <h4><a href="blog.html?id=${blog ? blog.id : 1}" style="text-decoration: none; color: inherit;">${post.titolo}</a></h4>
               <p style="font-size: 14px; color: #ddd;">Da: @${owner ? owner.username : 'Anonimo'} nel blog "${blog ? blog.titolo : 'Varie'}"</p>
               ${imgHtml}
               <p style="margin-top: 10px;">${post.testo}</p>
            </div>
            <button class="bottone-segui" onclick="alert('Rimozione salvato Mock')">Rimuovi dai salvati</button>
        </div>
        `;
    };

    let htmlOutput = '';
    savedPosts.forEach(p => {
        htmlOutput += generatePostHTML(p);
    });
    contentArea.innerHTML = htmlOutput;

});
