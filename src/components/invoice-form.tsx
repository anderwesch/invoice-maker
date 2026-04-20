"use client";

import { useState } from "react";

import type { Client, Invoice, Profile } from "@/lib/types";

type InvoiceFormProps = {
  clients: Client[];
  profiles: Profile[];
  action: (formData: FormData) => void;
  issueDateDefault: string;
  dueDateDefault: string;
  submitLabel?: string;
  initialInvoice?: Invoice;
};

type DraftItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export function InvoiceForm({
  clients,
  profiles,
  action,
  issueDateDefault,
  dueDateDefault,
  submitLabel = "Criar invoice",
  initialInvoice,
}: InvoiceFormProps) {
  const [items, setItems] = useState<DraftItem[]>(
    initialInvoice && initialInvoice.items.length > 0
      ? initialInvoice.items.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }))
      : [{ id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 }],
  );

  return (
    <form action={action} className="grid gap-6">
      {initialInvoice ? <input type="hidden" name="invoiceId" value={initialInvoice.id} /> : null}
      <section className="grid gap-4 rounded-2xl border border-white/70 bg-white/92 p-6 shadow-[0_20px_50px_rgba(44,25,115,0.08)] backdrop-blur">
        <div className="grid gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2c1973]">
            Cabeçalho da invoice
          </p>
          <h2 className="text-2xl font-semibold text-[#20194f]">Informações principais</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-2 text-sm">
            <span>Perfil emissor</span>
            <select
              name="ownerId"
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              defaultValue={initialInvoice?.ownerId ?? profiles[0]?.id}
            >
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span>Cliente</span>
            <select
              name="clientId"
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              defaultValue={initialInvoice?.clientId ?? clients[0]?.id}
              required
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.company}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span>Moeda</span>
            <input
              name="currency"
              defaultValue={initialInvoice?.currency ?? clients[0]?.currency ?? "USD"}
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Status inicial</span>
            <select
              name="status"
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              defaultValue={initialInvoice?.status ?? "draft"}
            >
              <option value="draft">Rascunho</option>
              <option value="sent">Enviada</option>
              <option value="paid">Paga</option>
              <option value="overdue">Vencida</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-2 text-sm xl:col-span-2">
            <span>Título</span>
            <input
              name="title"
              defaultValue={initialInvoice?.title ?? "Professional services"}
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Data de emissão</span>
            <input
              type="date"
              name="issueDate"
              defaultValue={initialInvoice?.issueDate ?? issueDateDefault}
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Vencimento</span>
            <input
              type="date"
              name="dueDate"
              defaultValue={initialInvoice?.dueDate ?? dueDateDefault}
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span>Referência</span>
            <input
              name="reference"
              defaultValue={initialInvoice?.reference ?? ""}
              placeholder="Ex.: March 2026 or Sprint 15"
              className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Instruções de pagamento</span>
            <textarea
              name="paymentDetails"
              rows={3}
              defaultValue={initialInvoice?.paymentDetails ?? ""}
              placeholder="Wire transfer / Wise / Payoneer / bank details"
              className="rounded-xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-white/70 bg-white/92 p-6 shadow-[0_20px_50px_rgba(44,25,115,0.08)] backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2c1973]">
              Itens
            </p>
            <h2 className="text-2xl font-semibold text-[#20194f]">Serviços faturados</h2>
          </div>
          <button
            type="button"
            onClick={() =>
              setItems((current) => [
                ...current,
                { id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 },
              ])
            }
            className="rounded-xl bg-[#2c1973] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(44,25,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#3b24a4]"
          >
            Adicionar item
          </button>
        </div>

        <div className="grid gap-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-xl border border-[#2c1973]/10 bg-[#fffdf7] p-4 lg:grid-cols-[1.8fr,0.6fr,0.8fr]"
            >
              <label className="grid gap-2 text-sm">
                <span>Descrição do item {index + 1}</span>
                <input
                  name="description"
                  defaultValue={item.description}
                  className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Quantidade</span>
                <input
                  type="number"
                  step="0.01"
                  name="quantity"
                  defaultValue={item.quantity}
                  className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Valor unitário</span>
                <input
                  type="number"
                  step="0.01"
                  name="unitPrice"
                  defaultValue={item.unitPrice}
                  className="rounded-2xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
                />
              </label>
            </div>
          ))}
        </div>

        <label className="grid gap-2 text-sm">
          <span>Observações</span>
          <textarea
            name="notes"
            rows={4}
            defaultValue={initialInvoice?.notes ?? ""}
            placeholder="Add project context, payment notes or legal text."
            className="rounded-xl border border-[#2c1973]/15 bg-white px-4 py-3 outline-none focus:border-[#2c1973] focus:ring-4 focus:ring-[#f7c400]/20"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#2c1973] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(44,25,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#3b24a4]"
          >
            {submitLabel}
          </button>
        </div>
      </section>
    </form>
  );
}
