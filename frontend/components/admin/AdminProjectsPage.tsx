import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Project } from "@/types/project";

type AdminProjectsPageProps = {
  locale: AdminLocale;
};

const copy = {
  en: {
    eyebrow: "Cafocolo Admin",
    title: "Projects",
    description: "Confirmed work created from customer leads.",
    viewLeads: "View Leads",
    project: "Project",
    customer: "Customer",
    type: "Type",
    budget: "Budget",
    status: "Status",
    targetDate: "Target Date",
    empty: "No projects found.",
  },
  pt: {
    eyebrow: "Administração Cafocolo",
    title: "Projetos",
    description: "Trabalhos confirmados criados a partir das solicitações dos clientes.",
    viewLeads: "Ver solicitações",
    project: "Projeto",
    customer: "Cliente",
    type: "Tipo",
    budget: "Orçamento",
    status: "Status",
    targetDate: "Data prevista",
    empty: "Nenhum projeto encontrado.",
  },
} as const;

export async function AdminProjectsPage({ locale }: AdminProjectsPageProps) {
  const projects = await apiFetch<Project[]>("/api/v1/projects");
  const text = copy[locale];

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow={text.eyebrow}
          title={text.title}
          description={text.description}
          actions={
            <Link
              href={getAdminPath(locale, "/admin/leads")}
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
            >
              {text.viewLeads}
            </Link>
          }
        />

        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          <table className="w-full border-collapse text-left">
            <thead className="bg-neutral-800 text-sm text-neutral-300">
              <tr>
                <th className="px-4 py-3">{text.project}</th>
                <th className="px-4 py-3">{text.customer}</th>
                <th className="px-4 py-3">{text.type}</th>
                <th className="px-4 py-3">{text.budget}</th>
                <th className="px-4 py-3">{text.status}</th>
                <th className="px-4 py-3">{text.targetDate}</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-t border-neutral-800 transition hover:bg-neutral-800/60"
                >
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

                  <td className="px-4 py-3">{project.customerName}</td>

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

          {projects.length === 0 && (
            <div className="p-6 text-neutral-400">{text.empty}</div>
          )}
        </div>
      </section>
    </main>
  );
}