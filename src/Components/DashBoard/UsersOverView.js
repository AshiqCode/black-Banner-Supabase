import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "./Loading";
import DeletePopUp from "./DeletePopUp";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import supabase from "../../config/SupaBaseClient";

const UsersOverView = () => {
  const [data, setData] = useState();

  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const [id, setId] = useState("");
  const pageSize = 5;
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = usersData.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select();

      if (error) {
        console.log(error);
      }
      if (data) {
        setData(data);
        const users = data.filter((user) => user.type !== "admin");
        setUsersData(users);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {

  // }, [data]);

  const deletehandle = async () => {
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    setUsersData(
      usersData.filter((e) => {
        return e.id !== id;
      })
    );
    setIsDeletePopUp(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="h-16 bg-white shadow sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Users <span className="text-yellow-500">Overview</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and review all registered users in your system
            </p>
          </div>

          {/* Loading */}
          {!data && (
            <div className="flex justify-center my-10">
              <Loading />
            </div>
          )}

          {/* Table */}
          {data && (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{user.name}</td>
                      <td className="px-6 py-4 text-sm break-all">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm tracking-widest">
                        {user.password}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setId(user.id);
                            setIsDeletePopUp(true);
                          }}
                          className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
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
                    currentPage === 0
                      ? "bg-gray-300"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  Prev
                </button>

                {Array.from({
                  length: Math.ceil(usersData.length / pageSize),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index
                        ? "bg-red-500 text-white"
                        : "bg-black text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={
                    currentPage === Math.ceil(usersData.length / pageSize) - 1
                  }
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === Math.ceil(usersData.length / pageSize) - 1
                      ? "bg-gray-300"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Delete Popup */}
          {isDeletePopUp && (
            <DeletePopUp
              setIsDeletePopUp={setIsDeletePopUp}
              deletehandle={deletehandle}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersOverView;
