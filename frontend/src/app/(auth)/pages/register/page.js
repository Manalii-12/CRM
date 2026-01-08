"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setMessage("Registration successful");
      router.replace("/pages/login");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 via-slate-50 to-ocean-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white border border-ocean-100 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-ocean-900 text-center mb-6">
          Create Account
        </h2>

        {[
          ["first_name", "First Name"],
          ["last_name", "Last Name"],
          ["email", "Email"],
          ["phone_number", "Phone Number"],
          ["company_name", "Company Name"],
          ["password", "Password"],
          ["confirm_password", "Confirm Password"],
        ].map(([name, label]) => (
          <input
            key={name}
            name={name}
            type={name.includes("password") ? "password" : "text"}
            placeholder={label}
            onChange={handleChange}
            className="
              w-full mb-3 px-3 py-2
              border border-ocean-100 rounded-md
              text-sm text-ocean-900
              placeholder:text-ocean-300
              focus:outline-none
              focus:ring-2 focus:ring-ocean-300
              focus:border-ocean-500
            "
          />
        ))}

        <button
          type="submit"
          className="
            w-full mt-2 py-2 rounded-md
            bg-ocean-500 text-white font-medium
            hover:bg-ocean-900
            transition
          "
        >
          Register
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-ocean-300">
            {message}
          </p>
        )}

        <p className="text-center text-sm text-ocean-900 mt-4">
          Already have an account?{" "}
          <span
            className="text-ocean-500 cursor-pointer hover:underline"
            onClick={() => router.push("/pages/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
