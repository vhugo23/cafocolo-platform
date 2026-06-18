import Link from "next/link";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-neutral-400 hover:text-white">
            ← Back to dashboard
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            Public Request Form
          </p>

          <h1 className="mt-2 text-3xl font-semibold">Request a Quote</h1>

          <p className="mt-2 text-neutral-400">
            Submit a customer request. The backend will create a customer and a lead.
          </p>
        </div>

        <RequestQuoteForm />
      </section>
    </main>
  );
}