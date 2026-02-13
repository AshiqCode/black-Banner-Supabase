import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = ({ setIsAddProduct, setData }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const AddProductHandle = () => {
    if (productName && price && description && image && category) {
      const product = {
        Name: productName,
        price,
        Description: description,
        Category: category,
        image,
      };

      fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((json) => {
          setData((prev) => [...prev, json]);
        });
      // setData((prev) => [...prev, product]);

      toast.success("Product Added");

      setProductName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
      setIsAddProduct(false);
    } else {
      toast.error("Fill All Inputs");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Add Product</h2>
          <button
            onClick={() => setIsAddProduct(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-800
                       border border-gray-300 rounded-md
                       placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                       transition"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-800
                       border border-gray-300 rounded-md
                       placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                       transition"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-800
                       border border-gray-300 rounded-md
                       placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                       transition"
          />

          <textarea
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-800
                       border border-gray-300 rounded-md
                       placeholder-gray-400 resize-none
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                       transition"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-800
                       border border-gray-300 rounded-md bg-white
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                       transition"
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="other">Other</option>
          </select>

          <button
            onClick={AddProductHandle}
            className="mt-2 w-full py-2 rounded-md bg-yellow-500 text-black font-semibold
                       hover:bg-yellow-600 transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
