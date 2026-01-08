"use client";

import { useState,useEffect } from "react";

export default function ChangePasswordPage() {
    const [form, setForm] = useState({});
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); 
}, []);
    const handleChange = async (e) => {
        e.preventDefault();

        const res = await fetch(
            "http://localhost:5000/api/auth/ChangePassword",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            }
        );

        const data = await res.json();
        setMessage(data.message);
    };

    return (
  <div className="p-6 max-w-md">

   
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-ocean-900">
        Change Password
      </h2>
      <p className="text-sm text-ocean-500">
        Update your account password
      </p>
    </div>

    
    <div className="bg-white border border-ocean-100 rounded-xl shadow-lg p-6">

      <form onSubmit={handleChange}>
        <input
          type="password"
          placeholder="Current Password"
          className="
            w-full mb-3 px-3 py-2
            border border-ocean-100 rounded-md
            text-sm text-ocean-900
            placeholder:text-ocean-300
            focus:outline-none
            focus:ring-2 focus:ring-ocean-300
            focus:border-ocean-500
          "
          onChange={(e) =>
            setForm({ ...form, currentPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="
            w-full mb-3 px-3 py-2
            border border-ocean-100 rounded-md
            text-sm text-ocean-900
            placeholder:text-ocean-300
            focus:outline-none
            focus:ring-2 focus:ring-ocean-300
            focus:border-ocean-500
          "
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="
            w-full mb-4 px-3 py-2
            border border-ocean-100 rounded-md
            text-sm text-ocean-900
            placeholder:text-ocean-300
            focus:outline-none
            focus:ring-2 focus:ring-ocean-300
            focus:border-ocean-500
          "
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
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
          Change Password
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-ocean-500">
            {message}
          </p>
        )}
      </form>
    </div>

  </div>
);

}
