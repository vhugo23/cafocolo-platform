"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProjectNoteFormProps = {
  projectId: string;
};

/**
 * Client component for adding project notes.
 *
 * Why this is a client component:
 * - Forms require browser-side state.
 * - The user types note text before submitting.
 * - After submission, we refresh the project detail page.
 */
export function ProjectNoteForm({ projectId }: ProjectNoteFormProps) {
  const router = useRouter();

  const [noteText, setNoteText] = useState("");
  const [createdBy, setCreatedBy] = useState("Hugo");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!API_BASE_URL) {
      setErrorMessage("NEXT_PUBLIC_API_BASE_URL is not configured");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/projects/${projectId}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteText,
            createdBy: createdBy || null,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Request failed with status ${response.status}`
        );
      }

      setNoteText("");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to add project note"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Add Project Note</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Capture customer decisions, project updates, reminders, or site visit notes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="text-sm text-neutral-400">Note</label>
          <textarea
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            placeholder="Customer requested darker wood finish."
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Created By</label>
          <input
            value={createdBy}
            onChange={(event) => setCreatedBy(event.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            placeholder="Hugo"
          />
        </div>

        {errorMessage && (
          <p className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-300"
        >
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </form>
    </div>
  );
}