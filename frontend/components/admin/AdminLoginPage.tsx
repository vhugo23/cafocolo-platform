"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAdmin } from "@/lib/auth-api";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";

type AdminLoginPageProps = {
  locale: AdminLocale;
};

const loginCopy = {
  en: {
    backToPublicSite: "← Back to public site",
    eyebrow: "Cafocolo Admin",
    title: "Sign in",
    description:
      "Access the internal dashboard for leads, customers, projects, and quotes.",
    email: "Email",
    password: "Password",
    fallbackError: "Failed to log in",
    signingIn: "Signing in...",
    signIn: "Sign in",
    helper:
      "Local development credentials are prefilled. Production credentials will come from environment variables.",
  },
  pt: {
    backToPublicSite: "← Voltar ao site público",
    eyebrow: "Administração Cafocolo",
    title: "Entrar",
    description:
      "Acesse o painel interno para solicitações, clientes, projetos e orçamentos.",
    email: "Email",
    password: "Senha",
    fallbackError: "Não foi possível entrar",
    signingIn: "Entrando...",
    signIn: "Entrar",
    helper:
      "As credenciais locais de desenvolvimento já vêm preenchidas. Em produção, as credenciais vêm das variáveis de ambiente.",
  },
} as const;

export function AdminLoginPage({ locale }: AdminLoginPageProps) {
  const router = useRouter();
  const copy = loginCopy[locale];

  const [email, setEmail] = useState("admin@cafocolo.local");
  const [password, setPassword] = useState("admin123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const publicSiteHref = locale === "pt" ? "/pt" : "/";

  function getRedirectPath() {
    if (typeof window === "undefined") {
      return getAdminPath(locale, "/admin");
    }

    const searchParams = new URLSearchParams(window.location.search);
    const from = searchParams.get("from");

    if (from?.startsWith("/pt/admin") && locale === "pt") {
      return from;
    }

    if (from?.startsWith("/admin") && locale === "en") {
      return from;
    }

    return getAdminPath(locale, "/admin");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await loginAdmin(email, password);

      router.push(getRedirectPath());
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : copy.fallbackError
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center">
        <Link
          href={publicSiteHref}
          className="mb-8 text-sm text-neutral-400 hover:text-white"
        >
          {copy.backToPublicSite}
        </Link>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            {copy.eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{copy.title}</h1>

          <p className="mt-2 text-sm text-neutral-400">{copy.description}</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <div>
              <label className="text-sm text-neutral-400">{copy.email}</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">
                {copy.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
              />
            </div>

            {errorMessage && (
              <p className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-300"
            >
              {isSubmitting ? copy.signingIn : copy.signIn}
            </button>
          </form>

          <p className="mt-6 text-xs text-neutral-500">{copy.helper}</p>
        </div>
      </section>
    </main>
  );
}