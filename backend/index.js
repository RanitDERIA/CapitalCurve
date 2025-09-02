// backend/index.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { PositionsModel } = require("./model/PositionsModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const authRoute = require("./routes/authRoute");

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;

const app = express();

// --- Middleware
app.use(cors({
  origin: ["https://elevate-frontend-mcex.onrender.com", "http://localhost:3000"], 
  credentials: true
}));


app.use(cookieParser());
app.use(bodyParser.json());

// --- Public data routes (yours)
app.get("/allHoldings", async (_req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (_req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// --- Auth routes
app.use("/auth", authRoute);

// --- Example protected route (optional)
const auth = require("./middleware/auth");
app.get("/protected/ping", auth, (req, res) => {
  res.json({ ok: true, userId: req.user.userId });
});

// --- Start
mongoose
  .connect(URL)
  .then(() => {
    console.log("✅ DB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
