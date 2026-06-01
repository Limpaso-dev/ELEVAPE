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
  currency: {
    type: String,
    default: "USD",
  },

  status: {
    type: String,
    default: "pending",
  },

  paymentStatus: {
    type: String,
    default: "unpaid",
  },

  paymentProvider: {
    type: String,
    default: "dpo",
  },

  paymentReference: String,
  paymentProviderReference: String,

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
