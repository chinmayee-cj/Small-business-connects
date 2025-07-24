import express from "express";
import cors from "cors";
import User from "./mongodb/models/register.js";
import model from "./mongodb/models/register.js";
import connectDB from "./mongodb/connection.js";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/auth.js";  
import userRoutes from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";
import analysisDataRoutes from './routes/analysisData.js';

dotenv.config();
const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/api/analysis-data', analysisDataRoutes);

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api", authRoutes); // handles /api/register and /api/login
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from uploads directory

app.use("/", (req, res) => {
  res.send("Hello this is the backend");
});

import fs from "fs";
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
