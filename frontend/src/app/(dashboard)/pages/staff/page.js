"use client";

import { useEffect, useState } from "react";

export default function StaffPage() {
    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "Support Agent",
    });

    const API = "http://localhost:5000/api/staff";


    const fetchStaff = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setStaff(data); // ACTIVE + INACTIVE both
    };

    useEffect(() => {
        fetchStaff();
    }, []);


     const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `${API}/${editingId}` : API;

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

          

        setForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: "Support Agent",
            status: "ACTIVE",
        });
        

        setEditingId(null);
        await fetchStaff(); 
    };



    const editStaff = (s) => {
        setEditingId(s.id);
        setForm({
            firstName: s.first_name,
            lastName: s.last_name,
            email: s.email,
            phone: s.phone,
            role: s.role,
            status: s.status,
        });
    };



    const deleteStaff = async (id) => {
        if (!confirm("Are you sure you want to delete this staff?")) return;
        await fetch(`${API}/${id}`, { method: "DELETE" });
        await fetchStaff();
    };



    const toggleStatus = async (id) => {
        await fetch(`${API}/${id}/status`, { method: "PATCH" });
        await fetchStaff();
    }



    const filteredStaff = staff.filter((s) =>
        `${s.first_name} ${s.last_name} ${s.email} ${s.role}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    



    return (
  <div className="p-6 max-w-7xl">

   
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-ocean-900">
        Manage Staff
      </h2>
      <p className="text-sm text-ocean-500">
        Invite and manage staff members
      </p>
    </div>

    
    <input
      type="text"
      placeholder="Search staff..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full mb-6 px-4 py-2
        border border-ocean-100 rounded-lg
        text-sm text-ocean-900
        placeholder:text-ocean-300
        focus:outline-none
        focus:ring-2 focus:ring-ocean-300
        focus:border-ocean-500
      "
    />

   
    <div className="bg-white border border-ocean-100 rounded-xl shadow p-6 mb-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-3"
      >
        <input
          className="px-3 py-2 border border-ocean-100 rounded-md text-sm focus:ring-2 focus:ring-ocean-300 focus:border-ocean-500 outline-none"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <input
          className="px-3 py-2 border border-ocean-100 rounded-md text-sm focus:ring-2 focus:ring-ocean-300 focus:border-ocean-500 outline-none"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <input
          className="px-3 py-2 border border-ocean-100 rounded-md text-sm focus:ring-2 focus:ring-ocean-300 focus:border-ocean-500 outline-none"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="px-3 py-2 border border-ocean-100 rounded-md text-sm focus:ring-2 focus:ring-ocean-300 focus:border-ocean-500 outline-none"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <select
          className="px-3 py-2 border border-ocean-100 rounded-md text-sm focus:ring-2 focus:ring-ocean-300 focus:border-ocean-500 outline-none"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Admin</option>
          <option>Support Agent</option>
        </select>

        <button className="bg-ocean-500 hover:bg-ocean-900 text-white rounded-md px-4 py-2 transition">
          {editingId ? "Update" : "Add Staff"}
        </button>
      </form>
    </div>

    
    <div className="bg-white border border-ocean-100 rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-ocean-900 text-white text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Status Action</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStaff.map((s) => (
            <tr key={s.id} className="border-b hover:bg-ocean-50 transition">
              <td className="p-3 font-medium text-ocean-900">
                {s.first_name} {s.last_name}
              </td>
              <td className="p-3 text-ocean-500">{s.email}</td>
              <td className="p-3 text-ocean-500">{s.phone}</td>
              <td className="p-3 text-ocean-500">{s.role}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${s.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"}`}
                >
                  {s.status}
                </span>
              </td>

              <td className="p-3">
                <button
                  onClick={() => toggleStatus(s.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                    ${s.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                      ${s.status === "ACTIVE" ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </td>

              <td className="p-3 space-x-2">
                <button
                  onClick={() => editStaff(s)}
                  className="px-3 py-1 bg-ocean-300 text-white rounded text-xs hover:bg-ocean-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStaff(s.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredStaff.length === 0 && (
            <tr>
              <td colSpan="7" className="p-6 text-center text-ocean-500">
                No staff found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  </div>
);

}

