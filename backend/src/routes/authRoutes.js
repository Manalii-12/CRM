import express from "express";
import { register } from "../controllers/registercontroller.js";
import{login}from "../controllers/logincontroller.js";
import { forgotPassword } from "../controllers/forgetPasswordController.js";
import { resetPassword } from "../controllers/resetPasswordController.js";
import {ChangePassword} from "../controllers/changePasswordController.js"
import { getProfile,updateProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login",login)

router.post("/resetPassword",resetPassword)
router.post("/forgotPassword",forgotPassword)
router.put("/ChangePassword",authMiddleware,ChangePassword)


router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
export default router;