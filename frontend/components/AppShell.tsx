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

  const isPublicPage =
    pathname === "/" ||
    pathname === "/pt" ||
    pathname === "/site" ||
    pathname === "/admin/login" ||
    pathname.startsWith("/request-quote") ||
    pathname.startsWith("/pt/request-quote");

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <Link href="/admin" className="text-sm font-semibold">
            Administração Cafocolo
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/admin"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Painel
            </Link>

            <Link
              href="/admin/leads"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Solicitações
            </Link>

            <Link
              href="/admin/customers"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Clientes
            </Link>

            <Link
              href="/admin/projects"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Projetos
            </Link>

            <Link
              href="/pt/request-quote"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Pedir orçamento
            </Link>

            <Link
              href="/pt"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Site público
            </Link>

            <AdminLogoutButton />
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}