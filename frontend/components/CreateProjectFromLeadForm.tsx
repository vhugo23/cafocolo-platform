"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { clientApiPost } from "@/lib/client-api";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Project } from "@/types/project";

type CreateProjectFromLeadFormProps = {
  leadId: string;
  defaultProjectName: string;
  defaultDescription: string;
  locale?: AdminLocale;
};

const copy = {
  en: {
    title: "Create Project from Lead",
    description: "Convert this customer request into an active project.",
    projectName: "Project Name",
    projectType: "Project Type",
    projectTypePlaceholder: "Cabinets, renovation, furniture...",
    estimatedBudget: "Estimated Budget",
    startDate: "Start Date",
    targetCompletionDate: "Target Completion Date",
    projectDescription: "Description",
    creating: "Creating...",
    createProject: "Create Project",
    fallbackError: "Something went wrong while creating the project.",
  },
  pt: {
    title: "Criar projeto a partir da solicitação",
    description: "Converta esta solicitação do cliente em um projeto ativo.",
    projectName: "Nome do projeto",
    projectType: "Tipo de projeto",
    projectTypePlaceholder: "Armários, renovação, mobiliário...",
    estimatedBudget: "Orçamento estimado",
    startDate: "Data de início",
    targetCompletionDate: "Data prevista de conclusão",
    projectDescription: "Descrição",
    creating: "Criando...",
    createProject: "Criar projeto",
    fallbackError: "Algo deu errado ao criar o projeto.",
  },
} as const;

export function CreateProjectFromLeadForm({
  leadId,
  defaultProjectName,
  defaultDescription,
  locale = "en",
}: CreateProjectFromLeadFormProps) {
  const router = useRouter();
  const text = copy[locale];

  const [projectName, setProjectName] = useState(defaultProjectName);
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState(defaultDescription);
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [targetCompletionDate, setTargetCompletionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const createdProject = await clientApiPost<
        Project,
        {
          projectName: string;
          projectType: string;
          description: string | null;
          estimatedBudget: number | null;
          startDate: string | null;
          targetCompletionDate: string | null;
        }
      >(`/api/v1/leads/${leadId}/project`, {
        projectName,
        projectType,
        description: description || null,
        estimatedBudget: estimatedBudget ? Number(estimatedBudget) : null,
        startDate: startDate || null,
        targetCompletionDate: targetCompletionDate || null,
      });

      router.push(getAdminPath(locale, `/admin/projects/${createdProject.id}`));
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : text.fallbackError
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{text.title}</h2>
        <p className="mt-1 text-sm text-neutral-400">{text.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-neutral-300">{text.projectName}</span>
          <input
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">{text.projectType}</span>
          <input
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
            required
            placeholder={text.projectTypePlaceholder}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">
            {text.estimatedBudget}
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={estimatedBudget}
            onChange={(event) => setEstimatedBudget(event.target.value)}
            placeholder="2500"
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">{text.startDate}</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm text-neutral-300">
            {text.targetCompletionDate}
          </span>
          <input
            type="date"
            value={targetCompletionDate}
            onChange={(event) => setTargetCompletionDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm text-neutral-300">
            {text.projectDescription}
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>
      </div>

      {errorMessage && (
        <p className="mt-4 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? text.creating : text.createProject}
        </button>
      </div>
    </form>
  );
}