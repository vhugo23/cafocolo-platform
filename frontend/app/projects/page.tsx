import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Project } from "@/types/project";

export default async function ProjectsPage() {
  const projects = await apiFetch<Project[]>("/api/v1/projects");

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-neutral-400">
              Cafocolo Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Projects</h1>
            <p className="mt-2 text-neutral-400">
              Confirmed work created from customer leads.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            View Leads
          </Link>
        </div>

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
                    {project.projectName}
                  </td>
                  <td className="px-4 py-3">{project.customerName}</td>
                  <td className="px-4 py-3">{project.projectType}</td>
                  <td className="px-4 py-3">
                    {project.estimatedBudget !== null
                      ? `$${project.estimatedBudget.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {project.targetCompletionDate
                      ? new Date(project.targetCompletionDate).toLocaleDateString()
                      : "—"}
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