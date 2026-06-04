// Importing necessary modules and components for the DashboardPage component, including React's useEffect and useState hooks for managing component state and side effects, a MetricCard component for displaying individual metrics, and service functions for fetching inquiries, projects, and tasks data from the backend. It also imports TypeScript types for Inquiry, Project, and Task to provide type safety for the component's state.
import { useEffect, useState } from "react";
import MetricCard from "../components/admin/MetricCard";

import { getInquiries } from "../services/inquiryService";
import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";

import type { Inquiry } from "../types/Inquiry";
import type { Project } from "../types/Project";
import type { Task } from "../types/Task";

// DashboardPage component to display an overview of the studio's current status, including metrics for new inquiries, active projects, open tasks, and completed projects. It also shows recent inquiries, tasks due soon, and active projects in a dashboard layout.
const DashboardPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect hook to load the dashboard data when the component mounts. It makes parallel API calls to fetch inquiries, projects, and tasks data, updates the state with the retrieved data, and handles any errors that may occur during the fetch process. It also sets a loading state while the data is being fetched.
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [inquiryData, projectData, taskData] = await Promise.all([
          getInquiries(),
          getProjects(),
          getTasks(),
        ]);

        setInquiries(inquiryData);
        setProjects(projectData);
        setTasks(taskData);
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  // Calculate the metrics to be displayed on the dashboard by filtering and counting the inquiries, projects, and tasks based on their status or stage. These metrics include the number of new inquiries, active projects, open tasks, and completed projects. It also prepares lists of recent inquiries, active projects, and tasks that are due soon for display in the dashboard.
  const newInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "new"
  ).length;

  // Calculate the number of active projects by filtering the projects that are not in the "complete" stage and counting them.
  const activeProjects = projects.filter(
    (project) => project.stage !== "complete"
  ).length;

  // Calculate the number of open tasks by filtering the tasks that are not in the "complete" status and counting them.
  const openTasks = tasks.filter(
    (task) => task.status !== "complete"
  ).length;

  // Calculate the number of completed projects by filtering the projects that are in the "complete" stage and counting them.
  const completedProjects = projects.filter(
    (project) => project.stage === "complete"
  ).length;

  // Prepare lists of recent inquiries, active projects, and tasks that are due soon by slicing the respective arrays to get the most recent or relevant items for display in the dashboard.
  const recentInquiries = inquiries.slice(0, 5);
  const recentProjects = projects.slice(0, 5);
  const dueTasks = tasks.filter((task) => task.status !== "complete").slice(0, 5);

  // The component returns a JSX structure that defines the layout of the dashboard, including a header with a welcome message, a grid of MetricCard components to display the calculated metrics, and sections for recent inquiries, tasks due soon, and active projects. Each section includes a table or list to display the relevant data in an organized manner.
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Welcome back, Fabiola.
          </h1>
          <p className="mt-1 text-slate-500">
            Here’s what’s happening in your studio today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="New Inquiries" value={newInquiries} subtitle="Awaiting review" />
        <MetricCard title="Active Projects" value={activeProjects} subtitle="Currently in progress" />
        <MetricCard title="Open Tasks" value={openTasks} subtitle="Still needing action" />
        <MetricCard title="Projects Completed" value={completedProjects} subtitle="Finished work" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 text-xl font-bold text-slate-950">
            Recent Inquiries
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3">Client</th>
                  <th className="py-3">Need</th>
                  <th className="py-3">Budget</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-b last:border-0">
                    <td className="py-3 font-medium text-slate-900">
                      {inquiry.clientName}
                    </td>
                    <td className="py-3 text-slate-600">
                      {inquiry.projectType}
                    </td>
                    <td className="py-3 text-slate-600">
                      {inquiry.budgetRange}
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-950">
            Tasks Due Soon
          </h2>

          <div className="space-y-4">
            {dueTasks.length === 0 ? (
              <p className="text-sm text-slate-500">No open tasks.</p>
            ) : (
              dueTasks.map((task) => (
                <div key={task._id} className="border-b pb-3 last:border-0">
                  <p className="font-medium text-slate-900">{task.title}</p>
                  <p className="text-sm text-slate-500">{task.status}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-950">
          Active Projects
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-xs uppercase text-slate-500">
              <tr>
                <th className="py-3">Project</th>
                <th className="py-3">Client</th>
                <th className="py-3">Stage</th>
              </tr>
            </thead>

            <tbody>
              {recentProjects.map((project) => (
                <tr key={project._id} className="border-b last:border-0">
                  <td className="py-3 font-medium text-slate-900">
                    {project.title}
                  </td>
                  <td className="py-3 text-slate-600">
                    {project.clientName}
                  </td>
                  <td className="py-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {project.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default DashboardPage;