import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

/**
 * Reusable page header.
 *
 * Why this exists:
 * - Most pages repeat the same title/description layout.
 * - Centralizing it keeps spacing and typography consistent.
 * - The optional actions slot lets pages add buttons like "View Projects".
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-wide text-neutral-400">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-neutral-400">{description}</p>
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}