"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientApiPatch } from "@/lib/client-api";

const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "SITE_VISIT_SCHEDULED",
  "QUOTED",
  "ACCEPTED",
  "DECLINED",
];

const leadStatusLabelsPt: Record<string, string> = {
  NEW: "Nova",
  CONTACTED: "Contactada",
  SITE_VISIT_SCHEDULED: "Visita agendada",
  QUOTED: "Orçamentada",
  ACCEPTED: "Aceita",
  DECLINED: "Recusada",
};

function formatLeadStatus(status: string) {
  return leadStatusLabelsPt[status] ?? status;
}

type LeadStatusActionsProps = {
  leadId: string;
  currentStatus: string;
};

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
      await clientApiPatch(`/api/v1/leads/${leadId}/status`, {
        status,
      });

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o estado da solicitação."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Atualizar estado da solicitação
        </h2>
        <p className="mt-1 text-sm text-neutral-400">
          Estado atual:{" "}
          <span className="font-medium text-neutral-200">
            {formatLeadStatus(currentStatus)}
          </span>
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
              title={status}
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              {formatLeadStatus(status)}
            </button>
          );
        })}
      </div>

      {isUpdating && (
        <p className="mt-4 text-sm text-neutral-400">
          Atualizando estado...
        </p>
      )}

      {errorMessage && (
        <p className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}