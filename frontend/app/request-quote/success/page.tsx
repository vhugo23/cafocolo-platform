import Image from "next/image";
import Link from "next/link";

const PHONE_DISPLAY = "+244 930 595 145";
const WHATSAPP_URL = "https://wa.me/244930595145";

export default function RequestQuoteSuccessPage() {
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

          <Link
            href="/pt/request-quote/success"
            className="text-sm text-amber-400 hover:text-amber-300"
          >
            PT
          </Link>
        </div>
      </header>

      <section className="mx-auto flex max-w-3xl flex-col items-center px-8 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 text-3xl font-semibold text-stone-950">
          ✓
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.3em] text-amber-400">
          Request received
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Your quote request was submitted successfully.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
          Cafocolo will review your project details and contact you about the
          next steps. For urgent questions, you can also message us directly on
          WhatsApp.
        </p>

        <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900 p-6 text-left">
          <h2 className="text-lg font-semibold">What happens next?</h2>

          <div className="mt-5 space-y-4">
            <NextStep
              step="01"
              title="Your request enters the admin dashboard"
              description="Cafocolo can review your contact details, location, requested service, and project description."
            />
            <NextStep
              step="02"
              title="The project is evaluated"
              description="The team can decide whether more details, a site visit, or a quote is needed."
            />
            <NextStep
              step="03"
              title="Cafocolo contacts you"
              description="You will be contacted using the phone number or email you provided."
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
          >
            Message on WhatsApp
          </a>

          <Link
            href="/"
            className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-900"
          >
            Back to site
          </Link>
        </div>

        <p className="mt-6 text-sm text-stone-500">
          Phone / WhatsApp: {PHONE_DISPLAY}
        </p>
      </section>
    </main>
  );
}

function NextStep({
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