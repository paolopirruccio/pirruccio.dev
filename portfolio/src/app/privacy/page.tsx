import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy — Paolo Pirruccio",
  description: "Informazioni sul trattamento dei dati di pirruccio.dev e La Bussola di InfoUma.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <a className="privacy-back" href="/io">← Torna al portfolio</a>
      <header>
        <p>Ultimo aggiornamento: 8 settembre 2026</p>
        <h1>Privacy policy</h1>
        <p>Questa informativa riguarda il portfolio pirruccio.dev e il progetto La Bussola di InfoUma ospitato sullo stesso dominio.</p>
      </header>
      <section>
        <h2>Titolare e contatti</h2>
        <p>Il titolare del trattamento è Paolo Pirruccio. Per richieste relative alla privacy puoi scrivere a <a href="mailto:pirruccio.01@gmail.com?subject=Privacy%20pirruccio.dev">pirruccio.01@gmail.com</a>.</p>
      </section>
      <section>
        <h2>Dati di navigazione e analytics</h2>
        <p>Il sito utilizza Cloudflare Web Analytics per conoscere in forma aggregata visite e prestazioni delle pagine. Il servizio può elaborare informazioni come pagina visitata, provenienza, paese approssimativo, tipo di dispositivo, browser, sistema operativo e metriche tecniche di caricamento.</p>
        <p>Cloudflare dichiara che Web Analytics non usa cookie, localStorage o fingerprinting per le metriche di utilizzo e che l’indirizzo IP ricevuto durante la normale comunicazione di rete viene eliminato presso il data center Cloudflare più vicino senza essere conservato nei database o nei log principali.</p>
        <p>Il trattamento serve a misurare il funzionamento e l’utilizzo del sito e a migliorarne contenuti e prestazioni. Maggiori informazioni sono disponibili nella <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">privacy policy di Cloudflare</a> e nella <a href="https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" target="_blank" rel="noreferrer">documentazione di Web Analytics</a>.</p>
      </section>
      <section>
        <h2>Preferenze salvate sul dispositivo</h2>
        <p>La Bussola usa la memoria locale del browser per ricordare esclusivamente preferenze funzionali, tra cui lingua, tema, schema colore, aule preferite e chiusura dell’avviso di installazione. Queste informazioni rimangono sul dispositivo e possono essere eliminate cancellando i dati del sito dalle impostazioni del browser.</p>
      </section>
      <section>
        <h2>Email, servizi e collegamenti esterni</h2>
        <p>I pulsanti email aprono il programma di posta dell’utente: il sito non riceve né archivia il contenuto finché non viene inviata volontariamente un’email. La Bussola consulta inoltre servizi pubblici dell’Università di Pisa per mostrare informazioni su lezioni, aule e persone; durante tali richieste i relativi gestori possono ricevere i normali dati tecnici di connessione secondo le proprie informative.</p>
        <p>Il sito contiene collegamenti verso servizi esterni. Aprendoli si applicano le informative privacy dei rispettivi gestori.</p>
      </section>
      <section>
        <h2>Diritti e modifiche</h2>
        <p>Puoi contattare il titolare per chiedere informazioni, accesso, rettifica o cancellazione degli eventuali dati comunicati direttamente. Questa informativa potrà essere aggiornata quando cambiano le funzionalità o i servizi utilizzati.</p>
      </section>
    </main>
  );
}
