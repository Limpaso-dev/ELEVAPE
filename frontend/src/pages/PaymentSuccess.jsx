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
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">
        Payment Successful 🎉
      </h1>
    </div>
  );
}