import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {

            return res.status(400).json({ message: "Email and Password Required" });
        }

        const [users] = await db.execute(
            "select * from users where email=?",
            [email]
        );
        if (!users || users.length === 0) {
            return res.status(400).json({ message: "Email and Password are invalid" });

        }
        const user = users[0];
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        const [[role]] = await db.execute(
      "SELECT id, name FROM roles WHERE id = ?",
      [user.role_id]
    )
    const [permissions] = await db.execute(
      `
      SELECT p.module, p.action
      FROM permissions p
      JOIN role_permissions rp ON rp.permission_id = p.id
      WHERE rp.role_id = ?
      `,
      [user.role_id]
    );
         const token = generateToken(
      {
        userId: user.id,
        companyId: user.company_id,
        role: role.name,
        permissions: permissions, 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

        return res.status(200).json({
            msg: "Login successful",
            token

        });
    } catch (error) {
        console.error("Login Error",error)
        return res.status(500).json({message:"login Failed"})

    }

}