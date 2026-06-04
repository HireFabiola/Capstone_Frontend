// Import necessary hooks and services
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import type { Project } from "../types/Project";
import { createTask } from "../services/taskService";

// ProjectsPage component to display a list of projects in the admin dashboard
const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // useEffect hook to fetch projects from the API when the component mounts. It calls the getProjects service function, updates the state with the retrieved projects, and handles any errors that may occur during the fetch process.
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch {
                setError("Unable to load projects.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>{error}</p>;

    // Function to handle the creation of a new task for a specific project. It takes the projectId as an argument, calls the createTask service function with the necessary task data, and handles any errors that may occur during the task creation process.
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
    return (
        <section>
            <h1>Projects</h1>

            {projects.length === 0 ? (
                <p>No projects yet.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project._id}>
                            <h2>{project.title}</h2>
                            <p>{project.clientName}</p>
                            <p>{project.stage}</p>
                            <p>{project.description}</p>
                            <button
                                type="button"
                                onClick={() => handleCreateTask(project._id)}
                            >
                                Create Task
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>

    );
};

// Export the ProjectsPage component as the default export of this module
export default ProjectsPage;