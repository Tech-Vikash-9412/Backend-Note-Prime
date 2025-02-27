import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import { errorHandler, notFound } from "./src/middleware/errorHandler.js";

// 🔹 Load Environment Variables
dotenv.config();

// 🔹 Initialize Express App
const app = express();

// 🔹 Connect to MongoDB
connectDB();

// 🔹 Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev")); // Logs for debugging

// ✅ CORS Setup (Frontend से Backend को Connect करने के लिए)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// ✅ Import All Routes
import authRoutes from "./src/routes/authRoutes.js";
import noteRoutes from "./src/routes/noteRoutes.js";
import todoRoutes from "./src/routes/todoRoutes.js";
import transcriptionRoutes from "./src/routes/transcriptionRoutes.js";
import formulaRoutes from "./src/routes/formulaRoutes.js";
import timetableRoutes from "./src/routes/timetableRoutes.js";
import cloudRoutes from "./src/routes/cloudRoutes.js";
import feedbackRoutes from "./src/routes/feedbackRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";

// 🔹 Setup Routes
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/transcription", transcriptionRoutes);
app.use("/api/formula", formulaRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/cloud", cloudRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/file", fileRoutes);

// 🔹 Default Route
app.get("/", (req, res) => {
  res.send("🚀 NoteMate Backend is running...");
});

// 🔹 Error Handling Middleware (यह सबसे लास्ट में होना चाहिए)
app.use(notFound);
app.use(errorHandler);

// 🔹 Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
