import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/tickets", ticketRoutes);


app.use("/api/replies", replyRoutes);

export default app;
