// Import necessary dependencies and services for managing tasks and projects, as well as custom hooks for CRUD operations and form handling.
import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import { getProjects } from "../services/projectService";

import type { Task } from "../types/Task";
import type { Project } from "../types/Project";

import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";

// TasksPage component to display a list of tasks in the admin dashboard
const TasksPage = () => {
  const {
    items: tasks,
    isLoading,
    error,
    setError,
    addItem,
    editItem,
    removeItem,
  } = useCrud<Task>({
    getItems: getTasks,
    createItem: createTask,
    updateItem: updateTask,
    deleteItem: deleteTask,
  });

  // State variable to manage the list of projects, which is used to associate tasks with specific projects when creating or updating tasks. It is populated by fetching the projects from the API when the component mounts.
  const [projects, setProjects] = useState<Project[]>([]);

  // State variable to manage the form data for creating a new task, including title, description, status, and associated project ID. It uses the useForm custom hook to handle form state and input changes.
  const { formData, handleChange, resetForm } = useForm({
    title: "",
    description: "",
    status: "todo" as Task["status"],
    projectId: "",
  });

  // useEffect hook to fetch projects from the API when the component mounts. It calls the getProjects service function, updates the state with the retrieved projects, and handles any errors that may occur during the fetch process.
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch {
        setError("Unable to load projects.");
      }
    };

    fetchProjects();
  }, [setError]);

  // Function to handle the submission of the form for creating a new task. It calls the addItem function from the useCrud hook to create a new task with the form data, and resets the form after successful creation. If there is an error during task creation, it sets an error message in the state.
  const handleCreateTask = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await addItem(formData);
      resetForm();
    } catch {
      setError("Unable to create task.");
    }
  };

  // Function to handle changes in the task status for a specific task. It calls the editItem function from the useCrud hook to update the task's status, and sets an error message if there is an issue during the update process.
  const handleStatusChange = async (
    id: string,
    status: Task["status"]
  ) => {
    try {
      await editItem(id, { status });
    } catch {
      setError("Unable to update task status.");
    }
  };

  // Function to handle the deletion of a task. It calls the removeItem function from the useCrud hook to delete the task, and sets an error message if there is an issue during the deletion process.
  const handleDeleteTask = async (id: string) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete task.");
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;

  if (error) return <p>{error}</p>;

  // Conditional rendering based on the loading state and error state. If the data is still loading, it displays a loading message. If there is an error, it displays the error message. Otherwise, it renders the form for creating a new task and the list of existing tasks with options to change their status or delete them.
  return (
    <section>
      <h1>Tasks</h1>

      <form onSubmit={handleCreateTask}>
        <h2>Create New Task</h2>

        <input
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>

        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>

        <button type="submit">Create Task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h2>{task.title}</h2>

              <p>{task.description}</p>

              <select
                value={task.status}
                onChange={(event) =>
                  handleStatusChange(
                    task._id,
                    event.target.value as Task["status"]
                  )
                }
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>

              <button
                type="button"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TasksPage;