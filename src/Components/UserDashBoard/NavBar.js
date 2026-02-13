import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const user = localStorage.getItem("user");
  const [isUser, setIsUser] = useState(true);

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
      {/* Logo */}
      <h1 className="text-3xl font-semibold tracking-tight select-none">
        <Link to="/">
          Black<span className="text-yellow-500"> Banner</span>
        </Link>
      </h1>

      {/* Nav Links */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        {/* Cart */}
        {user && (
          <Link
            to={`/Cart/${user}`}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-sm"
          >
            <span className="text-lg">🛒</span>
          </Link>
        )}
        {user && (
          <Link
            to={`/ViewOrder`}
            className="flex items-center justify-center h-10 px-4 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
          >
            View Orders
          </Link>
        )}
        <Link
          to={user ? `/Profile/${user}` : "/Login"}
          className="flex items-center justify-center h-10 px-4 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
        >
          {user ? "Profile" : "Login"}
        </Link>
        {isUser && user && (
          <Link
            to={"/"}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("type");
              setIsUser(false);
              toast.success("Logout successfully");
            }}
            className="flex items-center justify-center h-10 px-4 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
          >
            {user ? "Logout" : ""}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
