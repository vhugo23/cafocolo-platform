export type AdminSession = {
  authenticated: boolean;
  email: string | null;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return API_BASE_URL;
}

/**
 * Logs an admin into the backend.
 *
 * Why credentials: "include" matters:
 * - The backend sets an HTTP-only cookie.
 * - The browser only stores/sends that cookie for cross-origin API calls
 *   when credentials are included.
 */
export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return (await response.json()) as AdminSession;
}

/**
 * Checks whether the current browser session has a valid admin cookie.
 */
export async function getAdminSession() {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return {
      authenticated: false,
      email: null,
    } satisfies AdminSession;
  }

  return (await response.json()) as AdminSession;
}

/**
 * Logs the admin out by asking the backend to expire the auth cookie.
 */
export async function logoutAdmin() {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }

  return (await response.json()) as AdminSession;
}