// Import necessary dependencies and services for managing projects and tasks, as well as custom hooks for CRUD operations and form handling.
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

import { createTask } from "../services/taskService";
import type { Project } from "../types/Project";
import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";

// ProjectsPage component to display a list of projects in the admin dashboard
const ProjectsPage = () => {
  const {
    items: projects,
    isLoading,
    error,
    setError,
    addItem,
    editItem,
    removeItem,
  } = useCrud<Project>({
    getItems: getProjects,
    createItem: createProject,
    updateItem: updateProject,
    deleteItem: deleteProject,
  });

  // State variable to manage the form data for creating a new project, including title, description, client name, client email, and project stage. It uses the useForm custom hook to handle form state and input changes.
  const { formData, handleChange, resetForm } = useForm({
    title: "",
    clientName: "",
    clientEmail: "",
    description: "",
    stage: "planning" as Project["stage"],
  });

  // Function to handle the submission of the form for creating a new project. It calls the addItem function from the useCrud hook to create a new project with the form data, and resets the form after successful creation. If there is an error during project creation, it sets an error message in the state.
  const handleCreateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
        // Call the addItem function from the useCrud hook to create a new project with the form data, and reset the form after successful creation. If there is an error during project creation, it sets an error message in the state.
      await addItem(formData);
      resetForm();
    } catch {
      setError("Unable to create project.");
    }
  };

  // Function to handle changes in the project stage for a specific project. It calls the editItem function from the useCrud hook to update the project's stage, and sets an error message if there is an issue during the update process.
  const handleStageChange = async (
    id: string,
    stage: Project["stage"]
  ) => {
    try {
        // Call the editItem function from the useCrud hook to update the project's stage, and sets an error message if there is an issue during the update process.
      await editItem(id, { stage });
    } catch {
      setError("Unable to update project stage.");
    }
  };

  // Function to handle the deletion of a project. It calls the removeItem function from the useCrud hook to delete the project, and sets an error message if there is an issue during the deletion process.
  const handleDeleteProject = async (id: string) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete project.");
    }
  };

  // Function to handle the creation of a new task associated with a specific project. It calls the createTask service function to create a new task with a default title, description, status, and the project ID. If there is an error during task creation, it sets an error message in the state.
  const handleCreateTask = async (projectId: string) => {
    try {
      await createTask({
        title: "Initial project task",
        description: "First task created from project workflow.",
        status: "todo",
        projectId,
      });

      alert("Task created successfully.");
    } catch {
      setError("Unable to create task.");
    }
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  // Conditional rendering based on the loading state and error state. If the data is still loading, it displays a loading message. If there is an error, it displays the error message. Otherwise, it renders the form for creating a new project and the list of existing projects with options to change their stage, create tasks, or delete them.
  return (
    <section>
      <h1>Projects</h1>

      <form onSubmit={handleCreateProject}>
        <h2>Create New Project</h2>

        <input
          name="title"
          placeholder="Project title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="clientName"
          placeholder="Client name"
          value={formData.clientName}
          onChange={handleChange}
          required
        />

        <input
          name="clientEmail"
          type="email"
          placeholder="Client email"
          value={formData.clientEmail}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Project description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
        >
          <option value="planning">Planning</option>
          <option value="development">Development</option>
          <option value="review">Review</option>
          <option value="complete">Complete</option>
        </select>

        <button type="submit">Create Project</button>
      </form>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h2>{project.title}</h2>
              <p>{project.clientName}</p>
              <p>{project.clientEmail}</p>
              <p>{project.description}</p>

              <select
                value={project.stage}
                onChange={(event) =>
                  handleStageChange(
                    project._id,
                    event.target.value as Project["stage"]
                  )
                }
              >
                <option value="planning">Planning</option>
                <option value="development">Development</option>
                <option value="review">Review</option>
                <option value="complete">Complete</option>
              </select>

              <button
                type="button"
                onClick={() => handleCreateTask(project._id)}
              >
                Create Task
              </button>

              <button
                type="button"
                onClick={() => handleDeleteProject(project._id)}
              >
                Delete Project
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectsPage;