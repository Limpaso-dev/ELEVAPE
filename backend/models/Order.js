const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,

  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],

  subtotal: Number,
  shipping: Number,
  total: Number,

  status: {
    type: String,
    default: "pending",
  },

  // ✅ NEW
  paymentStatus: {
    type: String,
    default: "unpaid",
  },

  // ✅ NEW (Paystack reference)
  paymentReference: String,

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