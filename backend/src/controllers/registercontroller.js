import db from "../config/db.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const {
            first_name,
            last_name,
            email,
            password,
            confirm_password,
            company_name,
            phone_number
        } = req.body;

        if (!first_name || !last_name || !email || !password || !confirm_password || !company_name || !phone_number) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password != confirm_password) {
            return res.status(400).json({ message: "Password Does Not Matched" });
        }
        const [existingUser] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        )

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email is already registered" })
        }
        const [companyResult] = await db.execute(
            "INSERT INTO companies (company_name, phone_number) VALUES (?, ?)",
            [company_name, phone_number]
        )
        const companyId = companyResult.insertId;
        const hashedPassword = await bcrypt.hash(password, 10);


        await db.execute(
            `INSERT INTO users
            (company_id, first_name, last_name, email, phone_number, password,role_id)
            VALUES (?, ?, ?, ?, ?, ?,1)`,
            [
                companyId,
                first_name,
                last_name,
                email,
                phone_number,
                hashedPassword,

            ]
        )
        return res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Register Error", error)
        return res.status(500).json({ message: "Registration failed" });

    }
}
