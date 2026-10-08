import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>Questa pagina non c&apos;è.</h1>
      <p className={styles.message}>
        Il link potrebbe essere cambiato o la pagina non esiste più.
      </p>
      <Link className={styles.home} href="/">
        Torna alla home
      </Link>
    </main>
  );
}
