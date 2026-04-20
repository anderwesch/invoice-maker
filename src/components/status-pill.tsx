import { statusClasses, statusLabel } from "@/lib/format";
import type { InvoiceStatus } from "@/lib/types";

type StatusPillProps = {
  status: InvoiceStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusClasses(status)}`}
    >
      {statusLabel(status)}
    </span>
  );
}
