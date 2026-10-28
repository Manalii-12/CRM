import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { logActivity } from "../utils/logActivity.js";
import { transporter } from "../utils/mailer.js";
import { getStaffNameById } from "../utils/getStaffName.js";




export const createTicket = async (req, res) => {
    try {
        const {
            subject,
            name,
            email,
            department,
            priority,
            phone,
            message,
        } = req.body;

        const attachment = req.file ? req.file.filename : null;
        const ticketNumber = "TKT-" + uuidv4().slice(0, 8).toUpperCase();

        const sql = `
      INSERT INTO tickets 
      (ticket_number, subject, name, email, department, priority, phone, message, attachment)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const [result] = await db.query(sql, [
            ticketNumber,
            subject,
            name,
            email,
            department,
            priority,
            phone,
            message,
            attachment,
        ]);

        const ticketId = result.insertId;

        await logActivity({
            ticketId: ticketId,
            userId: req.user?.id || null,
            userName: req.user
                ? `${req.user.first_name} ${req.user.last_name}`
                : name,
            action: "TICKET_CREATED",
            newValue: subject,
        });

        
        await transporter.sendMail({
            to: process.env.ADMIN_EMAIL,
            subject: "New Ticket Raised",
            text: `Ticket ${ticketNumber} raised by ${name}\nSubject: ${subject}`,
        });


        res.status(201).json({
            message: "Ticket raised successfully",
            ticketNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to raise ticket" });
    }
};







export const getAllTickets = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM tickets ORDER BY created_at DESC"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tickets" });
    }
};


export const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const [[ticket]] = await db.query(
            "SELECT * FROM tickets WHERE id = ?",
            [id]
        );
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch ticket" });
    }
};


export const markTicketViewed = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query(
            "UPDATE tickets SET status='IN_PROGRESS' WHERE id=? AND status='OPEN'",
            [id]
        );


        await logActivity({
            ticketId: id,
            userId: req.user.id,
            userName: `${req.user.first_name} ${req.user.last_name}`,
            action: "STATUS_AUTO_UPDATED",
            oldValue: "OPEN",
            newValue: "IN_PROGRESS",
        });


        res.json({ message: "Status updated" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update status" });
    }
};


export const assignTicket = async (req, res) => {
    const actorName = await getStaffNameById(req.user.userId);
  try {
    const { agentId } = req.body;
    const { id } = req.params;

    
    const [[agent]] = await db.query(
      "SELECT first_name, last_name, email FROM staff WHERE id=?",
      [agentId]
    );

    if (!agent || !agent.email) {
      return res.status(400).json({ message: "Agent email not found" });
    }

   
    const [[ticket]] = await db.query(
      "SELECT assigned_to FROM tickets WHERE id=?",
      [id]
    );

   
    await db.query(
      "UPDATE tickets SET assigned_to=? WHERE id=?",
      [agentId, id]
    );

    
    await logActivity({
      ticketId: id,
      userId: req.user.userId,          
      userName: actorName,                
      action: "TICKET_ASSIGNED",
      oldValue: ticket.assigned_to ?? null,
      newValue: agentId,
    });

  
    await transporter.sendMail({
      to: agent.email,
      subject: "[CRM] New Ticket Assigned",
      text: `Hello ${agent.first_name},

A ticket has been assigned to you.

Ticket ID: ${id}

Please log in to CRM.`,
    });

    res.json({ message: "Ticket assigned and email sent" });
  } catch (err) {
    console.error("ASSIGN TICKET ERROR:", err);
    res.status(500).json({ message: "Assignment failed" });
  }
};


export const getTicketLogs = async (req, res) => {
    const { ticketId } = req.params;

    const [logs] = await db.execute(
        `SELECT user_name, action, old_value, new_value, created_at
     FROM ticket_activity_logs
     WHERE ticket_id = ?
     ORDER BY created_at DESC`,
        [ticketId]
    );

    res.json(logs);
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const actorName = await getStaffNameById(req.user.userId);

    
    const [[ticket]] = await db.query(
      "SELECT status, email, name, ticket_number FROM tickets WHERE id=?",
      [id]
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    
    await db.query(
      "UPDATE tickets SET status=? WHERE id=?",
      [status, id]
    );

    
    await logActivity({
      ticketId: id,
      userId: req.user.userId,      
      userName: actorName,
      action: "STATUS_CHANGED",
      oldValue: ticket.status ?? null,
      newValue: status,
    });

   
    await transporter.sendMail({
      to: ticket.email,   
      subject: `[CRM] Ticket Status Updated (${ticket.ticket_number})`,
      text: `
Hello ${ticket.name},

The status of your support ticket has been updated.

Ticket Number: ${ticket.ticket_number}
Old Status: ${ticket.status}
New Status: ${status}

If you have further questions, feel free to reply to this email.

Regards,
CRM Support Team
      `,
    });

    res.json({ message: "Status updated and email sent to ticket owner" });
  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    res.status(500).json({ message: "Status update failed" });
  }
};
