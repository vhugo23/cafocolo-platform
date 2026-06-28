"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Quote } from "@/types/quote";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProjectQuoteFormProps = {
  projectId: string;
  locale?: AdminLocale;
};

const copy = {
  en: {
    title: "Create Quote",
    description:
      "Create a new estimate for this project. After the quote is created, you will be taken to the quote detail page to add line items.",
    quoteTitle: "Quote Title",
    quoteTitleDefault: "Kitchen Cabinet Installation Estimate",
    quoteDescription: "Description",
    quoteDescriptionDefault:
      "Estimate for custom kitchen cabinet installation, including labor and materials.",
    laborCost: "Labor Cost",
    materialCost: "Material Cost",
    additionalCosts: "Additional Costs",
    totalAmount: "Total Amount",
    validUntil: "Valid Until",
    creating: "Creating...",
    createQuote: "Create Quote",
    missingApiBaseUrl: "NEXT_PUBLIC_API_BASE_URL is not configured",
    fallbackError: "Failed to create quote",
  },
  pt: {
    title: "Criar orçamento",
    description:
      "Crie uma nova estimativa para este projeto. Depois que o orçamento for criado, você será levado para a página de detalhes do orçamento para adicionar itens.",
    quoteTitle: "Título do orçamento",
    quoteTitleDefault: "Estimativa de instalação de armários de cozinha",
    quoteDescription: "Descrição",
    quoteDescriptionDefault:
      "Estimativa para instalação de armários de cozinha personalizados, incluindo mão de obra e materiais.",
    laborCost: "Custo de mão de obra",
    materialCost: "Custo de materiais",
    additionalCosts: "Custos adicionais",
    totalAmount: "Valor total",
    validUntil: "Válido até",
    creating: "Criando...",
    createQuote: "Criar orçamento",
    missingApiBaseUrl: "NEXT_PUBLIC_API_BASE_URL não está configurado",
    fallbackError: "Não foi possível criar o orçamento",
  },
} as const;

export function ProjectQuoteForm({
  projectId,
  locale = "en",
}: ProjectQuoteFormProps) {
  const router = useRouter();
  const text = copy[locale];

  const [title, setTitle] = useState<string>(text.quoteTitleDefault);
  const [description, setDescription] = useState<string>(
    text.quoteDescriptionDefault
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
      setErrorMessage(text.missingApiBaseUrl);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/projects/${projectId}/quotes`,
        {
          method: "POST",
          credentials: "include",
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

      const createdQuote = (await response.json()) as Quote;

      router.push(getAdminPath(locale, `/admin/quotes/${createdQuote.id}`));
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : text.fallbackError
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{text.title}</h2>
        <p className="mt-1 text-sm text-neutral-400">{text.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="text-sm text-neutral-400">{text.quoteTitle}</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">
            {text.quoteDescription}
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            rows={3}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-neutral-400">
              {text.laborCost}
            </label>
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
            <label className="text-sm text-neutral-400">
              {text.materialCost}
            </label>
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
            <label className="text-sm text-neutral-400">
              {text.additionalCosts}
            </label>
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
            <label className="text-sm text-neutral-400">
              {text.totalAmount}
            </label>
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
            <label className="text-sm text-neutral-400">
              {text.validUntil}
            </label>
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
          {isSubmitting ? text.creating : text.createQuote}
        </button>
      </form>
    </div>
  );
}