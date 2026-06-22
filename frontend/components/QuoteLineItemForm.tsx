"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { clientApiPatch, clientApiPost } from "@/lib/client-api";

type QuoteLineItemFormProps = {
  quoteId: string;
};

export function QuoteLineItemForm({ quoteId }: QuoteLineItemFormProps) {
  const router = useRouter();

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await clientApiPost(`/api/v1/quotes/${quoteId}/items`, {
        itemName,
        description: description || null,
        quantity: Number(quantity),
        unitPrice: Number(unitPrice),
      });

      await clientApiPatch(`/api/v1/quotes/${quoteId}/recalculate-total`, {});

      setItemName("");
      setDescription("");
      setQuantity("1");
      setUnitPrice("");

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while adding the line item."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Line Item</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Add itemized costs to this quote. The quote total will update
          automatically after the item is added.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-neutral-300">Item Name</span>
          <input
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
            required
            placeholder="Cabinet materials"
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">Description</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Wood, hinges, handles..."
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">Quantity</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">Unit Price</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={unitPrice}
            onChange={(event) => setUnitPrice(event.target.value)}
            required
            placeholder="250"
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>
      </div>

      {errorMessage && (
        <p className="mt-4 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Adding..." : "Add Line Item"}
        </button>
      </div>
    </form>
  );
}