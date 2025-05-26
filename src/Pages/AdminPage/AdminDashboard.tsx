import { NavLink, Outlet } from "react-router-dom";
import NavbarLogin from "../../Components/LoginNavbar";

import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Changed to FaBars for a standard menu icon
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //(user, token);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Helmet>
        <title>Admin Dashborad</title>
      </Helmet>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-base-200 p-4 z-50 transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0 translate-y-12" : "-translate-x-full"} 
          md:translate-x-0 md:w-80 md:block`}
      >
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul className="menu text-base-content space-y-2">
          {[
            { to: "HomeDash", label: "All Information" },
            { to: "createproduct", label: "Create Product" },
            { to: "manageproduct", label: "Manage Product" },
            { to: "manageorder", label: "Manage Orders" },
            { to: "manageuser", label: "Manage User Deactivation" },
            { to: "totalrevenue", label: "Total Revenue" },
            { to: "newsLatter", label: "Manage News" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-3xl border-2 transition ${
                  isActive
                    ? "text-[#58652D] bg-amber-50 border-amber-500"
                    : "text-black hover:bg-gray-200"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>
      </aside>

      <div className="md:ml-80 flex-1">
        <div className="fixed top-0 left-0 md:left-80 w-full md:w-[calc(100%-20rem)] z-50 bg-white shadow-md px-4 py-2 flex items-center justify-between">
          <button
            className="md:hidden z-50 text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars size={24} />
          </button>
          <NavbarLogin />
        </div>

        <div className="pt-16 px-4 md:max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
