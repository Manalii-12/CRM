import bcrypt from "bcryptjs";
import db from "../config/db.js";

export const resetPassword = async (req, res) => {
    try {
        const token = req.body.token ?? req.body.resetToken ?? req.body.reset_token ?? null;
        const newPassword = req.body.newPassword ?? req.body.New_password ?? req.body.password ?? null;
        const confirmPassword = req.body.confirmPassword ?? req.body.Confirm_password ?? req.body.confirm_password ?? null;

        if (!token) return res.status(400).json({ message: "Token is required" });
        if (!newPassword || !confirmPassword) return res.status(400).json({ message: "New password and confirm password are required" });
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }



        const [users] = await db.execute(
            "SELECT id, password FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
            [token]
        );

        if (!users.length) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        
        const currentMatch = await bcrypt.compare(newPassword, users[0].password);
        if (currentMatch) {
            return res.status(400).json({ message: "New password must be different from current password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.execute(
            `UPDATE users
             SET password = ?, reset_token = NULL, reset_token_expiry = NULL
             WHERE id = ?`,
            [hashedPassword, users[0].id]
        );

        return res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Reset Password Error", error);
        return res.status(500).json({ message: "Reset Failed" });
    }
};