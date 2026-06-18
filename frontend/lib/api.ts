const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Shared API helper for calling the Spring Boot backend.
 *
 * Why this exists:
 * - Keeps backend calls in one place.
 * - Avoids repeating the backend URL across pages.
 * - Gives us one place to improve API error handling later.
 */
export async function apiFetch<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * Shared API helper for PATCH requests.
 *
 * Why this exists:
 * - Updating statuses requires sending JSON to the backend.
 * - Keeping this here prevents each component from rewriting fetch logic.
 */
export async function apiPatch<T>(
  path: string,
  body: unknown
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * Shared API helper for POST requests.
 *
 * Why this exists:
 * - Forms need to create new backend records.
 * - Keeping POST logic here avoids rewriting fetch logic in every form.
 */
export async function apiPost<T>(
  path: string,
  body: unknown
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }

  return response.json();
}