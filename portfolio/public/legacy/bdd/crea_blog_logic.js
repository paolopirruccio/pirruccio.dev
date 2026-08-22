/**
 * crea_blog_logic.js
 * Handle JS validation and LocalStorage insertions for new Blogs.
 */

document.addEventListener('DOMContentLoaded', () => {

    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = window.mockDB.getCurrentUser();
    const fullDb = window.mockDB.getDB();

    const btnSalva = document.getElementById('btnSalvaBlog');

    // Setup input character counters (omitted full logic here to keep concise)

    btnSalva.addEventListener('click', () => {
        const titolo = document.getElementById('titoloBlog').value.trim();
        const tagline = document.getElementById('taglineBlog').value.trim();
        const descrizione = document.getElementById('descrizioneBlog').value.trim();
        const categoria = document.getElementById('categoria').value.trim();
        const tema = document.getElementById('tema').value;

        if (!titolo || !tagline || !descrizione || !categoria) {
            alert('Tutti i campi devono essere compilati.');
            return;
        }

        if (tema !== '1' && currentUser.isPremium !== 1) {
            alert('I temi avanzati sono disponibili solo per gli utenti Premium!');
            return;
        }

        // Generate ID
        const newId = fullDb.blogs.length > 0 ? Math.max(...fullDb.blogs.map(b => b.id)) + 1 : 1;

        const newBlog = {
            id: newId,
            titolo: titolo,
            tagline: tagline,
            descrizione: descrizione,
            categoria: categoria,
            id_tema: tema,
            id_proprietario: currentUser.id,
            seguaci: []
        };

        fullDb.blogs.push(newBlog);
        window.mockDB.saveDB(fullDb);

        alert('Blog creato con successo!');
        window.location.href = `blog.html?id=${newId}`;
    });

});
