const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  Image: { type: String, required: true }, // Cloudinary URL
  description: { type: String, required: true },
  price: { type: Number, required: true },

  // FIXED: Should be a single string, not an array
  Category: { type: String, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
