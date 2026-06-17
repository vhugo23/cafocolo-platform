export type Quote = {
  id: string;
  projectId: string;
  projectName: string;
  customerName: string;
  title: string;
  description: string | null;
  estimatedLaborCost: number | null;
  estimatedMaterialCost: number | null;
  additionalCosts: number | null;
  totalAmount: number;
  status: string;
  validUntil: string | null;
  createdAt: string;
};