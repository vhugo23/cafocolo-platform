import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { CreateProjectFromLeadForm } from "@/components/CreateProjectFromLeadForm";
import { LeadStatusActions } from "@/components/LeadStatusActions";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { getAdminPath, type AdminLocale } from "@/lib/admin-i18n";
import type { Lead } from "@/types/lead";

type AdminLeadDetailPageProps = {
  id: string;
  locale: AdminLocale;
};

const leadDetailCopy = {
  en: {
    backToLeads: "← Back to leads",
    eyebrow: "Lead Detail",
    description: "Review this customer request and decide the next action.",
    customer: "Customer",
    requestedService: "Requested Service",
    location: "Location",
    source: "Source",
    status: "Status",
    created: "Created",
    projectDescription: "Project Description",
    noDescription: "No description provided.",
    defaultDescription: "Project created from customer lead.",
  },
  pt: {
    backToLeads: "← Voltar para solicitações",
    eyebrow: "Detalhes da solicitação",
    description: "Analise este pedido do cliente e decida o próximo passo.",
    customer: "Cliente",
    requestedService: "Serviço solicitado",
    location: "Localização",
    source: "Origem",
    status: "Estado",
    created: "Criado em",
    projectDescription: "Descrição do projeto",
    noDescription: "Nenhuma descrição fornecida.",
    defaultDescription: "Projeto criado a partir da solicitação do cliente.",
  },
} as const;

export async function AdminLeadDetailPage({
  id,
  locale,
}: AdminLeadDetailPageProps) {
  const copy = leadDetailCopy[locale];

  const lead = await apiFetch<Lead>(`/api/v1/leads/${id}`);

  const defaultProjectName = `${lead.requestedService} - ${lead.customerName}`;
  const defaultDescription =
    lead.projectDescription ?? copy.defaultDescription;

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href={getAdminPath(locale, "/admin/leads")}
            className="text-sm text-neutral-400 hover:text-white"
          >
            {copy.backToLeads}
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            {copy.eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{lead.customerName}</h1>

          <p className="mt-2 text-neutral-400">{copy.description}</p>
        </div>

        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label={copy.customer} value={lead.customerName} />
            <DetailItem
              label={copy.requestedService}
              value={lead.requestedService}
            />
            <DetailItem label={copy.location} value={lead.location ?? "—"} />
            <DetailItem label={copy.source} value={lead.source} />
            <DetailItem
              label={copy.status}
              value={<StatusBadge status={lead.status} locale={locale} />}
            />
            <DetailItem
              label={copy.created}
              value={formatDateTime(lead.createdAt)}
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">
              {copy.projectDescription}
            </p>
            <p className="mt-2 rounded-lg bg-neutral-950 p-4 text-neutral-200">
              {lead.projectDescription ?? copy.noDescription}
            </p>
          </div>
        </Card>

        <LeadStatusActions
          leadId={lead.id}
          currentStatus={lead.status}
          locale={locale}
        />

        <CreateProjectFromLeadForm
          leadId={lead.id}
          defaultProjectName={defaultProjectName}
          defaultDescription={defaultDescription}
          locale={locale}
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