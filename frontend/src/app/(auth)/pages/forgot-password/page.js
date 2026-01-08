"use client"

import {useState} from "react"

export default function forgotPasswordPage(){
    try{
    const [email,setEmail]=useState("")
    const[message,setMessage]=useState("")

    const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/api/auth/forgotPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    setMessage(data.message);
  };
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 via-slate-50 to-ocean-100 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white border border-ocean-100 p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-ocean-900 mb-2 text-center">
        Forgot Password
      </h2>

      <p className="text-sm text-ocean-500 mb-6 text-center">
        Enter your registered email to receive a password reset link.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          placeholder:text-ocean-300
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
        onChange={(e) => setEmail(e.target.value)}
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
        Send Reset Link
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-ocean-500">
          {message}
        </p>
      )}
    </form>
  </div>
);

}catch(error){
    console.log("Forgot Pasword Frontend Error",error)
   return  res.status(400).json({message:"Error Frontend Error"})
}

}