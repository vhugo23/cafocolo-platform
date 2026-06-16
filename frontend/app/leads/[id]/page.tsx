import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Lead } from "@/types/lead";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;

  const lead = await apiFetch<Lead>(`/api/v1/leads/${id}`);

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-neutral-400 hover:text-white">
            ← Back to leads
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            Lead Detail
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{lead.customerName}</h1>

          <p className="mt-2 text-neutral-400">
            Full details for this customer request.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label="Customer" value={lead.customerName} />
            <DetailItem label="Requested Service" value={lead.requestedService} />
            <DetailItem label="Location" value={lead.location ?? "—"} />
            <DetailItem label="Source" value={lead.source} />
            <DetailItem label="Status" value={lead.status} />
            <DetailItem
              label="Created"
              value={new Date(lead.createdAt).toLocaleString()}
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">
              Project Description
            </p>
            <p className="mt-2 rounded-lg bg-neutral-950 p-4 text-neutral-200">
              {lead.projectDescription ?? "No description provided."}
            </p>
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