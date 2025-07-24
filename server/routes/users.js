// server/routes/users.js

import express from "express";
import User from "../mongodb/models/register.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// List all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get logged-in user
router.get("/me", async (req, res) => {
  try {
    const userId = req.query.id; // we're passing ?id= in frontend
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Upload company logo
router.post("/upload-logo/:id", upload.single("logo"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { logo: req.file.filename },
      { new: true }
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload company certificate
router.post(
  "/upload-certificate/:id",
  upload.single("certificate"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { certificate: req.file.filename },
        { new: true }
      );
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
