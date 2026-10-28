"use client";

import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">

      
      <aside className="w-64 bg-ocean-900 text-white flex flex-col p-6 fixed left-0 top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8 text-center">
          CRM Panel
        </h2>

        <nav className="flex flex-col gap-3 text-sm">
          <Link
            href="/pages/dashboard"
            className="px-3 py-2 rounded hover:bg-ocean-500 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/pages/profile"
            className="px-3 py-2 rounded hover:bg-ocean-500 transition"
          >
            My Profile
          </Link>

          <Link
            href="/pages/staff"
            className="px-3 py-2 rounded hover:bg-ocean-500 transition"
          >
            Staff Management
          </Link>

          <Link
            href="/tickets"
            className="px-3 py-2 rounded hover:bg-ocean-500 transition"
          >
            Ticket Management
          </Link>
        </nav>

       
        <div className="mt-auto space-y-3">
          <Link
            href="/pages/change-password"
            className="block text-center bg-ocean-300 hover:bg-ocean-50 px-3 py-2 rounded text-sm transition"
          >
            Change Password
          </Link>

          <Link
            href="/pages/login"
            onClick={() => localStorage.removeItem("token")}
            className="block text-center bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm transition"
          >
            Logout
          </Link>
        </div>
      </aside>

      
      <main className="flex-1 ml-64 p-8 bg-gradient-to-br from-[#eef6f9] to-[#dceaf0]">
        {children}
      </main>

    </div>
  );
}
