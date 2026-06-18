import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import type { Lead } from "@/types/lead";
import type { Project } from "@/types/project";

export default async function DashboardPage() {
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
          title="Dashboard"
          description="Overview of leads, projects, and current business activity."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard label="Total Leads" value={leads.length} href="/leads" />
          <DashboardCard label="Open Leads" value={openLeads.length} href="/leads" />
          <DashboardCard
            label="Active Projects"
            value={activeProjects.length}
            href="/projects"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Recent Leads</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Latest customer requests.
                </p>
              </div>

              <Link
                href="/leads"
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <Link
                  key={lead.id}
                  href={`/leads/${lead.id}`}
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
            </div>
          </section>

          <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Recent Projects</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Current and recent work.
                </p>
              </div>

              <Link
                href="/projects"
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
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
            </div>
          </section>
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
    <Link
      href={href}
      className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 transition hover:bg-neutral-800/60"
    >
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </Link>
  );
}