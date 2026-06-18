import User from "../models/User.js";
import { verifyToken } from "../utils/tokenUtils.js";
import { ApiError, asyncHandler } from "./errorHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from cookie
  if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(401, "Not authorized to access this route");
  }

  // Verify token
  const decoded = verifyToken(token);

  if (!decoded) {
    throw new ApiError(401, "Token is not valid or expired");
  }

  req.user = await User.findById(decoded.id);

  if (!req.user) {
    throw new ApiError(404, "User not found");
  }

  next();
});
