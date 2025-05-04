import mongoose from "mongoose";

const fixtureSchema = new mongoose.Schema(
  {
    fixture_mid: { type: String, required: true, unique: true },
    season: { type: Number, required: true },
    competition_name: { type: String, required: true },
    fixture_datetime: { type: Date, required: true },
    fixture_round: { type: Number, required: true },
    home_team: { type: String, required: true },
    away_team: { type: String, required: true },
  },
  { timestamps: true }
);

// Create text index for search functionality
fixtureSchema.index({ home_team: "text", away_team: "text" });

export const Fixture =
  mongoose.models.Fixture || mongoose.model("Fixture", fixtureSchema);
