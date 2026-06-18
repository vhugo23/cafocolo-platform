import Link from "next/link";

type AppShellProps = {
  children: React.ReactNode;
};

/**
 * Shared application shell for the admin dashboard.
 *
 * Why this exists:
 * - Keeps navigation consistent across pages.
 * - Gives the user a reliable way to return to the main dashboard.
 * - Prevents every page from rebuilding the same header.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <Link href="/" className="font-semibold tracking-wide hover:text-neutral-300">
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
              href="/"
              className="rounded-full px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
              Leads
            </Link>

            <Link
              href="/projects"
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
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}