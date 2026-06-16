"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiPatch } from "@/lib/api";
import type { Lead } from "@/types/lead";

const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "SITE_VISIT_SCHEDULED",
  "QUOTED",
  "ACCEPTED",
  "DECLINED",
];

type LeadStatusActionsProps = {
  leadId: string;
  currentStatus: string;
};

/**
 * Client component for updating a lead's status.
 *
 * Why this is a client component:
 * - Server components can fetch data.
 * - Button clicks and loading states require browser-side interactivity.
 */
export function LeadStatusActions({
  leadId,
  currentStatus,
}: LeadStatusActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function updateStatus(status: string) {
    setIsUpdating(true);
    setErrorMessage(null);

    try {
      await apiPatch<Lead>(`/api/v1/leads/${leadId}/status`, {
        status,
      });

      // Refreshes the current server-rendered page so it fetches the updated lead.
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
        <h2 className="text-lg font-semibold">Update Lead Status</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Current status:{" "}
          <span className="font-medium text-neutral-200">{currentStatus}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {LEAD_STATUSES.map((status) => {
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