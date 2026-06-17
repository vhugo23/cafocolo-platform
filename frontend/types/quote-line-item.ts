export type QuoteLineItem = {
  id: string;
  quoteId: string;
  itemName: string;
  description: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  createdAt: string;
};