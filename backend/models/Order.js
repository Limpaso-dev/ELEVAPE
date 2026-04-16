const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,

  // ✅ keep items but slightly structured (no breaking change)
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],

  // ✅ NEW (for proper breakdown)
  subtotal: Number,
  shipping: Number,

  // ✅ keep total (no change)
  total: Number,

  status: {
    type: String,
    default: "pending",
  },

  // ✅ SHIPPING ADDRESS (unchanged, already correct)
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