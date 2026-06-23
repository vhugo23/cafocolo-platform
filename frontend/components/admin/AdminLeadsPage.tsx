import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { getAdminPath, type AdminLocale } from "@/lib/admin-i18n";
import type { Lead } from "@/types/lead";

type AdminLeadsPageProps = {
  locale: AdminLocale;
};

const leadsCopy = {
  en: {
    eyebrow: "Cafocolo Admin",
    title: "Leads",
    description:
      "Incoming customer requests from the public quote form and backend API.",
    viewProjects: "View Projects",
    customer: "Customer",
    service: "Service",
    location: "Location",
    status: "Status",
    created: "Created",
    noLeads: "No leads found.",
  },
  pt: {
    eyebrow: "Administração Cafocolo",
    title: "Solicitações",
    description:
      "Pedidos de clientes recebidos pelo formulário público de orçamento e pela API do backend.",
    viewProjects: "Ver projetos",
    customer: "Cliente",
    service: "Serviço",
    location: "Localização",
    status: "Estado",
    created: "Criado em",
    noLeads: "Nenhuma solicitação encontrada.",
  },
} as const;

export async function AdminLeadsPage({ locale }: AdminLeadsPageProps) {
  const copy = leadsCopy[locale];

  const leads = await apiFetch<Lead[]>("/api/v1/leads");

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          actions={
            <Link
              href={getAdminPath(locale, "/admin/projects")}
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
            >
              {copy.viewProjects}
            </Link>
          }
        />

        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          <table className="w-full border-collapse text-left">
            <thead className="bg-neutral-800 text-sm text-neutral-300">
              <tr>
                <th className="px-4 py-3">{copy.customer}</th>
                <th className="px-4 py-3">{copy.service}</th>
                <th className="px-4 py-3">{copy.location}</th>
                <th className="px-4 py-3">{copy.status}</th>
                <th className="px-4 py-3">{copy.created}</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-neutral-800 transition hover:bg-neutral-800/60"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={getAdminPath(locale, `/admin/leads/${lead.id}`)}
                      className="font-medium hover:underline"
                    >
                      {lead.customerName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{lead.requestedService}</td>
                  <td className="px-4 py-3">{lead.location ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} locale={locale} />
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div className="p-6 text-neutral-400">{copy.noLeads}</div>
          )}
        </div>
      </section>
    </main>
  );
}