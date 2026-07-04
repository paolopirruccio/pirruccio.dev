/* ══════════════════════════════════════════════════════════════
   VIAGGI — cartoline per la sezione della home
   Per aggiungere un viaggio:
   1. metti la foto .jpg in questa cartella (viaggi/)
   2. aggiungi una riga qui sotto: file, posto, anno
   Le foto qui presenti sono placeholder generati: sostituiscile!
   ══════════════════════════════════════════════════════════════ */
window.VIAGGI = [
    { file: 'siracusa-2023.jpg', posto: 'Siracusa', anno: 2023 },
    { file: 'dolomiti-2024.jpg', posto: 'Dolomiti', anno: 2024 },
    { file: 'lisbona-2024.jpg', posto: 'Lisbona', anno: 2024 },
    { file: 'berlino-2025.jpg', posto: 'Berlino', anno: 2025 },
];

/* Renderer: costruisce le cartoline dentro #viaggi-list */
(function () {
    function render() {
        var list = document.getElementById('viaggi-list');
        if (!list || !window.VIAGGI || !window.VIAGGI.length) return;

        var frag = document.createDocumentFragment();

        window.VIAGGI.forEach(function (v, i) {
            var card = document.createElement('div');
            card.className = 'postcard';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', v.posto + ', ' + v.anno + ' — gira la cartolina');
            card.style.setProperty('--pc-rot', ((i % 2 === 0 ? -1 : 1) * (1.5 + (i * 37) % 3 * 0.7)) + 'deg');
            card.style.setProperty('--pc-delay', (i * 70) + 'ms');

            card.innerHTML =
                '<div class="postcard-inner">' +
                '  <div class="postcard-front">' +
                '    <div class="postcard-tape"></div>' +
                '    <div class="postcard-photo"><img src="viaggi/' + v.file + '" alt="' + v.posto + ' (' + v.anno + ')" loading="lazy"></div>' +
                '    <div class="postcard-caption">' +
                '      <span class="postcard-place">' + v.posto + '</span>' +
                '      <span class="postcard-year">' + v.anno + '</span>' +
                '    </div>' +
                '  </div>' +
                '  <div class="postcard-back">' +
                '    <div class="postcard-stamp"><span>🧭</span></div>' +
                '    <div class="postcard-postmark"><span>' + v.anno + '</span></div>' +
                '    <div class="postcard-msg">' +
                '      <p class="postcard-greeting">Saluti da ' + v.posto + '!</p>' +
                '      <p class="postcard-note">' + v.anno + '</p>' +
                '    </div>' +
                '    <div class="postcard-divider"></div>' +
                '    <div class="postcard-address">' +
                '      <div class="address-line"></div>' +
                '      <div class="address-line"></div>' +
                '      <div class="address-line short"></div>' +
                '    </div>' +
                '  </div>' +
                '</div>';

            // foto mancante → rimuovi la cartolina senza rompere il layout
            card.querySelector('img').addEventListener('error', function () { card.remove(); });

            var flip = function () { card.classList.toggle('flipped'); };
            card.addEventListener('click', flip);
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
            });

            frag.appendChild(card);
        });

        list.appendChild(frag);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
