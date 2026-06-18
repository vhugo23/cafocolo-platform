"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import type { Lead } from "@/types/lead";

/**
 * Public quote request form.
 *
 * Why this exists:
 * - This is the customer-facing entry point into the system.
 * - Submitting this form creates both a customer and a lead in the backend.
 * - The admin side can then review the lead and turn it into a project.
 */
export function RequestQuoteForm() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [requestedService, setRequestedService] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [location, setLocation] = useState("");

  const [createdLead, setCreatedLead] = useState<Lead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);
    setCreatedLead(null);

    try {
      /*
       * The backend handles the real intake workflow:
       * 1. Create or persist customer details.
       * 2. Create a new lead connected to that customer.
       * 3. Return the created lead so the UI can confirm success.
       */
      const lead = await apiPost<Lead>("/api/v1/leads", {
        fullName,
        phoneNumber,
        email: email || null,
        city: city || null,
        requestedService,
        projectDescription: projectDescription || null,
        location: location || null,
      });

      setCreatedLead(lead);

      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setCity("");
      setRequestedService("");
      setProjectDescription("");
      setLocation("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit quote request."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl md:p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
          Project Details
        </p>
        <h2 className="mt-3 text-2xl font-semibold">Request form</h2>
        <p className="mt-2 text-sm leading-6 text-stone-400">
          Required fields are marked by the browser. Add as much detail as you
          can so the request is easier to review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Full Name">
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className={inputClassName}
              placeholder="Customer name"
            />
          </FormField>

          <FormField label="Phone Number">
            <input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
              className={inputClassName}
              placeholder="+244 900 000 000"
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Email">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
              placeholder="customer@example.com"
            />
          </FormField>

          <FormField label="City">
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={inputClassName}
              placeholder="Luanda"
            />
          </FormField>
        </div>

        <FormField label="Requested Service">
          <input
            value={requestedService}
            onChange={(event) => setRequestedService(event.target.value)}
            required
            className={inputClassName}
            placeholder="Kitchen cabinets, wardrobe, renovation, custom furniture..."
          />
        </FormField>

        <FormField label="Project Location">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={inputClassName}
            placeholder="Luanda, Kilamba, Talatona..."
          />
        </FormField>

        <FormField label="Project Description">
          <textarea
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
            className={inputClassName}
            placeholder="Describe what you want built, renovated, repaired, or improved."
            rows={5}
          />
        </FormField>

        {errorMessage && (
          <p className="rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        {createdLead && (
          <div className="rounded-xl border border-emerald-900 bg-emerald-950/40 p-4 text-sm text-emerald-300">
            <p className="font-medium">Request submitted successfully.</p>
            <p className="mt-1">
              Cafocolo received your request. Lead status: {createdLead.status}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-fit rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
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