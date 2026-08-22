"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

type PublicQuoteReviewLocale = "en" | "pt";

type PublicQuoteLineItem = {
  itemName: string;
  description: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type PublicQuote = {
  projectName: string;
  customerName: string;
  title: string;
  description: string | null;
  estimatedLaborCost: number | null;
  estimatedMaterialCost: number | null;
  additionalCosts: number | null;
  totalAmount: number;
  status: string;
  validUntil: string | null;
  publicTokenExpiresAt: string | null;
  customerViewedAt: string | null;
  approvedAt: string | null;
  declinedAt: string | null;
  customerDecisionNote: string | null;
  lineItems: PublicQuoteLineItem[];
};

type PublicQuoteReviewPageProps = {
  token: string;
  locale?: PublicQuoteReviewLocale;
};

const copy = {
  en: {
    homeHref: "/",
    logoAlt: "Cafocolo LDA logo",
    languageHrefPrefix: "/pt/revisar-orcamento",
    languageLabel: "PT",
    backHome: "Back to site",
    eyebrow: "Quote Review",
    loading: "Loading quote...",
    quoteUnavailable: "Quote unavailable",
    retry: "Try again",
    customer: "Customer",
    project: "Project",
    validUntil: "Valid until",
    expiresAt: "Review link expires",
    viewedAt: "First viewed",
    total: "Total",
    description: "Description",
    lineItems: "Quote items",
    item: "Item",
    quantity: "Qty",
    unitPrice: "Unit price",
    lineTotal: "Total",
    noLineItems: "No line items have been added to this quote yet.",
    costSummary: "Cost summary",
    labor: "Labor",
    materials: "Materials",
    additional: "Additional",
    decision: "Your decision",
    noteLabel: "Optional note",
    notePlaceholder:
      "Add a note for Cafocolo, such as scheduling details or scope questions.",
    approve: "Approve quote",
    decline: "Decline quote",
    approving: "Approving...",
    declining: "Declining...",
    approvedTitle: "Quote approved",
    approvedDescription:
      "Thank you. Cafocolo has received your approval and can follow up with next steps.",
    declinedTitle: "Quote declined",
    declinedDescription:
      "Your response has been recorded. Cafocolo can review your note and follow up if needed.",
    expiredTitle: "Quote no longer active",
    expiredDescription:
      "This quote link is no longer active. Please contact Cafocolo for an updated quote.",
    alreadyDecided: "This quote already has a recorded customer decision.",
    fallbackError: "Something went wrong while loading the quote.",
    actionFallbackError: "Something went wrong while submitting your decision.",
  },
  pt: {
    homeHref: "/pt",
    logoAlt: "Logotipo da Cafocolo LDA",
    languageHrefPrefix: "/quote-review",
    languageLabel: "EN",
    backHome: "Voltar ao site",
    eyebrow: "Revisão do orçamento",
    loading: "Carregando orçamento...",
    quoteUnavailable: "Orçamento indisponível",
    retry: "Tentar novamente",
    customer: "Cliente",
    project: "Projeto",
    validUntil: "Válido até",
    expiresAt: "Link de revisão expira em",
    viewedAt: "Primeira visualização",
    total: "Total",
    description: "Descrição",
    lineItems: "Itens do orçamento",
    item: "Item",
    quantity: "Qtd.",
    unitPrice: "Preço unitário",
    lineTotal: "Total",
    noLineItems: "Ainda não foram adicionados itens a este orçamento.",
    costSummary: "Resumo de custos",
    labor: "Mão de obra",
    materials: "Materiais",
    additional: "Custos adicionais",
    decision: "A sua decisão",
    noteLabel: "Nota opcional",
    notePlaceholder:
      "Adicione uma nota para a Cafocolo, como detalhes de agendamento ou dúvidas sobre o escopo.",
    approve: "Aprovar orçamento",
    decline: "Recusar orçamento",
    approving: "Aprovando...",
    declining: "Recusando...",
    approvedTitle: "Orçamento aprovado",
    approvedDescription:
      "Obrigado. A Cafocolo recebeu a sua aprovação e poderá entrar em contato sobre os próximos passos.",
    declinedTitle: "Orçamento recusado",
    declinedDescription:
      "A sua resposta foi registrada. A Cafocolo poderá analisar a sua nota e entrar em contato, se necessário.",
    expiredTitle: "Orçamento não está mais ativo",
    expiredDescription:
      "Este link de orçamento não está mais ativo. Entre em contato com a Cafocolo para receber um orçamento atualizado.",
    alreadyDecided: "Este orçamento já tem uma decisão registrada pelo cliente.",
    fallbackError: "Ocorreu um erro ao carregar o orçamento.",
    actionFallbackError: "Ocorreu um erro ao enviar a sua decisão.",
  },
} as const;

export function PublicQuoteReviewPage({
  token,
  locale = "en",
}: PublicQuoteReviewPageProps) {
  const text = copy[locale];

  const [quote, setQuote] = useState<PublicQuote | null>(null);
  const [decisionNote, setDecisionNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionState, setActionState] = useState<"approve" | "decline" | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    loadQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function loadQuote() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const loadedQuote = await clientApiRequest<PublicQuote>(
        `/api/v1/public/quotes/${encodeURIComponent(token)}`,
      );

      setQuote(loadedQuote);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : text.fallbackError);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitDecision(decision: "approve" | "decline") {
    setActionState(decision);
    setActionErrorMessage(null);

    try {
      const updatedQuote = await clientApiRequest<PublicQuote>(
        `/api/v1/public/quotes/${encodeURIComponent(token)}/${decision}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerDecisionNote: decisionNote || null,
          }),
        },
      );

      setQuote(updatedQuote);
      setDecisionNote("");
    } catch (error) {
      setActionErrorMessage(
        error instanceof Error ? error.message : text.actionFallbackError,
      );
    } finally {
      setActionState(null);
    }
  }

  const languageHref = `${text.languageHrefPrefix}/${token}`;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <header className="border-b border-stone-800 bg-stone-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <Link href={text.homeHref} className="flex items-center gap-3">
            <span className="relative h-10 w-24 overflow-hidden rounded bg-white">
              <Image
                src="/brand/cafocolo-logo-transparent.png"
                alt={text.logoAlt}
                fill
                sizes="96px"
                className="object-contain"
              />
            </span>
            <span className="text-lg font-semibold">Cafocolo</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm text-stone-300">
            <Link href={text.homeHref} className="hover:text-white">
              {text.backHome}
            </Link>
            <Link
              href={languageHref}
              className="text-amber-400 hover:text-amber-300"
            >
              {text.languageLabel}
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-14">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
          {text.eyebrow}
        </p>

        {isLoading && (
          <div className="mt-8 rounded-3xl border border-stone-800 bg-stone-900 p-8">
            <p className="text-stone-300">{text.loading}</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="mt-8 rounded-3xl border border-red-900 bg-red-950/30 p-8">
            <h1 className="text-3xl font-semibold">{text.quoteUnavailable}</h1>
            <p className="mt-3 leading-7 text-red-200">{errorMessage}</p>
            <button
              type="button"
              onClick={loadQuote}
              className="mt-6 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300"
            >
              {text.retry}
            </button>
          </div>
        )}

        {!isLoading && quote && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-stone-800 bg-stone-900 p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <StatusBadge status={quote.status} locale={locale} />
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                      {quote.title}
                    </h1>
                    {quote.description && (
                      <p className="mt-4 leading-8 text-stone-300">
                        {quote.description}
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-stone-800 bg-stone-950 p-5 text-right">
                    <p className="text-sm text-stone-500">{text.total}</p>
                    <p className="mt-1 text-3xl font-semibold text-amber-400">
                      {formatMoney(quote.totalAmount, locale)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <InfoCard label={text.customer}>{quote.customerName}</InfoCard>
                  <InfoCard label={text.project}>{quote.projectName}</InfoCard>
                  <InfoCard label={text.validUntil}>
                    {formatDate(quote.validUntil, locale)}
                  </InfoCard>
                  <InfoCard label={text.expiresAt}>
                    {formatDateTime(quote.publicTokenExpiresAt, locale)}
                  </InfoCard>
                  {quote.customerViewedAt && (
                    <InfoCard label={text.viewedAt}>
                      {formatDateTime(quote.customerViewedAt, locale)}
                    </InfoCard>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-stone-800 bg-stone-900 p-8">
                <h2 className="text-2xl font-semibold">{text.lineItems}</h2>

                {quote.lineItems.length === 0 ? (
                  <p className="mt-4 text-stone-400">{text.noLineItems}</p>
                ) : (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                      <thead className="border-b border-stone-800 text-stone-400">
                        <tr>
                          <th className="py-3 pr-4 font-medium">{text.item}</th>
                          <th className="py-3 pr-4 font-medium">
                            {text.description}
                          </th>
                          <th className="py-3 pr-4 text-right font-medium">
                            {text.quantity}
                          </th>
                          <th className="py-3 pr-4 text-right font-medium">
                            {text.unitPrice}
                          </th>
                          <th className="py-3 text-right font-medium">
                            {text.lineTotal}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {quote.lineItems.map((item, index) => (
                          <tr
                            key={`${item.itemName}-${index}`}
                            className="border-b border-stone-800/70"
                          >
                            <td className="py-4 pr-4 font-medium text-stone-100">
                              {item.itemName}
                            </td>
                            <td className="py-4 pr-4 text-stone-400">
                              {item.description || "—"}
                            </td>
                            <td className="py-4 pr-4 text-right text-stone-300">
                              {item.quantity}
                            </td>
                            <td className="py-4 pr-4 text-right text-stone-300">
                              {formatMoney(item.unitPrice, locale)}
                            </td>
                            <td className="py-4 text-right font-semibold text-stone-100">
                              {formatMoney(item.lineTotal, locale)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-3xl border border-stone-800 bg-stone-900 p-8">
                <h2 className="text-2xl font-semibold">{text.costSummary}</h2>

                <div className="mt-6 space-y-4">
                  <SummaryRow
                    label={text.labor}
                    value={formatMoney(quote.estimatedLaborCost, locale)}
                  />
                  <SummaryRow
                    label={text.materials}
                    value={formatMoney(quote.estimatedMaterialCost, locale)}
                  />
                  <SummaryRow
                    label={text.additional}
                    value={formatMoney(quote.additionalCosts, locale)}
                  />
                  <div className="border-t border-stone-800 pt-4">
                    <SummaryRow
                      label={text.total}
                      value={formatMoney(quote.totalAmount, locale)}
                      strong
                    />
                  </div>
                </div>
              </div>

              <DecisionPanel
                quote={quote}
                locale={locale}
                decisionNote={decisionNote}
                actionState={actionState}
                actionErrorMessage={actionErrorMessage}
                onDecisionNoteChange={setDecisionNote}
                onApprove={() => submitDecision("approve")}
                onDecline={() => submitDecision("decline")}
              />
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function DecisionPanel({
  quote,
  locale,
  decisionNote,
  actionState,
  actionErrorMessage,
  onDecisionNoteChange,
  onApprove,
  onDecline,
}: {
  quote: PublicQuote;
  locale: PublicQuoteReviewLocale;
  decisionNote: string;
  actionState: "approve" | "decline" | null;
  actionErrorMessage: string | null;
  onDecisionNoteChange: (value: string) => void;
  onApprove: () => void;
  onDecline: () => void;
}) {
  const text = copy[locale];

  const isApproved = quote.status === "ACCEPTED";
  const isDeclined = quote.status === "DECLINED";
  const isExpired = quote.status === "EXPIRED";
  const isDecided = isApproved || isDeclined || isExpired;

  return (
    <div className="rounded-3xl border border-stone-800 bg-stone-900 p-8">
      <h2 className="text-2xl font-semibold">{text.decision}</h2>

      {isApproved && (
        <DecisionState
          title={text.approvedTitle}
          description={text.approvedDescription}
        />
      )}

      {isDeclined && (
        <DecisionState
          title={text.declinedTitle}
          description={text.declinedDescription}
        />
      )}

      {isExpired && (
        <DecisionState
          title={text.expiredTitle}
          description={text.expiredDescription}
        />
      )}

      {quote.customerDecisionNote && (
        <div className="mt-5 rounded-2xl border border-stone-800 bg-stone-950 p-4">
          <p className="text-sm text-stone-500">{text.noteLabel}</p>
          <p className="mt-2 leading-7 text-stone-300">
            {quote.customerDecisionNote}
          </p>
        </div>
      )}

      {!isDecided && (
        <div className="mt-6">
          <label className="block">
            <span className="text-sm text-stone-300">{text.noteLabel}</span>
            <textarea
              value={decisionNote}
              onChange={(event) => onDecisionNoteChange(event.target.value)}
              rows={5}
              maxLength={1000}
              className="mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-3 py-2 text-stone-50 outline-none transition placeholder:text-stone-600 focus:border-amber-400"
              placeholder={text.notePlaceholder}
            />
          </label>

          {actionErrorMessage && (
            <p className="mt-4 rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
              {actionErrorMessage}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={onApprove}
              disabled={actionState !== null}
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
            >
              {actionState === "approve" ? text.approving : text.approve}
            </button>

            <button
              type="button"
              onClick={onDecline}
              disabled={actionState !== null}
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-800 disabled:cursor-not-allowed disabled:border-stone-800 disabled:text-stone-600"
            >
              {actionState === "decline" ? text.declining : text.decline}
            </button>
          </div>
        </div>
      )}

      {isDecided && !isExpired && (
        <p className="mt-5 text-sm leading-6 text-stone-500">
          {text.alreadyDecided}
        </p>
      )}
    </div>
  );
}

function StatusBadge({
  status,
  locale,
}: {
  status: string;
  locale: PublicQuoteReviewLocale;
}) {
  const labels = {
    en: {
      DRAFT: "Draft",
      SENT: "Awaiting decision",
      ACCEPTED: "Approved",
      DECLINED: "Declined",
      EXPIRED: "Expired",
    },
    pt: {
      DRAFT: "Rascunho",
      SENT: "Aguardando decisão",
      ACCEPTED: "Aprovado",
      DECLINED: "Recusado",
      EXPIRED: "Expirado",
    },
  } as const;

  const label =
    labels[locale][status as keyof (typeof labels)[typeof locale]] || status;

  return (
    <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
      {label}
    </span>
  );
}

function InfoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-950 p-4">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 font-medium text-stone-100">{children || "—"}</p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-semibold" : "text-stone-400"}>
        {label}
      </span>
      <span className={strong ? "font-semibold text-amber-400" : "text-stone-200"}>
        {value}
      </span>
    </div>
  );
}

function DecisionState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-stone-800 bg-stone-950 p-5">
      <h3 className="font-semibold text-stone-100">{title}</h3>
      <p className="mt-2 leading-7 text-stone-400">{description}</p>
    </div>
  );
}

async function clientApiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      responseBody?.message || `API request failed with status ${response.status}`,
    );
  }

  return responseBody as T;
}

function formatMoney(value: number | null, locale: PublicQuoteReviewLocale) {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat(locale === "pt" ? "pt-AO" : "en-US", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string | null, locale: PublicQuoteReviewLocale) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale === "pt" ? "pt-AO" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatDateTime(value: string | null, locale: PublicQuoteReviewLocale) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale === "pt" ? "pt-AO" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}