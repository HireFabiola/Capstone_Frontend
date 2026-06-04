// Importing necessary modules and types for the project service functions, including the API client for making HTTP requests and the Project type definition for type checking.
import apiClient from "../api/apiClient"; 
import type { Project } from "../types/Project";

// Function to fetch all projects from the API. It sends a GET request to the "/projects" endpoint and returns the data as an array of Project objects.
export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>("/projects");
  return response.data;
};

// Function to fetch a single project by its ID from the API. It sends a GET request to the "/projects/{id}" endpoint and returns the data as a Project object.
export const createProject = async (
  projectData: Partial<Project>
): Promise<Project> => {
  const response = await apiClient.post<Project>(
    "/projects",
    projectData
  );

  return response.data;
};

// Function to update an existing project by its ID. It takes the project ID and a partial object containing the fields to be updated, sends a PUT request to the "/projects/{id}" endpoint, and returns the updated Project object.
export const updateProject = async (
  id: string,
  updates: Partial<Project>
): Promise<Project> => {
  const response = await apiClient.put<Project>(
    `/projects/${id}`,
    updates
  );

  return response.data;
};

// Function to delete a project by its ID. It sends a DELETE request to the "/projects/{id}" endpoint and returns the response data, which may contain a success message or the deleted project information.
export const deleteProject = async (id: string) => {
  const response = await apiClient.delete(
    `/projects/${id}`
  );

  return response.data;
};