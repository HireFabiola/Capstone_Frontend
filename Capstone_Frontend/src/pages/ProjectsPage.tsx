import { useState, type FormEvent } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

import { createTask } from "../services/taskService";

import type { Project } from "../types/Project";
import type { Task } from "../types/Task";

import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";

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

  const {
    formData,
    handleChange,
    resetForm,
    setFormData,
  } = useForm({
    title: "",
    clientName: "",
    clientEmail: "",
    description: "",
    stage: "planning" as Project["stage"],
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const {
    formData: taskFormData,
    setFormData: setTaskFormData,
    handleChange: handleTaskChange,
    resetForm: resetTaskForm,
  } = useForm({
    title: "",
    description: "",
    status: "todo" as Task["status"],
    projectId: "",
  });

  const handleCreateProject = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      if (editingProjectId) {
        // Update existing project
        await editItem(editingProjectId, formData);
        resetForm();
        setEditingProjectId(null);
      } else {
        // Create new project
        const newProject = await addItem(formData);
        if (!newProject) {
          return;
        }
        // Switch to edit mode for the newly created project
        setEditingProjectId(newProject._id);
      }
    } catch {
      setError("Unable to create project.");
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project._id);
    // Populate form with project data
    setFormData({
      title: project.title,
      clientName: project.clientName,
      clientEmail: project.clientEmail,
      description: project.description,
      stage: project.stage,
    });
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    resetForm();
  };

  const handleStageChange = async (
    id: string,
    stage: Project["stage"]
  ) => {
    try {
      await editItem(id, { stage });
    } catch {
      setError("Unable to update project stage.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete project.");
    }
  };

  const openTaskModal = (project: Project) => {
    setSelectedProject(project);

    setTaskFormData({
      title: "",
      description: "",
      status: "todo",
      projectId: project._id,
    });

    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedProject(null);
    setIsTaskModalOpen(false);
    resetTaskForm();
  };

  const handleCreateTaskSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await createTask(taskFormData);
      alert("Task created successfully.");
      closeTaskModal();
    } catch {
      setError("Unable to create task.");
    }
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#122321]">
          Projects
        </h1>

        <p className="mt-1 text-stone-600">
          Manage client projects, update project phases, and create related tasks.
        </p>
      </div>

      <form
        onSubmit={handleCreateProject}
        className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm"
      >
        <h2 className="mb-4 text-xl font-bold text-[#122321]">
          {editingProjectId ? "Edit Project" : "Create New Project"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            placeholder="Project title"
            value={formData.title}
            onChange={handleChange}
            required
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
          />

          <input
            name="clientName"
            placeholder="Client name"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
          />

          <input
            name="clientEmail"
            type="email"
            placeholder="Client email"
            value={formData.clientEmail}
            onChange={handleChange}
            required
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
          />

          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
          >
            <option value="planning">Planning</option>
            <option value="development">Development</option>
            <option value="review">Review</option>
            <option value="complete">Complete</option>
          </select>

          <textarea
            name="description"
            placeholder="Project description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2 md:col-span-2"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-[#D69A2D] px-5 py-2 font-medium text-white transition hover:bg-[#B8862B]"
          >
            {editingProjectId ? "Save Changes" : "Create Project"}
          </button>

          {editingProjectId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-xl border border-[#D8C6B5] px-5 py-2 font-medium text-[#122321] transition hover:bg-[#122321]/10"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {projects.length === 0 ? (
        <p className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 text-stone-600">
          No projects yet.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project._id}
              className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm"
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#122321]">
                    {project.title}
                  </h2>

                  <p className="text-sm font-medium text-[#D69A2D]">
                    {project.clientName}
                  </p>

                  <p className="text-sm text-stone-500">
                    {project.clientEmail}
                  </p>
                </div>

                <span className="rounded-full bg-[#122321]/10 px-3 py-1 text-xs font-semibold uppercase text-[#122321]">
                  {project.stage}
                </span>
              </div>

              <p className="mb-5 text-stone-700">
                {project.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <select
                  value={project.stage}
                  onChange={(event) =>
                    handleStageChange(
                      project._id,
                      event.target.value as Project["stage"]
                    )
                  }
                  className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
                >
                  <option value="planning">Planning</option>
                  <option value="development">Development</option>
                  <option value="review">Review</option>
                  <option value="complete">Complete</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleEditProject(project)}
                  className="rounded-xl bg-[#D69A2D] px-4 py-2 font-medium text-white transition hover:bg-[#B8862B]"
                >
                  Edit Project
                </button>

                <button
                  type="button"
                  onClick={() => openTaskModal(project)}
                  className="rounded-xl bg-[#122321] px-4 py-2 font-medium text-white transition hover:bg-[#1C3431]"
                >
                  Create Task
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteProject(project._id)}
                  className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                >
                  Delete Project
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {isTaskModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-[#FFF9F4] p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#122321]">
              Create Task
            </h2>

            <p className="mt-1 text-sm text-stone-600">
              Project: {selectedProject.title}
            </p>

            <form
              onSubmit={handleCreateTaskSubmit}
              className="mt-5 space-y-4"
            >
              <input
                name="title"
                value={taskFormData.title}
                onChange={handleTaskChange}
                placeholder="Task title"
                required
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
              />

              <textarea
                name="description"
                value={taskFormData.description}
                onChange={handleTaskChange}
                placeholder="Task description"
                rows={4}
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
              />

              <select
                name="status"
                value={taskFormData.status}
                onChange={handleTaskChange}
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeTaskModal}
                  className="rounded-xl border border-[#D8C6B5] px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#D69A2D] px-4 py-2 font-medium text-white"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;