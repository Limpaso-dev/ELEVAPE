require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://elevape.vercel.app",
  process.env.FRONTEND_URL,
  ...(process.env.CORS_ORIGINS || "").split(","),
]
  .map((origin) => origin && origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

// ================= CORS =================
app.use(
  cors({
    origin: function (origin, callback) {
      const normalizedOrigin = origin && origin.replace(/\/$/, "");

      if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
