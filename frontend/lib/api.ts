import "server-only";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return API_BASE_URL;
}

/**
 * Server-side API helper.
 *
 * Why this file is server-only:
 * - It imports cookies() from next/headers.
 * - next/headers can only run in Server Components or server-side code.
 * - Admin pages are server-rendered, so they need this file to forward the
 *   cafocolo_admin_token cookie to the Spring Boot backend.
 */
async function getCookieHeader() {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export async function apiFetch<T>(path: string): Promise<T> {
  const cookieHeader = await getCookieHeader();

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}