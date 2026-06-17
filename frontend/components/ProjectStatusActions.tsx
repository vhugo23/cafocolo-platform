"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiPatch } from "@/lib/api";
import type { Project } from "@/types/project";

const PROJECT_STATUSES = [
  "PLANNING",
  "IN_PROGRESS",
  "ON_HOLD",
  "COMPLETED",
  "CANCELLED",
];

type ProjectStatusActionsProps = {
  projectId: string;
  currentStatus: string;
};

/**
 * Client component for updating a project's status.
 *
 * Why this is a client component:
 * - Server components are good for fetching data.
 * - Button clicks, loading states, and status updates require browser interactivity.
 */
export function ProjectStatusActions({
  projectId,
  currentStatus,
}: ProjectStatusActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function updateStatus(status: string) {
    setIsUpdating(true);
    setErrorMessage(null);

    try {
      await apiPatch<Project>(`/api/v1/projects/${projectId}/status`, {
        status,
      });

      // Refreshes the server-rendered project detail page
      // so it fetches the updated project status.
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update status"
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Update Project Status</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Current status:{" "}
          <span className="font-medium text-neutral-200">{currentStatus}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PROJECT_STATUSES.map((status) => {
          const isCurrent = status === currentStatus;

          return (
            <button
              key={status}
              type="button"
              disabled={isUpdating || isCurrent}
              onClick={() => updateStatus(status)}
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              {status}
            </button>
          );
        })}
      </div>

      {isUpdating && (
        <p className="mt-4 text-sm text-neutral-400">Updating status...</p>
      )}

      {errorMessage && (
        <p className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}