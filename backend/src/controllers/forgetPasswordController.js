import crypto from "crypto"
import db from "../config/db.js"
import nodemailer from "nodemailer"

export const forgotPassword = async (req, res) => {
  try{ const { email } = req.body;

    const [users] = await db.execute(
        "select id from users where email=?",
        [email]
    )
    if (!users.length) {
       return res.status(400).json({ message: "Email not Register" })
    }
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000);
    await db.execute(
        "UPDATE users SET reset_token=?, reset_token_expiry=? WHERE email=?",
        [token, expiry, email]
    );

    const resetLink = `http://localhost:3000/pages/reset-password/${token}`;
    console.log("RESET LINK:", resetLink);


    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    if (!emailUser || !emailPass) {
      console.error('Email credentials are not configured');
      return res.status(500).json({ message: 'Email service not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: 'Reset Password',
      html: `<p>Click Here To Reset Password</p><a href=${resetLink}>Reset Password</a>`,
    });

    res.json({ message: "Password reset link sent" });
}catch(error){
    console.log("Forgot Password Error",error)
    return res.status(401).json({ message: "Invalid" });
}
}

