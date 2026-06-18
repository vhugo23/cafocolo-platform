import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-neutral-400 hover:text-white">
            ← Back to dashboard
          </Link>
        </div>

        <PageHeader
          eyebrow="Public Request Form"
          title="Request a Quote"
          description="Submit a customer request. The backend will create a customer and a lead."
        />

        <RequestQuoteForm />
      </section>
    </main>
  );
}