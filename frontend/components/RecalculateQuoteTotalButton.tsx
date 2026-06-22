"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientApiPatch } from "@/lib/client-api";

type RecalculateQuoteTotalButtonProps = {
  quoteId: string;
};

/**
 * Client component for recalculating a quote total from its line items.
 *
 * Why this exists:
 * - Line items can be added after a quote is created.
 * - The quote total should be recalculated from backend-owned financial data.
 */
export function RecalculateQuoteTotalButton({
  quoteId,
}: RecalculateQuoteTotalButtonProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function recalculateTotal() {
    setIsUpdating(true);
    setErrorMessage(null);

    try {
      await clientApiPatch(`/api/v1/quotes/${quoteId}/recalculate-total`, {});

      // Refreshes the server-rendered quote detail page
      // so the updated total appears immediately.
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to recalculate quote total"
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
        {isUpdating ? "Recalculating..." : "Recalculate Quote Total"}
      </button>

      {errorMessage && (
        <p className="mt-3 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}