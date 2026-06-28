import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Customer } from "@/types/customer";
import type { Lead } from "@/types/lead";
import type { Project } from "@/types/project";

type AdminCustomerDetailPageProps = {
  id: string;
  locale: AdminLocale;
};

const copy = {
  en: {
    backToCustomers: "← Back to customers",
    eyebrow: "Customer Detail",
    description: "Customer profile, submitted leads, and related projects.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    email: "Email",
    city: "City",
    created: "Created",
    customerLeads: "Customer Leads",
    customerLeadsDescription: "Requests submitted by this customer.",
    noLeads: "No leads found for this customer.",
    service: "Service",
    location: "Location",
    status: "Status",
    customerProjects: "Customer Projects",
    customerProjectsDescription: "Projects connected to this customer.",
    noProjects: "No projects found for this customer.",
    project: "Project",
    type: "Type",
    budget: "Budget",
    targetDate: "Target Date",
    fallback: "—",
  },
  pt: {
    backToCustomers: "← Voltar aos clientes",
    eyebrow: "Detalhes do cliente",
    description:
      "Perfil do cliente, solicitações enviadas e projetos relacionados.",
    fullName: "Nome completo",
    phoneNumber: "Telefone",
    email: "Email",
    city: "Cidade",
    created: "Criado em",
    customerLeads: "Solicitações do cliente",
    customerLeadsDescription: "Solicitações enviadas por este cliente.",
    noLeads: "Nenhuma solicitação encontrada para este cliente.",
    service: "Serviço",
    location: "Localização",
    status: "Status",
    customerProjects: "Projetos do cliente",
    customerProjectsDescription: "Projetos conectados a este cliente.",
    noProjects: "Nenhum projeto encontrado para este cliente.",
    project: "Projeto",
    type: "Tipo",
    budget: "Orçamento",
    targetDate: "Data prevista",
    fallback: "—",
  },
} as const;

export async function AdminCustomerDetailPage({
  id,
  locale,
}: AdminCustomerDetailPageProps) {
  const text = copy[locale];

  const [customer, leads, projects] = await Promise.all([
    apiFetch<Customer>(`/api/v1/customers/${id}`),
    apiFetch<Lead[]>(`/api/v1/customers/${id}/leads`),
    apiFetch<Project[]>(`/api/v1/customers/${id}/projects`),
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href={getAdminPath(locale, "/admin/customers")}
            className="text-sm text-neutral-400 hover:text-white"
          >
            {text.backToCustomers}
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            {text.eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{customer.fullName}</h1>

          <p className="mt-2 text-neutral-400">{text.description}</p>
        </div>

        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label={text.fullName} value={customer.fullName} />
            <DetailItem label={text.phoneNumber} value={customer.phoneNumber} />
            <DetailItem
              label={text.email}
              value={customer.email ?? text.fallback}
            />
            <DetailItem
              label={text.city}
              value={customer.city ?? text.fallback}
            />
            <DetailItem
              label={text.created}
              value={formatDate(customer.createdAt)}
            />
          </div>
        </Card>

        <Card className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{text.customerLeads}</h2>
            <p className="mt-1 text-sm text-neutral-400">
              {text.customerLeadsDescription}
            </p>
          </div>

          {leads.length === 0 ? (
            <p className="text-neutral-400">{text.noLeads}</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">{text.service}</th>
                    <th className="px-4 py-3">{text.location}</th>
                    <th className="px-4 py-3">{text.status}</th>
                    <th className="px-4 py-3">{text.created}</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={getAdminPath(locale, `/admin/leads/${lead.id}`)}
                          className="hover:underline"
                        >
                          {lead.requestedService}
                        </Link>
                      </td>

                      <td className="px-4 py-3">
                        {lead.location ?? text.fallback}
                      </td>

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
            </div>
          )}
        </Card>

        <Card className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{text.customerProjects}</h2>
            <p className="mt-1 text-sm text-neutral-400">
              {text.customerProjectsDescription}
            </p>
          </div>

          {projects.length === 0 ? (
            <p className="text-neutral-400">{text.noProjects}</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">{text.project}</th>
                    <th className="px-4 py-3">{text.type}</th>
                    <th className="px-4 py-3">{text.budget}</th>
                    <th className="px-4 py-3">{text.status}</th>
                    <th className="px-4 py-3">{text.targetDate}</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={getAdminPath(
                            locale,
                            `/admin/projects/${project.id}`
                          )}
                          className="hover:underline"
                        >
                          {project.projectName}
                        </Link>
                      </td>

                      <td className="px-4 py-3">{project.projectType}</td>

                      <td className="px-4 py-3">
                        {formatCurrency(project.estimatedBudget)}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={project.status} locale={locale} />
                      </td>

                      <td className="px-4 py-3 text-neutral-400">
                        {formatDate(project.targetCompletionDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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