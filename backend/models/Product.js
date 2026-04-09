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

  inStock: { 
    type: Boolean, 
    default: true 
  }, // ✅ CORRECT POSITION
});

module.exports = mongoose.model("Product", productSchema);