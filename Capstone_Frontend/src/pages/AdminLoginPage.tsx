// Import necessary hooks and utilities from React and other libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClients";
import { useAuth } from "../context/AuthContext";

// AdminLoginPage component to handle admin login functionality
const AdminLoginPage = () => {
    // Use the useNavigate hook to programmatically navigate to different routes and useAuth to access authentication context
    const navigate = useNavigate();
    // Destructure the login function from the authentication context to update the authentication state upon successful login
    const { login } = useAuth();
    // State variables to manage the email and password input fields, as well as error messages and loading state
    const [email, setEmail] = useState("");
    // State variable to manage the password input field
    const [password, setPassword] = useState("");
    // State variable to manage error messages that may occur during the login process
    const [error, setError] = useState("");
    // State variable to manage the loading state of the login process, which can be used to disable the login button and show a loading indicator
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle form submission for admin login
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Make a POST request to the login endpoint of the API with the email and password entered by the user
            const response = await apiClient.post("/auth/login", {
                email,
                password,
            });

            // If the login is successful, call the login function from the authentication context to update the authentication state with the user's information and token, and navigate to the admin dashboard
            login(response.data.user, response.data.token);

            navigate("/admin/dashboard");


        } catch (error) {
            setError("Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <h1>Admin Login</h1>

// Render a form with input fields for email and password, and a submit button to trigger the login process. Display any error messages that occur during login.
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />
                </div>

// Input field for password with a label, and an onChange handler to update the password state variable as the user types
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>

                {error && <p>{error}</p>}

// Submit button for the login form, which is disabled while the login process is ongoing to prevent multiple submissions. The button text changes to indicate that the login is in progress.
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log In"}
                </button>
            </form>
        </main>
    );
};

export default AdminLoginPage;