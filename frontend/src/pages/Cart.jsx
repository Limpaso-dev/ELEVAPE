import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../services/api";

export default function Cart() {
  const {
    cart,
    subtotal,
    totalItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const SHIPPING_FEE = 30;
  const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty 🛒</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {/* ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((c) => (
              <div key={c._id} className="glass p-4 flex gap-4">

                <div className="w-24 h-24 bg-black/30 rounded overflow-hidden">
                  <img
                    src={`${BASE_URL}${c.image}`}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2>{c.name}</h2>
                  <p className="text-accent">${c.price}</p>

                  <div className="flex gap-2 mt-2">
                    <button onClick={() => decreaseQty(c._id)}>−</button>
                    <span>{c.quantity}</span>
                    <button onClick={() => increaseQty(c._id)}>+</button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(c._id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="glass p-6">
            <h2>Summary</h2>

            <p>Items: {totalItems}</p>
            <p>Subtotal: ${subtotal}</p>
            <p>Shipping: ${shipping}</p>

            <h3>Total: ${total}</h3>

            <button onClick={() => navigate("/checkout")}>
              Checkout
            </button>

            <button onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}