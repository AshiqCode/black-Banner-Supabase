import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
        {/* Logo */}
        <h1 className="text-3xl font-semibold tracking-tight select-none">
          Black<span className="text-yellow-500"> Banner</span>
        </h1>

        {/* Nav Links */}
        <nav className="flex gap-4 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-900 hover:text-yellow-500 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/Products"
            className="text-gray-900 hover:text-yellow-500 transition-colors"
          >
            Product
          </Link>
          <Link
            to="/Login"
            className="text-gray-900 hover:text-yellow-500 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/Signup"
            className="text-gray-900 hover:text-yellow-500 transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col mt-24">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center flex-1 bg-white px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Black<span className="text-yellow-500"> Banner</span>
          </h1>
          <p className="text-gray-700 max-w-3xl mt-5">
            Explore our amazing platform. Sign up to create an account or login
            if you already have one. BlackBanner is a modern platform that helps
            you manage your projects efficiently and securely. Our goal is to
            provide a clean, simple, and powerful user experience that anyone
            can enjoy.
          </p>
        </section>

        {/* About Section */}
        <section className="bg-white px-4 py-8 mt-10">
          <div className="max-w-3xl mx-auto text-center">
            <Link to="/Products">
              <button className=" rounded bg-[#f0c14b] py-2 px-6 font-medium text-black border border-[#a88734] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[#eeb933] active:bg-[#e6ac2c] transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-6 text-center text-xs text-gray-600 w-full">
        <div className="flex justify-center gap-4 mb-2">
          <span className="text-blue-700 hover:underline cursor-pointer">
            Conditions of Use
          </span>
          <span className="text-blue-700 hover:underline cursor-pointer">
            Privacy Notice
          </span>
          <span className="text-blue-700 hover:underline cursor-pointer">
            Help
          </span>
        </div>
        <p>© {new Date().getFullYear()} BlackBanner</p>
      </footer>
    </div>
  );
};

export default Home;
