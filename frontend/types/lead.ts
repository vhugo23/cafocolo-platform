export type Lead = {
  id: string;
  customerId: string;
  customerName: string;
  requestedService: string;
  projectDescription: string | null;
  location: string | null;
  status: string;
  source: string;
  createdAt: string;
};