import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/r4b-logo-dark.png";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block rounded-xl px-4 py-3 text-center text-sm font-medium transition ${isActive
            ? "text-[#D69A2D]"
            : "text-white hover:text-[#D69A2D]"
        }`;

    return (
        <div className="min-h-screen bg-[#F5EADF] lg:flex">
            {/* Mobile / Tablet Header */}
            <header className="border-b border-[#1C3431] bg-[#122321] px-4 py-3 lg:hidden">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col items-center">
                        <img
                            src={logo}
                            alt="R4B Design Studio"
                            className="h-24 w-24 object-contain brightness-0 invert -mb-4"
                        />

                        <div className="flex items-center justify-center">
                            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D69A2D]">
                                Design
                            </span>

                            <span className="mx-2 text-[#D69A2D]">•</span>

                            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">
                                Studio
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="mt-3 rounded-lg border border-[#D69A2D]/60 px-3 py-2 text-sm font-medium text-white hover:text-[#D69A2D]"
                    >
                        ☰
                    </button>
                </div>

                {isSidebarOpen && (
                    <nav className="mt-5 space-y-1 border-t border-white/10 pt-4 text-center">
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

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="block w-full rounded-xl px-4 py-3 text-center text-sm font-medium text-white transition hover:text-[#D69A2D]"
                        >
                            Log Out
                        </button>
                    </nav>
                )}
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden bg-[#122321] p-5 text-white lg:flex lg:min-h-screen lg:w-72 lg:flex-col">
                {/* Branding */}
                <div className="mb-8 flex flex-col items-center">
                    <img
                        src={logo}
                        alt="R4B Design Studio"
                        className="h-56 w-56 object-contain brightness-0 invert -mb-8"
                    />

                    <div className="flex items-center justify-center">
                        <span className="text-sm uppercase tracking-[0.25em] font-semibold text-[#D69A2D]">
                            Design
                        </span>

                        <span className="mx-2 text-[#D69A2D]">•</span>

                        <span className="text-sm uppercase tracking-[0.25em] font-semibold text-white">
                            Studio
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 text-center">
                    <NavLink to="/admin/dashboard" className={navLinkClass}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/inquiries" className={navLinkClass}>
                        Inquiries
                    </NavLink>

                    <div className="group">
                        <NavLink to="/admin/projects" className={navLinkClass}>
                            Projects
                        </NavLink>

                        <div className="hidden group-hover:block">
                            <NavLink
                                to="/admin/tasks"
                                className={({ isActive }) =>
                                    `block py-2 pl-8 text-sm transition ${isActive
                                        ? "text-[#D69A2D]"
                                        : "text-stone-300 hover:text-[#D69A2D]"
                                    }`
                                }
                            >
                                ↳ Tasks
                            </NavLink>
                        </div>
                    </div>
                </nav>

                {/* User Card */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-center lg:mt-auto">
                    <p className="font-semibold">Fabiola Aurelien</p>

                    <p className="text-sm text-stone-300">
                        Studio Administrator
                    </p>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-4 text-sm text-stone-300 transition hover:text-[#D69A2D]"
                    >
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;