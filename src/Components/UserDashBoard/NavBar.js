import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const user = localStorage.getItem("user");
  const [isUser, setIsUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-300">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight select-none">
          <Link to="/">
            Black<span className="text-yellow-500"> Banner</span>
          </Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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
              Logout
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-gray-100"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar + Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <div className="font-semibold text-gray-900">
              Menu
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-2 p-4 text-sm font-medium">
            {user && (
              <Link
                to={`/Cart/${user}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between h-11 px-3 rounded-md bg-gray-100 text-gray-800 hover:bg-yellow-500 hover:text-black transition"
              >
                <span>Cart</span>
                <span className="text-lg">🛒</span>
              </Link>
            )}

            {user && (
              <Link
                to={`/ViewOrder`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center  h-11 px-3 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition"
              >
                View Orders
              </Link>
            )}

            <Link
              to={user ? `/Profile/${user}` : "/Login"}
              onClick={() => setMenuOpen(false)}
              className="flex items-center  h-11 px-3 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition"
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
                  setMenuOpen(false);
                }}
                className="flex items-center  h-11 px-3 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition"
              >
                Logout
              </Link>
            )}
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default NavBar;