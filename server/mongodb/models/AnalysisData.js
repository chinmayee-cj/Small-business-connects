import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AnalysisDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  revenue: { type: Number, required: true },
  usersReached: { type: Number, required: true },

  // New independent metrics (all required)
  bookings: { type: Number, required: true },
  cancellations: { type: Number, required: true },
  totalActivity: { type: Number, required: true },
  cost: { type: Number, required: true },
  profit: { type: Number, required: true },

  // Notes now required
  notes: { type: String, required: true },
});

const AnalysisData = mongoose.model("AnalysisData", AnalysisDataSchema);
export default AnalysisData;
// © 2025 Chinmayee C J. All rights reserved.
