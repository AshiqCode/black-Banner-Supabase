import { useNavigate, useParams } from "react-router-dom";
import Loading from "../DashBoard/Loading";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import ProductReview from "./ProductReview";
import supabase from "../../config/SupaBaseClient";

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const [currentCart, setCurrentCart] = useState(null);
  const param = useParams().id;
  const user = localStorage.getItem("user");
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
  console.log(param);

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase
        .from("cart")
        .select()
        .match({ userId: user, productId: param }).maybeSingle();
      // .eq("userId", user)
      // .eq("productId", param);

      if (error) {
        // console.log(error);
      }
      if (data) {
        console.log(data);
        setCurrentCart(data);
      }
    };
    datafetch();
  }, [param, user]);
  console.log(currentCart);

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
  const AddToCartHandle = async () => {
  if (!user) {
    toast.warning("Your cart awaits, just log in!");
    navigate("/login");
    return;
  }

  console.log(data);

  if (currentCart) {
    if (currentCart.quantity < data.stockQuantity) {
      const { data: updatedCart, error } = await supabase
        .from("cart")
        .update({
          quantity: currentCart.quantity + 1,
        })
        .eq("id", currentCart.id)
        .select();

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Product updated successfully");
      setCurrentCart(updatedCart[0]);
    } else {
      toast.warning(
        `You can't place more than ${data.stockQuantity} items.`
      );
    }
  } else {
    const { data: insertedCart, error } = await supabase
      .from("cart")
      .insert({ userId: user, productId: param, quantity: 1 })
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Product Added successfully");
    setCurrentCart(insertedCart[0]);
  }
};

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {!data && (
        <div className="flex justify-center my-8 sm:my-10 px-4">
          <Loading />
        </div>
      )}
      <NavBar />

      {/* Main Content */}
      <main className="flex justify-center items-start capitalize px-4 sm:px-6 lg:px-8 bg-gray-50 py-6 sm:py-10">
        {data && (
          <div className="max-w-5xl mt-6 sm:mt-12 w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6">
            <div className="w-full h-64 sm:h-80 md:h-96 relative rounded-xl overflow-hidden shadow-md">
              <img
                src={data.image}
                alt={data.Name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 break-words">
                {data.productName}
              </h1>

              <span className="inline-block w-fit text-xs font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                {data.category}
              </span>

              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                ${data.price}
              </p>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base break-words">
                {data.Description}
              </p>

              {stockStatus && (
                <span className="inline-block w-fit text-xs font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {stockStatus}
                </span>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                <button
                  disabled={isOutOfStock}
                  onClick={AddToCartHandle}
                  className={`w-full sm:flex-1 py-3 font-medium rounded-lg transition
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
              <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 border-t pt-4">
                ✔ Secure payment
                <br />
                ✔ Fast delivery
                <br />✔ Easy returns
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="px-0 sm:px-6 lg:px-8">
        <ProductReview ProductId={param} />
      </div>
    </div>
  );
};

export default ProductDetails;