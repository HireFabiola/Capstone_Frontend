import type { Inquiry } from "./Inquiry";

export interface Project {
  _id: string;
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  stage: "planning" | "development" | "review" | "complete";
  dueDate?: string;
  inquiryId?: string | Inquiry;
  owner: string;
  createdAt: string;
  updatedAt: string;
}
