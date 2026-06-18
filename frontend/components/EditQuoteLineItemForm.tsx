"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiPatch } from "@/lib/api";
import type { QuoteLineItem } from "@/types/quote-line-item";

type EditQuoteLineItemFormProps = {
  quoteId: string;
  item: QuoteLineItem;
};

export function EditQuoteLineItemForm({
  quoteId,
  item,
}: EditQuoteLineItemFormProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState(item.itemName);
  const [description, setDescription] = useState(item.description ?? "");
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [unitPrice, setUnitPrice] = useState(String(item.unitPrice));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCancel() {
    /*
     * Why reset on cancel:
     * If the user edits fields and then cancels, the form should return
     * to the saved database values instead of keeping unsaved draft text.
     */
    setItemName(item.itemName);
    setDescription(item.description ?? "");
    setQuantity(String(item.quantity));
    setUnitPrice(String(item.unitPrice));
    setErrorMessage("");
    setIsEditing(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      /*
       * First update the line item.
       * The backend recalculates the line item's lineTotal.
       */
      await apiPatch(`/api/v1/quotes/${quoteId}/items/${item.id}`, {
        itemName,
        description: description || null,
        quantity: Number(quantity),
        unitPrice: Number(unitPrice),
      });

      /*
       * Then recalculate the whole quote total.
       * This keeps quote.totalAmount aligned with the updated line item.
       */
      await apiPatch(`/api/v1/quotes/${quoteId}/recalculate-total`, {});

      setIsEditing(false);

      /*
       * Refresh the server-rendered quote page so the table and total update.
       */
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the line item."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
      >
        Edit
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-72 rounded-lg border border-neutral-800 bg-neutral-950 p-3"
    >
      <div className="grid gap-3">
        <label className="block">
          <span className="text-xs text-neutral-400">Item Name</span>
          <input
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
            required
            className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-xs text-neutral-400">Description</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-white outline-none focus:border-neutral-400"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-xs text-neutral-400">Qty</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-white outline-none focus:border-neutral-400"
            />
          </label>

          <label className="block">
            <span className="text-xs text-neutral-400">Unit Price</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={unitPrice}
              onChange={(event) => setUnitPrice(event.target.value)}
              required
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-white outline-none focus:border-neutral-400"
            />
          </label>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-3 text-xs text-red-300">{errorMessage}</p>
      )}

      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}