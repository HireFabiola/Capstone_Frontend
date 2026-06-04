// Import the configured API client for making HTTP requests to the backend API
import apiClient from "../api/apiClients";
import type { Project } from "../types/Project";

// Function to fetch all projects from the API. It makes a GET request to the "/projects" endpoint and returns the data as an array of Project objects.
export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>("/projects");
  return response.data;
};

// Function to create a new project by sending a POST request to the API with the project data. It takes a Partial<Project> object as input, which allows for flexibility in the fields that can be included when creating a project. The function returns the created Project object as returned by the API.
export const createProject = async (
  projectData: Partial<Project>
): Promise<Project> => {
  const response = await apiClient.post<Project>(
    "/projects",
    projectData
  );

  return response.data;
};

