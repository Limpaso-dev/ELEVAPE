import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API, BASE_URL } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load products");
      });
  }, []);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");
    addToCart(product);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 space-y-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        Our Products
      </h1>

      {/* 🔥 FIXED GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

        {products.map((p) => (
          <div
            key={p._id}
            className="glass p-3 sm:p-4 rounded-xl hover:-translate-y-1 hover:shadow-xl transition duration-300 flex flex-col"
          >

            {/* IMAGE */}
            <div className="bg-black/30 rounded-lg p-3 h-36 sm:h-44 flex items-center justify-center relative">

              {/* STOCK BADGE */}
              <span
                className={`absolute top-2 left-2 text-[10px] sm:text-xs px-2 py-1 rounded ${
                  p.inStock ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {p.inStock ? "In Stock" : "Out of Stock"}
              </span>

              <img
                src={`${BASE_URL}${p.image}`}
                alt={p.name}
                className="h-full object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />
            </div>

            {/* INFO */}
            <div className="mt-2 sm:mt-3 flex flex-col flex-grow">
              <h2 className="text-sm sm:text-base font-semibold line-clamp-1">
                {p.name}
              </h2>

              <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">
                {p.description || "Premium product"}
              </p>

              <p className="text-base sm:text-lg font-bold text-accent mt-1">
                ${p.price}
              </p>

              <button
                onClick={() => handleAddToCart(p)}
                disabled={!p.inStock}
                className={`mt-2 sm:mt-3 w-full p-2 rounded text-xs sm:text-sm font-semibold transition ${
                  p.inStock
                    ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {p.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}