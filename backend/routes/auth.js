const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password required");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashed,
    });

    // 🔥 remove password before sending
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password required");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json("Invalid credentials");

    // ✅ CLEAN + SAFE TOKEN PAYLOAD
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,              // 🔥 REQUIRED FOR PAYSTACK
        isAdmin: !!user.isAdmin,
        name: user.name || "",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 REMOVE PASSWORD BEFORE SENDING
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
    const user = await User.findOne({ email: req.body.email });

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