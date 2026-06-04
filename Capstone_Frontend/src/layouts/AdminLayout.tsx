// Importing necessary modules and components for the AdminLayout component, including React Router's NavLink, Outlet, and useNavigate for navigation, useState for managing component state, useAuth for authentication context, and a logo image for branding.
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/r4b-logo.png";

// AdminLayout component to provide a consistent layout for all admin pages, including a sidebar with navigation links and a main content area where the child components (admin pages) will be rendered. It also includes functionality for toggling the sidebar on mobile devices and logging out the user.
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Function to handle user logout, which calls the logout function from the authentication context to clear the user's authentication state and then navigates the user back to the admin login page.
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Function to determine the CSS classes for the navigation links in the sidebar based on whether the link is active (the current route matches the link's destination). It returns a string of CSS classes that style the link differently when it is active versus when it is not active.
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-amber-700 text-white"
        : "text-slate-200 hover:bg-slate-800 hover:text-white"
    }`;

    // The component returns a JSX structure that defines the layout of the admin dashboard. It includes a header for mobile devices with a logo and a menu button to toggle the sidebar, a sidebar with navigation links and user information, and a main content area where the child components (admin pages) will be rendered using the Outlet component from React Router.
  return (
    <div className="min-h-screen bg-stone-50 lg:flex">
      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <img src={logo} alt="R4B Design Studio" className="h-10 w-10 object-contain" />
          <span className="font-bold text-slate-900">R4B Admin</span>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          Menu
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } bg-slate-950 p-5 text-white lg:flex lg:min-h-screen lg:w-72 lg:flex-col`}
      >
        <div className="mb-8 flex items-center gap-3">
          <img src={logo} alt="R4B Design Studio" className="h-14 w-14 object-contain" />
          <div>
            <h1 className="text-xl font-bold">R4B</h1>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Design Studio
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/inquiries" className={navLinkClass}>
            Inquiries
          </NavLink>
          <NavLink to="/admin/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/admin/tasks" className={navLinkClass}>
            Tasks
          </NavLink>
        </nav>

        <div className="mt-8 rounded-2xl border border-slate-700 p-4 lg:mt-auto">
          <p className="font-semibold">Fabiola B.</p>
          <p className="text-sm text-slate-400">Studio Admin</p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 text-sm text-slate-300 hover:text-white"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

// Exporting the AdminLayout component as the default export of the module, allowing it to be imported and used in other parts of the application, particularly in the routing configuration where it will wrap the admin pages to provide a consistent layout.
export default AdminLayout;