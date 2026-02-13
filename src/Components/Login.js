import { useEffect, useState } from "react";
import useFetch from "../Hooks/usefetch";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import supabase from "../config/SupaBaseClient";

const Login = () => {
  const [users, setUsers] = useState();
  const [name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  const LoginHandle = () => {
    if (name && Password) {
      const user = users.find(
        (user) => name === user.name && Password === user.password
      );

      if (!user) {
        toast.error("invalid password");
        return;
      }
      localStorage.setItem("user", user.id);
      localStorage.setItem("type", user.type);
      if (user.type === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error("Fill All Inputs");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Logo */}
      <div className="pt-8 pb-4 flex justify-center">
        <h1 className="text-3xl font-semibold tracking-tight select-none">
          Black<span className="text-yellow-500"> Banner</span>
        </h1>
      </div>

      {/* SignUp Card */}
      <div className="mx-auto w-full max-w-sm px-4">
        <div className="rounded border border-gray-300 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-medium mb-4">Login</h1>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Email */}
            {/* <div>
              <label className="block text-sm font-semibold mb-1">
                Email or mobile phone number
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div> */}

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold mb-1">
                  Password
                </label>
              </div>
              <input
                type="text"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Button */}
            <button
              onClick={LoginHandle}
              className="w-full rounded bg-[#f0c14b] py-2 text-sm font-medium text-black border border-[#a88734] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[#eeb933] active:bg-[#e6ac2c]"
            >
              Login
            </button>

            {/* Info */}
            <p className="text-xs text-gray-700 leading-relaxed">
              By continuing, you agree to BlackBanner's
              <span className="text-blue-700 hover:underline cursor-pointer">
                Conditions of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-700 hover:underline cursor-pointer">
                Privacy Notice
              </span>
              .
            </p>

            {/* Help */}
            <div>
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                ▸ Need help?
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-xs text-gray-500">BlackBanner?</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Create account */}
        <Link to="/Signup">
          <button className="w-full rounded border border-gray-300 bg-gray-100 py-2 text-sm hover:bg-gray-200">
            Create New Account
          </button>
        </Link>
        {/* Footer */}
        <div className="mt-10 pb-10 text-center text-xs text-gray-600">
          <div className="flex justify-center gap-4">
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
          <p className="mt-3">© {new Date().getFullYear()} BlackBanner</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
