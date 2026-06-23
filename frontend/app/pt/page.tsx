import Link from "next/link";
import {
  portfolioItems,
  processSteps,
  services,
  type PortfolioItem,
} from "@/lib/public-site-data";

export default function PublicSitePagePt() {
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
              Mobiliário personalizado, remodelação e construção de interiores.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              A Cafocolo ajuda clientes a planejar, orçar e concluir projetos
              práticos de interiores, desde armários e móveis personalizados até
              remodelações e melhorias de acabamento.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-quote"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
              >
                Pedir orçamento
              </Link>

              <a
                href="#work"
                className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-900"
              >
                Ver trabalhos
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl">
            <div className="aspect-[4/3] rounded-2xl border border-stone-700 bg-gradient-to-br from-stone-800 to-stone-950 p-6">
              <div className="flex h-full flex-col justify-end">
                <p className="text-sm uppercase tracking-wide text-stone-400">
                  Trabalho em destaque
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Projetos de armários personalizados e acabamentos interiores
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  Esta área está preparada para imagens reais dos projetos da
                  Cafocolo, fotos de antes e depois, e exemplos de trabalhos
                  finalizados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <SectionHeader
            eyebrow="Serviços"
            title="Trabalhos em que a Cafocolo pode ajudar"
            description="O site público deixa claro quais tipos de projetos os visitantes podem solicitar."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-6"
              >
                <h3 className="text-xl font-semibold">
                  {translateServiceTitle(service.title)}
                </h3>
                <p className="mt-3 leading-7 text-stone-300">
                  {translateServiceDescription(service.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <SectionHeader
            eyebrow="Portfólio"
            title="Seleção de trabalhos"
            description="Estes cards são baseados em dados e estão prontos para serem conectados a fotos reais da Cafocolo e estudos de caso dos projetos."
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
            eyebrow="Processo"
            title="Do pedido ao projeto"
            description="Isto reflete o fluxo do sistema: pedido de orçamento, análise da solicitação, criação do projeto, orçamento e itens detalhados."
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
                <h3 className="mt-3 text-lg font-semibold">
                  {translateProcessTitle(step.title)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {translateProcessDescription(step.description)}
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
                Iniciar um projeto
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Conte à Cafocolo o que você quer construir ou remodelar.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-stone-300">
                Envie um pedido de orçamento com suas informações de contato,
                localização e detalhes do projeto. A solicitação aparecerá no painel
                administrativo como um novo lead.
              </p>
            </div>

            <Link
              href="/request-quote"
              className="rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-stone-950 hover:bg-amber-300"
            >
              Pedir orçamento
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
        <Link href="/pt" className="text-lg font-semibold">
          Cafocolo
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
          <a href="#services" className="hover:text-white">
            Serviços
          </a>
          <a href="#work" className="hover:text-white">
            Trabalhos
          </a>
          <a href="#process" className="hover:text-white">
            Processo
          </a>
          <Link href="/request-quote" className="hover:text-white">
            Pedir orçamento
          </Link>
          <Link href="/" className="text-amber-400 hover:text-amber-300">
            EN
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
          <p className="text-sm text-amber-400">
            {translatePortfolioCategory(item.category)}
          </p>
          <p className="text-xs text-stone-500">{item.location}</p>
        </div>

        <h3 className="mt-2 text-xl font-semibold">
          {translatePortfolioTitle(item.title)}
        </h3>

        <p className="mt-3 leading-7 text-stone-300">
          {translatePortfolioDescription(item.description)}
        </p>

        <ul className="mt-4 space-y-2">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-sm text-stone-300">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>{translatePortfolioHighlight(highlight)}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/request-quote"
          className="mt-5 inline-flex text-sm font-semibold text-amber-400 hover:text-amber-300"
        >
          Pedir trabalho semelhante →
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

function translateServiceTitle(value: string) {
  const translations: Record<string, string> = {
    "Custom cabinets and storage": "Armários personalizados e armazenamento",
    "Interior renovation": "Remodelação de interiores",
    "Furniture and finish work": "Móveis e acabamentos",
  };

  return translations[value] ?? value;
}

function translateServiceDescription(value: string) {
  const translations: Record<string, string> = {
    "Cabinets, wardrobes, shelving, storage units, and built-ins for practical interior spaces.":
      "Armários, roupeiros, prateleiras, unidades de armazenamento e móveis embutidos para espaços interiores funcionais.",
    "Room updates, finish improvements, repair coordination, and practical remodeling work.":
      "Atualizações de ambientes, melhorias de acabamento, coordenação de reparos e trabalhos práticos de remodelação.",
    "Custom furniture pieces, installation support, finishing details, and project-specific improvements.":
      "Peças de mobiliário personalizado, apoio na instalação, detalhes de acabamento e melhorias específicas para cada projeto.",
  };

  return translations[value] ?? value;
}

function translateProcessTitle(value: string) {
  const translations: Record<string, string> = {
    "Request received": "Pedido recebido",
    "Lead reviewed": "Solicitação analisada",
    "Project created": "Projeto criado",
    "Quote prepared": "Orçamento preparado",
  };

  return translations[value] ?? value;
}

function translateProcessDescription(value: string) {
  const translations: Record<string, string> = {
    "A visitor submits a request through the public quote form.":
      "O visitante envia um pedido através do formulário público de orçamento.",
    "The admin reviews the request, customer information, and project description.":
      "O administrador analisa o pedido, as informações do cliente e a descrição do projeto.",
    "If the lead is a good fit, the admin creates a project to track work.":
      "Se a solicitação sentido, o administrador cria um projeto para acompanhar o trabalho.",
    "The admin creates a quote with itemized line items and recalculated totals.":
      "O administrador cria um orçamento com itens detalhados e totais recalculados.",
  };

  return translations[value] ?? value;
}

function translatePortfolioCategory(value: string) {
  const translations: Record<string, string> = {
    Cabinetry: "Armários",
    Renovation: "Remodelação",
    Furniture: "Mobiliário",
  };

  return translations[value] ?? value;
}

function translatePortfolioTitle(value: string) {
  const translations: Record<string, string> = {
    "Custom cabinet and interior finish projects":
      "Projetos de armários personalizados e acabamentos interiores",
    "Renovation and repair coordination":
      "Coordenação de remodelações e reparos",
    "Custom furniture and functional pieces":
      "Mobiliário personalizado e peças funcionais",
  };

  return translations[value] ?? value;
}

function translatePortfolioDescription(value: string) {
  const translations: Record<string, string> = {
    "Prepared for before-and-after project photos, installed cabinet work, and interior finish examples.":
      "Preparado para fotos de antes e depois, trabalhos de armários instalados e exemplos de acabamentos interiores.",
    "Prepared for renovation progress, repair documentation, and completed room updates.":
      "Preparado para progresso de remodelações, documentação de reparos e atualizações de ambientes concluídas.",
    "Prepared for custom furniture builds, installation photos, and practical interior improvements.":
      "Preparado para móveis personalizados, fotos de instalação e melhorias práticas de interiores.",
  };

  return translations[value] ?? value;
}

function translatePortfolioHighlight(value: string) {
  const translations: Record<string, string> = {
    "Custom sizing": "Medidas personalizadas",
    "Interior finish detail": "Detalhes de acabamento interior",
    "Ready for real photos": "Pronto para fotos reais",
    "Project tracking": "Acompanhamento do projeto",
    "Repair notes": "Notas de reparo",
    "Before-and-after support": "Suporte para antes e depois",
    "Functional design": "Design funcional",
    "Installation support": "Apoio na instalação",
    "Finish improvements": "Melhorias de acabamento",
  };

  return translations[value] ?? value;
}