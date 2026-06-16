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