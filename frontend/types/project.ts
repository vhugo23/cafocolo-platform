export type Project = {
  id: string;
  leadId: string;
  customerName: string;
  projectName: string;
  projectType: string;
  description: string | null;
  status: string;
  estimatedBudget: number | null;
  actualBudget: number | null;
  startDate: string | null;
  targetCompletionDate: string | null;
  completedDate: string | null;
  createdAt: string;
};