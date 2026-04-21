import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setMsg(data);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="w-full flex justify-center py-16 sm:py-20">

      <form
        onSubmit={handleSubmit}
        className="glass p-5 sm:p-6 rounded-xl w-full max-w-sm sm:max-w-md space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 bg-black/40 rounded-lg text-sm sm:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-gradient-to-r from-primary to-secondary p-3 rounded-lg font-semibold text-sm sm:text-base">
          Reset Password
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