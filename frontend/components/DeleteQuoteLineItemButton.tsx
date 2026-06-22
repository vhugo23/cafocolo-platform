"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientApiDelete, clientApiPatch } from "@/lib/client-api";

type DeleteQuoteLineItemButtonProps = {
  quoteId: string;
  itemId: string;
};

export function DeleteQuoteLineItemButton({
  quoteId,
  itemId,
}: DeleteQuoteLineItemButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDelete() {
    /*
     * Why we confirm:
     * Deleting a line item changes the quote total.
     * A confirmation reduces accidental quote changes.
     */
    const confirmed = window.confirm(
      "Delete this line item and update the quote total?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      /*
       * First delete the line item.
       */
      await clientApiDelete(`/api/v1/quotes/${quoteId}/items/${itemId}`);

      /*
       * Then recalculate the quote total so the UI stays financially accurate.
       */
      await clientApiPatch(`/api/v1/quotes/${quoteId}/recalculate-total`, {});

      /*
       * Refresh the server-rendered quote page so the table and total update.
       */
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the line item."
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
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {errorMessage && (
        <p className="mt-2 text-xs text-red-300">{errorMessage}</p>
      )}
    </div>
  );
}