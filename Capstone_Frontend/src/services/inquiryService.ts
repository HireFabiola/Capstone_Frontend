import apiClient from "../api/apiClient";
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

// DELETE an inquiry by ID
export const deleteInquiry = async (
  id: string
) => {
  const response = await apiClient.delete(
    `/inquiries/${id}`
  );

  return response.data;
};