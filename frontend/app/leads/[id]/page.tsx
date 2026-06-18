import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { CreateProjectFromLeadForm } from "@/components/CreateProjectFromLeadForm";
import { LeadStatusActions } from "@/components/LeadStatusActions";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import type { Lead } from "@/types/lead";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;

  const lead = await apiFetch<Lead>(`/api/v1/leads/${id}`);

  const defaultProjectName = `${lead.requestedService} - ${lead.customerName}`;
  const defaultDescription =
    lead.projectDescription ?? "Project created from customer lead.";

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/leads"
            className="text-sm text-neutral-400 hover:text-white"
          >
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

        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label="Customer" value={lead.customerName} />
            <DetailItem label="Requested Service" value={lead.requestedService} />
            <DetailItem label="Location" value={lead.location ?? "—"} />
            <DetailItem label="Source" value={lead.source} />
            <DetailItem
              label="Status"
              value={<StatusBadge status={lead.status} />}
            />
            <DetailItem label="Created" value={formatDateTime(lead.createdAt)} />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">
              Project Description
            </p>
            <p className="mt-2 rounded-lg bg-neutral-950 p-4 text-neutral-200">
              {lead.projectDescription ?? "No description provided."}
            </p>
          </div>
        </Card>

        <LeadStatusActions leadId={lead.id} currentStatus={lead.status} />

        <CreateProjectFromLeadForm
          leadId={lead.id}
          defaultProjectName={defaultProjectName}
          defaultDescription={defaultDescription}
        />
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