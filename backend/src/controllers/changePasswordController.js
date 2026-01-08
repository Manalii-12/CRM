import bcrypt from "bcryptjs";
import db from "../config/db.js";

export const ChangePassword = async (req, res) => {
    try {
        const userId = req.user?.userId ?? req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All password fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const [rows] = await db.execute(
            "SELECT password FROM users WHERE id = ?",
            [userId]
        );

        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(currentPassword, rows[0].password);
        if (!match) {
            return res.status(401).json({ message: "Current password incorrect" });
        }

        const currentMatch = await bcrypt.compare(newPassword, rows[0].password);
        if (currentMatch) {
            return res.status(400).json({ message: "New password must be different from current password" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashed, userId]);

        return res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("ChangePassword Error", error);
        return res.status(500).json({ message: "Change password failed" });
    }
};