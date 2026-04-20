import Link from "next/link";
import { notFound } from "next/navigation";

import { updateInvoiceAction } from "@/app/actions";
import { InvoiceForm } from "@/components/invoice-form";
import { Shell } from "@/components/shell";
import { getClients, getInvoice, getProfiles } from "@/lib/store";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [clients, profiles, data] = await Promise.all([
    getClients(),
    getProfiles(),
    getInvoice(id),
  ]);

  if (!data) {
    notFound();
  }

  if (clients.length === 0) {
    return (
      <Shell>
        <section className="rounded-2xl border border-dashed border-[#2c1973]/20 bg-white/92 px-8 py-16 text-center shadow-[0_20px_50px_rgba(44,25,115,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
            Pré-requisito
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#20194f]">
            Cadastre um cliente antes de editar a invoice
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-600">
            Esta invoice precisa continuar apontando para um cliente válido no sistema.
          </p>
          <Link
            href="/clients"
            className="mt-8 inline-flex rounded-xl bg-[#2c1973] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(44,25,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#3b24a4]"
          >
            Ir para clientes
          </Link>
        </section>
      </Shell>
    );
  }

  return (
    <Shell>
      <section className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
            Editar invoice
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#20194f]">
            {data.invoice.number}
          </h2>
        </div>
        <Link
          href={`/invoices/${data.invoice.id}`}
          className="rounded-xl border border-[#2c1973]/15 bg-white/92 px-5 py-2.5 text-sm font-semibold text-[#2c1973] shadow-[0_8px_24px_rgba(44,25,115,0.08)] transition hover:-translate-y-0.5 hover:border-[#2c1973]/35 hover:bg-[#2c1973] hover:text-white"
        >
          Voltar para detalhe
        </Link>
      </section>

      <InvoiceForm
        clients={clients}
        profiles={profiles}
        action={updateInvoiceAction}
        issueDateDefault={data.invoice.issueDate}
        dueDateDefault={data.invoice.dueDate}
        submitLabel="Salvar alterações"
        initialInvoice={data.invoice}
      />
    </Shell>
  );
}
