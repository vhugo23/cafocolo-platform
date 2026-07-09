import Image from "next/image";
import Link from "next/link";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <header className="border-b border-stone-800 bg-stone-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-10 w-24 overflow-hidden rounded bg-white">
              <Image
                src="/brand/cafocolo-logo-transparent.png"
                alt="Cafocolo LDA logo"
                fill
                sizes="96px"
                className="object-contain"
              />
            </span>
            <span className="text-lg font-semibold">Cafocolo</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <Link href="/#services" className="hover:text-white">
              Services
            </Link>
            <Link href="/#work" className="hover:text-white">
              Work
            </Link>
            <Link href="/#about" className="hover:text-white">
              About
            </Link>
            <Link href="/#contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/request-quote" className="text-amber-400">
              Request Quote
            </Link>
            <Link href="/pt/request-quote" className="hover:text-white">
              PT
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-8 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Link
            href="/"
            className="text-sm text-stone-400 hover:text-stone-100"
          >
            ← Back to Cafocolo site
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-amber-400">
            Request a Quote
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Tell Cafocolo about your project.
          </h1>

          <p className="mt-5 max-w-xl leading-7 text-stone-300">
            Share your contact information, location, and a short description of
            the work you want done. Cafocolo will review your request and use it
            to prepare the next steps.
          </p>

          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-lg font-semibold">
              What happens after you submit?
            </h2>

            <div className="mt-5 space-y-4">
              <ProcessNote
                step="01"
                title="Your request is received"
                description="The system creates a customer record and a new lead for Cafocolo to review."
              />
              <ProcessNote
                step="02"
                title="The project is reviewed"
                description="Cafocolo can check the service type, location, and project details."
              />
              <ProcessNote
                step="03"
                title="A quote can be prepared"
                description="If the request is a good fit, Cafocolo can turn it into a project and create an estimate."
              />
            </div>
          </div>
        </div>

        <RequestQuoteForm locale="en" />
      </section>
    </main>
  );
}

function ProcessNote({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-semibold text-stone-950">
        {step}
      </div>

      <div>
        <h3 className="font-medium text-stone-100">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-stone-400">{description}</p>
      </div>
    </div>
  );
}