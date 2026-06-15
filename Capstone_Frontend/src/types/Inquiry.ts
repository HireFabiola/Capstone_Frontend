export interface Inquiry {
  _id: string;
  clientName: string;
  email: string;
  businessName?: string;
  projectType: string;
  message: string;
  budgetRange: string;
  status: "new" | "discussion" | "qualified" | "closed";
  createdAt: string;
  updatedAt: string;
}
