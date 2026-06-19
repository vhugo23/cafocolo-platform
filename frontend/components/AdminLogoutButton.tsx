"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAdmin } from "@/lib/auth-api";

export function AdminLogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      /*
       * The backend expires the HTTP-only cookie.
       * Then we send the user back to the login page.
       */
      await logoutAdmin();

      router.push("/admin/login");
      router.refresh();
    } catch {
      /*
       * Even if the logout request fails, send the user to login.
       * Later, protected route checks will be the final source of truth.
       */
      router.push("/admin/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:text-neutral-600"
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}