import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  role: String,
  location: String,
  email: String,
  bio: String,
});

const Profile = mongoose.model("Profile", profileSchema);

// Seed route (run once)
app.get("/api/seed", async (req, res) => {
  await Profile.deleteMany({});
  const profile = await Profile.create({
    name: "Hari Baskar",
    role: "Fresher / Graduate",
    location: "Chennai, India",
    email: "baskarh54@gmail.com",
    bio: "Aspiring full-stack developer"
  });
  res.json(profile);
});

// Get profile
app.get("/api/profile", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

// Update profile
app.put("/api/profile", async (req, res) => {
  const updated = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(updated);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
