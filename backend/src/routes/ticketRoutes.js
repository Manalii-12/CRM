import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllTickets,
  getTicketById,
  markTicketViewed,
  assignTicket,
  updateTicketStatus,
  createTicket,
   getTicketLogs
} from "../controllers/ticketcontroller.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();
router.post("/", upload.single("attachment"), createTicket);

router.get("/", authMiddleware, getAllTickets);
router.get("/:id", authMiddleware, getTicketById);
router.put("/:id/view", authMiddleware, markTicketViewed);
router.put("/:id/assign", authMiddleware, assignTicket);
router.put("/:id/status", authMiddleware, updateTicketStatus);
router.get("/:ticketId/logs", authMiddleware, getTicketLogs);
router.get("/:id/logs", authMiddleware, getTicketLogs);


export default router;
