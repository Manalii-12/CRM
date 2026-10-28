import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getReplies, addReply } from "../controllers/replycontroller.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();

router.get("/:ticketId", authMiddleware, getReplies);

router.post(
  "/:ticketId",
  authMiddleware,
  upload.single("attachment"),
  addReply
);



export default router;
