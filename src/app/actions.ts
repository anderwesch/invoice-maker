"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  deleteClient,
  deleteInvoice,
  nextInvoiceNumber,
  readStore,
  saveClient,
  saveInvoice,
  saveProfiles,
  updateClient,
  updateInvoice,
  updateInvoiceStatus,
} from "@/lib/store";
import type { InvoiceItem, InvoiceStatus, Profile } from "@/lib/types";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: FormDataEntryValue | null) {
  const parsed = Number(typeof value === "string" ? value : "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function updateProfilesAction(formData: FormData) {
  const profiles: Profile[] = ["primary", "partner"].map((slot) => ({
    id: slot === "primary" ? "profile-primary" : "profile-partner",
    name: asString(formData.get(`${slot}Name`)) || `Pessoa ${slot === "primary" ? "1" : "2"}`,
    email: asString(formData.get(`${slot}Email`)),
    businessName: asString(formData.get(`${slot}BusinessName`)),
    taxId: asString(formData.get(`${slot}TaxId`)),
    address: asString(formData.get(`${slot}Address`)),
    paymentDetails: asString(formData.get(`${slot}PaymentDetails`)),
  }));

  await saveProfiles(profiles);
  revalidatePath("/");
  revalidatePath("/invoices/new");
}

export async function createClientAction(formData: FormData) {
  const now = new Date().toISOString();

  await saveClient({
    id: crypto.randomUUID(),
    name: asString(formData.get("name")),
    company: asString(formData.get("company")),
    email: asString(formData.get("email")),
    country: asString(formData.get("country")),
    currency: asString(formData.get("currency")) || "USD",
    address: asString(formData.get("address")),
    taxId: asString(formData.get("taxId")),
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/");
  revalidatePath("/clients");
  revalidatePath("/invoices/new");
  redirect("/clients");
}

export async function updateClientAction(formData: FormData) {
  const clientId = asString(formData.get("clientId"));

  if (!clientId) {
    return;
  }

  await updateClient(clientId, {
    name: asString(formData.get("name")),
    company: asString(formData.get("company")),
    email: asString(formData.get("email")),
    country: asString(formData.get("country")),
    currency: asString(formData.get("currency")) || "USD",
    address: asString(formData.get("address")),
    taxId: asString(formData.get("taxId")),
    updatedAt: new Date().toISOString(),
  });

  revalidatePath("/");
  revalidatePath("/clients");
  revalidatePath("/invoices/new");
}

export async function deleteClientAction(formData: FormData) {
  const clientId = asString(formData.get("clientId"));

  if (!clientId) {
    return;
  }

  await deleteClient(clientId);
  revalidatePath("/");
  revalidatePath("/clients");
  revalidatePath("/invoices/new");
}

export async function createInvoiceAction(formData: FormData) {
  const store = await readStore();
  const ownerId = asString(formData.get("ownerId")) || "profile-primary";
  const clientId = asString(formData.get("clientId"));
  const descriptions = formData.getAll("description");
  const quantities = formData.getAll("quantity");
  const unitPrices = formData.getAll("unitPrice");

  const items: InvoiceItem[] = descriptions
    .map((description, index) => {
      const quantity = asNumber(quantities[index] ?? null);
      const unitPrice = asNumber(unitPrices[index] ?? null);
      const parsedDescription = asString(description);

      if (!parsedDescription || quantity <= 0) {
        return null;
      }

      return {
        id: crypto.randomUUID(),
        description: parsedDescription,
        quantity,
        unitPrice,
        total: quantity * unitPrice,
      };
    })
    .filter((item): item is InvoiceItem => item !== null);

  const total = items.reduce((sum, item) => sum + item.total, 0);
  const now = new Date().toISOString();
  const invoiceId = crypto.randomUUID();

  await saveInvoice({
    id: invoiceId,
    number: nextInvoiceNumber(store.invoices, ownerId),
    ownerId,
    clientId,
    title: asString(formData.get("title")) || "Professional services",
    issueDate: asString(formData.get("issueDate")),
    dueDate: asString(formData.get("dueDate")),
    currency: asString(formData.get("currency")) || "USD",
    status: (asString(formData.get("status")) as InvoiceStatus) || "draft",
    notes: asString(formData.get("notes")),
    paymentDetails: asString(formData.get("paymentDetails")),
    reference: asString(formData.get("reference")),
    items,
    subtotal: total,
    total,
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/");
  revalidatePath("/invoices/new");
  revalidatePath("/clients");
  redirect(`/invoices/${invoiceId}`);
}

export async function updateInvoiceAction(formData: FormData) {
  const invoiceId = asString(formData.get("invoiceId"));

  if (!invoiceId) {
    return;
  }

  const store = await readStore();
  const currentInvoice = store.invoices.find((invoice) => invoice.id === invoiceId);

  if (!currentInvoice) {
    return;
  }

  const descriptions = formData.getAll("description");
  const quantities = formData.getAll("quantity");
  const unitPrices = formData.getAll("unitPrice");

  const items: InvoiceItem[] = descriptions
    .map((description, index) => {
      const quantity = asNumber(quantities[index] ?? null);
      const unitPrice = asNumber(unitPrices[index] ?? null);
      const parsedDescription = asString(description);

      if (!parsedDescription || quantity <= 0) {
        return null;
      }

      return {
        id: crypto.randomUUID(),
        description: parsedDescription,
        quantity,
        unitPrice,
        total: quantity * unitPrice,
      };
    })
    .filter((item): item is InvoiceItem => item !== null);

  const total = items.reduce((sum, item) => sum + item.total, 0);

  await updateInvoice(invoiceId, {
    ownerId: asString(formData.get("ownerId")) || currentInvoice.ownerId,
    clientId: asString(formData.get("clientId")) || currentInvoice.clientId,
    title: asString(formData.get("title")) || "Professional services",
    issueDate: asString(formData.get("issueDate")) || currentInvoice.issueDate,
    dueDate: asString(formData.get("dueDate")) || currentInvoice.dueDate,
    currency: asString(formData.get("currency")) || currentInvoice.currency,
    status: (asString(formData.get("status")) as InvoiceStatus) || currentInvoice.status,
    notes: asString(formData.get("notes")),
    paymentDetails: asString(formData.get("paymentDetails")),
    reference: asString(formData.get("reference")),
    items,
    subtotal: total,
    total,
    updatedAt: new Date().toISOString(),
  });

  revalidatePath("/");
  revalidatePath("/clients");
  revalidatePath("/invoices/new");
  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath(`/invoices/${invoiceId}/edit`);
  redirect(`/invoices/${invoiceId}`);
}

export async function deleteInvoiceAction(formData: FormData) {
  const invoiceId = asString(formData.get("invoiceId"));

  if (!invoiceId) {
    return;
  }

  await deleteInvoice(invoiceId);
  revalidatePath("/");
  revalidatePath("/clients");
  revalidatePath("/invoices/new");
  redirect("/");
}

export async function duplicateInvoiceAction(formData: FormData) {
  const invoiceId = asString(formData.get("invoiceId"));

  if (!invoiceId) {
    return;
  }

  const store = await readStore();
  const currentInvoice = store.invoices.find((invoice) => invoice.id === invoiceId);

  if (!currentInvoice) {
    return;
  }

  const now = new Date().toISOString();
  const newInvoiceId = crypto.randomUUID();
  const duplicatedItems = currentInvoice.items.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));
  const total = duplicatedItems.reduce((sum, item) => sum + item.total, 0);

  await saveInvoice({
    ...currentInvoice,
    id: newInvoiceId,
    number: nextInvoiceNumber(store.invoices, currentInvoice.ownerId),
    status: "draft",
    items: duplicatedItems,
    subtotal: total,
    total,
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/");
  revalidatePath("/clients");
  revalidatePath("/invoices/new");
  revalidatePath(`/invoices/${invoiceId}`);
  redirect(`/invoices/${newInvoiceId}/edit`);
}

export async function updateInvoiceStatusAction(formData: FormData) {
  const invoiceId = asString(formData.get("invoiceId"));
  const status = asString(formData.get("status")) as InvoiceStatus;

  if (!invoiceId || !status) {
    return;
  }

  await updateInvoiceStatus(invoiceId, status);
  revalidatePath("/");
  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath(`/invoices/${invoiceId}/edit`);
  redirect(`/invoices/${invoiceId}`);
}
