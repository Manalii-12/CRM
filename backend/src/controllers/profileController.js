import db from "../config/db.js";

export const getProfile = async (req, res) => {
  const userId = req.user.userId;

  const [rows] = await db.execute(
    `SELECT first_name, last_name, email, phone_number
     FROM users WHERE id=?`,
    [userId]
  );

  res.json(rows[0]);
};

export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { first_name, last_name, phone_number } = req.body;

  await db.execute(
    "UPDATE users SET first_name=?, last_name=?, phone_number=? WHERE id=?",
    [first_name, last_name, phone_number, userId]
  );

  res.json({ message: "Profile updated" });
};
