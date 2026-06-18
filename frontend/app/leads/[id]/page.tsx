import { redirect } from "next/navigation";

type LegacyLeadDetailRedirectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LegacyLeadDetailRedirectPage({
  params,
}: LegacyLeadDetailRedirectPageProps) {
  /*
   * Temporary compatibility route.
   * Lead detail pages now live under /admin/leads/[id].
   */
  const { id } = await params;

  redirect(`/admin/leads/${id}`);
}