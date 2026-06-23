type StatusBadgeProps = {
  status: string;
};

/**
 * Reusable status badge.
 *
 * Why this exists:
 * - Status labels appear across leads, projects, and quotes.
 * - Keeping the styling in one component makes the UI more consistent.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs">
      {status}
    </span>
  );
}