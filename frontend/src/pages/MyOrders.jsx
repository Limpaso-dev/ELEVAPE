import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  // 📦 FETCH ORDERS
  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ❌ CANCEL ORDER
  const cancelOrder = async (id) => {
    await fetch(`${API}/orders/cancel/${id}`, {
      method: "PUT",
      headers: { Authorization: token },
    });

    fetchOrders(); // refresh
  };

  return (
    <div className="pt-24 px-6 md:px-16 max-w-5xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-bold gradient-text mb-8 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center">
          No orders yet 🛒
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o._id} className="glass p-5 space-y-3 rounded-xl">

              {/* ORDER HEADER */}
              <div className="flex justify-between items-center flex-wrap gap-2">
                <p className="text-sm text-gray-400">
                  Order ID: {o._id}
                </p>

                {/* STATUS BADGE */}
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    o.status === "pending"
                      ? "bg-yellow-500"
                      : o.status === "shipped"
                      ? "bg-blue-500"
                      : o.status === "delivered"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              {/* TOTAL */}
              <p className="font-semibold text-lg">
                Total:{" "}
                <span className="text-accent">
                  {o.total} AUD
                </span>
              </p>

              {/* ITEMS */}
              <p className="text-sm text-gray-400">
                Items: {o.items.length}
              </p>

              {/* SHIPPING */}
              <div className="bg-black/30 p-3 rounded-lg text-sm space-y-1">
                <p className="font-semibold">Delivery Address</p>
                <p>
                  {o.shippingAddress?.firstName}{" "}
                  {o.shippingAddress?.lastName}
                </p>
                <p>{o.shippingAddress?.address}</p>
                <p>
                  {o.shippingAddress?.suburb},{" "}
                  {o.shippingAddress?.state}{" "}
                  {o.shippingAddress?.postcode}
                </p>
                <p>📞 {o.shippingAddress?.phone}</p>
              </div>

              {/* ACTIONS */}
              {o.status === "pending" && (
                <button
                  onClick={() => cancelOrder(o._id)}
                  className="mt-3 bg-red-500 px-4 py-2 rounded text-sm hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}