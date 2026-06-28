import { AdminQuoteDetailPage } from "@/components/admin/AdminQuoteDetailPage";

type AdminQuoteDetailRoutePtProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminQuoteDetailRoutePt({
  params,
}: AdminQuoteDetailRoutePtProps) {
  const { id } = await params;

  return <AdminQuoteDetailPage id={id} locale="pt" />;
}