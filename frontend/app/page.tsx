import Link from "next/link";
import {
  portfolioItems,
  processSteps,
  services,
  type PortfolioItem,
} from "@/lib/public-site-data";

export default function PublicSitePage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <PublicHeader />

      <section className="border-b border-stone-800">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Cafocolo
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
              Custom furniture, renovation, and interior construction work.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              Cafocolo helps customers plan, estimate, and complete practical
              interior projects, from custom cabinets and furniture to renovation
              work and finish improvements.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-quote"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
              >
                Request a Quote
              </Link>

            <Link href="/pt" className="text-amber-400 hover:text-amber-300">
              PT
            </Link>  

              <a
                href="#work"
                className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-900"
              >
                View Work
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl">
            <div className="aspect-[4/3] rounded-2xl border border-stone-700 bg-gradient-to-br from-stone-800 to-stone-950 p-6">
              <div className="flex h-full flex-col justify-end">
                <p className="text-sm uppercase tracking-wide text-stone-400">
                  Featured Work
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Custom cabinet and interior finish projects
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  This area is prepared for real Cafocolo project images,
                  before-and-after photos, and completed work examples.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <SectionHeader
            eyebrow="Services"
            title="Work Cafocolo can help with"
            description="The public site makes it clear what types of projects visitors can request."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-6"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-stone-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected work showcase"
            description="These cards are now data-driven and ready to be connected to real Cafocolo photos and project case studies."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <SectionHeader
            eyebrow="Process"
            title="From request to project"
            description="This mirrors the backend workflow: quote request, lead review, project creation, quote, and line items."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-6"
              >
                <p className="text-sm font-semibold text-amber-400">
                  {step.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-stone-800 bg-stone-900 p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
                Start a project
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Tell Cafocolo what you want to build or renovate.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-stone-300">
                Submit a quote request with your contact information, location,
                and project details. The request will appear in the admin
                dashboard as a new lead.
              </p>
            </div>

            <Link
              href="/request-quote"
              className="rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-stone-950 hover:bg-amber-300"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PublicHeader() {
  return (
    <header className="border-b border-stone-800 bg-stone-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <Link href="/site" className="text-lg font-semibold">
          Cafocolo
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
          <a href="#services" className="hover:text-white">
            Services
          </a>
          <a href="#work" className="hover:text-white">
            Work
          </a>
          <a href="#process" className="hover:text-white">
            Process
          </a>
          <Link href="/request-quote" className="hover:text-white">
            Request Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900">
      <div
        role="img"
        aria-label={item.imageAlt}
        className="aspect-[4/3] bg-gradient-to-br from-stone-800 to-stone-950"
      />

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-amber-400">{item.category}</p>
          <p className="text-xs text-stone-500">{item.location}</p>
        </div>

        <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>

        <p className="mt-3 leading-7 text-stone-300">{item.description}</p>

        <ul className="mt-4 space-y-2">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-sm text-stone-300">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/request-quote"
          className="mt-5 inline-flex text-sm font-semibold text-amber-400 hover:text-amber-300"
        >
          Request similar work →
        </Link>
      </div>
    </article>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-stone-300">{description}</p>
    </div>
  );
}