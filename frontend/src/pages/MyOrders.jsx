import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/orders`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then(setOrders);
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="glass p-4">
              <p className="text-sm text-gray-400">
                Order ID: {o._id}
              </p>

              <p className="font-semibold mt-1">
                Total: {o.total} AUD
              </p>

              <p className="text-accent">
                Status: {o.status}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Items: {o.items.length}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}