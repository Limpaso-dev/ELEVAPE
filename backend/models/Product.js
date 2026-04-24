const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    compareAtPrice: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          return value === null || value >= this.price;
        },
        message: "Compare price must be greater than or equal to price",
      },
    },

    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
