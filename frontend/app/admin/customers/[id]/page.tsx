import { redirect } from "next/navigation";

type LegacyCustomerDetailRedirectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LegacyCustomerDetailRedirectPage({
  params,
}: LegacyCustomerDetailRedirectPageProps) {
  /*
   * Temporary compatibility route.
   * Customer detail pages now live under /admin/customers/[id].
   */
  const { id } = await params;

  redirect(`/admin/customers/${id}`);
}