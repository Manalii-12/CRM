import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

try {
  const connection = await db.getConnection();
  console.log(" MySQL connected successfully");
  connection.release();
} catch (err) {
  console.error(" DB connection failed:", err.message);
}

export default db;