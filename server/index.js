import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());


// ------------------ DB ------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

// ------------------ MODELS ------------------

// User
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
});

const User = mongoose.model("User", userSchema);

// Profile
const profileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  bio: String,
  location: String,
});

const Profile = mongoose.model("Profile", profileSchema);

// Skill
const skillSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  level: String,
  endorsements: { type: Number, default: 0 },
});

const Skill = mongoose.model("Skill", skillSchema);

// Experience
const experienceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  role: String,
  company: String,
  startDate: String,
  endDate: String,
  description: String,
});

const Experience = mongoose.model("Experience", experienceSchema);

// ------------------ AUTH MIDDLEWARE ------------------

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ------------------ AUTH ROUTES ------------------

// Signup
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
  });

  res.json({ success: true });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

// ------------------ PROFILE ROUTES ------------------

// Get my profile
app.get("/api/profile", authMiddleware, async (req, res) => {
  let profile = await Profile.findOne({ userId: req.userId });
  if (!profile) {
    profile = await Profile.create({
      userId: req.userId,
      title: "",
      bio: "",
      location: "",
    });
  }
  res.json(profile);
});

// Update my profile
app.put("/api/profile", authMiddleware, async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.userId },
    req.body,
    { new: true, upsert: true }
  );
  res.json(profile);
});

// ------------------ SKILLS ROUTES ------------------

app.get("/api/skills", authMiddleware, async (req, res) => {
  const skills = await Skill.find({ userId: req.userId });
  res.json(skills);
});

app.post("/api/skills", authMiddleware, async (req, res) => {
  const skill = await Skill.create({
    ...req.body,
    userId: req.userId,
  });
  res.json(skill);
});

app.delete("/api/skills/:id", authMiddleware, async (req, res) => {
  await Skill.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
});

// Endorse skill
app.post("/api/skills/:id/endorse", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.endorsements += 1;
    await skill.save();

    res.json(skill);
  } catch (err) {
    console.error("Endorse error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ------------------ EXPERIENCE ROUTES ------------------

app.get("/api/experience", authMiddleware, async (req, res) => {
  const exp = await Experience.find({ userId: req.userId });
  res.json(exp);
});

app.post("/api/experience", authMiddleware, async (req, res) => {
  const exp = await Experience.create({
    ...req.body,
    userId: req.userId,
  });
  res.json(exp);
});

app.delete("/api/experience/:id", authMiddleware, async (req, res) => {
  await Experience.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
});


// Public profile
app.get("/api/public/:userId/profile", async (req, res) => {
  const userId = req.params.userId;
  const profile = await Profile.findOne({ userId });
  const skills = await Skill.find({ userId });
  const experience = await Experience.find({ userId });
  res.json({ profile, skills, experience });
});

// ------------------ START ------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
