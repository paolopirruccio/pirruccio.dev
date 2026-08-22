/* ══════════════════════════════════════════════════════════════
   PASSION STICKERS — icone circolari die-cut, afferrabili e
   lanciabili. Fisica rAF condivisa; visuale WebGL con effetto
   "peel" (la piega quando li afferri) e fallback canvas 2D/DOM
   quando WebGL non c'è o il contesto va perso. Zero librerie.
   ══════════════════════════════════════════════════════════════ */
(function () {
    var band = document.getElementById('sticker-band');
    if (!band) return;

    var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    /* le passioni — icona Font Awesome (già caricato) + emoji di riserva */
    var DEFS = [
        { name: 'apple', glyph: '', fam: 'brands', emoji: '🍎', color: '#1d1d1f', x: 0.14, y: 0.30, rot: -12 },
        { name: 'libri', glyph: '', fam: 'solid', emoji: '📖', color: '#b07d3c', x: 0.36, y: 0.62, rot: 8 },
        { name: 'viaggi', glyph: '', fam: 'solid', emoji: '🌍', color: '#2f7d8a', x: 0.60, y: 0.34, rot: -6, href: 'viaggi.html' },
        { name: 'politica', glyph: '', fam: 'solid', emoji: '🏛️', color: '#8c4a52', x: 0.84, y: 0.58, rot: 10 }
    ];

    var BASE = '#fdfcf6';
    var FRICTION = 0.92, MIN_VEL = 0.05, THROW_SCALE = 0.7;
    var SPIN_FROM_THROW = 0.09, SPIN_FRICTION = 0.94;
    var DRAG_EASE = 0.12, GRAB_SCALE = 1.12, SCALE_EASE = 0.12, PEEL_EASE = 0.1;

    var items = [];
    var rafId = 0, running = false, zTop = 5;
    var faReady = false;

    /* ─────────────────────────────────────────────
       Render dello sticker circolare (texture/canvas)
       withShadow: ombra "baked" (per il path DOM; in GL
       l'ombra dinamica del peel viene aggiunta dallo shader)
       ───────────────────────────────────────────── */
    function renderIcon(def, cssSize, withShadow) {
        var pad = 20;
        var full = cssSize + pad * 2;
        var c = document.createElement('canvas');
        c.width = c.height = Math.ceil(full * DPR);
        c.className = 'word-sticker';
        c.style.width = full + 'px';
        c.style.height = full + 'px';
        var x = c.getContext('2d');
        x.scale(DPR, DPR);
        var cx = full / 2, cy = full / 2, R = cssSize / 2;

        if (withShadow) {
            x.save();
            x.shadowColor = 'rgba(0,0,0,0.26)';
            x.shadowBlur = 12;
            x.shadowOffsetY = 6;
            x.beginPath(); x.arc(cx, cy, R, 0, 6.2832);
            x.fillStyle = BASE; x.fill();
            x.restore();
        }
        // base bianca die-cut
        x.beginPath(); x.arc(cx, cy, R, 0, 6.2832);
        x.fillStyle = BASE; x.fill();
        // cerchio colorato interno
        x.beginPath(); x.arc(cx, cy, R - Math.max(5, cssSize * 0.055), 0, 6.2832);
        x.fillStyle = def.color; x.fill();

        // icona
        x.textAlign = 'center';
        x.textBaseline = 'middle';
        if (faReady) {
            x.font = (def.fam === 'brands' ? '400 ' : '900 ') + Math.round(cssSize * 0.42) + 'px "Font Awesome 6 ' + (def.fam === 'brands' ? 'Brands' : 'Free') + '"';
            x.fillStyle = '#ffffff';
            x.fillText(def.glyph, cx, cy + cssSize * 0.02);
        } else {
            x.font = Math.round(cssSize * 0.40) + 'px serif';
            x.fillText(def.emoji, cx, cy + cssSize * 0.02);
        }
        return { canvas: c, size: full };
    }

    function iconSize() {
        var w = band.clientWidth || 640;
        return Math.max(78, Math.min(104, w * 0.085));
    }

    /* ─────────────────────────────────────────────
       Renderer WebGL: quad suddiviso + shader di peel.
       La zona verso il punto di presa si accorcia (pullback),
       "cresce" verso l'osservatore e si schiarisce; sotto,
       un'ombra dinamica proporzionale alla piega.
       ───────────────────────────────────────────── */
    var GRID = 24;

    function createGL() {
        var canvas = document.createElement('canvas');
        canvas.className = 'sticker-gl';
        var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
        if (!gl) return null;

        var VS = [
            'attribute vec2 aUV;',
            'uniform vec2 uRes; uniform vec2 uPos; uniform vec2 uSize;',
            'uniform float uScale; uniform float uRot;',
            'uniform vec2 uGrab; uniform mediump float uPeel; uniform mediump float uShadow;',
            'varying vec2 vUV; varying float vLift;',
            'void main(){',
            '  vec2 anchor = vec2(1.0) - uGrab;',
            '  vec2 dir = uGrab - anchor;',
            '  float len = max(length(dir), 0.0001);',
            '  vec2 nd = dir / len;',
            '  float proj = clamp(dot(aUV - anchor, nd) / len, 0.0, 1.0);',
            '  float w = proj * proj;',
            '  float lift = uPeel * w;',
            '  vLift = lift;',
            '  vec2 uv2 = aUV - nd * (0.16 * lift);',   // pullback verso l'ancora
            '  vec2 local = (uv2 - 0.5) * uSize;',
            '  local *= (1.0 + 0.14 * lift) * uScale;', // elevazione: si avvicina all'occhio
            '  float cs = cos(uRot), sn = sin(uRot);',
            '  local = vec2(local.x*cs - local.y*sn, local.x*sn + local.y*cs);',
            '  vec2 px = uPos + uSize*0.5 + local;',
            '  px += uShadow * (vec2(5.0, 9.0) + vec2(10.0, 16.0) * lift);',
            '  vec2 clip = (px / uRes) * 2.0 - 1.0;',
            '  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);',
            '  vUV = aUV;',
            '}'
        ].join('\n');

        var FS = [
            'precision mediump float;',
            'varying vec2 vUV; varying float vLift;',
            'uniform sampler2D uTex; uniform float uShadow; uniform float uPeel;',
            'void main(){',
            '  vec4 t = texture2D(uTex, vUV);',
            '  if (uShadow > 0.5) {',
            '    gl_FragColor = vec4(0.0, 0.0, 0.0, t.a * 0.20 * uPeel);',
            '  } else {',
            '    gl_FragColor = vec4(t.rgb * (1.0 + 0.20 * vLift), t.a);',
            '  }',
            '}'
        ].join('\n');

        function sh(type, src) {
            var s = gl.createShader(type);
            gl.shaderSource(s, src); gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.warn('stickers GL shader:', gl.getShaderInfoLog(s));
                return null;
            }
            return s;
        }
        var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
        if (!vs || !fs) return null;
        var prog = gl.createProgram();
        gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.warn('stickers GL link:', gl.getProgramInfoLog(prog));
            return null;
        }
        gl.useProgram(prog);

        // mesh: griglia GRIDxGRID in uv 0..1
        var verts = [], idx = [];
        for (var gy = 0; gy <= GRID; gy++)
            for (var gx = 0; gx <= GRID; gx++)
                verts.push(gx / GRID, gy / GRID);
        for (var qy = 0; qy < GRID; qy++)
            for (var qx = 0; qx < GRID; qx++) {
                var a = qy * (GRID + 1) + qx, b = a + 1, cc = a + GRID + 1, d = cc + 1;
                idx.push(a, b, cc, b, d, cc);
            }
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        var ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
        var aUV = gl.getAttribLocation(prog, 'aUV');
        gl.enableVertexAttribArray(aUV);
        gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

        var U = {};
        ['uRes', 'uPos', 'uSize', 'uScale', 'uRot', 'uGrab', 'uPeel', 'uShadow', 'uTex'].forEach(function (n) {
            U[n] = gl.getUniformLocation(prog, n);
        });

        return {
            canvas: canvas, gl: gl, nIdx: idx.length, U: U,
            resize: function (w, h) {
                canvas.width = Math.ceil(w * DPR); canvas.height = Math.ceil(h * DPR);
                canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.uniform2f(U.uRes, w, h);
            },
            makeTexture: function (src) {
                var t = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, t);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                return t;
            },
            begin: function () { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); },
            draw: function (o) {
                gl.bindTexture(gl.TEXTURE_2D, o.tex);
                gl.uniform1i(U.uTex, 0);
                gl.uniform2f(U.uPos, o.x, o.y);
                gl.uniform2f(U.uSize, o.w, o.h);
                gl.uniform1f(U.uScale, o.scale);
                gl.uniform1f(U.uRot, o.rot * Math.PI / 180);
                gl.uniform2f(U.uGrab, o.grabU, o.grabV);
                gl.uniform1f(U.uPeel, o.peel);
                // passata ombra (solo se c'è piega), poi colore
                if (o.peel > 0.01) {
                    gl.uniform1f(U.uShadow, 1);
                    gl.drawElements(gl.TRIANGLES, this.nIdx, gl.UNSIGNED_SHORT, 0);
                }
                gl.uniform1f(U.uShadow, 0);
                gl.drawElements(gl.TRIANGLES, this.nIdx, gl.UNSIGNED_SHORT, 0);
            }
        };
    }

    var GL = null;
    var useGL = false;

    /* ───────────────────────────────────────────── */

    function place(it) {
        var s = it.scale * it.appear;
        var t = 'translate(' + it.x + 'px,' + it.y + 'px) rotate(' + it.rot + 'deg)' +
            (s !== 1 ? ' scale(' + s + ')' : '');
        it.hit.style.transform = t;
        if (!useGL && it.art) it.art.style.transform = t;
    }

    function clamp(it) {
        it.x = Math.max(0, Math.min(band.clientWidth - it.w, it.x));
        it.y = Math.max(0, Math.min(band.clientHeight - it.h, it.y));
    }

    function buildItem(def, i, size) {
        var hit = document.createElement('div');
        hit.className = 'word-sticker-hit';
        hit.setAttribute('role', def.href ? 'link' : 'presentation');
        hit.setAttribute('aria-label', def.href ? 'Apri ' + def.name : def.name);
        var it = {
            def: def, hit: hit, art: null, tex: null,
            w: 0, h: 0, x: 0, y: 0, tx: 0, ty: 0, moved: 0,
            vx: 0, vy: 0, rot: def.rot, vrot: 0,
            scale: 1, appear: REDUCED ? 1 : 0, peel: 0,
            grabU: 0.5, grabV: 0.5,
            dragging: false, appearAt: performance.now() + 200 + i * 110
        };
        var r = renderIcon(def, size, !useGL);
        it.w = it.h = r.size;
        if (useGL) {
            it.tex = GL.makeTexture(r.canvas);
        } else {
            it.art = r.canvas;
            band.appendChild(r.canvas);
        }
        hit.style.width = it.w + 'px';
        hit.style.height = it.h + 'px';
        it.x = def.x * band.clientWidth - it.w / 2;
        it.y = def.y * band.clientHeight - it.h / 2;
        clamp(it);
        band.appendChild(hit);
        place(it);
        if (!REDUCED) bindDrag(it);
        else if (def.href) hit.addEventListener('click', function () { location.href = def.href; });
        return it;
    }

    function build() {
        var size = iconSize();
        DEFS.forEach(function (def, i) { items.push(buildItem(def, i, size)); });
        drawGL();
    }

    function teardown() {
        items.forEach(function (it) {
            it.hit.remove();
            if (it.art) it.art.remove();
        });
        items = [];
    }

    /* ── Drag: il pointer muove il target, il loop insegue con easing ── */
    function bindDrag(it) {
        it.hit.addEventListener('pointerdown', function (e) {
            if (e.button !== undefined && e.button !== 0) return;
            e.preventDefault();
            it.dragging = true;
            it.vx = it.vy = it.vrot = 0;
            it.tx = it.x; it.ty = it.y;
            it.moved = 0;
            // punto di presa in uv (per la direzione del peel)
            var br = it.hit.getBoundingClientRect();
            it.grabU = Math.max(0, Math.min(1, (e.clientX - br.left) / br.width));
            it.grabV = Math.max(0, Math.min(1, (e.clientY - br.top) / br.height));
            // porta in cima: ordine di draw GL = ordine array
            var k = items.indexOf(it);
            if (k > -1) { items.splice(k, 1); items.push(it); }
            it.hit.style.zIndex = ++zTop;
            it.hit.classList.add('grabbing');
            if (it.art) { it.art.style.zIndex = zTop; it.art.classList.add('held'); }
            it._dx = e.clientX - it.x;
            it._dy = e.clientY - it.y;
            it._lastX = e.clientX; it._lastY = e.clientY;
            wake();
            try { it.hit.setPointerCapture(e.pointerId); } catch (err) { /* pointer sintetici */ }
        });

        it.hit.addEventListener('pointermove', function (e) {
            if (!it.dragging) return;
            it.moved += Math.hypot(e.clientX - it._lastX, e.clientY - it._lastY);
            it._lastX = e.clientX; it._lastY = e.clientY;
            it.tx = e.clientX - it._dx;
            it.ty = e.clientY - it._dy;
        });

        function release() {
            if (!it.dragging) return;
            it.dragging = false;
            it.hit.classList.remove('grabbing');
            if (it.art) it.art.classList.remove('held');
            if (it.moved < 6) {
                if (it.def.href) { location.href = it.def.href; return; }
                it.vrot = (Math.random() < 0.5 ? -1 : 1) * 4;
            } else {
                it.vx *= THROW_SCALE;
                it.vy *= THROW_SCALE;
                it.vrot = it.vx * SPIN_FROM_THROW;
            }
            wake();
        }
        it.hit.addEventListener('pointerup', release);
        it.hit.addEventListener('pointercancel', release);
    }

    /* ── Fisica ── */
    var TILT_MAX = 9;

    function loop() {
        var active = false;
        var now = performance.now();

        for (var i = 0; i < items.length; i++) {
            var it = items[i];

            if (it.appear < 1 && now >= it.appearAt) {
                it.appear += (1 - it.appear) * 0.12;
                if (it.appear > 0.995) it.appear = 1;
                place(it);
                active = true;
                continue;
            }
            if (it.appear < 1) { active = true; continue; }

            var targetScale = it.dragging ? GRAB_SCALE : 1;
            if (Math.abs(targetScale - it.scale) > 0.001) {
                it.scale += (targetScale - it.scale) * SCALE_EASE;
                active = true;
            }
            var peelTarget = it.dragging ? 1 : 0;
            if (Math.abs(peelTarget - it.peel) > 0.001) {
                it.peel += (peelTarget - it.peel) * PEEL_EASE;
                if (it.peel < 0.002) it.peel = 0;
                active = true;
            }

            if (it.dragging) {
                var nx = it.x + (it.tx - it.x) * DRAG_EASE;
                var ny = it.y + (it.ty - it.y) * DRAG_EASE;
                it.vx = nx - it.x;
                it.vy = ny - it.y;
                it.x = nx; it.y = ny;
                clamp(it);
                var tilt = Math.max(-TILT_MAX, Math.min(TILT_MAX, it.vx * 0.9));
                it.rot += (it.def.rot + tilt - it.rot) * 0.18;
                place(it);
                active = true;
                continue;
            }

            var moving = Math.abs(it.vx) > MIN_VEL || Math.abs(it.vy) > MIN_VEL || Math.abs(it.vrot) > 0.05;
            if (!moving) continue;

            it.x += it.vx;
            it.y += it.vy;
            it.rot += it.vrot;
            // niente rimbalzo: è un adesivo — sul bordo si appiccica.
            // Componente normale azzerata, scivola appena lungo il bordo.
            var maxX = band.clientWidth - it.w, maxY = band.clientHeight - it.h;
            if (it.x < 0) { it.x = 0; it.vx = 0; it.vy *= 0.5; it.vrot *= 0.4; }
            else if (it.x > maxX) { it.x = maxX; it.vx = 0; it.vy *= 0.5; it.vrot *= 0.4; }
            if (it.y < 0) { it.y = 0; it.vy = 0; it.vx *= 0.5; it.vrot *= 0.4; }
            else if (it.y > maxY) { it.y = maxY; it.vy = 0; it.vx *= 0.5; it.vrot *= 0.4; }
            it.vx *= FRICTION;
            it.vy *= FRICTION;
            it.vrot *= SPIN_FRICTION;
            place(it);
            active = true;
        }

        drawGL();

        if (active) { rafId = requestAnimationFrame(loop); }
        else { running = false; rafId = 0; }
    }

    function drawGL() {
        if (!useGL || !GL) return;
        GL.begin();
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            if (!it.tex) continue;
            GL.draw({
                tex: it.tex, x: it.x, y: it.y, w: it.w, h: it.h,
                scale: it.scale * it.appear, rot: it.rot,
                grabU: it.grabU, grabV: it.grabV, peel: it.peel
            });
        }
    }

    function wake() {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(loop);
    }

    /* ── Resize ── */
    var rt;
    window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
            teardown();
            if (useGL) GL.resize(band.clientWidth, band.clientHeight);
            build();
            if (!REDUCED) wake();
        }, 220);
    });

    /* ── Avvio: prova WebGL, scalda i font FA, fallback pulito ── */
    function start() {
        if (!REDUCED) {
            try { GL = createGL(); } catch (e) { GL = null; console.warn('stickers GL init:', e); }
            band.dataset.gl = GL ? 'on' : 'off';
            if (GL) {
                useGL = true;
                GL.resize(band.clientWidth, band.clientHeight);
                band.appendChild(GL.canvas);
                // contesto perso → si ricostruisce tutto in DOM 2D
                GL.canvas.addEventListener('webglcontextlost', function (e) {
                    e.preventDefault();
                    useGL = false;
                    GL.canvas.remove();
                    GL = null;
                    teardown();
                    build();
                    wake();
                });
            }
        }
        build();
        if (!REDUCED) wake();
    }

    var faces = [
        '900 40px "Font Awesome 6 Free"',
        '400 40px "Font Awesome 6 Brands"'
    ];
    if (document.fonts && document.fonts.load) {
        Promise.race([
            Promise.all(faces.map(function (f) { return document.fonts.load(f); })),
            new Promise(function (res) { setTimeout(res, 800); })
        ]).then(function () {
            faReady = document.fonts.check(faces[0]) && document.fonts.check(faces[1]);
            start();
        }, start);
    } else {
        start();
    }
})();
