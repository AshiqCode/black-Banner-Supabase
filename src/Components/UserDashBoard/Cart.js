import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../Hooks/usefetch";
import Loading from "../DashBoard/Loading";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  // const [isProceed, setIsProceed] = useState(true);

  const param = useParams().user;
  const { data, setData, Ispending } = useFetch(
    `http://localhost:3000/users/${param}`
  );
  const cart = data.cart;

  useEffect(() => {
    if (cart && cartProducts.length === 0) {
      cart.map((product) => {
        fetch(`http://localhost:3000/products/${product.id}`)
          .then((res) => res.json())
          .then((json) => {
            setCartProducts((prev) => [
              ...prev,
              { ...json, quantity: product.Quantity },
            ]);
          });
      });
    }
  }, [cart]);
  // console.log(data.cart, "Quanity");

  const increaseQuantityHandle = (productId) => {
    // console.log(productId);
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId) {
        if (product.StockQuantity > product.quantity) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          toast.warning(
            `You can't place more than  ${product.StockQuantity}  items`
          );
        }
      }
      return product;
    });
    setCartProducts(updatedCart);
    const updatedData = { ...data };
    updatedData.cart = updatedCart.map((item) => ({
      id: item.id,
      Quantity: item.quantity, // match your original cart structure
    }));
    setData(updatedData);

    // Update backend
    fetch(`http://localhost:3000/users/${param}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  };
  const decreaseQuantityHandle = (productId) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setCartProducts(updatedCart);

    const updatedData = { ...data };
    updatedData.cart = updatedCart.map((item) => ({
      id: item.id,
      Quantity: item.quantity,
    }));
    setData(updatedData);

    // Update backend
    fetch(`http://localhost:3000/users/${param}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  };

  const removeItem = (productId) => {
    const newCart = cartProducts.filter((item) => item.id !== productId);
    // console.log(cartProducts, newCart);
    setCartProducts(newCart);

    // console.log(newCart);

    const newData = data;
    const newCartIDS = newData.cart.filter((item) => item.id !== productId);

    newData.cart = newCartIDS;
    // console.log(newData);
    setData(newData);
    fetch(`http://localhost:3000/users/${param}`, {
      method: "PUT",
      body: JSON.stringify(newData),
    });
  };

  const placeOrder = () => {
    console.log("Order Placed");
    navigate("/CheckOut");
  };
  // var stockIssue = true;
  const handleValidation = () => {
    return new Promise((resolve, reject) => {
      let stockIssue = true;

      if (!cart || cart.length === 0) {
        resolve(true);
        return;
      }

      const fetchPromises = cart.map((product) =>
        fetch(`http://localhost:3000/products/${product.id}`)
          .then((res) => res.json())
          .then((json) => {
            const item = { ...json, quantity: product.Quantity };
            if (item.quantity > item.StockQuantity) {
              if (item.StockQuantity === 0) {
                toast.warning(`Item ${item.Name} is out of stock`);
              } else {
                toast.warning(
                  `Available quantity of ${item.Name} is ${item.StockQuantity}`
                );
              }
              stockIssue = false;
            }
          })
          .catch(() => {
            stockIssue = false;
          })
      );

      Promise.all(fetchPromises)
        .then(() => resolve(stockIssue))
        .catch(reject);
    });
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
      {Ispending && <Loading />}
      {!Ispending && (
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

          {cartProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="flex mt-6 flex-col sm:flex-row gap-4 bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.Name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.Name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    <span className="font-medium">{product.Category}</span>
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.Description}
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
            {cartProducts.length !== 0 && (
              <button
                onClick={checkOutHandle}
                className="flex-1 py-3 px-8 mt-8 font-medium rounded-lg transition bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Check Out
              </button>
            )}
            {cartProducts.length === 0 && (
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
