// Import necessary hooks and services
import type { Inquiry } from "../types/Inquiry";

import {
  getInquiries,
  updateInquiry,
  deleteInquiry,
} from "../services/inquiryService";

import { createProject } from "../services/projectService";

import { useCrud } from "../hooks/useCrud";

// InquiriesPage component to display and manage client inquiries
const InquiriesPage = () => {
  // Use the reusable CRUD hook to manage inquiries
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

  // Function to create a project from a qualified inquiry
  const handleCreateProject = async (
    inquiry: Inquiry
  ) => {
    try {
      await createProject({
        title: `${
          inquiry.businessName || inquiry.clientName
        } Project`,
        description: inquiry.message,
        clientName: inquiry.clientName,
        clientEmail: inquiry.email,
        stage: "planning",
        inquiryId: inquiry._id,
      });

      alert("Project created successfully.");
    } catch {
      setError("Unable to create project.");
    }
  };

  // Function to update inquiry status
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

  // Function to delete an inquiry
  const handleDeleteInquiry = async (
    id: string
  ) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete inquiry.");
    }
  };

  // Display loading message while inquiries are being fetched
  if (isLoading) return <p>Loading inquiries...</p>;

  // Display error message if something went wrong
  if (error) return <p>{error}</p>;

  // Render inquiries list
  return (
    <section>
      <h1>Client Inquiries</h1>

      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <ul>
          {inquiries.map((inquiry) => (
            <li key={inquiry._id}>
              <h2>{inquiry.clientName}</h2>

              <p>
                <strong>Business:</strong>{" "}
                {inquiry.businessName}
              </p>

              <p>
                <strong>Project Type:</strong>{" "}
                {inquiry.projectType}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {inquiry.email}
              </p>

              <p>
                <strong>Message:</strong>{" "}
                {inquiry.message}
              </p>

              {/* Status dropdown for updating inquiry status */}
              <select
                value={inquiry.status}
                onChange={(event) =>
                  handleStatusChange(
                    inquiry._id,
                    event.target.value as Inquiry["status"]
                  )
                }
              >
                <option value="new">New</option>
                <option value="discussion">
                  Discussion
                </option>
                <option value="qualified">
                  Qualified
                </option>
                <option value="closed">
                  Closed
                </option>
              </select>

              {/* Only show Create Project button when inquiry is qualified */}
              {inquiry.status === "qualified" && (
                <button
                  type="button"
                  onClick={() =>
                    handleCreateProject(inquiry)
                  }
                >
                  Create Project
                </button>
              )}

              {/* Delete inquiry */}
              <button
                type="button"
                onClick={() =>
                  handleDeleteInquiry(inquiry._id)
                }
              >
                Delete Inquiry
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

// Export component
export default InquiriesPage;