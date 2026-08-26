/**
 * mostraMessaggio(messaggio, tipo)
 * tipo: 'successo' | 'errore' | 'info'  (anche alias 'success' / 'error')
 * Crea un toast floating che si auto-rimuove dopo 4s.
 * Nessuna dipendenza jQuery — vanilla JS puro.
 */

function mostraMessaggio(messaggio, tipo) {
    const aliasMap = {
        success: 'messaggio-successo',
        successo: 'messaggio-successo',
        error: 'messaggio-errore',
        errore: 'messaggio-errore',
        info: 'messaggio-info',
    };
    const tipoClass = aliasMap[tipo] || 'messaggio-info';

    let container = document.getElementById('_toast-stack');
    if (!container) {
        container = document.createElement('div');
        container.id = '_toast-stack';
        Object.assign(container.style, {
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            zIndex: '99999',
            pointerEvents: 'none',
            width: 'max-content',
            maxWidth: '90vw',
        });
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `messaggio ${tipoClass}`;
    toast.textContent = messaggio;
    container.appendChild(toast);

    // Trigger slide-up animation (double rAF ensures transition runs)
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('mostra')));

    setTimeout(() => {
        toast.classList.remove('mostra');
        toast.addEventListener('transitionend', () => {
            toast.remove();
            if (!container.children.length) container.remove();
        }, { once: true });
    }, 4000);
}
