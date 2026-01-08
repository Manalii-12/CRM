import db from "../config/db.js";

export const logActivity = async ({
  ticketId,
  userId,
  userName,
  action,
  oldValue = null,
  newValue = null,
}) => {
  await db.execute(
    `INSERT INTO ticket_activity_logs
     (ticket_id, user_id, user_name, action, old_value, new_value)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ticketId, userId, userName, action, oldValue, newValue]
  );
};
