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
        error instanceof Error ? error.message : "Failed to submit quote request"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-400">Full Name</label>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
              placeholder="Customer name"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400">Phone Number</label>
            <input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
              placeholder="+244 900 000 000"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
              placeholder="customer@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400">City</label>
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
              placeholder="Luanda"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-neutral-400">Requested Service</label>
          <input
            value={requestedService}
            onChange={(event) => setRequestedService(event.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            placeholder="Planned kitchen, wardrobe, renovation, custom cabinet..."
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Project Location</label>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            placeholder="Luanda"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400">Project Description</label>
          <textarea
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white outline-none focus:border-neutral-500"
            placeholder="Describe what the customer wants built or renovated."
            rows={5}
          />
        </div>

        {errorMessage && (
          <p className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        {createdLead && (
          <p className="rounded-lg border border-green-900 bg-green-950/40 p-3 text-sm text-green-300">
            Request submitted successfully. Lead status: {createdLead.status}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}