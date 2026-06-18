/**
 * Shared formatting helpers for frontend display.
 *
 * Why this exists:
 * - Keeps dates and currency consistent across pages.
 * - Avoids repeating formatting logic in every component.
 * - Makes future localization easier.
 */

export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString();
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString();
}