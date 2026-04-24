import { useState } from "react";
import { useCart } from "../context/CartContext";
import { API } from "../services/api";

export default function Checkout() {
  const { cart } = useCart();

  const SHIPPING_FEE = 30;

  const subtotal = cart.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

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

  const checkout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return alert("Please login first");
      if (cart.length === 0) return alert("Cart is empty");

      // 🔥 BASIC VALIDATION
      if (!form.firstName || !form.address || !form.phone || !form.email) {
        return alert("Please fill all required fields");
      }

      const res = await fetch(`${API}/orders`, {
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

      if (!res.ok) return alert(data);

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        alert("Payment link not received");
      }

    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">

        {/* FORM */}
        <div className="glass p-5 sm:p-6 rounded-xl space-y-4">

          <h2 className="text-lg sm:text-xl font-semibold">
            Shipping Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
          </div>

          <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="postcode" placeholder="Postcode" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />
          </div>

          <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 bg-black/40 rounded-lg" />

        </div>

        {/* SUMMARY */}
        <div className="glass p-5 sm:p-6 rounded-xl h-fit">

          <h2 className="text-lg sm:text-xl font-semibold mb-3">
            Order Summary
          </h2>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-sm">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span className="truncate">
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-white/20 my-4" />

          <div className="space-y-2 text-sm">
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

          <div className="flex justify-between text-base sm:text-lg font-bold mb-4">
            <span>Total</span>
            <span className="text-accent">
              ${total.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-gray-400 mb-3 text-center">
            Secure payment 🔒
          </p>

          <button
            onClick={checkout}
            className="w-full bg-gradient-to-r from-primary to-secondary p-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Pay ${total.toFixed(2)}
          </button>

        </div>

      </div>
    </div>
  );
}
