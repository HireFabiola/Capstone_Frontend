//Import necessary hooks and services
import { useEffect, useState } from "react";
import { getInquiries } from "../services/inquiryService";
import type { Inquiry } from "../types/Inquiry";

// InquiriesPage component to display a list of client inquiries in the admin dashboard
const InquiriesPage = () => {
    // State variables to manage the list of inquiries, loading state, and error messages
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

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
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

// Export the InquiriesPage component as the default export of this module, allowing it to be imported and used in other parts of the application, such as in the routing configuration for the admin dashboard.
export default InquiriesPage;