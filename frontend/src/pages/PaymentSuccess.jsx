import { useEffect } from "react";
import { API } from "../services/api";

export default function PaymentSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");

    if (reference) {
      fetch(`${API}/orders/verify/${reference}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Payment verified:", data);
        });
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-16 sm:py-24">

      <div className="text-center space-y-3">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-400 text-sm sm:text-base">
          Your order has been placed successfully.
        </p>

      </div>

    </div>
  );
}