// site.js — gestisce tutto il comportamento interattivo del sito
// viewer 3DHOP, animazioni scroll, SVG decorativi, toolbar e gaussian splat


// ─── VARIABILI GLOBALI ───────────────────────────────────────────────

// 3DHOP non supporta più viewer sulla stessa pagina, quindi ne uso uno solo
// e lo sposto fisicamente nel DOM in base a dove serve
var presenter = null;

// posizioni della camera per ogni scheda della sezione "Modello"
// formato: [phi, theta, 0, panX, panY, distanza] — trovati manualmente in dev-mode
var guidedViews = [
  [-51.213,  10.311, 0, 0, 0, 1.379],  // 01 — vista d'insieme dall'alto
  [-52.104,  -2.794, 0, 0, 0, 0.814],  // 02 — fronte: festoni e figure
  [-79.352,  -2.337, 0, 0, 0, 0.814],  // 03 — campo sinistro
  [-27.785,  -2.184, 0, 0, 0, 0.814],  // 04 — campo destro
  [-226.665, -4.622, 0, 0, 0, 1.379],  // 05 — retro liscio
  [-140.467, -4.775, 0, 0, 0, 1.379]   // 06 — lati con maschera bacchica
];

// viste per i pulsanti del playground libero (fronte, sinistra, destra, alto)
var freeViews = {
  front: [-51.213, 10.311, 0, 0, 0, 1.694],
  left:  [-141.213, 10.311, 0, 0, 0, 1.694],
  right: [38.787, 10.311, 0, 0, 0, 1.694],
  top:   [-51.213, 89.900, 0, 0, 0, 1.850]
};

// tiene traccia di dove si trova il viewer-shell in questo momento
var currentViewerHome = "";

// true mentre il modello è nella hero e deve ruotare piano
var heroMode = false;

// serve per non far girare il modello troppo veloce nella hero
var lastHeroSpin = 0;


// ─── SETUP 3DHOP ─────────────────────────────────────────────────────

function setup3dhop() {
  presenter = new Presenter("draw-canvas");

  presenter.setScene({
    // sfondo trasparente così si vede il nero del CSS
    background: { color: [0.0, 0.0, 0.0, 0.0] },

    meshes: {
      sarcofago: { url: "3dhop/models/sarcofago.nxz" },
      // sfera usata come geometria per gli hotspot delle story-card
      sphere: { url: "3dhop/models/sphere.ply" }
    },

    modelInstances: {
      sarcofago: {
        mesh: "sarcofago",
        color: [0.82, 0.74, 0.58],  // colore travertino usato quando si toglie la texture
        useSolidColor: false,
        useLighting: true
      }
    },

    // hotspot gold sulle zone di rilievo descritte dalle card 2-5
    // visible:false = partono nascosti, li mostro/nascondo in setActiveStory
    spots: {
      hs1: {
        mesh: "sphere",
        transform: { matrix: SglMat4.mul(SglMat4.translation([-0.22, 0.24,  0.08]), SglMat4.scaling([0.035, 0.035, 0.035])) },
        color: [0.843, 0.706, 0.416],
        alpha: 0.88,
        visible: false
      },
      hs2: {
        mesh: "sphere",
        transform: { matrix: SglMat4.mul(SglMat4.translation([-0.33, 0.25, -0.07]), SglMat4.scaling([0.035, 0.035, 0.035])) },
        color: [0.843, 0.706, 0.416],
        alpha: 0.88,
        visible: false
      },
      hs3: {
        mesh: "sphere",
        transform: { matrix: SglMat4.mul(SglMat4.translation([-0.13, 0.27,  0.17]), SglMat4.scaling([0.035, 0.035, 0.035])) },
        color: [0.843, 0.706, 0.416],
        alpha: 0.88,
        visible: false
      },
      hs4: {
        mesh: "sphere",
        transform: { matrix: SglMat4.mul(SglMat4.translation([-0.32, 0.23, -0.25]), SglMat4.scaling([0.035, 0.035, 0.035])) },
        color: [0.843, 0.706, 0.416],
        alpha: 0.88,
        visible: false
      }
    },

    // TurntablePanTrackball è il tipo di controllo "oggetto in mano":
    // si può ruotare, fare pan e zoom con limiti impostati qui
    trackball: {
      type: TurntablePanTrackball,
      trackOptions: {
        startPhi: -51.213,
        startTheta: 10.311,
        startDistance: 1.694,
        minMaxDist: [0.65, 4.2],
        minMaxTheta: [-75, 78],
        minMaxPanX: [-1.2, 1.2],
        minMaxPanY: [-1.2, 1.2],
        minMaxPanZ: [-1.2, 1.2],
        animationTime: 1.2
      }
    },

    space: {
      centerMode: "scene",
      radiusMode: "scene",
      cameraFOV: 45,
      cameraNearFar: [0.01, 10],
      cameraType: "perspective",
      sceneLighting: false  // la luce di scena parte spenta, l'utente la accende
    }
  });

  // quando l'utente finisce di misurare, scrivo il valore nel box laterale
  presenter._onEndMeasurement = function (measure) {
    var el = document.getElementById("measure-output");
    if (el) el.textContent = measure.toFixed(2);
  };

  // stesso per il pick-point: stampo le coordinate XYZ
  presenter._onEndPickingPoint = function (point) {
    var el = document.getElementById("pickpoint-output");
    if (el) el.textContent = "[ " + point.map(function (n) { return n.toFixed(2); }).join(", ") + " ]";
  };
}

