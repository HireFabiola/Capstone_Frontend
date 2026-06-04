export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "complete";
  dueDate?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}