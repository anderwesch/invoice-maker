import {
  createClientAction,
  deleteClientAction,
  updateClientAction,
} from "@/app/actions";
import { Shell } from "@/components/shell";
import { getClients } from "@/lib/store";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <Shell>
      <section className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
        <article className="rounded-2xl border border-white/70 bg-white/92 p-6 shadow-[0_20px_50px_rgba(44,25,115,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
            Novo cliente
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#20194f]">
            Cadastro rápido
          </h2>
          <form action={createClientAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm">
              <span>Contato</span>
              <input
                name="name"
                required
                className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Empresa</span>
              <input
                name="company"
                required
                className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>País</span>
                <input
                  name="country"
                  className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span>Moeda padrão</span>
                <input
                  name="currency"
                  defaultValue="USD"
                  className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Tax ID / VAT</span>
                <input
                  name="taxId"
                  className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm">
              <span>Endereço</span>
              <textarea
                name="address"
                rows={4}
                className="rounded-xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              />
            </label>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[#2c1973] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(44,25,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#3b24a4]"
              >
                Salvar cliente
              </button>
            </div>
          </form>
        </article>

        <article className="rounded-2xl border border-white/70 bg-white/92 p-6 shadow-[0_20px_50px_rgba(44,25,115,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]">
            Base de clientes
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#20194f]">
            Clientes cadastrados
          </h2>
          <div className="mt-6 grid gap-4">
            {clients.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#2c1973]/20 bg-[#fffdf4] px-6 py-12 text-center text-[#605a78]">
                Nenhum cliente ainda. Cadastre o primeiro para começar a emitir invoices.
              </div>
            ) : (
              clients.map((client) => (
                <article
                  key={client.id}
                  className="rounded-xl border border-[#2c1973]/10 bg-[#fffdf7] p-5"
                >
                  <form action={updateClientAction} className="grid gap-4">
                    <input type="hidden" name="clientId" value={client.id} />
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#20194f]">{client.company}</h3>
                        <p className="text-sm text-[#605a78]">
                          {client.invoiceCount > 0
                            ? `${client.invoiceCount} invoice${client.invoiceCount > 1 ? "s" : ""} vinculada${client.invoiceCount > 1 ? "s" : ""}`
                            : "Sem invoices vinculadas"}
                        </p>
                      </div>
                      <p className="rounded-lg bg-[#2c1973] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">{client.currency}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2 text-sm">
                        <span>Contato</span>
                        <input
                          name="name"
                          defaultValue={client.name}
                          className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                        />
                      </label>
                      <label className="grid gap-2 text-sm">
                        <span>Empresa</span>
                        <input
                          name="company"
                          defaultValue={client.company}
                          required
                          className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2 text-sm">
                        <span>Email</span>
                        <input
                          type="email"
                          name="email"
                          defaultValue={client.email}
                          className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                        />
                      </label>
                      <label className="grid gap-2 text-sm">
                        <span>País</span>
                        <input
                          name="country"
                          defaultValue={client.country}
                          className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2 text-sm">
                        <span>Moeda padrão</span>
                        <input
                          name="currency"
                          defaultValue={client.currency}
                          className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                        />
                      </label>
                      <label className="grid gap-2 text-sm">
                        <span>Tax ID / VAT</span>
                        <input
                          name="taxId"
                          defaultValue={client.taxId}
                          className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                        />
                      </label>
                    </div>

                    <label className="grid gap-2 text-sm">
                      <span>Endereço</span>
                      <textarea
                        name="address"
                        defaultValue={client.address}
                        rows={3}
                        className="rounded-xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                      />
                    </label>

                    <div className="flex flex-wrap justify-end gap-3">
                      <button
                        type="submit"
                        className="rounded-xl bg-[#2c1973] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(44,25,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#3b24a4]"
                      >
                        Salvar alterações
                      </button>
                    </div>
                  </form>

                  <form action={deleteClientAction} className="mt-3 flex justify-end">
                    <input type="hidden" name="clientId" value={client.id} />
                    <button
                      type="submit"
                      disabled={client.invoiceCount > 0}
                      className="rounded-xl border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-400 disabled:hover:bg-transparent"
                    >
                      Excluir cliente
                    </button>
                  </form>
                </article>
              ))
            )}
          </div>
        </article>
      </section>
    </Shell>
  );
}
