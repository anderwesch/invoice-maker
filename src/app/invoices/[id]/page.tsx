import Link from "next/link";
import { notFound } from "next/navigation";

import {
  deleteInvoiceAction,
  duplicateInvoiceAction,
  updateInvoiceStatusAction,
} from "@/app/actions";
import { Shell } from "@/components/shell";
import { StatusPill } from "@/components/status-pill";
import { formatCurrency, formatDate } from "@/lib/format";
import { getInvoice } from "@/lib/store";
import type { InvoiceStatus } from "@/lib/types";

const statuses: InvoiceStatus[] = ["draft", "sent", "paid", "overdue", "cancelled"];

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getInvoice(id);

  if (!data) {
    notFound();
  }

  const { invoice, client, owner } = data;

  return (
    <Shell>
      <section className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
        <article className="rounded-xl border border-[#2c1973]/10 bg-white p-6 shadow-[0_12px_30px_rgba(44,25,115,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
                Invoice
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#20194f]">
                {invoice.number}
              </h2>
            </div>
            <StatusPill status={invoice.status} />
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border border-[#2c1973]/12 bg-[#fbfaf6] p-5 text-sm text-[#4d496d]">
            <p>
              <span className="font-semibold text-[#20194f]">Emitido por:</span>{" "}
              {owner?.businessName || owner?.name || "Perfil sem nome"}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Cliente:</span>{" "}
              {client?.company || "Cliente não encontrado"}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Issue date:</span>{" "}
              {formatDate(invoice.issueDate)}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Due date:</span>{" "}
              {formatDate(invoice.dueDate)}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Referência:</span>{" "}
              {invoice.reference || "Sem referência"}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Total:</span>{" "}
              {formatCurrency(invoice.total, invoice.currency)}
            </p>
          </div>

          <form action={updateInvoiceStatusAction} className="mt-6 grid gap-3">
            <input type="hidden" name="invoiceId" value={invoice.id} />
            <label className="grid gap-2 text-sm">
              <span>Atualizar status</span>
              <select
                name="status"
                defaultValue={invoice.status}
                className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#2c1973] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(44,25,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#3b24a4]"
              >
                Salvar status
              </button>
              <Link
                href={`/invoices/${invoice.id}/edit`}
                className="rounded-xl border border-[#2c1973]/15 bg-white/92 px-5 py-3 text-sm font-semibold text-[#2c1973] shadow-[0_8px_24px_rgba(44,25,115,0.08)] transition hover:-translate-y-0.5 hover:border-[#2c1973]/35 hover:bg-[#2c1973] hover:text-white"
              >
                Editar invoice
              </Link>
              <Link
                href={`/invoices/${invoice.id}/print`}
                className="rounded-xl border border-[#2c1973]/15 bg-white/92 px-5 py-3 text-sm font-semibold text-[#2c1973] shadow-[0_8px_24px_rgba(44,25,115,0.08)] transition hover:-translate-y-0.5 hover:border-[#2c1973]/35 hover:bg-[#2c1973] hover:text-white"
              >
                Abrir versão de impressão
              </Link>
              <button
                type="submit"
                formAction={duplicateInvoiceAction}
                className="rounded-xl border border-[#2c1973]/15 bg-white/92 px-5 py-3 text-sm font-semibold text-[#2c1973] shadow-[0_8px_24px_rgba(44,25,115,0.08)] transition hover:-translate-y-0.5 hover:border-[#2c1973]/35 hover:bg-[#2c1973] hover:text-white"
              >
                Duplicar invoice
              </button>
            </div>
          </form>

          <form action={deleteInvoiceAction} className="mt-3 flex justify-end">
            <input type="hidden" name="invoiceId" value={invoice.id} />
            <button
              type="submit"
              className="rounded-xl border border-[#d24848]/20 bg-white px-5 py-3 text-sm font-semibold text-[#a53a3a] transition hover:-translate-y-0.5 hover:bg-[#fff1f1]"
            >
              Excluir invoice
            </button>
          </form>
        </article>

        <article className="rounded-xl border border-[#2c1973]/10 bg-white p-6 shadow-[0_12px_30px_rgba(44,25,115,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
                Breakdown
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#20194f]">
                {invoice.title}
              </h2>
            </div>
            <p className="rounded-lg bg-[#2c1973] px-4 py-3 text-3xl font-semibold tracking-tight text-white shadow-[0_14px_32px_rgba(44,25,115,0.18)]">
              {formatCurrency(invoice.total, invoice.currency)}
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-[#2c1973]/12">
            <table className="min-w-full divide-y divide-stone-200 text-sm">
              <thead className="bg-[#f4f1e4] text-left text-[#4d496d]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Descrição</th>
                  <th className="px-4 py-3 font-semibold">Qtd.</th>
                  <th className="px-4 py-3 font-semibold">Unit.</th>
                  <th className="px-4 py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-[#4d496d]">{item.description}</td>
                    <td className="px-4 py-3 text-[#4d496d]">{item.quantity}</td>
                    <td className="px-4 py-3 text-[#4d496d]">
                      {formatCurrency(item.unitPrice, invoice.currency)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#20194f]">
                      {formatCurrency(item.total, invoice.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border border-[#2c1973]/12 bg-[#fbfaf6] p-5 text-sm text-[#4d496d]">
            <p>
              <span className="font-semibold text-[#20194f]">Payment details:</span>{" "}
              {invoice.paymentDetails || owner?.paymentDetails || "Not informed"}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Notes:</span>{" "}
              {invoice.notes || "No additional notes"}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Sender address:</span>{" "}
              {owner?.address || "Not informed"}
            </p>
            <p>
              <span className="font-semibold text-[#20194f]">Client address:</span>{" "}
              {client?.address || "Not informed"}
            </p>
          </div>
        </article>
      </section>
    </Shell>
  );
}
