import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Inquiry } from "../types/Inquiry";
import type { Project } from "../types/Project";

import {
  getInquiries,
  updateInquiry,
  deleteInquiry,
} from "../services/inquiryService";

import { createProject, getProjects } from "../services/projectService";
import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";

const InquiriesPage = () => {
  const {
    items: inquiries,
    isLoading,
    error,
    setError,
    editItem,
    removeItem,
  } = useCrud<Inquiry>({
    getItems: getInquiries,
    updateItem: updateInquiry,
    deleteItem: deleteInquiry,
  });

  const [selectedInquiry, setSelectedInquiry] =
    useState<Inquiry | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setProjects(await getProjects());
      } catch {
        setError("Unable to load related projects.");
      }
    };

    loadProjects();
  }, [setError]);

  const projectsByInquiryId = useMemo(
    () =>
      new Map(
        projects.flatMap((project) => {
          if (!project.inquiryId) return [];

          const inquiryId =
            typeof project.inquiryId === "string"
              ? project.inquiryId
              : project.inquiryId._id;

          return [[inquiryId, project] as const];
        })
      ),
    [projects]
  );

  const { formData, setFormData, handleChange, resetForm } =
    useForm({
      title: "",
      clientName: "",
      clientEmail: "",
      description: "",
      stage: "planning" as Project["stage"],
      inquiryId: "",
    });

  const openProjectModal = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);

    setFormData({
      title: `${inquiry.businessName || inquiry.clientName} Project`,
      clientName: inquiry.clientName,
      clientEmail: inquiry.email,
      description: inquiry.message,
      stage: "planning",
      inquiryId: inquiry._id,
    });

    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedInquiry(null);
    setIsModalOpen(false);
    resetForm();
  };

  const handleCreateProjectSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const project = await createProject(formData);
      setProjects((currentProjects) => [project, ...currentProjects]);
      closeProjectModal();
    } catch {
      setError("Unable to create project.");
    }
  };

  const handleStatusChange = async (
    id: string,
    status: Inquiry["status"]
  ) => {
    try {
      await editItem(id, { status });
    } catch {
      setError("Unable to update inquiry status.");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete inquiry.");
    }
  };

  if (isLoading) return <p>Loading inquiries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#122321]">
          Client Inquiries
        </h1>

        <p className="mt-1 text-stone-600">
          Manage leads and convert qualified inquiries into projects.
        </p>
      </div>

      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <div className="grid gap-5">
          {inquiries.map((inquiry) => (
            <article
              key={inquiry._id}
              className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-[#122321]">
                    {inquiry.clientName}
                  </h2>

                  <p className="font-medium text-[#D69A2D]">
                    {inquiry.businessName}
                  </p>

                  <p className="text-sm text-stone-600">
                    {inquiry.projectType} • {inquiry.budgetRange}
                  </p>

                  <p className="max-w-3xl text-stone-700">
                    {inquiry.message}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <select
                    value={inquiry.status}
                    onChange={(event) =>
                      handleStatusChange(
                        inquiry._id,
                        event.target.value as Inquiry["status"]
                      )
                    }
                    className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
                  >
                    <option value="new">New</option>
                    <option value="discussion">Discussion</option>
                    <option value="qualified">Qualified</option>
                    <option value="closed">Closed</option>
                  </select>

                  {projectsByInquiryId.has(inquiry._id) ? (
                    <Link
                      to="/admin/projects"
                      state={{
                        project: projectsByInquiryId.get(inquiry._id),
                      }}
                      className="rounded-xl bg-[#122321] px-4 py-2 text-center font-medium text-white hover:bg-[#1C3431]"
                    >
                      View/Edit
                    </Link>
                  ) : inquiry.status === "qualified" ? (
                    <button
                      type="button"
                      onClick={() => openProjectModal(inquiry)}
                      className="rounded-xl bg-[#D69A2D] px-4 py-2 font-medium text-white hover:bg-[#B8862B]"
                    >
                      Create Project
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => handleDeleteInquiry(inquiry._id)}
                    className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    Delete Inquiry
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-[#FFF9F4] p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#122321]">
              Create Project
            </h2>

            <form
              onSubmit={handleCreateProjectSubmit}
              className="mt-5 space-y-4"
            >
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
                required
              />

              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
                required
              />

              <input
                name="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
                required
              />

              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D8C6B5] px-4 py-2"
              >
                <option value="planning">Planning</option>
                <option value="development">Development</option>
                <option value="review">Review</option>
                <option value="complete">Complete</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeProjectModal}
                  className="rounded-xl border border-[#D8C6B5] px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#D69A2D] px-4 py-2 font-medium text-white"
                >
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default InquiriesPage;
