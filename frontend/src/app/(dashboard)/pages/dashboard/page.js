"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
try{
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        

        fetch("http://localhost:5000/api/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem("token");
                router.push("/pages/login");
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
     
     return  (
  <div className="p-6">

   
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-ocean-900">
        Welcome, {user.first_name} 👋
      </h1>
      <p className="text-ocean-500 mt-1">
        {user.email}
      </p>
    </div>

   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

    
      <div
        onClick={() => router.push("/pages/profile")}
        className="cursor-pointer bg-white border border-ocean-100 rounded-xl p-6 shadow hover:shadow-md transition"
      >
        <h3 className="text-lg font-semibold text-ocean-900">
          My Profile
        </h3>
        <p className="text-sm text-ocean-500 mt-2">
          View and update personal details
        </p>
      </div>

     
      <div
        onClick={() => router.push("/pages/tickets")}
        className="cursor-pointer bg-white border border-ocean-100 rounded-xl p-6 shadow hover:shadow-md transition"
      >
        <h3 className="text-lg font-semibold text-ocean-900">
          Ticket Management
        </h3>
        <p className="text-sm text-ocean-500 mt-2">
          View and manage support tickets
        </p>
      </div>

    </div>
  </div>
);




}catch(error){
    console.log("error dashboard",error)
    res.status(400).json({message:"Can not load dashboard"})
}
}

