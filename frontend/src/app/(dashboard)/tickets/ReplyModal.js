"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export default function ReplyModal({ ticket, close }) {
  
  if (!ticket) return null;

  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState(null);

 
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  
  useEffect(() => {
    if (token) fetchReplies();
  }, [token]);

  const fetchReplies = async () => {
    const res = await fetch(
      `http://localhost:5000/api/replies/${ticket.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setReplies(await res.json());
  };

 
  const sendReply = async () => {
    if (!message || message === "<p><br></p>") {
      alert("Message is required");
      return;
    }

    setSending(true);

    const formData = new FormData();
    formData.append("message", message);
    if (attachment) formData.append("attachment", attachment);

    const res = await fetch(
      `http://localhost:5000/api/replies/${ticket.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    setMessage("");
    setAttachment(null);
    fetchReplies();
    setSending(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 w-[520px] rounded">
        <h3 className="text-lg font-semibold mb-3">
          Reply – {ticket.ticket_number}
        </h3>

        
        <div className="border p-2 h-40 overflow-y-auto mb-3">
          {replies.length === 0 && (
            <p className="text-sm text-gray-500">No replies yet</p>
          )}

          {replies.map((r) => (
            <div key={r.id} className="mb-3">
              <span className="text-xs text-gray-500">
                {r.sender_type}
              </span>
              <div
                className="bg-gray-100 p-2 rounded"
                dangerouslySetInnerHTML={{ __html: r.message }}
              />

              {r.attachment && (
                <a
                  href={`http://localhost:5000/uploads/${r.attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  Download attachment
                </a>
              )}
            </div>
          ))}
        </div>

        
        <ReactQuill
          value={message}
          onChange={setMessage}
          placeholder="Type your reply..."
          theme="snow"
        />

        
        <input
          type="file"
          onChange={(e) => setAttachment(e.target.files[0])}
          className="mt-2"
        />

        <button
          onClick={sendReply}
          disabled={sending}
          className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
        >
          {sending ? "Sending..." : "Send Reply"}
        </button>

        <button
          onClick={close}
          className="text-red-600 block mt-3"
        >
          Close
        </button>
      </div>
    </div>
  );
}
