"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientApiPatch } from "@/lib/client-api";
import {
  formatStatus,
  type AdminLocale,
} from "@/lib/admin-i18n";

const QUOTE_STATUSES = ["DRAFT", "SENT", "ACCEPTED", "DECLINED", "EXPIRED"];

type QuoteStatusActionsProps = {
  quoteId: string;
  currentStatus: string;
  locale?: AdminLocale;
};

const copy = {
  en: {
    title: "Update Quote Status",
    currentStatus: "Current status:",
    updating: "Updating status...",
    fallbackError: "Failed to update status",
  },
  pt: {
    title: "Atualizar status do orçamento",
    currentStatus: "Status atual:",
    updating: "Atualizando status...",
    fallbackError: "Não foi possível atualizar o status",
  },
} as const;

export function QuoteStatusActions({
  quoteId,
  currentStatus,
  locale = "en",
}: QuoteStatusActionsProps) {
  const router = useRouter();
  const text = copy[locale];

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function updateStatus(status: string) {
    setIsUpdating(true);
    setErrorMessage(null);

    try {
      await clientApiPatch(`/api/v1/quotes/${quoteId}/status`, {
        status,
      });

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
    <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{text.title}</h2>
        <p className="mt-1 text-sm text-neutral-400">
          {text.currentStatus}{" "}
          <span className="font-medium text-neutral-200">
            {formatStatus(currentStatus, locale)}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUOTE_STATUSES.map((status) => {
          const isCurrent = status === currentStatus;

          return (
            <button
              key={status}
              type="button"
              title={status}
              disabled={isUpdating || isCurrent}
              onClick={() => updateStatus(status)}
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              {formatStatus(status, locale)}
            </button>
          );
        })}
      </div>

      {isUpdating && (
        <p className="mt-4 text-sm text-neutral-400">{text.updating}</p>
      )}

      {errorMessage && (
        <p className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}