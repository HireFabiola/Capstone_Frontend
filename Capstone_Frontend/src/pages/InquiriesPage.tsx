//Import necessary hooks and services
import { useEffect, useState } from "react";
import type { Inquiry } from "../types/Inquiry";
import { getInquiries, updateInquiry } from "../services/inquiryService";
import { createProject } from "../services/projectService";


// InquiriesPage component to display a list of client inquiries in the admin dashboard
const InquiriesPage = () => {
    // State variables to manage the list of inquiries, loading state, and error messages
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const handleCreateProject = async (inquiry: Inquiry) => {
        try {
            await createProject({
                title: `${inquiry.businessName || inquiry.clientName} Project`,
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
    const handleStatusChange = async (
        id: string,
        status: Inquiry["status"]
    ) => {
        try {
            const updatedInquiry = await updateInquiry(id, { status });

            setInquiries((prevInquiries) =>
                prevInquiries.map((inquiry) =>
                    inquiry._id === id ? updatedInquiry : inquiry
                )
            );
        } catch {
            setError("Unable to update inquiry status.");
        }
    };

    // useEffect hook to fetch inquiries from the API when the component mounts. It calls the getInquiries service function, updates the state with the retrieved inquiries, and handles any errors that may occur during the fetch process.
    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const data = await getInquiries();
                setInquiries(data);
            } catch (error) {
                setError("Unable to load inquiries.");
            } finally {
                setIsLoading(false);
            }
        };


        // Call the fetchInquiries function to initiate the API call when the component mounts
        fetchInquiries();
    }, []);

    // Conditional rendering based on the loading state and error state. If the data is still loading, it displays a loading message. If there is an error, it displays the error message. Otherwise, it renders the list of inquiries.
    if (isLoading) return <p>Loading inquiries...</p>;

    // If there is an error, display the error message
    if (error) return <p>{error}</p>;

    // Render the list of inquiries. If there are no inquiries, it displays a message indicating that there are no inquiries yet. Otherwise, it maps over the inquiries and displays relevant information for each inquiry, such as the client's name, business name, project type, status, and message.
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
                            <p>{inquiry.businessName}</p>
                            <p>{inquiry.projectType}</p>
                            <p>{inquiry.status}</p>
                            <p>{inquiry.message}</p>
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
                                <option value="discussion">Discussion</option>
                                <option value="qualified">Qualified</option>
                                <option value="closed">Closed</option>
                            </select>

                            {/* // If the inquiry status is "qualified", show a button to create a project from this inquiry. This allows the admin to easily convert qualified inquiries into active projects in the system. */}
                            {inquiry.status === "qualified" && (
                                <button type="button"
                                    onClick={() => handleCreateProject(inquiry)}
                                >
                                    Create Project
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

// Export the InquiriesPage component as the default export of this module, allowing it to be imported and used in other parts of the application, such as in the routing configuration for the admin dashboard.
export default InquiriesPage;