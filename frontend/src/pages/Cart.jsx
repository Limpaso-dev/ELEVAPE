import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { formatUSD } from "../utils/currency";

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

  const SHIPPING_FEE = 2;
  const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return (
    <div className="w-full space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-sm sm:text-base">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((c) => (
              <div
                key={c._id}
                className="glass p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start"
              >

                {/* IMAGE */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black/30 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={c.image} // 🔥 FIXED (Cloudinary)
                    alt={c.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-sm sm:text-base font-semibold">
                    {c.name}
                  </h2>

                  <p className="text-accent text-sm sm:text-base">
                    {formatUSD(c.price)}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex justify-center sm:justify-start gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(c._id)}
                      className="px-2 bg-gray-700 rounded"
                    >
                      −
                    </button>

                    <span>{c.quantity}</span>

                    <button
                      onClick={() => increaseQty(c._id)}
                      className="px-2 bg-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(c._id)}
                  className="text-red-400 text-sm hover:underline"
                >
                  Remove
                </button>

              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="glass p-5 space-y-3 h-fit">
            <h2 className="text-lg font-semibold">Summary</h2>

            <p className="text-sm">Items: {totalItems}</p>
            <p className="text-sm">Subtotal: {formatUSD(subtotal)}</p>
            <p className="text-sm">Shipping: {formatUSD(shipping)}</p>

            <h3 className="text-lg font-bold">Total: {formatUSD(total)}</h3>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gradient-to-r from-primary to-secondary p-2 rounded hover:opacity-90"
            >
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full bg-gray-700 p-2 rounded hover:bg-gray-600"
            >
              Clear Cart
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
