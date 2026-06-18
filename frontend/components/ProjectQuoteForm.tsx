"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Quote } from "@/types/quote";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProjectQuoteFormProps = {
  projectId: string;
};

/**
 * Client component for creating a quote from a project.
 *
 * Why this is a client component:
 * - Forms require browser-side state.
 * - The user types quote values before submitting.
 * - After submission, we redirect to the quote detail page so line items can be added.
 */
export function ProjectQuoteForm({ projectId }: ProjectQuoteFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("Kitchen Cabinet Installation Estimate");
  const [description, setDescription] = useState(
    "Estimate for custom kitchen cabinet installation, including labor and materials."
  );
  const [estimatedLaborCost, setEstimatedLaborCost] = useState("900");
  const [estimatedMaterialCost, setEstimatedMaterialCost] = useState("1400");
  const [additionalCosts, setAdditionalCosts] = useState("200");
  const [totalAmount, setTotalAmount] = useState("2500");
  const [validUntil, setValidUntil] = useState("2026-07-15");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!API_BASE_URL) {
      setErrorMessage("NEXT_PUBLIC_API_BASE_URL is not configured");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/projects/${projectId}/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description: description || null,
            estimatedLaborCost: estimatedLaborCost
              ? Number(estimatedLaborCost)
              : null,
            estimatedMaterialCost: estimatedMaterialCost
              ? Number(estimatedMaterialCost)
              : null,
            additionalCosts: additionalCosts ? Number(additionalCosts) : null,
            totalAmount: Number(totalAmount),
            validUntil: validUntil || null,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Request failed with status ${response.status}`
        );
      }

      /*
       * The backend returns the created quote.
       * We need its id so we can send the admin directly to the quote detail page.
       */
      const createdQuote = (await response.json()) as Quote;

      /*
       * After creating a quote, send the admin to the quote detail page.
       * That is where line items, status changes, editing, and deletion happen.
       */
      router.push(`/admin/quotes/${createdQuote.id}`);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create quote"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Create Quote</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Create a new estimate for this project. After the quote is created,
          you will be taken to the quote detail page to add line items.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="text-sm text-neutral-400">Quote Title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            rows={3}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-neutral-400">Labor Cost</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={estimatedLaborCost}
              onChange={(event) => setEstimatedLaborCost(event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400">Material Cost</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={estimatedMaterialCost}
              onChange={(event) => setEstimatedMaterialCost(event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400">Additional Costs</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={additionalCosts}
              onChange={(event) => setAdditionalCosts(event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-400">Total Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={totalAmount}
              onChange={(event) => setTotalAmount(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400">Valid Until</label>
            <input
              type="date"
              value={validUntil}
              onChange={(event) => setValidUntil(event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        {errorMessage && (
          <p className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-300"
        >
          {isSubmitting ? "Creating..." : "Create Quote"}
        </button>
      </form>
    </div>
  );
}