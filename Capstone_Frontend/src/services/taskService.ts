// Import the apiClient for making HTTP requests and the Task type for type checking
import apiClient from "../api/apiClient";
import type { Task } from "../types/Task";

// Function to fetch all tasks from the API. It sends a GET request to the "/tasks" endpoint and returns an array of Task objects.
export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>("/tasks");
  return response.data;
};

//  Function to create a new task by sending a POST request to the "/tasks" endpoint with the task data. It takes a partial Task object as input and returns the created Task object from the response.
export const createTask = async (
  taskData: Partial<Task>
): Promise<Task> => {
  const response = await apiClient.post<Task>(
    "/tasks",
    taskData
  );

  return response.data;
};

//
export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<Task> => {
  const response = await apiClient.put<Task>(
    `/tasks/${id}`,
    updates
  );

  return response.data;
};

// Function to delete a task by its ID. It sends a DELETE request to the "/tasks/{id}" endpoint and returns the response data, which may contain a success message or the deleted task information.
export const deleteTask = async (id: string) => {
  const response = await apiClient.delete(
    `/tasks/${id}`
  );

  return response.data;
};