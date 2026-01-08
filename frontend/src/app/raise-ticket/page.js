"use client";

import { useState } from "react";

export default function RaiseTicketPage() {
  const [form, setForm] = useState({
    subject: "",
    name: "",
    email: "",
    department: "",
    priority: "Medium",
    phone: "",
    message: "",
  });

  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (attachment) {
      formData.append("attachment", attachment);
    }

    const res = await fetch("http://localhost:5000/api/tickets", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setSuccess("Ticket raised successfully");
      setForm({
        subject: "",
        name: "",
        email: "",
        department: "",
        priority: "Medium",
        phone: "",
        message: "",
      });
      setAttachment(null);
    }

    setLoading(false);
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-slate-50 to-ocean-100 flex items-center justify-center px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg border border-ocean-100"
    >
      <h2 className="text-2xl font-bold text-ocean-900 text-center mb-2">
        Raise a Ticket
      </h2>
      <p className="text-center text-ocean-500 mb-8">
        Fill in the form below, our support team will get back to you soon.
      </p>

      
      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Subject
      </label>
      <input
        type="text"
        name="subject"
        value={form.subject}
        onChange={handleChange}
        required
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
      />

      {/* Name */}
      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Your Name
      </label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
      />

      
      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
      />

      
      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Department
      </label>
      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        required
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
      >
        <option value="">Nothing selected</option>
        <option value="Support">Support</option>
        <option value="Sales">Sales</option>
        <option value="Billing">Billing</option>
        <option value="Technical">Technical</option>
      </select>

     
      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Priority
      </label>
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Mobile Number
      </label>
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
      />

     
      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Message
      </label>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        rows="4"
        required
        className="
          w-full mb-4 px-3 py-2
          border border-ocean-100 rounded-md
          text-sm text-ocean-900
          focus:outline-none
          focus:ring-2 focus:ring-ocean-300
          focus:border-ocean-500
        "
      />

      
      <label className="block text-sm font-medium text-ocean-900 mb-1">
        Attachments
      </label>
      <input
        type="file"
        onChange={(e) => setAttachment(e.target.files[0])}
        className="mb-6 text-sm text-ocean-500"
      />

      {success && (
        <p className="text-green-600 text-sm mb-4 text-center">
          {success}
        </p>
      )}

      
      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-2 rounded-md
          bg-ocean-500 text-white font-medium
          hover:bg-ocean-900
          transition
          disabled:opacity-60
        "
      >
        {loading ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  </div>
);


}
