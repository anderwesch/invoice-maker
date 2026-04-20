"use client";

type PrintInvoiceButtonProps = {
  className?: string;
};

export function PrintInvoiceButton({ className }: PrintInvoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      Imprimir / salvar PDF
    </button>
  );
}
