import { useParams } from "react-router-dom";
import Loading from "../DashBoard/Loading";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import supabase from "../../config/SupaBaseClient";

const Profile = () => {
  const param = useParams().user;
  // const { data, setData, Ispending } = useFetch(
  //   `http://localhost:3000/users/${param}`
  // );
  const [data, setData] = useState(null);
  // console.log(param);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", param)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setData(data);
      }
    };
    fetchData();
  }, [param]);
  const [isEdit, setIsEdit] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [Name, setFullName] = useState(data?.name);
  const [Email, setEmail] = useState(data?.email);
  const [Password, setPassword] = useState(data?.password);
  const [Number, setNumber] = useState(data?.number);
  const [Province, setProvince] = useState(data?.province);
  const [City, setCity] = useState(data?.city);
  const [Street, setStreet] = useState(data?.street);
  const [Address, setAddress] = useState(data?.address);
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const cart = data.cart;
  useEffect(() => {
    if (data) {
      setFullName(data.name || "");
      setEmail(data.email || "");
      setPassword(data.password || "");
      setNumber(data.number || "");
      setProvince(data.province || "");
      setCity(data.city || "");
      setStreet(data.street || "");
      setAddress(data.address || "");
    }
  }, [data]);
  const cancleHandle = () => {
    setIsEdit(false);
  };
  const saveEdits = async () => {
    if (Name && Password) {
      // var newUser = {
      //   Name: Name,
      //   Email: Email,
      //   Password: Password,
      //   Number: Number,
      //   Province: Province,
      //   City: City,
      //   Street: Street,
      //   Address: Address,
      // };

      // newUser = { ...newUser, cart };
      // console.log(newUser);
      // setData(newUser);

      // fetch(`http://localhost:3000/users/${param}`, {
      //   method: "PUT",
      //   body: JSON.stringify(newUser),
      // });

      const { data } = await supabase
        .from("users")
        .update({
          name: Name,
          email: Email,
          password: Password,
          number: Number,
          province: Province,
          city: City,
          street: Street,
          address: Address,
        })
        .eq("id", param)
        .select()
        .single();
      setData(data);

      toast.success("Profile Edited");
      setIsEdit(false);
    } else {
      toast.warning("Name and Password is nasseryry");
    }
  };

  const changePassword = async () => {
    if (Password && NewPassword && ConfirmPassword) {
      if (data.password === Password) {
        if (ConfirmPassword !== NewPassword) {
          toast.error("Confirm Password Again.");
        } else {
          // var userData = data;
          // userData.Password = NewPassword;
          // fetch(`http://localhost:3000/users/${param}`, {
          //   method: "PUT",
          //   body: JSON.stringify(userData),
          // });
          // // setData(userData);
          // toast.success("Password Change successfully ");
          // setIsChangePassword(false);
          const { data } = await supabase
            .from("users")
            .update({
              password: NewPassword,
            })
            .eq("id", param)
            .select()
            .single();
          setData(data);
          toast.success("Password Change successfully ");
          setIsChangePassword(false);
        }
      } else {
        toast.error("Current password is incorrect.");
      }
    } else {
      toast.error("Fill All Inputs.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      {!data && <Loading />}
      {data && (
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Your Account</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xl font-bold">
                  {data.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{data.name}</h3>
                  <p className="text-sm text-gray-600">
                    Registered BlackBanner User
                  </p>
                </div>
              </div>

              {/* About User */}
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Welcome to <span className="font-semibold">BlackBanner</span>,{" "}
                {data.name}. This profile helps you manage your account, track
                your activity, and enjoy a seamless shopping experience. Your
                account is designed to give you quick access to products,
                orders, and personalized features.
              </p>
            </div>

            {/* Account Details */}
            <div className="md:col-span-2 bg-white rounded-xl shadow border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Account Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <p className="font-medium">{data.name}</p>
                </div>

                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{data.email}</p>
                </div>

                <div>
                  <p className="text-gray-500">Number</p>
                  <p className="font-medium">{data.number ? Number : "..."}</p>
                </div>

                <div>
                  <p className="text-gray-500">Province</p>
                  <p className="font-medium">
                    {data.province ? Province : "..."}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">City</p>
                  <p className="font-medium">{data.city ? City : "..."}</p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Building / House No / Floor / Street
                  </p>
                  <p className="font-medium">{data.street ? Street : "..."}</p>
                </div>

                <div>
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">
                    {data.address ? Address : "..."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsEdit(true);
                  }}
                  className="px-5 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setIsChangePassword(true);
                  }}
                  className="px-5 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {isEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
              {/* Form Container */}
              <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
                {/* Title */}
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Save Edit
                  </h2>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={Name}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter Full Name"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                  </div>

                  {/* Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Number
                    </label>
                    <input
                      type="number"
                      value={Number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Enter Number"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                  </div>

                  {/* Province */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Province
                    </label>
                    <input
                      type="text"
                      value={Province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Province"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={City}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                  </div>

                  {/* Street */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Street
                    </label>
                    <input
                      type="text"
                      value={Street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Street"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                  </div>

                  {/* Address (Full Width) */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-center gap-6">
                  <button
                    onClick={saveEdits}
                    className="w-36 rounded bg-[#f0c14b] py-2 text-sm font-medium border border-[#a88734] hover:bg-[#eeb933] transition"
                  >
                    Save Edits
                  </button>

                  <button
                    onClick={cancleHandle}
                    className="w-36 rounded bg-gray-200 py-2 text-sm font-medium hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {isChangePassword && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
              {/* Container */}
              <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                {/* Title */}
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Change Password
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Please enter your current and new password
                  </p>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4">
                  {/* Current Password */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-500"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {/* New Password */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-9 text-gray-500"
                    >
                      {showNewPassword ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {/* Confirm New Password */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-9 text-gray-500"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-center gap-6">
                  <button
                    onClick={changePassword}
                    className="w-36 rounded bg-[#f0c14b] py-2 text-sm font-medium border border-[#a88734] hover:bg-[#eeb933] transition"
                  >
                    Update Password
                  </button>

                  <button
                    onClick={() => setIsChangePassword(false)}
                    className="w-36 rounded bg-gray-200 py-2 text-sm font-medium hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
      {/* Footer */}
      <footer className="mt-auto pb-6 text-center text-xs text-gray-600 ">
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

export default Profile;
