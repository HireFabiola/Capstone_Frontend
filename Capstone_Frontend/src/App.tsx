// Importing necessary libraries and components
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importing layout components for the public website and admin dashboard
import PublicLayout from "./layouts/PublicLayout";
// import AdminLayout from "./layouts/AdminLayout";

// Importing page components for the public website
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";

// Importing page components for the admin dashboard  
import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardPage from "./pages/DashboardPage";
import InquiriesPage from "./pages/InquiriesPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Website routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/inquiries" element={<InquiriesPage />} />
          <Route path="/admin/projects" element={<ProjectsPage />} />
          <Route path="/admin/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Exporting the App component as the default export
export default App;