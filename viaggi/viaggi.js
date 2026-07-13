/* ══════════════════════════════════════════════════════════════
   VIAGGI — foto polaroid per la sezione della home
   Per aggiungere un viaggio:
   1. metti la foto (.jpg/.jpeg/.png/.webp — qualsiasi proporzione) in
      questa cartella (viaggi/)
   2. aggiungi una riga qui sotto: file, posto, anno
   ══════════════════════════════════════════════════════════════ */
window.VIAGGI = [
    { file: 'siracusa-2023.jpg', posto: 'Siracusa', anno: 2023 },
    { file: 'dolomiti-2024.jpg', posto: 'Dolomiti', anno: 2024 },
    { file: 'lisbona-2024.jpg', posto: 'Lisbona', anno: 2024 },
    { file: 'berlino-2025.jpg', posto: 'Berlino', anno: 2025 },
];

/* Renderer: costruisce le polaroid dentro #viaggi-list */
(function () {
    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function render() {
        var list = document.getElementById('viaggi-list');
        if (!list || !window.VIAGGI || !window.VIAGGI.length) return;

        var frag = document.createDocumentFragment();

        window.VIAGGI.forEach(function (v, i) {
            var posto = esc(v.posto);
            var anno = esc(v.anno);

            var card = document.createElement('div');
            card.className = 'polaroid';
            card.setAttribute('role', 'img');
            card.setAttribute('aria-label', posto + ', ' + anno);
            // rotazione alternata, un po' storta
            card.style.setProperty('--pc-rot', ((i % 2 === 0 ? -1 : 1) * (1.5 + (i * 37) % 3 * 0.7)) + 'deg');

            card.innerHTML =
                '<div class="polaroid-photo">' +
                '  <img src="viaggi/' + esc(v.file) + '" alt="' + posto + ' (' + anno + ')" loading="lazy">' +
                '</div>' +
                '<div class="polaroid-caption">' +
                '  <span class="polaroid-place">' + posto + '</span>' +
                '  <span class="polaroid-year">' + anno + '</span>' +
                '</div>';

            // foto mancante → rimuovi la polaroid senza rompere il layout
            card.querySelector('img').addEventListener('error', function () { card.remove(); });

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
