import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Reusable card container.
 *
 * Why this exists:
 * - Many pages repeat the same rounded border/background styling.
 * - This keeps the app's layout consistent.
 * - The optional className lets each page add spacing or custom layout when needed.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-900 p-6 ${className}`}
    >
      {children}
    </div>
  );
}