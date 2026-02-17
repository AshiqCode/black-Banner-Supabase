import { useEffect, useState } from "react";
import Loading from "./Loading";
import { toast } from "react-toastify";
import DeletePopUp from "./DeletePopUp";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import supabase from "../../config/SupaBaseClient";
// import AddProduct from "./AddProduct";/
const Products = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [id, setID] = useState("");
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [prodctData, setProdctData] = useState(null);

  // const { data, setData, Ispending } = useFetch(
  //   "http://localhost:3000/products"
  // );

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase.from("products").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        // console.log(data);

        setProdctData(data);
      }
    };
    datafetch();
  }, []);

  const clearForm = () => {
    setProductName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategory("");
    setStockQuantity("");
    setID("");
  };

  const editHandle = (product) => {
    setIsEdit(true);
    setProductName(product.productName);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setCategory(product.category);
    setStockQuantity(product.stockQuantity);
    setID(product.id);
    console.log(product);

    // console.log(product.Name);
  };
  const saveEdits = async () => {
    if (isEdit) {
      // console.log(id);
      // console.log(editedProduct.id);
      // fetch(`http://localhost:3000/products/${id}`, {
      //   method: "PUT",
      //   body: JSON.stringify(payload),
      // });
      const { data, error } = await supabase
        .from("products")
        .update({
          productName,
          price,
          image,
          description,
          category,
          stockQuantity,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        const newArray = prodctData.map((product) => {
          if (id === product.id) {
            return data;
          } else {
            return product;
          }
        });
        setProdctData(newArray);
        setIsEdit(false);
        toast.success("Product Edited");
        clearForm();
        console.log(prodctData);
      }
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert({
          productName,
          price,
          image,
          description,
          category,
          stockQuantity,
        })
        .select()
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        toast.success("Product Added");
        setProdctData((prev) => [...prev, data]);
        clearForm();
        setIsAddProduct(false);
      }

      // fetch("http://localhost:3000/products", {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      // })
      //   .then((res) => res.json())
      //   .then((json) => {
      //     setData((prev) => [...prev, json]);
      //     clearForm();
      //     setIsAddProduct(false);
      //   });
    }
  };

  const deleteHandle = async () => {
    // fetch(`http://localhost:3000/products/${idToDelete}`, {
    //   method: "DELETE",
    // });
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", idToDelete)
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      setProdctData((prev) =>
        prev.filter((e) => {
          return e.id !== idToDelete;
        })
      );
      console.log(data);
    }

    toast.success("Product Deleted");
    // console.log(id);
    setIsDeletePopUp(false);
  };

  const cancelHandle = () => {
    setIsEdit(false);
    setIsAddProduct(false);
    setProductName("");
    setPrice("");
    setDescription("");
    setImage("");
    setStockQuantity("");
    setCategory("");
    setID("");
  };

  // console.log(data);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="h-16 bg-white shadow sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Page Header */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <button
              onClick={() => setIsAddProduct(true)}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>

          {/* Loading */}
          {!prodctData && <Loading />}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prodctData?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow border hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-t-xl"
                />

                <div className="p-4 flex flex-col flex-1 gap-2">
                  <h3 className="text-lg font-semibold">
                    {product.productName}
                  </h3>
                  <p className="font-medium">${product.price}</p>
                  <p>Stock: {product.stockQuantity}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <span className="mt-auto text-yellow-500 font-semibold">
                    {product.category}
                  </span>
                </div>

                <div className="px-4 pb-4 flex gap-2">
                  <button
                    onClick={() => editHandle(product)}
                    className="flex-1 py-2 bg-yellow-500 rounded hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setIdToDelete(product.id);
                      setIsDeletePopUp(true);
                    }}
                    className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Modal */}
          {(isEdit || isAddProduct) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl transform transition-all duration-200 scale-100">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {isAddProduct ? "Add Product" : "Edit Product"}
                  </h3>
                  <button
                    onClick={cancelHandle}
                    className="text-gray-400 hover:text-gray-600 transition text-xl leading-none"
                  >
                    &times;
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                    </div>

                    {/* Image URL */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                    </div>

                    {/* Category */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      >
                        <option value="">Select category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="books">Books</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
                  <button
                    onClick={cancelHandle}
                    className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg
                     hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveEdits}
                    className="px-5 py-2 text-sm font-semibold text-black bg-yellow-400 rounded-lg
                     hover:bg-yellow-500 transition shadow"
                  >
                    {isAddProduct ? "Add Product" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Popup */}
          {isDeletePopUp && (
            <DeletePopUp
              setIsDeletePopUp={setIsDeletePopUp}
              deletehandle={deleteHandle}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
