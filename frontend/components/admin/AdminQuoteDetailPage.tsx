import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { DeleteQuoteLineItemButton } from "@/components/DeleteQuoteLineItemButton";
import { EditQuoteLineItemForm } from "@/components/EditQuoteLineItemForm";
import { QuoteLineItemForm } from "@/components/QuoteLineItemForm";
import { QuoteStatusActions } from "@/components/QuoteStatusActions";
import { RecalculateQuoteTotalButton } from "@/components/RecalculateQuoteTotalButton";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Quote } from "@/types/quote";
import type { QuoteLineItem } from "@/types/quote-line-item";

type AdminQuoteDetailPageProps = {
  id: string;
  locale: AdminLocale;
};

const copy = {
  en: {
    backToProject: "← Back to project",
    eyebrow: "Quote Detail",
    descriptionPrefix: "Itemized estimate for",
    project: "Project",
    customer: "Customer",
    status: "Status",
    validUntil: "Valid Until",
    laborCost: "Labor Cost",
    materialCost: "Material Cost",
    additionalCosts: "Additional Costs",
    totalAmount: "Total Amount",
    quoteDescription: "Description",
    noDescription: "No description provided.",
    lineItems: "Line Items",
    lineItemsDescription: "Itemized costs included in this quote.",
    noLineItems: "No line items yet.",
    item: "Item",
    itemDescription: "Description",
    quantity: "Qty",
    unitPrice: "Unit Price",
    lineTotal: "Line Total",
    actions: "Actions",
    quoteTotal: "Quote Total",
    fallback: "—",
  },
  pt: {
    backToProject: "← Voltar ao projeto",
    eyebrow: "Detalhes do orçamento",
    descriptionPrefix: "Estimativa detalhada para",
    project: "Projeto",
    customer: "Cliente",
    status: "Status",
    validUntil: "Válido até",
    laborCost: "Custo de mão de obra",
    materialCost: "Custo de materiais",
    additionalCosts: "Custos adicionais",
    totalAmount: "Valor total",
    quoteDescription: "Descrição",
    noDescription: "Nenhuma descrição fornecida.",
    lineItems: "Itens do orçamento",
    lineItemsDescription: "Custos detalhados incluídos neste orçamento.",
    noLineItems: "Nenhum item ainda.",
    item: "Item",
    itemDescription: "Descrição",
    quantity: "Qtd",
    unitPrice: "Preço unitário",
    lineTotal: "Total do item",
    actions: "Ações",
    quoteTotal: "Total do orçamento",
    fallback: "—",
  },
} as const;

export async function AdminQuoteDetailPage({
  id,
  locale,
}: AdminQuoteDetailPageProps) {
  const text = copy[locale];

  const [quote, items] = await Promise.all([
    apiFetch<Quote>(`/api/v1/quotes/${id}`),
    apiFetch<QuoteLineItem[]>(`/api/v1/quotes/${id}/items`),
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href={getAdminPath(locale, `/admin/projects/${quote.projectId}`)}
            className="text-sm text-neutral-400 hover:text-white"
          >
            {text.backToProject}
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            {text.eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{quote.title}</h1>

          <p className="mt-2 text-neutral-400">
            {text.descriptionPrefix} {quote.customerName}.
          </p>
        </div>

        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label={text.project} value={quote.projectName} />
            <DetailItem label={text.customer} value={quote.customerName} />
            <DetailItem
              label={text.status}
              value={<StatusBadge status={quote.status} locale={locale} />}
            />
            <DetailItem
              label={text.validUntil}
              value={formatDate(quote.validUntil)}
            />
            <DetailItem
              label={text.laborCost}
              value={formatCurrency(quote.estimatedLaborCost)}
            />
            <DetailItem
              label={text.materialCost}
              value={formatCurrency(quote.estimatedMaterialCost)}
            />
            <DetailItem
              label={text.additionalCosts}
              value={formatCurrency(quote.additionalCosts)}
            />
            <DetailItem
              label={text.totalAmount}
              value={formatCurrency(quote.totalAmount)}
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">
              {text.quoteDescription}
            </p>
            <p className="mt-2 rounded-lg bg-neutral-950 p-4 text-neutral-200">
              {quote.description ?? text.noDescription}
            </p>
          </div>
        </Card>

        <QuoteStatusActions
          quoteId={quote.id}
          currentStatus={quote.status}
          locale={locale}
        />

        <QuoteLineItemForm quoteId={quote.id} locale={locale} />

        <Card className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{text.lineItems}</h2>
            <p className="mt-1 text-sm text-neutral-400">
              {text.lineItemsDescription}
            </p>
          </div>

          {items.length === 0 ? (
            <p className="text-neutral-400">{text.noLineItems}</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">{text.item}</th>
                    <th className="px-4 py-3">{text.itemDescription}</th>
                    <th className="px-4 py-3">{text.quantity}</th>
                    <th className="px-4 py-3">{text.unitPrice}</th>
                    <th className="px-4 py-3">{text.lineTotal}</th>
                    <th className="px-4 py-3">{text.actions}</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">{item.itemName}</td>

                      <td className="px-4 py-3 text-neutral-300">
                        {item.description ?? text.fallback}
                      </td>

                      <td className="px-4 py-3">{item.quantity}</td>

                      <td className="px-4 py-3">
                        {formatCurrency(item.unitPrice)}
                      </td>

                      <td className="px-4 py-3 font-medium">
                        {formatCurrency(item.lineTotal)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-2">
                          <EditQuoteLineItemForm
                            quoteId={quote.id}
                            item={item}
                            locale={locale}
                          />

                          <DeleteQuoteLineItemButton
                            quoteId={quote.id}
                            itemId={item.id}
                            locale={locale}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-4">
            <div className="rounded-lg bg-neutral-950 px-6 py-4 text-right">
              <p className="text-sm text-neutral-400">{text.quoteTotal}</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(quote.totalAmount)}
              </p>
            </div>

            <RecalculateQuoteTotalButton quoteId={quote.id} locale={locale} />
          </div>
        </Card>
      </section>
    </main>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500">{label}</p>
      <div className="mt-1 font-medium text-neutral-100">{value}</div>
    </div>
  );
}