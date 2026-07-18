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
        maybeScatter(list);
        initGhostScroll(list);
    }

    /* ── Ghosty reveal + deriva disordinata legata allo scroll ──
       Le foto entrano sfocate/evanescenti e si assestano; scrollando,
       ognuna deriva con velocità e direzione proprie (disordinate). ── */
    function initGhostScroll(list) {
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;

        var cards = [...list.querySelectorAll('.polaroid')];

        // reveal: sfocata → nitida quando entra in viewport, a scaglioni
        cards.forEach(function (c, i) {
            c.classList.add('ghost');
            c.style.transitionDelay = (i % 6) * 90 + 'ms';
        });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.remove('ghost');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.15 });
        cards.forEach(function (c) { io.observe(c); });

        // deriva: fattori casuali per carta, applicati via CSS vars
        cards.forEach(function (c) {
            c._fx = (Math.random() * 2 - 1) * 0.10;
            c._fy = (Math.random() * 2 - 1) * 0.16;
            c._fr = (Math.random() * 2 - 1) * 0.012;
        });

        var ticking = false;
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var s = window.scrollY;
                cards.forEach(function (c) {
                    var sx = Math.max(-70, Math.min(70, s * c._fx));
                    var sy = Math.max(-90, Math.min(90, s * c._fy));
                    c.style.setProperty('--sx', sx.toFixed(1) + 'px');
                    c.style.setProperty('--sy', sy.toFixed(1) + 'px');
                    c.style.setProperty('--rr', (s * c._fr).toFixed(2) + 'deg');
                });
                ticking = false;
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── Modalità "foto sul tavolo": sparse e trascinabili (solo desktop) ── */
    var zTop = 10; // contatore per portare in cima la foto afferrata

    function canScatter() {
        return window.matchMedia('(min-width: 768px)').matches &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function maybeScatter(list) {
        if (!canScatter()) return;
        list.classList.add('scattered');
        layoutScatter(list);
        enableDrag(list);

        var t;
        window.addEventListener('resize', function () {
            clearTimeout(t);
            t = setTimeout(function () {
                if (canScatter()) {
                    list.classList.add('scattered');
                    layoutScatter(list);
                } else {
                    list.classList.remove('scattered');
                    list.style.height = '';
                    list.querySelectorAll('.polaroid').forEach(function (c) {
                        c.style.left = c.style.top = '';
                    });
                }
            }, 180);
        });
    }

    function layoutScatter(list) {
        var cards = [...list.querySelectorAll('.polaroid')];
        if (!cards.length) return;
        var W = list.clientWidth;
        var cardW = 240, cellH = 320;
        var cols = Math.max(2, Math.floor(W / (cardW + 70)));
        var cellW = W / cols;
        var rows = Math.ceil(cards.length / cols);
        var jitter = function (max) { return (Math.random() * 2 - 1) * max; };

        cards.forEach(function (c, i) {
            var col = i % cols, row = Math.floor(i / cols);
            var x = col * cellW + (cellW - cardW) / 2 + jitter(Math.min(46, cellW * 0.16));
            var y = row * cellH + 24 + jitter(34);
            c.style.left = Math.max(0, Math.min(W - cardW, x)) + 'px';
            c.style.top = Math.max(0, y) + 'px';
            c.style.setProperty('--pc-rot', (jitter(8)).toFixed(1) + 'deg');
        });
        list.style.height = (rows * cellH + 90) + 'px';
    }

    function enableDrag(list) {
        var drag = null;

        list.addEventListener('pointerdown', function (e) {
            var card = e.target.closest('.polaroid');
            if (!card || !list.classList.contains('scattered')) return;
            if (e.button !== undefined && e.button !== 0) return;
            drag = {
                card: card,
                dx: e.clientX - card.offsetLeft,
                dy: e.clientY - card.offsetTop
            };
            card.style.zIndex = ++zTop;
            card.classList.add('dragging');
            card.setPointerCapture(e.pointerId);
            e.preventDefault();
        });

        list.addEventListener('pointermove', function (e) {
            if (!drag) return;
            drag.card.style.left = (e.clientX - drag.dx) + 'px';
            drag.card.style.top = (e.clientY - drag.dy) + 'px';
        });

        var release = function () {
            if (!drag) return;
            drag.card.classList.remove('dragging');
            drag = null;
        };
        list.addEventListener('pointerup', release);
        list.addEventListener('pointercancel', release);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
