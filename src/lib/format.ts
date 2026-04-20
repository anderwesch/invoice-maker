import type { InvoiceStatus } from "@/lib/types";

export function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function statusLabel(status: InvoiceStatus) {
  const labels: Record<InvoiceStatus, string> = {
    draft: "Rascunho",
    sent: "Enviada",
    paid: "Paga",
    overdue: "Vencida",
    cancelled: "Cancelada",
  };

  return labels[status];
}

export function statusClasses(status: InvoiceStatus) {
  const map: Record<InvoiceStatus, string> = {
    draft: "border border-[#f7c400]/50 bg-[#fff1ad] text-[#2c1973]",
    sent: "border border-[#2c1973]/20 bg-[#ece8ff] text-[#2c1973]",
    paid: "border border-[#28a36a]/25 bg-[#dff7ea] text-[#0f6b43]",
    overdue: "border border-[#d24848]/25 bg-[#ffe0df] text-[#962d2d]",
    cancelled: "border border-[#2c1973]/12 bg-[#f1effa] text-[#5b5780]",
  };

  return map[status];
}
