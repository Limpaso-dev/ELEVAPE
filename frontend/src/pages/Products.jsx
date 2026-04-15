import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://elevape.onrender.com";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        alert("Failed to load products");
      });
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

          return (
            <div
              key={p._id}
              className="glass p-4 rounded-xl transition transform hover:-translate-y-2 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="bg-black/30 rounded-lg p-4 flex items-center justify-center h-52 overflow-hidden">
                <img
                  src={`${BASE_URL}${p.image}`}
                  alt={p.name}
                  className="h-full object-cover"
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

                <p className="text-xl font-bold text-accent mt-2">
                  ${price}
                </p>

                <button
                  onClick={() => handleAddToCart(p)}
                  className="mt-3 w-full bg-gradient-to-r from-primary to-secondary p-2 rounded font-semibold hover:opacity-90"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}