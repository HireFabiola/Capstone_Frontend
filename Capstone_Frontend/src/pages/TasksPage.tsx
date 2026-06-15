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

  const [projects, setProjects] = useState<Project[]>([]);

  const { formData, handleChange, resetForm } = useForm({
    title: "",
    description: "",
    status: "todo" as Task["status"],
    projectId: "",
  });

  const getProjectTitle = (projectId: Task["projectId"]) => {
    if (!projectId) {
      return "Project no longer available";
    }

    if (typeof projectId === "string") {
      return projectId;
    }

    return projectId.title;
  };

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

  const handleDeleteTask = async (id: string) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete task.");
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#122321]">
          Tasks
        </h1>

        <p className="mt-1 text-stone-600">
          Track project tasks, update progress, and manage action items.
        </p>
      </div>

      <form
        onSubmit={handleCreateTask}
        className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm"
      >
        <h2 className="mb-4 text-xl font-bold text-[#122321]">
          Create New Task
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
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
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2 md:col-span-2"
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2 md:col-span-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded-xl bg-[#D69A2D] px-5 py-2 font-medium text-white transition hover:bg-[#B8862B]"
        >
          Create Task
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 text-stone-600">
          No tasks yet.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {tasks.map((task) => (
            <article
              key={task._id}
              className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm"
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#122321]">
                    {task.title}
                  </h2>

                  <p className="text-sm text-stone-500">
                Project: {getProjectTitle(task.projectId)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                    task.status === "todo"
                      ? "bg-[#D69A2D]/15 text-[#9b6a16]"
                      : task.status === "in-progress"
                      ? "bg-[#3F6F68]/15 text-[#3F6F68]"
                      : "bg-[#122321]/10 text-[#122321]"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {task.description && (
                <p className="mb-5 text-stone-700">
                  {task.description}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <select
                  value={task.status}
                  onChange={(event) =>
                    handleStatusChange(
                      task._id,
                      event.target.value as Task["status"]
                    )
                  }
                  className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleDeleteTask(task._id)}
                  className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                >
                  Delete Task
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TasksPage;
