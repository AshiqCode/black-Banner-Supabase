import { useEffect, useId, useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "../DashBoard/Loading";
import NavBar from "./NavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/SupaBaseClient";

const Checkout = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [products, setProducts] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user");
  const [data, setData] = useState(null);
  //   console.log(userId);
  // const { data, setData, Ispending } = useFetch(
  //   `http://localhost:3000/users/${userId}`
  // );
  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", userId)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setData(data);
      }
    };
    datafetch();
  }, [userId]);

  const userProvince = data?.province;
  const userCity = data?.city;
  const userStreet = data?.street;
  const userAddress = data?.address;
  const userNumber = data?.number;
  //   console.log(userProvince, userCity, userStreet, userAddress);

  // const cart = data.cart;
  //   console.log(cart);

  // useEffect(() => {
  //   if (cart && cartProducts.length === 0) {
  //     cart.forEach((product) => {
  //       fetch(`http://localhost:3000/products/${product.id}`)
  //         .then((res) => res.json())
  //         .then((json) => {
  //           setCartProducts((prev) => [
  //             ...prev,
  //             { ...json, quantity: product.quantity },
  //           ]);
  //           setOrderedProducts((prev) => [
  //             ...prev,
  //             { id: product.id, quantity: product.Quantity },
  //           ]);
  //         });
  //     });
  //   }
  // }, [cart]);

  //   console.log(cartProducts, "cartproducts");

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase
        .from("cart")
        .select()
        .eq("userId", userId);

      if (error) {
        console.log(error);
      }
      if (data) {
        // console.log(data);
        const ids = data.map((item) => item.productId);
        setProductIds(ids);
        setOrderInfo(data);
      }
    };
    datafetch();
  }, [userId]);
  console.log(productIds);
  console.log(orderInfo);

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setProducts(data);
      }
    };

    datafetch();
  }, [productIds]);
  console.log(products);

  const subTotal = products?.reduce((sum, product) => sum + product.price, 0);

  const shipping = products?.length * 4;
  const totalPrice = subTotal + shipping + cartProducts.length * 2;

  const orderData = {
    products: orderedProducts,
    subtotal: subTotal,
    shipping: shipping,
    total: totalPrice,
    deliveryAddress: userProvince + userCity + userStreet + userAddress,
    status: "pending",
    userId: userId,
  };

  const delivery_address = userProvince + userCity + userStreet + userAddress;
  const placeOrder = async () => {
    // console.log("Order Placed");
    // console.log(orderData);

    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   body: JSON.stringify(orderData),
    // });
    // const user = {
    //   Name: data.Name,
    //   Email: data.Email,
    //   Password: data.Password,
    //   Number: data.Number,
    //   Province: data.Province,
    //   City: data.City,
    //   Street: data.Street,
    //   Address: data.Address,
    // };
    // console.log(user);

    // fetch(`http://localhost:3000/users/${userId}`, {
    //   method: "PUT",
    //   body: JSON.stringify(user),
    // });

    const { data: orderInsertData, error: orderError } = await supabase
      .from("orders")
      .insert({
        userId,
        subtotal: subTotal,
        shipping,
        total: totalPrice,
        delivery_address,
        status: "pending",
      })
      .select()
      .single();

    const orderProducts = orderInfo.map((item) => ({
      order_id: orderInsertData.id, // link to the order
      quantity: item.quantity,
      product_id: item.productId,
    }));

    const { data: orderProductData, error: productError } = await supabase
      .from("order_products")
      .insert(orderProducts)
      .select();

    navigate("/ViewOrder");
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("userId", userId);
  };
  console.log(userId);

  // var stockIssue = true;
  // const handleValidation = () => {
  //   return new Promise((resolve, reject) => {
  //     let stockIssue = true;

  //     if (!cart || cart.length === 0) {
  //       resolve(true);
  //       return;
  //     }

  //     const fetchPromises = cart.map((product) =>
  //       fetch(`http://localhost:3000/products/${product.id}`)
  //         .then((res) => res.json())
  //         .then((json) => {
  //           const item = { ...json, quantity: product.Quantity };
  //           // console.log(item);

  //           if (item.quantity > item.StockQuantity) {
  //             if (item.StockQuantity === 0) {
  //               toast.warning(`Item ${item.Name} is out of stock`);
  //             } else {
  //               toast.warning(
  //                 `Available quantity of ${item.Name} is ${item.StockQuantity}`
  //               );
  //             }
  //             stockIssue = false;
  //           }
  //         })
  //         .catch(() => {
  //           stockIssue = false;
  //         })
  //     );

  //     Promise.all(fetchPromises)
  //       .then(() => resolve(stockIssue))
  //       .catch(reject);
  //   });
  // };

  const orderPlaceHandle = () => {
    if (userAddress && userCity && userProvince && userStreet && userNumber) {
      placeOrder();
    } else {
      toast.warning("Add your delivery address");
      navigate(`/Profile/${userId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Navbar */}
      <NavBar />
      {!data && (
        <div className="flex justify-center my-10">
          <Loading />
        </div>
      )}
      {/* Main Content */}

      {data && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 bg-gray-50">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">Checkout</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-800">
                  Shipping Information
                </h3>

                <div className="bg-gray-100/60 p-6 rounded-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products?.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-4 bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
                      >
                        {/* Product Image */}
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />

                        {/* Product Details */}
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {product.productName}
                            </p>
                          </div>

                          <p className="text-base font-bold text-gray-900 mt-2">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subTotal} $</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping} $</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{totalPrice} $</span>
                </div>
              </div>

              <button
                onClick={orderPlaceHandle}
                className="w-full mt-8 py-3 rounded-xl font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.98] transition text-black shadow-sm"
              >
                Place Order
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
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

export default Checkout;
