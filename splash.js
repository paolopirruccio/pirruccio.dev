/* ══════════════════════════════════════════════════════════════
   SPLASH — "Ciao! Benvenuto" in halftone di puntini.
   Si mostra una volta per sessione, dura ~2s, un click la salta.
   L'overlay #splash sta nell'HTML (con gate inline che lo rimuove
   subito se già vista o con prefers-reduced-motion).
   ══════════════════════════════════════════════════════════════ */
(function () {
    var overlay = document.getElementById('splash');
    if (!overlay) return;

    var canvas = document.createElement('canvas');
    overlay.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var DOT = dark ? '#f0f0f2' : '#1a1a1a';
    var ACCENT = '#FFD700';

    var dots = [];
    var start = null;
    var leaving = false;
    var HOLD = 650;      // pausa a scritta completa
    var IN_DUR = 260;    // pop-in del singolo puntino
    var OUT_DUR = 450;   // dissolvenza

    function sample() {
        // canvas di misura: disegna il testo e campiona i pixel
        var W = Math.min(window.innerWidth * 0.92, 860);
        var H = W * 0.42;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.scale(dpr, dpr);

        var off = document.createElement('canvas');
        off.width = W; off.height = H;
        var octx = off.getContext('2d');
        octx.fillStyle = '#000';
        octx.textAlign = 'center';
        octx.textBaseline = 'middle';
        octx.font = 'italic ' + Math.round(W / 4.4) + 'px "Instrument Serif", Georgia, serif';
        octx.fillText('Ciao!', W / 2, H * 0.32);
        octx.font = 'italic ' + Math.round(W / 8.6) + 'px "Instrument Serif", Georgia, serif';
        octx.fillText('benvenuto', W / 2, H * 0.76);

        var step = Math.max(5, Math.round(W / 130));
        var img = octx.getImageData(0, 0, W, H).data;
        var cx = W / 2, cy = H / 2;

        for (var y = 0; y < H; y += step) {
            for (var x = 0; x < W; x += step) {
                if (img[(Math.round(y) * W + Math.round(x)) * 4 + 3] > 120) {
                    var dist = Math.hypot(x - cx, y - cy);
                    dots.push({
                        x: x, y: y,
                        r: step * 0.36,
                        delay: dist * 1.15 + Math.random() * 120,
                        accent: Math.random() < 0.10,
                        vx: (Math.random() * 2 - 1) * 0.9,
                        vy: (Math.random() * 2 - 1) * 0.9
                    });
                }
            }
        }
        return { W: W, H: H };
    }

    var dims;
    var maxDelay = 0;

    function frame(now) {
        if (start === null) start = now;
        var t = now - start;
        ctx.clearRect(0, 0, dims.W, dims.H);

        var outStart = maxDelay + IN_DUR + HOLD;
        var finished = true;

        for (var i = 0; i < dots.length; i++) {
            var d = dots[i];
            var p = Math.min(1, Math.max(0, (t - d.delay) / IN_DUR));
            var ease = 1 - Math.pow(1 - p, 3);
            var r = d.r * ease;
            var ox = 0, oy = 0, alpha = 1;

            if (t > outStart) {
                var q = Math.min(1, (t - outStart) / OUT_DUR);
                r = d.r * (1 - q);
                ox = d.vx * q * 26;
                oy = d.vy * q * 26;
                alpha = 1 - q;
                if (q < 1) finished = false;
            } else {
                if (p < 1) finished = false;
                else finished = false; // siamo ancora in hold
            }

            if (r <= 0.05) continue;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = d.accent ? ACCENT : DOT;
            ctx.beginPath();
            ctx.arc(d.x + ox, d.y + oy, r, 0, 6.2832);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (t > outStart && !overlay.classList.contains('leaving')) {
            overlay.classList.add('leaving');
        }
        if (t > outStart + OUT_DUR) {
            overlay.remove();
            return;
        }
        requestAnimationFrame(frame);
    }

    function skip() {
        // un click accorcia tutto: salta subito alla fase di uscita
        if (leaving) return;
        leaving = true;
        overlay.classList.add('leaving');
        setTimeout(function () { overlay.remove(); }, 460);
    }

    overlay.addEventListener('click', skip);
    window.addEventListener('keydown', skip, { once: true });

    function boot() {
        dims = sample();
        for (var i = 0; i < dots.length; i++) maxDelay = Math.max(maxDelay, dots[i].delay);
        sessionStorage.setItem('splashShown', '1');
        requestAnimationFrame(frame);
    }

    // aspetta il serif (con timeout: se tarda parte col fallback Georgia)
    if (document.fonts && document.fonts.load) {
        Promise.race([
            document.fonts.load('italic 80px "Instrument Serif"'),
            new Promise(function (res) { setTimeout(res, 350); })
        ]).then(boot, boot);
    } else {
        boot();
    }
})();