// 3DHOP non ridimensiona il canvas da solo quando cambia il contenitore,
// quindi devo chiamare manualmente resizeCanvas ogni volta che sposto il viewer
function resize3dhop() {
  var shell = document.getElementById("viewer-shell");
  if (!shell || !presenter) return;
  var rect = shell.getBoundingClientRect();
  resizeCanvas(Math.round(rect.width), Math.round(rect.height));
}

// sposta fisicamente il div viewer-shell nel contenitore indicato da targetId
// se si torna dalla sezione "esplora", resetta tutto allo stato iniziale
function moveViewer(targetId) {
  var shell = document.getElementById("viewer-shell");
  var target = document.getElementById(targetId);
  if (!shell || !target) return;

  var prev = currentViewerHome;
  currentViewerHome = targetId;
  target.appendChild(shell);

  if (prev === "free-viewer-home" && targetId !== "free-viewer-home") {
    resetPlaygroundState();
  }
  requestAnimationFrame(resize3dhop);
}


// ─── STORY-CARD ──────────────────────────────────────────────────────

// mappa card-index → nome hotspot (null = nessun hotspot per quella card)
var cardHotspots = [null, "hs1", "hs2", "hs3", null, "hs4"];

// marca la card come attiva, anima la camera e mostra l'hotspot corrispondente.
// sequenza: camera si muove (1.1s) → sfera appare → sfera sparisce → SVG si disegna
var CAMERA_MS  = 1100;  // durata animazione camera (deve coincidere con animateToTrackballPosition)
var SPHERE_MS  =  600;  // quanto resta visibile la sfera

function setActiveStory(index) {
  // is-active: visibilità e slide della card. svg-draw: animazione SVG (aggiunta dopo)
  document.querySelectorAll(".story-card").forEach(function (card, i) {
    card.classList.toggle("is-active", i === index);
    card.classList.remove("svg-draw");
  });

  if (!presenter) return;
  presenter.animateToTrackballPosition(guidedViews[index], 1.1);
  presenter.setSpotVisibility(HOP_ALL, false, false);

  var hotspot = cardHotspots[index];

  setTimeout(function () {
    // camera ferma: se c'è un hotspot lo mostro, altrimenti parto subito con l'SVG
    if (hotspot) {
      presenter.setSpotVisibilityByName(hotspot, true, true);
      setTimeout(function () {
        presenter.setSpotVisibilityByName(hotspot, false, true);
        triggerSvgDraw(index);
      }, SPHERE_MS);
    } else {
      triggerSvgDraw(index);
    }
  }, CAMERA_MS);
}

function triggerSvgDraw(index) {
  // aggiungo svg-draw solo se la card è ancora quella attiva
  // (l'utente potrebbe aver già scrollato a un'altra card)
  var cards = document.querySelectorAll(".story-card");
  if (cards[index] && cards[index].classList.contains("is-active")) {
    cards[index].classList.add("svg-draw");
  }
}

