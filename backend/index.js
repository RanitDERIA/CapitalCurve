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

// --- Enhanced CORS Configuration ---
const corsOptions = {
  origin: [
    "https://elevate-frontend-mcex.onrender.com", // deployed frontend
    "http://localhost:3000", // local React dev server (CRA default)
    "http://localhost:3001", // your main app
    "http://localhost:3002", // in case frontend runs on same port
    "http://127.0.0.1:3000", // alternative localhost
    "http://127.0.0.1:3001", // alternative localhost
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type', 
    'Accept', 
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

// Add additional headers for better compatibility
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow additional origins dynamically (for development)
  if (process.env.NODE_ENV === 'development') {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002',
      'https://elevate-dashboard-l8sx.onrender.com',
      'https://elevate-frontend-mcex.onrender.com',
      'https://elevate-broking.onrender.com'
    ];
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
  
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Log CORS requests for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`🌐 CORS Request from: ${origin} to ${req.method} ${req.path}`);
  }
  
  next();
});

// --- Public Data Routes ---
app.get("/allHoldings", async (req, res) => {
  try {
    console.log("📊 Fetching all holdings...");
    const allHoldings = await HoldingsModel.find({});
    console.log(`✅ Found ${allHoldings.length} holdings`);
    res.json(allHoldings);
  } catch (err) {
    console.error("❌ Error fetching holdings:", err);
    res.status(500).json({ error: "Failed to fetch holdings", details: err.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    console.log("📊 Fetching all positions...");
    const allPositions = await PositionsModel.find({});
    console.log(`✅ Found ${allPositions.length} positions`);
    
    // Add CORS headers explicitly for this route
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    res.json(allPositions);
  } catch (err) {
    console.error("❌ Error fetching positions:", err);
    res.status(500).json({ error: "Failed to fetch positions", details: err.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// --- Auth Routes ---
app.use("/auth", authRoute);

// --- Example Protected Route ---
app.get("/protected/ping", authMiddleware, (req, res) => {
  res.json({ ok: true, userId: req.user.userId });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global error handler:", err);
  res.status(500).json({ 
    error: "Internal server error", 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: "Route not found", 
    path: req.originalUrl,
    method: req.method 
  });
});

// --- Connect to DB and Start Server ---
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log(`🌍 CORS enabled for origins: ${corsOptions.origin.join(', ')}`);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API endpoints:`);
      console.log(`   - GET /allPositions`);
      console.log(`   - GET /allHoldings`);
      console.log(`   - GET /health`);
      console.log(`   - POST /auth/signup`);
      console.log(`   - POST /auth/login`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
