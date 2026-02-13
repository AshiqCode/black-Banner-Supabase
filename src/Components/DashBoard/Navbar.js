import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default Navbar;
