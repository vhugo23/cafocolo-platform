"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientApiPost } from "@/lib/client-api";
import type { Lead } from "@/types/lead";

type RequestQuoteFormLocale = "en" | "pt";

type RequestQuoteFormProps = {
  locale?: RequestQuoteFormLocale;
};

type RequestQuotePayload = {
  fullName: string;
  phoneNumber: string;
  email: string | null;
  city: string | null;
  requestedService: string;
  projectDescription: string | null;
  location: string | null;
};

const formCopy = {
  en: {
    eyebrow: "Project Details",
    title: "Request form",
    description:
      "Required fields are marked by the browser. Add as much detail as you can so the request is easier to review.",
    fullName: "Full Name",
    fullNamePlaceholder: "Customer name",
    phoneNumber: "Phone Number",
    phoneNumberPlaceholder: "+244 900 000 000",
    email: "Email",
    emailPlaceholder: "customer@example.com",
    city: "City",
    cityPlaceholder: "Luanda",
    requestedService: "Requested Service",
    requestedServicePlaceholder:
      "Kitchen cabinets, wardrobe, renovation, custom furniture...",
    projectLocation: "Project Location",
    projectLocationPlaceholder: "Luanda, Kilamba, Talatona...",
    projectDescription: "Project Description",
    projectDescriptionPlaceholder:
      "Describe what you want built, renovated, repaired, or improved.",
    fallbackError: "Failed to submit quote request.",
    submitting: "Submitting...",
    submit: "Submit Request",
  },
  pt: {
    eyebrow: "Detalhes do projeto",
    title: "Formulário de solicitação",
    description:
      "Os campos obrigatórios são marcados pelo navegador. Adicione o máximo de detalhes possível para facilitar a análise da solicitação.",
    fullName: "Nome completo",
    fullNamePlaceholder: "Nome do cliente",
    phoneNumber: "Número de telefone",
    phoneNumberPlaceholder: "+244 900 000 000",
    email: "Email",
    emailPlaceholder: "cliente@exemplo.com",
    city: "Cidade",
    cityPlaceholder: "Luanda",
    requestedService: "Serviço solicitado",
    requestedServicePlaceholder:
      "Armários de cozinha, roupeiro, remodelação, mobiliário personalizado...",
    projectLocation: "Local do projeto",
    projectLocationPlaceholder: "Luanda, Kilamba, Talatona...",
    projectDescription: "Descrição do projeto",
    projectDescriptionPlaceholder:
      "Descreva o que deseja construir, remodelar, reparar ou melhorar.",
    fallbackError: "Não foi possível enviar a solicitação de orçamento.",
    submitting: "Enviando...",
    submit: "Enviar solicitação",
  },
} as const;

/**
 * Public quote request form.
 *
 * Why this exists:
 * - This is the customer-facing entry point into the system.
 * - Submitting this form creates both a customer and a lead in the backend.
 * - The admin side can then review the lead and turn it into a project.
 *
 * Sprint 1 production-readiness update:
 * - After a successful submission, the user is redirected to a dedicated
 *   confirmation page instead of staying on the form.
 * - This gives the customer a clearer ending and better next-step guidance.
 */
export function RequestQuoteForm({ locale = "en" }: RequestQuoteFormProps) {
  const router = useRouter();
  const copy = formCopy[locale];

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [requestedService, setRequestedService] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [location, setLocation] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      /*
       * The backend handles the real intake workflow:
       * 1. Create or persist customer details.
       * 2. Create a new lead connected to that customer.
       * 3. Return the created lead so the frontend knows the request succeeded.
       */
      await clientApiPost<Lead, RequestQuotePayload>("/api/v1/leads", {
        fullName,
        phoneNumber,
        email: email || null,
        city: city || null,
        requestedService,
        projectDescription: projectDescription || null,
        location: location || null,
      });

      router.push(
        locale === "pt" ? "/pt/request-quote/success" : "/request-quote/success",
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : copy.fallbackError);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl md:p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
          {copy.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold">{copy.title}</h2>
        <p className="mt-2 text-sm leading-6 text-stone-400">
          {copy.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label={copy.fullName}>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className={inputClassName}
              placeholder={copy.fullNamePlaceholder}
            />
          </FormField>

          <FormField label={copy.phoneNumber}>
            <input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
              className={inputClassName}
              placeholder={copy.phoneNumberPlaceholder}
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label={copy.email}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
              placeholder={copy.emailPlaceholder}
            />
          </FormField>

          <FormField label={copy.city}>
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={inputClassName}
              placeholder={copy.cityPlaceholder}
            />
          </FormField>
        </div>

        <FormField label={copy.requestedService}>
          <input
            value={requestedService}
            onChange={(event) => setRequestedService(event.target.value)}
            required
            className={inputClassName}
            placeholder={copy.requestedServicePlaceholder}
          />
        </FormField>

        <FormField label={copy.projectLocation}>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={inputClassName}
            placeholder={copy.projectLocationPlaceholder}
          />
        </FormField>

        <FormField label={copy.projectDescription}>
          <textarea
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
            className={inputClassName}
            placeholder={copy.projectDescriptionPlaceholder}
            rows={5}
          />
        </FormField>

        {errorMessage && (
          <p className="rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-fit rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
        >
          {isSubmitting ? copy.submitting : copy.submit}
        </button>
      </form>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-stone-300">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClassName =
  "w-full rounded-xl border border-stone-700 bg-stone-950 px-3 py-2 text-stone-50 outline-none transition placeholder:text-stone-600 focus:border-amber-400";