import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data);
  };

  return (
    <div className="w-full flex justify-center py-16 sm:py-20">

      <form
        onSubmit={handleSubmit}
        className="glass p-5 sm:p-6 rounded-xl w-full max-w-sm sm:max-w-md space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 bg-black/40 rounded-lg text-sm sm:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-gradient-to-r from-primary to-secondary p-3 rounded-lg font-semibold text-sm sm:text-base">
          Send Reset Link
        </button>

        {msg && (
          <p className="text-green-400 text-sm sm:text-base text-center">
            {msg}
          </p>
        )}
      </form>

    </div>
  );
}