import { useEffect, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ViewOrders = () => {
  // const { data, setData, Ispending } = useFetch("http://localhost:3000/orders");

  const [orderedProducts, setOrderedProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const statusOptions = [
    "pending",
    "canceled",
    "confirmed",
    "shipped",
    "delivered",
  ];
  // console.log(data);
  useEffect(() => {
    const fetchOrdersWithUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders");
        const orders = await res.json();

        const ordersWithUsers = await Promise.all(
          orders.map(async (order) => {
            const userRes = await fetch(
              `http://localhost:3000/users/${order.userId}`
            );
            const user = await userRes.json();

            return {
              ...order,
              user,
            };
          })
        );

        setData(ordersWithUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrdersWithUsers();
  }, []);

  useEffect(() => {
    data.map((product) => {
      product.products.map((item) => {
        fetch(`http://localhost:3000/products/${item.id}`)
          .then((res) => res.json())
          .then((json) => {
            setOrderedProducts((prev) => [
              ...prev,
              { ...json, quantity: product.Quantity },
            ]);
          });
      });
    });
  }, [data]);

  const statusHandle = (statusvaluse, orderId) => {
    console.log(statusvaluse, orderId);

    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: statusvaluse }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData((prev) =>
          prev.map((item) =>
            item.id === json.id ? { ...json, user: item.user } : item
          )
        );
      });
  };

  console.log(data);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="h-16 bg-white shadow sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Orders</h1>

          <div className="space-y-6">
            {data.map((order) => (
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
                    <span>User: {order.user.Name}</span>
                    <span>Email: {order.user.Email}</span>
                    <span>Number: {order.user.Number}</span>
                  </div>
                </div>

                {/* Order Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between mb-5 text-gray-600 text-sm">
                  <p>
                    <span className="font-semibold">Total:</span> ${order.total}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery:</span>{" "}
                    {order.deliveryAddress}
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
                        const currentIndex = statusOptions.indexOf(
                          order.status
                        );
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
                  {order.products.map((item) => {
                    const productDetails = orderedProducts.find(
                      (p) => p.id === item.id
                    );
                    if (!productDetails) return null;

                    return (
                      <div
                        key={item.id}
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
                            {item.quantity || productDetails.quantity || 1}
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
