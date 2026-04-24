const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const normalizeEmail = (email = "") => email.trim().toLowerCase();
const isValidPassword = (password) =>
  typeof password === "string" && password.trim().length >= 6;

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const name =
      typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("Name, email and password are required");
    }

    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json("Password must be at least 6 characters long");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const { password: _, ...safeUser } = user.toObject();

    res.json(safeUser);
  } catch (err) {
    console.error(err);
    res.status(500).json("Registration failed");
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password required");
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json("JWT secret not configured");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: !!user.isAdmin,
        name: user.name || "",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user.toObject();

    res.json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json("Login failed");
  }
});

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return res.status(400).json("Email is required");
    }

    if (
      !process.env.FRONTEND_URL ||
      !process.env.EMAIL ||
      !process.env.EMAIL_PASS
    ) {
      return res.status(500).json("Email reset is not configured");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json("If email exists, reset link sent");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 1 hour.</p>
      `,
    });

    res.json("Reset link sent to email");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error sending email");
  }
});

// ================= RESET PASSWORD =================
router.post("/reset-password/:token", async (req, res) => {
  try {
    if (!isValidPassword(req.body.password)) {
      return res
        .status(400)
        .json("Password must be at least 6 characters long");
    }

    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json("Invalid or expired token");
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json("Password reset successful");
  } catch (err) {
    console.error(err);
    res.status(500).json("Reset failed");
  }
});

module.exports = router;
