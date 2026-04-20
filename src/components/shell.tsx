import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";

type ShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/invoices/new", label: "Nova invoice" },
  { href: "/clients", label: "Clientes" },
];

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-[#f6f3ea] text-[#1a1830]">
      <header className="relative border-b border-[#2c1973]/10 bg-white">
        <div className="h-1.5 w-full bg-[#f7c400]" />
        <div className="absolute right-0 top-0 h-28 w-28 overflow-hidden opacity-100">
          <div className="absolute right-[-34px] top-[-42px] h-28 w-28 rounded-full border-[18px] border-[#2c1973]" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <BrandMark />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#2c1973]/70">
              Puzzle Invoice Maker
            </p>
            <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-[#20194f]">
              Sistema simples para emitir e acompanhar invoices
            </h1>
          </div>
          <nav className="relative z-10 flex flex-wrap gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-[#2c1973]/14 bg-[#fbfaf6] px-5 py-2.5 text-sm font-semibold text-[#2c1973] transition hover:border-[#2c1973]/35 hover:bg-[#2c1973] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
