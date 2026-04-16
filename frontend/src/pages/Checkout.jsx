import { useState } from "react";
import { useCart } from "../context/CartContext";

const BASE_URL = "https://elevape.onrender.com";

export default function Checkout() {
  const { cart } = useCart();

  // ✅ SHIPPING LOGIC
  const SHIPPING_FEE = 30;

  const subtotal = cart.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  const shipping = cart.length > 0 ? SHIPPING_FEE : 0;

  const total = subtotal + shipping;

  // ✅ FORM STATE
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CHECKOUT FUNCTION
  const checkout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          subtotal,
          shipping,
          total,
          shippingAddress: form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data);
        return;
      }

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        alert("Payment not available yet");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="pt-24 px-6 md:px-16">
      <h1 className="text-3xl font-bold gradient-text mb-8 text-center">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* ================= FORM ================= */}
        <div className="glass p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold mb-2">
            Shipping Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
          </div>

          <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />

          <div className="grid grid-cols-2 gap-4">
            <input name="suburb" placeholder="Suburb" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />

            <select name="state" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg">
              <option value="">State</option>
              <option>NSW</option>
              <option>VIC</option>
              <option>QLD</option>
              <option>WA</option>
              <option>SA</option>
              <option>TAS</option>
              <option>ACT</option>
              <option>NT</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input name="postcode" placeholder="Postcode" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
          </div>

          <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="glass p-6 rounded-xl h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {/* CART ITEMS */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="border-white/20 my-4" />

          {/* PRICE BREAKDOWN */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <hr className="border-white/20 my-4" />

          {/* TOTAL */}
          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span className="text-accent">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={checkout}
            className="w-full bg-gradient-to-r from-primary to-secondary p-3 rounded-lg font-semibold hover:opacity-90"
          >
            Pay ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}