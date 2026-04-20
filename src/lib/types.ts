export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export type Profile = {
  id: string;
  name: string;
  email: string;
  businessName: string;
  taxId: string;
  address: string;
  paymentDetails: string;
};

export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  country: string;
  currency: string;
  address: string;
  taxId: string;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type Invoice = {
  id: string;
  number: string;
  ownerId: string;
  clientId: string;
  title: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  status: InvoiceStatus;
  notes: string;
  paymentDetails: string;
  reference: string;
  items: InvoiceItem[];
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
};

export type Store = {
  profiles: Profile[];
  clients: Client[];
  invoices: Invoice[];
};
