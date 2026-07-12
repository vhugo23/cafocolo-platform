import Image from "next/image";
import Link from "next/link";

const PHONE_DISPLAY = "+244 930 595 145";
const WHATSAPP_URL = "https://wa.me/244930595145";

export default function PrivacyPage() {
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
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/request-quote" className="hover:text-white">
              Request Quote
            </Link>
            <Link href="/pt/privacy" className="text-amber-400 hover:text-amber-300">
              PT
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-8 py-16">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
          Privacy
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-5 leading-8 text-stone-300">
          This page explains how Cafocolo handles information submitted through
          the quote request form on this website. The goal is simple: collect
          only the information needed to understand a project request and contact
          the customer about next steps.
        </p>

        <div className="mt-10 space-y-8">
          <PrivacySection title="Information we collect">
            <p>
              When you submit a quote request, Cafocolo may collect your full
              name, phone number, email address, city, project location,
              requested service, and project description.
            </p>
          </PrivacySection>

          <PrivacySection title="How we use the information">
            <p>
              Cafocolo uses this information to review your request, understand
              the type of work needed, contact you about the project, prepare
              next steps, and organize the request inside the admin system.
            </p>
          </PrivacySection>

          <PrivacySection title="How the information is stored">
            <p>
              Quote request information is stored in the Cafocolo operations
              platform so the business can manage leads, customers, projects,
              notes, and quotes. Access is intended for authorized Cafocolo
              administrators only.
            </p>
          </PrivacySection>

          <PrivacySection title="Email notifications">
            <p>
              When a quote request is submitted, the system may send an internal
              email notification to Cafocolo so the request can be reviewed
              sooner. The notification may include the details submitted in the
              quote request form.
            </p>
          </PrivacySection>

          <PrivacySection title="What we do not do">
            <p>
              Cafocolo does not use quote request information for unrelated
              marketing campaigns, does not sell submitted customer information,
              and does not intentionally share project request details with
              unrelated third parties.
            </p>
          </PrivacySection>

          <PrivacySection title="Contact">
            <p>
              For questions about a submitted request or to ask Cafocolo to
              update your contact information, contact us by phone or WhatsApp at{" "}
              {PHONE_DISPLAY}.
            </p>
          </PrivacySection>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/request-quote"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
          >
            Request a Quote
          </Link>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-900"
          >
            Message on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

function PrivacySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 leading-7 text-stone-300">{children}</div>
    </section>
  );
}