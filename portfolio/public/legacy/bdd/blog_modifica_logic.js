/**
 * blog_modifica_logic.js
 * Handle updating existing Blogs via JS LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {

    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));

    if (!blogId) {
        alert("Blog non valido.");
        window.location.href = 'index.html';
        return;
    }

    const currentUser = window.mockDB.getCurrentUser();
    const fullDb = window.mockDB.getDB();
    const blogIndex = fullDb.blogs.findIndex(b => b.id === blogId);

    if (blogIndex === -1) {
        alert("Blog non trovato.");
        window.location.href = 'index.html';
        return;
    }

    const blog = fullDb.blogs[blogIndex];
    if (blog.id_proprietario !== currentUser.id) {
        alert("Non sei il proprietario di questo blog.");
        window.location.href = 'index.html';
        return;
    }

    // Populate Fields
    document.getElementById('titoloBlog').value = blog.titolo;
    document.getElementById('taglineBlog').value = blog.tagline;
    document.getElementById('descrizioneBlog').value = blog.descrizione || '';
    document.getElementById('categoria').value = blog.categoria || '';
    document.getElementById('tema').value = blog.id_tema || '1';

    // Return button
    document.getElementById('bottoneTornaBlog').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `blog.html?id=${blogId}`;
    });

    // Save Handling
    const btnSalva = document.getElementById('btnSalvaModifiche');

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

        // Apply edits to DB
        fullDb.blogs[blogIndex].titolo = titolo;
        fullDb.blogs[blogIndex].tagline = tagline;
        fullDb.blogs[blogIndex].descrizione = descrizione;
        fullDb.blogs[blogIndex].categoria = categoria;
        fullDb.blogs[blogIndex].id_tema = tema;

        window.mockDB.saveDB(fullDb);

        alert('Blog modificato con successo!');
        window.location.href = `blog.html?id=${blogId}`;
    });

});
