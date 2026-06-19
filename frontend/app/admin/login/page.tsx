"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAdmin } from "@/lib/auth-api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@cafocolo.local");
  const [password, setPassword] = useState("admin123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      /*
       * The backend sets the HTTP-only cookie.
       * The frontend does not manually store the token.
       */
      await loginAdmin(email, password);

      /*
       * After login, send the user to the internal admin dashboard.
       */
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to log in"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center">
        <Link href="/" className="mb-8 text-sm text-neutral-400 hover:text-white">
          ← Back to public site
        </Link>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            Cafocolo Admin
          </p>

          <h1 className="mt-2 text-3xl font-semibold">Sign in</h1>

          <p className="mt-2 text-sm text-neutral-400">
            Access the internal dashboard for leads, customers, projects, and
            quotes.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <div>
              <label className="text-sm text-neutral-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">Password</label>
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-xs text-neutral-500">
            Local development credentials are prefilled. Production credentials
            will come from environment variables.
          </p>
        </div>
      </section>
    </main>
  );
}