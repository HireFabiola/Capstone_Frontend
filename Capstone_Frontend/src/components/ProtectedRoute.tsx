// Import necessary modules and hooks from React and React Router
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ProtectedRoute component to restrict access to certain routes based on authentication status 
const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useAuth();

  // If there is no authentication token, redirect the user to the admin login page
  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  // If the user is authenticated, render the child components (the protected route)
  return children;
};

// Export the ProtectedRoute component as the default export
export default ProtectedRoute;