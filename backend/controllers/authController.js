import crypto from "crypto";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
  clearAuthCookies,
  verifyToken,
} from "../utils/tokenUtils.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/emailService.js";
import { asyncHandler, ApiError } from "../middleware/errorHandler.js";

// SIGNUP - Create new user account
export const signup = asyncHandler(async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  // Validate input
  if (!email || !password || !passwordConfirm) {
    throw new ApiError(400, "Please provide email and password");
  }

  if (password !== passwordConfirm) {
    throw new ApiError(400, "Passwords do not match");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password should be at least 6 characters");
  }

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "Email already in use");
  }

  // Create user
  user = await User.create({
    email,
    password,
  });

  // Generate verification token
  const verificationToken = user.createVerificationToken();
  await user.save();

  // Send verification email
  const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;

  try {
    await sendVerificationEmail(user.email, verificationUrl);
  } catch (error) {
    console.error("Email service error:", error.message);
    // Don't fail signup if email fails - user can request resend
  }

  res.status(201).json({
    success: true,
    message: "User registered. Please verify your email.",
  });
});

// VERIFY EMAIL - Verify user email address
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new ApiError(400, "Verification token is missing");
  }

  // Hash the token to match database
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user with this token and valid expiry
  let user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpire: { $gt: Date.now() },
  });

  if (user) {
    // Token is valid, verify the user
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpire = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  }

  // Token not found or expired - check if already verified
  user = await User.findOne({
    verificationToken: hashedToken,
  });

  if (user && user.isVerified) {
    // Already verified - return success (idempotent)
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  }

  // Token is invalid or expired
  throw new ApiError(400, "Invalid or expired verification token");
});

// RESEND VERIFICATION EMAIL - Send new verification email
export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Please provide an email address");
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if already verified
  if (user.isVerified) {
    throw new ApiError(400, "Email is already verified");
  }

  // Generate new verification token
  const verificationToken = user.createVerificationToken();
  await user.save();

  // Send verification email
  const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;

  try {
    await sendVerificationEmail(user.email, verificationUrl);
  } catch (error) {
    console.error("Email service error:", error.message);
    throw new ApiError(500, "Failed to send verification email");
  }

  res.status(200).json({
    success: true,
    message: "Verification email sent successfully",
  });
});

// LOGIN - Authenticate user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  // Check for user, include password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Check if email is verified (optional based on business logic)
  if (!user.isVerified) {
    throw new ApiError(401, "Please verify your email before logging in");
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Set cookies
  setAuthCookies(res, accessToken, refreshToken);

  // Get user without password
  const userWithoutPassword = await User.findById(user._id);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: userWithoutPassword,
  });
});

// LOGOUT - Clear authentication cookies
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// FORGOT PASSWORD - Generate password reset token
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Please provide an email address");
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal whether email exists (security best practice)
    // Return same success message for all emails
    return res.status(200).json({
      success: true,
      message:
        "If that email matches an account, a secure reset link has been dispatched",
    });
  }

  // Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save();

  // Send password reset email
  const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

  try {
    await sendPasswordResetEmail(user.email, resetUrl);
  } catch (error) {
    console.error("Email service error:", error.message);
    // Don't fail forgot password if email fails - user can request resend
  }

  res.status(200).json({
    success: true,
    message:
      "If that email matches an account, a secure reset link has been dispatched",
  });
});

// RESET PASSWORD - Reset user password with token
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { password, passwordConfirm } = req.body;

  if (!token) {
    throw new ApiError(400, "Reset token is missing");
  }

  if (!password || !passwordConfirm) {
    throw new ApiError(400, "Please provide password and password confirm");
  }

  if (password !== passwordConfirm) {
    throw new ApiError(400, "Passwords do not match");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password should be at least 6 characters");
  }

  // Hash the token to match database
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user with valid reset token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  // Update password
  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpire = null;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});

// REFRESH TOKEN - Get new access token from refresh token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }

  // Verify refresh token
  const decoded = verifyToken(refreshToken);
  if (!decoded) {
    throw new ApiError(401, "Refresh token is invalid or expired");
  }

  // Verify user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Generate new access token
  const newAccessToken = generateAccessToken(user._id);

  // Set new access token cookie
  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({
    success: true,
    message: "Access token refreshed",
  });
});
