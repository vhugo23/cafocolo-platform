import { PublicQuoteReviewPage } from "@/components/PublicQuoteReviewPage";

type QuoteReviewPagePtProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function QuoteReviewPagePt({
  params,
}: QuoteReviewPagePtProps) {
  const { token } = await params;

  return <PublicQuoteReviewPage token={token} locale="pt" />;
}