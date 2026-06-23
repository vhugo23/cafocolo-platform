"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAdmin } from "@/lib/auth-api";
import {
  adminCopy,
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";

type AdminLogoutButtonProps = {
  locale?: AdminLocale;
};

export function AdminLogoutButton({ locale = "en" }: AdminLogoutButtonProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const copy = adminCopy[locale];

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logoutAdmin();

      router.push(getAdminPath(locale, "/admin/login"));
      router.refresh();
    } catch {
      router.push(getAdminPath(locale, "/admin/login"));
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
      {isLoggingOut ? copy.loggingOut : copy.logout}
    </button>
  );
}