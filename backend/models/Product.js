const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  compareAtPrice: {
  type: Number,
  default: null,
  },
  image: String,
  description: String,
});

module.exports = mongoose.model("Product", productSchema);