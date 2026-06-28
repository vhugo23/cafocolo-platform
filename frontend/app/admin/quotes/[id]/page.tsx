import { AdminQuoteDetailPage } from "@/components/admin/AdminQuoteDetailPage";

type AdminQuoteDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminQuoteDetailRoute({
  params,
}: AdminQuoteDetailRouteProps) {
  const { id } = await params;

  return <AdminQuoteDetailPage id={id} locale="en" />;
}