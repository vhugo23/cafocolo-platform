import { PublicQuoteReviewPage } from "@/components/PublicQuoteReviewPage";

type QuoteReviewPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function QuoteReviewPage({ params }: QuoteReviewPageProps) {
  const { token } = await params;

  return <PublicQuoteReviewPage token={token} locale="en" />;
}