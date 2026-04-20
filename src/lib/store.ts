import { promises as fs } from "node:fs";
import path from "node:path";

import type { Client, Invoice, Profile, Store } from "@/lib/types";

const storePath = path.join(process.cwd(), "data", "store.json");

const defaultStore: Store = {
  profiles: [
    {
      id: "profile-primary",
      name: "Pessoa 1",
      email: "",
      businessName: "",
      taxId: "",
      address: "",
      paymentDetails: "",
    },
    {
      id: "profile-partner",
      name: "Pessoa 2",
      email: "",
      businessName: "",
      taxId: "",
      address: "",
      paymentDetails: "",
    },
  ],
  clients: [],
  invoices: [],
};

async function ensureStore() {
  try {
    await fs.access(storePath);
  } catch {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, JSON.stringify(defaultStore, null, 2));
  }
}

export async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(storePath, "utf-8");
  return JSON.parse(raw) as Store;
}

export async function writeStore(store: Store) {
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

export async function getDashboardData() {
  const store = await readStore();
  const sortedInvoices = [...store.invoices].sort((a, b) =>
    b.issueDate.localeCompare(a.issueDate),
  );

  const metrics = {
    totalInvoices: store.invoices.length,
    draftInvoices: store.invoices.filter((invoice) => invoice.status === "draft")
      .length,
    outstandingTotal: store.invoices
      .filter((invoice) => invoice.status === "sent" || invoice.status === "overdue")
      .reduce((sum, invoice) => sum + invoice.total, 0),
    paidThisMonth: store.invoices
      .filter(
        (invoice) =>
          invoice.status === "paid" &&
          invoice.issueDate.slice(0, 7) === new Date().toISOString().slice(0, 7),
      )
      .reduce((sum, invoice) => sum + invoice.total, 0),
  };

  return {
    ...store,
    recentInvoices: sortedInvoices.slice(0, 6),
    metrics,
  };
}

export async function getClients() {
  const store = await readStore();
  return [...store.clients]
    .map((client) => ({
      ...client,
      invoiceCount: store.invoices.filter((invoice) => invoice.clientId === client.id).length,
    }))
    .sort((a, b) => a.company.localeCompare(b.company));
}

export async function getProfiles() {
  const store = await readStore();
  return store.profiles.map((profile) => ({
    ...profile,
    taxId: profile.taxId ?? "",
  }));
}

export async function getInvoice(invoiceId: string) {
  const store = await readStore();
  const invoice = store.invoices.find((entry) => entry.id === invoiceId);
  if (!invoice) {
    return null;
  }

  const client = store.clients.find((entry) => entry.id === invoice.clientId) ?? null;
  const owner = store.profiles.find((entry) => entry.id === invoice.ownerId) ?? null;

  return { invoice, client, owner };
}

export function nextInvoiceNumber(invoices: Invoice[], ownerId: string) {
  const ownerInvoices = invoices.filter((invoice) => invoice.ownerId === ownerId);
  const next = ownerInvoices.length + 1;
  return `${ownerId === "profile-primary" ? "P1" : "P2"}-${String(next).padStart(4, "0")}`;
}

export async function saveProfiles(profiles: Profile[]) {
  const store = await readStore();
  store.profiles = profiles;
  await writeStore(store);
}

export async function saveClient(client: Client) {
  const store = await readStore();
  store.clients.unshift(client);
  await writeStore(store);
}

export async function updateClient(clientId: string, updates: Omit<Client, "id" | "createdAt">) {
  const store = await readStore();
  store.clients = store.clients.map((client) =>
    client.id === clientId
      ? {
          ...client,
          ...updates,
        }
      : client,
  );
  await writeStore(store);
}

export async function deleteClient(clientId: string) {
  const store = await readStore();
  const hasLinkedInvoices = store.invoices.some((invoice) => invoice.clientId === clientId);

  if (hasLinkedInvoices) {
    return { deleted: false, reason: "linked-invoices" as const };
  }

  store.clients = store.clients.filter((client) => client.id !== clientId);
  await writeStore(store);
  return { deleted: true as const };
}

export async function saveInvoice(invoice: Invoice) {
  const store = await readStore();
  store.invoices.unshift(invoice);
  await writeStore(store);
}

export async function updateInvoice(invoiceId: string, updates: Omit<Invoice, "id" | "number" | "createdAt">) {
  const store = await readStore();
  store.invoices = store.invoices.map((invoice) =>
    invoice.id === invoiceId
      ? {
          ...invoice,
          ...updates,
        }
      : invoice,
  );
  await writeStore(store);
}

export async function deleteInvoice(invoiceId: string) {
  const store = await readStore();
  store.invoices = store.invoices.filter((invoice) => invoice.id !== invoiceId);
  await writeStore(store);
}

export async function updateInvoiceStatus(invoiceId: string, status: Invoice["status"]) {
  const store = await readStore();
  store.invoices = store.invoices.map((invoice) =>
    invoice.id === invoiceId
      ? {
          ...invoice,
          status,
          updatedAt: new Date().toISOString(),
        }
      : invoice,
  );
  await writeStore(store);
}
