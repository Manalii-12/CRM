import db from "../config/db.js";

export const getStaffNameById = async (staffId) => {
  const [[staff]] = await db.query(
    "SELECT first_name, last_name FROM staff WHERE id=?",
    [staffId]
  );

  if (!staff) return "Unknown";

  return `${staff.first_name} ${staff.last_name}`;
};