// vale 1 (normale) o -1 (invertito); aggiornato da watchPanDir ogni 200ms
var panDir = 1;

// pos[4] orizzontale, pos[3] verticale. panDir vale -1 nel retro del modello.
// fronte: asse obliquo → compenso zoom con 0.55. retro: zoom esplicito in direzione schermo.
function panViewer(dx, dy) {
  if (!presenter) return;
  var pos = presenter.getTrackballPosition().slice();
  var d = dx * panDir;
  pos[4] += d;
  pos[3] += dy;
  pos[5] -= panDir === -1 ? dx * 0.12 : d * 0.55;
  presenter.animateToTrackballPosition(pos, 0.3);
}

// cos(phi − frontPhi) < 0 significa che la camera è nella metà posteriore → inverto
function watchPanDir() {
  var frontPhi = -51.213;
  setInterval(function () {
    if (!presenter) return;
    var phi = presenter.getTrackballPosition()[0];
    panDir = Math.cos((phi - frontPhi) * Math.PI / 180) >= 0 ? 1 : -1;
  }, 200);
}

function setupStoryObserver() {
  var cards = document.querySelectorAll(".story-card");

  // uso IntersectionObserver invece dello scroll event perché è più efficiente
  // la soglia 0.62 fa scattare il cambio vista quando la card è ben visibile
  var viewObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var index = Number(entry.target.getAttribute("data-view") || 0);
      heroMode = false;
      moveViewer("viewer-home");
      setActiveStory(index);
    });
  }, { threshold: 0.62 });

  // secondo observer separato per riavviare l'animazione SVG ogni volta
  // che la card torna in vista (soglia più bassa, 0.3, per anticipare un po')
  var svgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) replayCardSvg(entry.target);
    });
  }, { threshold: 0.3 });

  cards.forEach(function (card) {
    viewObserver.observe(card);
    svgObserver.observe(card);
  });
}


// ─── SEZIONE "ESPLORA" ───────────────────────────────────────────────

function setupFreeObserver() {
  var free = document.getElementById("esplora");
  if (!free) return;

  // quando l'utente arriva alla sezione esplora sposto il viewer lì
  // e riporto la camera alla vista frontale
  new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      heroMode = false;
      moveViewer("free-viewer-home");
      if (presenter) presenter.animateToTrackballPosition(freeViews.front, 0.8);
    });
  }, { threshold: 0.35 }).observe(free);
}


// ─── GAUSSIAN SPLAT (Luma) ───────────────────────────────────────────

function setupLumaObserver() {
  var frame = document.querySelector(".gaussian-frame iframe");
  if (!frame) return;

  // tengo traccia di questi due stati per mandare luma-start-pan
  // al momento giusto senza doppi invii
  var panPending = false;   // observer ha visto il frame ma lo splat non era pronto
  var splatReady = false;   // ho ricevuto luma-loaded dall'iframe

  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'luma-loaded') {
      splatReady = true;
      // se l'observer aveva già visto il frame, mando ora il segnale
      if (panPending) {
        panPending = false;
        sendStartPan();
      }
    }
  });

  function sendStartPan() {
    var pin = document.getElementById("gaussian-pin");
    if (pin) { pin.classList.remove("is-visible"); pin.style.display = "none"; }
    frame.contentWindow.postMessage({ type: "luma-start-pan" }, "*");
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      if (splatReady) {
        // splat già caricato: parto subito, un messaggio solo
        sendStartPan();
      } else {
        // splat non ancora pronto: segno il pending, partirà su luma-loaded
        panPending = true;
      }
    });
  }, { threshold: 0.45 });

  observer.observe(frame.closest(".gaussian-frame") || frame);
}


// ─── SCROLL-HINT E GO-TO-TOP ─────────────────────────────────────────

