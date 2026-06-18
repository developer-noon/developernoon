import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the backend directory
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug: Log environment variables
// console.log("🔍 Environment Variables Debug:");
// console.log(
//   `  EMAIL_USER: ${process.env.EMAIL_USER ? "✓ Loaded" : "✗ NOT FOUND"}`,
// );
// console.log(
//   `  EMAIL_PASS: ${process.env.EMAIL_PASS ? `✓ Loaded (${process.env.EMAIL_PASS.length} chars)` : "✗ NOT FOUND"}`,
// );
// console.log(
//   `  MONGODB_URI: ${process.env.MONGODB_URI ? "✓ Loaded" : "✗ NOT FOUND"}`,
// );

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/developernoon";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✓ Connected to MongoDB");
  } catch (error) {
    console.error("✗ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    // console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}\n`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
