import express from "express";
import {
  signup,
  verifyEmail,
  resendVerificationEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
} from "../controllers/authController.js";
import {
  loginLimiter,
  signupLimiter,
  forgotPasswordLimiter,
} from "../middleware/rateLimiter.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// Public routes
router.post("/signup", signupLimiter, signup);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", signupLimiter, resendVerificationEmail);
router.post("/login", loginLimiter, login);
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh", refreshAccessToken);

// Protected routes
router.post("/logout", protect, logout);

export default router;
