import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import BackButton from "../components/BackButton";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-center items-center py-10 sm:py-16">
      <div className="glass p-6 sm:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">

        <h2 className="text-lg sm:text-xl md:text-2xl mb-4 text-center font-semibold">
          Register
        </h2>

        {/* NAME */}
        <input
          className="w-full p-2 sm:p-3 mb-3 bg-black/40 rounded text-sm sm:text-base"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* EMAIL */}
        <input
          className="w-full p-2 sm:p-3 mb-3 bg-black/40 rounded text-sm sm:text-base"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full p-2 sm:p-3 mb-3 bg-black/40 rounded text-sm sm:text-base"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* BUTTON */}
        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-primary to-secondary p-2 sm:p-3 rounded text-sm sm:text-base font-semibold hover:opacity-90 transition"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-xs sm:text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;