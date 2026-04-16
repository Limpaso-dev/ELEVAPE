require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const orderRoutes = require("./routes/orders");

connectDB();

const app = express();

// ✅ CORS (production-ready)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-app.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", orderRoutes);

// ✅ serve images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);