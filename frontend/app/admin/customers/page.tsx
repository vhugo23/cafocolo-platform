import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Customer } from "@/types/customer";

export default async function AdminCustomersPage() {
  /*
   * Why this page exists:
   * Customers are part of the internal admin workflow.
   * Moving this route under /admin separates business operations from the public website.
   */
  const customers = await apiFetch<Customer[]>("/api/v1/customers");

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Cafocolo Admin"
          title="Customers"
          description="People who have submitted requests or have projects with the business."
        />

        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          <table className="w-full border-collapse text-left">
            <thead className="bg-neutral-800 text-sm text-neutral-300">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-neutral-800 transition hover:bg-neutral-800/60"
                >
                  <td className="px-4 py-3 font-medium">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="hover:underline"
                    >
                      {customer.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{customer.phoneNumber}</td>
                  <td className="px-4 py-3">{customer.email ?? "—"}</td>
                  <td className="px-4 py-3">{customer.city ?? "—"}</td>
                  <td className="px-4 py-3 text-neutral-400">
                    {formatDate(customer.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 && (
            <div className="p-6 text-neutral-400">No customers found.</div>
          )}
        </div>
      </section>
    </main>
  );
}