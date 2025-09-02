// backend/index.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Models
const { PositionsModel } = require("./model/PositionsModel");
const { HoldingsModel } = require("./model/HoldingsModel");

// Routes
const authRoute = require("./routes/authRoute");
const authMiddleware = require("./middleware/auth");

// App & Config
const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

// --- Middleware ---
app.use(
  cors({
    origin: [
      "https://elevate-frontend-mcex.onrender.com", // deployed frontend
      "http://localhost:3000", // local frontend
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// --- Public Data Routes ---
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    console.error("❌ Error fetching holdings:", err);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.error("❌ Error fetching positions:", err);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// --- Auth Routes ---
app.use("/auth", authRoute);

// --- Example Protected Route ---
app.get("/protected/ping", authMiddleware, (req, res) => {
  res.json({ ok: true, userId: req.user.userId });
});

// --- Connect to DB and Start Server ---
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
