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
    <div className="p-6">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="glass p-4 rounded-xl hover:-translate-y-2 transition"
          >
            {/* IMAGE */}
            <div className="bg-black/30 rounded-lg p-4 h-52 flex items-center justify-center">
              <img
                src={`${BASE_URL}${p.image}`}
                alt={p.name}
                className="h-full object-cover"
                onError={(e) => {
                  console.log("Image failed:", `${BASE_URL}${p.image}`);
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />
            </div>

            {/* INFO */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{p.name}</h2>

              <p className="text-gray-400 text-sm">
                {p.description || "Premium product"}
              </p>

              <p className="text-xl font-bold text-accent mt-2">
                ${p.price}
              </p>

              <button
                onClick={() => handleAddToCart(p)}
                className="mt-3 w-full bg-gradient-to-r from-primary to-secondary p-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}