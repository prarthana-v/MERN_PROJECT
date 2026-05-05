const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // URL or path to uploaded file
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  ingredients: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);