import Link from "next/link";

import { createInvoiceAction } from "@/app/actions";
import { InvoiceForm } from "@/components/invoice-form";
import { Shell } from "@/components/shell";
import { getClients, getProfiles } from "@/lib/store";

export default async function NewInvoicePage() {
  const [clients, profiles] = await Promise.all([getClients(), getProfiles()]);
  const issueDate = new Date();
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 7);
  const issueDateDefault = issueDate.toISOString().slice(0, 10);
  const dueDateDefault = dueDate.toISOString().slice(0, 10);

  return (
    <Shell>
      {clients.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-[#2c1973]/20 bg-white/92 px-8 py-16 text-center shadow-[0_20px_50px_rgba(44,25,115,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
            Pré-requisito
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#20194f]">
            Cadastre um cliente antes de criar a primeira invoice
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-600">
            O fluxo já está pronto, mas precisamos de pelo menos um cliente para preencher o
            destinatário da invoice.
          </p>
          <Link
            href="/clients"
            className="mt-8 inline-flex rounded-xl bg-[#2c1973] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b24a4]"
          >
            Ir para clientes
          </Link>
        </section>
      ) : (
        <InvoiceForm
          clients={clients}
          profiles={profiles}
          action={createInvoiceAction}
          issueDateDefault={issueDateDefault}
          dueDateDefault={dueDateDefault}
        />
      )}
    </Shell>
  );
}
