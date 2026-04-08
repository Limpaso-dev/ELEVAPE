const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,

  items: Array,

  total: Number,

  status: {
    type: String,
    default: "pending",
  },

  // ✅ NEW: SHIPPING ADDRESS
  shippingAddress: {
    firstName: String,
    lastName: String,
    address: String,
    suburb: String,
    state: String,
    postcode: String,
    phone: String,
    email: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);