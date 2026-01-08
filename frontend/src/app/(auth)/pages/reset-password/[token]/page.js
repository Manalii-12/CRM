"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const router = useRouter();

    const [newPassword, setPassword] = useState("")
    const [Confirm_password, setConfirm_password] = useState("")
    const [message, setMessage] = useState("");

    
    const handleReset = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/api/auth/resetPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword,Confirm_password }),
      }
    );
    
    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setTimeout(() => router.push("/pages/login"), 1500);
    }
  
}
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 via-slate-50 to-ocean-100 px-4">
    <form
      onSubmit={handleReset}
      className="w-full max-w-sm bg-white border border-ocean-100 p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-ocean-900 mb-2 text-center">
        Reset Password
      </h2>

      <p className="text-sm text-ocean-500 mb-6 text-center">
        Enter a new password for your account.
      </p>

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
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          placeholder:text-ocean-300
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
        onChange={(e) => setConfirm_password(e.target.value)}
        required
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
        Reset Password
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-ocean-500">
          {message}
        </p>
      )}
    </form>
  </div>
);

}
