/**
 * cerca_logic.js
 * Search logic using regex applied to mock localstorage.
 */

document.addEventListener('DOMContentLoaded', () => {

    const db = window.mockDB.getDB();
    let currentFilter = 'post';
    let searchQuery = '';

    const inputRicerca = document.getElementById('inputRicerca');
    const risultatiRicerca = document.getElementById('risultatiRicerca');
    const pilloleFiltro = document.querySelectorAll('.pillola-filtro');

    // UI Updates
    const updatePlaceholder = () => {
        switch (currentFilter) {
            case 'post':
                inputRicerca.setAttribute('placeholder', 'Cerca post...');
                break;
            case 'autore':
                inputRicerca.setAttribute('placeholder', 'Cerca per username o nome autore...');
                break;
            case 'blog':
                inputRicerca.setAttribute('placeholder', 'Cerca per titolo del blog...');
                break;
            case 'categoria':
                inputRicerca.setAttribute('placeholder', 'Cerca per nome categoria...');
                break;
        }
    };

    // Filter Listeners
    pilloleFiltro.forEach(pillola => {
        pillola.addEventListener('click', (e) => {
            pilloleFiltro.forEach(p => p.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            currentFilter = target.getAttribute('data-filter');
            updatePlaceholder();
            eseguiRicerca();
        });
    });

    inputRicerca.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        eseguiRicerca();
    });

    // Risultati Helper Template
    const generaCardBlog = (blog) => {
        const owner = db.users.find(u => u.id === blog.id_proprietario);
        return `
        <div class="scatola-blog" style="width: 100%; max-width: 600px; margin-bottom: 20px;">
            <div class="contenuto-blog" onclick="window.location.href='blog.html?id=${blog.id}'" style="cursor: pointer;">
                <div class="titolo-blog">${blog.titolo}</div>
                <div class="descrizione-blog">${blog.tagline}</div>
                <div class="meta-info">
                    <div class="categoria"><i class="fas fa-tags"></i> ${blog.categoria || 'Varie'}</div>
                    <div class="autore"><i class="fas fa-user"></i> ${owner ? owner.username : 'Anonimo'}</div>
                </div>
            </div>
            <button class="bottone-segui" onclick="window.location.href='blog.html?id=${blog.id}'">Visita Blog</button>
        </div>
        `;
    };

    const generaPostLine = (post) => {
        const blog = db.blogs.find(b => b.id === post.id_blog);
        const owner = db.users.find(u => u.id === post.id_autore);
        return `
        <div class="scatola-blog" style="width: 100%; max-width: 600px; margin-bottom: 20px; text-align: left;">
            <div class="contenuto-blog">
               <h4><a href="blog.html?id=${blog.id}" style="text-decoration: none; color: inherit;">${post.titolo}</a></h4>
               <p style="font-size: 14px; color: #ddd;">Da: @${owner ? owner.username : 'Anonimo'} nel blog "${blog ? blog.titolo : 'Varie'}"</p>
               <p style="margin-top: 10px;">${post.testo.substring(0, 100)}...</p>
            </div>
        </div>
        `;
    };

    // Main Search logic
    const eseguiRicerca = () => {
        if (!searchQuery) {
            risultatiRicerca.innerHTML = '';
            return;
        }

        risultatiRicerca.innerHTML = '';
        const lowerResMatch = term => (term || '').toLowerCase().includes(searchQuery);
        let resultsHTML = '';

        if (currentFilter === 'blog') {
            const blogs = db.blogs.filter(b => lowerResMatch(b.titolo) || lowerResMatch(b.tagline) || lowerResMatch(b.descrizione));

            if (blogs.length === 0) { resultsHTML = '<p>Nessun blog trovato.</p>'; }
            else { blogs.forEach(b => { resultsHTML += generaCardBlog(b); }); }

        } else if (currentFilter === 'post') {
            const posts = db.posts.filter(p => lowerResMatch(p.titolo) || lowerResMatch(p.testo));

            if (posts.length === 0) { resultsHTML = '<p>Nessun post trovato.</p>'; }
            else { posts.forEach(p => { resultsHTML += generaPostLine(p); }); }

        } else if (currentFilter === 'autore') {
            // Cerca utenti poi filtra i post per quegli utenti
            const matchesUsers = db.users.filter(u => lowerResMatch(u.username) || lowerResMatch(u.nome) || lowerResMatch(u.cognome));
            const userIds = matchesUsers.map(u => u.id);

            const posts = db.posts.filter(p => userIds.includes(p.id_autore));
            if (posts.length === 0) { resultsHTML = '<p>Nessun post per l\'autore specificato.</p>'; }
            else { posts.forEach(p => { resultsHTML += generaPostLine(p); }); }

        } else if (currentFilter === 'categoria') {
            // Find categories matching query
            const targetBlogs = db.blogs.filter(b => lowerResMatch(b.categoria));
            if (targetBlogs.length === 0) { resultsHTML = '<p>Nessuna categoria corrispondente o blog con tale categoria trovati.</p>'; }
            else { targetBlogs.forEach(b => { resultsHTML += generaCardBlog(b); }); }
        }

        risultatiRicerca.innerHTML = resultsHTML;
    };

    // Initialize state
    updatePlaceholder();
});
