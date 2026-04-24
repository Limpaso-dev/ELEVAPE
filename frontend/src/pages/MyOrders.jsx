import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      if (!token) return;

      const res = await fetch(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data || "Failed to fetch orders");
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      const res = await fetch(`${API}/orders/cancel/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data || "Failed to cancel order");
      }

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center text-sm sm:text-base">
          No orders yet
        </p>
      ) : (
        <div className="space-y-5">
          {orders.map((o) => (
            <div
              key={o._id}
              className="glass p-4 sm:p-5 space-y-4 rounded-xl"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-xs sm:text-sm text-gray-400 break-all">
                  Order ID: {o._id}
                </p>

                <span
                  className={`px-3 py-1 rounded text-xs sm:text-sm font-semibold w-fit ${
                    o.status === "pending"
                      ? "bg-yellow-500"
                      : o.status === "processing"
                      ? "bg-indigo-500"
                      : o.status === "shipped"
                      ? "bg-blue-500"
                      : o.status === "delivered"
                      ? "bg-green-500"
                      : o.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <p className="font-semibold text-base sm:text-lg">
                Total: <span className="text-accent">{o.total} AUD</span>
              </p>

              <p className="text-xs sm:text-sm text-gray-400">
                Items: {o.items.length}
              </p>

              <div className="bg-black/30 p-3 rounded-lg text-xs sm:text-sm space-y-1">
                <p className="font-semibold">Delivery Address</p>

                <p>
                  {o.shippingAddress?.firstName} {o.shippingAddress?.lastName}
                </p>

                <p>{o.shippingAddress?.address}</p>

                <p>
                  {o.shippingAddress?.suburb}, {o.shippingAddress?.state}{" "}
                  {o.shippingAddress?.postcode}
                </p>

                <p>{o.shippingAddress?.phone}</p>
              </div>

              {o.status === "pending" && (
                <button
                  onClick={() => cancelOrder(o._id)}
                  className="w-full sm:w-auto bg-red-500 px-4 py-2 rounded text-xs sm:text-sm hover:bg-red-600 transition"
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
