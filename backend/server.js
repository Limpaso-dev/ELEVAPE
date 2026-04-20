require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

connectDB();

const app = express();

// ================= CORS =================
app.use(
  cors({
    origin: ["http://localhost:5173", "https://elevape.vercel.app"],
    credentials: true,
  })
);

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// ================= STATIC FILES (🔥 CRITICAL FIX) =================
const uploadsPath = path.resolve(__dirname, "uploads");

console.log("Serving uploads from:", uploadsPath);

// serve images correctly
app.use("/uploads", express.static(uploadsPath));

// allow cross-origin image loading
app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);