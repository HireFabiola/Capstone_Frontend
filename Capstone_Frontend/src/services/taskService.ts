import apiClient from "../api/apiClients";
import type { Task } from "../types/Tasks";

// Function to fetch all tasks from the API. It makes a GET request to the "/tasks" endpoint and returns the data as an array of Task objects.
export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>("/tasks");
  return response.data;
};

// Function to create a new task by sending a POST request to the API with the task data. It takes a Partial<Task> object as input, which allows for flexibility in the fields that can be included when creating a task. The function returns the created Task object as returned by the API.
export const createTask = async (
  taskData: Partial<Task>
): Promise<Task> => {
  const response = await apiClient.post<Task>(
    "/tasks",
    taskData
  );

  return response.data;
};