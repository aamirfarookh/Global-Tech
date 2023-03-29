const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
     model: {
        type: String,
        required: true
      },
      specs: {
        type: [String],
        required: true
      },
      category: {
        type: String,
        enum: ['Mobile Phones', 'Laptops'],
        required: true
      }
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
