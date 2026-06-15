import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import MetricCard from "../components/admin/MetricCard";
import DashboardChartCard from "../components/admin/DashboardChartCard";

import { getInquiries } from "../services/inquiryService";
import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";

import type { Inquiry } from "../types/Inquiry";
import type { Project } from "../types/Project";
import type { Task } from "../types/Task";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      const results = await Promise.allSettled([
        getInquiries(),
        getProjects(),
        getTasks(),
      ]);

      const [inquiryResult, projectResult, taskResult] = results;

      if (inquiryResult.status === "fulfilled") {
        setInquiries(inquiryResult.value);
      }

      if (projectResult.status === "fulfilled") {
        setProjects(projectResult.value);
      }

      if (taskResult.status === "fulfilled") {
        setTasks(taskResult.value);
      }

      if (results.some((result) => result.status === "rejected")) {
        setError("Some dashboard data could not be loaded.");
      }

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const getBudgetEstimate = (budgetRange: string) => {
    switch (budgetRange) {
      case "under $500":
        return 250;
      case "$500-$1,000":
        return 750;
      case "$1,000-$2,500":
        return 1750;
      case "$2,500+":
        return 3000;
      default:
        return 0;
    }
  };

  if (isLoading) return <p>Loading dashboard...</p>;

  const newInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "new"
  ).length;

  const activeProjects = projects.filter(
    (project) => project.stage !== "complete"
  ).length;

  const openTasks = tasks.filter(
    (task) => task.status !== "complete"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.stage === "complete"
  ).length;

  const potentialRevenue = inquiries
    .filter((inquiry) =>
      ["new", "discussion", "qualified"].includes(inquiry.status)
    )
    .reduce(
      (total, inquiry) => total + getBudgetEstimate(inquiry.budgetRange),
      0
    );

  const realizedRevenue = inquiries
    .filter((inquiry) => inquiry.status === "closed")
    .reduce(
      (total, inquiry) => total + getBudgetEstimate(inquiry.budgetRange),
      0
    );

  const projectsInDevelopment = projects.filter(
    (project) => project.stage === "development"
  ).length;

  const projectStageData = {
    labels: ["Planning", "Development", "Review", "Complete"],
    datasets: [
      {
        data: [
          projects.filter((project) => project.stage === "planning").length,
          projects.filter((project) => project.stage === "development").length,
          projects.filter((project) => project.stage === "review").length,
          projects.filter((project) => project.stage === "complete").length,
        ],
        backgroundColor: ["#D69A2D", "#3F6F68", "#8C5E2A", "#122321"],
        borderColor: "#FFF9F4",
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };
  const inquiryStatusData = {
    labels: ["New", "Discussion", "Qualified", "Closed"],
    datasets: [
      {
        data: [
          inquiries.filter((inquiry) => inquiry.status === "new").length,
          inquiries.filter((inquiry) => inquiry.status === "discussion").length,
          inquiries.filter((inquiry) => inquiry.status === "qualified").length,
          inquiries.filter((inquiry) => inquiry.status === "closed").length,
        ],
        backgroundColor: ["#D69A2D", "#3F6F68", "#C47A3A", "#122321"],
        borderColor: "#FFF9F4",
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };
  const revenueData = {
    labels: ["Potential / Pending", "Realized"],
    datasets: [
      {
        label: "Estimated Revenue",
        data: [potentialRevenue, realizedRevenue],
        backgroundColor: ["#D69A2D", "#122321"],
        borderColor: ["#B8862B", "#0F1C1B"],
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  
  return (
    <section className="space-y-6">
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          {error}
        </p>
      )}

      <div>
        <h1 className="text-3xl font-bold text-[#122321]">
          Welcome back, Fabiola.
        </h1>

        <p className="mt-1 text-stone-600">
          Here’s what’s happening in your studio today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link to="/admin/inquiries">
          <MetricCard
            title="New Inquiries"
            value={newInquiries}
            subtitle="Awaiting review"
          />
        </Link>

        <Link to="/admin/projects">
          <MetricCard
            title="Active Projects"
            value={activeProjects}
            subtitle="Currently in progress"
          />
        </Link>

        <Link
          to="/admin/tasks"
          className="block transition hover:-translate-y-1 hover:shadow-md"
        >
          <MetricCard
            title="Open Tasks"
            value={openTasks}
            subtitle="Still needing action"
          />
        </Link>

        <Link to="/admin/projects">
          <MetricCard
            title="Projects Completed"
            value={completedProjects}
            subtitle="Finished work"
          />
        </Link>
      </div>

  <div className="grid gap-6 xl:grid-cols-4">
  <section className="overflow-hidden rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm xl:col-span-2">
    <h2 className="mb-4 text-xl font-bold text-[#122321]">
      Recent Inquiries
    </h2>

    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#D8C6B5] text-xs uppercase text-stone-500">
          <tr>
            <th className="py-3">Client</th>
            <th className="py-3">Need</th>
            <th className="py-3">Budget</th>
            <th className="py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {inquiries.slice(0, 5).map((inquiry) => (
            <tr
              key={inquiry._id}
              className="border-b border-[#ead8c6] last:border-0"
            >
              <td className="py-3 font-medium text-[#122321]">
                {inquiry.clientName}
              </td>

              <td className="py-3 text-stone-600">
                {inquiry.projectType}
              </td>

              <td className="py-3 text-stone-600">
                {inquiry.budgetRange}
              </td>

              <td className="py-3">
                <span className="rounded-full bg-[#D69A2D]/15 px-3 py-1 text-xs font-medium text-[#9b6a16]">
                  {inquiry.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>

  <Link
    to="/admin/tasks"
    className="block overflow-hidden rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold text-[#122321]">
        Open Tasks
      </h2>

      <span className="text-sm font-medium text-[#9b6a16]">
        View all
      </span>
    </div>

    <div className="space-y-4">
      {tasks.filter((task) => task.status !== "complete").length === 0 ? (
        <p className="text-sm text-stone-500">No open tasks.</p>
      ) : (
        tasks
          .filter((task) => task.status !== "complete")
          .slice(0, 5)
          .map((task) => (
            <div
              key={task._id}
              className="border-b border-[#ead8c6] pb-3 last:border-0"
            >
              <p className="font-medium text-[#122321]">
                {task.title}
              </p>

              <p className="text-sm text-stone-500">
                {task.status}
              </p>
            </div>
          ))
      )}
    </div>
  </Link>

  <Link
    to="/admin/projects"
    className="block rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <h2 className="mb-4 text-xl font-bold text-[#122321]">
      Projects in Development
    </h2>

    <p className="text-4xl font-bold text-[#122321]">
      {projectsInDevelopment}
    </p>

    <p className="mt-2 text-sm text-stone-600">
      Currently in the build phase
    </p>

    <div className="mt-6 space-y-3">
      {projects
        .filter((project) => project.stage === "development")
        .slice(0, 3)
        .map((project) => (
          <div
            key={project._id}
            className="border-b border-[#ead8c6] pb-2 last:border-0"
          >
            <p className="font-medium text-[#122321]">
              {project.title}
            </p>

            <p className="text-sm text-stone-500">
              {project.clientName}
            </p>
          </div>
        ))}
    </div>
  </Link>
</div>

      <section className="overflow-hidden rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-[#122321]">
          Active Projects
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#D8C6B5] text-xs uppercase text-stone-500">
              <tr>
                <th className="py-3">Project</th>
                <th className="py-3">Client</th>
                <th className="py-3">Stage</th>
              </tr>
            </thead>

            <tbody>
              {projects.slice(0, 5).map((project) => (
                <tr key={project._id} className="border-b border-[#ead8c6] last:border-0">
                  <td className="py-3 font-medium text-[#122321]">
                    {project.title}
                  </td>

                  <td className="py-3 text-stone-600">
                    {project.clientName}
                  </td>

                  <td className="py-3">
                    <span className="rounded-full bg-[#122321]/10 px-3 py-1 text-xs font-medium text-[#122321]">
                      {project.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link to="/admin/inquiries" className="block">
          <DashboardChartCard title="Estimated Revenue Pipeline">
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </DashboardChartCard>
        </Link>

        <Link to="/admin/projects" className="block">
          <DashboardChartCard title="Project Phases">
            <Pie
              data={projectStageData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </DashboardChartCard>
        </Link>

        <Link to="/admin/inquiries" className="block">
          <DashboardChartCard title="Inquiry Statuses">
            <Pie
              data={inquiryStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </DashboardChartCard>
        </Link>
      </div>
    </section>
  );
};

export default DashboardPage;
