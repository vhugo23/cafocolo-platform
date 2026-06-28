import { AdminCustomerDetailPage } from "@/components/admin/AdminCustomerDetailPage";

type AdminCustomerDetailRoutePtProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminCustomerDetailRoutePt({
  params,
}: AdminCustomerDetailRoutePtProps) {
  const { id } = await params;

  return <AdminCustomerDetailPage id={id} locale="pt" />;
}