import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { token, logout } = useContext(AuthContext);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleView3D = (id) => {
    if (!token) {
      // if not logged in redirect to login
      navigate(`/login?redirect=/viewer/${id}`);
    } else {
      navigate(`/viewer/${id}`);
    }
  };

  return (
    <div className="p-6">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Design3D </h1>
        <div>
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Product Gallery */}
      <h2 className="text-xl font-semibold mb-4">Product Gallery</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-semibold">₹{product.price}</p>
              <button
                onClick={() => handleView3D(product._id)}
                className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                View 3D Model
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
