import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "./Loading";

import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import supabase from "../../config/SupaBaseClient";
import { type } from "@testing-library/user-event/dist/type";

const Admins = () => {
  const [adminData, setAdminData] = useState([]);
  const [users, setUsers] = useState();
  const [isaddAdmin, setIsaddAdmin] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // current page index
  const pageSize = 5; // number of admins per page
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentAdmins = adminData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(adminData.length / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        setAdminData(data);
      }
    };
    fetchData();
  }, []);
  const handleAddAdmin = async () => {
    const { data, error } = await supabase
      .from("users")
      .insert({ name: Name, email: Email, password: Password, type: "admin" })
      .select()
      .single();
    if (error) {
      console.log(error);
    }
    if (data) {
      setUsers(data);
      setIsaddAdmin(false);
      toast.success("Admin Added");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="h-16 bg-white shadow sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Admins <span className="text-yellow-500">Overview</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage and review all registered users in your system
              </p>
            </div>

            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:scale-95 transition"
              onClick={() => setIsaddAdmin(true)}
            >
              Add Admin
            </button>
          </div>

          {/* Loading */}
          {/* {Ispending && (
            <div className="flex justify-center my-10">
              <Loading />
            </div>
          )} */}

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Password
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentAdmins.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{user.name}</td>
                    <td className="px-6 py-4 text-sm break-all">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm tracking-widest">
                      {user.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === 0 ? "bg-gray-300" : "bg-yellow-500 text-white"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages - 1
                    ? "bg-gray-300"
                    : "bg-yellow-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Add Admin Modal */}
          {isaddAdmin && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                <button
                  className="absolute top-3 right-3 text-xl"
                  onClick={() => setIsaddAdmin(false)}
                >
                  &times;
                </button>

                <h3 className="text-xl font-semibold mb-4">Add Admin</h3>

                <div className="flex flex-col gap-4">
                  <input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className="border px-4 py-2 rounded"
                  />
                  <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-4 py-2 rounded"
                  />
                  <input
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border px-4 py-2 rounded"
                  />
                </div>

                <button
                  onClick={handleAddAdmin}
                  className="mt-6 w-full bg-yellow-500 text-white py-2 rounded"
                >
                  Add Admin
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admins;
