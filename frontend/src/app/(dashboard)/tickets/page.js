"use client";

import { useEffect, useState } from "react";
import ReplyModal from "./ReplyModal";
import { useRouter } from "next/navigation";
import TicketModal from "./ticketModal";
import Link from "next/link";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [viewTicket, setViewTicket] = useState(null);
  const [replyTicket, setReplyTicket] = useState(null);

  const [token, setToken] = useState(null);

  const router = useRouter();

 
  useEffect(() => {
    const t = localStorage.getItem("token");

    if (!t) {
      router.push("/login");
      return;
    }

    setToken(t);
  }, []);

 
  useEffect(() => {
    if (token) {
      fetchTickets();
    }
  }, [token]);

  const fetchTickets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    }
  };

  return (
  <div className="p-6">
    
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-ocean-900">
        Support Tickets
      </h2>
      <p className="text-sm text-ocean-500">
        View, reply, and manage customer support tickets
      </p>
    </div>

    
    <div className="bg-white rounded-xl shadow border border-ocean-100 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-ocean-900 text-white">
          <tr>
            <th className="p-3 text-left">Ticket #</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
            <th className="p-3 text-left">Reply</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr
              key={t.id}
              className="border-b hover:bg-ocean-50 transition"
            >
              <td className="p-3 font-medium text-ocean-900">
                {t.ticket_number}
              </td>

              <td className="p-3 text-ocean-900">
                {t.subject}
              </td>

              <td className="p-3 text-ocean-600">
                {t.email}
              </td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      t.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : t.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {t.priority}
                </span>
              </td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      t.status === "OPEN"
                        ? "bg-blue-100 text-blue-700"
                        : t.status === "CLOSED"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                >
                  {t.status}
                </span>
              </td>

             
              <td className="p-3 space-x-3">
                <button
                  onClick={() => setViewTicket(t)}
                  className="text-ocean-600 hover:text-ocean-900 underline"
                >
                  View
                </button>

                {t.attachment && (
                  <a
                    href={`http://localhost:5000/uploads/${t.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-900 underline"
                  >
                    Download
                  </a>
                )}
              </td>

              
              <td className="p-3">
                <button
                  onClick={() => setReplyTicket(t)}
                  className="text-blue-600 hover:text-blue-900 underline"
                >
                  Reply
                </button>
              </td>
            </tr>
          ))}

          {tickets.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="p-6 text-center text-ocean-500"
              >
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    
    {viewTicket && (
      <TicketModal
        ticket={viewTicket}
        close={() => setViewTicket(null)}
        refresh={fetchTickets}
      />
    )}

    
    {replyTicket && (
      <ReplyModal
        ticket={replyTicket}
        close={() => setReplyTicket(null)}
      />
    )}
  </div>
);

}
