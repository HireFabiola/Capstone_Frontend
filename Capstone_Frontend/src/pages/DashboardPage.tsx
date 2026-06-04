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
  if (error) return <p>{error}</p>;

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
      },
    ],
  };

  const revenueData = {
    labels: ["Potential / Pending", "Realized"],
    datasets: [
      {
        label: "Estimated Revenue",
        data: [potentialRevenue, realizedRevenue],
      },
    ],
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#122321]">
          Welcome back, Fabiola.
        </h1>

        <p className="mt-1 text-stone-600">
          Here’s what’s happening in your studio today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <Link to="/admin/tasks">
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

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm xl:col-span-2">
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
                  <tr key={inquiry._id} className="border-b border-[#ead8c6] last:border-0">
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

        <section className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-[#122321]">
            Open Tasks
          </h2>

          <div className="space-y-4">
            {tasks.filter((task) => task.status !== "complete").length === 0 ? (
              <p className="text-sm text-stone-500">No open tasks.</p>
            ) : (
              tasks
                .filter((task) => task.status !== "complete")
                .slice(0, 5)
                .map((task) => (
                  <div key={task._id} className="border-b border-[#ead8c6] pb-3 last:border-0">
                    <p className="font-medium text-[#122321]">{task.title}</p>
                    <p className="text-sm text-stone-500">{task.status}</p>
                  </div>
                ))
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm">
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

      <div className="grid gap-6 xl:grid-cols-3">
        <DashboardChartCard title="Estimated Revenue Pipeline">
          <Bar data={revenueData} />
        </DashboardChartCard>

        <DashboardChartCard title="Project Phases">
          <Pie data={projectStageData} />
        </DashboardChartCard>

        <DashboardChartCard title="Inquiry Statuses">
          <Pie data={inquiryStatusData} />
        </DashboardChartCard>
      </div>
    </section>
  );
};

export default DashboardPage;