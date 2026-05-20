/**
 * access-guard.js
 * Verifica che la pagina sia stata raggiunta tramite il portfolio.
 * Se la chiave sessionStorage 'portfolio_ref' è assente mostra un overlay
 * di errore invece di reindirizzare, così l'URL rimane leggibile e
 * l'utente sa cosa sta succedendo.
 *
 * Per modificare il messaggio o lo stile edita solo questo file.
 */
(function () {
  var allowed = sessionStorage.getItem('portfolio_ref');

  if (allowed) {
    sessionStorage.removeItem('portfolio_ref');
    return;
  }

  /* ── overlay ── */
  var overlay = document.createElement('div');
  overlay.id = 'access-guard-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    background: '#050505',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    zIndex: '99999',
    fontFamily: '"Montserrat", sans-serif',
    color: 'rgba(245,239,229,0.7)',
    textAlign: 'center',
    padding: '24px',
  });

  overlay.innerHTML = `
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
         stroke="rgba(215,180,106,0.8)" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
    <p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;
              color:rgba(215,180,106,0.9);margin:0;">Accesso limitato</p>
    <p style="font-size:15px;max-width:380px;line-height:1.6;margin:0;">
      Questa pagina è accessibile solo tramite il portfolio.<br>
      Torna alla home per visitarla correttamente.
    </p>
    <a href="../index.html"
       style="margin-top:8px;padding:10px 24px;border:1px solid rgba(215,180,106,0.5);
              border-radius:999px;font-size:13px;color:rgba(215,180,106,0.9);
              text-decoration:none;letter-spacing:.08em;"
       onmouseover="this.style.background='rgba(215,180,106,0.12)'"
       onmouseout="this.style.background='transparent'">
      Vai al Portfolio
    </a>
  `;

  document.body.insertBefore(overlay, document.body.firstChild);
  document.documentElement.style.overflow = 'hidden';
})();
