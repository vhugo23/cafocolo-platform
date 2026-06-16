import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Lead } from "@/types/lead";


export default async function HomePage() {
  const leads = await apiFetch<Lead[]>("/api/v1/leads");

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-neutral-400">
              Cafocolo Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Leads</h1>
            <p className="mt-2 text-neutral-400">
              Incoming customer requests from the Spring Boot backend.
            </p>
          </div>

          <Link
            href="/projects"
            className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            View Projects
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          <table className="w-full border-collapse text-left">
            <thead className="bg-neutral-800 text-sm text-neutral-300">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
    key={lead.id}
    className="border-t border-neutral-800 transition hover:bg-neutral-800/60"
  >
    <td className="px-4 py-3">
      <Link href={`/leads/${lead.id}`} className="font-medium hover:underline">
        {lead.customerName}
      </Link>
    </td>
    <td className="px-4 py-3">{lead.requestedService}</td>
    <td className="px-4 py-3">{lead.location ?? "—"}</td>
    <td className="px-4 py-3">
      <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs">
        {lead.status}
      </span>
    </td>
    <td className="px-4 py-3 text-neutral-400">
      {new Date(lead.createdAt).toLocaleDateString()}
    </td>
  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}