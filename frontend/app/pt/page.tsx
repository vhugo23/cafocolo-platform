import Image from "next/image";
import Link from "next/link";

const PHONE_DISPLAY = "+244 930 595 145";
const WHATSAPP_URL = "https://wa.me/244930595145";

type PublicItem = {
  title: string;
  description: string;
};

type PortfolioItem = {
  title: string;
  category: string;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

const servicesPt: PublicItem[] = [
  {
    title: "Mobiliário personalizado",
    description:
      "Armários embutidos, prateleiras, mesas, roupeiros e móveis feitos sob medida para casas e empresas.",
  },
  {
    title: "Construção e remodelação de interiores",
    description:
      "Construção interior, remodelações, melhorias de acabamento, atualização de ambientes e apoio em projetos práticos.",
  },
  {
    title: "Cozinhas e armazenamento",
    description:
      "Armários de cozinha, soluções de armazenamento, bancadas e melhorias funcionais para interiores.",
  },
];

const portfolioItemsPt: PortfolioItem[] = [
  {
    category: "Cozinha / Armários",
    location: "Luanda",
    title: "Instalação de armários de cozinha",
    description:
      "Trabalho de armários personalizados pensado para melhorar o armazenamento, a qualidade do acabamento e o uso diário da cozinha.",
    imageSrc: "/projects/kitchen-cabinet-installation.webp",
    imageAlt: "Instalação de armários de cozinha personalizados pela Cafocolo",
    highlights: [
      "Medidas personalizadas",
      "Layout focado em armazenamento",
      "Acabamento limpo dos armários",
    ],
  },
  {
    category: "Construção / Remodelação",
    location: "Luanda",
    title: "Remodelação de interiores",
    description:
      "Trabalho de construção e remodelação interior focado em acabamentos limpos, materiais duráveis e melhorias práticas de ambientes.",
    imageSrc: "/projects/interior-renovation.webp",
    imageAlt: "Projeto de remodelação de interiores pela Cafocolo",
    highlights: [
      "Melhorias de acabamento interior",
      "Atualização prática de ambientes",
      "Planeamento de materiais",
    ],
  },
  {
    category: "Mobiliário",
    location: "Luanda",
    title: "Mobiliário em madeira personalizado",
    description:
      "Peças de mobiliário feitas sob medida para o espaço do cliente, dimensões preferidas e necessidades do dia a dia.",
    imageSrc: "/projects/custom-wood-furniture.webp",
    imageAlt: "Projeto de mobiliário personalizado em madeira pela Cafocolo",
    highlights: [
      "Construção sob medida",
      "Design funcional",
      "Trabalho personalizado em madeira",
    ],
  },
];

const processStepsPt: ProcessStep[] = [
  {
    step: "01",
    title: "Pedir orçamento",
    description:
      "O cliente envia os dados básicos do projeto, localização e informações de contato.",
  },
  {
    step: "02",
    title: "Analisar a solicitação",
    description:
      "A Cafocolo analisa a solicitação, esclarece o escopo e define os próximos passos.",
  },
  {
    step: "03",
    title: "Preparar o orçamento",
    description:
      "O projeto é organizado em materiais, mão de obra e detalhes do orçamento.",
  },
  {
    step: "04",
    title: "Iniciar o trabalho",
    description:
      "Depois que o orçamento é aceito, o projeto pode avançar para planeamento e execução.",
  },
];

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
              Mobiliário personalizado, construção e remodelação de interiores.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              A Cafocolo ajuda clientes a planear, orçar e concluir projetos
              práticos de interiores, desde armários e móveis personalizados até
              construção, remodelações e melhorias de acabamento.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/pt/request-quote"
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

              <Link
                href="/"
                className="text-sm text-amber-400 hover:text-amber-300"
              >
                EN
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-700">
              <Image
                src="/projects/custom-cabinet-interior-finish.webp"
                alt="Projeto de armários personalizados e acabamento interior pela Cafocolo"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm uppercase tracking-wide text-stone-300">
                  Trabalho em destaque
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Projetos de armários personalizados e acabamentos interiores
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-200">
                  Trabalho real da Cafocolo com acabamentos interiores, armários
                  embutidos, iluminação e melhorias práticas de ambientes.
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
            description="O site público deixa claro quais tipos de projetos de construção, remodelação e mobiliário personalizado os visitantes podem solicitar."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {servicesPt.map((service) => (
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
            eyebrow="Portfólio"
            title="Seleção de trabalhos"
            description="Alguns exemplos de trabalhos da Cafocolo em armários, construção interior, remodelação e mobiliário personalizado."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {portfolioItemsPt.map((item) => (
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
                alt="Logotipo da Cafocolo LDA"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Sobre a Cafocolo
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Uma empresa familiar de construção e remodelação de interiores.
            </h2>

            <p className="mt-5 leading-8 text-stone-300">
              A Cafocolo é uma empresa familiar de construção e remodelação de
              interiores dedicada ao comércio e à prestação de serviços, guiada
              pelo profissionalismo, qualidade e compromisso com os seus
              clientes.
            </p>

            <p className="mt-4 leading-8 text-stone-300">
              A empresa trabalha com mobiliário feito sob medida, execução de
              projetos de construção civil, remodelação de interiores, armários,
              acabamentos e melhorias práticas para casas e empresas em Angola.
            </p>
          </div>
        </div>
      </section>

      <section id="meaning" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="rounded-3xl border border-stone-800 bg-stone-900 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Significado da marca
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              O que significa “Cafocolo”
            </h2>

            <div className="mt-6 grid gap-6 text-stone-300 md:grid-cols-2">
              <p className="leading-8">
                O nome Cafocolo tem raiz no Kimbundu. Carrega a ideia de um
                lugar escondido ou protegido — um espaço onde aquilo que tem
                valor é guardado, protegido e cuidado.
              </p>

              <p className="leading-8">
                Esse significado orienta a forma como pensamos os interiores.
                Uma casa não é apenas uma construção. É um lugar seguro para a
                família, o trabalho, o descanso e aquilo que as pessoas
                valorizam. A Cafocolo constrói e remodela espaços com esse
                sentido de proteção, função e cuidado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="border-b border-stone-800">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <SectionHeader
            eyebrow="Processo"
            title="Do pedido ao projeto"
            description="Isto reflete o fluxo do sistema: pedido de orçamento, análise da solicitação, criação do projeto, preparação do orçamento e itens detalhados."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {processStepsPt.map((step) => (
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
                Contato
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Pronto para conversar sobre um projeto?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-stone-300">
                Entre em contato com a Cafocolo pelo WhatsApp ou envie um pedido
                de orçamento com a sua localização, detalhes do projeto e tipo de
                trabalho desejado.
              </p>

              <div className="mt-6 space-y-2 text-sm text-stone-300">
                <p>
                  <span className="text-stone-500">Telefone / WhatsApp:</span>{" "}
                  {PHONE_DISPLAY}
                </p>
                <p>
                  <span className="text-stone-500">Área de atendimento:</span>{" "}
                  Angola
                </p>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-stone-500">
                Nota de privacidade: as informações enviadas pelo formulário de
                orçamento são usadas apenas para analisar o pedido do projeto e
                entrar em contato sobre os próximos passos.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-stone-950 hover:bg-amber-300"
              >
                Enviar mensagem no WhatsApp
              </a>

              <Link
                href="/pt/request-quote"
                className="rounded-full border border-stone-700 px-6 py-3 text-center text-sm font-semibold text-stone-200 hover:bg-stone-800"
              >
                Pedir orçamento
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
        <Link href="/pt" className="flex items-center gap-3">
          <span className="relative h-10 w-24 overflow-hidden rounded bg-white">
            <Image
              src="/brand/cafocolo-logo-transparent.png"
              alt="Logotipo da Cafocolo LDA"
              fill
              sizes="96px"
              className="object-contain"
            />
          </span>
          <span className="text-lg font-semibold">Cafocolo</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
          <a href="#services" className="hover:text-white">
            Serviços
          </a>
          <a href="#work" className="hover:text-white">
            Trabalhos
          </a>
          <a href="#about" className="hover:text-white">
            Sobre
          </a>
          <a href="#contact" className="hover:text-white">
            Contato
          </a>
          <Link href="/pt/request-quote" className="hover:text-white">
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
          href="/pt/request-quote"
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

function PublicFooter() {
  return (
    <footer className="px-8 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-stone-800 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">Cafocolo LDA</p>
          <p className="mt-2 text-sm text-stone-500">
            Mobiliário personalizado, construção e remodelação de interiores em
            Angola.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-stone-400">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <Link href="/pt/request-quote">Pedir orçamento</Link>
          <Link href="/pt/privacy">Privacidade</Link>
          <Link href="/">English</Link>
        </div>
      </div>
    </footer>
  );
}