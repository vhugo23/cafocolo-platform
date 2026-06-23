export type AdminLocale = "en" | "pt";

export const adminCopy = {
  en: {
    brand: "Cafocolo Admin",
    dashboard: "Dashboard",
    leads: "Leads",
    customers: "Customers",
    projects: "Projects",
    requestQuote: "Request Quote",
    publicSite: "Public Site",
    logout: "Logout",
    loggingOut: "Logging out...",
  },
  pt: {
    brand: "Administração Cafocolo",
    dashboard: "Painel",
    leads: "Solicitações",
    customers: "Clientes",
    projects: "Projetos",
    requestQuote: "Pedir orçamento",
    publicSite: "Site público",
    logout: "Sair",
    loggingOut: "Terminando sessão...",
  },
} as const;

export const statusLabels = {
  en: {
    NEW: "New",
    CONTACTED: "Contacted",
    SITE_VISIT_SCHEDULED: "Site visit scheduled",
    QUOTED: "Quoted",
    ACCEPTED: "Accepted",
    DECLINED: "Declined",

    PLANNING: "Planning",
    IN_PROGRESS: "In progress",
    ON_HOLD: "On hold",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",

    DRAFT: "Draft",
    SENT: "Sent",
    EXPIRED: "Expired",
  },
  pt: {
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
  },
} as const;

export function getAdminLocaleFromPathname(pathname: string): AdminLocale {
  return pathname.startsWith("/pt/admin") ? "pt" : "en";
}

export function getAdminPath(locale: AdminLocale, path: string) {
  return locale === "pt" ? `/pt${path}` : path;
}

export function formatStatus(status: string, locale: AdminLocale) {
  const labels = statusLabels[locale] as Record<string, string>;
  return labels[status] ?? status;
}