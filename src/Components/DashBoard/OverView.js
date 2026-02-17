import { useEffect, useState } from "react";
import supabase from "../../config/SupaBaseClient";

const Overview = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalExpense, setTotalExpense] = useState([]);
  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase.from("users").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setTotalUsers(data);
      }

      // fetch("http://localhost:3000/users")
      //   .then((res) => res.json())
      //   .then((json) => setTotalUsers(json));

      // fetch("http://localhost:3000/products")
      //   .then((res) => res.json())
      //   .then((json) => setTotalProducts(json));

      // fetch("http://localhost:3000/products")
      //   .then((res) => res.json())
      //   .then((json) => {
      //     const prices = json.map((product) => Number(product.price));
      //     setTotalExpense(prices);
      //   });
    };
    datafetch();
  }, []);

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase.from("products").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setTotalProducts(data);
      }

      // fetch("http://localhost:3000/products")
      //   .then((res) => res.json())
      //   .then((json) => {
      //     const prices = json.map((product) => Number(product.price));
      //     setTotalExpense(prices);
      //   });
    };
    datafetch();
  }, []);

  useEffect(() => {
    const datafetch = async () => {
      const { data, error } = await supabase.from("products").select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setTotalProducts(data);
        const prices = data.map((product) => Number(product.price));
        setTotalExpense(prices);
      }
    };
    datafetch();
  }, []);

  const total = totalExpense.reduce((a, b) => a + b, 0);
  return (
    <div className="flex-1 p-6">
      {/* Dashboard Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-100  p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-gray-700 text-2xl">{totalUsers.length}</p>
          </div>
          <div className="bg-gray-100  p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Total Products</h3>
            <p className="text-gray-700 text-2xl">{totalProducts.length}</p>
          </div>
          <div className="bg-gray-100  p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Expense</h3>
            <p className="text-gray-700 text-2xl">${total}</p>
          </div>
        </div>

        {/* More Dashboard Content */}
      </main>
    </div>
  );
};

export default Overview;
