import { useNavigate, useParams } from "react-router-dom";
import Loading from "../DashBoard/Loading";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import ProductReview from "./ProductReview";
import supabase from "../../config/SupaBaseClient";

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const param = useParams().id;

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase
        .from("products")
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
    datafetch();
  }, [param]);

  const user = localStorage.getItem("user");
  // const { data, Ispending } = useFetch(
  //   `http://localhost:3000/products/${param}`
  // );

  const [stockStatus, setStockStatus] = useState("");
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  useEffect(() => {
    if (!data) return;

    if (data.stockQuantity === 0) {
      setStockStatus("Item is out of stock");
      setIsOutOfStock(true);
    } else if (data.stockQuantity > 0 && data.stockQuantity <= 3) {
      setStockStatus(data.stockQuantity + " Items are left");
    } else {
      setStockStatus();
    }
  }, [data]);

  const navigate = useNavigate();
  const AddToCartHandle = () => {
    if (user) {
      fetch(`http://localhost:3000/users/${user}`)
        .then((response) => response.json())
        .then((user) => {
          var mergedObj;
          if (user.cart) {
            const item = user.cart.find((cart) => param === cart.id);
            if (item) {
              if (item.Quantity >= data.StockQuantity) {
                toast.warning(
                  `You can't place more than ${data.StockQuantity} items.`
                );
                return;
              }

              mergedObj = {
                ...user,
                cart: user.cart.map((cart) =>
                  cart.id === param
                    ? { ...cart, Quantity: cart.Quantity + 1 }
                    : cart
                ),
              };
            } else {
              mergedObj = {
                ...user,
                cart: [...user.cart, { id: param, Quantity: 1 }],
              };
            }
          } else {
            mergedObj = {
              ...user,
              cart: [{ id: param, Quantity: 1 }],
            };
          }

          fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(mergedObj),
          });
          toast.success("Product Added successfully");
        });
    } else {
      toast.warning("Your cart awaits, just log in!");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {!data && (
        <div className="flex justify-center my-10">
          <Loading />
        </div>
      )}
      <NavBar />

      {/* Main Content */}
      <main className="flex justify-center items-start capitalize  px-4 bg-gray-50">
        {data && (
          <div className="max-w-5xl mt-12 w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="w-full h-96 relative rounded-xl overflow-hidden shadow-md">
              <img
                src={data.image}
                alt={data.Name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl font-semibold  text-gray-900">
                {data.productName}
              </h1>

              <span className="inline-block w-fit text-xs font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                {data.category}
              </span>

              <p className="text-2xl font-bold text-gray-900">${data.price}</p>

              <p className="text-gray-600 leading-relaxed">
                {data.Description}
              </p>

              {stockStatus && (
                <span className="inline-block w-fit text-xs font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {stockStatus}
                </span>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  disabled={isOutOfStock}
                  onClick={AddToCartHandle}
                  className={`flex-1 py-3 font-medium rounded-lg transition
      ${
        isOutOfStock
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-yellow-500 hover:bg-yellow-400 text-black"
      }
    `}
                >
                  Add to Cart
                </button>
              </div>

              {/* Extra Info */}
              <div className="mt-6 text-sm text-gray-500 border-t pt-4">
                ✔ Secure payment
                <br />
                ✔ Fast delivery
                <br />✔ Easy returns
              </div>
            </div>
          </div>
        )}
      </main>

      <ProductReview ProductId={param} />
    </div>
  );
};

export default ProductDetails;
