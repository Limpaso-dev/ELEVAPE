require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const orderRoutes = require("./routes/orders");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/orders", orderRoutes);

// serve images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);