/**
 * crea_post_logic.js
 * Logic for creating a post, uploading an image (mock), and interacting with db.js
 */

document.addEventListener('DOMContentLoaded', () => {

    // Ensure db is loaded and user is authenticated
    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = window.mockDB.getCurrentUser();
    const isPremium = currentUser.isPremium === 1;

    // Warning text if not premium
    if (!isPremium) {
        const premiumWarn = document.getElementById('premium-warning');
        if (premiumWarn) premiumWarn.style.display = 'block';
    }

    // Load available blogs for this user (where they are owner. In a real app we'd also check collaborators)
    const db = window.mockDB.getDB();
    const userBlogs = db.blogs.filter(b => b.id_proprietario === currentUser.id);
    const hasBlogs = userBlogs.length > 0;

    // Fix Torna Home Button
    const btnTornaHome = document.getElementById('bottoneTornaHome');
    if (btnTornaHome) {
        btnTornaHome.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    const actionContainer = document.getElementById('blog-action-container');
    const customSelectOptions = document.getElementById('customOptionsBlog');
    const selectedBlogLabel = document.getElementById('selectedBlog');
    const hiddenBlogInput = document.getElementById('blog');

    if (hasBlogs) {
        // Setup Submit Area
        actionContainer.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" id="bozzaCheckbox" name="bozza" ${!isPremium ? 'disabled' : ''}>
                <label for="bozzaCheckbox">Salva come bozza</label>
            </div>
            <button type="button" id="bottonePubblica" class="bottone bottone-invia">
                <i class="fas fa-paper-plane"></i> Avanti
            </button>
        `;

        // Setup the Custom Dropdown with User's Blogs
        selectedBlogLabel.textContent = userBlogs[0].titolo;
        hiddenBlogInput.value = userBlogs[0].id; // default

        userBlogs.forEach(blog => {
            const span = document.createElement('span');
            span.className = 'custom-option';
            span.setAttribute('data-value', blog.id);
            span.textContent = blog.titolo;
            customSelectOptions.appendChild(span);
        });

    } else {
        // User has no blogs, prompt them to create one
        actionContainer.innerHTML = `
            <button type="button" id="bottoneCreaBlogi" class="bottone bottone-invia" onclick="window.location.href='crea_blog.html'">
                <i class="fas fa-plus-circle"></i> Crea un blog
            </button>
        `;
    }

    // Update Counter Logic
    const setupCharCounter = (inputId, counterId, maxVal) => {
        const el = document.getElementById(inputId);
        const counter = document.getElementById(counterId);
        if (!el || !counter) return;

        el.addEventListener('input', () => {
            const len = el.value.length;
            counter.textContent = len;
            if (len >= maxVal) {
                counter.classList.add('limite');
            } else {
                counter.classList.remove('limite');
            }
        });
    };

    setupCharCounter('inputTitolo', 'contatoreCaratteriTitolo', 100);
    setupCharCounter('editor', 'contatoreCaratteriContenuto', 5000);
    setupCharCounter('inputAltDescrizione', 'contatoreCaratteriAlt', 250);

    // Overlay Management Helper
    const apriOverlay = (id) => document.getElementById(id).classList.add('active');
    const chiudiOverlay = (id) => document.getElementById(id).classList.remove('active');

    // Custom Select Logic
    const customSelect = document.getElementById('customSelectBlog');
    if (customSelect) {
        const trigger = customSelect.querySelector('.custom-select-trigger');
        trigger.addEventListener('click', () => {
            customSelect.classList.toggle('open');
        });

        document.querySelectorAll('#customOptionsBlog .custom-option').forEach(option => {
            option.addEventListener('click', function () {
                hiddenBlogInput.value = this.getAttribute('data-value');
                selectedBlogLabel.textContent = this.textContent;
                customSelect.classList.remove('open');
            });
        });

        document.addEventListener('click', function (e) {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    // Premium Check on Bozza
    document.addEventListener('click', (e) => {
        if (e.target.id === 'bozzaCheckbox' && !isPremium) {
            e.preventDefault();
            apriOverlay('overlayPremium');
        }
    });

    // Image Upload Logic (Mocked with Base64)
    let base64ImageMock = null;
    const inputImmagine = document.getElementById('inputImmagine');
    const previewImmagine = document.getElementById('previewImmagine');
    const immagineCaricata = document.getElementById('immagineCaricata');

    document.getElementById('caricaImmagine').addEventListener('click', () => apriOverlay('overlayImmagine'));
    document.getElementById('selezionaImmagine').addEventListener('click', () => inputImmagine.click());

    inputImmagine.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                mostraMessaggio('Solo immagini PNG o JPEG', 'errore');
                return;
            }
            if (file.size > 1048576) {
                mostraMessaggio('Immagine troppo grande (Max 1MB)', 'errore');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                immagineCaricata.src = e.target.result;
                base64ImageMock = e.target.result; // Store base64 representation of the image
                previewImmagine.style.display = 'block';
                document.getElementById('rimuoviImmagine').style.display = 'inline-block';
                document.getElementById('selezionaImmagine').textContent = 'Cambia Immagine';
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('rimuoviImmagine').addEventListener('click', function () {
        inputImmagine.value = '';
        base64ImageMock = null;
        previewImmagine.style.display = 'none';
        this.style.display = 'none';
        document.getElementById('selezionaImmagine').textContent = 'Seleziona Immagine';
    });

    document.getElementById('confermaImmagine').addEventListener('click', () => {
        document.getElementById('alt_descrizione').value = document.getElementById('inputAltDescrizione').value;
        const btn = document.getElementById('caricaImmagine');
        if (base64ImageMock) {
            btn.innerHTML = '<i class="fas fa-check"></i> Immagine Caricata';
        } else {
            btn.innerHTML = '<i class="fas fa-image"></i> Carica Immagine';
        }
        chiudiOverlay('overlayImmagine');
    });

    document.getElementById('annullaImmagine').addEventListener('click', () => chiudiOverlay('overlayImmagine'));

    // Handle submit flow
    const bottonePubblica = document.getElementById('bottonePubblica');
    if (bottonePubblica) {
        bottonePubblica.addEventListener('click', () => {
            const titolo = document.getElementById('inputTitolo').value;
            const contenuto = document.getElementById('editor').value;
            const isBozza = document.getElementById('bozzaCheckbox').checked;

            if (!isBozza && (!titolo || !contenuto)) {
                mostraMessaggio('Devi compilare Titolo e Contenuto.', 'errore');
                return;
            }

            apriOverlay('overlayPubblica');
        });
    }

    document.getElementById('annullaPubblica')?.addEventListener('click', () => chiudiOverlay('overlayPubblica'));

    // Final Action: Save Post -> localStorage
    document.getElementById('confermaPubblica')?.addEventListener('click', () => {
        const fullDb = window.mockDB.getDB();

        const newPost = {
            id: fullDb.posts.length > 0 ? Math.max(...fullDb.posts.map(p => p.id)) + 1 : 1,
            titolo: document.getElementById('inputTitolo').value || 'Bozza senza titolo',
            testo: document.getElementById('editor').value || '...',
            immagine: base64ImageMock,
            alt_descrizione: document.getElementById('alt_descrizione').value,
            data_ora: new Date().toISOString(),
            bozza: document.getElementById('bozzaCheckbox').checked ? 1 : 0,
            id_blog: parseInt(hiddenBlogInput.value),
            id_autore: currentUser.id
        };

        fullDb.posts.push(newPost);
        window.mockDB.saveDB(fullDb);

        // Redirect To valid page (we'll send them to index)
        window.location.href = 'index.html';
    });
});
