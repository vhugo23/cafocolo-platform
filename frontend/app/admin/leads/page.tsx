import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Lead } from "@/types/lead";

export default async function AdminLeadsPage() {
  /*
   * Why this page exists:
   * Leads are part of the internal business workflow.
   * Moving them under /admin separates private operations from the public site.
   */
  const leads = await apiFetch<Lead[]>("/api/v1/leads");

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Cafocolo Admin"
          title="Leads"
          description="Incoming customer requests from the public quote form and backend API."
          actions={
            <Link
              href="/admin/projects"
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
            >
              View Projects
            </Link>
          }
        />

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
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-medium hover:underline"
                    >
                      {lead.customerName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{lead.requestedService}</td>
                  <td className="px-4 py-3">{lead.location ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div className="p-6 text-neutral-400">No leads found.</div>
          )}
        </div>
      </section>
    </main>
  );
}