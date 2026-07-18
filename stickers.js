/* ══════════════════════════════════════════════════════════════
   VINYL WORD STICKERS — le passioni come adesivi di vinile:
   afferrali e lanciali. Canvas 2D + fisica rAF, zero librerie.

   Il bordo die-cut è generato: la parola viene "dilatata" stampandola
   piena molte volte lungo anelli concentrici di raggio crescente —
   l'outline così segue le forme vere delle lettere (controforme incluse).
   ══════════════════════════════════════════════════════════════ */
(function () {
    var band = document.getElementById('sticker-band');
    if (!band) return;

    var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    /* le passioni — ogni parola in un font diverso (mini type specimen).
       Solo famiglie già caricate dalla pagina o di sistema: zero download extra. */
    var WORDS = [
        { word: 'viaggi', font: 'italic 700 {s}px Caveat, cursive', fill: '#2f7d8a', x: 0.46, y: 0.30, rot: -7, href: 'viaggi.html' },
        { word: 'design', font: 'italic 400 {s}px "Instrument Serif", Georgia, serif', fill: '#c81e5b', x: 0.13, y: 0.55, rot: 5 },
        { word: 'libri', font: '700 italic {s}px Georgia, serif', fill: '#b07d3c', x: 0.30, y: 0.62, rot: -4 },
        { word: 'politica', font: '600 {s}px Inter, sans-serif', fill: '#8c4a52', x: 0.66, y: 0.58, rot: 6 },
        { word: 'apple', font: '700 {s}px ui-monospace, Menlo, "Courier New", monospace', fill: '#1d1d1f', x: 0.85, y: 0.32, rot: -9 }
    ];

    var BASE = '#fdfcf6';       // vinile: base bianca sporca
    var FRICTION = 0.92;
    var BOUNCE = 0.55;
    var MIN_VEL = 0.05;
    var THROW_SCALE = 0.7;
    var SPIN_FROM_THROW = 0.09; // un filo di spin proporzionale al lancio
    var SPIN_FRICTION = 0.94;

    var items = [];
    var rafId = 0;
    var running = false;
    var zTop = 5;

    /* ── Render: silhouette dilatata ad anelli + parola colorata sopra ── */
    function renderSticker(def, fontPx) {
        var font = def.font.replace('{s}', fontPx);
        var border = Math.max(5, Math.round(fontPx * 0.14));

        var meas = document.createElement('canvas').getContext('2d');
        meas.font = font;
        var m = meas.measureText(def.word);
        var asc = m.actualBoundingBoxAscent || fontPx * 0.8;
        var desc = m.actualBoundingBoxDescent || fontPx * 0.25;
        var pad = border + 8;
        var w = Math.ceil(m.width + pad * 2);
        var h = Math.ceil(asc + desc + pad * 2);

        var c = document.createElement('canvas');
        c.width = Math.ceil(w * DPR);
        c.height = Math.ceil(h * DPR);
        c.className = 'word-sticker';
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        var ctx = c.getContext('2d');
        ctx.scale(DPR, DPR);
        ctx.font = font;
        ctx.textBaseline = 'alphabetic';
        var tx = pad, ty = pad + asc;

        // ombra morbida UNA volta, sotto l'intera sagoma
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.28)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 5;
        ctx.fillStyle = BASE;
        ctx.fillText(def.word, tx, ty);
        ctx.restore();

        // dilatazione: stampa la parola lungo anelli di raggio decrescente
        ctx.fillStyle = BASE;
        for (var r = border; r > 0.5; r -= 1) {
            var stamps = Math.max(14, Math.ceil(r * 3));
            for (var a = 0; a < stamps; a++) {
                var ang = (a / stamps) * Math.PI * 2;
                ctx.fillText(def.word, tx + Math.cos(ang) * r, ty + Math.sin(ang) * r);
            }
        }
        ctx.fillText(def.word, tx, ty);

        // parola colorata sopra la base
        ctx.fillStyle = def.fill;
        ctx.fillText(def.word, tx, ty);

        return { canvas: c, w: w, h: h };
    }

    function fontPxFor() {
        var w = band.clientWidth || 640;
        return Math.max(30, Math.min(58, w * 0.055));
    }

    function place(it) {
        var t = 'translate(' + it.x + 'px,' + it.y + 'px) rotate(' + it.rot + 'deg)' +
            (it.scale !== 1 ? ' scale(' + it.scale + ')' : '');
        it.canvas.style.transform = t;
        it.hit.style.transform = t;
    }

    function clamp(it) {
        it.x = Math.max(0, Math.min(band.clientWidth - it.w, it.x));
        it.y = Math.max(0, Math.min(band.clientHeight - it.h, it.y));
    }

    function build() {
        var fontPx = fontPxFor();
        WORDS.forEach(function (def, i) {
            var r = renderSticker(def, fontPx);
            var hit = document.createElement('div');
            hit.className = 'word-sticker-hit';
            hit.style.width = r.w + 'px';
            hit.style.height = r.h + 'px';
            hit.setAttribute('role', def.href ? 'link' : 'presentation');
            if (def.href) hit.setAttribute('aria-label', 'Apri ' + def.word);

            var it = {
                def: def, canvas: r.canvas, hit: hit, w: r.w, h: r.h,
                x: def.x * band.clientWidth - r.w / 2,
                y: def.y * band.clientHeight - r.h / 2,
                vx: 0, vy: 0, rot: def.rot, vrot: 0,
                scale: REDUCED ? 1 : 0,
                dragging: false, appearAt: performance.now() + 200 + i * 110
            };
            clamp(it);
            band.appendChild(r.canvas);
            band.appendChild(hit);
            place(it);
            items.push(it);
            if (!REDUCED) bindDrag(it);
            else if (def.href) hit.addEventListener('click', function () { location.href = def.href; });
        });
    }

    /* ── Drag & fling ── */
    function bindDrag(it) {
        var drag = null;

        it.hit.addEventListener('pointerdown', function (e) {
            if (e.button !== undefined && e.button !== 0) return;
            e.preventDefault();
            it.dragging = true;
            it.vx = it.vy = it.vrot = 0;
            it.canvas.style.zIndex = it.hit.style.zIndex = ++zTop;
            it.hit.classList.add('grabbing');
            drag = {
                dx: e.clientX - it.x, dy: e.clientY - it.y,
                lastX: e.clientX, lastY: e.clientY, lastT: performance.now(),
                svx: 0, svy: 0, moved: 0
            };
            it.hit.setPointerCapture(e.pointerId);
            wake();
        });

        it.hit.addEventListener('pointermove', function (e) {
            if (!drag) return;
            var now = performance.now();
            var dt = Math.max(1, now - drag.lastT);
            // velocità istantanea smussata (px/frame a ~60fps)
            drag.svx = drag.svx * 0.4 + ((e.clientX - drag.lastX) / dt * 16.7) * 0.6;
            drag.svy = drag.svy * 0.4 + ((e.clientY - drag.lastY) / dt * 16.7) * 0.6;
            drag.moved += Math.hypot(e.clientX - drag.lastX, e.clientY - drag.lastY);
            drag.lastX = e.clientX; drag.lastY = e.clientY; drag.lastT = now;
            it.x = e.clientX - drag.dx;
            it.y = e.clientY - drag.dy;
            clamp(it);
            place(it);
        });

        function release(e) {
            if (!drag) return;
            it.dragging = false;
            it.hit.classList.remove('grabbing');
            if (drag.moved < 6) {
                // tap: lo sticker "viaggi" naviga, gli altri fanno un wobble
                if (it.def.href) { location.href = it.def.href; drag = null; return; }
                it.vrot = (Math.random() < 0.5 ? -1 : 1) * 4;
            } else {
                // lancio con momento + un filo di spin
                it.vx = drag.svx * THROW_SCALE;
                it.vy = drag.svy * THROW_SCALE;
                it.vrot = drag.svx * SPIN_FROM_THROW;
            }
            drag = null;
            wake();
        }
        it.hit.addEventListener('pointerup', release);
        it.hit.addEventListener('pointercancel', release);
    }

    /* ── Fisica: integrazione + attrito + rimbalzi sui bordi ── */
    function loop() {
        var active = false;
        var now = performance.now();

        for (var i = 0; i < items.length; i++) {
            var it = items[i];

            // entrata: pop-in scalare sfalsato
            if (it.scale < 1 && now >= it.appearAt) {
                it.scale += (1 - it.scale) * 0.12;
                if (it.scale > 0.995) it.scale = 1;
                place(it);
                active = true;
                continue;
            }
            if (it.scale < 1) { active = true; continue; }
            if (it.dragging) { active = true; continue; }

            var moving = Math.abs(it.vx) > MIN_VEL || Math.abs(it.vy) > MIN_VEL || Math.abs(it.vrot) > 0.05;
            if (!moving) continue;

            it.x += it.vx;
            it.y += it.vy;
            it.rot += it.vrot;

            var maxX = band.clientWidth - it.w, maxY = band.clientHeight - it.h;
            if (it.x < 0) { it.x = 0; it.vx = -it.vx * BOUNCE; it.vrot *= -0.7; }
            else if (it.x > maxX) { it.x = maxX; it.vx = -it.vx * BOUNCE; it.vrot *= -0.7; }
            if (it.y < 0) { it.y = 0; it.vy = -it.vy * BOUNCE; }
            else if (it.y > maxY) { it.y = maxY; it.vy = -it.vy * BOUNCE; }

            it.vx *= FRICTION;
            it.vy *= FRICTION;
            it.vrot *= SPIN_FRICTION;
            place(it);
            active = true;
        }

        if (active) { rafId = requestAnimationFrame(loop); }
        else { running = false; rafId = 0; } // tutto fermo: stop al loop (batteria)
    }

    function wake() {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(loop);
    }

    /* ── Resize: ricalcola e riposiziona (debounced) ── */
    var rt;
    window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
            items.forEach(function (it) {
                it.canvas.remove();
                it.hit.remove();
            });
            items = [];
            build();
            if (!REDUCED) wake();
        }, 220);
    });

    /* ── Avvio: scalda i font così il die-cut segue i glifi veri ── */
    function start() {
        build();
        if (!REDUCED) wake();
        else items.forEach(function (it) { it.scale = 1; place(it); });
    }

    var faces = [
        'italic 700 40px Caveat',
        'italic 40px "Instrument Serif"',
        '600 40px Inter'
    ];
    if (document.fonts && document.fonts.load) {
        Promise.race([
            Promise.all(faces.map(function (f) { return document.fonts.load(f); })),
            new Promise(function (res) { setTimeout(res, 600); })
        ]).then(start, start);
    } else {
        start();
    }
})();
