import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5005;

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI loaded:", MONGO_URI ? "Yes" : "No");

if (!MONGO_URI) {
  console.error("MONGO_URI not found in environment variables");
  process.exit(1);
}

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    // Add these options to resolve the errors
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    // These handle the deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
