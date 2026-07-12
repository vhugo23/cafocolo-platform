import Image from "next/image";
import Link from "next/link";

const PHONE_DISPLAY = "+244 930 595 145";
const WHATSAPP_URL = "https://wa.me/244930595145";

export default function PrivacyPagePt() {
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
            <Link href="/pt" className="hover:text-white">
              Início
            </Link>
            <Link href="/pt/request-quote" className="hover:text-white">
              Pedir orçamento
            </Link>
            <Link href="/privacy" className="text-amber-400 hover:text-amber-300">
              EN
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-8 py-16">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
          Privacidade
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Política de Privacidade
        </h1>

        <p className="mt-5 leading-8 text-stone-300">
          Esta página explica como a Cafocolo trata as informações enviadas pelo
          formulário de pedido de orçamento neste website. O objetivo é simples:
          recolher apenas as informações necessárias para compreender o pedido do
          projeto e contactar o cliente sobre os próximos passos.
        </p>

        <div className="mt-10 space-y-8">
          <PrivacySection title="Informações que recolhemos">
            <p>
              Quando envia um pedido de orçamento, a Cafocolo pode recolher o
              seu nome completo, número de telefone, email, cidade, localização
              do projeto, serviço solicitado e descrição do projeto.
            </p>
          </PrivacySection>

          <PrivacySection title="Como usamos as informações">
            <p>
              A Cafocolo usa estas informações para analisar o pedido,
              compreender o tipo de trabalho necessário, contactar o cliente,
              preparar os próximos passos e organizar a solicitação no sistema
              administrativo.
            </p>
          </PrivacySection>

          <PrivacySection title="Como as informações são guardadas">
            <p>
              As informações do pedido de orçamento são guardadas na plataforma
              operacional da Cafocolo para que a empresa possa gerir
              solicitações, clientes, projetos, notas e orçamentos. O acesso é
              destinado apenas a administradores autorizados da Cafocolo.
            </p>
          </PrivacySection>

          <PrivacySection title="Notificações por email">
            <p>
              Quando um pedido de orçamento é enviado, o sistema pode enviar uma
              notificação interna por email para a Cafocolo, para que o pedido
              seja analisado mais rapidamente. Essa notificação pode incluir os
              detalhes enviados no formulário.
            </p>
          </PrivacySection>

          <PrivacySection title="O que não fazemos">
            <p>
              A Cafocolo não usa as informações do pedido de orçamento para
              campanhas de marketing sem relação com o pedido, não vende
              informações dos clientes e não partilha intencionalmente detalhes
              do projeto com terceiros não relacionados.
            </p>
          </PrivacySection>

          <PrivacySection title="Contato">
            <p>
              Para dúvidas sobre um pedido enviado ou para pedir atualização das
              suas informações de contato, fale com a Cafocolo por telefone ou
              WhatsApp através do número {PHONE_DISPLAY}.
            </p>
          </PrivacySection>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/pt/request-quote"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
          >
            Pedir orçamento
          </Link>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-900"
          >
            Enviar mensagem no WhatsApp
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