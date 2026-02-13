import { useEffect, useState } from "react";
import ReviewPupUp from "./ReviewPupUp";

const OrderDetails = ({
  productId,
  setIsPopUp,
  orders,
  currentStatus,
  total,
  currenorderId,
}) => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [reviewPupUp, setReviewPupUp] = useState(false);
  const [currentProductId, setcurrentProductId] = useState("");

  useEffect(() => {
    if (productId && orderedProducts.length === 0) {
      productId.map((product) => {
        fetch(`http://localhost:3000/products/${product.id}`)
          .then((res) => res.json())
          .then((json) => {
            setOrderedProducts((prev) => [
              ...prev,
              { ...json, quantity: product.Quantity },
            ]);
          });
      });
    }
  }, [productId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto scroll-smooth p-8">
        <button
          onClick={() => {
            setIsPopUp(false);
          }}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors text-3xl font-bold"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-gray-900  pb-4">
          Order Details
        </h1>

        <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-2xl shadow-lg">
          {/* Delivery Address & Total Price */}

          {/* Products Grid */}
          <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-3">
            {orderedProducts.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.Name}
                    className="h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                      {item.Name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Category:{" "}
                      <span className="font-medium text-gray-700">
                        {item.Category}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500 line-clamp-3">
                      Description:{" "}
                      <span className="font-medium text-gray-700">
                        {item.Description}
                      </span>
                    </p>
                  </div>

                  <div className="pt-3 border-t text-sm flex justify-between items-center text-gray-600">
                    <span>Ordered Quantity</span>

                    {currentStatus === "delivered" && (
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800">
                          {productId[index].quantity}
                        </span>

                        <button
                          onClick={() => {
                            setReviewPupUp(true);
                            setcurrentProductId(productId[index].id);
                          }}
                          className="text-xs px-2 py-1 border rounded-md text-green-600 border-green-600 hover:bg-green-50"
                        >
                          Review Product
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" p-5 mt-4 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              Delivery Address
            </div>
            <div className="text-gray-600 mb-4">
              {orders[0].deliveryAddress}
            </div>

            <div className="pt-3 border-t text-sm flex justify-between text-gray-600">
              <span className="font-medium">Total Price</span>
              <span className="font-semibold text-gray-800">{total}</span>
            </div>
          </div>
        </div>
      </div>

      {reviewPupUp && (
        <ReviewPupUp
          setReviewPupUp={setReviewPupUp}
          currentProductId={currentProductId}
          currenorderId={currenorderId}
        />
      )}
    </div>
  );
};

export default OrderDetails;
