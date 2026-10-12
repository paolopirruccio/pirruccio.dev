"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./page.module.css";

type MoneyPiece = {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
};

const moneyEmojis = ["💸", "💵", "💶", "🪙"];

const methods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: "fa-brands fa-paypal",
    value: "@PaoloPirruccio",
    hint: "Tag PayPal.Me",
    openUrl: "https://www.paypal.me/PaoloPirruccio",
    openLabel: "Apri in PayPal",
  },
  {
    id: "revolut",
    name: "Revolut",
    icon: "revolut-mark",
    value: "@ppirruccio",
    hint: "Revtag",
    openUrl: "https://revolut.me/ppirruccio",
    openLabel: "Apri in Revolut",
  },
  {
    id: "postepay",
    name: "PostePay",
    icon: "fa-solid fa-credit-card",
    value: "3334012717",
    hint: "Numero PostePay",
  },
  {
    id: "bank",
    name: "Bonifico",
    icon: "fa-solid fa-building-columns",
    value: "IT98E0366901600212575774520",
    hint: "Intestatario Paolo Pirruccio",
  },
] as const;

export default function PagamentoPanel() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [moneyPieces, setMoneyPieces] = useState<MoneyPiece[]>([]);
  const burstTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selected = methods.find((method) => method.id === selectedId);

  useEffect(() => () => {
    if (burstTimeout.current) clearTimeout(burstTimeout.current);
  }, []);

  const triggerMoneyConfetti = () => {
    if (burstTimeout.current) clearTimeout(burstTimeout.current);
    setMoneyPieces(Array.from({ length: 18 }, (_, id) => ({
      id,
      emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 180,
      duration: 1800 + Math.random() * 400,
      drift: (Math.random() - 0.5) * 150,
      spin: (Math.random() - 0.5) * 900,
    })));
    burstTimeout.current = setTimeout(() => setMoneyPieces([]), 2500);
  };

  const chooseMethod = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
      return;
    }
    setSelectedId(id);
    setCopied(false);
    setCopyError(false);
    triggerMoneyConfetti();
  };

  const copyValue = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.value);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="payment-title">
        <h1 id="payment-title">Dati di pagamento</h1>
        <p className={styles.intro}>Scegli il metodo che preferisci.</p>

        <div className={styles.methods} aria-label="Metodi di pagamento">
          {methods.filter((method) => !selectedId || method.id === selectedId).map((method) => (
            <button
              className={`${styles.method} ${selectedId === method.id ? styles.selected : ""}`}
              data-method={method.id}
              key={method.id}
              type="button"
              aria-pressed={selectedId === method.id}
              onClick={() => chooseMethod(method.id)}
            >
              {method.id === "revolut" ? (
                <svg className={`${styles.revolutMark} ${styles.methodIcon}`} viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M7 3.5h12.2c6.6 0 10.3 3.4 10.3 8.8 0 3.9-1.9 6.6-5.4 8l6.2 8.2h-8.4l-5.1-7.1h-2.8v7.1H7V3.5Zm7 6.1v6.5h4.5c2.5 0 3.8-1 3.8-3.3s-1.3-3.2-3.8-3.2H14Z" />
                </svg>
              ) : (
                <i className={`${method.icon} ${styles.methodIcon}`} aria-hidden="true" />
              )}
              <span>{method.name}</span>
              <i className={`fa-solid ${selectedId === method.id ? "fa-chevron-up" : "fa-chevron-down"} ${styles.arrow}`} aria-hidden="true" />
            </button>
          ))}
        </div>

        {selected && (
          <section className={styles.details} aria-live="polite" aria-labelledby="payment-detail-title">
            <div className={styles.detailHeading}>
              <div>
                <p className={styles.detailLabel}>{selected.name}</p>
                <h2 id="payment-detail-title">{selected.hint}</h2>
              </div>
              <button className={styles.closeButton} type="button" aria-label="Chiudi il metodo selezionato" onClick={() => setSelectedId(null)}>
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>
            <code className={styles.identifier}>{selected.value}</code>
            <div className={styles.actions}>
              <button className={styles.copyButton} type="button" onClick={copyValue}>
                <i className="fa-regular fa-copy" aria-hidden="true" />
                {copied ? "Copiato" : "Copia"}
              </button>
              {"openUrl" in selected && (
                <a className={styles.openButton} href={selected.openUrl} target="_blank" rel="noopener noreferrer">
                  {selected.openLabel} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              )}
            </div>
            {copyError && <p className={styles.copyError} role="status">Copia non riuscita. Seleziona e copia il dato manualmente.</p>}
          </section>
        )}
      </section>
      {moneyPieces.length > 0 && (
        <div className={styles.moneyConfetti} aria-hidden="true">
          {moneyPieces.map((piece) => (
            <span
              className={styles.moneyPiece}
              key={piece.id}
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.delay}ms`,
                animationDuration: `${piece.duration}ms`,
                "--money-drift": `${piece.drift}px`,
                "--money-spin": `${piece.spin}deg`,
              } as CSSProperties}
            >
              {piece.emoji}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
