import OverView from "./OverView";
import AddProduct from "./AddProduct";
import UsersOverView from "./UsersOverView";
import Products from "./Products";
import ViewOrders from "./ViewOrders";
import Admins from "./Admins";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tight select-none text-gray-900">
          Black<span className="text-yellow-500">Banner</span>
        </h1>

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
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="select-none w-64 bg-gray-100 border-r border-gray-300 p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/admins"
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Admins
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/products"
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/orders"
                className="block px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors"
              >
                View Orders
              </Link>
            </li>
          </ul>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <OverView />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
