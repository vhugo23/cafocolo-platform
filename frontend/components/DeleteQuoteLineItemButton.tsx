"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientApiDelete, clientApiPatch } from "@/lib/client-api";
import type { AdminLocale } from "@/lib/admin-i18n";

type DeleteQuoteLineItemButtonProps = {
  quoteId: string;
  itemId: string;
  locale?: AdminLocale;
};

const copy = {
  en: {
    confirm: "Delete this line item and update the quote total?",
    deleting: "Deleting...",
    delete: "Delete",
    fallbackError: "Something went wrong while deleting the line item.",
  },
  pt: {
    confirm: "Excluir este item e atualizar o total do orçamento?",
    deleting: "Excluindo...",
    delete: "Excluir",
    fallbackError: "Algo deu errado ao excluir o item.",
  },
} as const;

export function DeleteQuoteLineItemButton({
  quoteId,
  itemId,
  locale = "en",
}: DeleteQuoteLineItemButtonProps) {
  const router = useRouter();
  const text = copy[locale];

  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(text.confirm);

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      await clientApiDelete(`/api/v1/quotes/${quoteId}/items/${itemId}`);
      await clientApiPatch(`/api/v1/quotes/${quoteId}/recalculate-total`, {});

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : text.fallbackError
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-full border border-red-900 px-3 py-1 text-xs text-red-300 hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting ? text.deleting : text.delete}
      </button>

      {errorMessage && (
        <p className="mt-2 text-xs text-red-300">{errorMessage}</p>
      )}
    </div>
  );
}