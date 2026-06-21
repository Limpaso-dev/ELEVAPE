import { useEffect, useState } from "react";
import { API } from "../services/api";
import { useCart } from "../context/CartContext";

export default function PaymentSuccess() {
  const [status, setStatus] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const hasReference = [
      "orderId",
      "reference",
      "TransactionToken",
      "TransToken",
      "ID",
    ].some((key) => params.get(key));

    return hasReference && localStorage.getItem("token")
      ? "Verifying your payment..."
      : "Payment completed. Please check My Orders for confirmation.";
  });
  const { clearCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference =
      params.get("orderId") ||
      params.get("reference") ||
      params.get("TransactionToken") ||
      params.get("TransToken") ||
      params.get("ID");
    const token = localStorage.getItem("token");

    if (reference && token) {
      fetch(`${API}/orders/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data || "Payment verification failed");
          }

          return data;
        })
        .then((data) => {
          console.log("Payment verified:", data);
          if (data.order?.paymentStatus === "paid") {
            clearCart();
            setStatus("Your order has been placed successfully.");
          } else {
            setStatus("Payment received by DPO is still pending confirmation.");
          }
        })
        .catch((err) => {
          console.error(err);
          setStatus("We could not verify the payment yet. Please check My Orders.");
        });
    }
  }, [clearCart]);

  return (
    <div className="w-full flex justify-center items-center py-16 sm:py-24">
      <div className="text-center space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="text-gray-400 text-sm sm:text-base">
          {status}
        </p>
      </div>
    </div>
  );
}
