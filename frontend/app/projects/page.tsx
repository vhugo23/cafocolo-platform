import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Project } from "@/types/project";

export default async function ProjectsPage() {
  const projects = await apiFetch<Project[]>("/api/v1/projects");

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Cafocolo Admin"
          title="Projects"
          description="Confirmed work created from customer leads."
          actions={
            <Link
              href="/leads"
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
            >
              View Leads
            </Link>
          }
        />

        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          <table className="w-full border-collapse text-left">
            <thead className="bg-neutral-800 text-sm text-neutral-300">
              <tr>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Budget</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Target Date</th>
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
                      href={`/projects/${project.id}`}
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
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {formatDate(project.targetCompletionDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {projects.length === 0 && (
            <div className="p-6 text-neutral-400">No projects found.</div>
          )}
        </div>
      </section>
    </main>
  );
}