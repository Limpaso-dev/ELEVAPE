require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

connectDB();

const app = express();

// ================= CORS (🔥 FIXED) =================
app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        "http://localhost:5173",
        "https://elevape.vercel.app",
      ];

      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // allow preview deployments
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

// ================= STATIC FILES =================
const uploadsPath = path.resolve(__dirname, "uploads");

console.log("Serving uploads from:", uploadsPath);

app.use("/uploads", express.static(uploadsPath));

app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);