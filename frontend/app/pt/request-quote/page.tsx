import Image from "next/image";
import Link from "next/link";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";

export default function RequestQuotePagePt() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
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
            <Link href="/pt#services" className="hover:text-white">
              Serviços
            </Link>
            <Link href="/pt#work" className="hover:text-white">
              Trabalhos
            </Link>
            <Link href="/pt#about" className="hover:text-white">
              Sobre
            </Link>
            <Link href="/pt#contact" className="hover:text-white">
              Contato
            </Link>
            <Link href="/pt/request-quote" className="text-amber-400">
              Pedir orçamento
            </Link>
            <Link href="/request-quote" className="hover:text-white">
              EN
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-8 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Link
            href="/pt"
            className="text-sm text-stone-400 hover:text-stone-100"
          >
            ← Voltar ao site da Cafocolo
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-amber-400">
            Pedir orçamento
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Conte à Cafocolo sobre o seu projeto.
          </h1>

          <p className="mt-5 max-w-xl leading-7 text-stone-300">
            Compartilhe suas informações de contato, localização e uma breve
            descrição do trabalho que deseja realizar. A Cafocolo irá analisar a
            solicitação e preparar os próximos passos.
          </p>

          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-lg font-semibold">
              O que acontece depois do envio?
            </h2>

            <div className="mt-5 space-y-4">
              <ProcessNote
                step="01"
                title="A solicitação é recebida"
                description="O sistema cria o registro do cliente e uma nova solicitação para a Cafocolo analisar."
              />
              <ProcessNote
                step="02"
                title="O projeto é analisado"
                description="A Cafocolo pode verificar o tipo de serviço, a localização e os detalhes do projeto."
              />
              <ProcessNote
                step="03"
                title="Um orçamento pode ser preparado"
                description="Se a solicitação fizer sentido, a Cafocolo pode transformá-la em projeto e criar um orçamento."
              />
            </div>
          </div>
        </div>

        <RequestQuoteForm locale="pt" />
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