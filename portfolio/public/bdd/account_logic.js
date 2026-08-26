/**
 * account_logic.js
 * Logic for displaying user stats on the Account page and handling Settings updates.
 */

document.addEventListener('DOMContentLoaded', () => {

    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = window.mockDB.getCurrentUser();
    const fullDb = window.mockDB.getDB();

    // 1. ACCOUNT PAGE LOGIC
    const isAccountPage = window.location.pathname.includes('account.html');
    if (isAccountPage) {
        // Popola Info base
        document.getElementById('acc-img').src = `immagini_profilo/${currentUser.immagine_profilo || 'Pic1.webp'}`;
        document.getElementById('acc-nomecompleto').textContent = `${currentUser.nome} ${currentUser.cognome}`;
        document.getElementById('acc-username').textContent = `@${currentUser.username}`;
        document.getElementById('acc-email').textContent = currentUser.email;

        // Gestione Bio
        if (currentUser.bio && currentUser.bio.trim() !== '') {
            document.getElementById('acc-bio-container').style.display = 'block';
            document.getElementById('acc-bio-testo').textContent = currentUser.bio;
        }

        // Gestione Piano
        const badgeContainer = document.getElementById('acc-piano-badge');
        const titoloPiano = document.getElementById('piano-titolo-container');
        if (currentUser.isPremium === 1) {
            badgeContainer.innerHTML = '<div class="distintivo-piano"><i class="fas fa-crown"></i> Piano Pro</div>';
            titoloPiano.innerHTML = '<h3>Piano Pro</h3>';
        } else {
            badgeContainer.innerHTML = '<div class="distintivo-piano-standard"><i class="fas fa-star-half-stroke"></i> Piano Standard</div>';
            titoloPiano.innerHTML = '<h3>Piano Standard</h3>';
        }

        // Calcolo Statistiche
        const postAuthored = fullDb.posts.filter(p => p.id_autore === currentUser.id);
        const blogsOwned = fullDb.blogs.filter(b => b.id_proprietario === currentUser.id);

        document.getElementById('stat-post').textContent = postAuthored.length;
        document.getElementById('stat-gestiti').textContent = blogsOwned.length;
        // Mock 'Seguiti' number (since we aren't modeling full follower tables)
        document.getElementById('stat-seguiti').textContent = 1;
    }

    // 2. IMPOSTAZIONI PAGE LOGIC
    const isSettingsPage = window.location.pathname.includes('impostazioni.html');
    if (isSettingsPage) {
        // Pre-fill fields
        document.getElementById('imp-nome').value = currentUser.nome;
        document.getElementById('imp-cognome').value = currentUser.cognome;
        document.getElementById('imp-username').value = currentUser.username;
        document.getElementById('imp-bio').value = currentUser.bio || '';
        document.getElementById('imp-pic').value = currentUser.immagine_profilo || 'Pic1';

        // Custom update function to be accessed in inline onclick (see impostazioni.html)
        window.mockUpdatingProfile = function (field, newValue) {
            currentUser[field] = newValue;
            const uIndex = fullDb.users.findIndex(u => u.id === currentUser.id);
            if (uIndex > -1) {
                fullDb.users[uIndex][field] = newValue;
                fullDb.currentUser = currentUser;
                window.mockDB.saveDB(fullDb);
            }
        };
    }

});
