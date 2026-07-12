import Image from "next/image";
import Link from "next/link";
import {
  portfolioItems,
  processSteps,
  services,
  type PortfolioItem,
} from "@/lib/public-site-data";

const PHONE_DISPLAY = "+244 930 595 145";
const WHATSAPP_URL = "https://wa.me/244930595145";

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
              Custom furniture, construction, and interior remodeling.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              Cafocolo helps customers plan, estimate, and complete practical
              interior projects, from custom cabinets and furniture to
              construction, remodeling, and finish improvements.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/request-quote"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
              >
                Request a Quote
              </Link>

              <a
                href="#work"
                className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-900"
              >
                View Work
              </a>

              <Link
                href="/pt"
                className="text-sm text-amber-400 hover:text-amber-300"
              >
                PT
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-700">
              <Image
                src="/projects/custom-cabinet-interior-finish.webp"
                alt="Custom cabinet and interior finish project by Cafocolo"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm uppercase tracking-wide text-stone-300">
                  Featured Work
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Custom cabinet and interior finish projects
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-200">
                  Real Cafocolo work featuring custom interior finishes, built-in
                  cabinetry, lighting, and practical room upgrades.
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
            description="The public site makes it clear what types of construction, remodeling, and custom furniture projects visitors can request."
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
            description="A few examples of Cafocolo work across cabinets, interior construction, remodeling, and custom furniture."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-stone-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-8 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="rounded-3xl border border-stone-800 bg-white p-6">
            <div className="relative aspect-[16/9]">
              <Image
                src="/brand/cafocolo-logo-transparent.png"
                alt="Cafocolo LDA logo"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              About Cafocolo
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              A family-run construction and interior remodeling company.
            </h2>

            <p className="mt-5 leading-8 text-stone-300">
              Cafocolo is a family-run construction and interior remodeling
              company dedicated to trade and service provision, guided by
              professionalism, quality, and a commitment to its clients.
            </p>

            <p className="mt-4 leading-8 text-stone-300">
              The company works across custom-made furniture, civil construction
              project execution, interior remodeling, cabinets, finishes, and
              practical improvements for homes and businesses in Angola.
            </p>
          </div>
        </div>
      </section>

      <section id="meaning" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="rounded-3xl border border-stone-800 bg-stone-900 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Brand meaning
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              What “Cafocolo” means
            </h2>

            <div className="mt-6 grid gap-6 text-stone-300 md:grid-cols-2">
              <p className="leading-8">
                The name Cafocolo is rooted in Kimbundu. It carries the idea of
                a hidden or protected place — somewhere valuable things are kept,
                guarded, and cared for.
              </p>

              <p className="leading-8">
                That meaning shapes how we think about interiors. A home is not
                just a structure. It is a safe place for family, work, rest, and
                the things people value. Cafocolo builds and remodels spaces with
                that sense of protection, function, and care.
              </p>
            </div>
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

      <section id="contact" className="border-b border-stone-800 px-8 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-stone-800 bg-stone-900 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Ready to discuss a project?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-stone-300">
                Contact Cafocolo by WhatsApp or submit a quote request with your
                location, project details, and preferred type of work.
              </p>

              <div className="mt-6 space-y-2 text-sm text-stone-300">
                <p>
                  <span className="text-stone-500">Phone / WhatsApp:</span>{" "}
                  {PHONE_DISPLAY}
                </p>
                <p>
                  <span className="text-stone-500">Service area:</span> Angola
                </p>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-stone-500">
                Privacy note: information submitted through the quote request
                form is used only to review your project request and contact you
                about next steps.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-stone-950 hover:bg-amber-300"
              >
                Message on WhatsApp
              </a>

              <Link
                href="/request-quote"
                className="rounded-full border border-stone-700 px-6 py-3 text-center text-sm font-semibold text-stone-200 hover:bg-stone-800"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function PublicHeader() {
  return (
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
          <a href="#services" className="hover:text-white">
            Services
          </a>
          <a href="#work" className="hover:text-white">
            Work
          </a>
          <a href="#about" className="hover:text-white">
            About
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
          <Link href="/request-quote" className="hover:text-white">
            Request Quote
          </Link>
          <Link href="/pt" className="text-amber-400 hover:text-amber-300">
            PT
          </Link>
        </nav>
      </div>
    </header>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-300 hover:scale-105"
        />
      </div>

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

function PublicFooter() {
  return (
    <footer className="px-8 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-stone-800 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">Cafocolo LDA</p>
          <p className="mt-2 text-sm text-stone-500">
            Custom furniture, construction, and interior remodeling in Angola.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-stone-400">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <Link href="/request-quote">Request Quote</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/pt">Português</Link>
        </div>
      </div>
    </footer>
  );
}