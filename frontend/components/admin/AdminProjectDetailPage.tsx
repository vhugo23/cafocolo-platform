import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { ProjectNoteForm } from "@/components/ProjectNoteForm";
import { ProjectQuoteForm } from "@/components/ProjectQuoteForm";
import { ProjectStatusActions } from "@/components/ProjectStatusActions";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/format";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Project } from "@/types/project";
import type { ProjectNote } from "@/types/project-note";
import type { Quote } from "@/types/quote";

type AdminProjectDetailPageProps = {
  id: string;
  locale: AdminLocale;
};

const copy = {
  en: {
    backToProjects: "← Back to projects",
    eyebrow: "Project Detail",
    description: "Project information, notes, and quotes.",
    customer: "Customer",
    projectType: "Project Type",
    status: "Status",
    estimatedBudget: "Estimated Budget",
    startDate: "Start Date",
    targetCompletion: "Target Completion",
    projectDescription: "Description",
    noDescription: "No description provided.",
    projectNotes: "Project Notes",
    projectNotesDescription:
      "Updates, decisions, and reminders for this project.",
    noNotes: "No notes yet.",
    unknown: "Unknown",
    quotes: "Quotes",
    quotesDescription: "Estimates connected to this project.",
    noQuotes: "No quotes yet.",
    title: "Title",
    total: "Total",
    validUntil: "Valid Until",
  },
  pt: {
    backToProjects: "← Voltar aos projetos",
    eyebrow: "Detalhes do projeto",
    description: "Informações do projeto, notas e orçamentos.",
    customer: "Cliente",
    projectType: "Tipo de projeto",
    status: "Status",
    estimatedBudget: "Orçamento estimado",
    startDate: "Data de início",
    targetCompletion: "Conclusão prevista",
    projectDescription: "Descrição",
    noDescription: "Nenhuma descrição fornecida.",
    projectNotes: "Notas do projeto",
    projectNotesDescription:
      "Atualizações, decisões e lembretes para este projeto.",
    noNotes: "Nenhuma nota ainda.",
    unknown: "Desconhecido",
    quotes: "Orçamentos",
    quotesDescription: "Estimativas conectadas a este projeto.",
    noQuotes: "Nenhum orçamento ainda.",
    title: "Título",
    total: "Total",
    validUntil: "Válido até",
  },
} as const;

export async function AdminProjectDetailPage({
  id,
  locale,
}: AdminProjectDetailPageProps) {
  const text = copy[locale];

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
            href={getAdminPath(locale, "/admin/projects")}
            className="text-sm text-neutral-400 hover:text-white"
          >
            {text.backToProjects}
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            {text.eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            {project.projectName}
          </h1>

          <p className="mt-2 text-neutral-400">{text.description}</p>
        </div>

        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label={text.customer} value={project.customerName} />
            <DetailItem label={text.projectType} value={project.projectType} />
            <DetailItem
              label={text.status}
              value={<StatusBadge status={project.status} locale={locale} />}
            />
            <DetailItem
              label={text.estimatedBudget}
              value={formatCurrency(project.estimatedBudget)}
            />
            <DetailItem
              label={text.startDate}
              value={formatDate(project.startDate)}
            />
            <DetailItem
              label={text.targetCompletion}
              value={formatDate(project.targetCompletionDate)}
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">
              {text.projectDescription}
            </p>
            <p className="mt-2 rounded-lg bg-neutral-950 p-4 text-neutral-200">
              {project.description ?? text.noDescription}
            </p>
          </div>
        </Card>

        <ProjectStatusActions
          projectId={project.id}
          currentStatus={project.status}
        />

        <ProjectNoteForm projectId={project.id} />

        <Card className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{text.projectNotes}</h2>
            <p className="mt-1 text-sm text-neutral-400">
              {text.projectNotesDescription}
            </p>
          </div>

          {notes.length === 0 ? (
            <p className="text-neutral-400">{text.noNotes}</p>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-neutral-800 bg-neutral-950 p-4"
                >
                  <p className="text-neutral-100">{note.noteText}</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    {note.createdBy ?? text.unknown} ·{" "}
                    {formatDateTime(note.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <ProjectQuoteForm projectId={project.id} />

        <Card className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{text.quotes}</h2>
            <p className="mt-1 text-sm text-neutral-400">
              {text.quotesDescription}
            </p>
          </div>

          {quotes.length === 0 ? (
            <p className="text-neutral-400">{text.noQuotes}</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">{text.title}</th>
                    <th className="px-4 py-3">{text.total}</th>
                    <th className="px-4 py-3">{text.status}</th>
                    <th className="px-4 py-3">{text.validUntil}</th>
                  </tr>
                </thead>

                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={getAdminPath(
                            locale,
                            `/admin/quotes/${quote.id}`
                          )}
                          className="hover:underline"
                        >
                          {quote.title}
                        </Link>
                      </td>

                      <td className="px-4 py-3">
                        {formatCurrency(quote.totalAmount)}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={quote.status} locale={locale} />
                      </td>

                      <td className="px-4 py-3 text-neutral-400">
                        {formatDate(quote.validUntil)}
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