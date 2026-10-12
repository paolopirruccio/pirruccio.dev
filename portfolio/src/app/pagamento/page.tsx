import type { Metadata } from "next";
import PagamentoPanel from "./PagamentoPanel";

export const metadata: Metadata = {
  title: "Dati di pagamento — Paolo Pirruccio",
  description: "Dati per inviare un pagamento.",
  robots: { index: false, follow: false },
};

export default function PagamentoPage() {
  return <PagamentoPanel />;
}
