// Import necessary hooks and services for managing tasks and projects
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

  // State variable to manage the list of projects for task assignment
  const [projects, setProjects] = useState<Project[]>([]);

  // State variable to manage the form data for creating a new task, including title, description, status, and associated project ID
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Task["status"],
    projectId: "",
  });

  //
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

  // Function to handle changes in the form input fields for creating a new task. It updates the formData state with the current values entered by the user in the input fields.
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle the creation of a new task when the form is submitted. It prevents the default form submission behavior, calls the addItem function from the useCrud hook to create a new task with the data from the form, and resets the form data after successful creation. It also handles any errors that may occur during the task creation process.
  const handleCreateTask = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await addItem(formData);

      setFormData({
        title: "",
        description: "",
        status: "todo",
        projectId: "",
      });
    } catch {
      setError("Unable to create task.");
    }
  };

  // Function to handle changes in the status of a task. It takes the task ID and the new status as arguments, calls the editItem function from the useCrud hook to update the task's status, and handles any errors that may occur during the update process.
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

  //
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

// Export the TasksPage component as the default export of this module, allowing it to be imported and used in other parts of the application, such as in the routing configuration for the admin dashboard.
export default TasksPage;