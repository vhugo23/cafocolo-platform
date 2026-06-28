import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import {
  getAdminPath,
  type AdminLocale,
} from "@/lib/admin-i18n";
import type { Customer } from "@/types/customer";

type AdminCustomersPageProps = {
  locale: AdminLocale;
};

const copy = {
  en: {
    eyebrow: "Cafocolo Admin",
    title: "Customers",
    description:
      "People who have submitted requests or have projects with the business.",
    customer: "Customer",
    phone: "Phone",
    email: "Email",
    city: "City",
    created: "Created",
    empty: "No customers found.",
    fallback: "—",
  },
  pt: {
    eyebrow: "Administração Cafocolo",
    title: "Clientes",
    description:
      "Pessoas que enviaram solicitações ou têm projetos com o negócio.",
    customer: "Cliente",
    phone: "Telefone",
    email: "Email",
    city: "Cidade",
    created: "Criado em",
    empty: "Nenhum cliente encontrado.",
    fallback: "—",
  },
} as const;

export async function AdminCustomersPage({ locale }: AdminCustomersPageProps) {
  const customers = await apiFetch<Customer[]>("/api/v1/customers");
  const text = copy[locale];

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow={text.eyebrow}
          title={text.title}
          description={text.description}
        />

        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          <table className="w-full border-collapse text-left">
            <thead className="bg-neutral-800 text-sm text-neutral-300">
              <tr>
                <th className="px-4 py-3">{text.customer}</th>
                <th className="px-4 py-3">{text.phone}</th>
                <th className="px-4 py-3">{text.email}</th>
                <th className="px-4 py-3">{text.city}</th>
                <th className="px-4 py-3">{text.created}</th>
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
                      href={getAdminPath(
                        locale,
                        `/admin/customers/${customer.id}`
                      )}
                      className="hover:underline"
                    >
                      {customer.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{customer.phoneNumber}</td>
                  <td className="px-4 py-3">
                    {customer.email ?? text.fallback}
                  </td>
                  <td className="px-4 py-3">
                    {customer.city ?? text.fallback}
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {formatDate(customer.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 && (
            <div className="p-6 text-neutral-400">{text.empty}</div>
          )}
        </div>
      </section>
    </main>
  );
}