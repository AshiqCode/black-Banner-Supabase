import { useNavigate, useParams } from "react-router-dom";
import Loading from "../DashBoard/Loading";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { toast } from "react-toastify";
import supabase from "../../config/SupaBaseClient";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const [productIds, setProductIds] = useState([]);
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const param = useParams().user;

  const user = localStorage.getItem("user");

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase
        .from("cart")
        .select()
        .eq("userId", user);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setData(data);
        const productIds = data.map((item) => item.productId);
        setProductIds((prev) => [...prev, ...productIds]);
      }
    };
    datafetch();
  }, [param]);
  console.log(data);
  console.log(productIds);

  useEffect(() => {
    if (productIds.length > 0 && data) {
      const datafetch = async () => {
        const { data: productdata, error } = await supabase
          .from("products")
          .select("*")
          .in("id", productIds);

        if (error) {
          console.log(error);
          return;
        }

        const mergedProducts = productdata.map((productItem) => {
          const cartItem = data.find(
            (cart) => cart.productId === productItem.id
          );
          return {
            ...productItem,
            quantity: cartItem ? cartItem.quantity : 0,
          };
        });

        setProduct(mergedProducts);
      };
      datafetch();
    }
  }, [productIds, data]);
  console.log(product);

  const cart = data;

  const increaseQuantityHandle = async (productId) => {
    console.log(productId);
    if (isUpdating) return;
    setIsUpdating(true);
    const item = product.find((item) => item.id === productId);
    if (!item) {
      setIsUpdating(false);
      return;
    }

    if (productId === item.id) {
      if (item.stockQuantity > item.quantity) {
        const { data, error } = await supabase
          .from("cart")
          .update({ quantity: item.quantity + 1 })
          .match({ userId: user, productId: productId })
          .select();
        console.log("increse");
        console.log(data);
        console.log(product);
        setProduct((prev) =>
          prev.map((e) =>
            e.id === productId ? { ...e, quantity: e.quantity + 1 } : e
          )
        );
        setIsUpdating(false);
      } else {
        toast.warning(
          `You can't place more than  ${item.stockQuantity}  items`
        );
        setIsUpdating(false);
      }
    }
  };
  const decreaseQuantityHandle = async (productId) => {
    console.log(productId);
    if (isUpdating) return;
    setIsUpdating(true);
    const item = product.find((item) => item.id === productId);
    if (!item) {
      setIsUpdating(false);
      return;
    }
    if (productId === item.id) {
      if (item.quantity > 1) {
        const { data, error } = await supabase
          .from("cart")
          .update({ quantity: item.quantity - 1 })
          .match({ userId: user, productId: productId })
          .select();
        console.log("increse");
        console.log(data);
        console.log(product);
        setProduct((prev) =>
          prev.map((e) =>
            e.id === productId ? { ...e, quantity: e.quantity - 1 } : e
          )
        );
        setIsUpdating(false);
      } else {
        toast.warning(`You can't place less than 1 items`);
        setIsUpdating(false);
      }
    }
  };

  const removeItem = async (productId) => {
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .match({ userId: user, productId: productId })
      .select();
    if (error) {
      return;
    }
    setProduct((prev) => prev.filter((item) => item.id !== productId));
  };

  const placeOrder = () => {
    console.log("Order Placed");
    navigate("/CheckOut");
  };
  const handleValidation = async () => {
    if (!product || product.length === 0) {
      return true;
    }

    try {
      // 1. Get all current IDs from your local state
      const ids = product.map((p) => p.id);

      // 2. Fetch fresh stock data from Supabase for these products
      const { data: freshStock, error } = await supabase
        .from("products")
        .select("id, productName, stockQuantity")
        .in("id", ids);

      if (error) throw error;

      let stockIssue = false;

      // 3. Compare local cart quantity against database stock
      product.forEach((cartItem) => {
        const dbItem = freshStock.find((db) => db.id === cartItem.id);

        if (dbItem) {
          if (cartItem.quantity > dbItem.stockQuantity) {
            stockIssue = true;
            if (dbItem.stockQuantity === 0) {
              toast.warning(`Item ${dbItem.productName} is out of stock`);
            } else {
              toast.warning(
                `Only ${dbItem.stockQuantity} units of ${dbItem.productName} available`
              );
            }
          }
        }
      });

      // Returns true if NO issues were found
      return !stockIssue;
    } catch (err) {
      console.error("Validation error:", err);
      toast.error("Could not verify stock. Please try again.");
      return false;
    }
  };

  const checkOutHandle = () => {
    handleValidation().then((isValid) => {
      if (isValid) {
        placeOrder();
      } else {
        console.log("err");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Navbar */}
      <NavBar />
      {/* Main Content */}
      {!data && <Loading />}
      {data && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

          {product?.map((product, index) => {
            return (
              <div
                key={index}
                className="flex mt-6 flex-col sm:flex-row gap-4 bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.productName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    <span className="font-medium">{product.category}</span>
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          decreaseQuantityHandle(product.id);
                        }}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => {
                          increaseQuantityHandle(product.id);
                        }}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          removeItem(product.id);
                        }}
                        className="ml-2 text-sm text-red-500 hover:text-red-600 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            {product?.length !== 0 && (
              <button
                onClick={checkOutHandle}
                className="flex-1 py-3 px-8 mt-8 font-medium rounded-lg transition bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Check Out
              </button>
            )}
            {product?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-semibold mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added any items yet.
                </p>
                <a
                  href="/" // replace with your shop page route
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Continue Shopping
                </a>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="mt-auto pb-6 text-center text-xs text-gray-600  bg-gray-50">
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

export default Cart;
