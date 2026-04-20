import { notFound } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import { PrintInvoiceButton } from "@/components/print-invoice-button";
import { formatCurrency } from "@/lib/format";
import { getInvoice } from "@/lib/store";

export default async function PrintInvoicePage({
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
    <main className="min-h-screen bg-[#f6f3ea] px-4 py-5 text-[#1a1830] print:bg-white print:px-0 print:py-0">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#2c1973]/10 bg-white p-8 shadow-[0_12px_30px_rgba(44,25,115,0.06)] print:rounded-none print:border-none print:p-4 print:shadow-none">
        <div className="mb-4 flex items-center justify-between border-b border-[#2c1973]/12 pb-3">
          <BrandMark compact />
          <p className="text-xs uppercase tracking-[0.3em] text-[#4d496d]">International Invoice</p>
        </div>
        <div className="grid grid-cols-[0.72fr_1.28fr] items-start gap-6 border-b border-[#2c1973]/12 pb-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#2c1973]">
              Invoice
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight print:text-[1.9rem]">
              {invoice.number}
            </h1>
            <p className="mt-2 max-w-md text-sm leading-5 text-[#4d496d]">{invoice.title}</p>
          </div>
          <div className="min-w-0 text-sm leading-5 text-[#4d496d]">
            <p className="font-semibold text-[#20194f]">{owner?.businessName || owner?.name}</p>
            <p>{owner?.taxId ? `Tax ID / CNPJ: ${owner.taxId}` : "Tax ID / CNPJ not informed"}</p>
            <p className="whitespace-pre-line">{owner?.address || "Address not informed"}</p>
            <p>{owner?.email || "Email not informed"}</p>
          </div>
        </div>

        <div className="grid gap-5 border-b border-[#2c1973]/12 py-5 md:grid-cols-[1.3fr,0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b6788]">
              Bill to
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#20194f]">{client?.company}</h2>
            <div className="mt-3 text-sm leading-5 text-[#4d496d]">
              <p>{client?.name}</p>
              <p className="whitespace-pre-line">{client?.address || "Address not informed"}</p>
              <p>{client?.email || "Email not informed"}</p>
              <p>{client?.country || "Country not informed"}</p>
            </div>
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-lg border border-[#2c1973]/10 bg-[#fbfaf6] p-4">
              <p className="text-[#6b6788]">Issue date</p>
              <p className="mt-2 font-semibold text-[#20194f]">{invoice.issueDate}</p>
            </div>
            <div className="rounded-lg border border-[#2c1973]/10 bg-[#fbfaf6] p-4">
              <p className="text-[#6b6788]">Due date</p>
              <p className="mt-2 font-semibold text-[#20194f]">{invoice.dueDate}</p>
            </div>
            <div className="rounded-lg border border-[#2c1973]/10 bg-[#fbfaf6] p-4">
              <p className="text-[#6b6788]">Reference</p>
              <p className="mt-2 font-semibold text-[#20194f]">{invoice.reference || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="py-5">
          <table className="min-w-full divide-y divide-[#2c1973]/12">
            <thead>
              <tr className="text-left text-sm text-[#6b6788]">
                <th className="py-3">Description</th>
                <th className="py-3">Qty</th>
                <th className="py-3">Unit price</th>
                <th className="py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c1973]/12 text-sm text-[#4d496d]">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 pr-4">{item.description}</td>
                  <td className="py-3 pr-4">{item.quantity}</td>
                  <td className="py-3 pr-4">{formatCurrency(item.unitPrice, invoice.currency)}</td>
                  <td className="py-3 text-right font-semibold text-[#20194f]">
                    {formatCurrency(item.total, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 border-t border-[#2c1973]/12 pt-4 [break-inside:avoid] print:[break-inside:avoid] md:grid-cols-[1.1fr,0.9fr]">
          <div className="grid gap-4 text-sm leading-6 text-[#4d496d] md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b6788]">
                Payment details
              </p>
              <p className="mt-2 whitespace-pre-line">
                {invoice.paymentDetails || owner?.paymentDetails || "Not informed"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b6788]">
                Notes
              </p>
              <p className="mt-2 whitespace-pre-line">{invoice.notes || "No notes"}</p>
            </div>
          </div>
          <div className="rounded-lg border border-[#2c1973]/12 bg-[#20194f] p-4 text-white print:p-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[#f7c400]">Amount due</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight print:text-[1.85rem]">
              {formatCurrency(invoice.total, invoice.currency)}
            </p>
            <PrintInvoiceButton
              className="mt-4 rounded-lg bg-[#f7c400] px-5 py-3 text-sm font-semibold text-[#2c1973] transition hover:bg-[#ffd84b] print:hidden"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
