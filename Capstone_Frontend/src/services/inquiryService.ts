import apiClient from "../api/apiClients";
import type { Inquiry } from "../types/Inquiry";

// GET all inquiries
export const getInquiries = async (): Promise<
    Inquiry[]
> => {
    const response =
        await apiClient.get<Inquiry[]>(
            "/inquiries"
        );

    return response.data;
}; 

// GET a single inquiry by ID
export const updateInquiry = async (
  id: string,
  updates: Partial<Inquiry>
): Promise<Inquiry> => {
  const response = await apiClient.put<Inquiry>(
    `/inquiries/${id}`,
    updates
  );

  return response.data;
};