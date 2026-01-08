"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert(data.msg);
      router.replace("/pages/dashboard");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 via-slate-50 to-ocean-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white border border-ocean-100 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-ocean-900 text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full mb-4 px-3 py-2
            border border-ocean-100 rounded-md
            text-sm text-ocean-900
            placeholder:text-ocean-300
            focus:outline-none
            focus:ring-2 focus:ring-ocean-300
            focus:border-ocean-500
          "
        />

        <button
          type="submit"
          className="
            w-full py-2 rounded-md
            bg-ocean-500 text-white font-medium
            hover:bg-ocean-900
            transition
          "
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          <span
            onClick={() => router.push("/pages/forgot-password")}
            className="text-ocean-500 cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </p>

        {message && (
          <p className="text-center text-sm text-red-600 mt-3">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