function setupScrollHint() {
  var hint = document.getElementById("scroll-hint");
  if (!hint) return;
  var label = hint.querySelector(".scroll-hint-label");
  var free = document.getElementById("esplora");
  var footer = document.querySelector(".site-footer");
  var inFree = false;
  var inFooter = false;
  var nudgeTimer = null;

  // aggiorna testo e visibilità della pillola in base alla sezione corrente
  function update() {
    hint.classList.toggle("is-visible", !inFooter);
    if (inFree) {
      hint.classList.add("is-interact");
      label.textContent = "Interagisci liberamente";
    } else {
      hint.classList.remove("is-interact");
      label.textContent = "Continua a scorrere";
    }
  }

  // pulse temporaneo quando l'utente clicca il modello in hero o story
  window._triggerScrollNudge = function () {
    if (inFree || inFooter) return;
    hint.classList.add("is-visible", "is-nudge");
    clearTimeout(nudgeTimer);
    nudgeTimer = setTimeout(function () { hint.classList.remove("is-nudge"); }, 3200);
  };

  if (free) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { inFree = e.isIntersecting; });
      update();
    }, { threshold: 0.25 }).observe(free);
  }
  if (footer) {
    // nascondo l'hint nel footer perché non ha senso "continuare a scorrere"
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { inFooter = e.isIntersecting; });
      update();
    }, { threshold: 0.15 }).observe(footer);
  }
  window.addEventListener("scroll", update);
  update();
}

