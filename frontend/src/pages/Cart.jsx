import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 OPTIONAL: prevent access if not logged in
  if (!user) {
    navigate("/login");
  }

  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
              <div
                key={c._id}
                className="glass p-4 flex gap-4 items-center"
              >
                {/* IMAGE */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/30">
                  <img
                    src={`${API}${c.image}`}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {c.name}
                  </h2>

                  <p className="text-accent font-bold mt-1">
                    {c.price} AUD
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(c._id)}
                      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      −
                    </button>

                    <span className="font-semibold">
                      {c.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(c._id)}
                      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(c._id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="glass p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-400">
              <span>Items</span>
              <span>
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>

            <div className="flex justify-between mb-4 text-gray-400">
              <span>Total</span>
              <span>{total.toFixed(2)} AUD</span>
            </div>

            <hr className="border-white/20 mb-4" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Grand Total</span>
              <span className="text-accent">
                {total.toFixed(2)} AUD
              </span>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gradient-to-r from-primary to-secondary p-2 rounded font-semibold hover:opacity-90"
            >
              Proceed to Checkout
            </button>

            {/* CLEAR CART (optional but useful) */}
            <button
              onClick={clearCart}
              className="w-full mt-3 border border-red-400 text-red-400 p-2 rounded hover:bg-red-400 hover:text-white transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}