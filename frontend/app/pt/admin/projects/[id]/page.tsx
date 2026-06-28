import { AdminProjectDetailPage } from "@/components/admin/AdminProjectDetailPage";

type AdminProjectDetailRoutePtProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProjectDetailRoutePt({
  params,
}: AdminProjectDetailRoutePtProps) {
  const { id } = await params;

  return <AdminProjectDetailPage id={id} locale="pt" />;
}