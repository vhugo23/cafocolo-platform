"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import {
  adminCopy,
  getAdminLocaleFromPathname,
  getAdminPath,
} from "@/lib/admin-i18n";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const locale = getAdminLocaleFromPathname(pathname);
  const copy = adminCopy[locale];

  const isPublicPage =
    pathname === "/" ||
    pathname === "/pt" ||
    pathname === "/site" ||
    pathname === "/admin/login" ||
    pathname === "/pt/admin/login" ||
    pathname.startsWith("/request-quote") ||
    pathname.startsWith("/pt/request-quote");

  if (isPublicPage) {
    return <>{children}</>;
  }

  const quoteHref = locale === "pt" ? "/pt/request-quote" : "/request-quote";
  const publicSiteHref = locale === "pt" ? "/pt" : "/";
  const languageSwitchHref = locale === "pt" ? "/admin" : "/pt/admin";
  const languageSwitchLabel = locale === "pt" ? "EN" : "PT";

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <Link
            href={getAdminPath(locale, "/admin")}
            className="text-sm font-semibold"
          >
            {copy.brand}
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              href={getAdminPath(locale, "/admin")}
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              {copy.dashboard}
            </Link>

            <Link
              href={getAdminPath(locale, "/admin/leads")}
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              {copy.leads}
            </Link>

            <Link
              href={getAdminPath(locale, "/admin/customers")}
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              {copy.customers}
            </Link>

            <Link
              href={getAdminPath(locale, "/admin/projects")}
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              {copy.projects}
            </Link>

            <Link
              href={quoteHref}
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              {copy.requestQuote}
            </Link>

            <Link
              href={publicSiteHref}
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              {copy.publicSite}
            </Link>

            <Link
              href={languageSwitchHref}
              className="rounded-full px-4 py-2 text-amber-400 hover:bg-neutral-800 hover:text-amber-300"
            >
              {languageSwitchLabel}
            </Link>

            <AdminLogoutButton locale={locale} />
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}