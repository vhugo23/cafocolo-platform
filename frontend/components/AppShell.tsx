"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  /*
   * Why this exists:
   * The project now has two experiences:
   * - Public visitor pages, like /site and /request-quote
   * - Internal admin pages, like /, /leads, /projects, /customers
   *
   * Public visitors should not see the admin navigation.
   */
  const isPublicPage =
    pathname === "/" ||
    pathname === "/site" ||
    pathname === "/admin/login" ||
    pathname.startsWith("/request-quote");

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <Link href="/admin" className="text-sm font-semibold">
            Cafocolo Admin
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/leads"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Leads
            </Link>

            <Link
              href="/admin/customers"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Customers
            </Link>

            <Link
              href="/admin/projects"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Projects
            </Link>

            <Link
              href="/request-quote"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Request Quote
            </Link>

            <Link
              href="/"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Public Site
            </Link>
            <AdminLogoutButton />
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}