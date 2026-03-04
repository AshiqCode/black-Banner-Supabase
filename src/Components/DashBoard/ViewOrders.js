import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import supabase from "../../config/SupaBaseClient";
import { useNavigate } from "react-router-dom";
const ViewOrders = () => {
  // const { data, setData, Ispending } = useFetch("http://localhost:3000/orders");

  // const [orderedProducts, setOrderedProducts] = useState([]);
  // const [status, setStatus] = useState("");
  // const [data, setData] = useState([]);
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();
  const statusOptions = [
    "pending",
    "canceled",
    "confirmed",
    "shipped",
    "delivered",
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  // console.log(data);
  // useEffect(() => {
  //   const fetchOrdersWithUsers = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/orders");
  //       const orders = await res.json();

  //       const ordersWithUsers = await Promise.all(
  //         orders.map(async (order) => {
  //           const userRes = await fetch(
  //             `http://localhost:3000/users/${order.userId}`
  //           );
  //           const user = await userRes.json();

  //           return {
  //             ...order,
  //             user,
  //           };
  //         })
  //       );

  //       setData(ordersWithUsers);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchOrdersWithUsers();
  // }, []);

  // useEffect(() => {
  //   data.map((product) => {
  //     product.products.map((item) => {
  //       fetch(`http://localhost:3000/products/${item.id}`)
  //         .then((res) => res.json())
  //         .then((json) => {
  //           setOrderedProducts((prev) => [
  //             ...prev,
  //             { ...json, quantity: product.Quantity },
  //           ]);
  //         });
  //     });
  //   });
  // }, [data]);

  const statusHandle = async (statusvaluse, orderId) => {
    console.log(statusvaluse, orderId);
    const { data } = await supabase
      .from("orders")
      .update({ status: statusvaluse })
      .eq("id", orderId);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: statusvaluse } : order
      )
    );

    if(data){
      console.log(data);
      
    }
    // fetch(`http://localhost:3000/orders/${orderId}`, {
    //   method: "PATCH",
    //   body: JSON.stringify({ status: statusvaluse }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setData((prev) =>
    //       prev.map((item) =>
    //         item.id === json.id ? { ...json, user: item.user } : item
    //       )
    //     );
    //   });
  };

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          created_at,
          subtotal,
          shipping,
          total,
          delivery_address,
          status,
          users (
            id,
            name,
            email,
            number,
            province,
            city,
            street,
            address,
            type
          ),
          order_products (
            quantity,
            ...products (
              id,
              image,
              productName,
              price,
              description
            )
          )
        `
        )
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
        console.log(data);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
     <header className="flex justify-between items-center px-4 sm:px-8 py-4 bg-white border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
            aria-label="Open sidebar"
          >
            <span className="text-xl leading-none">☰</span>
          </button>

          <h1 className="text-3xl font-bold tracking-tight select-none text-gray-900">
            Black<span className="text-yellow-500">Banner</span>
          </h1>
        </div>

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

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        <div
          onClick={() => setSidebarOpen(false)}
          className={[
            "md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity",
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          ].join(" ")}
        />

        {/* Sidebar */}
        <aside
          className={[
            "w-64 bg-white border-r border-gray-200 ",
            "md:static md:translate-x-0 md:z-auto",
            "fixed inset-y-0 left-0 z-50 transform transition-transform duration-200",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
            <span className="font-semibold text-gray-900">Menu</span>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
              aria-label="Close sidebar"
            >
              <span className="text-xl leading-none">✕</span>
            </button>
          </div>
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Orders</h1>

          <div className="space-y-6">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:gap-4 text-gray-500 text-sm">
                    <span>User: {order.users.name}</span>
                    <span>Email: {order.users.email}</span>
                    <span>Number: {order.users.number}</span>
                  </div>
                </div>

                {/* Order Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between mb-5 text-gray-600 text-sm">
                  <p>
                    <span className="font-semibold">Total:</span> ${order.total}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery:</span>{" "}
                    {order?.delivery_address}
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <label className="text-gray-700 font-medium">
                    Change Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => statusHandle(e.target.value, order.id)}
                    disabled={
                      order.status === "canceled" ||
                      order.status === "delivered"
                    }
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    {statusOptions
                      .filter((status) => {
                        const currentIndex = statusOptions.indexOf(order.status);
                        const optionIndex = statusOptions.indexOf(status);
                        return optionIndex >= currentIndex;
                      })
                      .map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Products */}
                <h3 className="text-md font-semibold mb-3 text-gray-800">
                  Products:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order?.order_products?.map((productDetails, index) => {
                    if (!productDetails) return null;

                    return (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                      >
                        <img
                          src={productDetails.image}
                          alt={productDetails.name}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div className="text-sm">
                          <p className="font-medium text-gray-800">
                            {productDetails.name}
                          </p>
                          <p className="text-gray-500">
                            Category: {productDetails.category}
                          </p>
                          <p className="text-gray-500">
                            Price: ${productDetails.price}
                          </p>
                          <p className="text-gray-500">
                            Quantity:{" "}
                            {productDetails.quantity ||
                              productDetails.quantity ||
                              1}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewOrders;