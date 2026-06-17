export type ProjectNote = {
  id: string;
  projectId: string;
  noteText: string;
  createdBy: string | null;
  createdAt: string;
};