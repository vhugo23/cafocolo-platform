import { AdminCustomerDetailPage } from "@/components/admin/AdminCustomerDetailPage";

type AdminCustomerDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminCustomerDetailRoute({
  params,
}: AdminCustomerDetailRouteProps) {
  const { id } = await params;

  return <AdminCustomerDetailPage id={id} />;
}