type StatusBadgeProps = {
  status: string;
};

const statusLabelsPt: Record<string, string> = {
  NEW: "Nova",
  CONTACTED: "Contactada",
  SITE_VISIT_SCHEDULED: "Visita agendada",
  QUOTED: "Orçamentada",
  ACCEPTED: "Aceita",
  DECLINED: "Recusada",

  PLANNING: "Planeamento",
  IN_PROGRESS: "Em andamento",
  ON_HOLD: "Em pausa",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",

  DRAFT: "Rascunho",
  SENT: "Enviado",
  EXPIRED: "Expirado",
};

function formatStatus(status: string) {
  return statusLabelsPt[status] ?? status;
}

/**
 * Reusable status badge.
 *
 * Backend status values stay in English, but the admin UI displays
 * Portuguese labels so the business user can understand the workflow.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      title={status}
      className="rounded-full bg-neutral-700 px-3 py-1 text-xs"
    >
      {formatStatus(status)}
    </span>
  );
}