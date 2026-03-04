import { useState } from "react";
import OverView from "./OverView";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 sm:px-8 py-4 bg-white border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
            aria-label="Open sidebar"
          >
            <span className="text-xl leading-none">☰</span>
          </button>

          <h1 className="text-3xl font-bold tracking-tight select-none text-gray-900">
            Black<span className="text-yellow-500">Banner</span>
          </h1>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("type");
            navigate("/");
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md hover:text-yellow-500 transition-all duration-200"
        >
          Log Out
        </button>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 relative">
        {/* Mobile overlay */}
        <div
          onClick={() => setSidebarOpen(false)}
          className={[
            "md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity",
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
        />

        {/* Sidebar */}
        <aside
          className={[
            "select-none w-64 bg-gray-100 border-r border-gray-300 p-6 flex flex-col",
            "md:static md:translate-x-0 md:z-auto",
            "fixed inset-y-0 left-0 z-50 transform transition-transform duration-200",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
              aria-label="Close sidebar"
            >
              <span className="text-xl leading-none">✕</span>
            </button>
          </div>

          <ul className="flex flex-col gap-2 text-gray-700">
            <li>
              <Link
                to="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/admins"
                onClick={() => setSidebarOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Admins
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                onClick={() => setSidebarOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/products"
                onClick={() => setSidebarOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/orders"
                onClick={() => setSidebarOpen(false)}
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                View Orders
              </Link>
            </li>
          </ul>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6">
          <OverView />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;