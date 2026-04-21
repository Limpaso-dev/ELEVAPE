import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";
import BackButton from "../components/BackButton";

function Login() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server error. Please try again.");
      }

      if (!res.ok) {
        alert(data || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = data.user.isAdmin ? "/admin" : "/";
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10 sm:py-16">
      <div className="glass p-6 sm:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">

        <h2 className="text-lg sm:text-xl md:text-2xl mb-4 text-center font-semibold">
          Login
        </h2>

        {/* EMAIL */}
        <input
          placeholder="Email"
          className="w-full p-2 sm:p-3 mb-3 bg-black/40 rounded text-sm sm:text-base"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 sm:p-3 mb-3 bg-black/40 rounded text-sm sm:text-base"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full p-2 sm:p-3 rounded font-semibold text-sm sm:text-base transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FORGOT PASSWORD */}
        <p
          onClick={() => navigate("/forgot-password")}
          className="text-xs sm:text-sm text-blue-400 cursor-pointer mt-3 hover:underline text-center"
        >
          Forgot Password?
        </p>

        {/* REGISTER */}
        <p className="text-xs sm:text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;