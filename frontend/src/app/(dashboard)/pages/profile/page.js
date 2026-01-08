"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setForm);
  }, []);

  const handleUpdate = async () => {
    const res = await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
  <div className="p-6 max-w-3xl">

    
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-ocean-900">
        My Profile
      </h2>
      <p className="text-sm text-ocean-500">
        Manage your personal information
      </p>
    </div>

    
    <div className="bg-white border border-ocean-100 rounded-xl shadow p-6 space-y-4">

      <input
        className="
          w-full px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          placeholder:text-ocean-300
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
        placeholder="First Name"
        value={form.first_name || ""}
        onChange={(e) =>
          setForm({ ...form, first_name: e.target.value })
        }
      />

      <input
        className="
          w-full px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          placeholder:text-ocean-300
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
        placeholder="Last Name"
        value={form.last_name || ""}
        onChange={(e) =>
          setForm({ ...form, last_name: e.target.value })
        }
      />

      <input
        className="
          w-full px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          placeholder:text-ocean-300
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
        placeholder="Phone Number"
        value={form.phone_number || ""}
        onChange={(e) =>
          setForm({ ...form, phone_number: e.target.value })
        }
      />

      <button
        onClick={handleUpdate}
        className="
          w-full mt-4 py-2 rounded-md
          bg-ocean-500 text-white font-medium
          hover:bg-ocean-900
          transition
        "
      >
        Update Profile
      </button>
    </div>

   
    <div className="mt-8 bg-white border border-ocean-100 rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold text-ocean-900 mb-1">
        Security
      </h3>
      <p className="text-sm text-ocean-500 mb-4">
        Update your password to keep your account secure.
      </p>

      <button
        onClick={() => window.location.href = "/pages/change-password"}
        className="
          px-4 py-2 rounded-md
          border border-ocean-500
          text-ocean-500 font-medium
          hover:bg-ocean-50
          transition
        "
      >
        Change Password
      </button>
    </div>

  </div>
);


}