function setupGoToTop() {
  var btn = document.getElementById("go-to-top");
  if (!btn) return;

  // mostro il pulsante solo dopo aver scrollato oltre il 60% della prima schermata
  window.addEventListener("scroll", function () {
    btn.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// ─── TOOLBAR DEL PLAYGROUND ──────────────────────────────────────────

function toggleButton(action, state) {
  document.querySelectorAll('[data-action="' + action + '"]').forEach(function (btn) {
    btn.classList.toggle("is-active", state);
  });
}

// resetta tutto quando l'utente lascia la sezione esplora:
// chiude misure e pick, spegne luci, ripristina texture e trackball
function resetPlaygroundState() {
  if (!presenter) return;

  if (presenter.isMeasurementToolEnabled && presenter.isMeasurementToolEnabled()) {
    presenter.enableMeasurementTool(false);
    if (typeof measureSwitch === "function") measureSwitch();
  }
  if (presenter.isPickpointModeEnabled && presenter.isPickpointModeEnabled()) {
    presenter.enablePickpointMode(false);
    if (typeof pickpointSwitch === "function") pickpointSwitch();
  }
  if (presenter.isLightTrackballEnabled && presenter.isLightTrackballEnabled()) {
    presenter.enableLightTrackball(false);
    if (typeof lightSwitch === "function") lightSwitch();
  }
  if (presenter.isSceneLightingEnabled && presenter.isSceneLightingEnabled()) {
    presenter.enableSceneLighting(false);
    if (typeof lightingSwitch === "function") lightingSwitch();
  }
  if (presenter.setInstanceSolidColor) {
    presenter.setInstanceSolidColor(HOP_ALL, false, true);
  }
  presenter.resetTrackball();

  document.getElementById("measure-box").classList.remove("is-open");
  document.getElementById("pickpoint-box").classList.remove("is-open");
  document.querySelectorAll(".tool-panel button.is-active").forEach(function (b) {
    b.classList.remove("is-active");
  });
}

// gestisce tutti i click sulla toolbar: ogni pulsante ha un data-action
// che corrisponde a un'azione 3DHOP o a un comportamento custom
function actionsToolbar(action) {
  if (!presenter) return;

  if (action === "home") presenter.resetTrackball();
  else if (action === "zoomin") presenter.zoomIn();
  else if (action === "zoomout") presenter.zoomOut();
  else if (freeViews[action]) presenter.animateToTrackballPosition(freeViews[action], 0.9);
  else if (action === "lighting") {
    presenter.enableSceneLighting(!presenter.isSceneLightingEnabled());
    if (typeof lightingSwitch === "function") lightingSwitch();
    toggleButton("lighting", presenter.isSceneLightingEnabled());
  }
  else if (action === "light") {
    // modalità "light trackball": trascini sul modello per ruotare la luce
    presenter.enableLightTrackball(!presenter.isLightTrackballEnabled());
    if (typeof lightSwitch === "function") lightSwitch();
    toggleButton("light", presenter.isLightTrackballEnabled());
  }
  else if (action === "measure") {
    presenter.enableMeasurementTool(!presenter.isMeasurementToolEnabled());
    if (typeof measureSwitch === "function") measureSwitch();
    toggleButton("measure", presenter.isMeasurementToolEnabled());
    document.getElementById("measure-box").classList.toggle("is-open", presenter.isMeasurementToolEnabled());
  }
  else if (action === "pick") {
    presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
    if (typeof pickpointSwitch === "function") pickpointSwitch();
    toggleButton("pick", presenter.isPickpointModeEnabled());
    document.getElementById("pickpoint-box").classList.toggle("is-open", presenter.isPickpointModeEnabled());
  }
  else if (action === "color") {
    // alterna tra texture fotografica e colore solido neutro
    presenter.toggleInstanceSolidColor(HOP_ALL, true);
    if (typeof colorSwitch === "function") colorSwitch();
    var solidNow = presenter.isInstanceSolidColorEnabled && presenter.isInstanceSolidColorEnabled("sarcofago");
    toggleButton("color", solidNow);
  }
  else if (action === "screenshot") presenter.saveScreenshot();
  else if (action === "copy") copyPosition();
}

// copia le coordinate attuali della camera negli appunti (usato in dev-mode)
function copyPosition() {
  if (!presenter) return;
  var pos = presenter.getTrackballPosition();
  var text = "[" + pos.map(function (n) { return Math.round(n * 1000) / 1000; }).join(", ") + "]";
  navigator.clipboard.writeText(text).then(function () {
    document.body.dataset.copied = "true";
    setTimeout(function () { delete document.body.dataset.copied; }, 900);
  });
}

// unico tooltip condiviso per tutti i pulsanti della sidebar.
// posizionato a sinistra del bottone con getBoundingClientRect + position:fixed
function setupToolTips() {
  var tip = document.createElement('div');
  tip.className = 'tool-tip';
  document.body.appendChild(tip);

  function showTip(btn) {
    var label = btn.getAttribute('title') || btn.getAttribute('aria-label');
    if (!label) return;
    tip.textContent = label;
    tip.classList.remove('is-visible');
    var r = btn.getBoundingClientRect();
    // leggo offsetWidth dopo aver aggiornato il testo, altrimenti ho le dimensioni precedenti
    requestAnimationFrame(function () {
      tip.style.top  = Math.round(r.top + (r.height - tip.offsetHeight) / 2) + 'px';
      tip.style.left = Math.round(r.left - tip.offsetWidth - 10) + 'px';
      tip.classList.add('is-visible');
    });
  }

  function hideTip() { tip.classList.remove('is-visible'); }

  document.querySelectorAll('.tool-panel button, .pan-btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () { showTip(btn); });
    btn.addEventListener('mouseleave', hideTip);
    btn.addEventListener('click',      hideTip);
  });
}


// ─── SVG ─────────────────────────────────────────────────────────────

// prepara tutti i path dell'SVG per l'animazione "draw-on":
// imposta stroke dorato e usa stroke-dashoffset per simulare il disegno a mano
function prepSvgDraw(root) {
  // alcuni SVG hanno elementi <use> con fill bianco hardcoded che
  // sovrascrivono tutto: li nascondo prima di fare qualsiasi altra cosa
  root.querySelectorAll('use').forEach(function (el) {
    if (!el.closest('defs')) el.style.setProperty('display', 'none', 'important');
  });

  var sel = "path, line, polyline, polygon, rect, circle, ellipse";
  root.querySelectorAll(sel).forEach(function (el) {
    if (el.closest('defs')) return; // gli elementi in <defs> non vengono renderizzati

    el.style.setProperty("fill", "none", "important");
    el.style.setProperty("stroke", "#e8c97a", "important");
    el.style.setProperty("stroke-width", "2.5", "important");
    el.style.setProperty("stroke-linecap", "round", "important");
    el.style.setProperty("stroke-linejoin", "round", "important");

    // getTotalLength restituisce la lunghezza del path, che uso come valore
    // di dasharray: così il path parte "nascosto" e si disegna con il CSS
    var len = el.getTotalLength ? el.getTotalLength() : 0;
    if (!len) len = 300;  // fallback per forme che non supportano getTotalLength
    el.style.setProperty("--len", len);
    el.style.setProperty("stroke-dasharray", len);
    el.style.setProperty("stroke-dashoffset", len);
  });
}

// scarica un SVG dalla cartella sarcofago e lo inserisce nel contenitore
function injectSvg(target, name) {
  fetch("resources/svg sarcofago/" + name + ".svg")
    .then(function (r) { return r.text(); })
    .then(function (svg) {
      target.innerHTML = svg;
      prepSvgDraw(target);
    });
}

// lista degli SVG decorativi che ruotano negli angoli della hero
var SVG_NAMES = ['fiori', 'mano', 'teschio', 'incappucciati', 'finestra', 'stemma'];

// carica un SVG decorativo in uno slot della hero.
// se lo slot era già visibile: aggiunge .is-leaving che triggera eraseOrnament (CSS, 0.6s)
// e rimuove .is-visible così fade-out e path-erase partono insieme.
// dopo 650ms inietta il nuovo SVG e aggiunge .is-visible → draw + fade-in insieme.
// al primo caricamento usa il delay sfalsato passato dall'esterno.
function injectOrnamentSvg(slot, name, delay) {
  fetch('resources/svg decorativi/' + name + '.svg').then(function (r) { return r.text(); }).then(function (svg) {
    var wasVisible = slot.classList.contains('is-visible');

    if (wasVisible) {
      slot.classList.add('is-leaving');
      slot.classList.remove('is-visible');
    }

    setTimeout(function () {
      slot.classList.remove('is-leaving');
      slot.innerHTML = svg;
      prepSvgDraw(slot);
      setTimeout(function () { slot.classList.add('is-visible'); }, 80);
    }, wasVisible ? 650 : delay);
  });
}

function loadSvgArtwork() {
  var intro = document.getElementById('intro-art');
  var brand = document.getElementById('brand-mark');

  if (intro) injectSvg(intro, 'sarcofago');
  if (brand) {
    injectSvg(brand, 'sarcofago');
    // il logo usa lo stesso file SVG ma senza animazione: azzero il dashoffset
    setTimeout(function () {
      brand.querySelectorAll('path, line, polyline, polygon, rect, circle, ellipse').forEach(function (el) {
        el.style.strokeDasharray = '';
        el.style.strokeDashoffset = '0';
      });
    }, 200);
  }

  // carica l'illustrazione SVG di ogni story-card (il nome del file è in data-svg)
  document.querySelectorAll('[data-svg]').forEach(function (el) {
    if (!el.classList.contains('ornament')) {
      injectSvg(el, el.getAttribute('data-svg') || 'sarcofago');
    }
  });

  // distribuisce gli SVG decorativi nei 5 slot della hero in ordine casuale
  // così non escono sempre nello stesso ordine al ricaricamento
  var slots = Array.from(document.querySelectorAll('.ornament[id^="orn-"]'));
  var shuffled = SVG_NAMES.slice().sort(function () { return Math.random() - 0.5; });
  slots.forEach(function (slot, i) {
    var name = shuffled[i % shuffled.length];
    slot.dataset.currentSvg = name;
    injectOrnamentSvg(slot, name, i * 400);
  });

  // ogni 3-5 secondi cambia uno slot a caso
  // filtro gli SVG già in uso per evitare di avere duplicati contemporaneamente
  function rotateSomeSvgs() {
    var liveSlots = Array.from(document.querySelectorAll('.ornament[id^="orn-"]'));
    var used = liveSlots.map(function (s) { return s.dataset.currentSvg || ''; });
    var slot = liveSlots[Math.floor(Math.random() * liveSlots.length)];
    var available = SVG_NAMES.filter(function (n) { return !used.includes(n); });
    if (available.length === 0) available = SVG_NAMES.slice();
    var next = available[Math.floor(Math.random() * available.length)];
    slot.dataset.currentSvg = next;
    injectOrnamentSvg(slot, next, 0);
    setTimeout(rotateSomeSvgs, 3000 + Math.random() * 2000);
  }
  setTimeout(rotateSomeSvgs, 2000);
}

// riavvia l'animazione SVG di una card quando torna in viewport
// funziona come in injectOrnamentSvg: reset → reflow → riavvio
function replayCardSvg(card) {
  var svg = card.querySelector(".card-svg");
  if (!svg) return;
  var sel = "path, line, polyline, polygon, rect, circle, ellipse";
  svg.querySelectorAll(sel).forEach(function (el) {
    if (el.closest('defs')) return;
    el.style.animation = "none";
    el.style.strokeDashoffset = el.style.getPropertyValue("--len") || "200";
  });
  void svg.offsetWidth;
  svg.querySelectorAll(sel).forEach(function (el) {
    if (el.closest('defs')) return;
    el.style.animation = "";
  });
}


// ─── SPLASH ──────────────────────────────────────────────────────────

function finishSplash() {
  // aspetto 4.2 secondi e poi faccio sparire l'overlay di apertura
  setTimeout(function () {
    document.getElementById("intro-overlay").classList.add("is-done");
  }, 4200);
}


// ─── SCROLL ──────────────────────────────────────────────────────────

function setupScrollMotion() {
  var heroSection = document.querySelector(".hero-scroll");
  var heroCopy = document.getElementById("hero-copy");
  var heroViewer = document.getElementById("hero-viewer-home");
  var gallery = document.querySelector(".photo-gallery");
  var galleryTrack = document.querySelector(".gallery-track");
  var footer = document.querySelector(".site-footer");

  function update() {
    // per la hero calcolo quanto si è scrollato dentro la sezione (valore 0-1)
    // e aggiorno la variabile CSS --hero-parallax che muove i vari layer
    if (heroSection) {
      var hr = heroSection.getBoundingClientRect();
      var hRange = heroSection.offsetHeight - window.innerHeight;
      var hp = Math.max(0, Math.min(1, -hr.top / hRange));

      document.documentElement.style.setProperty("--hero-parallax", Math.min(hp / 0.38, 1).toFixed(3));

      // a 0.25 di scroll faccio sparire il testo del titolo
      if (heroCopy) heroCopy.classList.toggle("phase-out", hp > 0.25);

      // a 0.43 di scroll faccio comparire il viewer 3D e lo sposto nella hero
      if (heroViewer) {
        var modelIn = hp > 0.43 && hp < 0.99;
        heroViewer.classList.toggle("phase-in", modelIn);
        if (modelIn && currentViewerHome !== "hero-viewer-home") {
          moveViewer("hero-viewer-home");
          heroMode = true;
        }
      }
    }

    // per il footer aggiorno --footer-parallax che sposta l'immagine di sfondo
    if (footer) {
      var fr = footer.getBoundingClientRect();
      var center = fr.top + fr.height / 2 - window.innerHeight / 2;
      var fp = Math.max(-1, Math.min(1, -center / window.innerHeight));
      document.documentElement.style.setProperty("--footer-parallax", (fp * 80).toFixed(1) + "px");
    }

    // per la galleria calcolo di quanto traslare orizzontalmente la striscia
    // in base a quanto spazio "extra" ha rispetto alla larghezza della finestra
    if (gallery && galleryTrack) {
      var gr = gallery.getBoundingClientRect();
      var gRange = gallery.offsetHeight - window.innerHeight;
      var gp = Math.max(0, Math.min(1, -gr.top / gRange));
      var overflow = galleryTrack.scrollWidth - window.innerWidth + 160;
      document.documentElement.style.setProperty("--gallery-x", (-overflow * gp).toFixed(1) + "px");
    }
  }

  window.addEventListener("scroll", update);
  update();
}

// fa ruotare lentamente il modello nella hero usando requestAnimationFrame
// il controllo sul timestamp serve a non farlo girare troppo veloce
function spinHeroViewer(time) {
  requestAnimationFrame(spinHeroViewer);
  if (!presenter || !heroMode || currentViewerHome !== "hero-viewer-home") return;
  if (time - lastHeroSpin < 85) return;  // ~12 fps
  lastHeroSpin = time;
  var p = presenter.getTrackballPosition();
  p[0] = p[0] + 0.35;  // incremento phi per la rotazione orizzontale
  presenter.setTrackballPosition(p);
}


// ─── AVVIO ───────────────────────────────────────────────────────────

// forzo sempre il ritorno in cima: evita che il browser ripristini
// la posizione di scroll precedente al ricaricamento
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('beforeunload', function () { window.scrollTo(0, 0); })

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);

  // carico gli SVG e avvio il conto alla rovescia per chiudere lo splash
  loadSvgArtwork();
  finishSplash();

  // inizializzo 3DHOP (init3dhop viene da 3dhop/js/init.js)
  init3dhop();
  setup3dhop();

  // posiziono il viewer nella hero con la camera di partenza
  moveViewer("hero-viewer-home");
  heroMode = true;
  resize3dhop();
  if (presenter) presenter.setTrackballPosition([-138.845, -5.162, 0, 0, 0, 1.611]);

  // attivo tutti gli observer e il loop di scroll
  setupScrollMotion();
  setupStoryObserver();
  setupFreeObserver();
  setupLumaObserver();
  setupGoToTop();
  setupScrollHint();
  setupToolTips();
  watchPanDir();
  requestAnimationFrame(spinHeroViewer);

  // evento delegation sulla toolbar e sul pan-cross (il bottone Home sta lì)
  document.querySelector(".tool-sidebar").addEventListener("click", function (event) {
    var button = event.target.closest("button[data-action]");
    if (!button) return;
    actionsToolbar(button.getAttribute("data-action"));
  });

  // premendo "d" si attiva la dev-mode che mostra i controlli Luma nascosti
  document.addEventListener('keydown', function (e) {
    if (e.key === 'd' || e.key === 'D') document.body.classList.toggle('dev-mode');
  });

  // click sul canvas (hero/story) o sulla galleria → nudge della scroll-hint
  document.addEventListener('mousedown', function (e) {
    var nudge = window._triggerScrollNudge;
    if (typeof nudge !== 'function') return;

    // canvas 3DHOP in hero o story
    if (currentViewerHome === 'hero-viewer-home' || currentViewerHome === 'viewer-home') {
      var canvas = document.getElementById('draw-canvas');
      if (canvas) {
        var r = canvas.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          nudge(); return;
        }
      }
    }

    // galleria fotografica
    var gallery = document.querySelector('.photo-gallery');
    if (gallery && gallery.contains(e.target)) nudge();
  });

  // ascolto i messaggi che arrivano dall'iframe del gaussian splat
  window._lumaCamera = null;
  window.addEventListener('message', function (e) {
    if (!e.data) return;

    // luma-camera arriva ogni 500ms con la posizione attuale della camera
    if (e.data.type === 'luma-camera' && e.data.pos) {
      window._lumaCamera = e.data;
      var camBtn = document.querySelector('[data-luma="copy"]');
      if (camBtn) {
        var p = e.data.pos, t = e.data.target;
        camBtn.title = 'pos: [' + p.map(function (n) { return n.toFixed(3); }).join(', ') + ']'
          + '  target: [' + t.map(function (n) { return n.toFixed(3); }).join(', ') + ']';
      }
    }
    // luma-arrived segnala che la pan automatica è finita: mostro il pin oro
    if (e.data.type === 'luma-arrived') {
      var pin = document.getElementById('gaussian-pin');
      if (pin) {
        pin.style.display = '';
        setTimeout(function () { pin.classList.add('is-visible'); }, 60);
      }
    }
  });

  // pulsanti dev-mode per muovere la camera del gaussian splat via postMessage
  document.querySelectorAll('.luma-dev-tools button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var action = this.getAttribute('data-luma');
      var iframe = document.querySelector('.gaussian-frame iframe');
      if (!iframe) return;

      if (action === 'copy') {
        var cam = window._lumaCamera;
        var text;
        if (cam && cam.pos) {
          var p = cam.pos, t = cam.target;
          text = 'pos: [' + p.map(function (n) { return n.toFixed(3); }).join(', ') + ']'
            + '  target: [' + t.map(function (n) { return n.toFixed(3); }).join(', ') + ']';
        } else {
          text = 'N/D – interagisci con la scena prima di copiare';
        }
        navigator.clipboard.writeText(text).then(function () {
          var orig = btn.textContent;
          btn.textContent = '✓ Copiato';
          setTimeout(function () { btn.textContent = orig; }, 1200);
        });
      } else {
        iframe.contentWindow.postMessage({ type: 'luma-cmd', action: action, step: 0.4 }, '*');
      }
    });
  });

  // 3DHOP non ascolta il resize della finestra da solo
  window.addEventListener("resize", resize3dhop);
});
