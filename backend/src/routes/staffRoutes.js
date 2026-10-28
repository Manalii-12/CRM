import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
  getSupportAgents
} from "../controllers/staffcontroller.js";

const router = express.Router();

router.get("/", getStaff);
router.post("/", addStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.patch("/:id/status", toggleStaffStatus);
router.get("/agents", authMiddleware, getSupportAgents);


export default router;
