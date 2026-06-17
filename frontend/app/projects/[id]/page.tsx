import Link from "next/link";
import { ProjectStatusActions } from "@/components/ProjectStatusActions";
import { apiFetch } from "@/lib/api";
import type { Project } from "@/types/project";
import type { ProjectNote } from "@/types/project-note";
import type { Quote } from "@/types/quote";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  const [project, notes, quotes] = await Promise.all([
    apiFetch<Project>(`/api/v1/projects/${id}`),
    apiFetch<ProjectNote[]>(`/api/v1/projects/${id}/notes`),
    apiFetch<Quote[]>(`/api/v1/projects/${id}/quotes`),
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-sm text-neutral-400 hover:text-white"
          >
            ← Back to projects
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            Project Detail
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            {project.projectName}
          </h1>

          <p className="mt-2 text-neutral-400">
            Project information, notes, and quotes.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label="Customer" value={project.customerName} />
            <DetailItem label="Project Type" value={project.projectType} />
            <DetailItem label="Status" value={project.status} />
            <DetailItem
              label="Estimated Budget"
              value={
                project.estimatedBudget !== null
                  ? `$${project.estimatedBudget.toLocaleString()}`
                  : "—"
              }
            />
            <DetailItem
              label="Start Date"
              value={
                project.startDate
                  ? new Date(project.startDate).toLocaleDateString()
                  : "—"
              }
            />
            <DetailItem
              label="Target Completion"
              value={
                project.targetCompletionDate
                  ? new Date(project.targetCompletionDate).toLocaleDateString()
                  : "—"
              }
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">Description</p>
            <p className="mt-2 rounded-lg bg-neutral-950 p-4 text-neutral-200">
              {project.description ?? "No description provided."}
            </p>
          </div>
        </div>

        <ProjectStatusActions
          projectId={project.id}
          currentStatus={project.status}
        />

        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Project Notes</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Updates, decisions, and reminders for this project.
            </p>
          </div>

          {notes.length === 0 ? (
            <p className="text-neutral-400">No notes yet.</p>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-neutral-800 bg-neutral-950 p-4"
                >
                  <p className="text-neutral-100">{note.noteText}</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    {note.createdBy ?? "Unknown"} ·{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Quotes</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Estimates connected to this project.
            </p>
          </div>

          {quotes.length === 0 ? (
            <p className="text-neutral-400">No quotes yet.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Valid Until</th>
                  </tr>
                </thead>

                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">{quote.title}</td>
                      <td className="px-4 py-3">
                        ${quote.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs">
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-400">
                        {quote.validUntil
                          ? new Date(quote.validUntil).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 font-medium text-neutral-100">{value}</p>
    </div>
  );
}