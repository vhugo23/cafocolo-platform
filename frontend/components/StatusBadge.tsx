import { formatStatus, type AdminLocale } from "@/lib/admin-i18n";

type StatusBadgeProps = {
  status: string;
  locale?: AdminLocale;
};

export function StatusBadge({ status, locale = "en" }: StatusBadgeProps) {
  return (
    <span
      title={status}
      className="rounded-full bg-neutral-700 px-3 py-1 text-xs"
    >
      {formatStatus(status, locale)}
    </span>
  );
}