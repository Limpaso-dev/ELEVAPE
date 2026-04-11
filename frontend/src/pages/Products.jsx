import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const price = Number(p.price);

          const compare =
            p.compareAtPrice && !isNaN(p.compareAtPrice)
              ? Number(p.compareAtPrice)
              : null;

          const hasDiscount =
            compare !== null && compare > price;

          const discountPercent = hasDiscount
            ? Math.round(((compare - price) / compare) * 100)
            : 0;

          return (
            <div
              key={p._id}
              className="glass p-4 rounded-xl transition transform hover:-translate-y-2 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative bg-black/30 rounded-lg p-4 flex items-center justify-center h-52 overflow-hidden">

                {hasDiscount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    SALE
                  </span>
                )}

                {!p.inStock && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                    <span className="text-red-400 font-bold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* ✅ FINAL FIX */}
                <img
                  src={`http://localhost:5000${p.image}`}
                  alt={p.name}
                  className="h-full object-cover transition duration-300 hover:scale-110"
                />
              </div>

              {/* INFO */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {p.name}
                </h2>

                <p className="text-gray-400 text-sm line-clamp-2">
                  {p.description || "Premium quality product"}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xl font-bold text-accent">
                    {price} AUD
                  </span>

                  {hasDiscount && (
                    <span className="text-gray-400 line-through text-sm">
                      {compare} AUD
                    </span>
                  )}
                </div>

                {hasDiscount && (
                  <p className="text-green-500 text-sm">
                    {discountPercent}% OFF
                  </p>
                )}

                <button
                  disabled={!p.inStock}
                  onClick={() => handleAddToCart(p)}
                  className={`mt-3 w-full p-2 rounded-lg font-semibold transition ${
                    p.inStock
                      ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {p.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}