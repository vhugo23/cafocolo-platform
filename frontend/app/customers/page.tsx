import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Customer } from "@/types/customer";

export default async function CustomersPage() {
  const customers = await apiFetch<Customer[]>("/api/v1/customers");

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-neutral-400">
            Cafocolo Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Customers</h1>
          <p className="mt-2 text-neutral-400">
            People who have submitted requests or have projects with the business.
          </p>
        </div>

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
                      href={`/customers/${customer.id}`}
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