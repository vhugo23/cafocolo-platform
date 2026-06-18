import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer } from "@/types/customer";
import type { Lead } from "@/types/lead";
import type { Project } from "@/types/project";

type CustomerDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;

  const [customer, leads, projects] = await Promise.all([
    apiFetch<Customer>(`/api/v1/customers/${id}`),
    apiFetch<Lead[]>(`/api/v1/customers/${id}/leads`),
    apiFetch<Project[]>(`/api/v1/customers/${id}/projects`),
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/customers"
            className="text-sm text-neutral-400 hover:text-white"
          >
            ← Back to customers
          </Link>

          <p className="mt-6 text-sm uppercase tracking-wide text-neutral-400">
            Customer Detail
          </p>

          <h1 className="mt-2 text-3xl font-semibold">{customer.fullName}</h1>

          <p className="mt-2 text-neutral-400">
            Customer profile, submitted leads, and related projects.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <DetailItem label="Full Name" value={customer.fullName} />
            <DetailItem label="Phone Number" value={customer.phoneNumber} />
            <DetailItem label="Email" value={customer.email ?? "—"} />
            <DetailItem label="City" value={customer.city ?? "—"} />
            <DetailItem label="Created" value={formatDate(customer.createdAt)} />
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Customer Leads</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Requests submitted by this customer.
            </p>
          </div>

          {leads.length === 0 ? (
            <p className="text-neutral-400">No leads found for this customer.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="hover:underline"
                        >
                          {lead.requestedService}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{lead.location ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-400">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Customer Projects</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Projects connected to this customer.
            </p>
          </div>

          {projects.length === 0 ? (
            <p className="text-neutral-400">
              No projects found for this customer.
            </p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-left">
                <thead className="bg-neutral-800 text-sm text-neutral-300">
                  <tr>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Budget</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Target Date</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-t border-neutral-800">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/projects/${project.id}`}
                          className="hover:underline"
                        >
                          {project.projectName}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{project.projectType}</td>
                      <td className="px-4 py-3">
                        {formatCurrency(project.estimatedBudget)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-neutral-700 px-3 py-1 text-xs">
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-400">
                        {formatDate(project.targetCompletionDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 font-medium text-neutral-100">{value}</p>
    </div>
  );
}