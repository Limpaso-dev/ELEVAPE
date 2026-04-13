import { useState } from "react";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({});

  const submit = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Role-based redirect
    if (data.user.isAdmin) {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="glass p-6 w-80">
        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 bg-black/40 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 mb-3 bg-black/40 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-primary to-secondary p-2 rounded"
        >
          Login
        </button>

        {/* ✅ FORGOT PASSWORD */}
        <p className="text-sm text-center mt-3">
          <span
            className="text-accent cursor-pointer hover:underline"
            onClick={() =>
              (window.location.href = "/forgot-password")
            }
          >
            Forgot Password?
          </span>
        </p>

        {/* REGISTER */}
        <p className="text-sm text-center mt-2 text-gray-400">
          Don’t have an account?{" "}
          <span
            className="text-accent cursor-pointer"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;