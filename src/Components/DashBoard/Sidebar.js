import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="select-none w-64 bg-gray-100 border-r border-gray-300 p-6 flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto">
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
  );
};

export default Sidebar;
