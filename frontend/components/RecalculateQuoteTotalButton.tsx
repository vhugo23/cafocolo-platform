"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientApiPatch } from "@/lib/client-api";
import type { AdminLocale } from "@/lib/admin-i18n";

type RecalculateQuoteTotalButtonProps = {
  quoteId: string;
  locale?: AdminLocale;
};

const copy = {
  en: {
    recalculating: "Recalculating...",
    recalculate: "Recalculate Quote Total",
    fallbackError: "Failed to recalculate quote total",
  },
  pt: {
    recalculating: "Recalculando...",
    recalculate: "Recalcular total do orçamento",
    fallbackError: "Não foi possível recalcular o total do orçamento",
  },
} as const;

export function RecalculateQuoteTotalButton({
  quoteId,
  locale = "en",
}: RecalculateQuoteTotalButtonProps) {
  const router = useRouter();
  const text = copy[locale];

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function recalculateTotal() {
    setIsUpdating(true);
    setErrorMessage(null);

    try {
      await clientApiPatch(`/api/v1/quotes/${quoteId}/recalculate-total`, {});
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : text.fallbackError
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={recalculateTotal}
        disabled={isUpdating}
        className="rounded-full border border-neutral-700 px-4 py-2 text-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
      >
        {isUpdating ? text.recalculating : text.recalculate}
      </button>

      {errorMessage && (
        <p className="mt-3 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}