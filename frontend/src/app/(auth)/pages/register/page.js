"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/config/api";

export default function RegisterPage() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (form.password !== form.confirm_password) {
      setIsError(true);
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.replace("/pages/login");
        }, 1500);
      } else {
        setIsError(true);
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register network error:", err);
      setIsError(true);
      setMessage(
        "Could not connect to backend server. Make sure the backend API is running and NEXT_PUBLIC_API_URL is configured."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 via-slate-50 to-ocean-100 px-4 py-8">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white border border-ocean-100 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-ocean-900 text-center mb-6">
          Create Account
        </h2>

        {[
          ["first_name", "First Name", "text"],
          ["last_name", "Last Name", "text"],
          ["email", "Email", "email"],
          ["phone_number", "Phone Number", "tel"],
          ["company_name", "Company Name", "text"],
          ["password", "Password", "password"],
          ["confirm_password", "Confirm Password", "password"],
        ].map(([name, label, type]) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={label}
            required
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
          disabled={loading}
          className="
            w-full mt-2 py-2 rounded-md
            bg-ocean-500 text-white font-medium
            hover:bg-ocean-900
            disabled:opacity-50
            transition
          "
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-4 p-2 rounded-md ${
              isError
                ? "text-red-700 bg-red-50 border border-red-200"
                : "text-green-700 bg-green-50 border border-green-200"
            }`}
          >
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
