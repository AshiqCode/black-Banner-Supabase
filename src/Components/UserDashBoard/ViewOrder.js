import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import OrderDetails from "./OrderDetails";
import supabase from "../../config/SupaBaseClient";
const ViewOrders = () => {
  const user = localStorage.getItem("user");
  const [productId, setProductId] = useState("");
  const [data, setData] = useState(null);
  // const { data, setData } = useFetch("http://localhost:3000/orders");
  const [isPopUp, setIsPopUp] = useState(false);
  const orders = data?.filter((item) => item.userId === user);
  const [currentStatus, setCurrentStatus] = useState("");
  const [total, setTotal] = useState("");
  const [currenorderId, setCurrenorderId] = useState("");

  // console.log(orders);

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select()
        .eq("userId", user);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setData(data);
      }
    };
    datafetch();
  }, []);

  const handleViewDetails = (
    productId,
    currentStatus,
    total,
    currenorderId
  ) => {
    // console.log(productId);
    setIsPopUp(true);
    setProductId(productId);
    setTotal(total);
    setCurrenorderId(currenorderId);
    setCurrentStatus(currentStatus);
    // console.log(currentStatus);
  };
  // console.log(productId);

  const statusHandle = async (orderId) => {
    // fetch(`http://localhost:3000/orders/${orderId}`, {
    //   method: "PATCH",
    //   body: JSON.stringify({ status: "canceled" }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setData((prev) =>
    //       prev.map((item) =>
    //         item.id === json.id ? { ...json, user: item.user } : item
    //       )
    //     );
    //   });
    console.log(orderId);

    const { data: updatedOrder, error } = await supabase
      .from("orders")
      .update({ status: "canceled" })
      .eq("id", orderId)
      .select()
      .single();
    if (error) {
      console.log(error);
    }
    if (!updatedOrder) return;

    setData((prev) =>
      prev.map((item) => (item.id === updatedOrder.id ? updatedOrder : item))
    );
  };
  console.log(data);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <NavBar />
      <main className="flex-1  mx-auto w-full px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">My Orders</h2>

        {data?.length !== 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Section: Orders Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                      # Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                  {data?.map((product, index) => (
                    <tr
                      key={product.id}
                      className="group  hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-transparent transition-all"
                    >
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">
                            Order #{product.id}
                          </span>
                          <span className="text-xs text-gray-400">
                            Tap to inspect details
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {(() => {
                          const statusStyles = {
                            pending: {
                              bg: "bg-amber-100",
                              text: "text-amber-800",
                              dot: "bg-amber-500",
                            },
                            shipped: {
                              bg: "bg-blue-100",
                              text: "text-blue-800",
                              dot: "bg-blue-500",
                            },
                            delivered: {
                              bg: "bg-green-100",
                              text: "text-green-800",
                              dot: "bg-green-500",
                            },
                          };

                          const style = statusStyles[product.status] || {
                            bg: "bg-gray-100",
                            text: "text-gray-800",
                            dot: "bg-gray-500",
                          };

                          return (
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full animate-pulse ${style.dot}`}
                              />
                              {product.status}
                            </span>
                          );
                        })()}
                      </td>

                      <td className="px-6 py-5 text-right flex gap-2 justify-end">
                        {/* Details Button */}
                        <button
                          onClick={() =>
                            handleViewDetails(
                              product.products,
                              product.status,
                              product.total,
                              product.id
                            )
                          }
                          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
               text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white
               transition-all duration-300 overflow-hidden"
                        >
                          <span className="z-10">Details</span>
                          <span className="z-10 transform group-hover:translate-x-1 transition">
                            ➜
                          </span>
                          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" />
                        </button>
                        {(product.status === "confirmed" ||
                          product.status === "pending") && (
                          <button
                            onClick={() => {
                              statusHandle(product.id);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                          text-red-600 bg-red-50 hover:bg-red-600 hover:text-white
                          transition-all duration-300"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {data?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-semibold mb-4">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">
              You haven't placed any orders so far.
            </p>
            <a
              href="/"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Start Shopping
            </a>
          </div>
        )}
      </main>

      {isPopUp && (
        <OrderDetails
          productId={productId}
          setIsPopUp={setIsPopUp}
          orders={orders}
          currentStatus={currentStatus}
          total={total}
          currenorderId={currenorderId}
        />
      )}
      <footer className="mt-auto pb-6 text-center text-xs text-gray-600 bg-gray-50">
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

export default ViewOrders;
