"use client";

import { useEffect, useState } from "react";

export default function TicketModal({ ticket, close, refresh }) {
 
  if (!ticket) return null;

  const [status, setStatus] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  
  useEffect(() => {
    setStatus(ticket.status);
  }, [ticket]);

 
  useEffect(() => {
    if (token) fetchAgents();
  }, [token]);

  const fetchAgents = async () => {
    const res = await fetch("http://localhost:5000/api/staff", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAgents(await res.json());
  };

  
  const updateStatus = async () => {
    await fetch(
      `http://localhost:5000/api/tickets/${ticket.id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    refresh();
  };

  
  const assignAgent = async () => {
    if (!agentId) return alert("Select an agent");

    await fetch(
      `http://localhost:5000/api/tickets/${ticket.id}/assign`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ agentId }),
      }
    );
    refresh();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 w-[500px] rounded">
        <h3 className="text-lg font-semibold mb-2">
          {ticket.ticket_number}
        </h3>

        <p><b>Subject:</b> {ticket.subject}</p>
        <p><b>Email:</b> {ticket.email}</p>
        <p><b>Message:</b> {ticket.message}</p>

        {ticket.attachment && (
          <p className="mt-2">
            <b>Attachment:</b>{" "}
            <a
              href={`http://localhost:5000/uploads/${ticket.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download file
            </a>
          </p>
        )}

        
        <div className="mt-4">
          <label className="block font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border w-full p-2"
          >
            <option>OPEN</option>
            <option>IN_PROGRESS</option>
            <option>RESOLVED</option>
            <option>CLOSED</option>
          </select>

          <button
            onClick={updateStatus}
            className="bg-blue-600 text-white px-3 py-1 mt-2"
          >
            Update Status
          </button>
        </div>

        
        <div className="mt-4">
          <label className="block font-medium">Assign Agent</label>
          <select
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="border w-full p-2"
          >
            <option value="">Select Agent</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.first_name} {a.last_name} ({a.email})
              </option>
            ))}
          </select>

          <button
            onClick={assignAgent}
            className="bg-green-600 text-white px-3 py-1 mt-2"
          >
            Assign
          </button>
        </div>

        <button
          onClick={close}
          className="text-red-600 mt-4 block"
        >
          Close
        </button>
      </div>
    </div>
  );
}
