/**
 * esplora_logic.js
 * Handles the logic for the "Esplora Blog", "I tuoi blog", and "Blog Seguiti" sections.
 */

document.addEventListener('DOMContentLoaded', () => {



    const currentUser = window.mockDB.getCurrentUser();
    const db = window.mockDB.getDB();

    // Funzioni helper per troncare il testo
    const troncaTesto = (testo, limite = 30) => {
        if (!testo) return '';
        if (testo.length > limite) {
            return testo.substring(0, limite) + '...';
        }
        return testo;
    };

    // Genera la card del blog
    const generaCardBlog = (blog, context) => {
        const owner = db.users.find(u => u.id === blog.id_proprietario);

        let buttonHtml = '';
        if (context === 'owner') {
            buttonHtml = `
             <button class="bottone-segui" onclick="window.location.href='blog_modifica.html?id=${blog.id}'; event.stopPropagation();">
                 <i class="fas fa-wrench"></i> Modifica
             </button>`;
        } else if (context === 'following') {
            buttonHtml = `
             <button class="bottone-segui" onclick="toggleFollow(${blog.id}); event.stopPropagation();">
                 <i class="fas fa-times-circle"></i> Smetti di seguire
             </button>`;
        } else {
            buttonHtml = `
             <button class="bottone-segui" onclick="toggleFollow(${blog.id}); event.stopPropagation();">
                 <i class="fas fa-check-circle"></i> Segui
             </button>`;
        }

        return `
        <div class="scatola-blog" data-blog-id="${blog.id}">
            <div class="contenuto-blog" onclick="window.location.href='blog.html?id=${blog.id}'" style="cursor: pointer;">
                <div class="titolo-blog">${troncaTesto(blog.titolo)}</div>
                <div class="descrizione-blog">${troncaTesto(blog.tagline)}</div>
                <div class="meta-info">
                    <div class="categoria"><i class="fas fa-tags"></i> ${blog.categoria || 'Varie'}</div>
                    <div class="seguaci"><i class="fas fa-user-group"></i> ${blog.seguaci ? blog.seguaci.length : 0}</div>
                    <div class="autore"><i class="fas fa-user"></i> ${owner ? owner.username : 'Anonimo'}</div>
                </div>
            </div>
            ${buttonHtml}
        </div>
        `;
    };

    window.toggleFollow = function (blogId) {
        if (!currentUser) { alert('Devi accedere per seguire i blog.'); return; }
        const fullDb = window.mockDB.getDB();
        const blogToUpdate = fullDb.blogs.find(b => b.id === blogId);
        if (!blogToUpdate) return;

        let followers = blogToUpdate.seguaci || [];
        const index = followers.indexOf(currentUser.id);

        if (index > -1) {
            followers.splice(index, 1);
        } else {
            followers.push(currentUser.id);
        }

        blogToUpdate.seguaci = followers;
        window.mockDB.saveDB(fullDb);
        window.location.reload();
    };

    // Funzioni di caricamento
    const caricaEsplora = () => {
        const container = document.getElementById('EsploraBlogContenitore');
        container.innerHTML = '';
        // In esplora, mostriamo i blog che non ci appartengono (Per mock ne mostriamo semplicemente tutti per ora o filtriamo)
        const blogsToExplore = db.blogs.filter(b => !currentUser || b.id_proprietario !== currentUser.id);

        if (blogsToExplore.length === 0) {
            container.innerHTML = '<p style="text-align: center; width: 100%;">Nessun blog da esplorare.</p>';
            return;
        }

        blogsToExplore.forEach(blog => {
            container.innerHTML += generaCardBlog(blog, 'explore');
        });
    };

    const caricaImeiBlog = () => {
        const container = document.getElementById('tuoiBlogContenitore');
        container.innerHTML = '';
        const myBlogs = currentUser ? db.blogs.filter(b => b.id_proprietario === currentUser.id) : [];

        if (myBlogs.length === 0) {
            container.innerHTML = '<p style="text-align: center; width: 100%;">Non possiedi ancora alcun blog.</p>';
            return;
        }

        myBlogs.forEach(blog => {
            container.innerHTML += generaCardBlog(blog, 'owner');
        });
    };

    const caricaSeguiti = () => {
        const container = document.getElementById('blogSeguitiContenitore');
        container.innerHTML = '';

        const followedBlogs = currentUser ? db.blogs.filter(b => b.seguaci && b.seguaci.includes(currentUser.id)) : [];

        if (followedBlogs.length === 0) {
            container.innerHTML = '<p style="text-align: center; width: 100%;">Non segui alcun blog.</p>';
            return;
        }

        followedBlogs.forEach(blog => {
            container.innerHTML += generaCardBlog(blog, 'following');
        });
    };

    // Segmented Control Logic
    const activeSection = (sezione) => {
        const sezioni = ['EsploraBlogSection', 'tuoiBlogSection', 'blogSeguitiSection'];
        const btns = ['EsploraBtn', 'tuoiBlogBtn', 'blogSeguitiBtn'];

        sezioni.forEach(id => document.getElementById(id).classList.remove('active'));
        btns.forEach(id => document.getElementById(id).classList.remove('active'));

        if (sezione === 'tuoiBlog') {
            document.getElementById('tuoiBlogBtn').classList.add('active');
            document.getElementById('tuoiBlogSection').classList.add('active');
            caricaImeiBlog();
        } else if (sezione === 'seguiti') {
            document.getElementById('blogSeguitiBtn').classList.add('active');
            document.getElementById('blogSeguitiSection').classList.add('active');
            caricaSeguiti();
        } else {
            document.getElementById('EsploraBtn').classList.add('active');
            document.getElementById('EsploraBlogSection').classList.add('active');
            caricaEsplora();
        }
    };

    // Event Listeners for Tabs
    document.getElementById('tuoiBlogBtn').addEventListener('click', () => activeSection('tuoiBlog'));
    document.getElementById('blogSeguitiBtn').addEventListener('click', () => activeSection('seguiti'));
    document.getElementById('EsploraBtn').addEventListener('click', () => activeSection('esplora'));

    // Init based on URL parameter ?sezione=...
    const urlParams = new URLSearchParams(window.location.search);
    const initSection = urlParams.get('sezione') || 'esplora';
    activeSection(initSection);
});
