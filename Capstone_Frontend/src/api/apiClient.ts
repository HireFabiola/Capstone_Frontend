// Import axios for making HTTP requests
import axios from "axios";

// Create an axios instance with a base URL from environment variables and set up an interceptor to include the authentication token in the headers of each request if it exists in localStorage
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//  
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  //    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

// Return the modified config to be used in the request
  return config;
});

// Export the configured axios instance for use in making API requests throughout the application
export default apiClient;