// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const makeToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "7d" });

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "fullName, email, and password are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered." });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hash, phone });

    const token = makeToken(user._id);

    // Send JWT in httpOnly cookie + basic user data in JSON
    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        message: "Signup successful.",
        user: { id: user._id, fullName: user.fullName, email: user.email },
        token, // optional: keep if you also want to support header-based auth on the client
      });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password are required." });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials." });

    const token = makeToken(user._id);

    res
      .cookie("token", token, cookieOptions)
      .json({
        message: "Login successful.",
        user: { id: user._id, fullName: user.fullName, email: user.email },
        token, // optional
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.logout = async (_req, res) => {
  res.clearCookie("token", { ...cookieOptions, maxAge: 0 });
  res.json({ message: "Logged out." });
};

exports.me = async (req, res) => {
  // req.user is set by auth middleware
  const user = await User.findById(req.user.userId).select("fullName email phone createdAt");
  res.json({ user });
};
