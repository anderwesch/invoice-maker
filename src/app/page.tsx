import Link from "next/link";

import { updateProfilesAction } from "@/app/actions";
import { Shell } from "@/components/shell";
import { StatusPill } from "@/components/status-pill";
import { formatCurrency, formatDate } from "@/lib/format";
import { getDashboardData } from "@/lib/store";

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <article className="rounded-xl border border-[#2c1973]/10 bg-white p-6 shadow-[0_12px_30px_rgba(44,25,115,0.06)]">
      <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${accent}`}>{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-[#20194f]">{value}</p>
    </article>
  );
}

export default async function Home() {
  const { profiles, clients, recentInvoices, metrics } = await getDashboardData();

  return (
    <Shell>
      <section className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Total de invoices"
          value={String(metrics.totalInvoices)}
          accent="text-[#2c1973]"
        />
        <MetricCard
          label="Rascunhos"
          value={String(metrics.draftInvoices)}
          accent="text-amber-600"
        />
        <MetricCard
          label="Em aberto"
          value={formatCurrency(metrics.outstandingTotal, "USD")}
          accent="text-sky-600"
        />
        <MetricCard
          label="Pagas no mês"
          value={formatCurrency(metrics.paidThisMonth, "USD")}
          accent="text-emerald-600"
        />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
        <article className="rounded-xl border border-[#2c1973]/10 bg-white p-6 shadow-[0_12px_30px_rgba(44,25,115,0.06)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
                Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#20194f]">
                Últimas invoices
              </h2>
            </div>
            <div className="flex gap-3">
              <Link
                href="/clients"
                className="rounded-xl border border-[#2c1973]/20 px-4 py-2 text-sm font-semibold text-[#2c1973] transition hover:border-[#2c1973]/50 hover:bg-white"
              >
                Gerenciar clientes
              </Link>
              <Link
                href="/invoices/new"
                className="rounded-xl bg-[#2c1973] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3b24a4]"
              >
                Nova invoice
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {recentInvoices.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#2c1973]/20 bg-[#fbfaf6] px-6 py-12 text-center text-[#4d496d]">
                Nenhuma invoice criada ainda. Cadastre um cliente e gere a primeira.
              </div>
            ) : (
              recentInvoices.map((invoice) => {
                const owner = profiles.find((profile) => profile.id === invoice.ownerId);
                const client = clients.find((entry) => entry.id === invoice.clientId);

                return (
                  <Link
                    key={invoice.id}
                    href={`/invoices/${invoice.id}`}
                    className="grid gap-4 rounded-lg border border-[#2c1973]/10 bg-[#fbfaf6] px-5 py-4 transition hover:border-[#2c1973]/24 hover:bg-white md:grid-cols-[1fr,auto,auto,auto] md:items-center"
                  >
                    <div>
                      <p className="text-lg font-semibold text-[#20194f]">{invoice.number}</p>
                      <p className="text-sm text-[#4d496d]">
                        {client?.company ?? "Cliente removido"} • {owner?.name ?? "Sem perfil"}
                      </p>
                    </div>
                    <p className="text-sm text-[#4d496d]">{formatDate(invoice.issueDate)}</p>
                    <p className="text-sm font-semibold text-[#20194f]">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </p>
                    <StatusPill status={invoice.status} />
                  </Link>
                );
              })
            )}
          </div>
        </article>

        <article className="rounded-xl border border-[#2c1973]/10 bg-white p-6 shadow-[0_12px_30px_rgba(44,25,115,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
            Perfis
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#20194f]">
            Dados do casal para emissão
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#4d496d]">
            Configure os dois perfis que irão emitir invoices. Esses dados aparecem na criação
            e na visualização da invoice.
          </p>

          <form action={updateProfilesAction} className="mt-6 grid gap-6">
            {profiles.map((profile, index) => {
              const prefix = index === 0 ? "primary" : "partner";

              return (
                <section
                  key={profile.id}
                    className="grid gap-4 rounded-lg border border-[#2c1973]/10 bg-[#fbfaf6] p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {index === 0 ? "Perfil principal" : "Perfil parceiro"}
                    </p>
                  </div>
                  <label className="grid gap-2 text-sm">
                    <span>Nome de exibição</span>
                    <input
                      name={`${prefix}Name`}
                      defaultValue={profile.name}
                      className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span>Email</span>
                    <input
                      name={`${prefix}Email`}
                      defaultValue={profile.email}
                      className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span>Empresa / nome profissional</span>
                    <input
                      name={`${prefix}BusinessName`}
                      defaultValue={profile.businessName}
                      className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span>TAX ID / CNPJ</span>
                    <input
                      name={`${prefix}TaxId`}
                      defaultValue={profile.taxId}
                      className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span>Endereço / dados fiscais</span>
                    <textarea
                      name={`${prefix}Address`}
                      defaultValue={profile.address}
                      rows={3}
                      className="rounded-xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span>Pagamento padrão</span>
                    <textarea
                      name={`${prefix}PaymentDetails`}
                      defaultValue={profile.paymentDetails}
                      rows={3}
                      className="rounded-xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                    />
                  </label>
                </section>
              );
            })}

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[#2c1973] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(44,25,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#3b24a4]"
              >
                Salvar perfis
              </button>
            </div>
          </form>
        </article>
      </section>
    </Shell>
  );
}
