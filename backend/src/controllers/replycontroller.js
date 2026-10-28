import db from "../config/db.js";
import nodemailer from "nodemailer";
import path from "path";

export const getReplies = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const [replies] = await db.execute(
      "SELECT * FROM ticket_replies WHERE ticket_id=? ORDER BY created_at",
      [ticketId]
    );

    res.json(replies);
  } catch (error) {
    console.log("Get Replies Error", error);
    res.status(500).json({ message: "Failed to fetch replies" });
  }
};

export const addReply = async (req, res) => {
  try {
    const { ticketId } = req.params;

    
    const message = req.body?.message;
    const attachmentFile = req.file ? req.file.filename : null;

    if (!message) {
      return res.status(400).json({ message: "Reply message is required" });
    }

   
    await db.execute(
      "INSERT INTO ticket_replies (ticket_id, sender_type, message, attachment) VALUES (?, 'STAFF', ?, ?)",
      [ticketId, message, attachmentFile]
    );

    
    const [[ticket]] = await db.execute(
      "SELECT email, ticket_number FROM tickets WHERE id=?",
      [ticketId]
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return res.status(500).json({ message: "Email not configured" });
    }

   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    
    const mailOptions = {
      from: `"CRM Support" <${emailUser}>`,
      to: ticket.email,
      subject: `Reply to your ticket ${ticket.ticket_number}`,
      html: `
        <p><b>Support Team Reply:</b></p>
        <p>${message}</p>
        <hr/>
        <p>Ticket Number: ${ticket.ticket_number}</p>
      `,
      attachments: [],
    };

    
    if (attachmentFile) {
      mailOptions.attachments.push({
        filename: attachmentFile,
        path: path.join("uploads", attachmentFile),
      });
    }

    
    await transporter.sendMail(mailOptions);

    res.json({ message: "Reply sent successfully" });
  } catch (error) {
    console.log("Add Reply Error", error);
    res.status(500).json({ message: "Failed to send reply" });
  }
};
