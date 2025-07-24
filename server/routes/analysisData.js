import express from "express";
import AnalysisData from "../mongodb/models/AnalysisData.js";


const router = express.Router();

// POST: Create or update analytics data for a date (per user)
// POST: Create or update analytics data for a date (per user)
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      date,
      revenue,
      usersReached,
      bookings,
      cancellations,
      totalActivity,
      cost,
      profit,
      notes
    } = req.body;

    // Check for required fields
    if (
      !userId ||
      !date ||
      revenue === undefined ||
      usersReached === undefined ||
      bookings === undefined ||
      cancellations === undefined ||
      totalActivity === undefined ||
      cost === undefined ||
      profit === undefined ||
      !notes
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Optional: Convert date string to Date object for query consistency
    const queryDate = new Date(date);

    // Check if an entry already exists for the same user and date
    const existing = await AnalysisData.findOne({ userId, date: queryDate });
    let result;

    if (existing) {
      // Update existing document
      existing.revenue = revenue;
      existing.usersReached = usersReached;
      existing.bookings = bookings;
      existing.cancellations = cancellations;
      existing.totalActivity = totalActivity;
      existing.cost = cost;
      existing.profit = profit;
      existing.notes = notes;

      result = await existing.save();
    } else {
      // Create new document
      const newData = new AnalysisData({
        userId,
        date: queryDate,
        revenue,
        usersReached,
        bookings,
        cancellations,
        totalActivity,
        cost,
        profit,
        notes
      });
      result = await newData.save();
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error saving analysis data:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET: Fetch all analytics entries (optionally filter by userId)
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query; // Frontend should pass ?userId=... in URL
    const filter = userId ? { userId } : {};
    const entries = await AnalysisData.find(filter);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
