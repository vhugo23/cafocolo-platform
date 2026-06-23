import Link from "next/link";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import type { Lead } from "@/types/lead";
import type { Project } from "@/types/project";

export default async function AdminDashboardPage() {
  /*
   * Why this page exists:
   * /admin is becoming the official home for the internal business dashboard.
   * For now, it mirrors the existing dashboard at / so we can migrate safely.
   */
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
          eyebrow="Cafocolo Admin"
          title="Painel"
          description="Visão geral das solicitações, projetos e da atividade atual do negócio."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            label="Total de solicitações"
            value={leads.length}
            href="/admin/leads"
          />
          <DashboardCard
            label="Solicitações em aberto"
            value={openLeads.length}
            href="/admin/leads"
          />
          <DashboardCard
            label="Projetos ativos"
            value={activeProjects.length}
            href="/admin/projects"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Solicitações recentes</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Pedidos mais recentes dos clientes.
                </p>
              </div>

              <Link
                href="/admin/leads"
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
              >
                Ver tudo
              </Link>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="block rounded-lg border border-neutral-800 bg-neutral-950 p-4 hover:bg-neutral-800/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{lead.customerName}</p>
                      <p className="mt-1 text-sm text-neutral-400">
                        {lead.requestedService}
                      </p>
                    </div>

                    <StatusBadge status={lead.status} />
                  </div>
                </Link>
              ))}

              {leads.length === 0 && (
                <p className="text-neutral-400">
                  Nenhuma solicitação encontrada.
                </p>
              )}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Projetos recentes</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Trabalhos atuais e recentes.
                </p>
              </div>

              <Link
                href="/admin/projects"
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
              >
                Ver tudo
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="block rounded-lg border border-neutral-800 bg-neutral-950 p-4 hover:bg-neutral-800/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{project.projectName}</p>
                      <p className="mt-1 text-sm text-neutral-400">
                        {project.customerName}
                      </p>
                    </div>

                    <StatusBadge status={project.status} />
                  </div>
                </Link>
              ))}

              {projects.length === 0 && (
                <p className="text-neutral-400">
                  Nenhum projeto encontrado.
                </p>
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