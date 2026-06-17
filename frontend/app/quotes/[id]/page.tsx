import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Quote } from "@/types/quote";
import type { QuoteLineItem } from "@/types/quote-line-item";

type QuoteDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuoteDetailPage({ params }: QuoteDetailPageProps) {
  const { id } = await params;

  const [quote, items] = await Promise.all([
    apiFetch<Quote>(`/api/v1/quotes/${id}`),
    apiFetch<QuoteLineItem[]>(`/api/v1/quotes/${id}/items`),
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href={`/projects/${quote.projectId}`}
            className="text-sm text-neutral-400 hover:text-white"
          >
            ← Back to project
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            Quote Detail
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{quote.title}</h1>

          <p className="mt-2 text-neutral-400">
            Itemized estimate for {quote.customerName}.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label="Project" value={quote.projectName} />
            <DetailItem label="Customer" value={quote.customerName} />
            <DetailItem label="Status" value={quote.status} />
            <DetailItem
              label="Valid Until"
              value={
                quote.validUntil
                  ? new Date(quote.validUntil).toLocaleDateString()
                  : "—"
              }
            />
            <DetailItem
              label="Labor Cost"
              value={formatCurrency(quote.estimatedLaborCost)}
            />
            <DetailItem
              label="Material Cost"
              value={formatCurrency(quote.estimatedMaterialCost)}
            />
            <DetailItem
              label="Additional Costs"
              value={formatCurrency(quote.additionalCosts)}
            />
            <DetailItem label="Total Amount" value={formatCurrency(quote.totalAmount)} />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">Description</p>
            <p className="mt-2 rounded-lg bg-neutral-950 p-4 text-neutral-200">
              {quote.description ?? "No description provided."}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Line Items</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Itemized costs included in this quote.
            </p>
          </div>

          {items.length === 0 ? (
            <p className="text-neutral-400">No line items yet.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Unit Price</th>
                    <th className="px-4 py-3">Line Total</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">{item.itemName}</td>
                      <td className="px-4 py-3 text-neutral-300">
                        {item.description ?? "—"}
                      </td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {formatCurrency(item.lineTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <div className="rounded-lg bg-neutral-950 px-6 py-4 text-right">
              <p className="text-sm text-neutral-400">Quote Total</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(quote.totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 font-medium text-neutral-100">{value}</p>
    </div>
  );
}

function formatCurrency(value: number | null) {
  if (value === null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}