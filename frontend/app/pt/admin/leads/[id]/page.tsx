import { AdminLeadDetailPage } from "@/components/admin/AdminLeadDetailPage";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminLeadDetailRoutePt({
  params,
}: LeadDetailPageProps) {
  const { id } = await params;

  return <AdminLeadDetailPage id={id} locale="pt" />;
}