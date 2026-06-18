"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";

type CreateProjectFromLeadFormProps = {
  leadId: string;
  defaultProjectName: string;
  defaultDescription: string;
};

type CreatedProjectResponse = {
  id: string;
};

export function CreateProjectFromLeadForm({
  leadId,
  defaultProjectName,
  defaultDescription,
}: CreateProjectFromLeadFormProps) {
  const router = useRouter();

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
      const createdProject = await apiPost<CreatedProjectResponse>(
        `/api/v1/leads/${leadId}/project`,
        {
          projectName,
          projectType,
          description,
          estimatedBudget: estimatedBudget ? Number(estimatedBudget) : null,
          startDate: startDate || null,
          targetCompletionDate: targetCompletionDate || null,
        }
      );

      router.push(`/projects/${createdProject.id}`);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the project."
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
        <h2 className="text-xl font-semibold">Create Project from Lead</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Convert this customer request into an active project.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-neutral-300">Project Name</span>
          <input
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">Project Type</span>
          <input
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
            required
            placeholder="Cabinets, renovation, furniture..."
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-300">Estimated Budget</span>
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
          <span className="text-sm text-neutral-300">Start Date</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm text-neutral-300">Target Completion Date</span>
          <input
            type="date"
            value={targetCompletionDate}
            onChange={(event) => setTargetCompletionDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-400"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm text-neutral-300">Description</span>
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
          {isSubmitting ? "Creating..." : "Create Project"}
        </button>
      </div>
    </form>
  );
}