import "server-only";
import { cookies } from "next/headers";

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;

function getBackendApiBaseUrl() {
  if (!BACKEND_API_BASE_URL) {
    throw new Error("BACKEND_API_BASE_URL is not configured");
  }

  return BACKEND_API_BASE_URL;
}

async function getCookieHeader() {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export async function apiFetch<T>(path: string): Promise<T> {
  const cookieHeader = await getCookieHeader();

  const response = await fetch(`${getBackendApiBaseUrl()}${path}`, {
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