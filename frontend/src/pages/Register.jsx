import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Registered successfully! Please login.");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="glass p-6 w-80">
        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input
          className="w-full p-2 mb-3 bg-black/40 rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 bg-black/40 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-black/40 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-primary to-secondary p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;