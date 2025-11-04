import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // 🟢 Import CORS
import User from "./models/User.js";

dotenv.config();

const app = express();

// 🟢 Enable CORS (allows your frontend to call this API)
app.use(cors({
  origin: "https://react-frontend-production-6bad.up.railway.app", // You can restrict this to your frontend URL later
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// 🟢 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB on Railway"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🟢 Routes
app.get("/", (req, res) => {
  res.send("Express + MongoDB on Railway is working!");
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// 🟢 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
