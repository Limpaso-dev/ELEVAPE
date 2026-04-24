import { useEffect } from "react";
import { API } from "../services/api";

export default function PaymentSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");
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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-16 sm:py-24">
      <div className="text-center space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="text-gray-400 text-sm sm:text-base">
          Your order has been placed successfully.
        </p>
      </div>
    </div>
  );
}
