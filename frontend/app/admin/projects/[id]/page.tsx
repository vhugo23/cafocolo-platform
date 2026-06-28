import { AdminProjectDetailPage } from "@/components/admin/AdminProjectDetailPage";

type AdminProjectDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProjectDetailRoute({
  params,
}: AdminProjectDetailRouteProps) {
  const { id } = await params;

  return <AdminProjectDetailPage id={id} locale="en" />;
}