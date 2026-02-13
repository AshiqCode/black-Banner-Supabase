import { useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "../DashBoard/Loading";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
const Products = () => {
  const { data, Ispending } = useFetch("http://localhost:3000/products");

  const urls = [
    {
      img: "https://www.eurokidsindia.com/blog/wp-content/uploads/2023/12/names-of-electronic-devices-in-english.jpg",
    },
    {
      img: "https://t4.ftcdn.net/jpg/08/73/34/47/240_F_873344730_GR5zxbekiofYCbcgyLLXOUHVxGKxwtsg.jpg",
    },
    {
      img: "https://www.shutterstock.com/image-illustration/group-home-appliances-consumer-electronics-600nw-2451385301.jpg",
    },
    {
      img: "https://media.bazaarvoice.com/Shutterstock_1875797686.png",
    },
  ];
  const [img, setImg] = useState(0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="relative w-full h-96 mt-10 max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">
          {/* Slider Images Container */}
          <div className="flex transition-transform duration-300 ease-in-out">
            {/* Example Images */}
            <img
              src={urls[img].img}
              alt="Slide 1"
              className="w-full object-fill  "
            />
          </div>

          {/* Left Button */}
          {/* Left Button */}
          {/* Left Button */}
          <button
            onClick={() => {
              if (img === 0) {
                setImg(3);
              } else {
                setImg(img - 1);
              }
            }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-white/70 to-white/50 hover:from-white/90 hover:to-white/70 text-gray-800 rounded-full p-4 shadow-xl backdrop-blur-md transition duration-300 flex items-center justify-center hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Button */}
          <button
            onClick={() => {
              if (img === 3) {
                setImg(0);
              } else {
                setImg(img + 1);
              }
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-white/70 to-white/50 hover:from-white/90 hover:to-white/70 text-gray-800 rounded-full p-4 shadow-xl backdrop-blur-md transition duration-300 flex items-center justify-center hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Products</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and organize your products
            </p>
          </div>

          {/* Loading */}
          {Ispending && (
            <div className="flex justify-center my-10">
              <Loading />
            </div>
          )}

          {/* Products Grid */}
          {!Ispending && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex flex-col"
                >
                  <Link to={`/ProductDetails/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.Name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />

                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.Name}
                      </h3>

                      <p className="text-yellow-600 font-semibold text-lg">
                        ${product.price}
                      </p>

                      <span className="inline-block w-fit text-xs font-medium text-red-600 px-3 py-1 rounded-full">
                        {product.StockQuantity === 0
                          ? "Item is out of stock"
                          : product.StockQuantity > 0 &&
                            product.StockQuantity <= 3
                          ? `${product.StockQuantity} item are left`
                          : null}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="px-4 pb-4 flex gap-3"></div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto pb-6 text-center text-xs text-gray-600 w-full  bg-gray-50">
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

export default Products;
