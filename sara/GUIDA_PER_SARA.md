# Guida per Sara - Modifica Testi Sito

Ciao Sara! Ecco come puoi modificare i testi del tuo sito web in modo semplice e veloce.

## Come funziona
Tutti i testi del sito si trovano in un unico file chiamato `testi.txt`.
Il sito legge questo file ogni volta che viene caricato. Questo significa che ti basta modificare questo file e salvare per vedere i cambiamenti online.

## Come modificare i testi

1.  Apri il file `testi.txt`.
2.  Troverai i testi divisi per lingua:
    - `[IT]` per l'Italiano
    - `[ES]` per lo Spagnolo
    - `[EN]` per l'Inglese
3.  Ogni riga è composta da una "chiave" (che dice al computer DOVE mettere il testo) e dal "valore" (il testo vero e proprio).
    - Esempio: `hero_title = Prezzi bassi, qualità super.`
4.  **Modifica solo la parte a destra dell'uguale (=)**.
    - **GIUSTO**: `hero_title = Nuova offerta speciale!`
    - **SBAGLIATO**: `titolo_principale = Nuova offerta speciale!` (Non toccare la parte a sinistra!)

## Regole importanti
- **Non cancellare le virgolette o parentesi quadre** (come [IT]).
- **Scrivi tutto su una riga**: Se il testo è lungo, continua a scrivere sulla stessa riga. Il sito lo manderà a capo automaticamente dove serve.
- **Accenti e caratteri speciali**: Puoi usarli liberamente (è, é, à, ò, ù, ñ, etc.).
- **Commenti**: Le righe che iniziano con `#` sono commenti e vengono ignorate dal sito. Puoi usarle per lasciarti degli appunti.

## Esempio pratico
Se vuoi cambiare il titolo principale in italiano:

1.  Cerca la sezione `[IT]`.
2.  Cerca la riga `hero_title = ...`
3.  Cambia il testo dopo l'uguale.

```text
[IT]
...
hero_title = Impara l'italiano con il sorriso!
...
```

Salva il file e ricarica la pagina del sito per vedere il risultato!
