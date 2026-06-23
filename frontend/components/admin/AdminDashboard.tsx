import Link from "next/link";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Lead } from "@/types/lead";
import type { Project } from "@/types/project";

type AdminDashboardProps = {
  locale: AdminLocale;
};

const dashboardCopy = {
  en: {
    eyebrow: "Cafocolo Admin",
    title: "Dashboard",
    description: "Overview of leads, projects, and current business activity.",
    totalLeads: "Total Leads",
    openLeads: "Open Leads",
    activeProjects: "Active Projects",
    recentLeads: "Recent Leads",
    recentLeadsDescription: "Latest customer requests.",
    recentProjects: "Recent Projects",
    recentProjectsDescription: "Current and recent work.",
    viewAll: "View all",
    noLeads: "No leads found.",
    noProjects: "No projects found.",
  },
  pt: {
    eyebrow: "Administração Cafocolo",
    title: "Painel",
    description:
      "Visão geral das solicitações, projetos e da atividade atual do negócio.",
    totalLeads: "Total de solicitações",
    openLeads: "Solicitações em aberto",
    activeProjects: "Projetos ativos",
    recentLeads: "Solicitações recentes",
    recentLeadsDescription: "Pedidos mais recentes dos clientes.",
    recentProjects: "Projetos recentes",
    recentProjectsDescription: "Trabalhos atuais e recentes.",
    viewAll: "Ver tudo",
    noLeads: "Nenhuma solicitação encontrada.",
    noProjects: "Nenhum projeto encontrado.",
  },
} as const;

export async function AdminDashboard({ locale }: AdminDashboardProps) {
  const copy = dashboardCopy[locale];

  const [leads, projects] = await Promise.all([
    apiFetch<Lead[]>("/api/v1/leads"),
    apiFetch<Project[]>("/api/v1/projects"),
  ]);

  const openLeads = leads.filter(
    (lead) => lead.status !== "ACCEPTED" && lead.status !== "DECLINED"
  );

  const activeProjects = projects.filter(
    (project) =>
      project.status !== "COMPLETED" && project.status !== "CANCELLED"
  );

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            label={copy.totalLeads}
            value={leads.length}
            href={getAdminPath(locale, "/admin/leads")}
          />
          <DashboardCard
            label={copy.openLeads}
            value={openLeads.length}
            href={getAdminPath(locale, "/admin/leads")}
          />
          <DashboardCard
            label={copy.activeProjects}
            value={activeProjects.length}
            href={getAdminPath(locale, "/admin/projects")}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{copy.recentLeads}</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {copy.recentLeadsDescription}
                </p>
              </div>

              <Link
                href={getAdminPath(locale, "/admin/leads")}
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
              >
                {copy.viewAll}
              </Link>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <Link
                  key={lead.id}
                  href={getAdminPath(locale, `/admin/leads/${lead.id}`)}
                  className="block rounded-lg border border-neutral-800 bg-neutral-950 p-4 hover:bg-neutral-800/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{lead.customerName}</p>
                      <p className="mt-1 text-sm text-neutral-400">
                        {lead.requestedService}
                      </p>
                    </div>

                    <StatusBadge status={lead.status} locale={locale} />
                  </div>
                </Link>
              ))}

              {leads.length === 0 && (
                <p className="text-neutral-400">{copy.noLeads}</p>
              )}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {copy.recentProjects}
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {copy.recentProjectsDescription}
                </p>
              </div>

              <Link
                href={getAdminPath(locale, "/admin/projects")}
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
              >
                {copy.viewAll}
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  href={getAdminPath(locale, `/admin/projects/${project.id}`)}
                  className="block rounded-lg border border-neutral-800 bg-neutral-950 p-4 hover:bg-neutral-800/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{project.projectName}</p>
                      <p className="mt-1 text-sm text-neutral-400">
                        {project.customerName}
                      </p>
                    </div>

                    <StatusBadge status={project.status} locale={locale} />
                  </div>
                </Link>
              ))}

              {projects.length === 0 && (
                <p className="text-neutral-400">{copy.noProjects}</p>
              )}
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}

function DashboardCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="transition hover:bg-neutral-800/60">
        <p className="text-sm text-neutral-400">{label}</p>
        <p className="mt-3 text-3xl font-semibold">{value}</p>
      </Card>
    </Link>
  );
}