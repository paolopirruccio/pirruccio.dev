/**
 * impostazioni_gestisci.js
 * Settings page logic using mockDB (localStorage).
 */
$(document).ready(function () {
    function showOverlay(overlayId) {
        $('#' + overlayId).addClass('active');
    }

    function hideOverlay(overlayId) {
        $('#' + overlayId).removeClass('active');
    }

    // Helper: show a toast message
    function showMessage(msg, type) {
        mostraMessaggio(msg, type === 'error' ? 'errore' : type === 'success' ? 'successo' : 'info');
    }

    $('form').submit(function (e) {
        e.preventDefault();
        var overlayId = $(this).closest('.overlay').attr('id');

        if (!validateFormData(this)) {
            showMessage('Controlla i dati inseriti. Evita caratteri non consentiti', 'error');
            return;
        }

        // Get form fields
        if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
            showMessage('Devi effettuare il login.', 'error');
            return;
        }

        const fullDb = window.mockDB.getDB();
        const currentUser = window.mockDB.getCurrentUser();
        const uIndex = fullDb.users.findIndex(u => u.id === currentUser.id);

        if (uIndex === -1) {
            showMessage('Utente non trovato.', 'error');
            return;
        }

        // Update fields from form inputs
        const nome = $('#inputNome').val();
        const cognome = $('#inputCognome').val();
        const username = $('#inputUsername').val();
        const bio = $('#inputBio').val();
        const immagine = $('#inputImmagine').val();

        if (nome) fullDb.users[uIndex].nome = nome;
        if (cognome) fullDb.users[uIndex].cognome = cognome;
        if (username) fullDb.users[uIndex].username = username;
        if (bio !== undefined) fullDb.users[uIndex].bio = bio;
        if (immagine) fullDb.users[uIndex].immagine_profilo = immagine + '.webp';

        fullDb.currentUser = fullDb.users[uIndex];
        window.mockDB.saveDB(fullDb);

        if (overlayId) hideOverlay(overlayId);
        showMessage('Profilo aggiornato con successo!', 'success');
        location.reload();
    });

    $('#formCancellaAccount').submit(function (e) {
        e.preventDefault();
        if (!confirm('Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile.')) return;

        const fullDb = window.mockDB.getDB();
        const currentUser = window.mockDB.getCurrentUser();

        // Remove user
        fullDb.users = fullDb.users.filter(u => u.id !== currentUser.id);
        // Remove user's blogs and posts
        const userBlogIds = fullDb.blogs.filter(b => b.id_proprietario === currentUser.id).map(b => b.id);
        fullDb.blogs = fullDb.blogs.filter(b => b.id_proprietario !== currentUser.id);
        fullDb.posts = fullDb.posts.filter(p => !userBlogIds.includes(p.id_blog) && p.id_autore !== currentUser.id);
        fullDb.comments = (fullDb.comments || []).filter(c => c.id_autore !== currentUser.id);
        fullDb.currentUser = null;
        window.mockDB.saveDB(fullDb);

        showMessage('Account eliminato con successo.', 'success');
        window.location.href = 'login.html';
    });

    const customSelect = document.querySelector('.custom-select');
    if (customSelect) {
        const customSelectTrigger = customSelect.querySelector('.custom-select-trigger');
        const customOptions = customSelect.querySelectorAll('.custom-option');
        const hiddenSelect = document.getElementById('inputImmagine');

        customSelectTrigger.addEventListener('click', function () {
            customSelect.classList.toggle('open');
        });

        customOptions.forEach(option => {
            option.addEventListener('click', function () {
                const value = option.getAttribute('data-value');
                const label = option.textContent;

                if (option.classList.contains('disabled')) {
                    return;
                }

                hiddenSelect.value = value;
                customSelectTrigger.querySelector('#selectedImage').textContent = label;
                customSelect.classList.remove('open');
            });
        });

        document.addEventListener('click', function (e) {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    window.showOverlay = showOverlay;
    window.hideOverlay = hideOverlay;

    function updateCharCount(input, counter, maxLength) {
        var currentLength = input.val().length;
        counter.text(currentLength);

        if (currentLength >= maxLength) {
            counter.addClass('limite').removeClass('avviso');
        } else if (currentLength >= maxLength * 0.8) {
            counter.addClass('avviso').removeClass('limite');
        } else {
            counter.removeClass('avviso limite');
        }
    }

    $('#inputNome').on('input', function () {
        updateCharCount($(this), $('#contatoreCaratteriNome'), 20);
        capitalizeInput($(this));
    });

    $('#inputCognome').on('input', function () {
        updateCharCount($(this), $('#contatoreCaratteriCognome'), 50);
        capitalizeInput($(this));
    });

    $('#inputUsername').on('input', function () {
        updateCharCount($(this), $('#contatoreCaratteriUsername'), 10);
        $(this).val($(this).val().replace(/\s/g, ''));
    });

    $('#inputBio').on('input', function () {
        updateCharCount($(this), $('#contatoreCaratteriBio'), 250);
    });

    updateCharCount($('#inputNome'), $('#contatoreCaratteriNome'), 20);
    updateCharCount($('#inputCognome'), $('#contatoreCaratteriCognome'), 50);
    updateCharCount($('#inputUsername'), $('#contatoreCaratteriUsername'), 10);
    updateCharCount($('#inputBio'), $('#contatoreCaratteriBio'), 250);

    function validateFormData(form) {
        var valid = true;
        $(form).find('input, textarea').each(function () {
            var value = $(this).val().trim();
            if (value === '') return true;
            if (/[<>{}[\]\\/]/.test(value)) {
                valid = false;
                return false;
            }
        });
        return valid;
    }

    function capitalizeInput(input) {
        var value = input.val();
        var capitalized = value.replace(/\b\w/g, function (l) {
            return l.toUpperCase();
        }).replace(/\B\w/g, function (l) {
            return l.toLowerCase();
        });
        input.val(capitalized);
    }
});
